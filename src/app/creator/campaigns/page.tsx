'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  Calendar,
  Wallet,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  Send,
  Layers,
  Video,
  ChevronRight,
  ShieldCheck,
  Star,
  Check,
} from 'lucide-react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { useUGCFY } from '@/lib/store';
import { Campaign } from '@/types';

export default function CreatorCampaignsPage() {
  const { currentCreator, campaigns, applications, collaborations, applyToCampaign } = useUGCFY();

  const [activeTab, setActiveTab] = useState<'discover' | 'applications' | 'collaborations'>('discover');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPlatform, setSelectedPlatform] = useState('All');

  // Application Modal state
  const [applyModalCampaign, setApplyModalCampaign] = useState<Campaign | null>(null);
  const [pitch, setPitch] = useState('');
  const [portfolioLink, setPortfolioLink] = useState('https://instagram.com/reel/sample-ugc-showcase');
  const [proposedRate, setProposedRate] = useState<number>(18000);
  const [confirmedDeliverables, setConfirmedDeliverables] = useState(true);
  const [applyMessage, setApplyMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const categories = [
    'All',
    'Clean Beauty & Skincare',
    'Science-Backed Skincare',
    'Consumer Audio & Tech',
    'Specialty Coffee & Food',
    'Hair Care & Wellness',
    'Wearables & Health Tech',
  ];
  const platforms = ['All', 'Instagram', 'YouTube', 'TikTok'];

  const myApplications = applications.filter((a) => a.creatorId === currentCreator.id);
  const myCollaborations = collaborations.filter((c) => c.creatorId === currentCreator.id);

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((camp) => {
      if (camp.status !== 'active') return false;

      if (selectedCategory !== 'All' && camp.category !== selectedCategory) {
        return false;
      }

      if (selectedPlatform !== 'All' && !camp.requirements.platforms.includes(selectedPlatform)) {
        return false;
      }

      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          camp.title.toLowerCase().includes(q) ||
          camp.brandName.toLowerCase().includes(q) ||
          camp.description.toLowerCase().includes(q) ||
          camp.requirements.niches.some((n) => n.toLowerCase().includes(q))
        );
      }

      return true;
    });
  }, [campaigns, selectedCategory, selectedPlatform, search]);

  const featuredCampaign = filteredCampaigns[0];
  const standardCampaigns = filteredCampaigns.slice(1);

  const handleOpenApplyModal = (camp: Campaign) => {
    setApplyModalCampaign(camp);
    setProposedRate(camp.paymentPerCreator);
    setPitch(
      `Hi ${camp.brandName}! I specialize in authentic ${camp.category} UGC videos with high audience conversion. I can deliver natural daylight hooks, close-up product textures, and clear benefit demonstration.`
    );
    setApplyMessage(null);
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyModalCampaign) return;

    const res = applyToCampaign({
      campaignId: applyModalCampaign.id,
      pitch,
      portfolioLinks: [portfolioLink],
      proposedRate,
    });

    if (res.success) {
      setApplyMessage({ type: 'success', text: res.message });
      setTimeout(() => {
        setApplyModalCampaign(null);
        setApplyMessage(null);
      }, 1500);
    } else {
      setApplyMessage({ type: 'error', text: res.message });
    }
  };

  return (
    <DashboardShell>
      <div className="space-y-6 pb-12">
        {/* Marketplace Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 gap-4 border-b border-[#E8E8EA]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#7456F1] uppercase tracking-wider">Creative Marketplace</span>
              <span className="text-xs text-[#E8E8EA]">•</span>
              <span className="text-xs text-[#777780]">Direct Brand Briefs</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#18181B] tracking-tight mt-1">
              Campaign Discovery &amp; Pitches
            </h1>
            <p className="text-xs text-[#777780] mt-0.5">
              Explore active briefs, submit authentic creative pitches, and collaborate with 100% escrow protection.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#D7F36B] text-[#17171C] text-xs font-bold shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Escrow Guaranteed Payouts</span>
            </span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-[#E8E8EA] pb-3 text-xs">
          <button
            onClick={() => setActiveTab('discover')}
            className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === 'discover'
                ? 'bg-[#17171C] text-white shadow-xs'
                : 'text-[#777780] hover:text-[#18181B] hover:bg-[#F7F7F5]'
            }`}
          >
            Explore Briefs ({filteredCampaigns.length})
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === 'applications'
                ? 'bg-[#17171C] text-white shadow-xs'
                : 'text-[#777780] hover:text-[#18181B] hover:bg-[#F7F7F5]'
            }`}
          >
            My Pitches ({myApplications.length})
          </button>
          <button
            onClick={() => setActiveTab('collaborations')}
            className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === 'collaborations'
                ? 'bg-[#17171C] text-white shadow-xs'
                : 'text-[#777780] hover:text-[#18181B] hover:bg-[#F7F7F5]'
            }`}
          >
            Active Workrooms ({myCollaborations.length})
          </button>
        </div>

        {activeTab === 'discover' && (
          <div className="space-y-6">
            {/* Integrated Search & Filter Controls */}
            <div className="bg-white rounded-xl border border-[#E8E8EA] p-4 shadow-xs space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-[#777780] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by product, brand, niche (e.g. Niacinamide, Audio, boAt)..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full text-xs rounded-lg border border-[#E8E8EA] bg-[#F7F7F5] pl-9 pr-3 py-2 text-[#18181B] focus:border-[#7456F1] focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-[#777780] font-medium hidden sm:inline">Platform:</span>
                  <div className="flex gap-1">
                    {platforms.map((p) => (
                      <button
                        key={p}
                        onClick={() => setSelectedPlatform(p)}
                        className={`px-2.5 py-1.5 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                          selectedPlatform === p
                            ? 'bg-[#7456F1] text-white'
                            : 'bg-[#F7F7F5] text-[#777780] hover:text-[#18181B]'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-0.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-[#17171C] text-white shadow-2xs'
                        : 'bg-[#F7F7F5] text-[#777780] hover:text-[#18181B] border border-[#E8E8EA]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* 1 Large Featured Campaign Card */}
            {featuredCampaign && (
              <div className="bg-white rounded-2xl border border-[#E8E8EA] overflow-hidden shadow-xs hover:border-[#7456F1] transition-all creative-card-hover group">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  <div className="lg:col-span-7 relative aspect-video lg:aspect-auto overflow-hidden bg-zinc-100">
                    <img
                      src={featuredCampaign.coverImage}
                      alt={featuredCampaign.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-[#17171C]/90 text-white text-[10px] font-bold tracking-wider uppercase backdrop-blur-xs">
                        Featured Opportunity
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-[#D7F36B] text-[#17171C] text-[10px] font-bold tracking-wider uppercase">
                        {featuredCampaign.requirements.platforms[0] || 'Instagram'}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-bold tabular-nums">
                      ₹{featuredCampaign.paymentPerCreator.toLocaleString('en-IN')} Payout per Creator
                    </div>
                  </div>

                  <div className="lg:col-span-5 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <img
                          src={featuredCampaign.brandLogo}
                          alt={featuredCampaign.brandName}
                          className="w-6 h-6 rounded object-cover border border-[#E8E8EA]"
                        />
                        <span className="text-xs font-bold text-[#18181B]">{featuredCampaign.brandName}</span>
                        <span className="text-xs text-[#777780]">&bull; {featuredCampaign.category}</span>
                      </div>

                      <h2 className="text-lg font-bold text-[#18181B] group-hover:text-[#7456F1] transition-colors leading-snug">
                        {featuredCampaign.title}
                      </h2>

                      <p className="text-xs text-[#777780] mt-2 line-clamp-3 leading-relaxed">
                        {featuredCampaign.description}
                      </p>

                      {/* Deliverables summary */}
                      <div className="mt-4 p-3 rounded-xl bg-[#F7F7F5] border border-[#E8E8EA] space-y-1.5">
                        <span className="text-[10px] font-bold text-[#777780] uppercase tracking-wider block">
                          Required Deliverables:
                        </span>
                        {featuredCampaign.requirements.deliverables.map((del: string, idx: number) => (
                          <div key={idx} className="flex items-center justify-between text-xs text-[#18181B]">
                            <span className="font-medium">• {del}</span>
                            <span className="text-[10px] text-[#7456F1] font-semibold">{featuredCampaign.requirements.platforms[0]}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#F4F4F5] flex items-center justify-between gap-3">
                      <div className="text-xs text-[#777780]">
                        <span className="block font-semibold text-[#18181B]">Deadline: {featuredCampaign.deadline}</span>
                        <span className="text-[11px] text-[#168365]">
                          {featuredCampaign.acceptedCount}/{featuredCampaign.creatorsNeeded} slots filled
                        </span>
                      </div>

                      <button
                        onClick={() => handleOpenApplyModal(featuredCampaign)}
                        className="px-5 py-2.5 rounded-xl bg-[#7456F1] hover:bg-[#6343E0] text-white text-xs font-bold transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center gap-1.5"
                      >
                        <span>Submit Pitch</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Standard Campaign 3-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {standardCampaigns.map((camp) => (
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
                      </div>

                      <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-xs font-bold tabular-nums">
                        ₹{camp.paymentPerCreator.toLocaleString('en-IN')}
                      </div>
                    </div>

                    <div className="p-4 sm:p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <img
                          src={camp.brandLogo}
                          alt={camp.brandName}
                          className="w-5 h-5 rounded object-cover border border-[#E8E8EA]"
                        />
                        <span className="text-xs font-bold text-[#18181B]">{camp.brandName}</span>
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
                          {camp.acceptedCount}/{camp.creatorsNeeded} spots
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 pt-0">
                    <button
                      onClick={() => handleOpenApplyModal(camp)}
                      className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-[#17171C] hover:bg-[#272730] text-white text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <span>Pitch Concept</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: My Applications */}
        {activeTab === 'applications' && (
          <div className="bg-white rounded-xl border border-[#E8E8EA] p-5 shadow-xs">
            <h2 className="text-base font-bold text-[#18181B] mb-4">Submitted Pitches &amp; Status</h2>
            <div className="divide-y divide-[#F4F4F5]">
              {myApplications.length === 0 ? (
                <div className="py-12 text-center text-xs text-[#777780]">
                  No pitches submitted yet. Explore the marketplace to find campaigns!
                </div>
              ) : (
                myApplications.map((app) => (
                  <div key={app.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#18181B]">{app.campaignTitle}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                            app.status === 'accepted'
                              ? 'bg-[#168365]/10 text-[#168365]'
                              : app.status === 'rejected'
                              ? 'bg-[#DC4C4C]/10 text-[#DC4C4C]'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {app.status}
                        </span>
                      </div>
                      <p className="text-xs text-[#777780] line-clamp-1 italic">&ldquo;{app.pitch}&rdquo;</p>
                      <p className="text-[11px] text-[#A1A1AA]">
                        Proposed: ₹{app.proposedRate.toLocaleString('en-IN')} &bull; Submitted {app.appliedAt}
                      </p>
                    </div>

                    <div className="self-end sm:self-center">
                      <Link
                        href={`/creator/campaigns/${app.campaignId}`}
                        className="text-xs font-semibold text-[#7456F1] hover:underline"
                      >
                        View Campaign &rarr;
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Active Collaborations */}
        {activeTab === 'collaborations' && (
          <div className="bg-white rounded-xl border border-[#E8E8EA] p-5 shadow-xs">
            <h2 className="text-base font-bold text-[#18181B] mb-4">Active Production Workrooms</h2>
            <div className="divide-y divide-[#F4F4F5]">
              {myCollaborations.length === 0 ? (
                <div className="py-12 text-center text-xs text-[#777780]">
                  No active production collaborations. Accepted pitches appear here.
                </div>
              ) : (
                myCollaborations.map((collab) => (
                  <div key={collab.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={collab.brandLogo}
                        alt={collab.brandName}
                        className="w-10 h-10 rounded-lg object-cover border border-[#E8E8EA]"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-[#18181B]">{collab.campaignTitle}</h4>
                        <p className="text-[11px] text-[#777780]">
                          {collab.brandName} &bull; ₹{collab.agreedAmount.toLocaleString('en-IN')} &bull; Deadline {collab.deadline}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-700">
                        {collab.status.replace('_', ' ')}
                      </span>
                      <Link
                        href={`/creator/collaborations/${collab.id}`}
                        className="px-3 py-1.5 rounded-lg bg-[#17171C] text-white text-xs font-semibold hover:bg-[#272730] transition-colors"
                      >
                        Open Workroom
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* APPLY MODAL */}
        {applyModalCampaign && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl border border-[#E8E8EA] max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
              <button
                onClick={() => setApplyModalCampaign(null)}
                className="absolute top-5 right-5 text-[#777780] hover:text-[#18181B] text-xl font-bold cursor-pointer"
              >
                &times;
              </button>

              <div className="flex items-center gap-2 mb-1 text-xs text-[#7456F1] font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Pitch Campaign Proposal</span>
              </div>
              <h3 className="text-base font-bold text-[#18181B]">{applyModalCampaign.title}</h3>
              <p className="text-xs text-[#777780]">{applyModalCampaign.brandName}</p>

              {applyMessage && (
                <div
                  className={`mt-3 p-2.5 rounded-lg text-xs font-bold ${
                    applyMessage.type === 'success'
                      ? 'bg-[#168365]/10 text-[#168365] border border-[#168365]/20'
                      : 'bg-[#DC4C4C]/10 text-[#DC4C4C] border border-[#DC4C4C]/20'
                  }`}
                >
                  {applyMessage.text}
                </div>
              )}

              <form onSubmit={handleApplySubmit} className="space-y-4 mt-4">
                <div>
                  <label className="block text-xs font-bold text-[#18181B]">
                    Your Pitch &amp; Creative Angle
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={pitch}
                    onChange={(e) => setPitch(e.target.value)}
                    className="mt-1 w-full text-xs rounded-xl border border-[#E8E8EA] bg-[#F7F7F5] p-3 text-[#18181B] focus:border-[#7456F1] focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#18181B]">
                    Relevant Portfolio Reel / Video Link
                  </label>
                  <input
                    type="url"
                    required
                    value={portfolioLink}
                    onChange={(e) => setPortfolioLink(e.target.value)}
                    className="mt-1 w-full text-xs rounded-xl border border-[#E8E8EA] bg-[#F7F7F5] px-3.5 py-2 text-[#18181B] focus:border-[#7456F1] focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#18181B]">
                    Proposed Rate (₹ INR)
                  </label>
                  <input
                    type="number"
                    step="500"
                    required
                    value={proposedRate}
                    onChange={(e) => setProposedRate(Number(e.target.value))}
                    className="mt-1 w-full text-xs font-bold rounded-xl border border-[#E8E8EA] bg-[#F7F7F5] px-3.5 py-2 text-[#18181B] focus:border-[#7456F1] focus:bg-white focus:outline-none tabular-nums"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="deliverablesCheck"
                    checked={confirmedDeliverables}
                    onChange={(e) => setConfirmedDeliverables(e.target.checked)}
                    className="rounded border-[#E8E8EA] text-[#7456F1]"
                  />
                  <label htmlFor="deliverablesCheck" className="text-[11px] text-[#777780] cursor-pointer">
                    I confirm I can deliver 4K 60fps vertical footage before the deadline.
                  </label>
                </div>

                <div className="pt-3 border-t border-[#F4F4F5] flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setApplyModalCampaign(null)}
                    className="px-4 py-2 text-xs font-semibold text-[#777780] hover:text-[#18181B] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#7456F1] hover:bg-[#6343E0] text-white text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Pitch</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
