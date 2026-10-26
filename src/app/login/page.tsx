'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Lock, Mail, Building, User } from 'lucide-react';
import { useUGCFY } from '@/lib/store';

export default function LoginPage() {
  const router = useRouter();
  const { setRole } = useUGCFY();
  const [selectedRole, setSelectedRole] = useState<'brand' | 'creator'>('brand');
  const [email, setEmail] = useState('brand@plumgoodness.com');
  const [password, setPassword] = useState('••••••••');

  const handleRoleSelect = (role: 'brand' | 'creator') => {
    setSelectedRole(role);
    if (role === 'brand') {
      setEmail('collaborations@plumgoodness.com');
    } else {
      setEmail('ananya@skinwithananya.com');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRole(selectedRole);
    if (selectedRole === 'brand') {
      router.push('/brand/dashboard');
    } else {
      router.push('/creator/dashboard');
    }
  };

  const handleQuickDemoLogin = (role: 'brand' | 'creator') => {
    setRole(role);
    if (role === 'brand') {
      router.push('/brand/dashboard');
    } else {
      router.push('/creator/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 text-[#18181B] antialiased">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
        <Link href="/" className="inline-flex items-center gap-2">
          <span className="font-semibold text-lg tracking-tight text-[#18181B]">UGCFY</span>
          <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-[#F4F4F5] text-[#71717A] border border-[#E4E4E7]">
            Sign in
          </span>
        </Link>
        <h2 className="mt-4 text-xl font-semibold tracking-tight text-[#18181B]">
          Sign in to your account
        </h2>
        <p className="mt-1 text-xs text-[#71717A]">
          Access your brand campaign console or creator workspace
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="bg-white py-6 px-5 sm:px-7 rounded-xl border border-[#E4E4E7] shadow-xs">
          {/* Role Segmented Switcher */}
          <div className="mb-5">
            <div className="grid grid-cols-2 gap-1 p-1 bg-[#FAFAFA] rounded-lg border border-[#E4E4E7]">
              <button
                type="button"
                onClick={() => handleRoleSelect('brand')}
                className={`flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  selectedRole === 'brand'
                    ? 'bg-white text-[#18181B] border border-[#E4E4E7] shadow-2xs'
                    : 'text-[#71717A] hover:text-[#18181B]'
                }`}
              >
                <Building className="w-3.5 h-3.5" />
                <span>Brand</span>
              </button>
              <button
                type="button"
                onClick={() => handleRoleSelect('creator')}
                className={`flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  selectedRole === 'creator'
                    ? 'bg-white text-[#18181B] border border-[#E4E4E7] shadow-2xs'
                    : 'text-[#71717A] hover:text-[#18181B]'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Creator</span>
              </button>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-medium text-[#18181B]">
                Email Address
              </label>
              <div className="mt-1 relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-[#E4E4E7] bg-white px-3 py-2 text-xs text-[#18181B] focus:border-[#18181B] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-xs font-medium text-[#18181B]">
                  Password
                </label>
                <a href="#" className="text-[11px] text-[#71717A] hover:text-[#18181B]">
                  Forgot password?
                </a>
              </div>
              <div className="mt-1 relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-[#E4E4E7] bg-white px-3 py-2 text-xs text-[#18181B] focus:border-[#18181B] focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 inline-flex items-center justify-center gap-1.5 bg-[#18181B] hover:bg-[#27272A] text-white py-2 rounded-lg text-xs font-medium shadow-xs transition-colors cursor-pointer"
            >
              <span>Continue as {selectedRole === 'brand' ? 'Brand' : 'Creator'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Quick Demo Access */}
          <div className="mt-6 pt-5 border-t border-[#F4F4F5]">
            <p className="text-[10px] font-medium text-[#71717A] uppercase tracking-wider text-center mb-2.5">
              Instant 1-Click Demo Profiles
            </p>
            <div className="space-y-1.5">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('brand')}
                className="w-full flex items-center justify-between p-2 rounded-lg border border-[#E4E4E7] hover:border-[#18181B] bg-[#FAFAFA] hover:bg-white transition-colors text-left cursor-pointer group"
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-[#18181B] text-white flex items-center justify-center font-medium text-[10px]">
                    P
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#18181B]">Plum Goodness</p>
                    <p className="text-[10px] text-[#71717A]">Brand Dashboard</p>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#71717A] group-hover:text-[#18181B] transition-colors" />
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('creator')}
                className="w-full flex items-center justify-between p-2 rounded-lg border border-[#E4E4E7] hover:border-[#18181B] bg-[#FAFAFA] hover:bg-white transition-colors text-left cursor-pointer group"
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-[#6D4AFF] text-white flex items-center justify-center font-medium text-[10px]">
                    A
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#18181B]">Ananya Sharma</p>
                    <p className="text-[10px] text-[#71717A]">Creator Workspace</p>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#71717A] group-hover:text-[#18181B] transition-colors" />
              </button>
            </div>
          </div>

          <div className="mt-5 text-center">
            <p className="text-xs text-[#71717A]">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="font-medium text-[#18181B] hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
