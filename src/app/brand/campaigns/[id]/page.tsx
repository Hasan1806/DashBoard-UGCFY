'use client';

import React, { useState, use, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Calendar,
  Users,
  Wallet,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  ExternalLink,
  Play,
  FileText,
  AlertCircle,
  ShieldCheck,
  Star,
  Check,
  Eye,
} from 'lucide-react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { useUGCFY } from '@/lib/store';
import { CampaignApplication, CreatorProfile, Deliverable } from '@/types';

function CampaignDetailContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = use(params);
  const campaignId = unwrappedParams.id;
  const router = useRouter();

  const {
    currentBrand,
    campaigns,
    applications,
    allCreators,
    collaborations,
    updateApplicationStatus,
    reviewDeliverable,
    updateCampaignStatus,
  } = useUGCFY();

  const campaign = campaigns.find((c) => c.id === campaignId) || campaigns[0];
  const isOwner = campaign.brandId === currentBrand.id;

  const [activeTab, setActiveTab] = useState<'applicants' | 'deliverables' | 'brief'>('applicants');
  const [selectedCreatorForModal, setSelectedCreatorForModal] = useState<CreatorProfile | null>(null);
  const [reviewModalDeliverable, setReviewModalDeliverable] = useState<{
    collabId: string;
    deliv: Deliverable;
    creatorName: string;
  } | null>(null);
  const [revisionFeedback, setRevisionFeedback] = useState('');

  const campApplications = applications.filter((a) => a.campaignId === campaign.id);
  const campCollaborations = collaborations.filter((c) => c.campaignId === campaign.id);

  const handleOpenCreator = (creatorId: string) => {
    const creator = allCreators.find((c) => c.id === creatorId);
    if (creator) {
      setSelectedCreatorForModal(creator);
    }
  };

  return (
    <DashboardShell>
      {/* Back button */}
      <Link
        href="/brand/campaigns"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-[#71717A] hover:text-[#18181B] mb-5 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Campaigns</span>
      </Link>

      {/* Campaign Summary Card */}
      <div className="bg-white rounded-lg border border-[#E4E4E7] p-5 mb-6 subtle-shadow">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E4E4E7]">
          <div className="flex items-start gap-3.5 min-w-0">
            <img
              src={campaign.coverImage}
              alt={campaign.title}
              className="w-16 h-16 rounded-md object-cover border border-[#E4E4E7] shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-[#F4F4F5] text-[#52525B]">
                  {campaign.category}
                </span>
                <span
                  className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                    campaign.status === 'active'
                      ? 'bg-[#EFF8F5] text-[#168365] border border-[#168365]/20'
                      : 'bg-[#F4F4F5] text-[#71717A]'
                  }`}
                >
                  {campaign.status}
                </span>
              </div>
              <h1 className="text-base font-semibold text-[#18181B] mt-1 truncate">
                {campaign.title}
              </h1>
              <p className="text-xs text-[#71717A] mt-0.5 line-clamp-1">
                {campaign.description}
              </p>
            </div>
          </div>

          {isOwner && (
            <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
              {campaign.status === 'active' ? (
                <button
                  onClick={() => updateCampaignStatus(campaign.id, 'paused')}
                  className="px-3 py-1.5 rounded-md border border-[#E4E4E7] text-xs font-medium hover:bg-[#F4F4F5] transition-colors cursor-pointer"
                >
                  Pause
                </button>
              ) : campaign.status === 'paused' ? (
                <button
                  onClick={() => updateCampaignStatus(campaign.id, 'active')}
                  className="px-3 py-1.5 rounded-md bg-[#18181B] text-white text-xs font-medium hover:bg-[#27272A] transition-colors cursor-pointer"
                >
                  Resume
                </button>
              ) : null}

              <button
                onClick={() => updateCampaignStatus(campaign.id, 'completed')}
                className="px-3 py-1.5 rounded-md border border-[#E4E4E7] text-xs font-medium hover:bg-[#F4F4F5] transition-colors cursor-pointer"
              >
                Complete
              </button>
            </div>
          )}
        </div>

        {/* Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs">
          <div>
            <span className="text-[10px] text-[#71717A] uppercase">Total Budget</span>
            <p className="font-semibold text-[#18181B] tabular-nums mt-0.5">₹{campaign.budget.toLocaleString('en-IN')}</p>
          </div>
          <div>
            <span className="text-[10px] text-[#71717A] uppercase">Per Creator</span>
            <p className="font-semibold text-[#18181B] tabular-nums mt-0.5">₹{campaign.paymentPerCreator.toLocaleString('en-IN')}</p>
          </div>
          <div>
            <span className="text-[10px] text-[#71717A] uppercase">Creators</span>
            <p className="font-semibold text-[#18181B] tabular-nums mt-0.5">{campaign.acceptedCount} / {campaign.creatorsNeeded}</p>
          </div>
          <div>
            <span className="text-[10px] text-[#71717A] uppercase">Submission Deadline</span>
            <p className="font-semibold text-[#18181B] mt-0.5">{campaign.submissionDeadline}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-[#E4E4E7] pb-3 mb-5 overflow-x-auto text-xs">
        <button
          onClick={() => setActiveTab('applicants')}
          className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'applicants'
              ? 'bg-[#18181B] text-white'
              : 'text-[#71717A] hover:text-[#18181B] hover:bg-[#F4F4F5]'
          }`}
        >
          Creator Pitches ({campApplications.length})
        </button>

        <button
          onClick={() => setActiveTab('deliverables')}
          className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'deliverables'
              ? 'bg-[#18181B] text-white'
              : 'text-[#71717A] hover:text-[#18181B] hover:bg-[#F4F4F5]'
          }`}
        >
          Deliverables &amp; Content ({campCollaborations.length})
        </button>

        <button
          onClick={() => setActiveTab('brief')}
          className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'brief'
              ? 'bg-[#18181B] text-white'
              : 'text-[#71717A] hover:text-[#18181B] hover:bg-[#F4F4F5]'
          }`}
        >
          Brief Guidelines
        </button>
      </div>

      {/* TAB 1: APPLICANTS */}
      {activeTab === 'applicants' && (
        <div className="bg-white rounded-lg border border-[#E4E4E7] p-5 subtle-shadow">
          <div className="flex items-center justify-between pb-3 border-b border-[#E4E4E7]">
            <h3 className="text-sm font-semibold text-[#18181B]">Incoming Pitches</h3>
            <span className="text-xs text-[#71717A]">
              {campApplications.filter((a) => a.status === 'pending').length} pending review
            </span>
          </div>

          {campApplications.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#71717A]">
              No applications submitted yet.
            </div>
          ) : (
            <div className="divide-y divide-[#F4F4F5]">
              {campApplications.map((app) => (
                <div key={app.id} className="py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenCreator(app.creatorId)}
                        className="text-xs font-semibold text-[#18181B] hover:underline cursor-pointer"
                      >
                        {app.creatorName}
                      </button>
                      <span className="text-xs text-[#71717A]">{app.creatorHandle}</span>
                      <span
                        className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${
                          app.status === 'accepted'
                            ? 'border-[#168365]/20 bg-[#EFF8F5] text-[#168365]'
                            : app.status === 'shortlisted'
                            ? 'border-amber-200 bg-amber-50 text-amber-800'
                            : app.status === 'rejected'
                            ? 'border-red-200 bg-red-50 text-red-700'
                            : 'border-[#E4E4E7] bg-[#FAFAFA] text-[#71717A]'
                        }`}
                      >
                        {app.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-[#71717A] mt-1">
                      <span>Niche: {app.creatorNiche}</span>
                      <span>&bull;</span>
                      <span>{app.creatorFollowers} followers</span>
                      <span>&bull;</span>
                      <span>{app.creatorEngagement} ER</span>
                    </div>

                    <p className="text-xs text-[#52525B] mt-2 italic bg-[#FAFAFA] p-2.5 rounded-md border border-[#E4E4E7]">
                      &ldquo;{app.pitch}&rdquo;
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0 self-end lg:self-center">
                    <button
                      onClick={() => handleOpenCreator(app.creatorId)}
                      className="px-2.5 py-1 text-xs font-medium rounded border border-[#E4E4E7] hover:bg-[#F4F4F5] transition-colors cursor-pointer"
                    >
                      Media Kit
                    </button>

                    {isOwner && app.status !== 'accepted' && (
                      <>
                        {app.status !== 'shortlisted' && (
                          <button
                            onClick={() => updateApplicationStatus(app.id, 'shortlisted')}
                            className="px-2.5 py-1 text-xs font-medium rounded border border-[#E4E4E7] hover:bg-[#F4F4F5] transition-colors cursor-pointer"
                          >
                            Shortlist
                          </button>
                        )}

                        <button
                          onClick={() => updateApplicationStatus(app.id, 'accepted')}
                          className="px-3 py-1 text-xs font-medium rounded bg-[#18181B] hover:bg-[#27272A] text-white transition-colors cursor-pointer tabular-nums"
                        >
                          Accept (₹{app.proposedRate.toLocaleString('en-IN')})
                        </button>

                        <button
                          onClick={() => updateApplicationStatus(app.id, 'rejected')}
                          className="p-1 rounded text-[#71717A] hover:text-[#DC4C4C] transition-colors cursor-pointer"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </>
                    )}

                    {app.status === 'accepted' && (
                      <span className="text-xs font-medium text-[#168365] flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Accepted
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: DELIVERABLES */}
      {activeTab === 'deliverables' && (
        <div className="bg-white rounded-lg border border-[#E4E4E7] p-5 subtle-shadow">
          <h3 className="text-sm font-semibold text-[#18181B] pb-3 border-b border-[#E4E4E7]">
            Active Creator Deliverables
          </h3>

          {campCollaborations.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#71717A]">
              No active collaborations. Accept creator pitches above to begin content review.
            </div>
          ) : (
            <div className="space-y-4 mt-3">
              {campCollaborations.map((collab) => (
                <div key={collab.id} className="p-4 rounded-md border border-[#E4E4E7] bg-[#FAFAFA]">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E4E4E7]">
                    <div className="flex items-center gap-2.5">
                      <img src={collab.creatorAvatar} alt={collab.creatorName} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <p className="text-xs font-semibold text-[#18181B]">{collab.creatorName}</p>
                        <p className="text-[11px] text-[#71717A]">Agreed: ₹{collab.agreedAmount.toLocaleString('en-IN')}</p>
                      </div>
                    </div>

                    <span className="text-[10px] font-medium px-2 py-0.5 rounded border border-[#E4E4E7] bg-white text-[#71717A]">
                      {collab.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="mt-3 space-y-2">
                    {collab.deliverables.map((deliv) => (
                      <div key={deliv.id} className="p-3 rounded-md bg-white border border-[#E4E4E7] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                        <div>
                          <p className="font-medium text-[#18181B]">{deliv.title}</p>
                          {deliv.notes && <p className="text-[11px] text-[#71717A] mt-0.5 italic">&ldquo;{deliv.notes}&rdquo;</p>}
                        </div>

                        {deliv.fileUrl ? (
                          <button
                            onClick={() =>
                              setReviewModalDeliverable({
                                collabId: collab.id,
                                deliv,
                                creatorName: collab.creatorName,
                              })
                            }
                            className="px-2.5 py-1 rounded bg-[#18181B] text-white font-medium hover:bg-[#27272A] transition-colors cursor-pointer shrink-0"
                          >
                            Review Video
                          </button>
                        ) : (
                          <span className="text-[11px] text-[#71717A] italic shrink-0">Awaiting upload</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: BRIEF */}
      {activeTab === 'brief' && (
        <div className="bg-white rounded-lg border border-[#E4E4E7] p-5 subtle-shadow space-y-4 text-xs">
          <div>
            <h3 className="font-semibold text-[#18181B]">Creative Brief Guidelines</h3>
            <p className="mt-1.5 p-3 rounded-md bg-[#FAFAFA] border border-[#E4E4E7] text-[#52525B] leading-relaxed">
              {campaign.brief.instructions}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-md border border-[#E4E4E7] bg-[#FAFAFA]">
              <h4 className="font-medium text-[#168365] mb-1.5">Do&apos;s</h4>
              <ul className="space-y-1 list-disc list-inside text-[#52525B]">
                {campaign.brief.dos.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 rounded-md border border-[#E4E4E7] bg-[#FAFAFA]">
              <h4 className="font-medium text-[#DC4C4C] mb-1.5">Don&apos;ts</h4>
              <ul className="space-y-1 list-disc list-inside text-[#52525B]">
                {campaign.brief.donts.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* CREATOR PROFILE INSPECT MODAL */}
      {selectedCreatorForModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-[#E4E4E7] max-w-xl w-full p-6 subtle-shadow relative">
            <button
              onClick={() => setSelectedCreatorForModal(null)}
              className="absolute top-4 right-4 text-[#71717A] hover:text-[#18181B] text-lg font-medium p-1 cursor-pointer"
            >
              &times;
            </button>

            <div className="flex items-start gap-3">
              <img
                src={selectedCreatorForModal.avatarUrl}
                alt={selectedCreatorForModal.fullName}
                className="w-12 h-12 rounded-md object-cover border border-[#E4E4E7]"
              />
              <div>
                <h3 className="text-sm font-semibold text-[#18181B]">{selectedCreatorForModal.fullName}</h3>
                <p className="text-xs text-[#71717A]">{selectedCreatorForModal.handle} &middot; {selectedCreatorForModal.location}</p>
                <p className="text-xs text-[#52525B] mt-1">{selectedCreatorForModal.bio}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 my-4 p-3 rounded-md bg-[#FAFAFA] border border-[#E4E4E7] text-center text-xs">
              <div>
                <p className="text-[10px] text-[#71717A] uppercase">Followers</p>
                <p className="font-semibold text-[#18181B] mt-0.5">{selectedCreatorForModal.followerCount}</p>
              </div>
              <div>
                <p className="text-[10px] text-[#71717A] uppercase">Engagement</p>
                <p className="font-semibold text-[#18181B] mt-0.5">{selectedCreatorForModal.engagementRate}</p>
              </div>
              <div>
                <p className="text-[10px] text-[#71717A] uppercase">Reel Rate</p>
                <p className="font-semibold text-[#18181B] tabular-nums mt-0.5">₹{selectedCreatorForModal.rateCard.instagramReel.toLocaleString('en-IN')}</p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#E4E4E7] text-right">
              <button
                onClick={() => setSelectedCreatorForModal(null)}
                className="px-3.5 py-1.5 rounded-md bg-[#18181B] text-white text-xs font-medium cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELIVERABLE REVIEW MODAL */}
      {reviewModalDeliverable && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-[#E4E4E7] max-w-xl w-full p-6 subtle-shadow relative">
            <button
              onClick={() => setReviewModalDeliverable(null)}
              className="absolute top-4 right-4 text-[#71717A] hover:text-[#18181B] text-lg font-medium p-1 cursor-pointer"
            >
              &times;
            </button>

            <h3 className="text-sm font-semibold text-[#18181B]">
              Review UGC Content: {reviewModalDeliverable.deliv.title}
            </h3>
            <p className="text-xs text-[#71717A] mt-0.5">
              Creator: {reviewModalDeliverable.creatorName}
            </p>

            <div className="mt-3 rounded-md overflow-hidden bg-black aspect-video flex items-center justify-center">
              {reviewModalDeliverable.deliv.fileUrl?.endsWith('.mp4') ? (
                <video src={reviewModalDeliverable.deliv.fileUrl} controls className="w-full h-full object-contain" />
              ) : (
                <div className="text-center p-4">
                  <Play className="w-8 h-8 text-white mx-auto mb-1.5" />
                  <a
                    href={reviewModalDeliverable.deliv.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-white underline"
                  >
                    Open external media in new tab &rarr;
                  </a>
                </div>
              )}
            </div>

            <div className="mt-3 text-xs">
              <label className="block font-medium text-[#18181B]">Review Feedback</label>
              <textarea
                rows={2}
                placeholder="Add feedback or revision notes..."
                value={revisionFeedback}
                onChange={(e) => setRevisionFeedback(e.target.value)}
                className="mt-1 w-full rounded-md border border-[#E4E4E7] bg-[#FAFAFA] p-2 text-xs focus:border-[#18181B] focus:outline-none"
              />
            </div>

            <div className="mt-4 pt-3 border-t border-[#E4E4E7] flex items-center justify-end gap-2 text-xs">
              <button
                onClick={() => {
                  reviewDeliverable(
                    reviewModalDeliverable.collabId,
                    reviewModalDeliverable.deliv.id,
                    'changes_requested',
                    revisionFeedback
                  );
                  setReviewModalDeliverable(null);
                }}
                className="px-3 py-1.5 rounded-md border border-[#E4E4E7] text-[#DC4C4C] hover:bg-[#FEF2F2] font-medium cursor-pointer"
              >
                Request Revisions
              </button>

              <button
                onClick={() => {
                  reviewDeliverable(
                    reviewModalDeliverable.collabId,
                    reviewModalDeliverable.deliv.id,
                    'approved',
                    revisionFeedback || 'Approved.'
                  );
                  setReviewModalDeliverable(null);
                }}
                className="px-4 py-1.5 rounded-md bg-[#18181B] hover:bg-[#27272A] text-white font-medium cursor-pointer"
              >
                Approve &amp; Release Funds
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}

export default function CampaignDetailPage(props: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-8 text-xs text-[#71717A]">Loading campaign details...</div>}>
      <CampaignDetailContent params={props.params} />
    </Suspense>
  );
}
