'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Wallet,
  Clock,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Layers,
  ChevronRight,
  Video,
  Star,
  Play,
  Zap,
  TrendingUp,
} from 'lucide-react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { useUGCFY } from '@/lib/store';

export default function CreatorDashboardPage() {
  const { currentCreator, campaigns, applications, collaborations, creatorWallet } = useUGCFY();

  const myApplications = applications.filter((a) => a.creatorId === currentCreator.id);
  const myCollaborations = collaborations.filter((c) => c.creatorId === currentCreator.id);
  const activeCollabs = myCollaborations.filter((c) => c.status !== 'completed' && c.status !== 'cancelled');
  const availableCampaigns = campaigns.filter((c) => c.status === 'active');

  // Curated campaign matches
  const pickedCampaigns = availableCampaigns.slice(0, 3);

  return (
    <DashboardShell>
      <div className="space-y-8 pb-10">
        {/* 1. ASPIRATIONAL EDITORIAL HERO */}
        <section className="relative overflow-hidden rounded-2xl bg-[#17171C] text-white border border-[#272730] p-6 sm:p-8 lg:p-10 shadow-xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#7456F1]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-[#D7F36B]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-[#D7F36B]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D7F36B] animate-pulse" />
                <span className="font-semibold tracking-wide uppercase text-[10px]">Creator Hub</span>
                <span className="text-white/40">•</span>
                <span className="text-white/80">{currentCreator.fullName} ({currentCreator.handle})</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.12]">
                Your next collaboration <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/95 to-[#D7F36B]">
                  starts right here.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed">
                Explore verified D2C brand campaigns, pitch your creative ideas, deliver high-performing content, and receive instant payouts directly to your bank account.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/creator/campaigns"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D7F36B] hover:bg-[#cbf04a] text-[#17171C] text-xs font-bold transition-all shadow-md hover:shadow-lg cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#17171C]" />
                  <span>Explore Campaigns</span>
                </Link>

                <Link
                  href="/creator/wallet"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/15 text-xs font-medium transition-all"
                >
                  <Wallet className="w-3.5 h-3.5 text-[#D7F36B]" />
                  <span>Wallet: ₹{creatorWallet.availableBalance.toLocaleString('en-IN')}</span>
                </Link>
              </div>

              {/* Creator Status Indicator Bar */}
              <div className="flex items-center gap-6 pt-4 border-t border-white/10 text-xs text-zinc-400">
                <div>
                  <span className="block text-lg font-bold text-white tabular-nums">{activeCollabs.length}</span>
                  <span className="text-[11px] text-zinc-400">Collaborations Active</span>
                </div>
                <div className="w-px h-6 bg-white/15" />
                <div>
                  <span className="block text-lg font-bold text-white tabular-nums">{myApplications.length}</span>
                  <span className="text-[11px] text-zinc-400">Pitches Sent</span>
                </div>
                <div className="w-px h-6 bg-white/15" />
                <div>
                  <span className="block text-lg font-bold text-[#D7F36B] tabular-nums">
                    ₹{creatorWallet.totalEarnings.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[11px] text-zinc-400">Total Earned</span>
                </div>
              </div>
            </div>

            {/* Right: Curated Visual Composition (Framed Deal & Payout Previews with Zero Overlap) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm lg:max-w-none space-y-3">
                {/* Main Framed Deal Card */}
                <div className="rounded-xl overflow-hidden border border-white/15 bg-zinc-900/95 shadow-2xl transition-transform duration-300 hover:scale-[1.01]">
                  <div className="relative aspect-video w-full overflow-hidden bg-black">
                    <img
                      src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&auto=format&fit=crop&q=80"
                      alt="Creative Shoot"
                      className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded bg-[#7456F1] text-white font-semibold text-[10px] tracking-wide uppercase">
                        Current Deal
                      </span>
                      <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[#D7F36B] font-bold text-[10px]">
                        Plum 10% Niacinamide
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-[#17171C] px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 border border-zinc-200">
                      <Zap className="w-3 h-3 fill-[#7456F1] text-[#7456F1]" />
                      <span>Instant UPI</span>
                    </div>
                  </div>

                  <div className="p-4 bg-zinc-900 border-t border-white/10">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-semibold text-white">60-Second Authentic Texture Reel</span>
                      <span className="text-[#D7F36B] text-[11px] font-bold">₹22,000</span>
                    </div>
                    <p className="text-[11px] text-zinc-400">Milestone 2 &bull; Locked in Escrow &bull; Due Nov 28</p>
                  </div>
                </div>

                {/* Supporting Guarantee Strip (Cleanly Structured Below) */}
                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-3 rounded-xl flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-[#168365]/20 border border-[#168365]/40 flex items-center justify-center text-[#168365] shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-white truncate">Payment Guaranteed</p>
                      <p className="text-[10px] text-zinc-400">Released automatically upon brand approval</p>
                    </div>
                  </div>

                  <span className="px-2 py-1 rounded-md bg-[#168365]/20 text-[#168365] border border-[#168365]/30 font-bold text-[10px] shrink-0">
                    100% Secure
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. REFINED CREATOR FINANCIAL & OPPORTUNITY METRICS */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold tracking-tight text-[#18181B]">Creator Performance &amp; Pipeline</h2>
              <p className="text-xs text-[#777780]">Track pitch conversions, active workrooms, and payout trajectory</p>
            </div>
            <Link
              href="/creator/wallet"
              className="text-xs font-semibold text-[#7456F1] hover:underline flex items-center gap-1"
            >
              <span>Earnings Statement</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Active Collaborations */}
            <div className="bg-white rounded-xl border border-[#E8E8EA] p-4 sm:p-5 creative-card-hover">
              <div className="flex items-center justify-between text-xs text-[#777780]">
                <span>Active Workrooms</span>
                <span className="w-2 h-2 rounded-full bg-[#168365]" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold tracking-tight text-[#18181B] mt-2 tabular-nums">
                {activeCollabs.length}
              </p>
              <div className="mt-2 text-[11px] text-[#777780] flex items-center justify-between">
                <span>Deliverables in production</span>
                <span className="text-[#168365] font-semibold">On Track</span>
              </div>
            </div>

            {/* Applications Submitted */}
            <div className="bg-white rounded-xl border border-[#E8E8EA] p-4 sm:p-5 creative-card-hover">
              <div className="flex items-center justify-between text-xs text-[#777780]">
                <span>Pitches Submitted</span>
                <Layers className="w-3.5 h-3.5 text-[#7456F1]" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold tracking-tight text-[#18181B] mt-2 tabular-nums">
                {myApplications.length}
              </p>
              <div className="mt-2 text-[11px] text-[#777780] flex items-center justify-between">
                <span>{myApplications.filter((a) => a.status === 'accepted').length} accepted by brands</span>
                <span className="text-[#7456F1] font-semibold">Active</span>
              </div>
            </div>

            {/* Available Balance */}
            <div className="bg-white rounded-xl border border-[#E8E8EA] p-4 sm:p-5 creative-card-hover">
              <div className="flex items-center justify-between text-xs text-[#777780]">
                <span>Available to Withdraw</span>
                <Link href="/creator/wallet" className="text-[11px] font-semibold text-[#168365] hover:underline">
                  Withdraw &rarr;
                </Link>
              </div>
              <p className="text-2xl sm:text-3xl font-bold tracking-tight text-[#168365] mt-2 tabular-nums">
                ₹{creatorWallet.availableBalance.toLocaleString('en-IN')}
              </p>
              <div className="mt-2 text-[11px] text-[#777780]">
                Instant 0% fee UPI transfer ready
              </div>
            </div>

            {/* Total Earnings */}
            <div className="bg-white rounded-xl border border-[#E8E8EA] p-4 sm:p-5 creative-card-hover">
              <div className="flex items-center justify-between text-xs text-[#777780]">
                <span>Total Lifetime Earned</span>
                <TrendingUp className="w-3.5 h-3.5 text-[#18181B]" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold tracking-tight text-[#18181B] mt-2 tabular-nums">
                ₹{creatorWallet.totalEarnings.toLocaleString('en-IN')}
              </p>
              <div className="mt-2 text-[11px] text-[#777780]">
                Across 28 verified collaborations
              </div>
            </div>
          </div>
        </section>

        {/* 3. PICKED FOR YOUR CREATIVE STYLE (Media-Rich Cards) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EEE9FF] text-[#7456F1] text-[10px] font-bold tracking-wide uppercase mb-1">
                <Sparkles className="w-3 h-3" />
                Tailored Matching
              </div>
              <h2 className="text-lg font-bold tracking-tight text-[#18181B]">Picked for your creative style</h2>
              <p className="text-xs text-[#777780]">Brand briefs aligned with your niche: Skincare, Beauty &amp; Lifestyle</p>
            </div>
            <Link
              href="/creator/campaigns"
              className="text-xs font-semibold text-[#7456F1] hover:underline flex items-center gap-1"
            >
              <span>Explore all {availableCampaigns.length} campaigns</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pickedCampaigns.map((camp) => (
              <div
                key={camp.id}
                className="bg-white rounded-xl border border-[#E8E8EA] overflow-hidden shadow-xs hover:border-[#7456F1] transition-all flex flex-col justify-between creative-card-hover group"
              >
                <div>
                  <div className="relative aspect-video w-full overflow-hidden bg-zinc-100">
                    <img
                      src={camp.coverImage}
                      alt={camp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      <span className="px-2 py-0.5 rounded bg-[#17171C]/90 text-white text-[10px] font-bold tracking-wider uppercase backdrop-blur-xs">
                        {camp.requirements.platforms[0] || 'Instagram'}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#D7F36B] text-[#17171C] text-[10px] font-bold tracking-wider uppercase">
                        {camp.requirements.deliverables.length} Deliverables
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-xs font-bold tabular-nums">
                      ₹{camp.paymentPerCreator.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <img
                        src={camp.brandLogo}
                        alt={camp.brandName}
                        className="w-5 h-5 rounded object-cover border border-[#E8E8EA]"
                      />
                      <span className="text-xs font-semibold text-[#18181B]">{camp.brandName}</span>
                      <span className="text-[11px] text-[#777780]">&bull; {camp.category}</span>
                    </div>

                    <h3 className="text-sm font-bold text-[#18181B] group-hover:text-[#7456F1] transition-colors line-clamp-1">
                      {camp.title}
                    </h3>

                    <p className="text-xs text-[#777780] mt-1.5 line-clamp-2 leading-relaxed">
                      {camp.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-[#F4F4F5] flex items-center justify-between text-xs text-[#777780]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-zinc-400" /> Due {camp.deadline}
                      </span>
                      <span className="font-semibold text-[#168365]">
                        {camp.acceptedCount}/{camp.creatorsNeeded} slots filled
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link
                    href={`/creator/campaigns/${camp.id}`}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-[#17171C] hover:bg-[#272730] text-white text-xs font-semibold transition-colors"
                  >
                    <span>View Brief &amp; Pitch</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. WORKROOM DEADLINES & RECENT COLLABORATIONS */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Active Collaborations Pipeline */}
          <div className="lg:col-span-8 bg-white rounded-xl border border-[#E8E8EA] p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#F4F4F5]">
              <div>
                <h3 className="text-sm font-bold text-[#18181B]">Active Production Collaborations</h3>
                <p className="text-xs text-[#777780] mt-0.5">Deliverable handoffs and brand revision notes</p>
              </div>
              <Link href="/creator/applications" className="text-xs font-semibold text-[#7456F1] hover:underline">
                View All ({myCollaborations.length})
              </Link>
            </div>

            <div className="divide-y divide-[#F4F4F5] mt-2">
              {myCollaborations.length === 0 ? (
                <div className="py-8 text-center text-xs text-[#777780]">
                  No active collaborations yet. Apply to open briefs above!
                </div>
              ) : (
                myCollaborations.map((collab) => (
                  <div key={collab.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={collab.brandLogo}
                        alt={collab.brandName}
                        className="w-10 h-10 rounded-lg object-cover border border-[#E8E8EA] shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-[#18181B] truncate">{collab.campaignTitle}</p>
                        <p className="text-[11px] text-[#777780] mt-0.5">
                          {collab.brandName} &bull; ₹{collab.agreedAmount.toLocaleString('en-IN')} &bull; Deadline {collab.deadline}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          collab.status === 'approved'
                            ? 'bg-[#168365]/10 text-[#168365]'
                            : collab.status === 'deliverable_submitted'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-zinc-100 text-zinc-700'
                        }`}
                      >
                        {collab.status.replace('_', ' ')}
                      </span>
                      <Link
                        href={`/creator/collaborations/${collab.id}`}
                        className="px-3 py-1 text-xs font-semibold rounded-lg bg-[#F7F7F5] hover:bg-[#17171C] hover:text-white text-[#18181B] transition-colors"
                      >
                        Open Workroom
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Upcoming Production Deadlines */}
          <div className="lg:col-span-4 bg-white rounded-xl border border-[#E8E8EA] p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#F4F4F5]">
                <h3 className="text-sm font-bold text-[#18181B]">Upcoming Milestones</h3>
                <Clock className="w-3.5 h-3.5 text-[#777780]" />
              </div>

              <div className="space-y-3 mt-3">
                <div className="p-3.5 rounded-xl border border-[#E8E8EA] bg-[#F7F7F5]/50">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#18181B]">14-Day Texture Test Video</span>
                    <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                      In 3 days
                    </span>
                  </div>
                  <p className="text-[11px] text-[#777780] mt-1">Plum Goodness &bull; 60s Reel with Raw B-Roll</p>
                </div>

                <div className="p-3.5 rounded-xl border border-[#E8E8EA] bg-[#F7F7F5]/50">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#18181B]">boAt ANC Metro Test</span>
                    <span className="text-[11px] font-semibold text-[#168365] bg-[#168365]/10 px-2 py-0.5 rounded">
                      Approved
                    </span>
                  </div>
                  <p className="text-[11px] text-[#777780] mt-1">₹25,000 credited to available balance</p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#F4F4F5] mt-4">
              <Link
                href="/creator/profile"
                className="text-xs font-semibold text-[#7456F1] hover:underline flex items-center justify-between"
              >
                <span>Edit Media Kit &amp; Rate Card</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
