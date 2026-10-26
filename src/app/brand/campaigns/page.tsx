'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  Filter,
  Calendar,
  Users,
  Eye,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Megaphone,
  ShieldCheck,
} from 'lucide-react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { useUGCFY } from '@/lib/store';

export default function BrandCampaignsPage() {
  const { currentBrand, campaigns } = useUGCFY();
  const [activeTab, setActiveTab] = useState<'my' | 'explore' | 'drafts' | 'completed'>('my');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Clean Beauty & Skincare',
    'Science-Backed Skincare',
    'Consumer Audio & Tech',
    'Specialty Coffee & Food',
    'Hair Care & Wellness',
    'Wearables & Health Tech',
  ];

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((camp) => {
      if (activeTab === 'my') {
        if (camp.brandId !== currentBrand.id || camp.status === 'draft' || camp.status === 'completed') {
          return false;
        }
      } else if (activeTab === 'explore') {
        if (camp.brandId === currentBrand.id || camp.status !== 'active') {
          return false;
        }
      } else if (activeTab === 'drafts') {
        if (camp.brandId !== currentBrand.id || camp.status !== 'draft') {
          return false;
        }
      } else if (activeTab === 'completed') {
        if (camp.brandId !== currentBrand.id || camp.status !== 'completed') {
          return false;
        }
      }

      if (selectedCategory !== 'All' && camp.category !== selectedCategory) {
        return false;
      }

      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          camp.title.toLowerCase().includes(q) ||
          camp.description.toLowerCase().includes(q) ||
          camp.category.toLowerCase().includes(q)
        );
      }

      return true;
    });
  }, [campaigns, activeTab, selectedCategory, search, currentBrand.id]);

  const featuredCampaign = filteredCampaigns[0];
  const standardCampaigns = filteredCampaigns.slice(1);

  return (
    <DashboardShell>
      <div className="space-y-6 pb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 gap-4 border-b border-[#E8E8EA]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#7456F1] uppercase tracking-wider">Campaign Hub</span>
              <span className="text-xs text-[#E8E8EA]">•</span>
              <span className="text-xs text-[#777780]">{currentBrand.companyName} Console</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#18181B] tracking-tight mt-1">
              Creative Campaign Briefs
            </h1>
            <p className="text-xs text-[#777780] mt-0.5">
              Manage creator requirements, review incoming pitches, and benchmark against competitor campaigns.
            </p>
          </div>

          <Link
            href="/brand/campaigns/new"
            className="inline-flex items-center gap-2 bg-[#7456F1] hover:bg-[#6343E0] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md hover:shadow-lg cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Launch New Campaign</span>
          </Link>
        </div>

        {/* Clean Horizontal Tabs */}
        <div className="flex items-center gap-1.5 border-b border-[#E8E8EA] pb-3 text-xs overflow-x-auto">
          <button
            onClick={() => setActiveTab('my')}
            className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'my'
                ? 'bg-[#17171C] text-white shadow-xs'
                : 'text-[#777780] hover:text-[#18181B] hover:bg-[#F7F7F5]'
            }`}
          >
            Active Briefs ({campaigns.filter((c) => c.brandId === currentBrand.id && c.status === 'active').length})
          </button>

          <button
            onClick={() => setActiveTab('explore')}
            className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'explore'
                ? 'bg-[#17171C] text-white shadow-xs'
                : 'text-[#777780] hover:text-[#18181B] hover:bg-[#F7F7F5]'
            }`}
          >
            Market Exploration ({campaigns.filter((c) => c.brandId !== currentBrand.id && c.status === 'active').length})
          </button>

          <button
            onClick={() => setActiveTab('drafts')}
            className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'drafts'
                ? 'bg-[#17171C] text-white shadow-xs'
                : 'text-[#777780] hover:text-[#18181B] hover:bg-[#F7F7F5]'
            }`}
          >
            Drafts ({campaigns.filter((c) => c.brandId === currentBrand.id && c.status === 'draft').length})
          </button>

          <button
            onClick={() => setActiveTab('completed')}
            className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'completed'
                ? 'bg-[#17171C] text-white shadow-xs'
                : 'text-[#777780] hover:text-[#18181B] hover:bg-[#F7F7F5]'
            }`}
          >
            Completed ({campaigns.filter((c) => c.brandId === currentBrand.id && c.status === 'completed').length})
          </button>
        </div>

        {/* Search and Filters Bar */}
        <div className="bg-white rounded-xl border border-[#E8E8EA] p-4 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777780]" />
              <input
                type="text"
                placeholder="Search campaigns by keyword, category, or format..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full text-xs rounded-lg border border-[#E8E8EA] bg-[#F7F7F5] pl-9 pr-3 py-2 text-[#18181B] focus:border-[#7456F1] focus:bg-white focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-xs font-semibold rounded-lg border border-[#E8E8EA] bg-[#F7F7F5] px-3 py-2 text-[#18181B] focus:border-[#7456F1] focus:bg-white focus:outline-none"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'All' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {activeTab === 'explore' && (
          <div className="p-3.5 rounded-xl bg-[#EEE9FF]/40 border border-[#7456F1]/20 text-xs text-[#18181B] flex items-center justify-between">
            <span>
              <strong>Market Intelligence:</strong> Reviewing public peer brand briefs for deliverable formats and creator compensation benchmarks.
            </span>
          </div>
        )}

        {/* 1 Large Featured Card + 3-Column Grid */}
        {filteredCampaigns.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#E8E8EA] p-16 text-center shadow-xs">
            <Megaphone className="w-8 h-8 text-[#A1A1AA] mx-auto mb-3" />
            <p className="text-sm font-bold text-[#18181B]">No campaigns found</p>
            <p className="text-xs text-[#777780] mt-1">Try clearing your search query or launching a new campaign.</p>
            <Link
              href="/brand/campaigns/new"
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#7456F1] text-white text-xs font-bold shadow-md"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Campaign</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Featured Hero Campaign */}
            {featuredCampaign && (
              <div className="bg-white rounded-2xl border border-[#E8E8EA] overflow-hidden shadow-xs hover:border-[#7456F1] transition-all creative-card-hover group">
                <div className="grid grid-cols-1 md:grid-cols-12">
                  <div className="md:col-span-5 lg:col-span-4 relative h-48 sm:h-56 md:h-full min-h-[190px] md:min-h-[220px] max-h-60 md:max-h-none overflow-hidden bg-zinc-100">
                    <img
                      src={featuredCampaign.coverImage}
                      alt={featuredCampaign.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-[#17171C]/90 text-white text-[10px] font-bold tracking-wider uppercase backdrop-blur-xs">
                        {featuredCampaign.requirements.platforms[0] || 'Instagram'}
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-[#D7F36B] text-[#17171C] text-[10px] font-bold tracking-wider uppercase">
                        {featuredCampaign.category}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg text-xs font-bold tabular-nums">
                      ₹{featuredCampaign.budget.toLocaleString('en-IN')} Total Budget
                    </div>
                  </div>

                  <div className="md:col-span-7 lg:col-span-8 p-5 sm:p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2 text-xs text-[#777780]">
                        <span className="font-bold text-[#18181B]">{featuredCampaign.brandName}</span>
                        <span>&bull;</span>
                        <span>{featuredCampaign.category}</span>
                      </div>

                      <h2 className="text-lg font-bold text-[#18181B] group-hover:text-[#7456F1] transition-colors leading-snug">
                        {featuredCampaign.title}
                      </h2>

                      <p className="text-xs text-[#777780] mt-2 line-clamp-3 leading-relaxed">
                        {featuredCampaign.description}
                      </p>

                      <div className="mt-4 p-3.5 rounded-xl bg-[#F7F7F5] border border-[#E8E8EA]">
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="font-bold text-[#18181B]">Creator Slots</span>
                          <span className="font-bold text-[#7456F1]">
                            {featuredCampaign.acceptedCount} of {featuredCampaign.creatorsNeeded} locked
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-[#E8E8EA] overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#7456F1] to-[#D7F36B] rounded-full"
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

                    <div className="pt-4 mt-4 border-t border-[#F4F4F5] flex items-center justify-between gap-3">
                      <span className="text-xs text-[#777780]">
                        <strong>{featuredCampaign.applicationsCount}</strong> creator applications
                      </span>
                      <Link
                        href={`/brand/campaigns/${featuredCampaign.id}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#17171C] hover:bg-[#272730] text-white text-xs font-bold transition-colors"
                      >
                        <span>Manage Brief</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Supporting Campaigns 3-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {standardCampaigns.map((camp) => (
                <div
                  key={camp.id}
                  className="bg-white rounded-xl border border-[#E8E8EA] overflow-hidden shadow-xs hover:border-[#7456F1] transition-all flex flex-col justify-between creative-card-hover group"
                >
                  <div>
                    <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-zinc-100">
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
                        ₹{camp.budget.toLocaleString('en-IN')}
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-1.5 text-xs text-[#777780]">
                        <span className="font-bold text-[#18181B]">{camp.brandName}</span>
                        <span>&bull;</span>
                        <span className="truncate">{camp.category}</span>
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
                          {camp.acceptedCount}/{camp.creatorsNeeded} locked
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <Link
                      href={`/brand/campaigns/${camp.id}`}
                      className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-[#17171C] hover:bg-[#272730] text-white text-xs font-semibold transition-colors"
                    >
                      <span>Manage Brief</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
