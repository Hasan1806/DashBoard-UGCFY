-- ============================================================
-- UGCFY SUPABASE POSTGRESQL SCHEMA & RLS POLICIES
-- UGC Media Production & Influencer Marketing Platform
-- ============================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS
CREATE TYPE user_role AS ENUM ('brand', 'creator');
CREATE TYPE campaign_status AS ENUM ('draft', 'active', 'paused', 'completed');
CREATE TYPE application_status AS ENUM ('pending', 'shortlisted', 'accepted', 'rejected', 'withdrawn');
CREATE TYPE collaboration_status AS ENUM ('in_progress', 'deliverable_submitted', 'revision_requested', 'approved', 'completed', 'cancelled');
CREATE TYPE deliverable_status AS ENUM ('pending', 'submitted', 'changes_requested', 'approved');
CREATE TYPE deliverable_format AS ENUM ('Instagram Reel', 'YouTube Video', 'TikTok / Short', 'Photo Carousel', 'UGC Video');
CREATE TYPE transaction_type AS ENUM ('deposit', 'escrow_hold', 'payout_release', 'withdrawal', 'fee', 'refund');
CREATE TYPE transaction_status AS ENUM ('completed', 'pending', 'failed', 'processing');
CREATE TYPE notification_type AS ENUM ('application', 'deliverable', 'payment', 'system', 'campaign');

-- 3. USERS / PROFILES
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role user_role NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 4. BRAND PROFILES
CREATE TABLE IF NOT EXISTS public.brand_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    company_name TEXT NOT NULL,
    logo_url TEXT,
    industry TEXT NOT NULL,
    description TEXT,
    website TEXT,
    contact_email TEXT,
    phone TEXT,
    location TEXT,
    social_links JSONB DEFAULT '{}'::jsonb,
    billing_info JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 5. CREATOR PROFILES
CREATE TABLE IF NOT EXISTS public.creator_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    handle TEXT UNIQUE NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    niche TEXT[] DEFAULT ARRAY[]::TEXT[],
    location TEXT,
    languages TEXT[] DEFAULT ARRAY[]::TEXT[],
    platforms JSONB DEFAULT '{}'::jsonb,
    follower_count TEXT DEFAULT '0',
    engagement_rate TEXT DEFAULT '0%',
    rating NUMERIC(3, 2) DEFAULT 5.0,
    completed_campaigns INT DEFAULT 0,
    rate_card JSONB DEFAULT '{}'::jsonb,
    portfolio JSONB DEFAULT '[]'::jsonb,
    availability BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 6. CAMPAIGNS
CREATE TABLE IF NOT EXISTS public.campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand_id UUID NOT NULL REFERENCES public.brand_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    objective TEXT NOT NULL,
    cover_image TEXT NOT NULL,
    status campaign_status DEFAULT 'draft' NOT NULL,
    budget NUMERIC(12, 2) NOT NULL,
    payment_per_creator NUMERIC(10, 2) NOT NULL,
    creators_needed INT NOT NULL DEFAULT 1,
    applications_count INT DEFAULT 0,
    accepted_count INT DEFAULT 0,
    deadline DATE NOT NULL,
    submission_deadline DATE NOT NULL,
    requirements JSONB NOT NULL DEFAULT '{}'::jsonb,
    brief JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 7. CAMPAIGN APPLICATIONS
CREATE TABLE IF NOT EXISTS public.campaign_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
    creator_id UUID NOT NULL REFERENCES public.creator_profiles(id) ON DELETE CASCADE,
    pitch TEXT NOT NULL,
    portfolio_links TEXT[] DEFAULT ARRAY[]::TEXT[],
    proposed_rate NUMERIC(10, 2) NOT NULL,
    status application_status DEFAULT 'pending' NOT NULL,
    review_notes TEXT,
    applied_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    CONSTRAINT unique_campaign_creator_application UNIQUE (campaign_id, creator_id)
);

-- 8. COLLABORATIONS
CREATE TABLE IF NOT EXISTS public.collaborations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
    brand_id UUID NOT NULL REFERENCES public.brand_profiles(id) ON DELETE CASCADE,
    creator_id UUID NOT NULL REFERENCES public.creator_profiles(id) ON DELETE CASCADE,
    status collaboration_status DEFAULT 'in_progress' NOT NULL,
    deadline DATE NOT NULL,
    agreed_amount NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 9. DELIVERABLES
CREATE TABLE IF NOT EXISTS public.deliverables (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    collaboration_id UUID NOT NULL REFERENCES public.collaborations(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    format deliverable_format NOT NULL,
    file_url TEXT,
    preview_url TEXT,
    notes TEXT,
    status deliverable_status DEFAULT 'pending' NOT NULL,
    submitted_at TIMESTAMPTZ,
    review_feedback TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 10. AD INSPIRATIONS
CREATE TABLE IF NOT EXISTS public.ad_inspirations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    brand_name TEXT NOT NULL,
    industry TEXT NOT NULL,
    platform TEXT NOT NULL,
    format TEXT NOT NULL,
    hook_text TEXT NOT NULL,
    thumbnail_url TEXT NOT NULL,
    video_url TEXT,
    video_duration TEXT,
    hook_analysis TEXT NOT NULL,
    storytelling_approach TEXT NOT NULL,
    cta_technique TEXT NOT NULL,
    why_it_works TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    source_attribution TEXT NOT NULL,
    saves_count INT DEFAULT 0,
    tags TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    metrics JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 11. SAVED INSPIRATIONS & COLLECTIONS
CREATE TABLE IF NOT EXISTS public.inspiration_collections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.saved_inspirations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    inspiration_id UUID NOT NULL REFERENCES public.ad_inspirations(id) ON DELETE CASCADE,
    collection_id UUID REFERENCES public.inspiration_collections(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    CONSTRAINT unique_user_saved_inspiration UNIQUE (user_id, inspiration_id)
);

-- 12. WALLETS
CREATE TABLE IF NOT EXISTS public.wallets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role user_role NOT NULL,
    available_balance NUMERIC(12, 2) DEFAULT 0.00 NOT NULL,
    total_added_funds NUMERIC(12, 2) DEFAULT 0.00,
    total_spending NUMERIC(12, 2) DEFAULT 0.00,
    reserved_budget NUMERIC(12, 2) DEFAULT 0.00,
    total_earnings NUMERIC(12, 2) DEFAULT 0.00,
    pending_earnings NUMERIC(12, 2) DEFAULT 0.00,
    total_withdrawn NUMERIC(12, 2) DEFAULT 0.00,
    currency TEXT DEFAULT 'INR' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 13. WALLET TRANSACTIONS
CREATE TABLE IF NOT EXISTS public.wallet_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wallet_id UUID NOT NULL REFERENCES public.wallets(id) ON DELETE CASCADE,
    type transaction_type NOT NULL,
    amount NUMERIC(12, 2) NOT NULL,
    currency TEXT DEFAULT 'INR' NOT NULL,
    status transaction_status DEFAULT 'pending' NOT NULL,
    description TEXT NOT NULL,
    campaign_id UUID REFERENCES public.campaigns(id) ON DELETE SET NULL,
    invoice_no TEXT,
    payment_method TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 14. PAYOUT REQUESTS & METHODS
CREATE TABLE IF NOT EXISTS public.payout_methods (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    details JSONB NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.payout_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    creator_id UUID NOT NULL REFERENCES public.creator_profiles(id) ON DELETE CASCADE,
    payout_method_id UUID NOT NULL REFERENCES public.payout_methods(id),
    amount NUMERIC(10, 2) NOT NULL,
    status TEXT DEFAULT 'pending' NOT NULL,
    processed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 15. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role user_role NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type notification_type NOT NULL,
    read BOOLEAN DEFAULT FALSE NOT NULL,
    link_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 16. INDEXES
CREATE INDEX idx_campaigns_brand_id ON public.campaigns(brand_id);
CREATE INDEX idx_campaigns_status ON public.campaigns(status);
CREATE INDEX idx_applications_campaign_id ON public.campaign_applications(campaign_id);
CREATE INDEX idx_applications_creator_id ON public.campaign_applications(creator_id);
CREATE INDEX idx_collaborations_brand_id ON public.collaborations(brand_id);
CREATE INDEX idx_collaborations_creator_id ON public.collaborations(creator_id);
CREATE INDEX idx_deliverables_collaboration_id ON public.deliverables(collaboration_id);
CREATE INDEX idx_wallet_transactions_wallet_id ON public.wallet_transactions(wallet_id);
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);

-- 17. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brand_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.creator_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collaborations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deliverables ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallet_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payout_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payout_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ad_inspirations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_inspirations ENABLE ROW LEVEL SECURITY;

-- Public read for active campaigns & ad inspirations
CREATE POLICY "Anyone can view active campaigns" ON public.campaigns
    FOR SELECT USING (status = 'active');

CREATE POLICY "Brands can view and manage their own campaigns" ON public.campaigns
    FOR ALL USING (brand_id IN (SELECT id FROM public.brand_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Anyone can view inspirations" ON public.ad_inspirations
    FOR SELECT USING (true);

-- Applications: Brands can view applications for their campaigns; Creators can view their own applications
CREATE POLICY "Creators can view their own applications" ON public.campaign_applications
    FOR SELECT USING (creator_id IN (SELECT id FROM public.creator_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Creators can insert their own applications" ON public.campaign_applications
    FOR INSERT WITH CHECK (creator_id IN (SELECT id FROM public.creator_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Brands can view and update applications for their campaigns" ON public.campaign_applications
    FOR ALL USING (
        campaign_id IN (
            SELECT c.id FROM public.campaigns c
            JOIN public.brand_profiles b ON c.brand_id = b.id
            WHERE b.user_id = auth.uid()
        )
    );

-- Wallets and Transactions: strictly private to user
CREATE POLICY "Users can only view their own wallet" ON public.wallets
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can only view their own transactions" ON public.wallet_transactions
    FOR SELECT USING (
        wallet_id IN (SELECT id FROM public.wallets WHERE user_id = auth.uid())
    );

-- Notifications
CREATE POLICY "Users can view and manage their own notifications" ON public.notifications
    FOR ALL USING (user_id = auth.uid());

-- 18. ROLE IMMUTABILITY TRIGGER
-- Enforces that an account's role cannot be modified once set during registration
CREATE OR REPLACE FUNCTION public.protect_immutable_role()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.role IS NOT NULL AND NEW.role <> OLD.role THEN
        RAISE EXCEPTION 'Account role is immutable and cannot be altered. Existing role: %, Attempted role: %', OLD.role, NEW.role;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_protect_immutable_role ON public.profiles;
CREATE TRIGGER trg_protect_immutable_role
BEFORE UPDATE OF role ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.protect_immutable_role();

