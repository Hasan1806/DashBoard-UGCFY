export type UserRole = 'brand' | 'creator';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  fullName: string;
  avatarUrl: string;
  createdAt: string;
}

export interface BrandProfile {
  id: string;
  userId: string;
  companyName: string;
  logoUrl: string;
  industry: string;
  description: string;
  website: string;
  contactEmail: string;
  phone: string;
  location: string;
  socialLinks: {
    instagram?: string;
    linkedin?: string;
    youtube?: string;
    twitter?: string;
  };
  billingInfo: {
    gstin?: string;
    billingAddress: string;
    city: string;
    state: string;
    postalCode: string;
  };
  totalCampaigns: number;
  totalSpent: number;
}

export interface PortfolioItem {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  views: string;
  platform: 'Instagram' | 'YouTube' | 'TikTok';
  type: string;
}

export interface CreatorProfile {
  id: string;
  userId: string;
  fullName: string;
  handle: string;
  avatarUrl: string;
  bio: string;
  niche: string[];
  location: string;
  languages: string[];
  platforms: {
    instagram?: { handle: string; followers: string; engagement: string; url: string };
    youtube?: { handle: string; subscribers: string; views: string; url: string };
    tiktok?: { handle: string; followers: string; engagement: string; url: string };
  };
  followerCount: string;
  engagementRate: string;
  rating: number;
  completedCampaigns: number;
  portfolio: PortfolioItem[];
  rateCard: {
    instagramReel: number;
    instagramStory: number;
    youtubeShort: number;
    ugcProductVideo: number;
  };
  availability: boolean;
}

export interface CampaignRequirements {
  niches: string[];
  platforms: string[];
  location: string;
  minFollowers: number;
  maxFollowers?: number;
  deliverables: string[];
}

export interface CampaignBrief {
  instructions: string;
  dos: string[];
  donts: string[];
  references: string[];
  attachments?: string[];
}

export interface Campaign {
  id: string;
  brandId: string;
  brandName: string;
  brandLogo: string;
  title: string;
  category: string;
  description: string;
  objective: 'Brand Awareness' | 'Conversion & Sales' | 'Product Launch' | 'App Installs' | 'Community Growth';
  coverImage: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  budget: number; // in INR
  paymentPerCreator: number; // in INR
  creatorsNeeded: number;
  applicationsCount: number;
  acceptedCount: number;
  deadline: string;
  submissionDeadline: string;
  requirements: CampaignRequirements;
  brief: CampaignBrief;
  createdAt: string;
}

export type ApplicationStatus = 'pending' | 'shortlisted' | 'accepted' | 'rejected' | 'withdrawn';

export interface CampaignApplication {
  id: string;
  campaignId: string;
  campaignTitle: string;
  brandId: string;
  brandName: string;
  creatorId: string;
  creatorName: string;
  creatorHandle: string;
  creatorAvatar: string;
  creatorNiche: string;
  creatorFollowers: string;
  creatorEngagement: string;
  pitch: string;
  portfolioLinks: string[];
  proposedRate: number;
  status: ApplicationStatus;
  appliedAt: string;
  reviewNotes?: string;
}

export type CollaborationStatus = 
  | 'in_progress' 
  | 'deliverable_submitted' 
  | 'revision_requested' 
  | 'approved' 
  | 'completed' 
  | 'cancelled';

export interface Deliverable {
  id: string;
  collaborationId: string;
  title: string;
  format: 'Instagram Reel' | 'YouTube Video' | 'TikTok / Short' | 'Photo Carousel' | 'UGC Video';
  fileUrl?: string;
  previewUrl?: string;
  notes?: string;
  status: 'pending' | 'submitted' | 'changes_requested' | 'approved';
  submittedAt?: string;
  reviewFeedback?: string;
}

export interface Collaboration {
  id: string;
  campaignId: string;
  campaignTitle: string;
  campaignCover: string;
  brandId: string;
  brandName: string;
  brandLogo: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  status: CollaborationStatus;
  deadline: string;
  agreedAmount: number;
  deliverables: Deliverable[];
  createdAt: string;
}

export interface AdInspiration {
  id: string;
  title: string;
  brandName: string;
  brandLogo?: string;
  industry: 'Beauty' | 'Fashion' | 'Technology' | 'Lifestyle' | 'Food' | 'Fitness' | 'Fintech';
  platform: 'Instagram' | 'TikTok' | 'YouTube';
  format: 'UGC Videos' | 'Product Demonstrations' | 'Testimonials' | 'Unboxing' | 'Trending';
  hookText: string;
  thumbnailUrl: string;
  videoDuration: string;
  hookAnalysis: string;
  storytellingApproach: string;
  ctaTechnique: string;
  whyItWorks: string[];
  sourceAttribution: string;
  savesCount: number;
  tags: string[];
  metrics: {
    views: string;
    likes: string;
    engagement: string;
  };
}

export interface SavedInspiration {
  id: string;
  userId: string;
  inspirationId: string;
  collectionName: string;
  savedAt: string;
}

export interface WalletTransaction {
  id: string;
  walletId: string;
  type: 'deposit' | 'escrow_hold' | 'payout_release' | 'withdrawal' | 'fee' | 'refund';
  amount: number;
  currency: 'INR';
  status: 'completed' | 'pending' | 'failed' | 'processing';
  description: string;
  campaignId?: string;
  campaignName?: string;
  invoiceNo?: string;
  paymentMethod?: string;
  createdAt: string;
}

export interface PayoutMethod {
  id: string;
  userId: string;
  type: 'upi' | 'bank_transfer';
  details: {
    upiId?: string;
    accountNumber?: string;
    ifsc?: string;
    beneficiaryName?: string;
    bankName?: string;
  };
  isPrimary: boolean;
}

export interface BrandWallet {
  availableBalance: number;
  totalAddedFunds: number;
  totalSpending: number;
  reservedBudget: number;
  pendingTransactions: number;
  currency: 'INR';
}

export interface CreatorWallet {
  totalEarnings: number;
  availableBalance: number;
  pendingEarnings: number;
  totalWithdrawn: number;
  currency: 'INR';
}

export interface AppNotification {
  id: string;
  userId: string;
  role: UserRole;
  title: string;
  message: string;
  type: 'application' | 'deliverable' | 'payment' | 'system' | 'campaign';
  read: boolean;
  linkUrl?: string;
  createdAt: string;
}
