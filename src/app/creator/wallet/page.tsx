'use client';

import React, { useState } from 'react';
import {
  ArrowDownLeft,
  ArrowUpRight,
  Building,
  CheckCircle2,
  Clock,
  Download,
  Plus,
  ShieldCheck,
  Zap,
  TrendingUp,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { useUGCFY } from '@/lib/store';

const creatorMonthlyEarnings = [
  { month: 'Jun', earnings: 42000 },
  { month: 'Jul', earnings: 58000 },
  { month: 'Aug', earnings: 71000 },
  { month: 'Sep', earnings: 63000 },
  { month: 'Oct', earnings: 78000 },
];

export default function CreatorWalletPage() {
  const {
    creatorWallet,
    creatorTransactions,
    withdrawCreatorFunds,
    payoutMethods,
  } = useUGCFY();

  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(25000);
  const [selectedMethod, setSelectedMethod] = useState<'UPI' | 'Direct Bank Transfer (IMPS)'>('UPI');
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = withdrawCreatorFunds(withdrawAmount, selectedMethod);
    if (res.success) {
      setFeedbackMessage({ type: 'success', text: res.message });
      setTimeout(() => {
        setShowWithdrawModal(false);
        setFeedbackMessage(null);
      }, 1200);
    } else {
      setFeedbackMessage({ type: 'error', text: res.message });
    }
  };

  return (
    <DashboardShell>
      <div className="space-y-8 pb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#E8E8EA]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#7456F1] uppercase tracking-wider">Creator Royalties</span>
              <span className="text-xs text-[#E8E8EA]">•</span>
              <span className="text-xs text-[#777780]">Financial Ledger</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#18181B] mt-1">
              Earnings &amp; Payouts
            </h1>
            <p className="text-xs text-[#777780] mt-0.5">
              Automated milestone payouts, deliverable royalties, and immediate bank withdrawals.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowWithdrawModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-[#D7F36B] hover:bg-[#cbf04a] text-[#17171C] shadow-md transition-all cursor-pointer"
            >
              <ArrowDownLeft className="w-4 h-4 stroke-[2.5]" />
              <span>Withdraw to Bank (0% Fee)</span>
            </button>
          </div>
        </div>

        {/* 1. EDITORIAL FINANCIAL DASHBOARD: DARK FEATURED BALANCE CARD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Featured Balance Card */}
          <div className="lg:col-span-6 rounded-2xl bg-[#17171C] text-white border border-[#272730] p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#7456F1]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#D7F36B]/15 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-xs text-[#D7F36B] font-semibold">
                  <Zap className="w-3.5 h-3.5 fill-[#D7F36B]" />
                  Instant UPI &amp; IMPS Settlement
                </span>
                <span className="text-xs text-zinc-400 font-mono">PAN Verified</span>
              </div>

              <div>
                <span className="text-xs text-zinc-400 font-medium">Available to Withdraw</span>
                <p className="text-3xl sm:text-4xl font-bold tracking-tight text-[#D7F36B] mt-1 tabular-nums">
                  ₹{creatorWallet.availableBalance.toLocaleString('en-IN')}
                </p>
                <p className="text-xs text-zinc-300 mt-1 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#168365]" />
                  Verified deliverables approved by brand partners
                </p>
              </div>

              {/* Sub-Metric Panels */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[11px] text-zinc-400 block font-medium">Pending in Escrow</span>
                  <p className="text-lg font-bold text-amber-400 mt-1 tabular-nums">
                    ₹{creatorWallet.pendingEarnings.toLocaleString('en-IN')}
                  </p>
                  <p className="text-[10px] text-zinc-400 mt-0.5">Released upon video sign-off</p>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[11px] text-zinc-400 block font-medium">Total Lifetime Earned</span>
                  <p className="text-lg font-bold text-white mt-1 tabular-nums">
                    ₹{creatorWallet.totalEarnings.toLocaleString('en-IN')}
                  </p>
                  <p className="text-[10px] text-zinc-400 mt-0.5">28 completed campaigns</p>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-5 mt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-zinc-400">Total withdrawn to date: ₹{creatorWallet.totalWithdrawn.toLocaleString('en-IN')}</span>
              <button
                onClick={() => setShowWithdrawModal(true)}
                className="px-3.5 py-1.5 rounded-lg bg-white/15 text-white font-bold text-xs hover:bg-white/20 transition-colors cursor-pointer"
              >
                Withdraw Now
              </button>
            </div>
          </div>

          {/* Earnings Analytics Trajectory Chart */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-[#E8E8EA] p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#F4F4F5]">
                <div>
                  <h3 className="text-sm font-bold text-[#18181B]">Monthly Royalty Trajectory</h3>
                  <p className="text-xs text-[#777780] mt-0.5">Deliverable earnings growth over the past 5 months</p>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#D7F36B] text-[#17171C]">
                  +24% vs Q2
                </span>
              </div>

              <div className="h-60 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={creatorMonthlyEarnings} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="creatorEarningsGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7456F1" stopOpacity={0.25} />
                        <stop offset="100%" stopColor="#7456F1" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F4F4F5" />
                    <XAxis dataKey="month" stroke="#A1A1AA" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#A1A1AA" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
                    <Tooltip
                      formatter={(v: any) => [`₹${Number(v).toLocaleString('en-IN')}`, 'Earned']}
                      contentStyle={{
                        backgroundColor: '#17171C',
                        borderRadius: '8px',
                        color: '#FFFFFF',
                        fontSize: '12px',
                        border: 'none',
                        fontWeight: '600',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="earnings"
                      stroke="#7456F1"
                      strokeWidth={2.5}
                      fill="url(#creatorEarningsGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="pt-3 border-t border-[#F4F4F5] flex items-center justify-between text-xs text-[#777780]">
              <span>Average payout turnaround: 2.4 hours</span>
              <span className="text-[#168365] font-semibold">Instant verification</span>
            </div>
          </div>
        </div>

        {/* 2. SAVED DISBURSEMENT ACCOUNTS & LEDGER TABLE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Payout Destinations */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-[#E8E8EA] p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="pb-3 border-b border-[#F4F4F5]">
                <h3 className="text-sm font-bold text-[#18181B]">Disbursement Accounts</h3>
                <p className="text-xs text-[#777780] mt-0.5">Where your funds get credited</p>
              </div>

              <div className="space-y-3 mt-4">
                {payoutMethods.map((pm) => (
                  <div
                    key={pm.id}
                    className="p-3.5 rounded-xl border border-[#E8E8EA] bg-[#F7F7F5] flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white border border-[#E8E8EA] flex items-center justify-center text-xs font-bold text-[#7456F1]">
                        {pm.type === 'upi' ? <Zap className="w-4 h-4 text-[#7456F1]" /> : <Building className="w-4 h-4 text-[#777780]" />}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#18181B]">
                          {pm.type === 'upi' ? pm.details.upiId : `${pm.details.bankName} (...${pm.details.accountNumber?.slice(-4)})`}
                        </p>
                        <p className="text-[11px] text-[#777780]">{pm.details.beneficiaryName}</p>
                      </div>
                    </div>

                    {pm.isPrimary && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D7F36B] text-[#17171C]">
                        Primary
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#F4F4F5] mt-4">
              <button
                onClick={() => setShowWithdrawModal(true)}
                className="w-full py-2.5 text-xs font-bold rounded-xl bg-[#17171C] hover:bg-[#272730] text-white transition-colors cursor-pointer text-center"
              >
                Withdraw Available ₹{creatorWallet.availableBalance.toLocaleString('en-IN')}
              </button>
            </div>
          </div>

          {/* Transaction Ledger */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E8E8EA] shadow-xs">
            <div className="p-5 border-b border-[#E8E8EA]">
              <h3 className="text-base font-bold text-[#18181B]">Royalty &amp; Payout Records</h3>
              <p className="text-xs text-[#777780] mt-0.5">Verified milestone releases and bank account transfers</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[#E8E8EA] bg-[#F7F7F5] text-[#777780]">
                    <th className="py-3 px-5 font-bold uppercase tracking-wider text-[10px]">Type</th>
                    <th className="py-3 px-5 font-bold uppercase tracking-wider text-[10px]">Reference</th>
                    <th className="py-3 px-5 font-bold uppercase tracking-wider text-[10px]">Description</th>
                    <th className="py-3 px-5 font-bold uppercase tracking-wider text-[10px]">Date</th>
                    <th className="py-3 px-5 font-bold uppercase tracking-wider text-[10px]">Status</th>
                    <th className="py-3 px-5 font-bold uppercase tracking-wider text-[10px] text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F4F4F5]">
                  {creatorTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-[#F7F7F5]/50 transition-colors">
                      <td className="py-3.5 px-5">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            tx.type === 'payout_release'
                              ? 'bg-[#168365]/10 text-[#168365]'
                              : 'bg-purple-100 text-[#7456F1]'
                          }`}
                        >
                          {tx.type === 'payout_release' ? 'Earned' : 'Withdrawal'}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 font-mono text-[11px] text-[#777780]">{tx.id}</td>
                      <td className="py-3.5 px-5 font-semibold text-[#18181B] max-w-xs truncate">
                        {tx.description}
                      </td>
                      <td className="py-3.5 px-5 text-[#777780] whitespace-nowrap">
                        {new Date(tx.createdAt).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="py-3.5 px-5">
                        <span className="inline-flex items-center gap-1 text-[11px] text-[#168365] font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {tx.status}
                        </span>
                      </td>
                      <td
                        className={`py-3.5 px-5 text-right font-bold tabular-nums text-sm ${
                          tx.type === 'payout_release' ? 'text-[#168365]' : 'text-[#18181B]'
                        }`}
                      >
                        {tx.type === 'payout_release' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* WITHDRAW MODAL */}
        {showWithdrawModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl border border-[#E8E8EA] max-w-md w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="absolute top-5 right-5 text-[#777780] hover:text-[#18181B] text-xl font-bold cursor-pointer"
              >
                &times;
              </button>

              <div className="flex items-center gap-2 mb-1 text-xs text-[#168365] font-semibold">
                <Zap className="w-3.5 h-3.5 fill-[#168365]" />
                <span>Instant Bank Disbursement</span>
              </div>
              <h3 className="text-lg font-bold text-[#18181B]">Withdraw to Bank Account</h3>
              <p className="text-xs text-[#777780] mt-0.5">
                Available to withdraw: <strong className="text-[#18181B]">₹{creatorWallet.availableBalance.toLocaleString('en-IN')}</strong>
              </p>

              {feedbackMessage && (
                <div
                  className={`mt-4 p-3 rounded-xl text-xs font-bold ${
                    feedbackMessage.type === 'success'
                      ? 'bg-[#168365]/10 text-[#168365] border border-[#168365]/20'
                      : 'bg-[#DC4C4C]/10 text-[#DC4C4C] border border-[#DC4C4C]/20'
                  }`}
                >
                  {feedbackMessage.text}
                </div>
              )}

              <form onSubmit={handleWithdrawSubmit} className="space-y-4 mt-5">
                <div>
                  <label className="block text-xs font-bold text-[#18181B]">Withdrawal Amount (₹ INR)</label>
                  <div className="mt-1 relative">
                    <span className="absolute left-3 top-2.5 text-xs text-[#777780]">₹</span>
                    <input
                      type="number"
                      step="500"
                      min="500"
                      max={creatorWallet.availableBalance}
                      required
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                      className="w-full text-base font-bold rounded-xl border border-[#E8E8EA] bg-[#F7F7F5] pl-7 pr-3 py-2 text-[#18181B] focus:border-[#7456F1] focus:bg-white focus:outline-none tabular-nums"
                    />
                  </div>

                  <div className="flex gap-2 mt-2">
                    {[5000, 10000, 25000, creatorWallet.availableBalance].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setWithdrawAmount(preset)}
                        className="px-2.5 py-1 rounded-lg border border-[#E8E8EA] bg-[#F7F7F5] text-[11px] font-semibold text-[#18181B] hover:border-[#7456F1] transition-colors cursor-pointer"
                      >
                        ₹{preset.toLocaleString('en-IN')}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#18181B]">Destination Method</label>
                  <div className="space-y-2 mt-1.5">
                    <div
                      onClick={() => setSelectedMethod('UPI')}
                      className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                        selectedMethod === 'UPI'
                          ? 'border-[#7456F1] bg-[#EEE9FF]/40'
                          : 'border-[#E8E8EA] bg-white hover:bg-[#F7F7F5]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#18181B]">Instant UPI Settlement</span>
                        <span className="text-[10px] text-[#168365] font-bold">0% fee</span>
                      </div>
                      <p className="text-[11px] text-[#777780] mt-0.5">ananya.sharma@oksbi • Immediate credit</p>
                    </div>

                    <div
                      onClick={() => setSelectedMethod('Direct Bank Transfer (IMPS)')}
                      className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                        selectedMethod === 'Direct Bank Transfer (IMPS)'
                          ? 'border-[#7456F1] bg-[#EEE9FF]/40'
                          : 'border-[#E8E8EA] bg-white hover:bg-[#F7F7F5]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#18181B]">Direct Bank IMPS</span>
                        <span className="text-[10px] text-[#777780]">Next IMPS batch</span>
                      </div>
                      <p className="text-[11px] text-[#777780] mt-0.5">HDFC Bank (...1234) • IFSC: HDFC0001234</p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#F4F4F5] flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowWithdrawModal(false)}
                    className="px-4 py-2 text-xs font-semibold text-[#777780] hover:text-[#18181B] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#7456F1] hover:bg-[#6343E0] text-white text-xs font-bold shadow-md cursor-pointer"
                  >
                    Confirm Payout (₹{withdrawAmount.toLocaleString('en-IN')})
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
