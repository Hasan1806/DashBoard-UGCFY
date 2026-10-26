'use client';

import React from 'react';
import Link from 'next/link';
import {
  Compass,
  Search,
  FilterX,
  Sparkles,
  CheckCircle2,
  Clock,
  Layers,
} from 'lucide-react';

interface ApplicationsEmptyStateProps {
  filter: string;
  searchQuery: string;
  totalApplications: number;
  onClearFilters: () => void;
}

export function ApplicationsEmptyState({
  filter,
  searchQuery,
  totalApplications,
  onClearFilters,
}: ApplicationsEmptyStateProps) {
  // Case 1: Search query active with 0 results
  if (searchQuery.trim()) {
    return (
      <div className="bg-white rounded-2xl border border-[#E8E8EA] p-12 text-center shadow-xs">
        <div className="w-12 h-12 rounded-2xl bg-zinc-100 text-zinc-500 flex items-center justify-center mx-auto mb-3.5">
          <Search className="w-5 h-5 stroke-[2]" />
        </div>
        <h3 className="text-base font-bold text-[#18181B]">No applications match &ldquo;{searchQuery}&rdquo;</h3>
        <p className="text-xs text-[#777780] max-w-sm mx-auto mt-1 leading-relaxed">
          We couldn&apos;t find any pitches matching your search term. Try searching by brand name, category, or clear your query.
        </p>
        <button
          onClick={onClearFilters}
          className="mt-4 px-4 py-2 rounded-xl bg-[#17171C] text-white text-xs font-bold hover:bg-[#272730] transition-colors cursor-pointer"
        >
          Clear Search Filter
        </button>
      </div>
    );
  }

  // Case 2: Specific status filter with 0 results
  if (filter !== 'all' && totalApplications > 0) {
    const config = {
      pending: {
        title: 'No Pending Applications',
        description: 'All your submitted proposals have either been shortlisted, accepted, or concluded.',
        icon: Clock,
      },
      shortlisted: {
        title: 'No Shortlisted Applications Currently',
        description: 'When a brand creative team flags your proposal as a top candidate, it will appear here.',
        icon: Sparkles,
      },
      accepted: {
        title: 'No Accepted Applications Yet',
        description: 'Keep pitching! Tailor your hook ideas and audience metrics to brand briefs to land your next paid collaboration.',
        icon: CheckCircle2,
      },
      rejected: {
        title: 'No Declined Applications',
        description: 'None of your active submissions have been declined.',
        icon: Layers,
      },
      withdrawn: {
        title: 'No Withdrawn Applications',
        description: 'You have not withdrawn any campaign pitches.',
        icon: FilterX,
      },
    }[filter.toLowerCase()] || {
      title: 'No Applications in this Category',
      description: 'Try switching to another tab or exploring active campaign opportunities.',
      icon: Layers,
    };

    const Icon = config.icon;

    return (
      <div className="bg-white rounded-2xl border border-[#E8E8EA] p-12 text-center shadow-xs">
        <div className="w-12 h-12 rounded-2xl bg-zinc-100 text-[#18181B] flex items-center justify-center mx-auto mb-3.5">
          <Icon className="w-5 h-5 stroke-[2]" />
        </div>
        <h3 className="text-base font-bold text-[#18181B]">{config.title}</h3>
        <p className="text-xs text-[#777780] max-w-md mx-auto mt-1 leading-relaxed">
          {config.description}
        </p>
        <div className="mt-5 flex items-center justify-center gap-2.5">
          <button
            onClick={onClearFilters}
            className="px-4 py-2 rounded-xl border border-[#E8E8EA] hover:bg-[#F7F7F5] text-xs font-semibold text-[#18181B] transition-colors cursor-pointer"
          >
            Show All Applications
          </button>
          <Link
            href="/creator/campaigns"
            className="px-4 py-2 rounded-xl bg-[#7456F1] hover:bg-[#6343E0] text-white text-xs font-bold transition-all shadow-xs"
          >
            Browse New Campaigns
          </Link>
        </div>
      </div>
    );
  }

  // Case 3: Creator has zero applications in total
  return (
    <div className="bg-white rounded-2xl border border-[#E8E8EA] p-12 sm:p-16 text-center shadow-xs">
      <div className="w-14 h-14 rounded-2xl bg-[#EEE9FF] text-[#7456F1] flex items-center justify-center mx-auto mb-4">
        <Compass className="w-7 h-7 stroke-[2]" />
      </div>
      <h3 className="text-lg font-bold text-[#18181B] tracking-tight">
        Every great collaboration starts somewhere
      </h3>
      <p className="text-xs text-[#777780] max-w-md mx-auto mt-1.5 leading-relaxed">
        You haven&apos;t submitted any proposals yet. Discover open creative briefs from top brands across skincare, consumer tech, and wellness, and submit your custom pitch with escrow-backed payouts.
      </p>
      <Link
        href="/creator/campaigns"
        className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#7456F1] hover:bg-[#6343E0] text-white text-xs font-bold transition-all shadow-md hover:shadow-lg cursor-pointer"
      >
        <Compass className="w-4 h-4" />
        <span>Explore Open Campaign Briefs</span>
      </Link>
    </div>
  );
}
