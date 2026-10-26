'use client';

import React from 'react';
import {
  Search,
  LayoutGrid,
  List,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { ApplicationStatus } from '@/types';

export type SortOption = 'newest' | 'oldest' | 'highest_rate' | 'lowest_rate';
export type ViewMode = 'grid' | 'list';

interface ApplicationFilterBarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  tabCounts: Record<string, number>;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
  platformFilter: string;
  onPlatformChange: (platform: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (view: ViewMode) => void;
  totalFiltered: number;
}

export function ApplicationFilterBar({
  currentTab,
  onTabChange,
  tabCounts,
  searchQuery,
  onSearchChange,
  sortOption,
  onSortChange,
  platformFilter,
  onPlatformChange,
  viewMode,
  onViewModeChange,
  totalFiltered,
}: ApplicationFilterBarProps) {
  const tabs = [
    { id: 'all', label: 'All Proposals', count: tabCounts.all || 0 },
    { id: 'pending', label: 'Pending', count: tabCounts.pending || 0 },
    { id: 'shortlisted', label: 'Shortlisted', count: tabCounts.shortlisted || 0 },
    { id: 'accepted', label: 'Accepted', count: tabCounts.accepted || 0 },
    { id: 'rejected', label: 'Declined', count: tabCounts.rejected || 0 },
    { id: 'withdrawn', label: 'Withdrawn', count: tabCounts.withdrawn || 0 },
  ];

  return (
    <div className="space-y-4">
      {/* Status Tabs Bar */}
      <div className="flex items-center gap-1.5 border-b border-[#E8E8EA] pb-3 text-xs overflow-x-auto scrollbar-none">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#17171C] text-white shadow-xs'
                  : 'text-[#777780] hover:text-[#18181B] hover:bg-[#F7F7F5]'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-zinc-100 text-[#777780]'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search, Sort, Platform Filter & View Switcher Bar */}
      <div className="bg-white rounded-xl border border-[#E8E8EA] p-3 sm:p-4 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777780]" />
          <input
            type="text"
            placeholder="Search proposals by campaign, brand, or pitch keywords..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full text-xs rounded-lg border border-[#E8E8EA] bg-[#F7F7F5] pl-9 pr-8 py-2 text-[#18181B] placeholder-[#777780] focus:border-[#7456F1] focus:bg-white focus:outline-none transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#777780] hover:text-[#18181B] cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Controls & View Toggle */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Platform Filter */}
          <select
            value={platformFilter}
            onChange={(e) => onPlatformChange(e.target.value)}
            className="text-xs font-semibold rounded-lg border border-[#E8E8EA] bg-[#F7F7F5] px-3 py-2 text-[#18181B] focus:border-[#7456F1] focus:bg-white focus:outline-none cursor-pointer"
          >
            <option value="all">All Platforms</option>
            <option value="Instagram">Instagram</option>
            <option value="YouTube">YouTube</option>
            <option value="TikTok">TikTok</option>
          </select>

          {/* Sort Dropdown */}
          <select
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="text-xs font-semibold rounded-lg border border-[#E8E8EA] bg-[#F7F7F5] px-3 py-2 text-[#18181B] focus:border-[#7456F1] focus:bg-white focus:outline-none cursor-pointer"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest_rate">Highest Proposed Rate</option>
            <option value="lowest_rate">Lowest Proposed Rate</option>
          </select>

          {/* View Toggle (Grid / List) */}
          <div className="flex items-center rounded-lg border border-[#E8E8EA] bg-[#F7F7F5] p-0.5">
            <button
              onClick={() => onViewModeChange('grid')}
              title="Grid View"
              aria-label="Grid View"
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-[#18181B] shadow-2xs font-bold'
                  : 'text-[#777780] hover:text-[#18181B]'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              title="List View"
              aria-label="List View"
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-white text-[#18181B] shadow-2xs font-bold'
                  : 'text-[#777780] hover:text-[#18181B]'
              }`}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
