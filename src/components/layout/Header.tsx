'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Menu,
  Search,
  Bell,
  Plus,
  Compass,
  Wallet,
  Clock,
  ArrowRight,
  User,
  RotateCcw,
  Check,
  ChevronDown,
} from 'lucide-react';
import { useUGCFY } from '@/lib/store';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const {
    role,
    setRole,
    currentBrand,
    currentCreator,
    brandWallet,
    creatorWallet,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    resetAllData,
  } = useUGCFY();

  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const roleNotifs = notifications.filter((n) => n.role === role);
  const unreadCount = roleNotifs.filter((n) => !n.read).length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (role === 'brand') {
      router.push(`/brand/campaigns?search=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push(`/creator/campaigns?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Derive simple breadcrumb from pathname
  const getBreadcrumb = () => {
    if (pathname.includes('/campaigns/new')) return 'New Campaign';
    if (pathname.includes('/campaigns/')) return 'Campaign Details';
    if (pathname.includes('/collaborations/')) return 'Workspace';
    if (pathname.includes('/campaigns')) return 'Campaigns';
    if (pathname.includes('/inspiration')) return 'Creative Library';
    if (pathname.includes('/wallet')) return 'Wallet & Transactions';
    if (pathname.includes('/profile')) return 'Settings & Profile';
    if (pathname.includes('/applications')) return 'Applications';
    return 'Dashboard Overview';
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-[#E4E4E7] bg-white px-4 md:px-6">
      {/* Left: Mobile Toggle & Breadcrumb / Search */}
      <div className="flex items-center gap-3 flex-1 max-w-lg">
        <button
          onClick={onToggleSidebar}
          className="p-1.5 text-[#71717A] hover:text-[#18181B] rounded-md hover:bg-[#F4F4F5] lg:hidden cursor-pointer"
          aria-label="Toggle navigation"
        >
          <Menu className="w-4 h-4" />
        </button>

        {/* Minimal Breadcrumb */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#71717A]">
          <span>{role === 'brand' ? 'Brand' : 'Creator'}</span>
          <span className="text-[#A1A1AA]">/</span>
          <span className="text-[#18181B] font-medium">{getBreadcrumb()}</span>
        </div>

        {/* Compact Search */}
        <form onSubmit={handleSearchSubmit} className="relative w-full max-w-xs hidden md:block ml-4">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#A1A1AA]" />
          <input
            type="text"
            placeholder="Search campaigns, tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md border border-[#E4E4E7] bg-[#FAFAFA] pl-8 pr-3 py-1.5 text-xs text-[#18181B] placeholder-[#A1A1AA] focus:border-[#18181B] focus:bg-white focus:outline-none transition-colors"
          />
        </form>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5">
        {/* Reset Demo button (subtle) */}
        <button
          onClick={resetAllData}
          title="Reset demo data"
          className="hidden xl:flex items-center gap-1.5 text-xs text-[#71717A] hover:text-[#18181B] px-2 py-1 rounded border border-[#E4E4E7] hover:bg-[#F4F4F5] transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>

        {/* Balance Badge (tabular and minimal) */}
        <Link
          href={role === 'brand' ? '/brand/wallet' : '/creator/wallet'}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[#E4E4E7] bg-[#FAFAFA] hover:bg-[#F4F4F5] transition-colors text-xs"
        >
          <Wallet className="w-3.5 h-3.5 text-[#71717A]" />
          <span className="text-[#71717A] text-[11px] hidden sm:inline">
            {role === 'brand' ? 'Balance:' : 'Earnings:'}
          </span>
          <span className="font-semibold text-[#18181B] tabular-nums">
            ₹
            {role === 'brand'
              ? brandWallet.availableBalance.toLocaleString('en-IN')
              : creatorWallet.availableBalance.toLocaleString('en-IN')}
          </span>
        </Link>

        {/* Notifications Popover */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-1.5 rounded-md text-[#71717A] hover:text-[#18181B] hover:bg-[#F4F4F5] transition-colors cursor-pointer border border-[#E4E4E7]"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4 stroke-[1.75]" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2 rounded-full bg-[#6D4AFF]" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl bg-white p-3 subtle-shadow border border-[#E4E4E7] z-50">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E4E4E7]">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-semibold text-[#18181B]">Notifications</h4>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-medium px-1.5 py-0.2 rounded bg-[#F4F4F5] text-[#71717A]">
                      {unreadCount}
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsAsRead}
                    className="text-[11px] text-[#71717A] hover:text-[#18181B] cursor-pointer"
                  >
                    Mark read
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-[#F4F4F5]">
                {roleNotifs.length === 0 ? (
                  <div className="py-6 text-center text-xs text-[#71717A]">
                    No notifications
                  </div>
                ) : (
                  roleNotifs.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => {
                        markNotificationAsRead(notif.id);
                        if (notif.linkUrl) {
                          setShowNotifications(false);
                          router.push(notif.linkUrl);
                        }
                      }}
                      className={`p-2.5 rounded-md transition-colors cursor-pointer ${
                        !notif.read ? 'bg-[#FAFAFA]' : 'hover:bg-[#F4F4F5]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs font-medium text-[#18181B]">{notif.title}</p>
                        {!notif.read && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#6D4AFF] shrink-0 mt-1" />
                        )}
                      </div>
                      <p className="text-[11px] text-[#71717A] mt-0.5 line-clamp-2">
                        {notif.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Primary Role Action */}
        {role === 'brand' ? (
          <Link
            href="/brand/campaigns/new"
            aria-label="Create New Campaign Brief"
            className="flex items-center gap-1.5 bg-[#18181B] hover:bg-[#27272A] text-white text-xs font-medium px-3 py-1.5 rounded-md transition-colors cursor-pointer subtle-shadow"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New Campaign</span>
          </Link>
        ) : (
          <Link
            href="/creator/campaigns"
            aria-label="Browse Open Creator Deals"
            className="flex items-center gap-1.5 bg-[#18181B] hover:bg-[#27272A] text-white text-xs font-medium px-3 py-1.5 rounded-md transition-colors cursor-pointer subtle-shadow"
          >
            <Compass className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Browse Deals</span>
          </Link>
        )}

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-1.5 p-1 rounded-md hover:bg-[#F4F4F5] transition-colors cursor-pointer"
            aria-label="User menu"
          >
            <img
              src={role === 'brand' ? currentBrand.logoUrl : currentCreator.avatarUrl}
              alt="Profile"
              className="w-7 h-7 rounded-md object-cover border border-[#E4E4E7]"
            />
            <ChevronDown className="w-3 h-3 text-[#71717A] hidden sm:block" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white p-1.5 subtle-shadow border border-[#E4E4E7] z-50">
              <div className="px-2.5 py-2 border-b border-[#E4E4E7] mb-1">
                <p className="text-xs font-medium text-[#18181B]">
                  {role === 'brand' ? currentBrand.companyName : currentCreator.fullName}
                </p>
                <p className="text-[11px] text-[#71717A] truncate">
                  {role === 'brand' ? currentBrand.contactEmail : currentCreator.handle}
                </p>
              </div>

              <div className="space-y-0.5 text-xs">
                <Link
                  href={role === 'brand' ? '/brand/profile' : '/creator/profile'}
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-2 px-2.5 py-1.5 text-[#18181B] hover:bg-[#F4F4F5] rounded-md transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-[#71717A]" />
                  <span>Profile Settings</span>
                </Link>
                <Link
                  href={role === 'brand' ? '/brand/wallet' : '/creator/wallet'}
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-2 px-2.5 py-1.5 text-[#18181B] hover:bg-[#F4F4F5] rounded-md transition-colors"
                >
                  <Wallet className="w-3.5 h-3.5 text-[#71717A]" />
                  <span>Billing &amp; Payouts</span>
                </Link>
                <button
                  onClick={() => {
                    const next = role === 'brand' ? 'creator' : 'brand';
                    setRole(next);
                    setShowProfileMenu(false);
                    router.push(next === 'brand' ? '/brand/dashboard' : '/creator/dashboard');
                  }}
                  className="w-full flex items-center justify-between px-2.5 py-1.5 text-[#18181B] hover:bg-[#F4F4F5] rounded-md transition-colors cursor-pointer text-left"
                >
                  <span>Switch to {role === 'brand' ? 'Creator Space' : 'Brand Space'}</span>
                  <ArrowRight className="w-3 h-3 text-[#71717A]" />
                </button>
                <div className="pt-1 border-t border-[#E4E4E7]">
                  <Link
                    href="/login"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-2 px-2.5 py-1.5 text-[#DC4C4C] hover:bg-[#FEF2F2] rounded-md transition-colors"
                  >
                    <span>Sign Out</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
