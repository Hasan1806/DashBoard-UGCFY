'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Megaphone,
  Sparkles,
  Wallet,
  User,
  LogOut,
  Layers,
  ChevronRight,
  ShieldCheck,
  Users,
  Video,
  BarChart3,
  Plus,
  Compass,
} from 'lucide-react';
import { useUGCFY } from '@/lib/store';

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

interface NavSection {
  title: string;
  items: {
    name: string;
    href: string;
    icon: React.ElementType;
    badge?: string;
    badgeColor?: string;
    counterKey?: 'campaigns' | 'deliverables' | 'applications';
  }[];
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const {
    role,
    logout,
    currentBrand,
    currentCreator,
    campaigns,
    collaborations,
    applications,
    notifications,
  } = useUGCFY();

  // Dynamic counts for badges
  const activeCampaignsCount = campaigns.filter((c) => c.status === 'active').length;
  const pendingDeliverablesCount = collaborations.flatMap((c) => c.deliverables).filter(
    (d) => d.status === 'submitted'
  ).length;
  const myApplicationsCount = applications.filter((a) => a.creatorId === currentCreator.id).length;

  const brandNavSections: NavSection[] = [
    {
      title: 'CAMPAIGNS & CONTENT',
      items: [
        { name: 'Overview', href: '/brand/dashboard', icon: LayoutDashboard },
        {
          name: 'Campaigns',
          href: '/brand/campaigns',
          icon: Megaphone,
          badge: `${activeCampaignsCount} Active`,
          badgeColor: 'bg-zinc-100 text-zinc-700',
        },
        {
          name: 'Creator Discovery',
          href: '/brand/creators',
          icon: Users,
          badge: 'New',
          badgeColor: 'bg-[#7456F1]/10 text-[#7456F1]',
        },
        {
          name: 'Deliverables & Review',
          href: '/brand/deliverables',
          icon: Video,
          badge: pendingDeliverablesCount > 0 ? `${pendingDeliverablesCount} Pending` : undefined,
          badgeColor: 'bg-[#F59E0B]/15 text-[#B45309]',
        },
        {
          name: 'Ads Inspiration',
          href: '/brand/inspiration',
          icon: Sparkles,
        },
      ],
    },
    {
      title: 'FINANCE & ESCROW',
      items: [
        {
          name: 'Wallet & Escrow',
          href: '/brand/wallet',
          icon: Wallet,
          badge: '100% Escrow',
          badgeColor: 'bg-[#168365]/10 text-[#168365]',
        },
      ],
    },
    {
      title: 'INTELLIGENCE & SETTINGS',
      items: [
        {
          name: 'Analytics & ROAS',
          href: '/brand/analytics',
          icon: BarChart3,
        },
        {
          name: 'Brand Profile',
          href: '/brand/profile',
          icon: User,
        },
      ],
    },
  ];

  const creatorNavSections: NavSection[] = [
    {
      title: 'CREATIVE STUDIO',
      items: [
        { name: 'Overview', href: '/creator/dashboard', icon: LayoutDashboard },
        {
          name: 'Explore Campaigns',
          href: '/creator/campaigns',
          icon: Megaphone,
          badge: 'Live Deals',
          badgeColor: 'bg-[#D7F36B]/20 text-[#17171C]',
        },
        {
          name: 'My Applications',
          href: '/creator/applications',
          icon: Layers,
          badge: myApplicationsCount > 0 ? `${myApplicationsCount}` : undefined,
          badgeColor: 'bg-zinc-100 text-zinc-700',
        },
        {
          name: 'Viral Hooks & Inspiration',
          href: '/creator/inspiration',
          icon: Sparkles,
        },
      ],
    },
    {
      title: 'FINANCIAL & PAYOUTS',
      items: [
        {
          name: 'Earnings Wallet',
          href: '/creator/wallet',
          icon: Wallet,
          badge: 'Instant UPI',
          badgeColor: 'bg-[#168365]/10 text-[#168365]',
        },
      ],
    },
    {
      title: 'IDENTITY',
      items: [
        {
          name: 'Creator Profile & Kit',
          href: '/creator/profile',
          icon: User,
        },
      ],
    },
  ];

  const navSections = role === 'brand' ? brandNavSections : creatorNavSections;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex w-64 flex-col bg-white border-r border-[#E4E4E7] transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Clean UGCFY Wordmark & Space Indicator */}
        <div className="h-14 px-4 flex items-center justify-between border-b border-[#E4E4E7] shrink-0">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-[#18181B] text-white flex items-center justify-center font-bold text-xs tracking-tight shadow-xs">
              U
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-sm tracking-tight text-[#18181B]">UGCFY</span>
              <span className="text-[10px] text-[#71717A] font-semibold px-1.5 py-0.2 rounded border border-[#E4E4E7] bg-[#FAFAFA]">
                {role === 'brand' ? 'Brand' : 'Creator'}
              </span>
            </div>
          </Link>
        </div>

        {/* Quick Action Button */}
        <div className="px-3 pt-3 pb-1 shrink-0">
          {role === 'brand' ? (
            <Link
              href="/brand/campaigns/new"
              onClick={onClose}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-[#18181B] text-white text-xs font-medium hover:bg-[#27272A] transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5 text-[#D7F36B]" />
              <span>Create Campaign Brief</span>
            </Link>
          ) : (
            <Link
              href="/creator/campaigns"
              onClick={onClose}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-[#18181B] text-white text-xs font-medium hover:bg-[#27272A] transition-colors shadow-xs"
            >
              <Compass className="w-3.5 h-3.5 text-[#D7F36B]" />
              <span>Explore High-Paying Deals</span>
            </Link>
          )}
        </div>

        {/* Categorized Navigation Menu */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-4">
          {navSections.map((section) => (
            <div key={section.title} className="space-y-0.5">
              <p className="px-2 pt-1 pb-1 text-[10px] font-semibold text-[#A1A1AA] tracking-wider uppercase">
                {section.title}
              </p>

              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/brand/dashboard' &&
                    item.href !== '/creator/dashboard' &&
                    pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded-md text-[13px] transition-colors relative group ${
                      isActive
                        ? 'bg-[#F4F4F5] text-[#18181B] font-medium'
                        : 'text-[#52525B] hover:text-[#18181B] hover:bg-[#F8F8F9]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon
                        className={`w-4 h-4 stroke-[1.75] shrink-0 ${
                          isActive
                            ? 'text-[#18181B]'
                            : 'text-[#71717A] group-hover:text-[#18181B]'
                        }`}
                      />
                      <span className="truncate">{item.name}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`text-[10px] font-medium px-1.5 py-0.2 rounded-full shrink-0 ${
                          item.badgeColor || 'bg-[#F4F4F5] text-[#71717A]'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}

                    {isActive && (
                      <div className="absolute left-0 top-1.5 bottom-1.5 w-0.5 bg-[#18181B] rounded-r-full" />
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        {/* Compact User Section */}
        <div className="p-3 border-t border-[#E4E4E7] bg-[#FAFAFA] shrink-0">
          <div className="flex items-center justify-between gap-2 p-1.5 rounded-lg bg-white border border-[#E4E4E7] subtle-shadow">
            <Link
              href={role === 'brand' ? '/brand/profile' : '/creator/profile'}
              className="flex items-center gap-2.5 min-w-0 flex-1 hover:opacity-85 transition-opacity"
            >
              <img
                src={role === 'brand' ? currentBrand.logoUrl : currentCreator.avatarUrl}
                alt="Avatar"
                className="w-7 h-7 rounded-md object-cover border border-[#E4E4E7] shrink-0"
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-[#18181B] truncate">
                  {role === 'brand' ? currentBrand.companyName : currentCreator.fullName}
                </p>
                <p className="text-[11px] text-[#71717A] truncate">
                  {role === 'brand' ? 'Verified Brand' : currentCreator.handle}
                </p>
              </div>
            </Link>

            <button
              onClick={() => {
                const targetLogin = role === 'brand' ? '/brand/login' : '/creator/login';
                logout();
                router.push(targetLogin);
              }}
              title="Sign Out"
              aria-label="Sign Out"
              className="p-1.5 text-[#71717A] hover:text-[#DC4C4C] hover:bg-[#F4F4F5] rounded transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
