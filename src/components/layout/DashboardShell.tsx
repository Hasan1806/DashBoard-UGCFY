'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { Menu, ShieldAlert } from 'lucide-react';
import { useUGCFY } from '@/lib/store';

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { role, isAuthenticated, isLoaded } = useUGCFY();

  const isBrandRoute = pathname.startsWith('/brand/');
  const isCreatorRoute = pathname.startsWith('/creator/');

  useEffect(() => {
    if (!isLoaded) return;

    if (!isAuthenticated) {
      if (isBrandRoute) {
        router.replace('/brand/login');
      } else if (isCreatorRoute) {
        router.replace('/creator/login');
      }
      return;
    }

    if (isBrandRoute && role !== 'brand') {
      // User is Creator trying to access Brand route -> redirect to creator dashboard
      router.replace('/creator/dashboard');
    } else if (isCreatorRoute && role !== 'creator') {
      // User is Brand trying to access Creator route -> redirect to brand dashboard
      router.replace('/brand/dashboard');
    }
  }, [isLoaded, isAuthenticated, role, pathname, isBrandRoute, isCreatorRoute, router]);

  // Loading state
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#F7F7F5] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#18181B] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Cross-role or unauthenticated guard block while redirecting
  if (
    !isAuthenticated ||
    (isBrandRoute && role !== 'brand') ||
    (isCreatorRoute && role !== 'creator')
  ) {
    return (
      <div className="min-h-screen bg-[#F7F7F5] flex flex-col items-center justify-center text-center p-6 antialiased">
        <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-4 shadow-sm">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <h2 className="text-base font-bold text-[#18181B]">Redirecting to authorized dashboard...</h2>
        <p className="text-xs text-[#777780] mt-1 max-w-sm">
          Access denied for this portal. Strict role separation enforces your account&apos;s verified dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col text-[#18181B]">
      <div className="flex flex-1">
        {/* 240px Fixed Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Content Area */}
        <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
          {/* Mobile hamburger menu (only shown on small screens) */}
          <div className="lg:hidden flex items-center justify-between p-3 border-b border-[#E4E4E7] bg-white sticky top-0 z-20">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-1.5 text-[#71717A] hover:text-[#18181B] rounded-md hover:bg-[#F4F4F5] cursor-pointer"
              aria-label="Open navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="text-xs font-bold text-[#18181B] tracking-tight">UGCFY</span>
            <div className="w-8" />
          </div>

          <main className="flex-1 px-4 sm:px-6 md:px-8 py-6 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
