'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Search,
  Filter,
  Star,
  CheckCircle2,
  ExternalLink,
  Send,
  Sparkles,
  SlidersHorizontal,
  Eye,
  Play,
  X,
  Check,
  TrendingUp,
} from 'lucide-react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { useUGCFY } from '@/lib/store';
import { CreatorProfile } from '@/types';

export default function BrandCreatorsPage() {
  const { allCreators, campaigns } = useUGCFY();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNiche, setSelectedNiche] = useState('All');
  const [sortBy, setSortBy] = useState<'rating' | 'followers' | 'completed'>('rating');
  const [selectedCreator, setSelectedCreator] = useState<CreatorProfile | null>(null);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState('');
  const [inviteMessage, setInviteMessage] = useState('');
  const [inviteSuccess, setInviteSuccess] = useState(false);

  const niches = ['All', 'Skincare', 'Beauty', 'Tech', 'Wellness', 'Fitness', 'Lifestyle'];

  const filteredCreators = allCreators
    .filter((c) => {
      const matchesSearch =
        c.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.niche.some((n) => n.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesNiche =
        selectedNiche === 'All' ||
        c.niche.some((n) => n.toLowerCase() === selectedNiche.toLowerCase());

      return matchesSearch && matchesNiche;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'completed') return b.completedCampaigns - a.completedCampaigns;
      return (parseInt(b.followerCount) || 0) - (parseInt(a.followerCount) || 0);
    });

  const handleOpenInvite = (creator: CreatorProfile) => {
    setSelectedCreator(creator);
    setSelectedCampaignId(campaigns[0]?.id || '');
    setInviteMessage(`Hi ${creator.fullName.split(' ')[0]}, we love your content style and would like to invite you to collaborate on our upcoming UGC deliverable!`);
    setInviteSuccess(false);
    setInviteModalOpen(true);
  };

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    setInviteSuccess(true);
    setTimeout(() => {
      setInviteModalOpen(false);
      setInviteSuccess(false);
    }, 1800);
  };

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E4E4E7]">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-semibold text-[#18181B] tracking-tight">
                Creator Discovery &amp; Roster
              </h1>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#7456F1]/10 text-[#7456F1]">
                {filteredCreators.length} Verified
              </span>
            </div>
            <p className="text-xs text-[#71717A] mt-1">
              Browse vetted UGC creators, inspect verified performance metrics, and send direct invitations
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/brand/campaigns/new"
              className="px-3.5 py-2 rounded-lg bg-[#18181B] text-white text-xs font-medium hover:bg-[#27272A] transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D7F36B]" />
              <span>Launch Brief for All</span>
            </Link>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-3.5 rounded-xl border border-[#E4E4E7] shadow-xs space-y-3">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#A1A1AA] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by creator name, niche, handle (@skinwithananya)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-[#F9F9FB] border border-[#E4E4E7] rounded-lg text-[#18181B] placeholder-[#A1A1AA] focus:outline-hidden focus:border-[#7456F1] focus:bg-white transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 text-xs"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 text-xs shrink-0">
              <span className="text-[#71717A] flex items-center gap-1 font-medium">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#F9F9FB] border border-[#E4E4E7] rounded-lg px-2.5 py-1.5 text-xs text-[#18181B] font-medium focus:outline-hidden cursor-pointer"
              >
                <option value="rating">Top Rated (4.8+)</option>
                <option value="completed">Most Completed Deals</option>
                <option value="followers">Highest Reach</option>
              </select>
            </div>
          </div>

          {/* Niche Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-0.5 text-xs border-t border-[#F4F4F5]">
            <span className="text-[#A1A1AA] text-[11px] font-medium uppercase tracking-wider mr-1">
              Niche:
            </span>
            {niches.map((niche) => (
              <button
                key={niche}
                onClick={() => setSelectedNiche(niche)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                  selectedNiche === niche
                    ? 'bg-[#18181B] text-white shadow-xs'
                    : 'text-[#71717A] hover:text-[#18181B] hover:bg-[#F4F4F5]'
                }`}
              >
                {niche}
              </button>
            ))}
          </div>
        </div>

        {/* Creators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredCreators.map((creator) => (
            <div
              key={creator.id}
              className="bg-white rounded-xl border border-[#E4E4E7] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header Profile Section */}
                <div className="p-4 border-b border-[#F4F4F5] flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative shrink-0">
                      <img
                        src={creator.avatarUrl}
                        alt={creator.fullName}
                        className="w-12 h-12 rounded-xl object-cover border border-[#E4E4E7]"
                      />
                      <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#168365] border-2 border-white" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-semibold text-sm text-[#18181B] truncate">
                          {creator.fullName}
                        </h3>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#168365] shrink-0" />
                      </div>
                      <p className="text-xs text-[#71717A] truncate">{creator.handle}</p>
                      <p className="text-[11px] text-[#A1A1AA] mt-0.5">{creator.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-[#FAFAFA] border border-[#E4E4E7] text-xs font-bold text-[#18181B] shrink-0">
                    <Star className="w-3 h-3 fill-[#F59E0B] text-[#F59E0B]" />
                    <span>{creator.rating}</span>
                  </div>
                </div>

                {/* Bio & Niches */}
                <div className="p-4 space-y-3">
                  <p className="text-xs text-[#52525B] line-clamp-2 leading-relaxed">
                    {creator.bio}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {creator.niche.map((n) => (
                      <span
                        key={n}
                        className="text-[10px] font-medium px-2 py-0.5 rounded bg-[#F4F4F5] text-[#52525B]"
                      >
                        {n}
                      </span>
                    ))}
                  </div>

                  {/* Core Metrics Grid */}
                  <div className="grid grid-cols-3 gap-2 p-2.5 rounded-lg bg-[#F9F9FB] border border-[#E4E4E7] text-center">
                    <div>
                      <span className="block text-xs font-bold text-[#18181B]">
                        {creator.followerCount}
                      </span>
                      <span className="text-[10px] text-[#71717A]">Audience</span>
                    </div>
                    <div className="border-x border-[#E4E4E7]">
                      <span className="block text-xs font-bold text-[#7456F1]">
                        {creator.engagementRate}
                      </span>
                      <span className="text-[10px] text-[#71717A]">Eng. Rate</span>
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-[#168365]">
                        {creator.completedCampaigns}
                      </span>
                      <span className="text-[10px] text-[#71717A]">Delivered</span>
                    </div>
                  </div>

                  {/* Portfolio Samples Preview */}
                  {creator.portfolio && creator.portfolio.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-semibold text-[#A1A1AA] uppercase tracking-wider block">
                        Recent Portfolio Reels:
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        {creator.portfolio.slice(0, 2).map((p) => (
                          <div
                            key={p.id}
                            className="relative group rounded-lg overflow-hidden border border-[#E4E4E7] bg-black aspect-video cursor-pointer"
                          >
                            <img
                              src={p.thumbnail}
                              alt={p.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-85"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-1.5">
                              <span className="text-[10px] font-semibold text-white truncate">
                                {p.title}
                              </span>
                              <div className="flex items-center justify-between text-[9px] text-[#D7F36B] font-bold">
                                <span>{p.platform}</span>
                                <span>{p.views} views</span>
                              </div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                              <Play className="w-5 h-5 text-white fill-white" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Actions Bar */}
              <div className="p-3 bg-[#FAFAFA] border-t border-[#E4E4E7] flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] text-[#71717A] block">Starting from</span>
                  <span className="text-xs font-bold text-[#18181B]">
                    ₹{(creator.rateCard?.instagramReel || 15000).toLocaleString('en-IN')}{' '}
                    <span className="text-[10px] font-normal text-[#71717A]">/ Reel</span>
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenInvite(creator)}
                    className="px-3 py-1.5 rounded-md bg-[#18181B] text-white text-xs font-medium hover:bg-[#27272A] transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Send className="w-3 h-3 text-[#D7F36B]" />
                    <span>Invite</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Direct Invite Modal */}
        {inviteModalOpen && selectedCreator && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-white rounded-xl border border-[#E4E4E7] shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-[#E4E4E7] mb-4">
                <div className="flex items-center gap-2">
                  <Send className="w-4 h-4 text-[#7456F1]" />
                  <h3 className="font-semibold text-sm text-[#18181B]">
                    Invite {selectedCreator.fullName}
                  </h3>
                </div>
                <button
                  onClick={() => setInviteModalOpen(false)}
                  className="text-zinc-400 hover:text-zinc-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {inviteSuccess ? (
                <div className="text-center py-6 space-y-2">
                  <div className="w-10 h-10 rounded-full bg-[#168365]/10 text-[#168365] flex items-center justify-center mx-auto">
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-[#18181B]">Invitation Sent!</h4>
                  <p className="text-xs text-[#71717A]">
                    {selectedCreator.fullName} will review your brief and pitch details shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSendInvite} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#18181B] mb-1">
                      Select Target Campaign
                    </label>
                    <select
                      value={selectedCampaignId}
                      onChange={(e) => setSelectedCampaignId(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-[#E4E4E7] bg-[#F9F9FB] text-[#18181B] focus:outline-hidden"
                      required
                    >
                      {campaigns.map((camp) => (
                        <option key={camp.id} value={camp.id}>
                          {camp.title} (Budget: ₹{camp.budget.toLocaleString('en-IN')})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#18181B] mb-1">
                      Direct Message / Creative Brief Note
                    </label>
                    <textarea
                      rows={3}
                      value={inviteMessage}
                      onChange={(e) => setInviteMessage(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-[#E4E4E7] bg-[#F9F9FB] text-[#18181B] focus:outline-hidden focus:bg-white"
                      required
                    />
                  </div>

                  <div className="p-3 rounded-lg bg-[#7456F1]/5 border border-[#7456F1]/20 flex items-center justify-between text-xs">
                    <span className="text-[#52525B]">Creator Rate Estimate:</span>
                    <span className="font-bold text-[#7456F1]">
                      ₹{(selectedCreator.rateCard?.instagramReel || 18000).toLocaleString('en-IN')} / Deliverable
                    </span>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setInviteModalOpen(false)}
                      className="px-3.5 py-2 rounded-lg text-xs font-medium text-[#71717A] hover:bg-[#F4F4F5] transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-[#18181B] text-white text-xs font-semibold hover:bg-[#27272A] transition-colors shadow-xs"
                    >
                      Send Direct Invitation
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
