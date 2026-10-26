'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { useUGCFY } from '@/lib/store';
import { CampaignApplication } from '@/types';
import { ApplicationsPageHeader } from '@/components/applications/ApplicationsPageHeader';
import { ApplicationMetrics } from '@/components/applications/ApplicationMetrics';
import { ApplicationSpotlight } from '@/components/applications/ApplicationSpotlight';
import { ApplicationFilterBar, SortOption, ViewMode } from '@/components/applications/ApplicationFilterBar';
import { ApplicationCard } from '@/components/applications/ApplicationCard';
import { ApplicationRow } from '@/components/applications/ApplicationRow';
import { ApplicationDetailDrawer } from '@/components/applications/ApplicationDetailDrawer';
import { ApplicationsEmptyState } from '@/components/applications/ApplicationsEmptyState';

function ApplicationsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const {
    currentCreator,
    applications,
    campaigns,
    collaborations,
    updateApplicationStatus,
  } = useUGCFY();

  // URL Query Sync
  const initialTab = searchParams.get('status') || 'all';
  const initialSearch = searchParams.get('search') || '';
  const initialPlatform = searchParams.get('platform') || 'all';
  const initialView = (searchParams.get('view') as ViewMode) || 'grid';
  const initialSort = (searchParams.get('sort') as SortOption) || 'newest';

  const [currentTab, setCurrentTab] = useState<string>(initialTab);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [platformFilter, setPlatformFilter] = useState<string>(initialPlatform);
  const [viewMode, setViewMode] = useState<ViewMode>(initialView);
  const [sortOption, setSortOption] = useState<SortOption>(initialSort);

  // Drawer state
  const [selectedApp, setSelectedApp] = useState<CampaignApplication | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Filter creator's own applications
  const myApplications = useMemo(() => {
    return applications.filter((a) => a.creatorId === currentCreator.id);
  }, [applications, currentCreator.id]);

  // Tab counts
  const tabCounts = useMemo(() => {
    return {
      all: myApplications.length,
      pending: myApplications.filter((a) => a.status === 'pending').length,
      shortlisted: myApplications.filter((a) => a.status === 'shortlisted').length,
      accepted: myApplications.filter((a) => a.status === 'accepted').length,
      rejected: myApplications.filter((a) => a.status === 'rejected').length,
      withdrawn: myApplications.filter((a) => a.status === 'withdrawn').length,
    };
  }, [myApplications]);

  // Update URL search parameters when filters change
  const updateUrlParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value && value !== 'all' && value !== '') {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    updateUrlParams({ status: tab });
  };

  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    updateUrlParams({ search: q || null });
  };

  const handlePlatformChange = (platform: string) => {
    setPlatformFilter(platform);
    updateUrlParams({ platform });
  };

  const handleSortChange = (sort: SortOption) => {
    setSortOption(sort);
    updateUrlParams({ sort });
  };

  const handleViewModeChange = (view: ViewMode) => {
    setViewMode(view);
    updateUrlParams({ view });
  };

  // Filtered & Sorted applications
  const filteredApplications = useMemo(() => {
    let result = myApplications.filter((app) => {
      // Status filter
      if (currentTab !== 'all' && app.status.toLowerCase() !== currentTab.toLowerCase()) {
        return false;
      }

      // Matched campaign
      const camp = campaigns.find((c) => c.id === app.campaignId);

      // Platform filter
      if (platformFilter !== 'all') {
        const platforms = camp?.requirements.platforms || [];
        if (!platforms.some((p) => p.toLowerCase().includes(platformFilter.toLowerCase()))) {
          return false;
        }
      }

      // Keyword Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = app.campaignTitle.toLowerCase().includes(q);
        const matchesBrand = app.brandName.toLowerCase().includes(q);
        const matchesPitch = app.pitch.toLowerCase().includes(q);
        const matchesCategory = camp?.category.toLowerCase().includes(q) || false;
        if (!matchesTitle && !matchesBrand && !matchesPitch && !matchesCategory) {
          return false;
        }
      }

      return true;
    });

    // Sorting
    result.sort((a, b) => {
      if (sortOption === 'newest') {
        return new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime();
      }
      if (sortOption === 'oldest') {
        return new Date(a.appliedAt).getTime() - new Date(b.appliedAt).getTime();
      }
      if (sortOption === 'highest_rate') {
        return b.proposedRate - a.proposedRate;
      }
      if (sortOption === 'lowest_rate') {
        return a.proposedRate - b.proposedRate;
      }
      return 0;
    });

    return result;
  }, [myApplications, currentTab, platformFilter, searchQuery, sortOption, campaigns]);

  // Open Drawer
  const handleOpenDetails = (app: CampaignApplication) => {
    setSelectedApp(app);
    setIsDrawerOpen(true);
  };

  // Withdraw action
  const handleWithdraw = (applicationId: string) => {
    updateApplicationStatus(applicationId, 'withdrawn');
  };

  // Selected app campaign & collaboration
  const selectedCampaign = campaigns.find((c) => c.id === selectedApp?.campaignId);
  const selectedCollaboration = collaborations.find(
    (c) => c.campaignId === selectedApp?.campaignId && c.creatorId === currentCreator.id
  );

  return (
    <div className="space-y-7 pb-16">
      {/* 1. Redesigned Editorial Page Header */}
      <ApplicationsPageHeader
        creator={currentCreator}
        totalApplications={myApplications.length}
        activeOpportunities={tabCounts.pending + tabCounts.shortlisted}
        acceptedCount={tabCounts.accepted}
      />

      {/* 2. Application Analytics Section & Conversion Journey */}
      <ApplicationMetrics applications={myApplications} />

      {/* 3. Featured Application Spotlight */}
      <ApplicationSpotlight
        applications={myApplications}
        campaigns={campaigns}
        collaborations={collaborations}
        onOpenDetails={handleOpenDetails}
      />

      {/* 4. Filter Bar & Controls */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#18181B] tracking-tight">
              Application Tracker
            </h3>
            <p className="text-xs text-[#777780]">
              Showing {filteredApplications.length} of {myApplications.length} proposals
            </p>
          </div>
        </div>

        <ApplicationFilterBar
          currentTab={currentTab}
          onTabChange={handleTabChange}
          tabCounts={tabCounts}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          sortOption={sortOption}
          onSortChange={handleSortChange}
          platformFilter={platformFilter}
          onPlatformChange={handlePlatformChange}
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
          totalFiltered={filteredApplications.length}
        />
      </div>

      {/* 5. Application Listings (Grid or List View) */}
      {filteredApplications.length === 0 ? (
        <ApplicationsEmptyState
          filter={currentTab}
          searchQuery={searchQuery}
          totalApplications={myApplications.length}
          onClearFilters={() => {
            setCurrentTab('all');
            setSearchQuery('');
            setPlatformFilter('all');
            updateUrlParams({ status: null, search: null, platform: null });
          }}
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {filteredApplications.map((app) => {
            const camp = campaigns.find((c) => c.id === app.campaignId);
            const collab = collaborations.find(
              (c) => c.campaignId === app.campaignId && c.creatorId === currentCreator.id
            );

            return (
              <ApplicationCard
                key={app.id}
                application={app}
                campaign={camp}
                collaboration={collab}
                onOpenDetails={handleOpenDetails}
                onWithdraw={handleWithdraw}
              />
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-[#E8E8EA] overflow-hidden shadow-xs divide-y divide-[#E8E8EA]">
          {filteredApplications.map((app) => {
            const camp = campaigns.find((c) => c.id === app.campaignId);
            const collab = collaborations.find(
              (c) => c.campaignId === app.campaignId && c.creatorId === currentCreator.id
            );

            return (
              <ApplicationRow
                key={app.id}
                application={app}
                campaign={camp}
                collaboration={collab}
                onOpenDetails={handleOpenDetails}
                onWithdraw={handleWithdraw}
              />
            );
          })}
        </div>
      )}

      {/* 6. Application Detail Drawer */}
      <ApplicationDetailDrawer
        application={selectedApp}
        campaign={selectedCampaign}
        collaboration={selectedCollaboration}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onWithdraw={handleWithdraw}
      />
    </div>
  );
}

export default function CreatorApplicationsPage() {
  return (
    <DashboardShell>
      <Suspense
        fallback={
          <div className="py-20 text-center text-xs text-[#777780]">
            Loading application workspace...
          </div>
        }
      >
        <ApplicationsContent />
      </Suspense>
    </DashboardShell>
  );
}
