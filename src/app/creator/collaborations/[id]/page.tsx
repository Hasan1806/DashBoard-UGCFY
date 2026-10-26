'use client';

import React, { useState, use, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Calendar,
  Wallet,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Upload,
  Play,
  FileText,
  Send,
  ExternalLink,
  Check,
} from 'lucide-react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { useUGCFY } from '@/lib/store';
import { Deliverable } from '@/types';

function CreatorCollaborationDetailContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = use(params);
  const collabId = unwrappedParams.id;
  const router = useRouter();

  const { collaborations, submitDeliverable, campaigns } = useUGCFY();
  const collab = collaborations.find((c) => c.id === collabId) || collaborations[0];
  const campaign = campaigns.find((c) => c.id === collab?.campaignId);

  const [selectedDeliverable, setSelectedDeliverable] = useState<Deliverable | null>(
    collab?.deliverables[0] || null
  );
  const [fileUrl, setFileUrl] = useState(
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  );
  const [notes, setNotes] = useState(
    'Draft v1: filmed in natural daylight with close-up pore texture swatches and clear voiceover.'
  );
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const handleSubmitContent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDeliverable) return;

    submitDeliverable(collab.id, selectedDeliverable.id, {
      fileUrl,
      notes,
    });

    setSubmissionSuccess(true);
    setTimeout(() => setSubmissionSuccess(false), 2500);
  };

  if (!collab) {
    return (
      <DashboardShell>
        <div className="py-12 text-center text-xs text-[#71717A]">Collaboration not found.</div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <Link
        href="/creator/campaigns"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-[#71717A] hover:text-[#18181B] mb-5 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Campaigns</span>
      </Link>

      {/* Collaboration Header */}
      <div className="bg-white rounded-lg border border-[#E4E4E7] p-5 mb-6 subtle-shadow">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E4E4E7]">
          <div className="flex items-start gap-3">
            <img
              src={collab.brandLogo}
              alt={collab.brandName}
              className="w-12 h-12 rounded object-cover border border-[#E4E4E7] shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-[#71717A]">{collab.brandName}</span>
                <span
                  className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${
                    collab.status === 'approved'
                      ? 'border-[#168365]/20 bg-[#EFF8F5] text-[#168365]'
                      : collab.status === 'deliverable_submitted'
                      ? 'border-amber-200 bg-amber-50 text-amber-800'
                      : 'border-[#E4E4E7] bg-[#FAFAFA] text-[#71717A]'
                  }`}
                >
                  {collab.status.replace('_', ' ')}
                </span>
              </div>
              <h1 className="text-base font-semibold text-[#18181B] mt-1">
                {collab.campaignTitle}
              </h1>
              <p className="text-xs text-[#71717A] mt-0.5">
                Due: {collab.deadline}
              </p>
            </div>
          </div>

          <div className="p-3 rounded-md border border-[#E4E4E7] bg-[#FAFAFA] text-right self-start md:self-center text-xs">
            <span className="text-[10px] uppercase font-medium text-[#71717A]">Escrow Compensation</span>
            <p className="text-lg font-semibold text-[#18181B] tabular-nums mt-0.5">
              ₹{collab.agreedAmount.toLocaleString('en-IN')}
            </p>
          </div>
        </div>

        {/* Deliverables Checklist */}
        <div className="mt-4">
          <h3 className="text-xs font-semibold text-[#71717A] uppercase tracking-wider mb-2">
            Deliverables
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {collab.deliverables.map((deliv) => {
              const isSelected = selectedDeliverable?.id === deliv.id;

              return (
                <div
                  key={deliv.id}
                  onClick={() => setSelectedDeliverable(deliv)}
                  className={`p-3 rounded-md border transition-colors cursor-pointer text-xs ${
                    isSelected
                      ? 'border-[#18181B] bg-white'
                      : 'border-[#E4E4E7] bg-[#FAFAFA] hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-[#18181B]">{deliv.title}</span>
                    <span className="text-[10px] text-[#71717A]">{deliv.status.replace('_', ' ')}</span>
                  </div>

                  {deliv.reviewFeedback && (
                    <p className="mt-1.5 text-[11px] text-[#6D4AFF]">
                      Feedback: {deliv.reviewFeedback}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Submission Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-12 text-xs">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-lg border border-[#E4E4E7] p-5 subtle-shadow">
            <h3 className="text-sm font-semibold text-[#18181B] pb-3 border-b border-[#E4E4E7]">
              Submit Content: {selectedDeliverable?.title}
            </h3>

            {submissionSuccess && (
              <div className="mt-3 p-2.5 rounded-md bg-[#EFF8F5] text-[#168365] font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Deliverable submitted. The brand has been notified for review.</span>
              </div>
            )}

            <form onSubmit={handleSubmitContent} className="space-y-3 mt-4">
              <div>
                <label className="block font-medium text-[#18181B]">
                  Media URL (Google Drive / Dropbox / Direct MP4)
                </label>
                <input
                  type="url"
                  required
                  value={fileUrl}
                  onChange={(e) => setFileUrl(e.target.value)}
                  className="mt-1 w-full rounded-md border border-[#E4E4E7] bg-[#FAFAFA] px-3 py-1.5 text-xs text-[#18181B] focus:border-[#18181B] focus:outline-none"
                  placeholder="https://drive.google.com/..."
                />
              </div>

              <div>
                <label className="block font-medium text-[#18181B]">
                  Notes for Reviewer
                </label>
                <textarea
                  rows={3}
                  required
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mt-1 w-full rounded-md border border-[#E4E4E7] bg-[#FAFAFA] p-2 text-xs text-[#18181B] focus:border-[#18181B] focus:outline-none"
                />
              </div>

              {selectedDeliverable?.fileUrl && (
                <div className="p-3 rounded-md bg-[#FAFAFA] border border-[#E4E4E7]">
                  <p className="font-medium text-[#18181B] mb-2">Current Video Preview</p>
                  <div className="aspect-video bg-black rounded overflow-hidden">
                    <video src={selectedDeliverable.fileUrl} controls className="w-full h-full object-contain" />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="px-4 py-2 bg-[#18181B] hover:bg-[#27272A] text-white rounded-md text-xs font-medium transition-colors cursor-pointer"
              >
                {selectedDeliverable?.status === 'submitted' ? 'Update Submission' : 'Submit for Review'}
              </button>
            </form>
          </div>
        </div>

        {/* Guidelines */}
        <div>
          <div className="bg-white rounded-lg border border-[#E4E4E7] p-5 subtle-shadow">
            <h3 className="font-semibold text-[#18181B] mb-3">Brief Guidelines</h3>

            {campaign && (
              <div className="space-y-3 text-[#52525B]">
                <div className="p-2.5 rounded bg-[#FAFAFA] border border-[#E4E4E7]">
                  <p className="font-medium text-[#18181B]">Key Focus</p>
                  <p className="mt-0.5 leading-relaxed">{campaign.brief.instructions}</p>
                </div>

                <div className="p-2.5 rounded bg-[#FAFAFA] border border-[#E4E4E7]">
                  <p className="font-medium text-[#168365]">Do&apos;s</p>
                  <ul className="mt-0.5 space-y-0.5 list-disc list-inside">
                    {campaign.brief.dos.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

export default function CreatorCollaborationDetailPage(props: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-8 text-xs text-[#71717A]">Loading workspace...</div>}>
      <CreatorCollaborationDetailContent params={props.params} />
    </Suspense>
  );
}
