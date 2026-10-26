'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  X,
  Calendar,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Coins,
  ArrowRight,
  AlertTriangle,
  RotateCcw,
  FileText,
  MessageSquare,
} from 'lucide-react';
import { CampaignApplication, Campaign, Collaboration } from '@/types';
import { ApplicationStatusBadge } from './ApplicationStatusBadge';
import { ApplicationJourney } from './ApplicationJourney';

interface ApplicationDetailDrawerProps {
  application: CampaignApplication | null;
  campaign?: Campaign;
  collaboration?: Collaboration;
  isOpen: boolean;
  onClose: () => void;
  onWithdraw: (applicationId: string) => void;
}

export function ApplicationDetailDrawer({
  application,
  campaign,
  collaboration,
  isOpen,
  onClose,
  onWithdraw,
}: ApplicationDetailDrawerProps) {
  const [confirmWithdraw, setConfirmWithdraw] = useState(false);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Reset confirmation state when drawer opens with a new application
  useEffect(() => {
    setConfirmWithdraw(false);
  }, [application?.id]);

  if (!isOpen || !application) return null;

  const coverUrl =
    campaign?.coverImage ||
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80';

  const brandLogo =
    campaign?.brandLogo ||
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=150&auto=format&fit=crop&q=80';

  const formattedDate = new Date(application.appliedAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const canWithdraw =
    application.status === 'pending' || application.status === 'shortlisted';

  // Status guidance messaging
  const statusGuidance = {
    pending: {
      title: 'Proposal Awaiting Brand Review',
      description:
        'Your pitch has been safely received and logged into the brand console. The brand marketing lead typically reviews new proposals within 2–4 business days.',
      tip: 'Tip: You can withdraw this pitch anytime before the brand takes action.',
      bg: 'bg-zinc-50 border-zinc-200 text-zinc-800',
    },
    shortlisted: {
      title: 'You are on the Brand Shortlist! ✨',
      description:
        'The brand creative team selected your pitch as a top candidate. They are finalizing creator quotas and budget allocation.',
      tip: 'Tip: Keep your notifications enabled. Final selection is expected before the submission deadline.',
      bg: 'bg-[#EEE9FF]/60 border-[#7456F1]/30 text-[#18181B]',
    },
    accepted: {
      title: 'Collaboration Locked & Escrow Secured 🎉',
      description:
        'Congratulations! The brand approved your proposed rate of ₹' +
        application.proposedRate.toLocaleString('en-IN') +
        '. Payout is 100% funded into UGCFY escrow.',
      tip: 'Next step: Open your collaboration workspace to review brief guidelines and submit your first draft.',
      bg: 'bg-[#EFF8F5] border-[#168365]/30 text-[#18181B]',
    },
    rejected: {
      title: 'Opportunity Concluded',
      description:
        'This specific campaign flight was filled or prioritized a different demographic focus. Your pitch rate was preserved and your profile remains high-priority for future briefs.',
      tip: 'Tip: Check out our Ads Inspiration feed to see top-converting angles for your next pitch.',
      bg: 'bg-zinc-50 border-zinc-200 text-zinc-700',
    },
    withdrawn: {
      title: 'Application Withdrawn by You',
      description:
        'You withdrew this application. The brand will no longer consider this pitch, freeing your calendar for other opportunities.',
      tip: 'Tip: You can apply to other open briefs anytime.',
      bg: 'bg-zinc-50 border-zinc-200 text-zinc-700',
    },
  }[application.status];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-fade-in"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-xl bg-white h-full shadow-2xl flex flex-col z-10 overflow-hidden animate-slide-left border-l border-[#E8E8EA]">
        {/* Header with Cover */}
        <div className="relative h-44 sm:h-48 w-full bg-zinc-900 overflow-hidden shrink-0">
          <img
            src={coverUrl}
            alt={application.campaignTitle}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/30" />

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close drawer"
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Top Brand Pill */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-xs text-white text-[10px] font-bold tracking-wider uppercase">
              {campaign?.requirements.platforms[0] || 'Instagram'}
            </span>
            <span className="px-2.5 py-1 rounded-md bg-[#D7F36B] text-[#17171C] text-[10px] font-bold tracking-wider uppercase">
              {campaign?.category || 'UGC'}
            </span>
          </div>

          {/* Bottom Title & Status */}
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 text-white">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <img
                  src={brandLogo}
                  alt={application.brandName}
                  className="w-5 h-5 rounded object-cover border border-white/20"
                />
                <span className="text-xs font-bold text-white/95">{application.brandName}</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight truncate">
                {application.campaignTitle}
              </h2>
            </div>
            <div className="shrink-0">
              <ApplicationStatusBadge status={application.status} size="sm" />
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Status Guidance Banner */}
          <div className={`p-4 rounded-xl border ${statusGuidance.bg} space-y-1.5`}>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#7456F1] shrink-0" />
              <h4 className="text-xs font-bold text-[#18181B]">{statusGuidance.title}</h4>
            </div>
            <p className="text-xs text-[#52525B] leading-relaxed">{statusGuidance.description}</p>
            <p className="text-[11px] text-[#777780] italic pt-1">{statusGuidance.tip}</p>
          </div>

          {/* Brand Feedback Notes if Present */}
          {application.reviewNotes && (
            <div className="p-4 rounded-xl bg-[#F7F7F5] border border-[#E8E8EA] space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#18181B]">
                <MessageSquare className="w-3.5 h-3.5 text-[#7456F1]" />
                <span>Brand Creative Feedback</span>
              </div>
              <p className="text-xs text-[#52525B] italic leading-relaxed pt-0.5">
                &ldquo;{application.reviewNotes}&rdquo;
              </p>
            </div>
          )}

          {/* Real Journey Stepper */}
          <div className="bg-white rounded-xl border border-[#E8E8EA] p-4 shadow-xs">
            <span className="text-[10px] font-bold text-[#777780] uppercase tracking-wider block mb-3">
              Application Milestones
            </span>
            <ApplicationJourney
              status={application.status}
              appliedAt={application.appliedAt}
              isCompact={false}
            />
          </div>

          {/* Application Details Summary */}
          <div className="bg-white rounded-xl border border-[#E8E8EA] p-4 shadow-xs space-y-3.5">
            <span className="text-[10px] font-bold text-[#777780] uppercase tracking-wider block border-b border-[#F4F4F5] pb-2">
              Submission Breakdown
            </span>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[#777780] block text-[11px]">Submission Date</span>
                <span className="font-semibold text-[#18181B] mt-0.5 block">{formattedDate}</span>
              </div>
              <div>
                <span className="text-[#777780] block text-[11px]">Proposed Rate</span>
                <span className="font-bold text-[#168365] tabular-nums mt-0.5 block">
                  ₹{application.proposedRate.toLocaleString('en-IN')}
                </span>
              </div>
              <div>
                <span className="text-[#777780] block text-[11px]">Campaign Budget</span>
                <span className="font-semibold text-[#18181B] tabular-nums mt-0.5 block">
                  ₹{campaign ? campaign.budget.toLocaleString('en-IN') : '1,80,000'} Total
                </span>
              </div>
              <div>
                <span className="text-[#777780] block text-[11px]">Submission Deadline</span>
                <span className="font-semibold text-[#18181B] mt-0.5 block">
                  {campaign?.submissionDeadline || '30 Nov 2026'}
                </span>
              </div>
            </div>

            {/* Pitch Text */}
            <div className="pt-3 border-t border-[#F4F4F5]">
              <span className="text-[#777780] block text-[11px] font-medium mb-1.5">
                Your Submitted Pitch:
              </span>
              <p className="text-xs text-[#18181B] bg-[#F7F7F5] p-3 rounded-lg border border-[#E8E8EA] leading-relaxed">
                {application.pitch}
              </p>
            </div>

            {/* Submitted Portfolio Links */}
            {application.portfolioLinks && application.portfolioLinks.length > 0 && (
              <div className="pt-3 border-t border-[#F4F4F5]">
                <span className="text-[#777780] block text-[11px] font-medium mb-1.5">
                  Portfolio Samples Shared:
                </span>
                <div className="space-y-1.5">
                  {application.portfolioLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7456F1] hover:underline"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span className="truncate max-w-sm">{link}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Deliverables Required */}
            {campaign?.requirements.deliverables && (
              <div className="pt-3 border-t border-[#F4F4F5]">
                <span className="text-[#777780] block text-[11px] font-medium mb-1.5">
                  Deliverables Required by Brand:
                </span>
                <ul className="text-xs text-[#18181B] space-y-1 list-disc list-inside">
                  {campaign.requirements.deliverables.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-4 sm:p-5 border-t border-[#E8E8EA] bg-white flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="w-full sm:w-auto">
            {canWithdraw && !confirmWithdraw && (
              <button
                onClick={() => setConfirmWithdraw(true)}
                className="w-full sm:w-auto px-3.5 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
              >
                Withdraw Pitch
              </button>
            )}

            {canWithdraw && confirmWithdraw && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    onWithdraw(application.id);
                    setConfirmWithdraw(false);
                    onClose();
                  }}
                  className="px-3 py-1.5 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
                >
                  Confirm Withdraw
                </button>
                <button
                  onClick={() => setConfirmWithdraw(false)}
                  className="px-2.5 py-1.5 text-xs text-[#777780] hover:text-[#18181B] cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Link
              href={`/creator/campaigns/${application.campaignId}`}
              className="px-4 py-2 text-xs font-semibold rounded-xl border border-[#E8E8EA] hover:bg-[#F7F7F5] text-[#18181B] transition-colors text-center"
            >
              Full Brief
            </Link>

            {application.status === 'accepted' && collaboration ? (
              <Link
                href={`/creator/collaborations/${collaboration.id}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-[#168365] hover:bg-[#137257] text-white transition-colors shadow-md text-center"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Open Workspace</span>
              </Link>
            ) : (
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold rounded-xl bg-[#17171C] hover:bg-[#272730] text-white transition-colors text-center cursor-pointer"
              >
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
