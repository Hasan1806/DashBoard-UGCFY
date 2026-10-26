'use client';

import React from 'react';
import Link from 'next/link';
import {
  Megaphone,
  Users,
  Wallet,
  TrendingUp,
  Plus,
  ArrowRight,
  Clock,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Video,
  Eye,
  Star,
  ShieldCheck,
  Play,
  Layers,
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { useUGCFY } from '@/lib/store';

const SpendRoasChart = dynamic(() => import('@/components/dashboard/SpendRoasChart'), {
  ssr: false,
  loading: () => <div className="h-60 mt-4 w-full animate-pulse bg-zinc-100 rounded-lg" />,
});

const spendingData = [
  { month: 'Jun', spend: 85000, roas: '3.4x' },
  { month: 'Jul', spend: 120000, roas: '3.8x' },
  { month: 'Aug', spend: 160000, roas: '4.1x' },
  { month: 'Sep', spend: 195000, roas: '4.4x' },
  { month: 'Oct', spend: 280000, roas: '4.7x' },
];

export default function BrandDashboardPage() {
  const { currentBrand, campaigns, applications, brandWallet, collaborations, allCreators } = useUGCFY();

  const brandCampaigns = campaigns.filter((c) => c.brandId === currentBrand.id);
  const activeCampaigns = brandCampaigns.filter((c) => c.status === 'active');
  const brandApplications = applications.filter((a) => a.brandId === currentBrand.id);
  const pendingApps = brandApplications.filter((a) => a.status === 'pending');
  const brandCollabs = collaborations.filter((c) => c.brandId === currentBrand.id);
  const pendingCollabs = brandCollabs.filter((c) => c.status === 'deliverable_submitted');

  // Featured top campaign
  const featuredCampaign = brandCampaigns[0] || campaigns[0];
  const supportingCampaigns = brandCampaigns.slice(1, 3).length > 0 ? brandCampaigns.slice(1, 3) : campaigns.slice(1, 3);

  return (
    <DashboardShell>
      <div className="space-y-8 pb-10">
        {/* 1. EDITORIAL SPLIT HERO SECTION */}
        <section className="relative overflow-hidden rounded-2xl bg-[#17171C] text-white border border-[#272730] p-6 sm:p-8 lg:p-10 shadow-xl">
          {/* Subtle radial ambient highlight */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#7456F1]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-[#D7F36B]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-[#D7F36B]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D7F36B] animate-pulse" />
                <span className="font-semibold tracking-wide uppercase text-[10px]">Creative Studio</span>
                <span className="text-white/40">•</span>
                <span className="text-white/80">{currentBrand.companyName} Console</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.12]">
                Bring your next <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/95 to-[#D7F36B]">
                  big idea to life.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed">
                Discover creative talent, launch high-converting UGC campaigns, and scale authentic video ads with guaranteed milestone escrow.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/brand/campaigns/new"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D7F36B] hover:bg-[#cbf04a] text-[#17171C] text-xs font-bold transition-all shadow-md hover:shadow-lg cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>Create Campaign</span>
                </Link>

                <Link
                  href="/brand/inspiration"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/15 text-xs font-medium transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#D7F36B]" />
                  <span>Explore Ad Library</span>
                </Link>
              </div>

              {/* Real-time Ticker Metrics */}
              <div className="flex items-center gap-6 pt-4 border-t border-white/10 text-xs text-zinc-400">
                <div>
                  <span className="block text-lg font-bold text-white tabular-nums">{activeCampaigns.length}</span>
                  <span className="text-[11px] text-zinc-400">Live Briefs</span>
                </div>
                <div className="w-px h-6 bg-white/15" />
                <div>
                  <span className="block text-lg font-bold text-white tabular-nums">{brandApplications.length}</span>
                  <span className="text-[11px] text-zinc-400">Pitches Received</span>
                </div>
                <div className="w-px h-6 bg-white/15" />
                <div>
                  <span className="block text-lg font-bold text-[#D7F36B] tabular-nums">100%</span>
                  <span className="text-[11px] text-zinc-400">Escrow Protected</span>
                </div>
              </div>
            </div>

            {/* Right: Curated Visual Composition (Framed Product & Media Previews with Zero Overlap) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm lg:max-w-none space-y-3">
                {/* Main Framed Card */}
                <div className="rounded-xl overflow-hidden border border-white/15 bg-zinc-900/95 shadow-2xl transition-transform duration-300 hover:scale-[1.01]">
                  <div className="relative aspect-video w-full overflow-hidden bg-black">
                    <img
                      src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=640&auto=format&fit=crop&q=75"
                      alt="UGC Production Shoot"
                      loading="eager"
                      fetchPriority="high"
                      width={640}
                      height={360}
                      className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded bg-[#7456F1] text-white font-semibold text-[10px] tracking-wide uppercase">
                        Active Shoot
                      </span>
                      <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[#D7F36B] font-bold text-[10px]">
                        4.7x ROAS
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-[#17171C] px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 border border-zinc-200">
                      <Star className="w-3 h-3 fill-[#7456F1] text-[#7456F1]" />
                      <span>4.9 Rating</span>
                    </div>
                  </div>

                  <div className="p-4 bg-zinc-900 border-t border-white/10">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-semibold text-white">Authentic Skincare Routine Reel</span>
                      <span className="text-[#D7F36B] text-[11px] font-bold">4 Creators</span>
                    </div>
                    <p className="text-[11px] text-zinc-400">Plum Goodness &bull; 9:16 4K Vertical Deliverables</p>
                  </div>
                </div>

                {/* Supporting Production Metric Strip (Cleanly Structured Below) */}
                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-3 rounded-xl flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-[#7456F1]/20 border border-[#7456F1]/40 flex items-center justify-center text-[#D7F36B] shrink-0">
                      <Video className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-white truncate">boAt Space ANC</p>
                      <p className="text-[10px] text-zinc-400">18 Deliverables Approved &bull; 100% Escrow</p>
                    </div>
                  </div>

                  <span className="px-2 py-1 rounded-md bg-white/10 text-[#D7F36B] font-bold text-[10px] shrink-0">
                    Live Brief
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. REFINED ANALYTICS & SPEND TRAJECTORY */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold tracking-tight text-[#18181B]">Campaign Performance &amp; Escrow</h2>
              <p className="text-xs text-[#52525B]">Live financial disbursement and creator collaboration volume</p>
            </div>
            <Link
              href="/brand/wallet"
              className="text-xs font-semibold text-[#7456F1] hover:underline flex items-center gap-1"
            >
              <span>Manage Wallet</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Active Campaigns */}
            <div className="bg-white rounded-xl border border-[#E8E8EA] p-4 sm:p-5 creative-card-hover">
              <div className="flex items-center justify-between text-xs text-[#52525B]">
                <span>Active Campaigns</span>
                <span className="w-2 h-2 rounded-full bg-[#168365]" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold tracking-tight text-[#18181B] mt-2 tabular-nums">
                {activeCampaigns.length}
              </p>
              <div className="mt-2 text-[11px] text-[#52525B] flex items-center justify-between">
                <span>{brandCampaigns.length} total briefs</span>
                <span className="text-[#168365] font-semibold">+2 this week</span>
              </div>
            </div>

            {/* Applications Received */}
            <div className="bg-white rounded-xl border border-[#E8E8EA] p-4 sm:p-5 creative-card-hover">
              <div className="flex items-center justify-between text-xs text-[#52525B]">
                <span>Pitches Received</span>
                <Users className="w-3.5 h-3.5 text-[#7456F1]" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold tracking-tight text-[#18181B] mt-2 tabular-nums">
                {brandApplications.length}
              </p>
              <div className="mt-2 text-[11px] text-[#52525B] flex items-center justify-between">
                <span>{pendingApps.length} awaiting review</span>
                <span className="text-[#7456F1] font-semibold">92% match</span>
              </div>
            </div>

            {/* Total Spent */}
            <div className="bg-white rounded-xl border border-[#E8E8EA] p-4 sm:p-5 creative-card-hover">
              <div className="flex items-center justify-between text-xs text-[#52525B]">
                <span>Lifetime UGC Spend</span>
                <TrendingUp className="w-3.5 h-3.5 text-[#168365]" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold tracking-tight text-[#18181B] mt-2 tabular-nums">
                ₹{brandWallet.totalSpending.toLocaleString('en-IN')}
              </p>
              <div className="mt-2 text-[11px] text-[#52525B]">
                ₹{brandWallet.reservedBudget.toLocaleString('en-IN')} committed in escrow
              </div>
            </div>

            {/* Available Balance */}
            <div className="bg-white rounded-xl border border-[#E8E8EA] p-4 sm:p-5 creative-card-hover">
              <div className="flex items-center justify-between text-xs text-[#52525B]">
                <span>Available Escrow</span>
                <Link href="/brand/wallet" className="text-[11px] font-semibold text-[#7456F1] hover:underline">
                  + Add Funds
                </Link>
              </div>
              <p className="text-2xl sm:text-3xl font-bold tracking-tight text-[#18181B] mt-2 tabular-nums">
                ₹{brandWallet.availableBalance.toLocaleString('en-IN')}
              </p>
              <div className="mt-2 text-[11px] text-[#168365] font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Instant creator lock ready</span>
              </div>
            </div>
          </div>

          {/* Spend Chart & Deliverables Review Queue */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
            {/* Chart */}
            <div className="lg:col-span-8 bg-white rounded-xl border border-[#E8E8EA] p-5 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-[#F4F4F5]">
                <div>
                  <h3 className="text-sm font-bold text-[#18181B]">UGC Spend &amp; ROAS Trajectory</h3>
                  <p className="text-xs text-[#52525B] mt-0.5">Budget allocation and media return over the last 5 months</p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#F0EBFF] text-[#4F32BE]">
                  Avg ROAS 4.1x
                </span>
              </div>

              <div className="mt-4">
                <SpendRoasChart data={spendingData} />
              </div>
            </div>

            {/* Pending Deliverables Review Queue */}
            <div className="lg:col-span-4 bg-white rounded-xl border border-[#E8E8EA] p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#F4F4F5]">
                  <div>
                    <h3 className="text-sm font-bold text-[#18181B]">Deliverables in Review</h3>
                    <p className="text-xs text-[#52525B] mt-0.5">Submitted creator assets</p>
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                    {pendingCollabs.length} pending
                  </span>
                </div>

                <div className="divide-y divide-[#F4F4F5] mt-2">
                  {brandCollabs.length === 0 ? (
                    <div className="py-8 text-center text-xs text-[#52525B]">
                      No submitted assets pending review.
                    </div>
                  ) : (
                    brandCollabs.slice(0, 3).map((collab) => (
                      <div key={collab.id} className="py-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={collab.creatorAvatar}
                            alt={collab.creatorName}
                            className="w-9 h-9 rounded-lg object-cover border border-[#E8E8EA] shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-[#18181B] truncate">{collab.creatorName}</p>
                            <p className="text-[11px] text-[#52525B] truncate">{collab.campaignTitle}</p>
                          </div>
                        </div>

                        <Link
                          href={`/brand/campaigns/${collab.campaignId}`}
                          className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-[#17171C] hover:bg-[#272730] text-white transition-colors shrink-0"
                        >
                          Review
                        </Link>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-[#F4F4F5] mt-3">
                <Link
                  href="/brand/campaigns"
                  className="text-xs font-semibold text-[#7456F1] hover:underline flex items-center justify-between"
                >
                  <span>Review all creator submissions</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 3. FEATURED CAMPAIGNS (1 Large Hero Card + 2 Supporting Cards) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold tracking-tight text-[#18181B]">Active Creative Campaigns</h2>
              <p className="text-xs text-[#52525B]">Track production milestones, creator slots, and deliverable handoffs</p>
            </div>
            <Link
              href="/brand/campaigns"
              className="text-xs font-semibold text-[#7456F1] hover:underline flex items-center gap-1"
            >
              <span>View all ({brandCampaigns.length})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* 1 Large Featured Campaign Card */}
            {featuredCampaign && (
              <div className="lg:col-span-7 bg-white rounded-xl border border-[#E8E8EA] overflow-hidden shadow-xs hover:border-[#7456F1] transition-all flex flex-col justify-between group">
                <div>
                  <div className="relative aspect-video w-full overflow-hidden bg-zinc-100">
                    <img
                      src={featuredCampaign.coverImage}
                      alt={featuredCampaign.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-[#17171C]/90 text-white text-[10px] font-bold tracking-wider uppercase backdrop-blur-xs">
                        Featured Brief
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-[#D7F36B] text-[#17171C] text-[10px] font-bold tracking-wider uppercase">
                        {featuredCampaign.requirements.platforms[0] || 'Instagram'}
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-xs font-bold tabular-nums">
                      ₹{featuredCampaign.budget.toLocaleString('en-IN')} Budget
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs text-[#52525B] mb-1.5">
                      <span className="font-semibold text-[#18181B]">{featuredCampaign.brandName}</span>
                      <span>&bull;</span>
                      <span>{featuredCampaign.category}</span>
                    </div>
                    <h3 className="text-base font-bold text-[#18181B] group-hover:text-[#7456F1] transition-colors">
                      {featuredCampaign.title}
                    </h3>
                    <p className="text-xs text-[#52525B] mt-1.5 line-clamp-2 leading-relaxed">
                      {featuredCampaign.description}
                    </p>

                    {/* Progress Bar & Creators Allocated */}
                    <div className="mt-4 pt-3 border-t border-[#F4F4F5]">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-semibold text-[#18181B]">Creator Slots</span>
                        <span className="font-bold text-[#7456F1]">
                          {featuredCampaign.acceptedCount} of {featuredCampaign.creatorsNeeded} locked
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[#F4F4F5] overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#7456F1] to-[#D7F36B] rounded-full transition-all duration-500"
                          style={{
                            width: `${Math.min(
                              100,
                              (featuredCampaign.acceptedCount / featuredCampaign.creatorsNeeded) * 100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between border-t border-[#F4F4F5] mt-2">
                  <span className="text-xs text-[#52525B]">
                    {featuredCampaign.applicationsCount} creator applications received
                  </span>
                  <Link
                    href={`/brand/campaigns/${featuredCampaign.id}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#17171C] hover:bg-[#272730] text-white text-xs font-semibold transition-colors"
                  >
                    <span>Manage Campaign</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}

            {/* 2 Supporting Campaign Cards */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {supportingCampaigns.map((camp) => (
                <div
                  key={camp.id}
                  className="bg-white rounded-xl border border-[#E8E8EA] p-4 shadow-xs hover:border-[#7456F1] transition-all flex flex-col justify-between group"
                >
                  <div className="flex items-start gap-3.5">
                    <img
                      src={camp.coverImage}
                      alt={camp.title}
                      className="w-20 h-20 rounded-lg object-cover border border-[#E8E8EA] shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#F0EBFF] text-[#4F32BE]">
                          {camp.requirements.platforms[0] || 'Instagram'}
                        </span>
                        <span className="text-[11px] text-[#52525B] truncate">&bull; {camp.category}</span>
                      </div>
                      <h3 className="text-xs font-bold text-[#18181B] mt-1 truncate group-hover:text-[#7456F1] transition-colors">
                        {camp.title}
                      </h3>
                      <p className="text-[11px] font-semibold text-[#18181B] mt-1 tabular-nums">
                        ₹{camp.budget.toLocaleString('en-IN')} &bull;{' '}
                        <span className="text-[#52525B] font-normal">
                          {camp.acceptedCount}/{camp.creatorsNeeded} creators
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-[#F4F4F5] flex items-center justify-between">
                    <span className="text-[11px] text-[#52525B]">{camp.applicationsCount} pitches</span>
                    <Link
                      href={`/brand/campaigns/${camp.id}`}
                      className="text-xs font-semibold text-[#18181B] hover:text-[#7456F1] flex items-center gap-1"
                    >
                      <span>Review Pitches</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}

              {/* Quick Create CTA Card */}
              <div className="rounded-xl border border-dashed border-[#E8E8EA] p-5 text-center flex flex-col items-center justify-center bg-[#F7F7F5]/50 hover:bg-[#F7F7F5] transition-colors">
                <div className="w-9 h-9 rounded-full bg-[#F0EBFF] text-[#4F32BE] flex items-center justify-center mb-2">
                  <Plus className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-bold text-[#18181B]">Have another brief in mind?</h3>
                <p className="text-[11px] text-[#52525B] mt-0.5 max-w-xs">
                  Set deliverables, target niche, and escrow budget in 3 minutes.
                </p>
                <Link
                  href="/brand/campaigns/new"
                  className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#17171C] text-white text-xs font-semibold hover:bg-[#272730] transition-colors"
                >
                  <span>Launch New Campaign</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 4. CURATED CREATOR DISCOVERY SHOWCASE */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold tracking-tight text-[#18181B]">Curated Creator Showcase</h2>
              <p className="text-xs text-[#52525B]">Vetted creators with authentic portfolios and verified engagement</p>
            </div>
            <Link
              href="/creator/dashboard"
              className="text-xs font-semibold text-[#7456F1] hover:underline flex items-center gap-1"
            >
              <span>Explore Creator Network</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {allCreators.slice(0, 3).map((creator) => (
              <div
                key={creator.id}
                className="bg-white rounded-xl border border-[#E8E8EA] p-5 shadow-xs hover:border-[#7456F1] transition-all flex flex-col justify-between creative-card-hover group"
              >
                <div>
                  {/* Creator Header with Avatar & Badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={creator.avatarUrl}
                          alt={creator.fullName}
                          className="w-12 h-12 rounded-xl object-cover border border-[#E8E8EA]"
                        />
                        <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#168365] border-2 border-white" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-[#18181B] group-hover:text-[#7456F1] transition-colors">
                          {creator.fullName}
                        </h3>
                        <p className="text-xs text-[#52525B]">{creator.handle}</p>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D7F36B] text-[#17171C]">
                      {creator.engagementRate} Eng.
                    </span>
                  </div>

                  <p className="text-xs text-[#52525B] mt-3 line-clamp-2 leading-relaxed">
                    {creator.bio}
                  </p>

                  {/* Niche Pills */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {creator.niche.slice(0, 3).map((n) => (
                      <span
                        key={n}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#F7F7F5] border border-[#E8E8EA] text-[#18181B]"
                      >
                        {n}
                      </span>
                    ))}
                  </div>

                  {/* Portfolio Sample Thumbnail */}
                  {creator.portfolio && creator.portfolio[0] && (
                    <div className="mt-4 pt-3 border-t border-[#F4F4F5] flex items-center gap-2.5">
                      <img
                        src={creator.portfolio[0].thumbnail}
                        alt="Sample"
                        className="w-12 h-12 rounded-lg object-cover border border-[#E8E8EA] shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="text-[10px] font-semibold text-[#7456F1]">
                          {creator.portfolio[0].platform} &bull; {creator.portfolio[0].views} Views
                        </span>
                        <p className="text-[11px] font-medium text-[#18181B] truncate">
                          {creator.portfolio[0].title}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-[#F4F4F5] mt-4 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#18181B] tabular-nums">
                    From ₹{creator.rateCard.ugcProductVideo.toLocaleString('en-IN')}{' '}
                    <span className="text-[10px] text-[#52525B] font-normal">/ video</span>
                  </span>
                  <Link
                    href="/creator/profile"
                    className="px-3 py-1 text-xs font-semibold rounded-lg bg-[#F7F7F5] hover:bg-[#17171C] hover:text-white text-[#18181B] transition-colors"
                  >
                    View Media Kit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
