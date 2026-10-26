'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
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

interface UGCFYContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
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

const STORAGE_KEY = 'ugcfy_saas_state_v2';

export function UGCFYProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<UserRole>('brand');
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

  // Load from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('ugcfy_saas_state_v1');
      if (saved) {
        // Sanitize any deprecated/broken image URLs
        const sanitized = saved.replace(/photo-1608248597359-002d2a45a303/g, 'photo-1620916566398-39f1143ab7be');
        const parsed = JSON.parse(sanitized);
        if (parsed.role) setRoleState(parsed.role);
        if (parsed.currentBrand) setCurrentBrand(parsed.currentBrand);
        if (parsed.currentCreator) setCurrentCreator(parsed.currentCreator);
        if (parsed.campaigns) setCampaigns(parsed.campaigns);
        if (parsed.applications) setApplications(parsed.applications);
        if (parsed.collaborations) setCollaborations(parsed.collaborations);
        if (parsed.savedInspirationIds) setSavedInspirationIds(parsed.savedInspirationIds);
        if (parsed.brandWallet) setBrandWallet(parsed.brandWallet);
        if (parsed.creatorWallet) setCreatorWallet(parsed.creatorWallet);
        if (parsed.brandTransactions) setBrandTransactions(parsed.brandTransactions);
        if (parsed.creatorTransactions) setCreatorTransactions(parsed.creatorTransactions);
        if (parsed.notifications) setNotifications(parsed.notifications);
        if (parsed.payoutMethods) setPayoutMethods(parsed.payoutMethods);
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
        role,
        currentBrand,
        currentCreator,
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
    role,
    currentBrand,
    currentCreator,
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

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
  };

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
      status: (data.status as any) || 'active',
      budget: Number(data.budget) || 100000,
      paymentPerCreator: Number(data.paymentPerCreator) || 15000,
      creatorsNeeded: Number(data.creatorsNeeded) || 5,
      applicationsCount: 0,
      acceptedCount: 0,
      deadline: data.deadline || '2026-12-01',
      submissionDeadline: data.submissionDeadline || '2026-12-15',
      requirements: data.requirements || {
        niches: ['Skincare', 'Beauty'],
        platforms: ['Instagram'],
        location: 'Pan India',
        minFollowers: 10000,
        deliverables: ['1x Instagram Reel', '2x Stories'],
      },
      brief: data.brief || {
        instructions: 'Deliver authentic testimonial.',
        dos: ['Natural lighting'],
        donts: ['No filters'],
        references: [],
      },
      createdAt: new Date().toISOString(),
    };

    setCampaigns((prev) => [newCampaign, ...prev]);

    // Reserve budget in brand wallet if active
    if (newCampaign.status === 'active') {
      setBrandWallet((prev) => ({
        ...prev,
        availableBalance: Math.max(0, prev.availableBalance - newCampaign.budget),
        reservedBudget: prev.reservedBudget + newCampaign.budget,
      }));

      // Add transaction
      const newTx: WalletTransaction = {
        id: `tx-b-${Date.now()}`,
        walletId: 'wallet-b-1',
        type: 'escrow_hold',
        amount: newCampaign.budget,
        currency: 'INR',
        status: 'completed',
        description: `Escrow Reserved for Campaign: ${newCampaign.title}`,
        campaignId: newCampaign.id,
        campaignName: newCampaign.title,
        createdAt: new Date().toISOString(),
      };
      setBrandTransactions((prev) => [newTx, ...prev]);
    }

    // Add notification
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      userId: currentBrand.userId,
      role: 'brand',
      title: 'Campaign Created Successfully',
      message: `Your campaign "${newCampaign.title}" is now published and open for creator applications.`,
      type: 'campaign',
      read: false,
      linkUrl: `/brand/campaigns/${newCampaign.id}`,
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

    // Update campaign counter
    setCampaigns((prev) =>
      prev.map((c) =>
        c.id === campaignId
          ? { ...c, applicationsCount: c.applicationsCount + 1 }
          : c
      )
    );

    // Notify brand
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

    // If accepted, instantiate collaboration and deliverables
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

      // Update accepted count on campaign
      setCampaigns((prev) =>
        prev.map((c) =>
          c.id === targetApp.campaignId
            ? { ...c, acceptedCount: c.acceptedCount + 1 }
            : c
        )
      );

      // Notify creator
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
    } else if (status === 'rejected') {
      const notif: AppNotification = {
        id: `notif-${Date.now()}`,
        userId: targetApp.creatorId,
        role: 'creator',
        title: 'Application Update',
        message: `Your application for "${targetApp.campaignTitle}" was not selected at this time.`,
        type: 'application',
        read: false,
        linkUrl: `/creator/applications`,
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
      prev.map((c) => {
        if (c.id !== collaborationId) return c;
        const updatedDeliverables = c.deliverables.map((d) =>
          d.id === deliverableId
            ? {
                ...d,
                fileUrl: data.fileUrl,
                notes: data.notes,
                status: 'submitted' as const,
                submittedAt: new Date().toISOString(),
              }
            : d
        );
        return {
          ...c,
          status: 'deliverable_submitted',
          deliverables: updatedDeliverables,
        };
      })
    );

    const collab = collaborations.find((c) => c.id === collaborationId);
    if (collab) {
      const notif: AppNotification = {
        id: `notif-${Date.now()}`,
        userId: collab.brandId,
        role: 'brand',
        title: 'New Deliverable Submitted for Review',
        message: `${collab.creatorName} submitted content for "${collab.campaignTitle}". Check and approve.`,
        type: 'deliverable',
        read: false,
        linkUrl: `/brand/campaigns/${collab.campaignId}`,
        createdAt: new Date().toISOString(),
      };
      setNotifications((prev) => [notif, ...prev]);
    }
  };

  const reviewDeliverable = (
    collaborationId: string,
    deliverableId: string,
    action: 'approved' | 'changes_requested',
    feedback?: string
  ) => {
    let collabSnapshot: Collaboration | undefined;

    setCollaborations((prev) =>
      prev.map((c) => {
        if (c.id !== collaborationId) return c;
        collabSnapshot = c;
        const updatedDeliverables = c.deliverables.map((d) =>
          d.id === deliverableId
            ? {
                ...d,
                status: action === 'approved' ? ('approved' as const) : ('changes_requested' as const),
                reviewFeedback: feedback || (action === 'approved' ? 'Approved! Looks fantastic.' : 'Revision requested.'),
              }
            : d
        );

        const allApproved = updatedDeliverables.every((d) => d.status === 'approved');

        return {
          ...c,
          status: allApproved ? 'approved' : action === 'changes_requested' ? 'revision_requested' : c.status,
          deliverables: updatedDeliverables,
        };
      })
    );

    if (action === 'approved' && collabSnapshot) {
      // Release payment to creator wallet
      const amount = collabSnapshot.agreedAmount;
      setCreatorWallet((prev) => ({
        ...prev,
        availableBalance: prev.availableBalance + amount,
        totalEarnings: prev.totalEarnings + amount,
      }));

      // Creator transaction
      const creatorTx: WalletTransaction = {
        id: `tx-c-${Date.now()}`,
        walletId: 'wallet-c-1',
        type: 'payout_release',
        amount,
        currency: 'INR',
        status: 'completed',
        description: `Payment released for "${collabSnapshot.campaignTitle}"`,
        campaignId: collabSnapshot.campaignId,
        campaignName: collabSnapshot.campaignTitle,
        invoiceNo: `CR-INV-${Date.now().toString().slice(-5)}`,
        paymentMethod: 'UGCFY Escrow Release',
        createdAt: new Date().toISOString(),
      };
      setCreatorTransactions((prev) => [creatorTx, ...prev]);

      // Brand wallet update
      setBrandWallet((prev) => ({
        ...prev,
        reservedBudget: Math.max(0, prev.reservedBudget - amount),
        totalSpending: prev.totalSpending + amount,
      }));

      const brandTx: WalletTransaction = {
        id: `tx-b-${Date.now()}`,
        walletId: 'wallet-b-1',
        type: 'payout_release',
        amount,
        currency: 'INR',
        status: 'completed',
        description: `Deliverable Approved Payout to ${collabSnapshot.creatorName}`,
        campaignId: collabSnapshot.campaignId,
        campaignName: collabSnapshot.campaignTitle,
        invoiceNo: `BR-PAY-${Date.now().toString().slice(-5)}`,
        paymentMethod: 'Escrow Ledger Release',
        createdAt: new Date().toISOString(),
      };
      setBrandTransactions((prev) => [brandTx, ...prev]);

      // Notify Creator
      const notif: AppNotification = {
        id: `notif-${Date.now()}`,
        userId: collabSnapshot.creatorId,
        role: 'creator',
        title: 'Deliverable Approved & Funds Released! 💸',
        message: `${collabSnapshot.brandName} approved your content! ₹${amount.toLocaleString('en-IN')} has been credited to your available wallet.`,
        type: 'payment',
        read: false,
        linkUrl: `/creator/wallet`,
        createdAt: new Date().toISOString(),
      };
      setNotifications((prev) => [notif, ...prev]);
    } else if (action === 'changes_requested' && collabSnapshot) {
      const notif: AppNotification = {
        id: `notif-${Date.now()}`,
        userId: collabSnapshot.creatorId,
        role: 'creator',
        title: 'Revision Requested on Deliverable',
        message: `${collabSnapshot.brandName} requested updates: "${feedback || 'Please review creative feedback.'}"`,
        type: 'deliverable',
        read: false,
        linkUrl: `/creator/collaborations/${collabSnapshot.id}`,
        createdAt: new Date().toISOString(),
      };
      setNotifications((prev) => [notif, ...prev]);
    }
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
      id: `tx-b-${Date.now()}`,
      walletId: 'wallet-b-1',
      type: 'deposit',
      amount,
      currency: 'INR',
      status: 'completed',
      description: `Added funds via ${method}`,
      invoiceNo: `INV-${new Date().getFullYear()}-${Date.now().toString().slice(-4)}`,
      paymentMethod: method,
      createdAt: new Date().toISOString(),
    };
    setBrandTransactions((prev) => [newTx, ...prev]);

    const notif: AppNotification = {
      id: `notif-${Date.now()}`,
      userId: currentBrand.userId,
      role: 'brand',
      title: 'Funds Added Successfully',
      message: `₹${amount.toLocaleString('en-IN')} credited to your available wallet via ${method}.`,
      type: 'payment',
      read: false,
      linkUrl: '/brand/wallet',
      createdAt: new Date().toISOString(),
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const withdrawCreatorFunds = (amount: number, method: string) => {
    if (amount > creatorWallet.availableBalance) {
      return { success: false, message: 'Insufficient available balance.' };
    }
    if (amount < 500) {
      return { success: false, message: 'Minimum withdrawal amount is ₹500.' };
    }

    setCreatorWallet((prev) => ({
      ...prev,
      availableBalance: prev.availableBalance - amount,
      totalWithdrawn: prev.totalWithdrawn + amount,
    }));

    const newTx: WalletTransaction = {
      id: `tx-c-${Date.now()}`,
      walletId: 'wallet-c-1',
      type: 'withdrawal',
      amount,
      currency: 'INR',
      status: 'completed',
      description: `Instant payout via ${method}`,
      invoiceNo: `WTH-${new Date().getFullYear()}-${Date.now().toString().slice(-4)}`,
      paymentMethod: method,
      createdAt: new Date().toISOString(),
    };
    setCreatorTransactions((prev) => [newTx, ...prev]);

    const notif: AppNotification = {
      id: `notif-${Date.now()}`,
      userId: currentCreator.userId,
      role: 'creator',
      title: 'Payout Processed Successfully',
      message: `₹${amount.toLocaleString('en-IN')} has been disbursed to your ${method}.`,
      type: 'payment',
      read: false,
      linkUrl: '/creator/wallet',
      createdAt: new Date().toISOString(),
    };
    setNotifications((prev) => [notif, ...prev]);

    return { success: true, message: `Successfully withdrawn ₹${amount.toLocaleString('en-IN')}!` };
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
    setRoleState('brand');
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
        role,
        setRole,
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
