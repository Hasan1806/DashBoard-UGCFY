'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Wallet,
  Users,
  Video,
  Star,
  Sparkles,
  Layers,
  BarChart3,
  Play,
  Zap,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#18181B] flex flex-col antialiased selection:bg-[#7456F1]/15 selection:text-[#7456F1]">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#E8E8EA]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#17171C] text-white flex items-center justify-center font-bold text-sm tracking-tight shadow-sm">
                U
              </div>
              <span className="font-bold text-base tracking-tight text-[#18181B]">
                UGCFY
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D7F36B] text-[#17171C] border border-[#17171C]/10">
                Studio
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-[#777780]">
            <Link href="/brand/login" className="hover:text-[#18181B] transition-colors">
              For Brands
            </Link>
            <Link href="/creator/login" className="hover:text-[#18181B] transition-colors">
              For Creators
            </Link>
            <Link href="/brand/inspiration" className="hover:text-[#18181B] transition-colors">
              Ad Inspiration
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-xs font-semibold text-[#777780] hover:text-[#18181B] px-3 py-1.5 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/brand/login"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-[#17171C] hover:bg-[#272730] text-white shadow-md transition-all cursor-pointer"
            >
              <span>Launch Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-16 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E8E8EA] shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#168365] animate-pulse" />
            <span className="text-xs font-semibold text-[#777780]">
              Connecting 150+ Top Direct-to-Consumer Brands with High-Conversion Creators
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#18181B] tracking-tight leading-[1.12] max-w-4xl mx-auto">
            High-converting UGC video production. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7456F1] via-[#8566FF] to-[#17171C]">
              Engineered for creative scale.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-[#777780] max-w-2xl mx-auto leading-relaxed">
            Stop guessing creative ad angles. Commission authentic UGC videos with automated escrow milestones, structured script hooks, and verified creator performance benchmarks.
          </p>

          {/* Dual Role Direct Entry CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              href="/brand/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#17171C] hover:bg-[#272730] text-white text-xs font-bold shadow-lg transition-all cursor-pointer group"
            >
              <span>Launch Campaigns as Brand</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              href="/creator/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-[#F7F7F5] text-[#18181B] text-xs font-bold border border-[#E8E8EA] shadow-sm transition-all cursor-pointer group"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#7456F1]" />
              <span>Explore Deals as Creator</span>
            </Link>
          </div>

          {/* Trust Factors */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-8 text-xs font-semibold text-[#777780]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#168365]" /> 100% Escrow Protection in INR
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#7456F1]" /> Verified Deliverable Sign-Off
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> 4.9/5 Average Review Rating
            </span>
          </div>
        </div>

        {/* Interactive Platform Preview */}
        <div className="mt-14 max-w-5xl mx-auto rounded-2xl bg-[#17171C] text-white border border-[#272730] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#7456F1]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D7F36B]" />
                <h3 className="text-sm font-bold text-white tracking-wide">Live UGCFY Production Console</h3>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">Role-specific portals with verified authentication</p>
            </div>

            <div className="flex items-center gap-1.5 bg-white/10 p-1 rounded-xl border border-white/15">
              <Link
                href="/brand/login"
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#D7F36B] text-[#17171C] shadow-sm transition-all cursor-pointer"
              >
                Brand Studio
              </Link>
              <Link
                href="/creator/login"
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-zinc-300 hover:text-white transition-all cursor-pointer"
              >
                Creator Hub
              </Link>
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="text-xs text-zinc-400 block font-medium">Active Campaigns in Production</span>
              <p className="text-3xl font-bold text-white mt-1 tabular-nums">14</p>
              <p className="text-[11px] text-[#D7F36B] mt-1 font-semibold">+4 commissioned this week</p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="text-xs text-zinc-400 block font-medium">Creator Proposals Processed</span>
              <p className="text-3xl font-bold text-white mt-1 tabular-nums">1,248</p>
              <p className="text-[11px] text-zinc-400 mt-1">Niche-matched video pitches</p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="text-xs text-zinc-400 block font-medium">Verified Creator Disbursements</span>
              <p className="text-3xl font-bold text-white mt-1 tabular-nums">₹1.85 Cr</p>
              <p className="text-[11px] text-[#D7F36B] mt-1 font-semibold">Immediate UPI / IMPS settlement</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-16 bg-white border-t border-[#E8E8EA] px-6">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-md mb-12">
            <span className="text-xs font-bold text-[#7456F1] uppercase tracking-wider block mb-1">
              End-to-End Collaboration
            </span>
            <h2 className="text-2xl font-bold text-[#18181B] tracking-tight">
              Designed for creative speed and commercial clarity
            </h2>
            <p className="text-xs text-[#777780] mt-1">
              From creative brief to deliverable approval and immediate escrow payouts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-[#E8E8EA] bg-[#F7F7F5] flex flex-col justify-between creative-card-hover">
              <div>
                <div className="w-9 h-9 rounded-xl bg-[#EEE9FF] text-[#7456F1] flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-[#18181B] mt-4">Viral Ad Inspiration Library</h3>
                <p className="text-xs text-[#777780] mt-2 leading-relaxed">
                  Media-first archive cataloging top-performing UGC video ads with hook transcripts, psychology drivers, and direct ROAS benchmarks.
                </p>
              </div>
              <Link
                href="/brand/inspiration"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#7456F1] mt-5 hover:underline"
              >
                <span>Browse Creative Library</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-6 rounded-2xl border border-[#E8E8EA] bg-[#F7F7F5] flex flex-col justify-between creative-card-hover">
              <div>
                <div className="w-9 h-9 rounded-xl bg-[#D7F36B]/40 text-[#17171C] flex items-center justify-center">
                  <Wallet className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-[#18181B] mt-4">Guaranteed Milestone Escrow</h3>
                <p className="text-xs text-[#777780] mt-2 leading-relaxed">
                  Brand budgets are safely reserved upon campaign launch and automatically released to creator bank accounts once video assets are approved.
                </p>
              </div>
              <Link
                href="/brand/login"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#17171C] mt-5 hover:underline cursor-pointer text-left"
              >
                <span>Explore Brand Escrow</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-6 rounded-2xl border border-[#E8E8EA] bg-[#F7F7F5] flex flex-col justify-between creative-card-hover">
              <div>
                <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#7456F1] flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-[#18181B] mt-4">Structured Workroom Pipeline</h3>
                <p className="text-xs text-[#777780] mt-2 leading-relaxed">
                  Real-time pitch evaluations, verified media kit stats, deadline reminders, and direct video file reviews without endless email chains.
                </p>
              </div>
              <Link
                href="/creator/login"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#7456F1] mt-5 hover:underline cursor-pointer text-left"
              >
                <span>Explore Creator Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-white border-t border-[#E8E8EA] py-10 px-6 text-xs text-[#777780]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded bg-[#17171C] text-white flex items-center justify-center font-bold text-xs">
              U
            </div>
            <span className="font-bold text-xs text-[#18181B]">UGCFY Studio</span>
            <span>&copy; 2026 UGCFY Technologies India Pvt Ltd. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 font-semibold">
            <Link href="/brand/login" className="hover:text-[#18181B] transition-colors">
              Brand Sign In
            </Link>
            <Link href="/creator/signup" className="hover:text-[#18181B] transition-colors">
              Creator Registration
            </Link>
            <Link href="/brand/inspiration" className="hover:text-[#18181B] transition-colors">
              Creative Library
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
