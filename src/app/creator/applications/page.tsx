'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Layers,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { useUGCFY } from '@/lib/store';

export default function CreatorApplicationsPage() {
  const { currentCreator, applications, collaborations } = useUGCFY();
  const [statusFilter, setStatusFilter] = useState('All');

  const myApplications = applications.filter((a) => a.creatorId === currentCreator.id);

  const filteredApps = myApplications.filter((app) => {
    if (statusFilter === 'All') return true;
    return app.status.toLowerCase() === statusFilter.toLowerCase();
  });

  return (
    <DashboardShell>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 gap-4 border-b border-[#E4E4E7] mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-[#18181B] tracking-tight">
            Applications
          </h1>
          <p className="text-xs text-[#71717A] mt-0.5">
            Track submitted campaign proposals and brand reviews
          </p>
        </div>

        <Link
          href="/creator/campaigns"
          className="px-3 py-1.5 rounded-md bg-[#18181B] text-white text-xs font-medium hover:bg-[#27272A] transition-colors self-start sm:self-auto"
        >
          Explore More Deals
        </Link>
      </div>

      {/* Filter Buttons */}
      <div className="flex items-center gap-1 border-b border-[#E4E4E7] pb-3 mb-5 overflow-x-auto text-xs">
        {['All', 'Pending', 'Shortlisted', 'Accepted', 'Rejected'].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer whitespace-nowrap ${
              statusFilter === status
                ? 'bg-[#18181B] text-white'
                : 'text-[#71717A] hover:text-[#18181B] hover:bg-[#F4F4F5]'
            }`}
          >
            {status} ({status === 'All' ? myApplications.length : myApplications.filter((a) => a.status.toLowerCase() === status.toLowerCase()).length})
          </button>
        ))}
      </div>

      {/* Applications Table / Rows */}
      <div className="bg-white rounded-lg border border-[#E4E4E7] p-5 subtle-shadow">
        {filteredApps.length === 0 ? (
          <div className="py-8 text-center text-xs text-[#71717A]">
            No applications match this filter.
          </div>
        ) : (
          <div className="divide-y divide-[#F4F4F5]">
            {filteredApps.map((app) => {
              const matchedCollab = collaborations.find(
                (c) => c.campaignId === app.campaignId && c.creatorId === currentCreator.id
              );

              return (
                <div key={app.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-[#71717A]">{app.brandName}</span>
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

                    <h3 className="font-semibold text-[#18181B] mt-1">{app.campaignTitle}</h3>
                    <p className="text-[11px] text-[#71717A] mt-0.5 line-clamp-1 italic">
                      &ldquo;{app.pitch}&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                    <span className="font-semibold text-[#18181B] tabular-nums">
                      ₹{app.proposedRate.toLocaleString('en-IN')}
                    </span>

                    {app.status === 'accepted' && matchedCollab ? (
                      <Link
                        href={`/creator/collaborations/${matchedCollab.id}`}
                        className="px-2.5 py-1 rounded bg-[#18181B] text-white font-medium hover:bg-[#27272A] transition-colors"
                      >
                        Workspace
                      </Link>
                    ) : (
                      <Link
                        href={`/creator/campaigns/${app.campaignId}`}
                        className="px-2.5 py-1 rounded border border-[#E4E4E7] font-medium text-[#18181B] hover:bg-[#F4F4F5] transition-colors"
                      >
                        Brief
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
