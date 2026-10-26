'use client';

import React from 'react';
import Link from 'next/link';
import {
  Calendar,
  Layers,
  ArrowRight,
  ExternalLink,
  MoreVertical,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';
import { CampaignApplication, Campaign, Collaboration } from '@/types';
import { ApplicationStatusBadge } from './ApplicationStatusBadge';
import { ApplicationJourney } from './ApplicationJourney';

interface ApplicationCardProps {
  application: CampaignApplication;
  campaign?: Campaign;
  collaboration?: Collaboration;
  onOpenDetails: (application: CampaignApplication) => void;
  onWithdraw?: (applicationId: string) => void;
}

export function ApplicationCard({
  application,
  campaign,
  collaboration,
  onOpenDetails,
  onWithdraw,
}: ApplicationCardProps) {
  const coverUrl =
    campaign?.coverImage ||
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80';

  const brandLogo =
    campaign?.brandLogo ||
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=150&auto=format&fit=crop&q=80';

  const formattedDate = new Date(application.appliedAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const canWithdraw =
    (application.status === 'pending' || application.status === 'shortlisted') &&
    Boolean(onWithdraw);

  return (
    <div className="bg-white rounded-xl border border-[#E8E8EA] overflow-hidden shadow-xs hover:border-[#7456F1] transition-all flex flex-col justify-between creative-card-hover group">
      <div>
        {/* Visual Cover Banner with Controlled Height */}
        <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-zinc-100">
          <img
            src={coverUrl}
            alt={application.campaignTitle}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

          {/* Top Pill Badges */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider">
              {campaign?.requirements.platforms[0] || 'Instagram'}
            </span>
            <span className="px-2 py-0.5 rounded bg-[#D7F36B] text-[#17171C] text-[10px] font-bold uppercase tracking-wider">
              {campaign?.category?.split(' ')[0] || 'UGC'}
            </span>
          </div>

          {/* Top Right Status */}
          <div className="absolute top-3 right-3">
            <ApplicationStatusBadge status={application.status} size="sm" />
          </div>

          {/* Bottom Proposed Rate Tag */}
          <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg text-xs font-bold tabular-nums">
            ₹{application.proposedRate.toLocaleString('en-IN')} Proposed Rate
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5 space-y-3.5">
          {/* Brand Header */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <img
                src={brandLogo}
                alt={application.brandName}
                className="w-5 h-5 rounded-md object-cover border border-[#E8E8EA] shrink-0"
              />
              <span className="text-xs font-bold text-[#18181B] truncate">{application.brandName}</span>
              <span className="text-xs text-[#777780] truncate">&bull; {campaign?.category}</span>
            </div>

            <span className="text-[11px] text-[#777780] shrink-0">{formattedDate}</span>
          </div>

          {/* Campaign Title */}
          <h3
            onClick={() => onOpenDetails(application)}
            className="text-sm font-bold text-[#18181B] group-hover:text-[#7456F1] transition-colors line-clamp-1 cursor-pointer"
          >
            {application.campaignTitle}
          </h3>

          {/* Pitch Excerpt */}
          <p className="text-xs text-[#777780] line-clamp-2 italic bg-[#F7F7F5] p-2.5 rounded-lg border border-[#E8E8EA]/60 leading-relaxed">
            &ldquo;{application.pitch}&rdquo;
          </p>

          {/* Required Deliverables Badges */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[10px] uppercase font-bold text-[#777780] tracking-wider mr-1">
              Deliverables:
            </span>
            {(campaign?.requirements.deliverables || ['1x Reel', '1x Story']).map((d, i) => (
              <span
                key={i}
                className="text-[10px] px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 font-medium truncate max-w-[150px]"
              >
                {d}
              </span>
            ))}
          </div>

          {/* Progress Tracker (Compact) */}
          <div className="pt-2 border-t border-[#F4F4F5]">
            <ApplicationJourney
              status={application.status}
              appliedAt={application.appliedAt}
              isCompact={true}
            />
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="p-4 pt-0 sm:p-5 sm:pt-0 flex items-center justify-between gap-2 border-t border-[#F4F4F5] mt-3">
        <Link
          href={`/creator/campaigns/${application.campaignId}`}
          className="text-xs font-medium text-[#777780] hover:text-[#18181B] transition-colors"
        >
          View Brief
        </Link>

        <div className="flex items-center gap-2">
          {canWithdraw && (
            <button
              onClick={() => onWithdraw?.(application.id)}
              title="Withdraw Application"
              className="p-1.5 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-colors text-xs font-medium cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}

          {application.status === 'accepted' && collaboration ? (
            <Link
              href={`/creator/collaborations/${collaboration.id}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#168365] hover:bg-[#137257] text-white text-xs font-bold transition-colors shadow-2xs"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Workspace</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          ) : (
            <button
              onClick={() => onOpenDetails(application)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#17171C] hover:bg-[#272730] text-white text-xs font-bold transition-colors cursor-pointer"
            >
              <span>View Details</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
