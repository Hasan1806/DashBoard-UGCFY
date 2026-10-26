'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Lock, Mail, User, AlertCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { useUGCFY } from '@/lib/store';

export default function CreatorSignupPage() {
  const router = useRouter();
  const { registerCreator } = useUGCFY();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    const result = await registerCreator(fullName, email, password);
    setLoading(false);

    if (result.success) {
      router.push('/creator/dashboard');
    } else {
      setErrorMsg(result.error || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 text-[#18181B] antialiased selection:bg-[#7456F1]/15">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#17171C] text-white flex items-center justify-center font-bold text-sm tracking-tight shadow-sm">
            U
          </div>
          <span className="font-bold text-base tracking-tight text-[#18181B]">UGCFY</span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#7456F1] text-white">
            Creator Registration
          </span>
        </Link>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-[#18181B]">
          Register as a Creator
        </h1>
        <p className="mt-1 text-xs text-[#777780]">
          Create a permanent Creator account to pitch for brand deals, access production briefs, and earn escrow payouts.
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-7 px-6 sm:px-8 rounded-2xl border border-[#E8E8EA] shadow-sm">
          {/* Permanent Role Notice */}
          <div className="mb-5 p-3 rounded-xl bg-purple-50/60 border border-purple-100 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-[#7456F1] shrink-0 mt-0.5" />
            <div className="text-[11px] text-[#777780] leading-relaxed">
              <strong className="text-[#18181B] font-semibold">Strict Creator Role:</strong> This account will be permanently assigned the <strong className="text-[#18181B]">CREATOR</strong> role. To hire creators as a brand, please use brand registration.
            </div>
          </div>

          {/* Error Banner */}
          {errorMsg && (
            <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
              <span className="font-medium leading-relaxed">{errorMsg}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-semibold text-[#18181B]">
                Creator Full Name
              </label>
              <div className="mt-1 relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A1A1AA]" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Ananya Sharma"
                  className="w-full rounded-xl border border-[#E8E8EA] bg-[#FAFAFA] pl-9 pr-3 py-2 text-xs text-[#18181B] placeholder-[#A1A1AA] focus:border-[#7456F1] focus:bg-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#18181B]">
                Email Address
              </label>
              <div className="mt-1 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A1A1AA]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ananya@creator.com"
                  className="w-full rounded-xl border border-[#E8E8EA] bg-[#FAFAFA] pl-9 pr-3 py-2 text-xs text-[#18181B] placeholder-[#A1A1AA] focus:border-[#7456F1] focus:bg-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#18181B]">
                Account Password
              </label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A1A1AA]" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full rounded-xl border border-[#E8E8EA] bg-[#FAFAFA] pl-9 pr-3 py-2 text-xs text-[#18181B] placeholder-[#A1A1AA] focus:border-[#7456F1] focus:bg-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-[#7456F1] hover:bg-[#6042db] disabled:opacity-60 text-white py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer"
            >
              <span>{loading ? 'Creating Creator Account...' : 'Register Permanent Creator Account'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-[#E8E8EA] text-center space-y-2">
            <p className="text-xs text-[#777780]">
              Already have a Creator account?{' '}
              <Link href="/creator/login" className="font-bold text-[#7456F1] hover:underline">
                Creator Login
              </Link>
            </p>
            <p className="text-xs text-[#777780]">
              Represent a brand or business?{' '}
              <Link href="/brand/signup" className="font-bold text-[#18181B] hover:underline">
                Brand Registration
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
