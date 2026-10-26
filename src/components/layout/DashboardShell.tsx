'use client';

import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Menu } from 'lucide-react';

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col text-[#18181B]">
      <div className="flex flex-1">
        {/* 240px Fixed Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Content Area */}
        <div className="flex-1 flex flex-col min-w-0 lg:pl-60">
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
