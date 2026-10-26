'use client';

import React, { useState, useMemo } from 'react';
import {
  Bookmark,
  Search,
  Check,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Play,
  Share2,
  Layers,
  Video,
  Eye,
  TrendingUp,
} from 'lucide-react';
import { useUGCFY } from '@/lib/store';
import { AdInspiration } from '@/types';

export function InspirationLibrary() {
  const { inspirations, savedInspirationIds, toggleSaveInspiration } = useUGCFY();

  const [search, setSearch] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const [selectedFormat, setSelectedFormat] = useState('All');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [activeTab, setActiveTab] = useState<'all' | 'saved'>('all');

  const [selectedInsp, setSelectedInsp] = useState<AdInspiration | null>(null);
  const [collectionNotification, setCollectionNotification] = useState<string | null>(null);

  const platforms = ['All', 'Instagram', 'TikTok', 'YouTube'];
  const formats = ['All', 'UGC Videos', 'Product Demonstrations', 'Testimonials', 'Unboxing', 'Trending'];
  const industries = ['All', 'Beauty', 'Fashion', 'Technology', 'Lifestyle', 'Food'];

  const filteredInspirations = useMemo(() => {
    return inspirations.filter((item) => {
      if (activeTab === 'saved' && !savedInspirationIds.includes(item.id)) {
        return false;
      }

      if (selectedPlatform !== 'All' && item.platform !== selectedPlatform) {
        return false;
      }

      if (selectedFormat !== 'All' && item.format !== selectedFormat) {
        return false;
      }

      if (selectedIndustry !== 'All' && item.industry !== selectedIndustry) {
        return false;
      }

      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.brandName.toLowerCase().includes(q) ||
          item.hookText.toLowerCase().includes(q) ||
          item.tags.some((t) => t.toLowerCase().includes(q))
        );
      }

      return true;
    });
  }, [
    inspirations,
    savedInspirationIds,
    activeTab,
    selectedPlatform,
    selectedFormat,
    selectedIndustry,
    search,
  ]);

  const handleSaveToCollection = (inspId: string) => {
    toggleSaveInspiration(inspId);
    setCollectionNotification(
      savedInspirationIds.includes(inspId) ? 'Removed from saved collection' : 'Saved to collection'
    );
    setTimeout(() => setCollectionNotification(null), 2000);
  };

  const spotlightItem = inspirations[0];

  return (
    <div className="space-y-8 pb-12">
      {/* 1. EDITORIAL HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 gap-4 border-b border-[#E8E8EA]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#7456F1] uppercase tracking-wider">Creative Direction</span>
            <span className="text-xs text-[#E8E8EA]">•</span>
            <span className="text-xs text-[#777780]">Ad Library &amp; Psychology Archive</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#18181B] tracking-tight mt-1">
            Explore what makes great content.
          </h1>
          <p className="text-xs sm:text-sm text-[#777780] mt-1 max-w-2xl leading-relaxed">
            Discover creative ideas, high-retention hook formats, and battle-tested D2C ad campaigns worth learning from.
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-white border border-[#E8E8EA] rounded-xl shadow-2xs self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#17171C] text-white shadow-xs'
                : 'text-[#777780] hover:text-[#18181B]'
            }`}
          >
            All Archive ({inspirations.length})
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'saved'
                ? 'bg-[#17171C] text-white shadow-xs'
                : 'text-[#777780] hover:text-[#18181B]'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved ({savedInspirationIds.length})</span>
          </button>
        </div>
      </div>

      {/* 2. FEATURED SPOTLIGHT BANNER */}
      {activeTab === 'all' && spotlightItem && (
        <div
          onClick={() => setSelectedInsp(spotlightItem)}
          className="relative rounded-2xl overflow-hidden bg-[#17171C] text-white border border-[#272730] shadow-xl p-6 sm:p-8 cursor-pointer group hover:border-[#7456F1] transition-all"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#7456F1]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
            <div className="lg:col-span-8 space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#D7F36B] text-[#17171C] text-[10px] font-bold tracking-wider uppercase">
                  Editor&apos;s Weekly Pick
                </span>
                <span className="text-xs text-zinc-400">&bull;</span>
                <span className="text-xs text-zinc-400 font-medium">{spotlightItem.brandName}</span>
                <span className="text-xs text-zinc-400">&bull;</span>
                <span className="text-xs text-[#D7F36B] font-semibold">{spotlightItem.metrics.views} Views</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#D7F36B] transition-colors leading-tight">
                &ldquo;{spotlightItem.hookText}&rdquo;
              </h2>

              <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2 max-w-2xl leading-relaxed">
                {spotlightItem.hookAnalysis}
              </p>

              <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-[#D7F36B]">
                <span className="flex items-center gap-1.5">
                  <Play className="w-4 h-4 fill-current" />
                  <span>Inspect Breakdown &amp; Script Structure</span>
                </span>
                <span className="text-zinc-500">•</span>
                <span className="text-zinc-400">{spotlightItem.format}</span>
              </div>
            </div>

            <div className="lg:col-span-4 relative aspect-video rounded-xl overflow-hidden border border-white/15 bg-black">
              <img
                src={spotlightItem.thumbnailUrl}
                alt={spotlightItem.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. SEARCH & REFINED FILTER CHIPS */}
      <div className="bg-white rounded-xl border border-[#E8E8EA] p-4 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#777780] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search hooks, products, brands, or psychological angles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs rounded-lg border border-[#E8E8EA] bg-[#F7F7F5] pl-9 pr-3 py-2 text-[#18181B] focus:border-[#7456F1] focus:bg-white focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            <div className="flex gap-1">
              {platforms.map((p) => (
                <button
                  key={p}
                  onClick={() => setSelectedPlatform(p)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedPlatform === p
                      ? 'bg-[#17171C] text-white shadow-2xs'
                      : 'bg-[#F7F7F5] text-[#777780] hover:text-[#18181B] border border-[#E8E8EA]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Format & Industry Tags */}
        <div className="flex items-center gap-2 overflow-x-auto pt-1">
          <span className="text-[11px] text-[#777780] font-medium shrink-0">Formats:</span>
          {formats.map((fmt) => (
            <button
              key={fmt}
              onClick={() => setSelectedFormat(fmt)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedFormat === fmt
                  ? 'bg-[#7456F1] text-white'
                  : 'bg-[#F7F7F5] text-[#777780] hover:text-[#18181B]'
              }`}
            >
              {fmt}
            </button>
          ))}
        </div>
      </div>

      {collectionNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#17171C] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 border border-white/10 animate-in fade-in slide-in-from-bottom-2">
          <Check className="w-4 h-4 text-[#D7F36B]" />
          <span>{collectionNotification}</span>
        </div>
      )}

      {/* 4. MASONRY/EDITORIAL MEDIA-FIRST GRID WITH MIXED RATIOS */}
      {filteredInspirations.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#E8E8EA] p-16 text-center shadow-xs">
          <p className="text-sm font-bold text-[#18181B]">No creative concepts match your filters</p>
          <p className="text-xs text-[#777780] mt-1">Try resetting search keywords or category filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredInspirations.map((item, index) => {
            const isSaved = savedInspirationIds.includes(item.id);
            // Rhythm: alternate aspect ratios (9:16 vertical reel vs 4:5 social creative vs 16:9 widescreen ad)
            const aspectClass =
              index % 4 === 0
                ? 'aspect-[9/14]'
                : index % 4 === 1
                ? 'aspect-[4/5]'
                : index % 4 === 2
                ? 'aspect-video'
                : 'aspect-square';

            return (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-[#E8E8EA] overflow-hidden shadow-xs hover:border-[#7456F1] transition-all flex flex-col justify-between creative-card-hover group cursor-pointer"
                onClick={() => setSelectedInsp(item)}
              >
                {/* Media Container */}
                <div className={`relative ${aspectClass} w-full overflow-hidden bg-zinc-900`}>
                  <img
                    src={item.thumbnailUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  {/* Top badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[10px]">
                    <span className="px-2 py-0.5 rounded bg-black/75 text-white backdrop-blur-xs font-bold tracking-wider uppercase">
                      {item.platform}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#D7F36B] text-[#17171C] font-bold tracking-wider uppercase">
                      {item.format}
                    </span>
                  </div>

                  {/* Bookmark Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSaveToCollection(item.id);
                    }}
                    title={isSaved ? 'Saved in collection' : 'Save inspiration'}
                    className={`absolute top-3 right-3 p-2 rounded-lg backdrop-blur-xs transition-colors cursor-pointer ${
                      isSaved
                        ? 'bg-[#7456F1] text-white shadow-md'
                        : 'bg-black/60 text-white hover:bg-black/80'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5 fill-current" />
                  </button>

                  {/* Floating Play Icon on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-11 h-11 rounded-full bg-white/30 backdrop-blur-md border border-white/50 flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform">
                      <Play className="w-4 h-4 fill-white ml-0.5" />
                    </div>
                  </div>

                  {/* Bottom Hook Overlay */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white text-xs font-bold line-clamp-2 leading-snug drop-shadow-md">
                      &ldquo;{item.hookText}&rdquo;
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-zinc-300 mt-1.5 font-medium">
                      <span>{item.brandName}</span>
                      <span className="text-[#D7F36B]">{item.metrics.views} views</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer Metadata */}
                <div className="p-3.5 bg-white text-xs">
                  <h4 className="font-bold text-[#18181B] truncate group-hover:text-[#7456F1] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-[#777780] mt-0.5 line-clamp-1">
                    {item.industry} &bull; {item.videoDuration}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 5. POLISHED CREATIVE DETAIL MODAL */}
      {selectedInsp && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#E8E8EA] max-w-3xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setSelectedInsp(null)}
              className="absolute top-5 right-5 text-[#777780] hover:text-[#18181B] text-xl font-bold p-1 cursor-pointer"
            >
              &times;
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#EEE9FF] text-[#7456F1]">
                {selectedInsp.brandName}
              </span>
              <span className="text-xs text-[#777780]">•</span>
              <span className="text-xs text-[#777780]">{selectedInsp.platform}</span>
              <span className="text-xs text-[#777780]">•</span>
              <span className="text-xs text-[#777780]">{selectedInsp.format}</span>
            </div>

            <h2 className="text-xl font-bold text-[#18181B] tracking-tight">{selectedInsp.title}</h2>

            {/* Creative Video Frame Preview */}
            <div className="my-5 relative aspect-video w-full rounded-xl overflow-hidden bg-zinc-950 border border-[#E8E8EA]">
              <img
                src={selectedInsp.thumbnailUrl}
                alt={selectedInsp.title}
                className="w-full h-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-xl">
                  <Play className="w-6 h-6 fill-white ml-0.5" />
                </div>
              </div>
              <div className="absolute bottom-3 right-3 bg-black/80 px-2.5 py-1 rounded-md text-xs font-semibold text-white">
                {selectedInsp.videoDuration}
              </div>
            </div>

            {/* Opening Hook Quote */}
            <div className="p-4 rounded-xl border border-[#7456F1]/30 bg-[#EEE9FF]/40 mb-6">
              <span className="text-[10px] text-[#7456F1] font-bold uppercase tracking-wider block mb-1">
                Viral Opening Hook (0:00 - 0:03)
              </span>
              <p className="text-base font-bold text-[#18181B] leading-relaxed">
                &ldquo;{selectedInsp.hookText}&rdquo;
              </p>
            </div>

            {/* Detailed Creative Breakdowns */}
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl border border-[#E8E8EA] bg-[#F7F7F5]">
                <h4 className="font-bold text-[#18181B] text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#7456F1]" />
                  1. Hook Psychology &amp; Retention Driver
                </h4>
                <p className="text-[#18181B] mt-1.5 leading-relaxed font-normal">
                  {selectedInsp.hookAnalysis}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-[#E8E8EA] bg-[#F7F7F5]">
                <h4 className="font-bold text-[#18181B] text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#17171C]" />
                  2. Storytelling Approach &amp; Pacing
                </h4>
                <p className="text-[#18181B] mt-1.5 leading-relaxed font-normal">
                  {selectedInsp.storytellingApproach}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-[#E8E8EA] bg-[#F7F7F5]">
                <h4 className="font-bold text-[#18181B] text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D7F36B]" />
                  3. Call to Action (CTA) Technique
                </h4>
                <p className="text-[#18181B] mt-1.5 leading-relaxed font-normal">
                  {selectedInsp.ctaTechnique}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-[#168365]/20 bg-[#168365]/5">
                <h4 className="font-bold text-[#168365] text-sm">Key Conversion Principles</h4>
                <ul className="text-[#18181B] mt-2 space-y-1 list-disc list-inside">
                  {selectedInsp.whyItWorks.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between text-xs text-[#777780] pt-2">
                <span>Source: {selectedInsp.sourceAttribution}</span>
                <span className="font-semibold text-[#18181B]">
                  {selectedInsp.metrics.views} views &bull; {selectedInsp.metrics.engagement} ER
                </span>
              </div>
            </div>

            {/* Modal Controls */}
            <div className="mt-6 pt-4 border-t border-[#E8E8EA] flex items-center justify-between">
              <button
                onClick={() => handleSaveToCollection(selectedInsp.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  savedInspirationIds.includes(selectedInsp.id)
                    ? 'bg-[#168365] text-white shadow-md'
                    : 'bg-[#17171C] text-white hover:bg-[#272730]'
                }`}
              >
                <Bookmark className="w-4 h-4 fill-current" />
                <span>
                  {savedInspirationIds.includes(selectedInsp.id)
                    ? 'Saved in Collection'
                    : 'Save to Creative Board'}
                </span>
              </button>

              <button
                onClick={() => setSelectedInsp(null)}
                className="px-4 py-2 rounded-xl border border-[#E8E8EA] text-xs font-semibold text-[#18181B] hover:bg-[#F7F7F5] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
