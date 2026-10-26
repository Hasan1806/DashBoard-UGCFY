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
  Send,
} from 'lucide-react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { useUGCFY } from '@/lib/store';

function CreatorCampaignDetailContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = use(params);
  const campaignId = unwrappedParams.id;
  const router = useRouter();

  const { currentCreator, campaigns, applications, applyToCampaign } = useUGCFY();
  const campaign = campaigns.find((c) => c.id === campaignId) || campaigns[0];

  const alreadyApplied = applications.some(
    (a) => a.campaignId === campaign.id && a.creatorId === currentCreator.id
  );

  const [pitch, setPitch] = useState(
    `Hi ${campaign.brandName}! My audience is passionate about ${campaign.category}. I will deliver high retention hooks with authentic product demonstrations.`
  );
  const [portfolioLink, setPortfolioLink] = useState('https://instagram.com/reel/sample-ugc-test');
  const [proposedRate, setProposedRate] = useState<number>(campaign.paymentPerCreator);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    const res = applyToCampaign({
      campaignId: campaign.id,
      pitch,
      portfolioLinks: [portfolioLink],
      proposedRate,
    });
    if (res.success) {
      setStatusMessage('Application submitted successfully!');
      setTimeout(() => router.push('/creator/campaigns'), 1200);
    } else {
      setStatusMessage(res.message);
    }
  };

  return (
    <DashboardShell>
      <Link
        href="/creator/campaigns"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-[#71717A] hover:text-[#18181B] mb-5 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Campaigns</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-12">
        {/* Brief */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-lg border border-[#E4E4E7] p-5 subtle-shadow">
            <div className="flex items-center gap-2.5 mb-3">
              <img
                src={campaign.brandLogo}
                alt={campaign.brandName}
                className="w-8 h-8 rounded object-cover border border-[#E4E4E7]"
              />
              <div>
                <span className="text-xs font-medium text-[#18181B]">{campaign.brandName}</span>
                <span className="ml-2 text-[10px] font-medium px-1.5 py-0.2 rounded bg-[#F4F4F5] text-[#52525B]">
                  {campaign.category}
                </span>
              </div>
            </div>

            <h1 className="text-lg font-semibold text-[#18181B]">{campaign.title}</h1>
            <p className="text-xs text-[#52525B] mt-2 leading-relaxed">
              {campaign.description}
            </p>

            {/* Deliverables */}
            <div className="mt-5 pt-4 border-t border-[#E4E4E7]">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#71717A] mb-2">
                Deliverables Required
              </h3>
              <ul className="text-xs text-[#18181B] space-y-1 list-disc list-inside">
                {campaign.requirements.deliverables.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div className="mt-5 pt-4 border-t border-[#E4E4E7]">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#71717A] mb-2">
                Creative Instructions
              </h3>
              <p className="text-xs text-[#52525B] leading-relaxed p-3 rounded-md bg-[#FAFAFA] border border-[#E4E4E7]">
                {campaign.brief.instructions}
              </p>
            </div>

            {/* Dos and Donts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 text-xs">
              <div className="p-3 rounded-md border border-[#E4E4E7] bg-[#FAFAFA]">
                <h4 className="font-medium text-[#168365] mb-1">Do&apos;s</h4>
                <ul className="space-y-0.5 list-disc list-inside text-[#52525B]">
                  {campaign.brief.dos.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-md border border-[#E4E4E7] bg-[#FAFAFA]">
                <h4 className="font-medium text-[#DC4C4C] mb-1">Don&apos;ts</h4>
                <ul className="space-y-0.5 list-disc list-inside text-[#52525B]">
                  {campaign.brief.donts.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Terms & Form */}
        <div>
          <div className="bg-white rounded-lg border border-[#E4E4E7] p-5 subtle-shadow sticky top-20 text-xs">
            <h3 className="font-semibold text-[#18181B]">Campaign Payout &amp; Terms</h3>

            <div className="my-3.5 p-3 rounded-md border border-[#E4E4E7] bg-[#FAFAFA]">
              <span className="text-[10px] uppercase font-medium text-[#71717A]">Budget Per Creator</span>
              <p className="text-xl font-semibold text-[#18181B] mt-0.5 tabular-nums">
                ₹{campaign.paymentPerCreator.toLocaleString('en-IN')}
              </p>
            </div>

            <div className="space-y-2 text-[#71717A] mb-4">
              <div className="flex justify-between py-1 border-b border-[#F4F4F5]">
                <span>Deadline</span>
                <span className="font-medium text-[#18181B]">{campaign.deadline}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F4F4F5]">
                <span>Submission</span>
                <span className="font-medium text-[#18181B]">{campaign.submissionDeadline}</span>
              </div>
            </div>

            {statusMessage && (
              <div className="mb-3 p-2 rounded-md bg-[#EFF8F5] text-[#168365] text-xs font-medium">
                {statusMessage}
              </div>
            )}

            {alreadyApplied ? (
              <div className="p-3 rounded-md border border-[#168365]/20 bg-[#EFF8F5] text-[#168365] text-center font-medium">
                Application Submitted &amp; In Review
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-3">
                <div>
                  <label className="block font-medium text-[#18181B]">Pitch</label>
                  <textarea
                    rows={3}
                    required
                    value={pitch}
                    onChange={(e) => setPitch(e.target.value)}
                    className="mt-1 w-full rounded-md border border-[#E4E4E7] bg-[#FAFAFA] p-2 text-xs focus:border-[#18181B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#18181B]">Portfolio Link</label>
                  <input
                    type="url"
                    required
                    value={portfolioLink}
                    onChange={(e) => setPortfolioLink(e.target.value)}
                    className="mt-1 w-full rounded-md border border-[#E4E4E7] bg-[#FAFAFA] px-2.5 py-1.5 text-xs focus:border-[#18181B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#18181B]">Proposed Rate (₹)</label>
                  <input
                    type="number"
                    step="500"
                    required
                    value={proposedRate}
                    onChange={(e) => setProposedRate(Number(e.target.value))}
                    className="mt-1 w-full rounded-md border border-[#E4E4E7] bg-[#FAFAFA] px-2.5 py-1.5 text-xs font-medium focus:border-[#18181B] focus:outline-none tabular-nums"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 rounded-md bg-[#18181B] hover:bg-[#27272A] text-white text-xs font-medium transition-colors cursor-pointer"
                >
                  Submit Pitch
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

export default function CreatorCampaignDetailPage(props: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-8 text-xs text-[#71717A]">Loading brief...</div>}>
      <CreatorCampaignDetailContent params={props.params} />
    </Suspense>
  );
}
