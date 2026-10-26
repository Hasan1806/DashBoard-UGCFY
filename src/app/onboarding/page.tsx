'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowRight, Building, User, CheckCircle2 } from 'lucide-react';
import { useUGCFY } from '@/lib/store';

function OnboardingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { role, setRole, updateBrandProfile, updateCreatorProfile } = useUGCFY();
  const initialRole = (searchParams.get('role') as 'brand' | 'creator') || role || 'brand';

  const [currentStepRole, setCurrentStepRole] = useState<'brand' | 'creator'>(initialRole);

  // Brand fields
  const [companyName, setCompanyName] = useState('My Brand D2C');
  const [industry, setIndustry] = useState('Clean Beauty & Skincare');
  const [website, setWebsite] = useState('https://mybrand.in');
  const [logoUrl, setLogoUrl] = useState('https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=150&auto=format&fit=crop&q=80');
  const [location, setLocation] = useState('Mumbai, Maharashtra');
  const [description, setDescription] = useState('Direct-to-consumer lifestyle brand building authentic UGC community.');

  // Creator fields
  const [creatorName, setCreatorName] = useState('Kavya Patel');
  const [handle, setHandle] = useState('@kavyastyle');
  const [niche, setNiche] = useState('Beauty, Skincare, Lifestyle');
  const [creatorLocation, setCreatorLocation] = useState('Bengaluru, Karnataka');
  const [instagram, setInstagram] = useState('https://instagram.com/kavyastyle');
  const [avatarUrl, setAvatarUrl] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80');
  const [bio, setBio] = useState('UGC enthusiast testing indie skincare products for humid weather.');

  const handleBrandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBrandProfile({
      companyName,
      industry,
      website,
      logoUrl,
      location,
      description,
    });
    setRole('brand');
    router.push('/brand/dashboard');
  };

  const handleCreatorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCreatorProfile({
      fullName: creatorName,
      handle,
      niche: niche.split(',').map((s) => s.trim()),
      location: creatorLocation,
      avatarUrl,
      bio,
    });
    setRole('creator');
    router.push('/creator/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-12 px-4 sm:px-6 lg:px-8 text-[#18181B] antialiased">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-[#E4E4E7] text-[#71717A] text-[11px] font-medium mb-3 shadow-2xs">
            Step 2 of 2 • Profile Setup
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#18181B]">
            {currentStepRole === 'brand' ? 'Complete Brand Profile' : 'Complete Creator Profile'}
          </h1>
          <p className="text-xs text-[#71717A] mt-1">
            {currentStepRole === 'brand'
              ? 'Tell creators about your product category and brand aesthetic.'
              : 'Add your rate card and handles to start matching with briefs.'}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-[#E4E4E7] shadow-xs p-5 sm:p-7">
          {currentStepRole === 'brand' ? (
            <form onSubmit={handleBrandSubmit} className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-[#FAFAFA] border border-[#E4E4E7]">
                <img
                  src={logoUrl}
                  alt="Logo preview"
                  className="w-12 h-12 rounded-lg object-cover border border-[#E4E4E7] bg-white p-1"
                />
                <div className="flex-1">
                  <label className="block text-xs font-medium text-[#18181B]">Company Logo URL</label>
                  <input
                    type="url"
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    className="mt-1 w-full text-xs rounded-md border border-[#E4E4E7] bg-white px-2.5 py-1.5 text-[#18181B] focus:border-[#18181B] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#18181B]">Company Name</label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="mt-1 w-full text-xs font-medium rounded-lg border border-[#E4E4E7] bg-white px-3 py-2 text-[#18181B] focus:border-[#18181B] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#18181B]">Industry / Category</label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="mt-1 w-full text-xs rounded-lg border border-[#E4E4E7] bg-white px-3 py-2 text-[#18181B] focus:border-[#18181B] focus:outline-none"
                  >
                    <option value="Clean Beauty & Skincare">Clean Beauty &amp; Skincare</option>
                    <option value="Consumer Audio & Tech">Consumer Audio &amp; Tech</option>
                    <option value="Specialty Coffee & Beverages">Specialty Coffee &amp; Beverages</option>
                    <option value="Fitness & Health Tech">Fitness &amp; Health Tech</option>
                    <option value="Fashion & Apparel">Fashion &amp; Apparel</option>
                    <option value="Home & Kitchen">Home &amp; Kitchen</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#18181B]">Website URL</label>
                  <input
                    type="url"
                    required
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="mt-1 w-full text-xs rounded-lg border border-[#E4E4E7] bg-white px-3 py-2 text-[#18181B] focus:border-[#18181B] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#18181B]">Headquarters</label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="mt-1 w-full text-xs rounded-lg border border-[#E4E4E7] bg-white px-3 py-2 text-[#18181B] focus:border-[#18181B] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#18181B]">Brand Overview</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 w-full text-xs rounded-lg border border-[#E4E4E7] bg-white p-3 text-[#18181B] focus:border-[#18181B] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 inline-flex items-center justify-center gap-1.5 bg-[#18181B] hover:bg-[#27272A] text-white py-2 rounded-lg text-xs font-medium shadow-xs transition-colors cursor-pointer"
              >
                <span>Launch Brand Console</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleCreatorSubmit} className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-[#FAFAFA] border border-[#E4E4E7]">
                <img
                  src={avatarUrl}
                  alt="Avatar preview"
                  className="w-12 h-12 rounded-full object-cover border border-[#E4E4E7]"
                />
                <div className="flex-1">
                  <label className="block text-xs font-medium text-[#18181B]">Profile Photo URL</label>
                  <input
                    type="url"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    className="mt-1 w-full text-xs rounded-md border border-[#E4E4E7] bg-white px-2.5 py-1.5 text-[#18181B] focus:border-[#18181B] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#18181B]">Full Name</label>
                  <input
                    type="text"
                    required
                    value={creatorName}
                    onChange={(e) => setCreatorName(e.target.value)}
                    className="mt-1 w-full text-xs font-medium rounded-lg border border-[#E4E4E7] bg-white px-3 py-2 text-[#18181B] focus:border-[#18181B] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#18181B]">Social Handle</label>
                  <input
                    type="text"
                    required
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    className="mt-1 w-full text-xs rounded-lg border border-[#E4E4E7] bg-white px-3 py-2 text-[#18181B] focus:border-[#18181B] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#18181B]">Niches (comma separated)</label>
                  <input
                    type="text"
                    required
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    className="mt-1 w-full text-xs rounded-lg border border-[#E4E4E7] bg-white px-3 py-2 text-[#18181B] focus:border-[#18181B] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#18181B]">Location</label>
                  <input
                    type="text"
                    required
                    value={creatorLocation}
                    onChange={(e) => setCreatorLocation(e.target.value)}
                    className="mt-1 w-full text-xs rounded-lg border border-[#E4E4E7] bg-white px-3 py-2 text-[#18181B] focus:border-[#18181B] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#18181B]">Primary Instagram / TikTok URL</label>
                <input
                  type="url"
                  required
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  className="mt-1 w-full text-xs rounded-lg border border-[#E4E4E7] bg-white px-3 py-2 text-[#18181B] focus:border-[#18181B] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#18181B]">Short Bio</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="mt-1 w-full text-xs rounded-lg border border-[#E4E4E7] bg-white p-3 text-[#18181B] focus:border-[#18181B] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 inline-flex items-center justify-center gap-1.5 bg-[#18181B] hover:bg-[#27272A] text-white py-2 rounded-lg text-xs font-medium shadow-xs transition-colors cursor-pointer"
              >
                <span>Launch Creator Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-[#71717A]">Loading onboarding...</div>}>
      <OnboardingContent />
    </Suspense>
  );
}
