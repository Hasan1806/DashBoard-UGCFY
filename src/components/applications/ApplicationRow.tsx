'use client';

import React from 'react';
import Link from 'next/link';
import {
  Calendar,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  ExternalLink,
} from 'lucide-react';
import { CampaignApplication, Campaign, Collaboration } from '@/types';
import { ApplicationStatusBadge } from './ApplicationStatusBadge';

interface ApplicationRowProps {
  application: CampaignApplication;
  campaign?: Campaign;
  collaboration?: Collaboration;
  onOpenDetails: (application: CampaignApplication) => void;
  onWithdraw?: (applicationId: string) => void;
}

export function ApplicationRow({
  application,
  campaign,
  collaboration,
  onOpenDetails,
  onWithdraw,
}: ApplicationRowProps) {
  const coverUrl =
    campaign?.coverImage ||
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80';

  const brandLogo =
    campaign?.brandLogo ||
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=150&auto=format&fit=crop&q=80';

  const formattedDate = new Date(application.appliedAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
  });

  const canWithdraw =
    (application.status === 'pending' || application.status === 'shortlisted') &&
    Boolean(onWithdraw);

  return (
    <div className="p-4 sm:px-5 sm:py-4 bg-white hover:bg-[#FDFDFD] border-b border-[#E8E8EA] last:border-b-0 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors group">
      {/* Left: Thumbnail & Main Info */}
      <div className="flex items-start gap-3.5 min-w-0 flex-1">
        <div
          onClick={() => onOpenDetails(application)}
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-zinc-100 shrink-0 cursor-pointer border border-[#E8E8EA]"
        >
          <img
            src={coverUrl}
            alt={application.campaignTitle}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <img
              src={brandLogo}
              alt={application.brandName}
              className="w-4 h-4 rounded object-cover border border-[#E8E8EA] shrink-0"
            />
            <span className="text-xs font-bold text-[#18181B] truncate">{application.brandName}</span>
            <span className="text-xs text-[#777780] hidden sm:inline">&bull; {campaign?.category}</span>
            <span className="text-[11px] text-[#777780] hidden sm:inline">&bull; {formattedDate}</span>
          </div>

          <h3
            onClick={() => onOpenDetails(application)}
            className="text-sm font-bold text-[#18181B] group-hover:text-[#7456F1] transition-colors truncate cursor-pointer"
          >
            {application.campaignTitle}
          </h3>

          <p className="text-xs text-[#777780] line-clamp-1 italic mt-0.5">
            &ldquo;{application.pitch}&rdquo;
          </p>
        </div>
      </div>

      {/* Middle & Right: Status, Rate, Actions */}
      <div className="flex flex-wrap items-center justify-between md:justify-end gap-3 sm:gap-4 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#F4F4F5]">
        {/* Status Badge */}
        <ApplicationStatusBadge status={application.status} size="sm" />

        {/* Proposed Rate */}
        <div className="text-right">
          <span className="text-xs font-bold text-[#18181B] tabular-nums block">
            ₹{application.proposedRate.toLocaleString('en-IN')}
          </span>
          <span className="text-[10px] text-[#777780] block">Proposed</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {canWithdraw && (
            <button
              onClick={() => onWithdraw?.(application.id)}
              title="Withdraw pitch"
              className="p-1.5 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-colors text-xs cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={() => onOpenDetails(application)}
            className="px-3 py-1.5 rounded-lg border border-[#E8E8EA] hover:bg-[#F7F7F5] text-xs font-semibold text-[#18181B] transition-colors cursor-pointer"
          >
            Details
          </button>

          {application.status === 'accepted' && collaboration ? (
            <Link
              href={`/creator/collaborations/${collaboration.id}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#168365] hover:bg-[#137257] text-white text-xs font-bold transition-colors shadow-2xs"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Workspace</span>
            </Link>
          ) : (
            <Link
              href={`/creator/campaigns/${application.campaignId}`}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs text-[#777780] hover:text-[#18181B] transition-colors"
            >
              <span>Brief</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
