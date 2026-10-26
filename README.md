# UGCFY — Creator & Brand UGC Influencer Platform

A SaaS platform connecting D2C Brands and UGC (User Generated Content) Creators with structured campaign workflows, Pinterest-style viral ads inspiration library, escrow-backed milestone payouts in INR (₹), and video review pipelines.

---

## 🚀 Key Features

### 1. Dual Dashboard Experiences
- **Brand Space (`/brand/dashboard`)**:
  - Live spend analytics and deliverables status
  - Multi-step Campaign Creator Wizard (5 steps: Details &rarr; Creator Requirements &rarr; Budget &amp; Escrow &rarr; Creative Brief &rarr; Review &amp; Launch)
  - Applications pipeline: review creator pitches, inspect portfolios, shortlist, and accept with instant escrow lock
  - Deliverable review workroom: preview video submissions, request revisions with feedback, and approve final content with instant payout release
  - Brand Escrow Wallet: INR (₹) ledger, monthly spend graph, Add Funds modal (UPI, Net Banking, Card), invoice viewer, and CSV transaction export
  - Brand profile and GSTIN tax billing management

- **Creator Space (`/creator/dashboard`)**:
  - Earnings tracker (Total Earned, Available Balance, Pending in Escrow, Total Withdrawn)
  - Campaign discovery with filters by niche, platform, budget, and deliverables
  - One-click pitch application drawer with custom proposed rates and portfolio attachments
  - Collaboration Workroom: deliverable upload (video URL, review notes), feedback tracker, revision status
  - Creator Wallet: instant UPI and IMPS bank withdrawal requests, payout ledger
  - Creator Media Kit: rate card configuration (Reels, Stories, Shorts, Raw UGC), follower stats, portfolio showcases, and availability toggle

### 2. Ads Inspiration Library (`/brand/inspiration` & `/creator/inspiration`)
- Responsive Pinterest-style masonry grid
- Real-world viral hook analysis, storytelling frameworks, and CTA breakdowns
- Filterable by platform (Instagram, YouTube, TikTok), format (UGC Videos, Product Demos, Testimonials, Unboxing), and industry (Beauty, Tech, Coffee, Fashion, Lifestyle)
- Interactive collection bookmarking system

### 3. Production Architecture & Demo Mode
- **Zero-Setup Interactive Demo**: Pre-loaded with 8 Indian campaigns (Plum Goodness, Minimalist Skincare, boAt Lifestyle, Sleepy Owl Coffee), 6 creator profiles, active applications, deliverables, and transactions
- **Reactive Local Storage Persistence**: All actions (creating campaigns, accepting pitches, submitting deliverables, approving videos, adding funds, withdrawing) persist across page reloads
- **Instant Role Switcher**: Switch between Brand and Creator workspaces anytime using the sidebar or menu
- **Supabase Integration**: PostgreSQL schema with Row Level Security (RLS) policies provided in `supabase/schema.sql`

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (Strict mode)
- **Styling**: Tailwind CSS & Vanilla CSS Design Tokens
- **Icons**: Lucide React
- **Charts**: Recharts (Responsive area and bar charts)
- **Backend / Database**: Supabase PostgreSQL schema with RLS policies (`supabase/schema.sql`)
- **State Engine**: Custom reactive Context store with `localStorage` persistence

---

## 🏃 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment (Optional):**
   ```bash
   cp .env.example .env.local
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Run production build:**
   ```bash
   npm run build
   ```

---

## 📂 Project Structure

```
├── src/
│   ├── app/
│   │   ├── brand/
│   │   │   ├── dashboard/page.tsx      # Brand Overview & KPIs
│   │   │   ├── campaigns/page.tsx      # Campaign Hub (My, Explore, Drafts)
│   │   │   ├── campaigns/new/page.tsx  # Multi-step Campaign Wizard
│   │   │   ├── campaigns/[id]/page.tsx # Applicant & Deliverable review
│   │   │   ├── inspiration/page.tsx    # Ads Inspiration Library
│   │   │   ├── wallet/page.tsx         # Brand Escrow & Spending Wallet
│   │   │   └── profile/page.tsx        # Brand Company & Billing Profile
│   │   ├── creator/
│   │   │   ├── dashboard/page.tsx      # Creator Overview & Royalties
│   │   │   ├── campaigns/page.tsx      # Campaign Discovery & Applications
│   │   │   ├── campaigns/[id]/page.tsx # Campaign Brief & Pitch Drawer
│   │   │   ├── applications/page.tsx   # Applications Status Tracker
│   │   │   ├── collaborations/[id]/page.tsx # Deliverable Workroom
│   │   │   ├── inspiration/page.tsx    # Ads Inspiration Library
│   │   │   ├── wallet/page.tsx         # Creator Earnings & Withdrawal
│   │   │   └── profile/page.tsx        # Creator Media Kit & Rate Card
│   │   ├── login/page.tsx              # Quick 1-click Demo Logins
│   │   ├── signup/page.tsx             # Role selection signup
│   │   ├── onboarding/page.tsx         # Brand/Creator onboarding wizard
│   │   ├── layout.tsx                  # Root layout & UGCFYProvider
│   │   └── page.tsx                    # SaaS Marketing Landing Page
│   ├── components/
│   │   ├── layout/
│   │   │   ├── DashboardShell.tsx      # Layout wrapper & demo banner
│   │   │   ├── Header.tsx              # Header with notifications & search
│   │   │   └── Sidebar.tsx             # Dark onyx sidebar with role toggle
│   │   └── inspiration/
│   │       └── InspirationLibrary.tsx  # Shared masonry inspiration grid
│   ├── data/
│   │   └── seedData.ts                 # Realistic Indian brands & creators data
│   ├── lib/
│   │   ├── store.tsx                   # Reactive state engine & actions
│   │   └── supabase.ts                 # Supabase client & fallback detection
│   └── types/
│       └── index.ts                    # Strict TypeScript definitions
├── supabase/
│   └── schema.sql                      # Production PostgreSQL schema with RLS
└── README.md
```

---

## 🔐 Database Schema & RLS

The database schema in `supabase/schema.sql` contains:
- Tables: `profiles`, `brand_profiles`, `creator_profiles`, `campaigns`, `campaign_applications`, `collaborations`, `deliverables`, `ad_inspirations`, `wallets`, `wallet_transactions`, `payout_methods`, `notifications`
- Strict Row Level Security policies ensuring brands only access their private campaigns/applications, and creators only manage their own deliverables and financial transactions.
