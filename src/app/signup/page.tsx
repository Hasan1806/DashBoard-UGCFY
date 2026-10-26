'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Building, Sparkles, ShieldCheck } from 'lucide-react';

export default function SignupGatewayPage() {
  return (
    <div className="min-h-screen bg-[#F7F7F5] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 text-[#18181B] antialiased selection:bg-[#7456F1]/15">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg text-center">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#17171C] text-white flex items-center justify-center font-bold text-sm tracking-tight shadow-sm">
            U
          </div>
          <span className="font-bold text-base tracking-tight text-[#18181B]">UGCFY</span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E8E8EA] text-[#777780]">
            Registration Gateway
          </span>
        </Link>
        <h1 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight text-[#18181B]">
          Select your registration type
        </h1>
        <p className="mt-1.5 text-xs text-[#777780] max-w-sm mx-auto">
          Each account has a fixed, permanent role assigned at registration. Choose your account type to proceed.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Brand Signup Card */}
          <Link
            href="/brand/signup"
            className="group relative bg-white p-6 rounded-2xl border border-[#E8E8EA] hover:border-[#17171C] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#17171C] text-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform">
                <Building className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-[#18181B]">Brand Account</h2>
                <span className="text-[10px] font-bold px-1.5 py-0.5 bg-zinc-100 text-zinc-700 rounded">
                  Permanent Role
                </span>
              </div>
              <p className="text-xs text-[#777780] mt-2 leading-relaxed">
                For direct-to-consumer brands and agencies looking to hire creators and commission UGC video campaigns.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#F4F4F5] flex items-center justify-between text-xs font-bold text-[#18181B]">
              <span>Register as Brand</span>
              <ArrowRight className="w-4 h-4 text-[#777780] group-hover:text-[#18181B] group-hover:translate-x-1 transition-all" />
            </div>
          </Link>

          {/* Creator Signup Card */}
          <Link
            href="/creator/signup"
            className="group relative bg-white p-6 rounded-2xl border border-[#E8E8EA] hover:border-[#7456F1] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#7456F1] text-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-[#18181B]">Creator Account</h2>
                <span className="text-[10px] font-bold px-1.5 py-0.5 bg-[#EEE9FF] text-[#7456F1] rounded">
                  Permanent Role
                </span>
              </div>
              <p className="text-xs text-[#777780] mt-2 leading-relaxed">
                For content creators looking to pitch for brand deals, create high-converting UGC videos, and earn guaranteed payouts.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#F4F4F5] flex items-center justify-between text-xs font-bold text-[#7456F1]">
              <span>Register as Creator</span>
              <ArrowRight className="w-4 h-4 text-[#7456F1] group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        </div>

        <div className="mt-8 text-center text-xs text-[#777780]">
          <span>Already registered? </span>
          <Link href="/login" className="font-bold text-[#18181B] hover:underline">
            Go to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
