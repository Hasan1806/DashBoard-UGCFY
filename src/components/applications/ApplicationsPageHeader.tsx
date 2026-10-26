'use client';

import React from 'react';
import Link from 'next/link';
import {
  Compass,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Layers,
} from 'lucide-react';
import { CreatorProfile } from '@/types';

interface ApplicationsPageHeaderProps {
  creator: CreatorProfile;
  totalApplications: number;
  activeOpportunities: number;
  acceptedCount: number;
}

export function ApplicationsPageHeader({
  creator,
  totalApplications,
  activeOpportunities,
  acceptedCount,
}: ApplicationsPageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 gap-4 border-b border-[#E8E8EA]">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#7456F1] uppercase tracking-wider">
            Creator Collaboration Hub
          </span>
          <span className="text-xs text-[#E8E8EA]">•</span>
          <span className="text-xs text-[#777780]">{creator.fullName} ({creator.handle})</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-[#18181B] tracking-tight mt-1">
          My Applications
        </h1>

        <p className="text-xs text-[#777780] mt-1 max-w-2xl leading-relaxed">
          Every great collaboration starts somewhere. Track your pitches, opportunities, and next steps.
        </p>

        {/* Compact Application Performance Summary Strip */}
        <div className="flex flex-wrap items-center gap-3 mt-3 text-[11px] text-[#777780]">
          <span className="inline-flex items-center gap-1.5 font-medium text-[#18181B]">
            <Layers className="w-3.5 h-3.5 text-[#7456F1]" />
            <strong>{totalApplications}</strong> proposals logged
          </span>
          <span className="text-[#E8E8EA]">&bull;</span>
          <span className="inline-flex items-center gap-1.5 font-medium text-[#7456F1]">
            <Sparkles className="w-3.5 h-3.5" />
            <strong>{activeOpportunities}</strong> active in review/shortlist
          </span>
          <span className="text-[#E8E8EA]">&bull;</span>
          <span className="inline-flex items-center gap-1.5 font-medium text-[#168365]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <strong>{acceptedCount}</strong> deals in 100% escrow
          </span>
        </div>
      </div>

      {/* Prominent but refined Explore Campaigns CTA */}
      <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto">
        <Link
          href="/creator/campaigns"
          className="inline-flex items-center gap-2 bg-[#7456F1] hover:bg-[#6343E0] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md hover:shadow-lg cursor-pointer"
        >
          <Compass className="w-4 h-4 stroke-[2.25]" />
          <span>Explore Campaigns</span>
        </Link>
      </div>
    </div>
  );
}
