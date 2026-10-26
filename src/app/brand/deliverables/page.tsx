'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Video,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileCheck,
  Play,
  Download,
  MessageSquare,
  ThumbsUp,
  RotateCcw,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  Filter,
  Sparkles,
  X,
  Check,
} from 'lucide-react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { useUGCFY } from '@/lib/store';
import { Collaboration, Deliverable } from '@/types';

export default function BrandDeliverablesPage() {
  const { collaborations, reviewDeliverable, brandWallet } = useUGCFY();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [revisionModal, setRevisionModal] = useState<{
    collabId: string;
    delivId: string;
    delivTitle: string;
  } | null>(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Flatten deliverables with their parent collaboration
  const allDeliverables = collaborations.flatMap((collab) =>
    collab.deliverables.map((deliv) => ({
      ...deliv,
      collab,
    }))
  );

  const pendingCount = allDeliverables.filter(
    (d) => d.status === 'submitted'
  ).length;
  const approvedCount = allDeliverables.filter((d) => d.status === 'approved').length;
  const revisionsCount = allDeliverables.filter((d) => d.status === 'changes_requested').length;

  const filtered = allDeliverables.filter((item) => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'needs_review')
      return item.status === 'submitted';
    if (filterStatus === 'approved') return item.status === 'approved';
    if (filterStatus === 'changes_requested') return item.status === 'changes_requested';
    if (filterStatus === 'pending') return item.status === 'pending';
    return true;
  });

  const handleApprove = (collabId: string, delivId: string, title: string) => {
    reviewDeliverable(collabId, delivId, 'approved');
    setToastMessage(`Approved "${title}"! Milestone escrow released to creator.`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleRequestRevision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revisionModal) return;
    reviewDeliverable(revisionModal.collabId, revisionModal.delivId, 'changes_requested', feedbackText);
    setToastMessage(`Revision notes sent to creator for "${revisionModal.delivTitle}".`);
    setRevisionModal(null);
    setFeedbackText('');
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#17171C] text-white px-4 py-3 rounded-xl shadow-2xl border border-white/10 flex items-center gap-2.5 text-xs animate-in fade-in slide-in-from-bottom-2">
            <CheckCircle2 className="w-4 h-4 text-[#D7F36B]" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E4E4E7]">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-semibold text-[#18181B] tracking-tight">
                Deliverables &amp; Content Review
              </h1>
              {pendingCount > 0 && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#F59E0B]/15 text-[#B45309]">
                  {pendingCount} Awaiting Review
                </span>
              )}
            </div>
            <p className="text-xs text-[#71717A] mt-1">
              Watch creator video submissions, approve 4K reel drafts, and release protected milestone escrows
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <div className="px-3 py-1.5 rounded-lg bg-[#FAFAFA] border border-[#E4E4E7] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#168365]" />
              <span className="text-[#52525B]">Escrow Balance:</span>
              <span className="font-bold text-[#18181B]">
                ₹{brandWallet.reservedBudget.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* Summary Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white p-3.5 rounded-xl border border-[#E4E4E7] shadow-xs">
            <div className="flex items-center justify-between text-xs text-[#71717A] mb-1">
              <span>Awaiting Review</span>
              <Clock className="w-3.5 h-3.5 text-[#F59E0B]" />
            </div>
            <span className="text-xl font-bold text-[#18181B]">{pendingCount}</span>
            <span className="block text-[10px] text-[#A1A1AA] mt-0.5">Needs brand action</span>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-[#E4E4E7] shadow-xs">
            <div className="flex items-center justify-between text-xs text-[#71717A] mb-1">
              <span>Approved &amp; Cleared</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-[#168365]" />
            </div>
            <span className="text-xl font-bold text-[#168365]">{approvedCount}</span>
            <span className="block text-[10px] text-[#A1A1AA] mt-0.5">Ready for ads spend</span>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-[#E4E4E7] shadow-xs">
            <div className="flex items-center justify-between text-xs text-[#71717A] mb-1">
              <span>Revisions Requested</span>
              <RotateCcw className="w-3.5 h-3.5 text-[#7456F1]" />
            </div>
            <span className="text-xl font-bold text-[#7456F1]">{revisionsCount}</span>
            <span className="block text-[10px] text-[#A1A1AA] mt-0.5">With creators</span>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-[#E4E4E7] shadow-xs">
            <div className="flex items-center justify-between text-xs text-[#71717A] mb-1">
              <span>Total Deliverables</span>
              <FileCheck className="w-3.5 h-3.5 text-[#52525B]" />
            </div>
            <span className="text-xl font-bold text-[#18181B]">{allDeliverables.length}</span>
            <span className="block text-[10px] text-[#A1A1AA] mt-0.5">Across active campaigns</span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 border-b border-[#E4E4E7] pb-2 text-xs overflow-x-auto">
          {[
            { id: 'all', label: 'All Content', count: allDeliverables.length },
            { id: 'needs_review', label: 'Needs Review', count: pendingCount },
            { id: 'approved', label: 'Approved', count: approvedCount },
            { id: 'changes_requested', label: 'In Revision', count: revisionsCount },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                filterStatus === tab.id
                  ? 'bg-[#18181B] text-white'
                  : 'text-[#71717A] hover:text-[#18181B] hover:bg-[#F4F4F5]'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  filterStatus === tab.id
                    ? 'bg-white/20 text-white'
                    : 'bg-[#F4F4F5] text-[#71717A]'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Deliverables List */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-xl border border-[#E4E4E7] p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#F4F4F5] text-[#71717A] flex items-center justify-center mx-auto">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-sm text-[#18181B]">No deliverables in this queue</h3>
            <p className="text-xs text-[#71717A] max-w-sm mx-auto">
              When creators submit draft video reels and assets for your campaigns, they will appear here for review.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((item) => {
              const isNeedsReview = item.status === 'submitted';
              const isApproved = item.status === 'approved';
              const isRevision = item.status === 'changes_requested';

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-[#E4E4E7] p-5 shadow-xs hover:border-[#D4D4D8] transition-all space-y-4"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    {/* Media Thumbnail & Details */}
                    <div className="flex items-start gap-4 min-w-0">
                      <div className="relative w-28 h-20 rounded-lg overflow-hidden bg-zinc-900 border border-[#E4E4E7] shrink-0 group">
                        <img
                          src={
                            item.collab.campaignCover ||
                            'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400'
                          }
                          alt={item.title}
                          className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                          <Play className="w-6 h-6 text-white fill-white drop-shadow" />
                        </div>
                      </div>

                      <div className="min-w-0 space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                              isApproved
                                ? 'bg-[#168365]/15 text-[#168365]'
                                : isNeedsReview
                                ? 'bg-[#F59E0B]/15 text-[#B45309]'
                                : isRevision
                                ? 'bg-[#7456F1]/15 text-[#7456F1]'
                                : 'bg-[#F4F4F5] text-[#71717A]'
                            }`}
                          >
                            {isNeedsReview
                              ? 'Needs Review'
                              : isApproved
                              ? 'Approved & Released'
                              : isRevision
                              ? 'Revision Requested'
                              : 'Pending Shoot'}
                          </span>

                          <span className="text-[11px] font-medium text-[#71717A]">
                            Format: <strong className="text-[#18181B]">{item.format}</strong>
                          </span>
                        </div>

                        <h3 className="font-semibold text-sm text-[#18181B] truncate">
                          {item.title}
                        </h3>

                        <div className="flex items-center gap-2 text-xs text-[#71717A]">
                          <span>Campaign: <strong>{item.collab.campaignTitle}</strong></span>
                          <span>&bull;</span>
                          <span>Creator: <strong className="text-[#18181B]">{item.collab.creatorName}</strong></span>
                        </div>

                        {item.reviewFeedback && (
                          <div className="p-2.5 rounded-lg bg-[#F9F9FB] border border-[#E4E4E7] text-xs text-[#52525B] mt-2">
                            <span className="font-semibold text-[#18181B] block text-[11px]">
                              Latest Feedback:
                            </span>
                            {item.reviewFeedback}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 shrink-0 self-end md:self-start">
                      {isNeedsReview && (
                        <>
                          <button
                            onClick={() =>
                              setRevisionModal({
                                collabId: item.collab.id,
                                delivId: item.id,
                                delivTitle: item.title,
                              })
                            }
                            className="px-3 py-1.5 rounded-lg border border-[#E4E4E7] bg-white text-xs font-medium text-[#52525B] hover:bg-[#F4F4F5] transition-colors flex items-center gap-1.5 cursor-pointer"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>Request Revision</span>
                          </button>

                          <button
                            onClick={() => handleApprove(item.collab.id, item.id, item.title)}
                            className="px-3.5 py-1.5 rounded-lg bg-[#168365] text-white text-xs font-semibold hover:bg-[#147459] transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Approve &amp; Release Escrow</span>
                          </button>
                        </>
                      )}

                      {isApproved && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-[#168365] flex items-center gap-1">
                            <Check className="w-4 h-4" />
                            Escrow Released
                          </span>
                          <button
                            onClick={() => alert('Downloading 4K Master Video Deliverable (.MP4)...')}
                            className="px-2.5 py-1.5 rounded-lg border border-[#E4E4E7] text-xs font-medium text-[#18181B] hover:bg-[#F4F4F5] flex items-center gap-1 cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Raw 4K</span>
                          </button>
                        </div>
                      )}

                      {item.status === 'pending' && (
                        <span className="text-xs text-[#A1A1AA] italic">Creator in production</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Revision Feedback Modal */}
        {revisionModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-white rounded-xl border border-[#E4E4E7] shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-[#E4E4E7] mb-4">
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-[#7456F1]" />
                  <h3 className="font-semibold text-sm text-[#18181B]">
                    Request Revision
                  </h3>
                </div>
                <button
                  onClick={() => setRevisionModal(null)}
                  className="text-zinc-400 hover:text-zinc-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleRequestRevision} className="space-y-4">
                <div>
                  <p className="text-xs text-[#71717A] mb-2">
                    Item: <strong className="text-[#18181B]">{revisionModal.delivTitle}</strong>
                  </p>
                  <label className="block text-xs font-semibold text-[#18181B] mb-1">
                    Specific Timestamps &amp; Changes Needed
                  </label>
                  <textarea
                    rows={4}
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="e.g., At 0:03 please cut faster between the product intro and unboxing. Also ensure the brand tag is placed higher to avoid TikTok UI overlay."
                    className="w-full text-xs p-3 rounded-lg border border-[#E4E4E7] bg-[#F9F9FB] text-[#18181B] focus:outline-hidden focus:bg-white leading-relaxed"
                    required
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setRevisionModal(null)}
                    className="px-3.5 py-2 rounded-lg text-xs font-medium text-[#71717A] hover:bg-[#F4F4F5] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-[#18181B] text-white text-xs font-semibold hover:bg-[#27272A] transition-colors shadow-xs"
                  >
                    Send Revisions to Creator
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
