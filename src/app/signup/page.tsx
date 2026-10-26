'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Building, User, Check } from 'lucide-react';
import { useUGCFY } from '@/lib/store';

export default function SignupPage() {
  const router = useRouter();
  const { setRole } = useUGCFY();
  const [role, setSelectedRole] = useState<'brand' | 'creator'>('brand');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRole(role);
    router.push(`/onboarding?role=${role}`);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 text-[#18181B] antialiased">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2">
          <span className="font-semibold text-lg tracking-tight text-[#18181B]">UGCFY</span>
          <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-[#F4F4F5] text-[#71717A] border border-[#E4E4E7]">
            Register
          </span>
        </Link>
        <h2 className="mt-4 text-xl font-semibold tracking-tight text-[#18181B]">
          Create your UGCFY account
        </h2>
        <p className="mt-1 text-xs text-[#71717A]">
          Join the UGC media production &amp; influencer network
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-6 px-5 sm:px-7 rounded-xl border border-[#E4E4E7] shadow-xs">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Account Role Selector */}
            <div>
              <label className="block text-xs font-medium text-[#18181B] mb-2">
                Account Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div
                  onClick={() => setSelectedRole('brand')}
                  className={`p-3 rounded-lg border text-left cursor-pointer transition-colors ${
                    role === 'brand'
                      ? 'border-[#18181B] bg-[#FAFAFA]'
                      : 'border-[#E4E4E7] bg-white hover:bg-[#FAFAFA]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-[#18181B]">Brand / Agency</span>
                    {role === 'brand' && <Check className="w-3.5 h-3.5 text-[#18181B]" />}
                  </div>
                  <p className="text-[11px] text-[#71717A] mt-1 leading-normal">
                    Commission video briefs &amp; manage creator deliverables
                  </p>
                </div>

                <div
                  onClick={() => setSelectedRole('creator')}
                  className={`p-3 rounded-lg border text-left cursor-pointer transition-colors ${
                    role === 'creator'
                      ? 'border-[#18181B] bg-[#FAFAFA]'
                      : 'border-[#E4E4E7] bg-white hover:bg-[#FAFAFA]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-[#18181B]">Content Creator</span>
                    {role === 'creator' && <Check className="w-3.5 h-3.5 text-[#18181B]" />}
                  </div>
                  <p className="text-[11px] text-[#71717A] mt-1 leading-normal">
                    Pitch for campaigns &amp; receive milestone payouts
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-1">
              <div>
                <label className="block text-xs font-medium text-[#18181B]">
                  {role === 'brand' ? 'Company or Brand Name' : 'Full Name'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={role === 'brand' ? 'e.g. Plum Goodness' : 'e.g. Ananya Sharma'}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-[#E4E4E7] bg-white px-3 py-2 text-xs text-[#18181B] focus:border-[#18181B] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#18181B]">
                  Work Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-[#E4E4E7] bg-white px-3 py-2 text-xs text-[#18181B] focus:border-[#18181B] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#18181B]">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-[#E4E4E7] bg-white px-3 py-2 text-xs text-[#18181B] focus:border-[#18181B] focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 inline-flex items-center justify-center gap-1.5 bg-[#18181B] hover:bg-[#27272A] text-white py-2 rounded-lg text-xs font-medium shadow-xs transition-colors cursor-pointer"
            >
              <span>Continue to onboarding</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <div className="pt-2 text-center">
              <p className="text-xs text-[#71717A]">
                Already have an account?{' '}
                <Link href="/login" className="font-medium text-[#18181B] hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
