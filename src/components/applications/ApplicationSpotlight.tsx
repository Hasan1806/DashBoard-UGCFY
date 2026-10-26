'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  Coins,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { CampaignApplication, Campaign, Collaboration } from '@/types';
import { ApplicationStatusBadge } from './ApplicationStatusBadge';

interface ApplicationSpotlightProps {
  applications: CampaignApplication[];
  campaigns: Campaign[];
  collaborations: Collaboration[];
  onOpenDetails: (application: CampaignApplication) => void;
}

export function ApplicationSpotlight({
  applications,
  campaigns,
  collaborations,
  onOpenDetails,
}: ApplicationSpotlightProps) {
  if (applications.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-[#E8E8EA] p-8 md:p-10 text-center shadow-xs">
        <div className="w-12 h-12 rounded-2xl bg-[#EEE9FF] text-[#7456F1] flex items-center justify-center mx-auto mb-4">
          <Compass className="w-6 h-6 stroke-[2]" />
        </div>
        <h3 className="text-base font-bold text-[#18181B]">No applications submitted yet</h3>
        <p className="text-xs text-[#777780] max-w-md mx-auto mt-1 leading-relaxed">
          Explore curated briefs from top brands in skincare, audio tech, specialty coffee, and wellness.
          Submit your authentic pitch to unlock brand collaborations with 100% escrow protection.
        </p>
        <Link
          href="/creator/campaigns"
          className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#7456F1] hover:bg-[#6343E0] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
        >
          <Compass className="w-4 h-4" />
          <span>Explore Live Campaigns</span>
        </Link>
      </div>
    );
  }

  // Priority algorithm:
  // 1. Accepted application
  // 2. Shortlisted application
  // 3. Pending application with earliest deadline or latest applied
  // 4. Fallback to applications[0]
  const spotlightApp =
    applications.find((a) => a.status === 'accepted') ||
    applications.find((a) => a.status === 'shortlisted') ||
    applications.find((a) => a.status === 'pending') ||
    applications[0];

  const matchedCampaign = campaigns.find((c) => c.id === spotlightApp.campaignId);
  const matchedCollaboration = collaborations.find(
    (c) => c.campaignId === spotlightApp.campaignId
  );

  // Compute recommendation
  const recommendation = (() => {
    switch (spotlightApp.status) {
      case 'accepted':
        return {
          title: 'Action Required: Workspace Ready',
          description:
            'Brand locked your pitch! Open your collaboration workspace to review deliverable timelines and upload your raw reel concept.',
          actionLabel: 'Open Collaboration Workspace',
          href: matchedCollaboration ? `/creator/collaborations/${matchedCollaboration.id}` : null,
          badge: 'DEAL SECURED',
          badgeColor: 'bg-[#168365] text-white',
        };
      case 'shortlisted':
        return {
          title: 'High Priority: Pitch Shortlisted',
          description:
            'You are in the brand’s top candidate pool. Ensure your portfolio links are active and notifications are on for final confirmation.',
          actionLabel: 'View Pitch & Details',
          href: null,
          badge: 'TOP CANDIDATE',
          badgeColor: 'bg-[#7456F1] text-white',
        };
      case 'pending':
        return {
          title: 'Under Brand Review',
          description:
            'Your proposal is currently queued with brand creative leads. Average brand review turnaround is 2–4 business days.',
          actionLabel: 'Review Submission',
          href: null,
          badge: 'IN REVIEW',
          badgeColor: 'bg-[#18181B] text-white',
        };
      case 'rejected':
        return {
          title: 'Pitch Concluded',
          description:
            'This brand selected another aesthetic for this specific flight. Review the campaign notes and explore other active briefs.',
          actionLabel: 'Explore Other Campaigns',
          href: '/creator/campaigns',
          badge: 'CONCLUDED',
          badgeColor: 'bg-zinc-600 text-white',
        };
      case 'withdrawn':
        return {
          title: 'Pitch Withdrawn',
          description: 'You voluntarily withdrew this pitch. You can apply to other open briefs anytime.',
          actionLabel: 'Browse Campaigns',
          href: '/creator/campaigns',
          badge: 'WITHDRAWN',
          badgeColor: 'bg-zinc-600 text-white',
        };
    }
  })();

  const coverUrl =
    matchedCampaign?.coverImage ||
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80';

  const brandLogo =
    matchedCampaign?.brandLogo ||
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=150&auto=format&fit=crop&q=80';

  return (
    <div className="bg-white rounded-2xl border border-[#E8E8EA] overflow-hidden shadow-xs hover:border-[#7456F1]/50 transition-all group">
      <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
        {/* Left Column: Editorial Info */}
        <div className="md:col-span-7 lg:col-span-8 p-5 sm:p-6 flex flex-col justify-between">
          <div>
            {/* Top Tag & Status */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase ${recommendation.badgeColor}`}>
                  {recommendation.badge}
                </span>
                <span className="text-[11px] text-[#777780] font-medium">Spotlight Opportunity</span>
              </div>
              <ApplicationStatusBadge status={spotlightApp.status} size="sm" />
            </div>

            {/* Brand Header */}
            <div className="flex items-center gap-2.5 mb-2">
              <img
                src={brandLogo}
                alt={spotlightApp.brandName}
                className="w-5 h-5 rounded-md object-cover border border-[#E8E8EA] shrink-0"
              />
              <span className="text-xs font-bold text-[#18181B]">{spotlightApp.brandName}</span>
              <span className="text-xs text-[#777780]">&bull; {matchedCampaign?.category || 'Creator Campaign'}</span>
            </div>

            {/* Campaign Title */}
            <h2 className="text-lg sm:text-xl font-bold text-[#18181B] tracking-tight group-hover:text-[#7456F1] transition-colors leading-snug">
              {spotlightApp.campaignTitle}
            </h2>

            {/* Pitch Snippet */}
            <div className="mt-2.5 p-3 rounded-xl bg-[#F7F7F5] border border-[#E8E8EA]">
              <div className="flex items-center justify-between text-[11px] text-[#777780] mb-1">
                <span className="font-semibold text-[#18181B]">Your Pitch</span>
                <span className="tabular-nums font-bold text-[#168365]">
                  Proposed Rate: ₹{spotlightApp.proposedRate.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-xs text-[#52525B] italic line-clamp-2 leading-relaxed">
                &ldquo;{spotlightApp.pitch}&rdquo;
              </p>
            </div>

            {/* Recommendation Box */}
            <div className="mt-3.5 p-3 rounded-xl bg-[#EFF8F5] border border-[#168365]/20 flex items-start gap-2.5 text-xs text-[#18181B]">
              <Sparkles className="w-4 h-4 text-[#168365] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#18181B] block">{recommendation.title}</span>
                <span className="text-[11px] text-[#52525B] leading-relaxed block mt-0.5">
                  {recommendation.description}
                </span>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 mt-4 border-t border-[#F4F4F5] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-xs text-[#777780]">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                Submitted {new Date(spotlightApp.appliedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
              </span>
              <span>&bull;</span>
              <span>{matchedCampaign?.requirements.deliverables.length || 2} deliverables</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenDetails(spotlightApp)}
                className="px-3.5 py-2 rounded-xl border border-[#E8E8EA] hover:bg-[#F7F7F5] text-xs font-semibold text-[#18181B] transition-colors cursor-pointer"
              >
                View Details
              </button>

              {recommendation.href ? (
                <Link
                  href={recommendation.href}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#17171C] hover:bg-[#272730] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  <span>{recommendation.actionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ) : (
                <button
                  onClick={() => onOpenDetails(spotlightApp)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#7456F1] hover:bg-[#6343E0] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  <span>{recommendation.actionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Controlled Photography Crop */}
        <div className="md:col-span-5 lg:col-span-4 relative h-48 sm:h-56 md:h-full min-h-[190px] md:min-h-[240px] max-h-64 md:max-h-none overflow-hidden bg-zinc-100 border-t md:border-t-0 md:border-l border-[#E8E8EA]">
          <img
            src={coverUrl}
            alt={spotlightApp.campaignTitle}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex gap-1.5">
            <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider">
              {matchedCampaign?.requirements.platforms[0] || 'Instagram'}
            </span>
            <span className="px-2 py-0.5 rounded bg-[#D7F36B] text-[#17171C] text-[10px] font-bold uppercase tracking-wider">
              {matchedCampaign?.category?.split(' ')[0] || 'Skincare'}
            </span>
          </div>

          {/* Bottom Meta Overlay */}
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-white/90">Campaign Budget:</span>
              <span className="font-bold tabular-nums text-white">
                ₹{matchedCampaign ? matchedCampaign.budget.toLocaleString('en-IN') : '1,80,000'}
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-white/75 mt-1">
              <span>Deadline:</span>
              <span>{matchedCampaign?.submissionDeadline || '30 Nov 2026'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
