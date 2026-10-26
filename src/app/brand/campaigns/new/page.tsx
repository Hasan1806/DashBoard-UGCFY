'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Megaphone,
  Users,
  Wallet,
  FileText,
  ShieldCheck,
  Plus,
  Trash2,
} from 'lucide-react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { useUGCFY } from '@/lib/store';

const STEPS = [
  { id: 1, title: 'Details' },
  { id: 2, title: 'Requirements' },
  { id: 3, title: 'Budget & Timeline' },
  { id: 4, title: 'Creative Brief' },
  { id: 5, title: 'Review & Launch' },
];

export default function CreateCampaignPage() {
  const router = useRouter();
  const { createCampaign, brandWallet } = useUGCFY();
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [title, setTitle] = useState('Brightening Vitamin C 10-Day Routine UGC');
  const [category, setCategory] = useState('Clean Beauty & Skincare');
  const [description, setDescription] = useState(
    'We are looking for passionate skincare creators to test our Vitamin C 15% serum for 10 consecutive days. Capture raw daylight texture swatches and honest reviews.'
  );
  const [objective, setObjective] = useState<
    'Brand Awareness' | 'Conversion & Sales' | 'Product Launch' | 'App Installs' | 'Community Growth'
  >('Conversion & Sales');
  const [coverImage, setCoverImage] = useState(
    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80'
  );

  // Requirements
  const [selectedNiches, setSelectedNiches] = useState<string[]>(['Skincare', 'Beauty']);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['Instagram']);
  const [location, setLocation] = useState('Pan India (Metro & Tier 1)');
  const [minFollowers, setMinFollowers] = useState<number>(10000);
  const [deliverables, setDeliverables] = useState<string[]>([
    '1x 60s Instagram Reel (Raw daylight application)',
    '2x Stories with swipe-up/link sticker',
  ]);
  const [newDeliverableInput, setNewDeliverableInput] = useState('');

  // Budget & Timeline
  const [creatorsNeeded, setCreatorsNeeded] = useState<number>(5);
  const [paymentPerCreator, setPaymentPerCreator] = useState<number>(18000);
  const [deadline, setDeadline] = useState('2026-11-20');
  const [submissionDeadline, setSubmissionDeadline] = useState('2026-12-05');

  const calculatedTotalBudget = creatorsNeeded * paymentPerCreator;

  // Brief
  const [instructions, setInstructions] = useState(
    'Hook the viewer in the first 3 seconds with a relatable morning dilemma: "Why is your dull skin still not glowing despite multiple creams?" Show product close-up, consistency, and absorption.'
  );
  const [dos, setDos] = useState<string[]>([
    'Film in bright natural morning daylight',
    'Show real skin texture without makeup or filters',
    'State clearly that the serum is 100% vegan & fragrance-free',
  ]);
  const [donts, setDonts] = useState<string[]>([
    'No studio beauty softening filters',
    'Do not use any competing brand cosmetics',
  ]);
  const [newDo, setNewDo] = useState('');
  const [newDont, setNewDont] = useState('');

  const handleAddDeliverable = () => {
    if (!newDeliverableInput.trim()) return;
    setDeliverables([...deliverables, newDeliverableInput.trim()]);
    setNewDeliverableInput('');
  };

  const handleRemoveDeliverable = (idx: number) => {
    setDeliverables(deliverables.filter((_, i) => i !== idx));
  };

  const handleAddDo = () => {
    if (!newDo.trim()) return;
    setDos([...dos, newDo.trim()]);
    setNewDo('');
  };

  const handleAddDont = () => {
    if (!newDont.trim()) return;
    setDonts([...donts, newDont.trim()]);
    setNewDont('');
  };

  const handlePublish = (status: 'active' | 'draft') => {
    const newCamp = createCampaign({
      title,
      category,
      description,
      objective,
      coverImage,
      status,
      budget: calculatedTotalBudget,
      paymentPerCreator,
      creatorsNeeded,
      deadline,
      submissionDeadline,
      requirements: {
        niches: selectedNiches,
        platforms: selectedPlatforms,
        location,
        minFollowers,
        deliverables,
      },
      brief: {
        instructions,
        dos,
        donts,
        references: [],
      },
    });

    router.push(`/brand/campaigns/${newCamp.id}`);
  };

  return (
    <DashboardShell>
      <div className="max-w-3xl mx-auto pb-12">
        {/* Back Link */}
        <Link
          href="/brand/campaigns"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#71717A] hover:text-[#18181B] mb-5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Campaigns</span>
        </Link>

        {/* Wizard Header */}
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-semibold text-[#18181B] tracking-tight">
            Create Campaign
          </h1>
          <p className="text-xs text-[#71717A] mt-0.5">
            Configure your creative brief, creator criteria, and escrow budget
          </p>
        </div>

        {/* Linear-style Step Progress Header */}
        <div className="bg-white rounded-lg border border-[#E4E4E7] p-2 mb-6 subtle-shadow">
          <div className="grid grid-cols-5 gap-1 text-center text-xs">
            {STEPS.map((step) => {
              const isCompleted = currentStep > step.id;
              const isCurrent = currentStep === step.id;

              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={`py-2 px-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    isCurrent
                      ? 'bg-[#18181B] text-white'
                      : isCompleted
                      ? 'text-[#18181B] hover:bg-[#F4F4F5]'
                      : 'text-[#A1A1AA] hover:bg-[#F4F4F5]'
                  }`}
                >
                  <span className="block text-[10px] uppercase text-opacity-80">
                    {step.id}
                  </span>
                  <span className="truncate block mt-0.5">{step.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step Container */}
        <div className="bg-white rounded-lg border border-[#E4E4E7] p-6 subtle-shadow">
          {/* STEP 1: DETAILS */}
          {currentStep === 1 && (
            <div className="space-y-4 text-xs">
              <h2 className="text-sm font-semibold text-[#18181B] border-b border-[#E4E4E7] pb-2">
                1. Campaign Details
              </h2>

              <div>
                <label className="block font-medium text-[#18181B]">Campaign Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 w-full rounded-md border border-[#E4E4E7] bg-[#FAFAFA] px-3 py-2 text-xs text-[#18181B] focus:border-[#18181B] focus:bg-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-[#18181B]">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1 w-full rounded-md border border-[#E4E4E7] bg-[#FAFAFA] px-3 py-2 text-xs text-[#18181B] focus:border-[#18181B] focus:outline-none"
                  >
                    <option value="Clean Beauty & Skincare">Clean Beauty &amp; Skincare</option>
                    <option value="Science-Backed Skincare">Science-Backed Skincare</option>
                    <option value="Consumer Audio & Tech">Consumer Audio &amp; Tech</option>
                    <option value="Specialty Coffee & Food">Specialty Coffee &amp; Food</option>
                    <option value="Fitness & Health Tech">Fitness &amp; Health Tech</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-[#18181B]">Objective</label>
                  <select
                    value={objective}
                    onChange={(e) => setObjective(e.target.value as any)}
                    className="mt-1 w-full rounded-md border border-[#E4E4E7] bg-[#FAFAFA] px-3 py-2 text-xs text-[#18181B] focus:border-[#18181B] focus:outline-none"
                  >
                    <option value="Conversion & Sales">Conversion &amp; Sales</option>
                    <option value="Brand Awareness">Brand Awareness</option>
                    <option value="Product Launch">Product Launch</option>
                    <option value="App Installs">App Installs</option>
                    <option value="Community Growth">Community Growth</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-[#18181B]">Product Overview</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 w-full rounded-md border border-[#E4E4E7] bg-[#FAFAFA] p-2.5 text-xs text-[#18181B] focus:border-[#18181B] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-[#18181B]">Cover Image URL</label>
                <div className="mt-1 flex items-center gap-3">
                  <img
                    src={coverImage}
                    alt="Preview"
                    className="w-12 h-12 rounded-md object-cover border border-[#E4E4E7]"
                  />
                  <input
                    type="url"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    className="flex-1 rounded-md border border-[#E4E4E7] bg-[#FAFAFA] px-3 py-2 text-xs text-[#18181B] focus:border-[#18181B] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: REQUIREMENTS */}
          {currentStep === 2 && (
            <div className="space-y-4 text-xs">
              <h2 className="text-sm font-semibold text-[#18181B] border-b border-[#E4E4E7] pb-2">
                2. Creator Requirements
              </h2>

              <div>
                <label className="block font-medium text-[#18181B] mb-1.5">Target Niches</label>
                <div className="flex flex-wrap gap-1.5">
                  {['Skincare', 'Beauty', 'Fitness', 'Food', 'Technology', 'Lifestyle', 'Fashion'].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() =>
                        setSelectedNiches((prev) =>
                          prev.includes(n) ? prev.filter((item) => item !== n) : [...prev, n]
                        )
                      }
                      className={`px-2.5 py-1 rounded text-xs font-medium border transition-colors cursor-pointer ${
                        selectedNiches.includes(n)
                          ? 'bg-[#18181B] text-white border-[#18181B]'
                          : 'bg-[#FAFAFA] text-[#71717A] border-[#E4E4E7] hover:bg-[#F4F4F5]'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-medium text-[#18181B] mb-1.5">Platforms</label>
                <div className="flex gap-2">
                  {['Instagram', 'YouTube', 'TikTok'].map((plat) => (
                    <button
                      key={plat}
                      type="button"
                      onClick={() =>
                        setSelectedPlatforms((prev) =>
                          prev.includes(plat) ? prev.filter((p) => p !== plat) : [...prev, plat]
                        )
                      }
                      className={`px-3 py-1.5 rounded text-xs font-medium border transition-colors cursor-pointer ${
                        selectedPlatforms.includes(plat)
                          ? 'bg-[#18181B] text-white border-[#18181B]'
                          : 'bg-[#FAFAFA] text-[#71717A] border-[#E4E4E7] hover:bg-[#F4F4F5]'
                      }`}
                    >
                      {plat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-[#18181B]">Target Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="mt-1 w-full rounded-md border border-[#E4E4E7] bg-[#FAFAFA] px-3 py-2 text-xs text-[#18181B] focus:border-[#18181B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#18181B]">Minimum Follower Count</label>
                  <input
                    type="number"
                    value={minFollowers}
                    onChange={(e) => setMinFollowers(Number(e.target.value))}
                    className="mt-1 w-full rounded-md border border-[#E4E4E7] bg-[#FAFAFA] px-3 py-2 text-xs text-[#18181B] focus:border-[#18181B] focus:outline-none"
                  />
                </div>
              </div>

              {/* Deliverables */}
              <div>
                <label className="block font-medium text-[#18181B] mb-1.5">Deliverables Checklist</label>
                <div className="space-y-1.5 mb-2">
                  {deliverables.map((deliv, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-md bg-[#FAFAFA] border border-[#E4E4E7] text-xs font-medium text-[#18181B]"
                    >
                      <span>{deliv}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveDeliverable(idx)}
                        className="text-[#71717A] hover:text-[#DC4C4C] p-0.5 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. 1x 60s Reel with product close-up"
                    value={newDeliverableInput}
                    onChange={(e) => setNewDeliverableInput(e.target.value)}
                    className="flex-1 rounded-md border border-[#E4E4E7] bg-[#FAFAFA] px-3 py-1.5 text-xs text-[#18181B] focus:border-[#18181B] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddDeliverable}
                    className="px-3 py-1.5 bg-[#18181B] text-white rounded-md text-xs font-medium hover:bg-[#27272A] cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: BUDGET */}
          {currentStep === 3 && (
            <div className="space-y-4 text-xs">
              <h2 className="text-sm font-semibold text-[#18181B] border-b border-[#E4E4E7] pb-2">
                3. Budget &amp; Timeline
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-[#18181B]">Creators Needed</label>
                  <input
                    type="number"
                    min="1"
                    value={creatorsNeeded}
                    onChange={(e) => setCreatorsNeeded(Number(e.target.value))}
                    className="mt-1 w-full rounded-md border border-[#E4E4E7] bg-[#FAFAFA] px-3 py-2 text-xs text-[#18181B] focus:border-[#18181B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#18181B]">Payment Per Creator (₹ INR)</label>
                  <input
                    type="number"
                    step="500"
                    value={paymentPerCreator}
                    onChange={(e) => setPaymentPerCreator(Number(e.target.value))}
                    className="mt-1 w-full rounded-md border border-[#E4E4E7] bg-[#FAFAFA] px-3 py-2 text-xs text-[#18181B] focus:border-[#18181B] focus:outline-none tabular-nums"
                  />
                </div>
              </div>

              {/* Total Calculation Strip */}
              <div className="p-3.5 rounded-md bg-[#FAFAFA] border border-[#E4E4E7] flex items-center justify-between text-xs">
                <div>
                  <p className="text-[11px] text-[#71717A] uppercase">Total Escrow Commitment</p>
                  <p className="text-xl font-semibold text-[#18181B] mt-0.5 tabular-nums">
                    ₹{calculatedTotalBudget.toLocaleString('en-IN')}
                  </p>
                  <p className="text-[11px] text-[#71717A]">
                    {creatorsNeeded} creators &times; ₹{paymentPerCreator.toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] text-[#71717A]">Available Wallet</p>
                  <p className="text-sm font-medium text-[#18181B] tabular-nums">
                    ₹{brandWallet.availableBalance.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-[#18181B]">Application Deadline</label>
                  <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="mt-1 w-full rounded-md border border-[#E4E4E7] bg-[#FAFAFA] px-3 py-2 text-xs text-[#18181B] focus:border-[#18181B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#18181B]">Content Submission Deadline</label>
                  <input
                    type="date"
                    value={submissionDeadline}
                    onChange={(e) => setSubmissionDeadline(e.target.value)}
                    className="mt-1 w-full rounded-md border border-[#E4E4E7] bg-[#FAFAFA] px-3 py-2 text-xs text-[#18181B] focus:border-[#18181B] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: BRIEF */}
          {currentStep === 4 && (
            <div className="space-y-4 text-xs">
              <h2 className="text-sm font-semibold text-[#18181B] border-b border-[#E4E4E7] pb-2">
                4. Creative Brief &amp; Guidelines
              </h2>

              <div>
                <label className="block font-medium text-[#18181B]">Opening Hook &amp; Content Instructions</label>
                <textarea
                  rows={3}
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  className="mt-1 w-full rounded-md border border-[#E4E4E7] bg-[#FAFAFA] p-2.5 text-xs text-[#18181B] focus:border-[#18181B] focus:outline-none"
                />
              </div>

              {/* Do's and Don'ts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-[#168365] mb-1.5">Do&apos;s</label>
                  <div className="space-y-1 mb-2">
                    {dos.map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded bg-[#FAFAFA] border border-[#E4E4E7] text-xs">
                        <span>&bull; {item}</span>
                        <button type="button" onClick={() => setDos(dos.filter((_, idx) => idx !== i))} className="text-[#A1A1AA] hover:text-[#DC4C4C]">
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      placeholder="Add rule..."
                      value={newDo}
                      onChange={(e) => setNewDo(e.target.value)}
                      className="flex-1 rounded border border-[#E4E4E7] bg-[#FAFAFA] px-2.5 py-1 text-xs text-[#18181B] focus:outline-none"
                    />
                    <button type="button" onClick={handleAddDo} className="px-2.5 py-1 bg-[#18181B] text-white rounded text-xs font-medium cursor-pointer">
                      Add
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-[#DC4C4C] mb-1.5">Don&apos;ts</label>
                  <div className="space-y-1 mb-2">
                    {donts.map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded bg-[#FAFAFA] border border-[#E4E4E7] text-xs">
                        <span>&times; {item}</span>
                        <button type="button" onClick={() => setDonts(donts.filter((_, idx) => idx !== i))} className="text-[#A1A1AA] hover:text-[#DC4C4C]">
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      placeholder="Add rule..."
                      value={newDont}
                      onChange={(e) => setNewDont(e.target.value)}
                      className="flex-1 rounded border border-[#E4E4E7] bg-[#FAFAFA] px-2.5 py-1 text-xs text-[#18181B] focus:outline-none"
                    />
                    <button type="button" onClick={handleAddDont} className="px-2.5 py-1 bg-[#18181B] text-white rounded text-xs font-medium cursor-pointer">
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: REVIEW */}
          {currentStep === 5 && (
            <div className="space-y-4 text-xs">
              <h2 className="text-sm font-semibold text-[#18181B] border-b border-[#E4E4E7] pb-2">
                5. Review &amp; Launch
              </h2>

              <div className="p-4 rounded-md border border-[#E4E4E7] bg-[#FAFAFA] space-y-3">
                <div className="flex items-start gap-3">
                  <img
                    src={coverImage}
                    alt={title}
                    className="w-16 h-16 rounded object-cover border border-[#E4E4E7] shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-medium text-[#71717A] uppercase">{category} &middot; {objective}</span>
                    <h3 className="text-sm font-semibold text-[#18181B] mt-0.5">{title}</h3>
                    <p className="text-xs text-[#71717A] mt-0.5 line-clamp-2">{description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-[#E4E4E7] text-xs">
                  <div>
                    <p className="text-[10px] text-[#71717A] uppercase">Total Budget</p>
                    <p className="font-semibold text-[#18181B] tabular-nums mt-0.5">₹{calculatedTotalBudget.toLocaleString('en-IN')}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#71717A] uppercase">Per Creator</p>
                    <p className="font-semibold text-[#18181B] tabular-nums mt-0.5">₹{paymentPerCreator.toLocaleString('en-IN')}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#71717A] uppercase">Creators</p>
                    <p className="font-semibold text-[#18181B] tabular-nums mt-0.5">{creatorsNeeded}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#71717A] uppercase">Deadline</p>
                    <p className="font-semibold text-[#18181B] mt-0.5">{deadline}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Wizard Footer Navigation */}
          <div className="flex items-center justify-between pt-6 border-t border-[#E4E4E7] mt-6">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-3.5 py-1.5 rounded-md border border-[#E4E4E7] text-xs font-medium text-[#18181B] hover:bg-[#F4F4F5] transition-colors cursor-pointer"
              >
                Previous
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2">
              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="px-4 py-1.5 bg-[#18181B] hover:bg-[#27272A] text-white rounded-md text-xs font-medium transition-colors cursor-pointer"
                >
                  Next Step
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => handlePublish('draft')}
                    className="px-3 py-1.5 rounded-md border border-[#E4E4E7] text-xs font-medium text-[#18181B] hover:bg-[#F4F4F5] transition-colors cursor-pointer"
                  >
                    Save as Draft
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePublish('active')}
                    className="px-4 py-1.5 bg-[#18181B] hover:bg-[#27272A] text-white rounded-md text-xs font-medium transition-colors cursor-pointer"
                  >
                    Publish Campaign
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
