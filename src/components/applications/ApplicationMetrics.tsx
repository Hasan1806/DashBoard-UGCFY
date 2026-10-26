'use client';

import React from 'react';
import {
  Layers,
  Clock,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Coins,
} from 'lucide-react';
import { CampaignApplication } from '@/types';

interface ApplicationMetricsProps {
  applications: CampaignApplication[];
}

export function ApplicationMetrics({ applications }: ApplicationMetricsProps) {
  const total = applications.length;
  const pending = applications.filter((a) => a.status === 'pending').length;
  const shortlisted = applications.filter((a) => a.status === 'shortlisted').length;
  const accepted = applications.filter((a) => a.status === 'accepted').length;
  const rejected = applications.filter((a) => a.status === 'rejected').length;
  const withdrawn = applications.filter((a) => a.status === 'withdrawn').length;

  // Real acceptance rate calculation
  const acceptanceRate = total > 0 ? ((accepted / total) * 100).toFixed(0) : '0';

  // Total pipeline volume (sum of proposed rates)
  const totalPipeline = applications.reduce((sum, a) => sum + (a.proposedRate || 0), 0);
  const securedEarnings = applications
    .filter((a) => a.status === 'accepted')
    .reduce((sum, a) => sum + (a.proposedRate || 0), 0);

  // Conversion calculations
  const shortlistRate = total > 0 ? (((shortlisted + accepted) / total) * 100).toFixed(0) : '0';

  return (
    <div className="space-y-4">
      {/* Analytics Strip with Varied Hierarchy */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3.5">
        {/* Featured Large Card (Col span 4) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#E8E8EA] p-5 shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold tracking-wider uppercase text-[#777780]">
                Applications Pipeline
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#EEE9FF] text-[#7456F1] text-[10px] font-bold">
                <Coins className="w-3 h-3" />
                <span>₹{totalPipeline.toLocaleString('en-IN')} Value</span>
              </span>
            </div>

            <div className="mt-3 flex items-baseline gap-2.5">
              <span className="text-3xl font-extrabold text-[#18181B] tracking-tight tabular-nums">
                {total}
              </span>
              <span className="text-xs text-[#777780]">Total Proposals Submitted</span>
            </div>
            
            <p className="text-xs text-[#777780] mt-1.5 leading-relaxed">
              <strong>{accepted} secured</strong> ({((accepted / (total || 1)) * 100).toFixed(0)}% win rate) with{' '}
              <strong>₹{securedEarnings.toLocaleString('en-IN')}</strong> in active escrow.
            </p>
          </div>

          {/* Mini Linear Gauge */}
          <div className="mt-4 pt-3.5 border-t border-[#F4F4F5]">
            <div className="flex items-center justify-between text-[11px] text-[#777780] mb-1.5">
              <span>Active in review / shortlist</span>
              <span className="font-semibold text-[#18181B]">{pending + shortlisted} opportunities</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#E8E8EA] overflow-hidden flex">
              <div
                className="bg-[#168365] h-full"
                style={{ width: `${(accepted / (total || 1)) * 100}%` }}
                title={`Accepted: ${accepted}`}
              />
              <div
                className="bg-[#7456F1] h-full"
                style={{ width: `${(shortlisted / (total || 1)) * 100}%` }}
                title={`Shortlisted: ${shortlisted}`}
              />
              <div
                className="bg-amber-400 h-full"
                style={{ width: `${(pending / (total || 1)) * 100}%` }}
                title={`Pending: ${pending}`}
              />
            </div>
          </div>
        </div>

        {/* 4 Compact Supporting Metric Cards (Col span 8 -> 4 x col-span-2) */}
        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {/* Pending Review */}
          <div className="bg-white rounded-xl border border-[#E8E8EA] p-4 shadow-xs flex flex-col justify-between hover:border-zinc-300 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold tracking-wider uppercase text-[#777780]">Pending</span>
              <div className="w-6 h-6 rounded-md bg-zinc-100 flex items-center justify-center text-zinc-600">
                <Clock className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold text-[#18181B] tabular-nums">{pending}</span>
              <p className="text-[11px] text-[#777780] mt-0.5">Awaiting brand review</p>
            </div>
            <div className="mt-3 pt-2 border-t border-[#F4F4F5] flex items-center justify-between text-[10px] text-[#777780]">
              <span>In queue</span>
              <span className="font-semibold text-zinc-700">{total > 0 ? ((pending / total) * 100).toFixed(0) : 0}%</span>
            </div>
          </div>

          {/* Shortlisted */}
          <div className="bg-white rounded-xl border border-[#E8E8EA] p-4 shadow-xs flex flex-col justify-between hover:border-[#7456F1]/40 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold tracking-wider uppercase text-[#777780]">Shortlisted</span>
              <div className="w-6 h-6 rounded-md bg-[#EEE9FF] flex items-center justify-center text-[#7456F1]">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold text-[#7456F1] tabular-nums">{shortlisted}</span>
              <p className="text-[11px] text-[#777780] mt-0.5">Top candidate pool</p>
            </div>
            <div className="mt-3 pt-2 border-t border-[#F4F4F5] flex items-center justify-between text-[10px] text-[#777780]">
              <span>High priority</span>
              <span className="font-semibold text-[#7456F1]">{total > 0 ? ((shortlisted / total) * 100).toFixed(0) : 0}%</span>
            </div>
          </div>

          {/* Accepted */}
          <div className="bg-white rounded-xl border border-[#E8E8EA] p-4 shadow-xs flex flex-col justify-between hover:border-[#168365]/40 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold tracking-wider uppercase text-[#777780]">Accepted</span>
              <div className="w-6 h-6 rounded-md bg-[#EFF8F5] flex items-center justify-center text-[#168365]">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold text-[#168365] tabular-nums">{accepted}</span>
              <p className="text-[11px] text-[#777780] mt-0.5">Workspaces unlocked</p>
            </div>
            <div className="mt-3 pt-2 border-t border-[#F4F4F5] flex items-center justify-between text-[10px] text-[#777780]">
              <span>100% Escrow</span>
              <span className="font-semibold text-[#168365]">Secured</span>
            </div>
          </div>

          {/* Acceptance Rate */}
          <div className="bg-white rounded-xl border border-[#E8E8EA] p-4 shadow-xs flex flex-col justify-between hover:border-zinc-300 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold tracking-wider uppercase text-[#777780]">Acceptance</span>
              <div className="w-6 h-6 rounded-md bg-zinc-100 flex items-center justify-center text-zinc-700">
                <TrendingUp className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold text-[#18181B] tabular-nums">{acceptanceRate}%</span>
              <p className="text-[11px] text-[#777780] mt-0.5">Pitch to deal ratio</p>
            </div>
            <div className="mt-3 pt-2 border-t border-[#F4F4F5] flex items-center justify-between text-[10px] text-[#777780]">
              <span>Industry avg: 12%</span>
              <span className="font-semibold text-[#168365]">&uarr; High</span>
            </div>
          </div>
        </div>
      </div>

      {/* Conversion Journey Strip */}
      <div className="bg-white rounded-xl border border-[#E8E8EA] p-3.5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#7456F1] bg-[#EEE9FF] px-2 py-0.5 rounded-md">
            Journey Flow
          </span>
          <span className="text-xs font-semibold text-[#18181B]">
            Applied ({total}) &rarr; Shortlisted or Direct ({shortlisted + accepted}) &rarr; Accepted ({accepted})
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-[#777780]">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#168365]" />
            {shortlistRate}% Positive Brand Engagement
          </span>
          <span className="text-zinc-300 hidden sm:inline">&bull;</span>
          <span className="text-[11px] text-[#777780] hidden sm:inline">
            Brands can accept pitches directly or via shortlist
          </span>
        </div>
      </div>
    </div>
  );
}
