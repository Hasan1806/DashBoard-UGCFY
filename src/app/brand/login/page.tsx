'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Lock, Mail, Building, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { useUGCFY } from '@/lib/store';

export default function BrandLoginPage() {
  const router = useRouter();
  const { loginBrand } = useUGCFY();
  const [email, setEmail] = useState('collaborations@plumgoodness.com');
  const [password, setPassword] = useState('password123');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isWrongPortal, setIsWrongPortal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsWrongPortal(false);
    setLoading(true);

    try {
      if (typeof loginBrand !== 'function') {
        window.location.reload();
        return;
      }
      const result = await loginBrand(email, password);
      setLoading(false);

      if (result.success) {
        router.push('/brand/dashboard');
      } else {
        setErrorMsg(result.error || 'Authentication failed. Please verify credentials.');
        if (result.wrongPortal) {
          setIsWrongPortal(true);
        }
      }
    } catch (err: any) {
      setLoading(false);
      setErrorMsg(err?.message || 'Authentication error. Please refresh and try again.');
    }
  };

  const handleQuickDemoBrand = async () => {
    setEmail('collaborations@plumgoodness.com');
    setPassword('password123');
    setErrorMsg(null);
    setIsWrongPortal(false);
    setLoading(true);

    try {
      if (typeof loginBrand !== 'function') {
        window.location.reload();
        return;
      }
      const result = await loginBrand('collaborations@plumgoodness.com', 'password123');
      setLoading(false);
      if (result.success) {
        router.push('/brand/dashboard');
      }
    } catch (err: any) {
      setLoading(false);
      setErrorMsg(err?.message || 'Authentication error. Please refresh and try again.');
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
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#17171C] text-white">
            Brand Portal
          </span>
        </Link>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-[#18181B]">
          Welcome back to UGCFY Brands
        </h1>
        <p className="mt-1 text-xs text-[#777780]">
          Sign in to manage video briefs, review creator pitches, and commission deliverables.
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-7 px-6 sm:px-8 rounded-2xl border border-[#E8E8EA] shadow-sm">
          {/* Active Portal Badge */}
          <div className="mb-5 p-3 rounded-xl bg-[#F7F7F5] border border-[#E8E8EA] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#17171C] text-white flex items-center justify-center">
                <Building className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#18181B]">Brand Account Login</p>
                <p className="text-[11px] text-[#777780]">Strict Brand Role Verification</p>
              </div>
            </div>
            <Link
              href="/creator/login"
              className="text-[11px] font-semibold text-[#7456F1] hover:underline"
            >
              Are you a Creator?
            </Link>
          </div>

          {/* Error Banner */}
          {errorMsg && (
            <div
              className={`mb-5 p-3.5 rounded-xl border text-xs flex flex-col gap-2 ${
                isWrongPortal
                  ? 'bg-amber-50/80 border-amber-200 text-amber-900'
                  : 'bg-red-50/80 border-red-200 text-red-900'
              }`}
            >
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                <span className="font-medium leading-relaxed">{errorMsg}</span>
              </div>
              {isWrongPortal && (
                <div className="pt-1">
                  <Link
                    href="/creator/login"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#17171C] text-white text-[11px] font-bold shadow-xs hover:bg-[#272730] transition-colors"
                  >
                    <span>Go to Creator Login</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              )}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-semibold text-[#18181B]">
                Brand Work Email
              </label>
              <div className="mt-1 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A1A1AA]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="collaborations@brand.com"
                  className="w-full rounded-xl border border-[#E8E8EA] bg-[#FAFAFA] pl-9 pr-3 py-2 text-xs text-[#18181B] placeholder-[#A1A1AA] focus:border-[#18181B] focus:bg-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-[#18181B]">
                  Password
                </label>
                <a href="#" className="text-[11px] text-[#777780] hover:text-[#18181B]">
                  Forgot password?
                </a>
              </div>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A1A1AA]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-[#E8E8EA] bg-[#FAFAFA] pl-9 pr-3 py-2 text-xs text-[#18181B] placeholder-[#A1A1AA] focus:border-[#18181B] focus:bg-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-[#17171C] hover:bg-[#272730] disabled:opacity-60 text-white py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer"
            >
              <span>{loading ? 'Verifying Brand Role...' : 'Sign in to Brand Console'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Quick Demo Brand Sign In */}
          <div className="mt-6 pt-5 border-t border-[#E8E8EA]">
            <p className="text-[10px] font-bold text-[#777780] uppercase tracking-wider text-center mb-2.5">
              Verified Brand Demo Account
            </p>
            <button
              type="button"
              onClick={handleQuickDemoBrand}
              className="w-full flex items-center justify-between p-2.5 rounded-xl border border-[#E8E8EA] hover:border-[#18181B] bg-[#FAFAFA] hover:bg-white transition-all text-left cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <img
                  src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=100&auto=format&fit=crop&q=80"
                  alt="Plum"
                  className="w-8 h-8 rounded-lg object-cover border border-[#E8E8EA]"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-bold text-[#18181B]">Plum Goodness</p>
                    <span className="text-[9px] font-bold px-1.5 py-0.2 bg-[#168365]/10 text-[#168365] rounded-sm">
                      Brand
                    </span>
                  </div>
                  <p className="text-[11px] text-[#777780]">collaborations@plumgoodness.com</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#777780] group-hover:text-[#18181B] group-hover:translate-x-0.5 transition-all" />
            </button>
          </div>

          <div className="mt-5 text-center space-y-2">
            <p className="text-xs text-[#777780]">
              New brand to UGCFY?{' '}
              <Link href="/brand/signup" className="font-bold text-[#18181B] hover:underline">
                Register Brand Account
              </Link>
            </p>
            <p className="text-xs text-[#777780]">
              Looking for creator work?{' '}
              <Link href="/creator/login" className="font-bold text-[#7456F1] hover:underline">
                Creator Portal Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
