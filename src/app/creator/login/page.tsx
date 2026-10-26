'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Lock, Mail, User, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { useUGCFY } from '@/lib/store';

export default function CreatorLoginPage() {
  const router = useRouter();
  const { loginCreator } = useUGCFY();
  const [email, setEmail] = useState('ananya@skinwithananya.com');
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
      if (typeof loginCreator !== 'function') {
        window.location.reload();
        return;
      }
      const result = await loginCreator(email, password);
      setLoading(false);

      if (result.success) {
        router.push('/creator/dashboard');
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

  const handleQuickDemoCreator = async () => {
    setEmail('ananya@skinwithananya.com');
    setPassword('password123');
    setErrorMsg(null);
    setIsWrongPortal(false);
    setLoading(true);

    try {
      if (typeof loginCreator !== 'function') {
        window.location.reload();
        return;
      }
      const result = await loginCreator('ananya@skinwithananya.com', 'password123');
      setLoading(false);
      if (result.success) {
        router.push('/creator/dashboard');
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
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#7456F1] text-white">
            Creator Studio
          </span>
        </Link>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-[#18181B]">
          Welcome back to UGCFY Creators
        </h1>
        <p className="mt-1 text-xs text-[#777780]">
          Sign in to access your pitches, workrooms, and guaranteed escrow earnings.
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-7 px-6 sm:px-8 rounded-2xl border border-[#E8E8EA] shadow-sm">
          {/* Active Portal Badge */}
          <div className="mb-5 p-3 rounded-xl bg-[#F7F7F5] border border-[#E8E8EA] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#7456F1] text-white flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#18181B]">Creator Workspace Login</p>
                <p className="text-[11px] text-[#777780]">Strict Creator Role Verification</p>
              </div>
            </div>
            <Link
              href="/brand/login"
              className="text-[11px] font-semibold text-[#18181B] hover:underline"
            >
              Are you a Brand?
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
                    href="/brand/login"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#17171C] text-white text-[11px] font-bold shadow-xs hover:bg-[#272730] transition-colors"
                  >
                    <span>Go to Brand Login</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              )}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-semibold text-[#18181B]">
                Creator Email Address
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
                  className="w-full rounded-xl border border-[#E8E8EA] bg-[#FAFAFA] pl-9 pr-3 py-2 text-xs text-[#18181B] placeholder-[#A1A1AA] focus:border-[#7456F1] focus:bg-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-[#7456F1] hover:bg-[#6042db] disabled:opacity-60 text-white py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer"
            >
              <span>{loading ? 'Verifying Creator Role...' : 'Sign in to Creator Studio'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Quick Demo Creator Sign In */}
          <div className="mt-6 pt-5 border-t border-[#E8E8EA]">
            <p className="text-[10px] font-bold text-[#777780] uppercase tracking-wider text-center mb-2.5">
              Verified Creator Demo Account
            </p>
            <button
              type="button"
              onClick={handleQuickDemoCreator}
              className="w-full flex items-center justify-between p-2.5 rounded-xl border border-[#E8E8EA] hover:border-[#7456F1] bg-[#FAFAFA] hover:bg-white transition-all text-left cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Ananya"
                  className="w-8 h-8 rounded-lg object-cover border border-[#E8E8EA]"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-bold text-[#18181B]">Ananya Sharma</p>
                    <span className="text-[9px] font-bold px-1.5 py-0.2 bg-[#7456F1]/10 text-[#7456F1] rounded-sm">
                      Creator
                    </span>
                  </div>
                  <p className="text-[11px] text-[#777780]">ananya@skinwithananya.com</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#777780] group-hover:text-[#7456F1] group-hover:translate-x-0.5 transition-all" />
            </button>
          </div>

          <div className="mt-5 text-center space-y-2">
            <p className="text-xs text-[#777780]">
              New creator to UGCFY?{' '}
              <Link href="/creator/signup" className="font-bold text-[#7456F1] hover:underline">
                Create Creator Profile
              </Link>
            </p>
            <p className="text-xs text-[#777780]">
              Represent a brand or agency?{' '}
              <Link href="/brand/login" className="font-bold text-[#18181B] hover:underline">
                Brand Portal Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
