'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  UserAccount,
  AuthResult,
  BrandProfile,
  CreatorProfile,
  Campaign,
  CampaignApplication,
  Collaboration,
  Deliverable,
  AdInspiration,
  BrandWallet,
  CreatorWallet,
  WalletTransaction,
  AppNotification,
  PayoutMethod,
  ApplicationStatus,
} from '@/types';
import {
  INITIAL_ACCOUNTS,
  INITIAL_BRANDS,
  INITIAL_CREATORS,
  INITIAL_CAMPAIGNS,
  INITIAL_APPLICATIONS,
  INITIAL_COLLABORATIONS,
  INITIAL_INSPIRATIONS,
  INITIAL_BRAND_WALLET,
  INITIAL_CREATOR_WALLET,
  INITIAL_BRAND_TRANSACTIONS,
  INITIAL_CREATOR_TRANSACTIONS,
  INITIAL_NOTIFICATIONS,
  INITIAL_PAYOUT_METHODS,
} from '@/data/seedData';

function setSessionCookie(role: 'brand' | 'creator', email: string) {
  if (typeof document === 'undefined') return;
  document.cookie = `ugcfy_role=${role}; path=/; max-age=604800; SameSite=Lax`;
  document.cookie = `ugcfy_user=${encodeURIComponent(email)}; path=/; max-age=604800; SameSite=Lax`;
}

function clearSessionCookie() {
  if (typeof document === 'undefined') return;
  document.cookie = `ugcfy_role=; path=/; max-age=0; SameSite=Lax`;
  document.cookie = `ugcfy_user=; path=/; max-age=0; SameSite=Lax`;
}

interface UGCFYContextType {
  currentUser: UserAccount | null;
  role: UserRole; // Read-only role derived from active account
  isAuthenticated: boolean;
  isLoaded: boolean;
  
  // Strict Auth actions
  loginBrand: (email: string, password?: string) => Promise<AuthResult>;
  loginCreator: (email: string, password?: string) => Promise<AuthResult>;
  registerBrand: (
    dataOrName: string | { companyName: string; email: string; password?: string },
    email?: string,
    password?: string
  ) => Promise<AuthResult>;
  registerCreator: (
    dataOrName: string | { fullName: string; handle?: string; email: string; password?: string },
    email?: string,
    password?: string,
    handle?: string
  ) => Promise<AuthResult>;
  logout: () => Promise<void>;

  // Data & features
  currentBrand: BrandProfile;
  currentCreator: CreatorProfile;
  allBrands: BrandProfile[];
  allCreators: CreatorProfile[];
  campaigns: Campaign[];
  applications: CampaignApplication[];
  collaborations: Collaboration[];
  inspirations: AdInspiration[];
  savedInspirationIds: string[];
  brandWallet: BrandWallet;
  creatorWallet: CreatorWallet;
  brandTransactions: WalletTransaction[];
  creatorTransactions: WalletTransaction[];
  notifications: AppNotification[];
  payoutMethods: PayoutMethod[];
  
  // Actions
  createCampaign: (data: Partial<Campaign>) => Campaign;
  updateCampaignStatus: (campaignId: string, status: Campaign['status']) => void;
  applyToCampaign: (data: { campaignId: string; pitch: string; portfolioLinks: string[]; proposedRate: number }) => { success: boolean; message: string };
  updateApplicationStatus: (applicationId: string, status: ApplicationStatus, notes?: string) => void;
  submitDeliverable: (collaborationId: string, deliverableId: string, data: { fileUrl: string; notes: string }) => void;
  reviewDeliverable: (collaborationId: string, deliverableId: string, action: 'approved' | 'changes_requested', feedback?: string) => void;
  toggleSaveInspiration: (id: string) => void;
  addBrandFunds: (amount: number, method: string) => void;
  withdrawCreatorFunds: (amount: number, method: string) => { success: boolean; message: string };
  updateBrandProfile: (updates: Partial<BrandProfile>) => void;
  updateCreatorProfile: (updates: Partial<CreatorProfile>) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  resetAllData: () => void;
}

const UGCFYContext = createContext<UGCFYContextType | undefined>(undefined);

const STORAGE_KEY = 'ugcfy_saas_state_v3';

export function UGCFYProvider({ children }: { children: React.ReactNode }) {
  const [accounts, setAccounts] = useState<UserAccount[]>(INITIAL_ACCOUNTS);
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(INITIAL_ACCOUNTS[0]);
  const [currentBrand, setCurrentBrand] = useState<BrandProfile>(INITIAL_BRANDS[0]);
  const [currentCreator, setCurrentCreator] = useState<CreatorProfile>(INITIAL_CREATORS[0]);
  const [allBrands, setAllBrands] = useState<BrandProfile[]>(INITIAL_BRANDS);
  const [allCreators, setAllCreators] = useState<CreatorProfile[]>(INITIAL_CREATORS);
  const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);
  const [applications, setApplications] = useState<CampaignApplication[]>(INITIAL_APPLICATIONS);
  const [collaborations, setCollaborations] = useState<Collaboration[]>(INITIAL_COLLABORATIONS);
  const [inspirations, setInspirations] = useState<AdInspiration[]>(INITIAL_INSPIRATIONS);
  const [savedInspirationIds, setSavedInspirationIds] = useState<string[]>(['insp-1', 'insp-4']);
  const [brandWallet, setBrandWallet] = useState<BrandWallet>(INITIAL_BRAND_WALLET);
  const [creatorWallet, setCreatorWallet] = useState<CreatorWallet>(INITIAL_CREATOR_WALLET);
  const [brandTransactions, setBrandTransactions] = useState<WalletTransaction[]>(INITIAL_BRAND_TRANSACTIONS);
  const [creatorTransactions, setCreatorTransactions] = useState<WalletTransaction[]>(INITIAL_CREATOR_TRANSACTIONS);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [payoutMethods, setPayoutMethods] = useState<PayoutMethod[]>(INITIAL_PAYOUT_METHODS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Derived role - strictly read-only from active user account
  const role: UserRole = currentUser ? currentUser.role : 'brand';

  // Load from local storage and cookies on client mount
  useEffect(() => {
    try {
      // Check document cookie for active session
      let cookieRole: 'brand' | 'creator' | null = null;
      let cookieEmail: string | null = null;
      if (typeof document !== 'undefined') {
        const matchRole = document.cookie.match(/(?:^|;\s*)ugcfy_role=([^;]*)/);
        const matchUser = document.cookie.match(/(?:^|;\s*)ugcfy_user=([^;]*)/);
        if (matchRole) cookieRole = matchRole[1] as 'brand' | 'creator';
        if (matchUser) cookieEmail = decodeURIComponent(matchUser[1]);
      }

      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('ugcfy_saas_state_v2');
      if (saved) {
        const sanitized = saved.replace(/photo-1608248597359-002d2a45a303/g, 'photo-1620916566398-39f1143ab7be');
        const parsed = JSON.parse(sanitized);

        let mergedAccounts = INITIAL_ACCOUNTS;
        if (parsed.accounts && Array.isArray(parsed.accounts)) {
          mergedAccounts = parsed.accounts;
          setAccounts(parsed.accounts);
        }

        // Restore active user matching cookie or stored currentUser
        if (cookieEmail) {
          const matched = mergedAccounts.find((a: UserAccount) => a.email.toLowerCase() === cookieEmail?.toLowerCase());
          if (matched) {
            setCurrentUser(matched);
            setSessionCookie(matched.role, matched.email);
          }
        } else if (parsed.currentUser) {
          setCurrentUser(parsed.currentUser);
          setSessionCookie(parsed.currentUser.role, parsed.currentUser.email);
        } else if (cookieRole) {
          const defaultAcc = mergedAccounts.find((a) => a.role === cookieRole) || INITIAL_ACCOUNTS[cookieRole === 'brand' ? 0 : 2];
          setCurrentUser(defaultAcc);
          setSessionCookie(defaultAcc.role, defaultAcc.email);
        }

        if (parsed.currentBrand) setCurrentBrand(parsed.currentBrand);
        if (parsed.currentCreator) setCurrentCreator(parsed.currentCreator);
        if (parsed.allBrands) setAllBrands(parsed.allBrands);
        if (parsed.allCreators) setAllCreators(parsed.allCreators);
        if (parsed.campaigns) setCampaigns(parsed.campaigns);
        if (parsed.applications) {
          const creatorApps = parsed.applications.filter((a: any) => a.creatorId === 'creator-1');
          if (creatorApps.length <= 1) {
            const extra = INITIAL_APPLICATIONS.filter((init) => !parsed.applications.some((a: any) => a.id === init.id));
            setApplications([...parsed.applications, ...extra]);
          } else {
            setApplications(parsed.applications);
          }
        }
        if (parsed.collaborations) setCollaborations(parsed.collaborations);
        if (parsed.savedInspirationIds) setSavedInspirationIds(parsed.savedInspirationIds);
        if (parsed.brandWallet) setBrandWallet(parsed.brandWallet);
        if (parsed.creatorWallet) setCreatorWallet(parsed.creatorWallet);
        if (parsed.brandTransactions) setBrandTransactions(parsed.brandTransactions);
        if (parsed.creatorTransactions) setCreatorTransactions(parsed.creatorTransactions);
        if (parsed.notifications) setNotifications(parsed.notifications);
        if (parsed.payoutMethods) setPayoutMethods(parsed.payoutMethods);
      } else {
        // Initial setup cookie
        setSessionCookie('brand', INITIAL_ACCOUNTS[0].email);
      }
    } catch (e) {
      console.warn('Failed to parse UGCFY stored state:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      const stateToSave = {
        accounts,
        currentUser,
        currentBrand,
        currentCreator,
        allBrands,
        allCreators,
        campaigns,
        applications,
        collaborations,
        savedInspirationIds,
        brandWallet,
        creatorWallet,
        brandTransactions,
        creatorTransactions,
        notifications,
        payoutMethods,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.warn('Failed to save UGCFY state:', e);
    }
  }, [
    isLoaded,
    accounts,
    currentUser,
    currentBrand,
    currentCreator,
    allBrands,
    allCreators,
    campaigns,
    applications,
    collaborations,
    savedInspirationIds,
    brandWallet,
    creatorWallet,
    brandTransactions,
    creatorTransactions,
    notifications,
    payoutMethods,
  ]);

  // Strict Brand Login
  const loginBrand = async (email: string, password?: string): Promise<AuthResult> => {
    const cleanEmail = email.trim().toLowerCase();
    const account = accounts.find((a) => a.email.toLowerCase() === cleanEmail);

    if (!account) {
      return {
        success: false,
        error: 'No account found with this email. Please check your credentials or register a Brand account.',
      };
    }

    // Role Enforcement: If registered as Creator, reject login on Brand portal!
    if (account.role !== 'brand') {
      return {
        success: false,
        error: 'This account is registered as a Creator. Please use Creator Login.',
        wrongPortal: true,
        registeredRole: 'creator',
      };
    }

    setCurrentUser(account);
    setSessionCookie('brand', account.email);

    const matchedBrand = allBrands.find((b) => b.id === account.brandProfileId || b.userId === account.id);
    if (matchedBrand) setCurrentBrand(matchedBrand);

    return { success: true };
  };

  // Strict Creator Login
  const loginCreator = async (email: string, password?: string): Promise<AuthResult> => {
    const cleanEmail = email.trim().toLowerCase();
    const account = accounts.find((a) => a.email.toLowerCase() === cleanEmail);

    if (!account) {
      return {
        success: false,
        error: 'No account found with this email. Please check your credentials or register a Creator account.',
      };
    }

    // Role Enforcement: If registered as Brand, reject login on Creator portal!
    if (account.role !== 'creator') {
      return {
        success: false,
        error: 'This account is registered as a Brand. Please use Brand Login.',
        wrongPortal: true,
        registeredRole: 'brand',
      };
    }

    setCurrentUser(account);
    setSessionCookie('creator', account.email);

    const matchedCreator = allCreators.find((c) => c.id === account.creatorProfileId || c.userId === account.id);
    if (matchedCreator) setCurrentCreator(matchedCreator);

    return { success: true };
  };

  // Strict Brand Registration
  const registerBrand = async (
    dataOrName: string | { companyName: string; email: string; password?: string },
    emailArg?: string,
    passwordArg?: string
  ): Promise<AuthResult> => {
    const companyName = typeof dataOrName === 'string' ? dataOrName : dataOrName.companyName;
    const email = typeof dataOrName === 'string' ? (emailArg || '') : dataOrName.email;
    const cleanEmail = email.trim().toLowerCase();
    const existing = accounts.find((a) => a.email.toLowerCase() === cleanEmail);
    if (existing) {
      return {
        success: false,
        error: `An account with this email is already registered as a ${existing.role === 'brand' ? 'Brand' : 'Creator'}. Please log in.`,
      };
    }

    const newBrandId = `brand-${Date.now()}`;
    const newUserId = `user-brand-${Date.now()}`;

    const newProfile: BrandProfile = {
      id: newBrandId,
      userId: newUserId,
      companyName,
      logoUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=150&auto=format&fit=crop&q=80',
      industry: 'Consumer Goods',
      description: 'Brand producing authentic UGC media and creator partnerships.',
      website: `https://${companyName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
      contactEmail: cleanEmail,
      phone: '+91 98000 00000',
      location: 'India',
      socialLinks: {},
      billingInfo: { billingAddress: 'Headquarters', city: 'Mumbai', state: 'MH', postalCode: '400001' },
      totalCampaigns: 0,
      totalSpent: 0,
    };

    const newAccount: UserAccount = {
      id: newUserId,
      email: cleanEmail,
      fullName: companyName,
      role: 'brand', // IMMUTABLE FIXED ROLE
      brandProfileId: newBrandId,
      avatarUrl: newProfile.logoUrl,
      createdAt: new Date().toISOString(),
    };

    setAccounts((prev) => [newAccount, ...prev]);
    setAllBrands((prev) => [newProfile, ...prev]);
    setCurrentBrand(newProfile);
    setCurrentUser(newAccount);
    setSessionCookie('brand', cleanEmail);

    return { success: true };
  };

  // Strict Creator Registration
  const registerCreator = async (
    dataOrName: string | { fullName: string; handle?: string; email: string; password?: string },
    emailArg?: string,
    passwordArg?: string,
    handleArg?: string
  ): Promise<AuthResult> => {
    const fullName = typeof dataOrName === 'string' ? dataOrName : dataOrName.fullName;
    const email = typeof dataOrName === 'string' ? (emailArg || '') : dataOrName.email;
    const rawHandle = typeof dataOrName === 'string'
      ? (handleArg || `@${fullName.toLowerCase().replace(/[^a-z0-9]/g, '')}`)
      : (dataOrName.handle || `@${dataOrName.fullName.toLowerCase().replace(/[^a-z0-9]/g, '')}`);
    const cleanEmail = email.trim().toLowerCase();
    const existing = accounts.find((a) => a.email.toLowerCase() === cleanEmail);
    if (existing) {
      return {
        success: false,
        error: `An account with this email is already registered as a ${existing.role === 'brand' ? 'Brand' : 'Creator'}. Please log in.`,
      };
    }

    const newCreatorId = `creator-${Date.now()}`;
    const newUserId = `user-creator-${Date.now()}`;
    const cleanHandle = rawHandle.startsWith('@') ? rawHandle : `@${rawHandle}`;

    const newProfile: CreatorProfile = {
      id: newCreatorId,
      userId: newUserId,
      fullName,
      handle: cleanHandle,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      bio: 'UGC Content Creator passionate about honest reviews and aesthetic product demos.',
      niche: ['Skincare', 'Lifestyle'],
      location: 'India',
      languages: ['English', 'Hindi'],
      platforms: {
        instagram: { handle: cleanHandle, followers: '10K', engagement: '4.5%', url: 'https://instagram.com' },
      },
      followerCount: '10K',
      engagementRate: '4.5%',
      rating: 5.0,
      completedCampaigns: 0,
      rateCard: { instagramReel: 12000, instagramStory: 4000, youtubeShort: 10000, ugcProductVideo: 15000 },
      portfolio: [],
      availability: true,
    };

    const newAccount: UserAccount = {
      id: newUserId,
      email: cleanEmail,
      fullName,
      role: 'creator', // IMMUTABLE FIXED ROLE
      creatorProfileId: newCreatorId,
      avatarUrl: newProfile.avatarUrl,
      createdAt: new Date().toISOString(),
    };

    setAccounts((prev) => [newAccount, ...prev]);
    setAllCreators((prev) => [newProfile, ...prev]);
    setCurrentCreator(newProfile);
    setCurrentUser(newAccount);
    setSessionCookie('creator', cleanEmail);

    return { success: true };
  };

  // Logout
  const logout = async () => {
    setCurrentUser(null);
    clearSessionCookie();
  };

  // Campaigns & Features
  const createCampaign = (data: Partial<Campaign>): Campaign => {
    const newId = `camp-${Date.now()}`;
    const newCampaign: Campaign = {
      id: newId,
      brandId: currentBrand.id,
      brandName: currentBrand.companyName,
      brandLogo: currentBrand.logoUrl,
      title: data.title || 'Untitled Campaign',
      category: data.category || 'Beauty & Skincare',
      description: data.description || '',
      objective: data.objective || 'Brand Awareness',
      coverImage: data.coverImage || 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80',
      status: 'active',
      budget: data.budget || 50000,
      paymentPerCreator: data.paymentPerCreator || 15000,
      creatorsNeeded: data.creatorsNeeded || 3,
      applicationsCount: 0,
      acceptedCount: 0,
      deadline: data.deadline || '2026-12-31',
      submissionDeadline: data.submissionDeadline || '2026-12-20',
      requirements: data.requirements || {
        niches: ['Beauty & Skincare'],
        platforms: ['Instagram'],
        location: 'India',
        minFollowers: 1000,
        deliverables: ['1x Instagram Reel', '1x Story'],
      },
      brief: data.brief || {
        instructions: 'Follow brand aesthetic guidelines and produce high-resolution content.',
        dos: ['Good lighting', 'Natural speech'],
        donts: ['Low resolution', 'Over-promising claims'],
        references: [],
      },
      createdAt: new Date().toISOString(),
    };

    setCampaigns((prev) => [newCampaign, ...prev]);

    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      userId: currentBrand.id,
      role: 'brand',
      title: 'Campaign Brief Published',
      message: `"${newCampaign.title}" is live! Creators can now apply.`,
      type: 'campaign',
      read: false,
      linkUrl: `/brand/campaigns/${newId}`,
      createdAt: new Date().toISOString(),
    };
    setNotifications((prev) => [newNotif, ...prev]);

    return newCampaign;
  };

  const updateCampaignStatus = (campaignId: string, status: Campaign['status']) => {
    setCampaigns((prev) =>
      prev.map((c) => (c.id === campaignId ? { ...c, status } : c))
    );
  };

  const applyToCampaign = ({
    campaignId,
    pitch,
    portfolioLinks,
    proposedRate,
  }: {
    campaignId: string;
    pitch: string;
    portfolioLinks: string[];
    proposedRate: number;
  }) => {
    const existing = applications.find(
      (a) => a.campaignId === campaignId && a.creatorId === currentCreator.id
    );
    if (existing) {
      return { success: false, message: 'You have already applied to this campaign.' };
    }

    const campaign = campaigns.find((c) => c.id === campaignId);
    if (!campaign) {
      return { success: false, message: 'Campaign not found.' };
    }

    const newApp: CampaignApplication = {
      id: `app-${Date.now()}`,
      campaignId,
      campaignTitle: campaign.title,
      brandId: campaign.brandId,
      brandName: campaign.brandName,
      creatorId: currentCreator.id,
      creatorName: currentCreator.fullName,
      creatorHandle: currentCreator.handle,
      creatorAvatar: currentCreator.avatarUrl,
      creatorNiche: currentCreator.niche[0] || 'Creator',
      creatorFollowers: currentCreator.followerCount,
      creatorEngagement: currentCreator.engagementRate,
      pitch,
      portfolioLinks,
      proposedRate,
      status: 'pending',
      appliedAt: new Date().toISOString(),
    };

    setApplications((prev) => [newApp, ...prev]);

    setCampaigns((prev) =>
      prev.map((c) =>
        c.id === campaignId
          ? { ...c, applicationsCount: c.applicationsCount + 1 }
          : c
      )
    );

    const notif: AppNotification = {
      id: `notif-${Date.now()}`,
      userId: campaign.brandId,
      role: 'brand',
      title: 'New Creator Application',
      message: `${currentCreator.fullName} (${currentCreator.handle}) applied to "${campaign.title}".`,
      type: 'application',
      read: false,
      linkUrl: `/brand/campaigns/${campaign.id}`,
      createdAt: new Date().toISOString(),
    };
    setNotifications((prev) => [notif, ...prev]);

    return { success: true, message: 'Application submitted successfully!' };
  };

  const updateApplicationStatus = (
    applicationId: string,
    status: ApplicationStatus,
    notes?: string
  ) => {
    const targetApp = applications.find((a) => a.id === applicationId);
    if (!targetApp) return;

    setApplications((prev) =>
      prev.map((app) =>
        app.id === applicationId ? { ...app, status, reviewNotes: notes || app.reviewNotes } : app
      )
    );

    if (status === 'accepted') {
      const camp = campaigns.find((c) => c.id === targetApp.campaignId);
      const newCollabId = `collab-${Date.now()}`;
      
      const newDeliverables: Deliverable[] = (camp?.requirements.deliverables || ['1x Instagram Reel', '1x Story']).map((item, idx) => ({
        id: `deliv-${Date.now()}-${idx}`,
        collaborationId: newCollabId,
        title: item,
        format: (item.toLowerCase().includes('reel') ? 'Instagram Reel' : 'UGC Video') as any,
        status: 'pending',
      }));

      const newCollab: Collaboration = {
        id: newCollabId,
        campaignId: targetApp.campaignId,
        campaignTitle: targetApp.campaignTitle,
        campaignCover: camp?.coverImage || 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800',
        brandId: targetApp.brandId,
        brandName: targetApp.brandName,
        brandLogo: camp?.brandLogo || 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=150',
        creatorId: targetApp.creatorId,
        creatorName: targetApp.creatorName,
        creatorAvatar: targetApp.creatorAvatar,
        status: 'in_progress',
        deadline: camp?.submissionDeadline || '2026-12-01',
        agreedAmount: targetApp.proposedRate,
        deliverables: newDeliverables,
        createdAt: new Date().toISOString(),
      };

      setCollaborations((prev) => [newCollab, ...prev]);

      setCampaigns((prev) =>
        prev.map((c) =>
          c.id === targetApp.campaignId
            ? { ...c, acceptedCount: c.acceptedCount + 1 }
            : c
        )
      );

      const notif: AppNotification = {
        id: `notif-${Date.now()}`,
        userId: targetApp.creatorId,
        role: 'creator',
        title: 'Application Accepted! 🎉',
        message: `${targetApp.brandName} accepted your pitch for "${targetApp.campaignTitle}". Agreed compensation: ₹${targetApp.proposedRate.toLocaleString('en-IN')}.`,
        type: 'application',
        read: false,
        linkUrl: `/creator/collaborations/${newCollabId}`,
        createdAt: new Date().toISOString(),
      };
      setNotifications((prev) => [notif, ...prev]);
    }
  };

  const submitDeliverable = (
    collaborationId: string,
    deliverableId: string,
    data: { fileUrl: string; notes: string }
  ) => {
    setCollaborations((prev) =>
      prev.map((collab) => {
        if (collab.id !== collaborationId) return collab;
        const updated = collab.deliverables.map((d) =>
          d.id === deliverableId
            ? {
                ...d,
                status: 'submitted' as const,
                fileUrl: data.fileUrl,
                previewUrl: data.fileUrl,
                notes: data.notes,
                submittedAt: new Date().toISOString(),
              }
            : d
        );
        return { ...collab, deliverables: updated, status: 'deliverable_submitted' };
      })
    );
  };

  const reviewDeliverable = (
    collaborationId: string,
    deliverableId: string,
    action: 'approved' | 'changes_requested',
    feedback?: string
  ) => {
    setCollaborations((prev) =>
      prev.map((collab) => {
        if (collab.id !== collaborationId) return collab;
        const updated = collab.deliverables.map((d) =>
          d.id === deliverableId
            ? {
                ...d,
                status: action === 'approved' ? ('approved' as const) : ('changes_requested' as const),
                reviewFeedback: feedback,
              }
            : d
        );

        const allApproved = updated.every((d) => d.status === 'approved');
        return {
          ...collab,
          deliverables: updated,
          status: allApproved ? 'completed' : action === 'changes_requested' ? 'revision_requested' : collab.status,
        };
      })
    );
  };

  const toggleSaveInspiration = (id: string) => {
    setSavedInspirationIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const addBrandFunds = (amount: number, method: string) => {
    setBrandWallet((prev) => ({
      ...prev,
      availableBalance: prev.availableBalance + amount,
      totalAddedFunds: prev.totalAddedFunds + amount,
    }));

    const newTx: WalletTransaction = {
      id: `tx-${Date.now()}`,
      walletId: 'wallet-brand-1',
      type: 'deposit',
      amount,
      currency: 'INR',
      status: 'completed',
      description: `Funds deposit via ${method}`,
      createdAt: new Date().toISOString(),
    };
    setBrandTransactions((prev) => [newTx, ...prev]);
  };

  const withdrawCreatorFunds = (amount: number, method: string) => {
    if (amount > creatorWallet.availableBalance) {
      return { success: false, message: 'Insufficient available balance' };
    }

    setCreatorWallet((prev) => ({
      ...prev,
      availableBalance: prev.availableBalance - amount,
      totalWithdrawn: prev.totalWithdrawn + amount,
    }));

    const newTx: WalletTransaction = {
      id: `tx-${Date.now()}`,
      walletId: 'wallet-creator-1',
      type: 'withdrawal',
      amount,
      currency: 'INR',
      status: 'completed',
      description: `Payout to ${method}`,
      createdAt: new Date().toISOString(),
    };
    setCreatorTransactions((prev) => [newTx, ...prev]);

    return { success: true, message: `Payout of ₹${amount.toLocaleString('en-IN')} initiated!` };
  };

  const updateBrandProfile = (updates: Partial<BrandProfile>) => {
    setCurrentBrand((prev) => ({ ...prev, ...updates }));
    setAllBrands((prev) =>
      prev.map((b) => (b.id === currentBrand.id ? { ...b, ...updates } : b))
    );
  };

  const updateCreatorProfile = (updates: Partial<CreatorProfile>) => {
    setCurrentCreator((prev) => ({ ...prev, ...updates }));
    setAllCreators((prev) =>
      prev.map((c) => (c.id === currentCreator.id ? { ...c, ...updates } : c))
    );
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const resetAllData = () => {
    localStorage.removeItem(STORAGE_KEY);
    clearSessionCookie();
    setAccounts(INITIAL_ACCOUNTS);
    setCurrentUser(INITIAL_ACCOUNTS[0]);
    setSessionCookie('brand', INITIAL_ACCOUNTS[0].email);
    setCurrentBrand(INITIAL_BRANDS[0]);
    setCurrentCreator(INITIAL_CREATORS[0]);
    setAllBrands(INITIAL_BRANDS);
    setAllCreators(INITIAL_CREATORS);
    setCampaigns(INITIAL_CAMPAIGNS);
    setApplications(INITIAL_APPLICATIONS);
    setCollaborations(INITIAL_COLLABORATIONS);
    setInspirations(INITIAL_INSPIRATIONS);
    setSavedInspirationIds(['insp-1', 'insp-4']);
    setBrandWallet(INITIAL_BRAND_WALLET);
    setCreatorWallet(INITIAL_CREATOR_WALLET);
    setBrandTransactions(INITIAL_BRAND_TRANSACTIONS);
    setCreatorTransactions(INITIAL_CREATOR_TRANSACTIONS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setPayoutMethods(INITIAL_PAYOUT_METHODS);
  };

  return (
    <UGCFYContext.Provider
      value={{
        currentUser,
        role,
        isAuthenticated: Boolean(currentUser),
        isLoaded,
        loginBrand,
        loginCreator,
        registerBrand,
        registerCreator,
        logout,
        currentBrand,
        currentCreator,
        allBrands,
        allCreators,
        campaigns,
        applications,
        collaborations,
        inspirations,
        savedInspirationIds,
        brandWallet,
        creatorWallet,
        brandTransactions,
        creatorTransactions,
        notifications,
        payoutMethods,
        createCampaign,
        updateCampaignStatus,
        applyToCampaign,
        updateApplicationStatus,
        submitDeliverable,
        reviewDeliverable,
        toggleSaveInspiration,
        addBrandFunds,
        withdrawCreatorFunds,
        updateBrandProfile,
        updateCreatorProfile,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        resetAllData,
      }}
    >
      {children}
    </UGCFYContext.Provider>
  );
}

export function useUGCFY() {
  const context = useContext(UGCFYContext);
  if (!context) {
    throw new Error('useUGCFY must be used within a UGCFYProvider');
  }
  return context;
}
