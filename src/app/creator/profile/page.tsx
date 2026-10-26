'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  Globe,
  MapPin,
  Save,
  ShieldCheck,
  Sparkles,
  Video,
  Eye,
  Star,
  ExternalLink,
  Plus,
  Play,
  Zap,
} from 'lucide-react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { useUGCFY } from '@/lib/store';

export default function CreatorProfilePage() {
  const { currentCreator, updateCreatorProfile } = useUGCFY();

  const [activeView, setActiveView] = useState<'portfolio' | 'settings'>('portfolio');

  const [fullName, setFullName] = useState(currentCreator.fullName);
  const [handle, setHandle] = useState(currentCreator.handle);
  const [avatarUrl, setAvatarUrl] = useState(currentCreator.avatarUrl);
  const [bio, setBio] = useState(currentCreator.bio);
  const [location, setLocation] = useState(currentCreator.location);
  const [niches, setNiches] = useState(currentCreator.niche.join(', '));
  const [followerCount, setFollowerCount] = useState(currentCreator.followerCount);
  const [engagementRate, setEngagementRate] = useState(currentCreator.engagementRate);
  const [reelRate, setReelRate] = useState(currentCreator.rateCard.instagramReel);
  const [storyRate, setStoryRate] = useState(currentCreator.rateCard.instagramStory);
  const [shortRate, setShortRate] = useState(currentCreator.rateCard.youtubeShort);
  const [ugcRate, setUgcRate] = useState(currentCreator.rateCard.ugcProductVideo);
  const [availability, setAvailability] = useState(currentCreator.availability);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCreatorProfile({
      fullName,
      handle,
      avatarUrl,
      bio,
      location,
      niche: niches.split(',').map((s) => s.trim()),
      followerCount,
      engagementRate,
      availability,
      rateCard: {
        instagramReel: reelRate,
        instagramStory: storyRate,
        youtubeShort: shortRate,
        ugcProductVideo: ugcRate,
      },
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setActiveView('portfolio');
    }, 1500);
  };

  return (
    <DashboardShell>
      <div className="max-w-5xl mx-auto space-y-8 pb-12">
        {/* Header with View Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 gap-4 border-b border-[#E8E8EA]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#7456F1] uppercase tracking-wider">Creator Media Kit</span>
              <span className="text-xs text-[#E8E8EA]">•</span>
              <span className="text-xs text-[#777780]">Commercial Portfolio</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#18181B] mt-1">
              {fullName} &bull; {handle}
            </h1>
            <p className="text-xs text-[#777780] mt-0.5">
              Presented to brand marketing managers when evaluating campaign pitches.
            </p>
          </div>

          <div className="flex items-center gap-2 p-1 bg-white border border-[#E8E8EA] rounded-xl shadow-2xs self-start sm:self-auto">
            <button
              onClick={() => setActiveView('portfolio')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeView === 'portfolio'
                  ? 'bg-[#17171C] text-white shadow-xs'
                  : 'text-[#777780] hover:text-[#18181B]'
              }`}
            >
              Media Kit Showcase
            </button>
            <button
              onClick={() => setActiveView('settings')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeView === 'settings'
                  ? 'bg-[#17171C] text-white shadow-xs'
                  : 'text-[#777780] hover:text-[#18181B]'
              }`}
            >
              Edit Rates &amp; Profile
            </button>
          </div>
        </div>

        {savedSuccess && (
          <div className="p-3.5 rounded-xl bg-[#168365]/10 border border-[#168365]/20 text-[#168365] text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Profile and commercial rate card updated and published to brand marketplace!</span>
          </div>
        )}

        {/* VIEW 1: PORTFOLIO PRESENTATION (Behance / Linear style) */}
        {activeView === 'portfolio' ? (
          <div className="space-y-8">
            {/* Editorial Creator Hero Header */}
            <div className="rounded-2xl bg-white border border-[#E8E8EA] p-6 sm:p-8 shadow-xs relative overflow-hidden">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-start sm:items-center gap-5">
                  <div className="relative">
                    <img
                      src={avatarUrl}
                      alt={fullName}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border border-[#E8E8EA] shadow-md"
                    />
                    <span
                      className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                        availability ? 'bg-[#168365]' : 'bg-[#DC4C4C]'
                      }`}
                      title={availability ? 'Open to deals' : 'Fully booked'}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl sm:text-2xl font-bold text-[#18181B] tracking-tight">{fullName}</h2>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#D7F36B] text-[#17171C] text-[10px] font-bold">
                        <ShieldCheck className="w-3 h-3" />
                        Verified Creator
                      </span>
                    </div>

                    <p className="text-xs text-[#777780] font-medium flex items-center gap-2">
                      <span>{handle}</span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-zinc-400" /> {location}
                      </span>
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {currentCreator.niche.map((n) => (
                        <span
                          key={n}
                          className="px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-[#EEE9FF] text-[#7456F1]"
                        >
                          {n}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:items-end gap-2 shrink-0">
                  <div className="px-3 py-1.5 rounded-xl border border-[#E8E8EA] bg-[#F7F7F5] text-xs">
                    <span className="text-[#777780]">Status: </span>
                    <strong className={availability ? 'text-[#168365]' : 'text-[#DC4C4C]'}>
                      {availability ? '🟢 Open to Deals' : '🔴 Fully Booked'}
                    </strong>
                  </div>
                  <button
                    onClick={() => setActiveView('settings')}
                    className="px-3 py-1.5 rounded-xl bg-[#17171C] hover:bg-[#272730] text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Edit Rate Card
                  </button>
                </div>
              </div>

              {/* Bio & Positioning Statement */}
              <div className="mt-6 pt-5 border-t border-[#F4F4F5]">
                <p className="text-xs sm:text-sm text-[#18181B] leading-relaxed max-w-3xl">
                  {bio}
                </p>
              </div>

              {/* Audience Metrics Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-5 border-t border-[#F4F4F5]">
                <div className="p-3 rounded-xl bg-[#F7F7F5] border border-[#E8E8EA]">
                  <span className="text-[11px] text-[#777780] block font-medium">Audience Reach</span>
                  <p className="text-xl font-bold text-[#18181B] mt-0.5 tabular-nums">{followerCount}</p>
                  <p className="text-[10px] text-[#777780] mt-0.5">Across Instagram &amp; YouTube</p>
                </div>

                <div className="p-3 rounded-xl bg-[#F7F7F5] border border-[#E8E8EA]">
                  <span className="text-[11px] text-[#777780] block font-medium">Avg Engagement</span>
                  <p className="text-xl font-bold text-[#168365] mt-0.5 tabular-nums">{engagementRate}</p>
                  <p className="text-[10px] text-[#168365] mt-0.5">Verified organic audience</p>
                </div>

                <div className="p-3 rounded-xl bg-[#F7F7F5] border border-[#E8E8EA]">
                  <span className="text-[11px] text-[#777780] block font-medium">Delivered Briefs</span>
                  <p className="text-xl font-bold text-[#18181B] mt-0.5 tabular-nums">{currentCreator.completedCampaigns}</p>
                  <p className="text-[10px] text-[#777780] mt-0.5">100% on-time delivery</p>
                </div>

                <div className="p-3 rounded-xl bg-[#F7F7F5] border border-[#E8E8EA]">
                  <span className="text-[11px] text-[#777780] block font-medium">Creator Rating</span>
                  <p className="text-xl font-bold text-[#7456F1] mt-0.5 tabular-nums">★ {currentCreator.rating}</p>
                  <p className="text-[10px] text-[#7456F1] mt-0.5">Direct brand feedback</p>
                </div>
              </div>
            </div>

            {/* Commercial Rate Card Grid */}
            <div className="rounded-2xl bg-white border border-[#E8E8EA] p-6 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-[#F4F4F5]">
                <div>
                  <h3 className="text-base font-bold text-[#18181B]">Commercial Rate Card (₹ INR)</h3>
                  <p className="text-xs text-[#777780] mt-0.5">Base prices for standard deliverables including usage rights</p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#EEE9FF] text-[#7456F1]">
                  Commercial Rights Included
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
                <div className="p-4 rounded-xl border border-[#E8E8EA] bg-[#F7F7F5] creative-card-hover">
                  <span className="text-[11px] font-bold text-[#777780] uppercase tracking-wider block">
                    Instagram Reel
                  </span>
                  <p className="text-2xl font-bold text-[#18181B] mt-1.5 tabular-nums">
                    ₹{reelRate.toLocaleString('en-IN')}
                  </p>
                  <p className="text-[11px] text-[#777780] mt-1">60s 4K Reel + 30-day Meta ad usage</p>
                </div>

                <div className="p-4 rounded-xl border border-[#E8E8EA] bg-[#F7F7F5] creative-card-hover">
                  <span className="text-[11px] font-bold text-[#777780] uppercase tracking-wider block">
                    Instagram Story Set
                  </span>
                  <p className="text-2xl font-bold text-[#18181B] mt-1.5 tabular-nums">
                    ₹{storyRate.toLocaleString('en-IN')}
                  </p>
                  <p className="text-[11px] text-[#777780] mt-1">3x frames with direct swipe-up link</p>
                </div>

                <div className="p-4 rounded-xl border border-[#E8E8EA] bg-[#F7F7F5] creative-card-hover">
                  <span className="text-[11px] font-bold text-[#777780] uppercase tracking-wider block">
                    YouTube Short
                  </span>
                  <p className="text-2xl font-bold text-[#18181B] mt-1.5 tabular-nums">
                    ₹{shortRate.toLocaleString('en-IN')}
                  </p>
                  <p className="text-[11px] text-[#777780] mt-1">High-retention vertical hook format</p>
                </div>

                <div className="p-4 rounded-xl border border-[#7456F1]/30 bg-[#EEE9FF]/30 creative-card-hover">
                  <span className="text-[11px] font-bold text-[#7456F1] uppercase tracking-wider block">
                    Raw UGC Ad Asset
                  </span>
                  <p className="text-2xl font-bold text-[#7456F1] mt-1.5 tabular-nums">
                    ₹{ugcRate.toLocaleString('en-IN')}
                  </p>
                  <p className="text-[11px] text-[#7456F1] mt-1">Raw unedited video + 3 Hook variations</p>
                </div>
              </div>
            </div>

            {/* Video Portfolio Showcase */}
            <div className="rounded-2xl bg-white border border-[#E8E8EA] p-6 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-[#F4F4F5]">
                <div>
                  <h3 className="text-base font-bold text-[#18181B]">Featured Video Deliverables</h3>
                  <p className="text-xs text-[#777780] mt-0.5">Top-performing brand collaborations with verified view counts</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
                {currentCreator.portfolio.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl border border-[#E8E8EA] bg-[#F7F7F5] flex items-center gap-4 creative-card-hover"
                  >
                    <div className="relative aspect-square w-20 rounded-lg overflow-hidden bg-black shrink-0">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <Play className="w-5 h-5 fill-white text-white opacity-85" />
                      </div>
                    </div>

                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white border border-[#E8E8EA] text-[#18181B]">
                          {item.platform}
                        </span>
                        <span className="text-[10px] text-[#777780] font-semibold">{item.type}</span>
                      </div>
                      <h4 className="text-xs font-bold text-[#18181B] truncate">{item.title}</h4>
                      <p className="text-xs font-bold text-[#168365] tabular-nums">{item.views} verified views</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* VIEW 2: ACCOUNT & RATE SETTINGS */
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white rounded-2xl border border-[#E8E8EA] divide-y divide-[#F4F4F5] shadow-xs">
              {/* Creator Identity */}
              <div className="p-6">
                <h2 className="text-base font-bold text-[#18181B]">Creator Identity &amp; Social Profile</h2>
                <p className="text-xs text-[#777780] mt-0.5">Information displayed on discovery cards and pitch summaries</p>

                <div className="mt-5 space-y-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={avatarUrl}
                      alt={fullName}
                      className="w-16 h-16 rounded-xl object-cover border border-[#E8E8EA]"
                    />
                    <div className="flex-1">
                      <label className="block text-xs font-bold text-[#18181B]">Profile Photo URL</label>
                      <input
                        type="url"
                        required
                        value={avatarUrl}
                        onChange={(e) => setAvatarUrl(e.target.value)}
                        className="mt-1 w-full text-xs rounded-xl border border-[#E8E8EA] bg-[#F7F7F5] px-3 py-2 text-[#18181B] focus:border-[#7456F1] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#18181B]">Full Name</label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="mt-1 w-full text-xs font-semibold rounded-xl border border-[#E8E8EA] bg-[#F7F7F5] px-3.5 py-2.5 text-[#18181B] focus:border-[#7456F1] focus:bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#18181B]">Primary Social Handle</label>
                      <input
                        type="text"
                        required
                        value={handle}
                        onChange={(e) => setHandle(e.target.value)}
                        className="mt-1 w-full text-xs font-semibold rounded-xl border border-[#E8E8EA] bg-[#F7F7F5] px-3.5 py-2.5 text-[#18181B] focus:border-[#7456F1] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#18181B]">Creator Bio &amp; Positioning</label>
                    <textarea
                      rows={3}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="mt-1 w-full text-xs rounded-xl border border-[#E8E8EA] bg-[#F7F7F5] p-3 text-[#18181B] focus:border-[#7456F1] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#18181B]">Content Niches (comma separated)</label>
                      <input
                        type="text"
                        value={niches}
                        onChange={(e) => setNiches(e.target.value)}
                        className="mt-1 w-full text-xs rounded-xl border border-[#E8E8EA] bg-[#F7F7F5] px-3.5 py-2.5 text-[#18181B] focus:border-[#7456F1] focus:bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#18181B]">Location</label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="mt-1 w-full text-xs rounded-xl border border-[#E8E8EA] bg-[#F7F7F5] px-3.5 py-2.5 text-[#18181B] focus:border-[#7456F1] focus:bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#18181B]">Avg Engagement Rate</label>
                      <input
                        type="text"
                        value={engagementRate}
                        onChange={(e) => setEngagementRate(e.target.value)}
                        className="mt-1 w-full text-xs font-bold rounded-xl border border-[#E8E8EA] bg-[#F7F7F5] px-3.5 py-2.5 text-[#168365] focus:border-[#7456F1] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Rate Card Settings */}
              <div className="p-6">
                <h2 className="text-base font-bold text-[#18181B]">Commercial Rate Card (₹ INR)</h2>
                <p className="text-xs text-[#777780] mt-0.5">Pre-populated default pricing when pitching campaign briefs</p>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#777780]">Instagram Reel</label>
                    <input
                      type="number"
                      step="500"
                      value={reelRate}
                      onChange={(e) => setReelRate(Number(e.target.value))}
                      className="mt-1 w-full text-sm font-bold rounded-xl border border-[#E8E8EA] bg-[#F7F7F5] px-3 py-2 text-[#18181B] focus:border-[#7456F1] focus:bg-white focus:outline-none tabular-nums"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#777780]">Instagram Story Set</label>
                    <input
                      type="number"
                      step="500"
                      value={storyRate}
                      onChange={(e) => setStoryRate(Number(e.target.value))}
                      className="mt-1 w-full text-sm font-bold rounded-xl border border-[#E8E8EA] bg-[#F7F7F5] px-3 py-2 text-[#18181B] focus:border-[#7456F1] focus:bg-white focus:outline-none tabular-nums"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#777780]">YouTube Short</label>
                    <input
                      type="number"
                      step="500"
                      value={shortRate}
                      onChange={(e) => setShortRate(Number(e.target.value))}
                      className="mt-1 w-full text-sm font-bold rounded-xl border border-[#E8E8EA] bg-[#F7F7F5] px-3 py-2 text-[#18181B] focus:border-[#7456F1] focus:bg-white focus:outline-none tabular-nums"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#777780]">Raw UGC Ad Video</label>
                    <input
                      type="number"
                      step="500"
                      value={ugcRate}
                      onChange={(e) => setUgcRate(Number(e.target.value))}
                      className="mt-1 w-full text-sm font-bold rounded-xl border border-[#E8E8EA] bg-[#F7F7F5] px-3 py-2 text-[#18181B] focus:border-[#7456F1] focus:bg-white focus:outline-none tabular-nums"
                    />
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F4F4F5]">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={availability}
                      onChange={(e) => setAvailability(e.target.checked)}
                      className="rounded border-[#E8E8EA] text-[#7456F1]"
                    />
                    <span className="text-xs font-bold text-[#18181B]">
                      Open to incoming campaign invitations and direct briefs
                    </span>
                  </label>
                </div>
              </div>

              <div className="p-5 bg-[#F7F7F5] flex items-center justify-end gap-3 rounded-b-2xl">
                <button
                  type="button"
                  onClick={() => setActiveView('portfolio')}
                  className="px-4 py-2 text-xs font-bold text-[#777780] hover:text-[#18181B]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-xl bg-[#7456F1] hover:bg-[#6343E0] text-white shadow-md transition-all cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Media Kit &amp; Rates</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </DashboardShell>
  );
}
