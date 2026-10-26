'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  BarChart3,
  Calendar,
  Sparkles,
  ArrowUpRight,
  Eye,
  Percent,
  Play,
  Award,
  Download,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { useUGCFY } from '@/lib/store';

export default function BrandAnalyticsPage() {
  const { currentBrand, campaigns, allCreators } = useUGCFY();
  const [timeRange, setTimeRange] = useState('30d');

  const campaignMetrics = [
    {
      name: 'Plum 10% Niacinamide Launch',
      spend: 480000,
      roas: 4.8,
      conversions: 2420,
      cpa: '₹198',
      hookRate: '82%',
      platform: 'Instagram Reels',
    },
    {
      name: 'boAt Space ANC Noise-Cancelling',
      spend: 360000,
      roas: 4.3,
      conversions: 1840,
      cpa: '₹195',
      hookRate: '76%',
      platform: 'YouTube Shorts',
    },
    {
      name: 'Sleepy Owl Cold Brew Starter Kits',
      spend: 180000,
      roas: 4.1,
      conversions: 920,
      cpa: '₹196',
      hookRate: '79%',
      platform: 'Instagram Reels',
    },
  ];

  const topCreators = [
    {
      name: 'Ananya Sharma',
      handle: '@skinwithananya',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
      roas: '5.2x',
      salesDriven: '₹6,40,000',
      retention: '84%',
    },
    {
      name: 'Rohan Verma',
      handle: '@rohancreates',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      roas: '4.7x',
      salesDriven: '₹4,80,000',
      retention: '81%',
    },
    {
      name: 'Priya Nair',
      handle: '@priyabeauty',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100',
      roas: '4.4x',
      salesDriven: '₹3,90,000',
      retention: '78%',
    },
  ];

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E4E4E7]">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-semibold text-[#18181B] tracking-tight">
                Performance &amp; ROAS Intelligence
              </h1>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#168365]/10 text-[#168365]">
                +28.4% vs Industry Baseline
              </span>
            </div>
            <p className="text-xs text-[#71717A] mt-1">
              Deep dive into creator conversion curves, first 3-second hook dropoff, and paid media yield
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-white border border-[#E4E4E7] rounded-lg p-0.5 text-xs">
              {['7d', '30d', '90d', 'All'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                    timeRange === range
                      ? 'bg-[#18181B] text-white shadow-xs'
                      : 'text-[#71717A] hover:text-[#18181B]'
                  }`}
                >
                  {range.toUpperCase()}
                </button>
              ))}
            </div>

            <button
              onClick={() => alert('Exporting Q3 UGC Performance Executive Report (.CSV)...')}
              className="px-3 py-1.5 rounded-lg border border-[#E4E4E7] bg-white text-xs font-medium text-[#18181B] hover:bg-[#F4F4F5] flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* 4 Macro KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-[#E4E4E7] shadow-xs">
            <span className="text-xs text-[#71717A] font-medium block mb-1">Aggregate ROAS</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#18181B] tracking-tight">4.42x</span>
              <span className="text-xs font-semibold text-[#168365] flex items-center">
                <ArrowUpRight className="w-3.5 h-3.5" />
                +18%
              </span>
            </div>
            <span className="text-[11px] text-[#A1A1AA] mt-1 block">Target benchmark: 3.5x</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#E4E4E7] shadow-xs">
            <span className="text-xs text-[#71717A] font-medium block mb-1">3-Second Hook Retention</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#7456F1] tracking-tight">78.4%</span>
              <span className="text-xs font-semibold text-[#168365] flex items-center">
                <ArrowUpRight className="w-3.5 h-3.5" />
                +24%
              </span>
            </div>
            <span className="text-[11px] text-[#A1A1AA] mt-1 block">Meta ads avg: 42%</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#E4E4E7] shadow-xs">
            <span className="text-xs text-[#71717A] font-medium block mb-1">Attributed Revenue</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#18181B] tracking-tight">₹37,12,800</span>
            </div>
            <span className="text-[11px] text-[#A1A1AA] mt-1 block">Total spend: ₹8,40,000</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#E4E4E7] shadow-xs">
            <span className="text-xs text-[#71717A] font-medium block mb-1">Blended CPV (Cost / View)</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-[#168365] tracking-tight">₹0.46</span>
              <span className="text-xs font-semibold text-[#168365] flex items-center">
                <ArrowUpRight className="w-3.5 h-3.5" />
                -32%
              </span>
            </div>
            <span className="text-[11px] text-[#A1A1AA] mt-1 block">1.82M organic &amp; paid views</span>
          </div>
        </div>

        {/* Charts & Breakdown Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Main Campaign Breakdown Table */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-[#E4E4E7] p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F4F4F5]">
              <div>
                <h3 className="font-semibold text-sm text-[#18181B]">Campaign Performance Breakdown</h3>
                <p className="text-xs text-[#71717A]">Conversion volume and hook retention by brief</p>
              </div>
              <span className="text-[11px] font-bold text-[#7456F1] bg-[#7456F1]/10 px-2 py-0.5 rounded">
                Live Pixel Tracking
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E4E4E7] text-[#71717A] font-medium">
                    <th className="pb-2.5 font-semibold">Campaign Brief</th>
                    <th className="pb-2.5 font-semibold">Spend</th>
                    <th className="pb-2.5 font-semibold">ROAS</th>
                    <th className="pb-2.5 font-semibold">Hook %</th>
                    <th className="pb-2.5 font-semibold">Conversions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F4F4F5]">
                  {campaignMetrics.map((camp) => (
                    <tr key={camp.name} className="hover:bg-[#F9F9FB] transition-colors">
                      <td className="py-3">
                        <span className="font-semibold text-[#18181B] block">{camp.name}</span>
                        <span className="text-[10px] text-[#A1A1AA]">{camp.platform}</span>
                      </td>
                      <td className="py-3 font-medium text-[#18181B]">
                        ₹{camp.spend.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 font-bold text-[#168365]">{camp.roas}x</td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-[#7456F1]">{camp.hookRate}</span>
                          <div className="w-12 h-1.5 rounded-full bg-[#E4E4E7] overflow-hidden">
                            <div
                              className="h-full bg-[#7456F1] rounded-full"
                              style={{ width: camp.hookRate }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-3 font-medium text-[#18181B]">
                        {camp.conversions.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Converting Creators Leaderboard */}
          <div className="bg-white rounded-xl border border-[#E4E4E7] p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F4F4F5]">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#F59E0B]" />
                <h3 className="font-semibold text-sm text-[#18181B]">Top Creator Leaderboard</h3>
              </div>
              <span className="text-[10px] text-[#71717A] uppercase font-bold">By ROAS</span>
            </div>

            <div className="space-y-3">
              {topCreators.map((creator, idx) => (
                <div
                  key={creator.name}
                  className="p-3 rounded-lg border border-[#E4E4E7] bg-[#FAFAFA] flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-5 text-center font-bold text-xs text-[#A1A1AA]">
                      #{idx + 1}
                    </span>
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      className="w-9 h-9 rounded-lg object-cover border border-[#E4E4E7]"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[#18181B] truncate">
                        {creator.name}
                      </p>
                      <p className="text-[10px] text-[#71717A] truncate">{creator.handle}</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="block text-xs font-bold text-[#168365]">{creator.roas}</span>
                    <span className="text-[10px] text-[#71717A]">{creator.salesDriven}</span>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/brand/creators"
              className="w-full py-2 rounded-lg bg-[#F4F4F5] hover:bg-[#E4E4E7] text-xs font-semibold text-[#18181B] transition-colors flex items-center justify-center gap-1 block text-center"
            >
              <span>Explore All Creators</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
