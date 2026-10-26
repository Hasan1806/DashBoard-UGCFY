'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  CheckCircle2,
  Globe,
  Mail,
  MapPin,
  Phone,
  Save,
  ShieldCheck,
  Megaphone,
  Briefcase,
  Layers,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { useUGCFY } from '@/lib/store';

export default function BrandProfilePage() {
  const { currentBrand, updateBrandProfile, campaigns } = useUGCFY();

  const [activeTab, setActiveTab] = useState<'overview' | 'settings'>('overview');

  const [companyName, setCompanyName] = useState(currentBrand.companyName);
  const [logoUrl, setLogoUrl] = useState(currentBrand.logoUrl);
  const [industry, setIndustry] = useState(currentBrand.industry);
  const [description, setDescription] = useState(currentBrand.description);
  const [website, setWebsite] = useState(currentBrand.website);
  const [contactEmail, setContactEmail] = useState(currentBrand.contactEmail);
  const [phone, setPhone] = useState(currentBrand.phone);
  const [location, setLocation] = useState(currentBrand.location);
  const [gstin, setGstin] = useState(currentBrand.billingInfo.gstin || '27AABCP1234M1Z2');
  const [billingAddress, setBillingAddress] = useState(currentBrand.billingInfo.billingAddress);
  const [city, setCity] = useState(currentBrand.billingInfo.city);
  const [state, setState] = useState(currentBrand.billingInfo.state);
  const [postalCode, setPostalCode] = useState(currentBrand.billingInfo.postalCode);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const brandCampaigns = campaigns.filter((c) => c.brandId === currentBrand.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBrandProfile({
      companyName,
      logoUrl,
      industry,
      description,
      website,
      contactEmail,
      phone,
      location,
      billingInfo: {
        gstin,
        billingAddress,
        city,
        state,
        postalCode,
      },
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setActiveTab('overview');
    }, 1500);
  };

  return (
    <DashboardShell>
      <div className="max-w-5xl mx-auto space-y-8 pb-12">
        {/* Header with View Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 gap-4 border-b border-[#E8E8EA]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#7456F1] uppercase tracking-wider">Corporate Identity</span>
              <span className="text-xs text-[#E8E8EA]">•</span>
              <span className="text-xs text-[#777780]">Verified Brand Partner</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#18181B] mt-1">
              {companyName}
            </h1>
            <p className="text-xs text-[#777780] mt-0.5">
              Verified corporate profile displayed on campaign briefs and tax credit notes.
            </p>
          </div>

          <div className="flex items-center gap-2 p-1 bg-white border border-[#E8E8EA] rounded-xl shadow-2xs self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-[#17171C] text-white shadow-xs'
                  : 'text-[#777780] hover:text-[#18181B]'
              }`}
            >
              Public Brand Profile
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-[#17171C] text-white shadow-xs'
                  : 'text-[#777780] hover:text-[#18181B]'
              }`}
            >
              Account &amp; Tax Settings
            </button>
          </div>
        </div>

        {savedSuccess && (
          <div className="p-3.5 rounded-xl bg-[#168365]/10 border border-[#168365]/20 text-[#168365] text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Company profile and tax invoicing parameters updated successfully!</span>
          </div>
        )}

        {/* VIEW 1: PUBLIC BRAND OVERVIEW */}
        {activeTab === 'overview' ? (
          <div className="space-y-8">
            {/* Brand Hero Card */}
            <div className="rounded-2xl bg-white border border-[#E8E8EA] p-6 sm:p-8 shadow-xs relative overflow-hidden">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-start sm:items-center gap-5">
                  <img
                    src={logoUrl}
                    alt={companyName}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border border-[#E8E8EA] bg-white p-2 shadow-sm"
                  />

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl sm:text-2xl font-bold text-[#18181B] tracking-tight">{companyName}</h2>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#168365]/10 text-[#168365] text-[10px] font-bold">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Verified D2C Brand
                      </span>
                    </div>

                    <p className="text-xs text-[#777780] font-medium flex items-center gap-2">
                      <span>{industry}</span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-zinc-400" /> {location}
                      </span>
                    </p>

                    <div className="flex items-center gap-4 pt-1 text-xs text-[#7456F1] font-semibold">
                      <a href={website} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
                        <Globe className="w-3.5 h-3.5" />
                        <span>{website.replace('https://', '')}</span>
                      </a>
                      <span className="text-zinc-300">•</span>
                      <span className="text-[#18181B] font-mono text-[11px]">GSTIN: {gstin}</span>
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
                  <button
                    onClick={() => setActiveTab('settings')}
                    className="px-4 py-2 rounded-xl bg-[#17171C] hover:bg-[#272730] text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Edit Company Details
                  </button>
                </div>
              </div>

              {/* Mission & Positioning Statement */}
              <div className="mt-6 pt-5 border-t border-[#F4F4F5]">
                <h4 className="text-xs font-bold text-[#777780] uppercase tracking-wider mb-1.5">
                  About the Brand &amp; Creative Mission
                </h4>
                <p className="text-xs sm:text-sm text-[#18181B] leading-relaxed max-w-3xl">
                  {description}
                </p>
              </div>

              {/* Brand Campaign Stats Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-5 border-t border-[#F4F4F5]">
                <div className="p-3.5 rounded-xl bg-[#F7F7F5] border border-[#E8E8EA]">
                  <span className="text-[11px] text-[#777780] block font-medium">Briefs Launched</span>
                  <p className="text-xl font-bold text-[#18181B] mt-0.5 tabular-nums">{brandCampaigns.length}</p>
                  <p className="text-[10px] text-[#777780] mt-0.5">Verified creator briefs</p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F7F7F5] border border-[#E8E8EA]">
                  <span className="text-[11px] text-[#777780] block font-medium">Lifetime UGC Spend</span>
                  <p className="text-xl font-bold text-[#18181B] mt-0.5 tabular-nums">
                    ₹{currentBrand.totalSpent.toLocaleString('en-IN')}
                  </p>
                  <p className="text-[10px] text-[#168365] mt-0.5 font-semibold">100% Milestone Settled</p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F7F7F5] border border-[#E8E8EA]">
                  <span className="text-[11px] text-[#777780] block font-medium">Creator Rating</span>
                  <p className="text-xl font-bold text-[#7456F1] mt-0.5 tabular-nums">★ 4.9 / 5.0</p>
                  <p className="text-[10px] text-[#777780] mt-0.5">Clear brief satisfaction</p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F7F7F5] border border-[#E8E8EA]">
                  <span className="text-[11px] text-[#777780] block font-medium">Tax Status</span>
                  <p className="text-xl font-bold text-[#168365] mt-0.5">Compliant</p>
                  <p className="text-[10px] text-[#777780] mt-0.5">India GST Registered</p>
                </div>
              </div>
            </div>

            {/* Active Brand Campaigns Showcase */}
            <div className="rounded-2xl bg-white border border-[#E8E8EA] p-6 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-[#F4F4F5]">
                <div>
                  <h3 className="text-base font-bold text-[#18181B]">Active Campaign Briefs ({brandCampaigns.length})</h3>
                  <p className="text-xs text-[#777780] mt-0.5">Publicly listed briefs open for creator proposals</p>
                </div>
                <Link
                  href="/brand/campaigns/new"
                  className="px-3.5 py-1.5 rounded-lg bg-[#7456F1] hover:bg-[#6343E0] text-white text-xs font-bold transition-colors"
                >
                  + New Brief
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                {brandCampaigns.map((camp) => (
                  <div
                    key={camp.id}
                    className="p-4 rounded-xl border border-[#E8E8EA] bg-[#F7F7F5] flex items-center justify-between gap-4 creative-card-hover"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <img
                        src={camp.coverImage}
                        alt={camp.title}
                        className="w-14 h-14 rounded-lg object-cover border border-[#E8E8EA] shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white border border-[#E8E8EA] text-[#18181B]">
                            {camp.requirements.platforms[0] || 'Instagram'}
                          </span>
                          <span className="text-[11px] text-[#777780]">&bull; {camp.category}</span>
                        </div>
                        <h4 className="text-xs font-bold text-[#18181B] truncate mt-1">{camp.title}</h4>
                        <p className="text-[11px] font-semibold text-[#168365] mt-0.5 tabular-nums">
                          ₹{camp.budget.toLocaleString('en-IN')} Budget &bull; {camp.acceptedCount}/{camp.creatorsNeeded} creators
                        </p>
                      </div>
                    </div>

                    <Link
                      href={`/brand/campaigns/${camp.id}`}
                      className="px-3 py-1.5 rounded-lg bg-white border border-[#E8E8EA] text-xs font-bold text-[#18181B] hover:bg-[#17171C] hover:text-white transition-colors shrink-0"
                    >
                      View
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* VIEW 2: ACCOUNT & TAX SETTINGS */
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white rounded-2xl border border-[#E8E8EA] divide-y divide-[#F4F4F5] shadow-xs">
              {/* Section 1: Company Profile */}
              <div className="p-6">
                <h2 className="text-base font-bold text-[#18181B]">Company Identity</h2>
                <p className="text-xs text-[#777780] mt-0.5">Information displayed on creator campaign briefs and invoices</p>

                <div className="mt-5 space-y-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={logoUrl}
                      alt={companyName}
                      className="w-16 h-16 rounded-xl object-cover border border-[#E8E8EA] bg-white p-2"
                    />
                    <div className="flex-1">
                      <label className="block text-xs font-bold text-[#18181B]">Brand Logo URL</label>
                      <input
                        type="url"
                        required
                        value={logoUrl}
                        onChange={(e) => setLogoUrl(e.target.value)}
                        className="mt-1 w-full text-xs rounded-xl border border-[#E8E8EA] bg-[#F7F7F5] px-3 py-2 text-[#18181B] focus:border-[#7456F1] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#18181B]">Company Legal / Brand Name</label>
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="mt-1 w-full text-xs font-semibold rounded-xl border border-[#E8E8EA] bg-[#F7F7F5] px-3.5 py-2.5 text-[#18181B] focus:border-[#7456F1] focus:bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#18181B]">Industry Sector</label>
                      <input
                        type="text"
                        required
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        className="mt-1 w-full text-xs rounded-xl border border-[#E8E8EA] bg-[#F7F7F5] px-3.5 py-2.5 text-[#18181B] focus:border-[#7456F1] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#18181B]">Company Positioning &amp; Mission</label>
                    <textarea
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="mt-1 w-full text-xs rounded-xl border border-[#E8E8EA] bg-[#F7F7F5] p-3 text-[#18181B] focus:border-[#7456F1] focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Contact Details */}
              <div className="p-6">
                <h2 className="text-base font-bold text-[#18181B]">Official Contact Information</h2>
                <p className="text-xs text-[#777780] mt-0.5">Used for platform notifications and deliverable escalations</p>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#18181B]">Website URL</label>
                    <input
                      type="url"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="mt-1 w-full text-xs rounded-xl border border-[#E8E8EA] bg-[#F7F7F5] px-3.5 py-2.5 text-[#18181B] focus:border-[#7456F1] focus:bg-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#18181B]">Official Email</label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="mt-1 w-full text-xs rounded-xl border border-[#E8E8EA] bg-[#F7F7F5] px-3.5 py-2.5 text-[#18181B] focus:border-[#7456F1] focus:bg-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#18181B]">Phone Number</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="mt-1 w-full text-xs rounded-xl border border-[#E8E8EA] bg-[#F7F7F5] px-3.5 py-2.5 text-[#18181B] focus:border-[#7456F1] focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: GST & Tax Invoicing */}
              <div className="p-6">
                <h2 className="text-base font-bold text-[#18181B]">Tax Invoicing &amp; GSTIN</h2>
                <p className="text-xs text-[#777780] mt-0.5">Required for compliant B2B tax credit notes and monthly invoices</p>

                <div className="mt-4 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#18181B]">GSTIN Number</label>
                      <input
                        type="text"
                        value={gstin}
                        onChange={(e) => setGstin(e.target.value)}
                        className="mt-1 w-full text-xs font-mono font-bold rounded-xl border border-[#E8E8EA] bg-[#F7F7F5] px-3.5 py-2.5 text-[#18181B] focus:border-[#7456F1] focus:bg-white focus:outline-none uppercase"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#18181B]">Registered Office Address</label>
                      <input
                        type="text"
                        value={billingAddress}
                        onChange={(e) => setBillingAddress(e.target.value)}
                        className="mt-1 w-full text-xs rounded-xl border border-[#E8E8EA] bg-[#F7F7F5] px-3.5 py-2.5 text-[#18181B] focus:border-[#7456F1] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#18181B]">City</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="mt-1 w-full text-xs rounded-xl border border-[#E8E8EA] bg-[#F7F7F5] px-3.5 py-2.5 text-[#18181B] focus:border-[#7456F1] focus:bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#18181B]">State</label>
                      <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="mt-1 w-full text-xs rounded-xl border border-[#E8E8EA] bg-[#F7F7F5] px-3.5 py-2.5 text-[#18181B] focus:border-[#7456F1] focus:bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#18181B]">PIN Code</label>
                      <input
                        type="text"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="mt-1 w-full text-xs rounded-xl border border-[#E8E8EA] bg-[#F7F7F5] px-3.5 py-2.5 text-[#18181B] focus:border-[#7456F1] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-[#F7F7F5] flex items-center justify-end gap-3 rounded-b-2xl">
                <button
                  type="button"
                  onClick={() => setActiveTab('overview')}
                  className="px-4 py-2 text-xs font-bold text-[#777780] hover:text-[#18181B]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-xl bg-[#7456F1] hover:bg-[#6343E0] text-white shadow-md transition-all cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Corporate Profile</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </DashboardShell>
  );
}
