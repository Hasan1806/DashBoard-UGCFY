'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Wallet,
  ArrowUpRight,
  Plus,
  Download,
  Calendar,
  Search,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowDownLeft,
  Zap,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { useUGCFY } from '@/lib/store';
import { WalletTransaction } from '@/types';

const campaignSpendBreakdown = [
  { name: 'Niacinamide Serum', spend: 180000 },
  { name: 'boAt Space ANC', spend: 250000 },
  { name: 'Sleepy Owl Cold Brew', spend: 120000 },
  { name: 'Hair Peptide Mask', spend: 140000 },
];

export default function BrandWalletPage() {
  const { brandWallet, brandTransactions, addBrandFunds, currentBrand } = useUGCFY();

  const [showAddFundsModal, setShowAddFundsModal] = useState(false);
  const [topupAmount, setTopupAmount] = useState<number>(100000);
  const [paymentMethod, setPaymentMethod] = useState<'Corporate Net Banking' | 'UPI Auto-Collect' | 'Corporate Credit Card'>('UPI Auto-Collect');
  const [selectedInvoice, setSelectedInvoice] = useState<WalletTransaction | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = brandTransactions.filter((tx) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      tx.id.toLowerCase().includes(q) ||
      tx.description.toLowerCase().includes(q) ||
      (tx.invoiceNo && tx.invoiceNo.toLowerCase().includes(q))
    );
  });

  const handleAddFundsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addBrandFunds(topupAmount, paymentMethod);
    setShowAddFundsModal(false);
  };

  const handleExportCSV = () => {
    const headers = ['Transaction ID,Type,Amount (INR),Status,Description,Invoice No,Date'];
    const rows = brandTransactions.map(
      (tx) =>
        `${tx.id},${tx.type},${tx.amount},${tx.status},"${tx.description}",${tx.invoiceNo || 'N/A'},${tx.createdAt}`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `UGCFY_Brand_Ledger_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DashboardShell>
      <div className="space-y-8 pb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 gap-4 border-b border-[#E8E8EA]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#7456F1] uppercase tracking-wider">Financial Suite</span>
              <span className="text-xs text-[#E8E8EA]">•</span>
              <span className="text-xs text-[#777780]">INR Escrow &amp; Tax Compliance</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#18181B] tracking-tight mt-1">
              Escrow Ledger &amp; Billing
            </h1>
            <p className="text-xs text-[#777780] mt-0.5">
              Automated milestone escrow accounts, verified creator disbursement records, and GST credit invoices.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#E8E8EA] bg-white text-xs font-semibold text-[#18181B] hover:bg-[#F7F7F5] transition-colors cursor-pointer shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => setShowAddFundsModal(true)}
              className="flex items-center gap-2 bg-[#7456F1] hover:bg-[#6343E0] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Add Escrow Funds</span>
            </button>
          </div>
        </div>

        {/* 1. EDITORIAL FINANCIAL DASHBOARD: DARK FEATURED BALANCE CARD + SPENDING ANALYTICS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Premium Dark Featured Balance Card */}
          <div className="lg:col-span-6 rounded-2xl bg-[#17171C] text-white border border-[#272730] p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#7456F1]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#D7F36B]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-xs text-[#D7F36B] font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  100% RBI Compliant Escrow
                </span>
                <span className="text-xs text-zinc-400 font-mono">GSTIN: {currentBrand.billingInfo.gstin}</span>
              </div>

              <div>
                <span className="text-xs text-zinc-400 font-medium">Available Operating Balance</span>
                <p className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-1 tabular-nums">
                  ₹{brandWallet.availableBalance.toLocaleString('en-IN')}
                </p>
                <p className="text-xs text-[#D7F36B] mt-1 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Available for immediate campaign allocation
                </p>
              </div>

              {/* Dual Financial Sub-Panels */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[11px] text-zinc-400 block font-medium">Reserved in Escrow</span>
                  <p className="text-lg font-bold text-white mt-1 tabular-nums">
                    ₹{brandWallet.reservedBudget.toLocaleString('en-IN')}
                  </p>
                  <p className="text-[10px] text-zinc-400 mt-0.5">Held for ongoing creator milestones</p>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[11px] text-zinc-400 block font-medium">Lifetime Campaign Spend</span>
                  <p className="text-lg font-bold text-white mt-1 tabular-nums">
                    ₹{brandWallet.totalSpending.toLocaleString('en-IN')}
                  </p>
                  <p className="text-[10px] text-zinc-400 mt-0.5">Across 14 completed briefs</p>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-5 mt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-zinc-400">Next settlement cycle: Automatic weekly batch</span>
              <button
                onClick={() => setShowAddFundsModal(true)}
                className="px-3.5 py-1.5 rounded-lg bg-[#D7F36B] text-[#17171C] font-bold text-xs hover:bg-[#cbf04a] transition-colors cursor-pointer"
              >
                Top up Escrow
              </button>
            </div>
          </div>

          {/* Spending Analytics Chart */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-[#E8E8EA] p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#F4F4F5]">
                <div>
                  <h3 className="text-sm font-bold text-[#18181B]">Committed Escrow by Campaign</h3>
                  <p className="text-xs text-[#777780] mt-0.5">Live allocation across active production briefs</p>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#EEE9FF] text-[#7456F1]">
                  Active Briefs
                </span>
              </div>

              <div className="h-60 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={campaignSpendBreakdown} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F4F4F5" />
                    <XAxis dataKey="name" stroke="#A1A1AA" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis
                      stroke="#A1A1AA"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(v) => `₹${v / 1000}k`}
                    />
                    <Tooltip
                      formatter={(v: any) => [`₹${Number(v).toLocaleString('en-IN')}`, 'Allocated Budget']}
                      contentStyle={{
                        backgroundColor: '#17171C',
                        borderRadius: '8px',
                        border: 'none',
                        color: '#FFFFFF',
                        fontSize: '12px',
                        fontWeight: '600',
                      }}
                    />
                    <Bar dataKey="spend" fill="#7456F1" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="pt-3 border-t border-[#F4F4F5] flex items-center justify-between text-xs text-[#777780]">
              <span>Tax invoice available for all milestone deductions</span>
              <Link href="/brand/profile" className="text-[#7456F1] font-semibold hover:underline">
                View Tax Profile &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* 2. TRANSACTION LEDGER TABLE WITH SEARCH & INVOICE PREVIEW */}
        <div className="bg-white rounded-2xl border border-[#E8E8EA] shadow-xs">
          <div className="p-5 border-b border-[#E8E8EA] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-[#18181B]">Disbursement Ledger &amp; Tax Receipts</h3>
              <p className="text-xs text-[#777780] mt-0.5">Auditable record of wallet top-ups, milestone holds, and creator payouts</p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-[#777780] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search transaction or invoice..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-xs rounded-lg border border-[#E8E8EA] bg-[#F7F7F5] pl-8 pr-3 py-1.5 text-[#18181B] focus:border-[#7456F1] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#E8E8EA] bg-[#F7F7F5] text-[#777780]">
                  <th className="py-3 px-5 font-bold uppercase tracking-wider text-[10px]">Reference</th>
                  <th className="py-3 px-5 font-bold uppercase tracking-wider text-[10px]">Type</th>
                  <th className="py-3 px-5 font-bold uppercase tracking-wider text-[10px]">Description</th>
                  <th className="py-3 px-5 font-bold uppercase tracking-wider text-[10px]">Date</th>
                  <th className="py-3 px-5 font-bold uppercase tracking-wider text-[10px]">Status</th>
                  <th className="py-3 px-5 font-bold uppercase tracking-wider text-[10px] text-right">Amount (INR)</th>
                  <th className="py-3 px-5 font-bold uppercase tracking-wider text-[10px] text-center">Tax Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F4F4F5]">
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-[#F7F7F5]/50 transition-colors">
                    <td className="py-3.5 px-5 font-mono text-[11px] text-[#777780]">{tx.id}</td>
                    <td className="py-3.5 px-5">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          tx.type === 'deposit'
                            ? 'bg-[#168365]/10 text-[#168365]'
                            : tx.type === 'escrow_hold'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-zinc-100 text-zinc-700'
                        }`}
                      >
                        {tx.type.replace('_', ' ')}
                      </span>
                    </td>
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
                        tx.type === 'deposit' ? 'text-[#168365]' : 'text-[#18181B]'
                      }`}
                    >
                      {tx.type === 'deposit' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-5 text-center">
                      {tx.invoiceNo ? (
                        <button
                          onClick={() => setSelectedInvoice(tx)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold text-[#7456F1] bg-[#EEE9FF] hover:bg-[#7456F1] hover:text-white transition-colors cursor-pointer"
                        >
                          <FileText className="w-3 h-3" />
                          <span>{tx.invoiceNo}</span>
                        </button>
                      ) : (
                        <span className="text-[#A1A1AA] text-[11px]">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* TOP-UP MODAL */}
        {showAddFundsModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl border border-[#E8E8EA] max-w-md w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
              <button
                onClick={() => setShowAddFundsModal(false)}
                className="absolute top-5 right-5 text-[#777780] hover:text-[#18181B] text-xl font-bold cursor-pointer"
              >
                &times;
              </button>

              <div className="flex items-center gap-2 mb-1 text-xs text-[#7456F1] font-semibold">
                <Zap className="w-3.5 h-3.5" />
                <span>Instant Escrow Funding</span>
              </div>
              <h3 className="text-lg font-bold text-[#18181B]">Add Funds to Escrow Balance</h3>
              <p className="text-xs text-[#777780] mt-0.5">
                Funds are immediately credited to lock creators for your active campaigns.
              </p>

              <form onSubmit={handleAddFundsSubmit} className="space-y-4 mt-5">
                <div>
                  <label className="block text-xs font-bold text-[#18181B]">Amount (₹ INR)</label>
                  <div className="mt-1 relative">
                    <span className="absolute left-3 top-2.5 text-xs text-[#777780]">₹</span>
                    <input
                      type="number"
                      step="5000"
                      min="10000"
                      required
                      value={topupAmount}
                      onChange={(e) => setTopupAmount(Number(e.target.value))}
                      className="w-full text-base font-bold rounded-xl border border-[#E8E8EA] bg-[#F7F7F5] pl-7 pr-3 py-2 text-[#18181B] focus:border-[#7456F1] focus:bg-white focus:outline-none tabular-nums"
                    />
                  </div>

                  {/* Preset amounts */}
                  <div className="flex gap-2 mt-2">
                    {[25000, 50000, 100000, 250000].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setTopupAmount(amt)}
                        className="px-2.5 py-1 rounded-lg border border-[#E8E8EA] bg-[#F7F7F5] text-[11px] font-semibold text-[#18181B] hover:border-[#7456F1] transition-colors cursor-pointer"
                      >
                        ₹{(amt / 1000).toLocaleString()}k
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#18181B]">Corporate Payment Rail</label>
                  <div className="space-y-2 mt-1.5 text-xs">
                    {[
                      { id: 'UPI Auto-Collect', label: 'UPI Instant Mandate / QR', desc: '0% fee • Immediate escrow confirmation' },
                      { id: 'Corporate Net Banking', label: 'Corporate Net Banking (NEFT/RTGS)', desc: 'HDFC, ICICI, Axis, SBI commercial accounts' },
                      { id: 'Corporate Credit Card', label: 'Corporate Card / Amex', desc: 'Instant charge with automatic GST invoice receipt' },
                    ].map((opt) => (
                      <div
                        key={opt.id}
                        onClick={() => setPaymentMethod(opt.id as any)}
                        className={`p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                          paymentMethod === opt.id
                            ? 'border-[#7456F1] bg-[#EEE9FF]/30'
                            : 'border-[#E8E8EA] bg-white hover:bg-[#F7F7F5]'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold text-[#18181B]">
                          <span>{opt.label}</span>
                          {paymentMethod === opt.id && <span className="text-[#7456F1]">✓</span>}
                        </div>
                        <p className="text-[11px] text-[#777780] mt-0.5">{opt.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#F4F4F5] flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddFundsModal(false)}
                    className="px-4 py-2 text-xs font-semibold text-[#777780] hover:text-[#18181B] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#7456F1] hover:bg-[#6343E0] text-white text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Deposit ₹{topupAmount.toLocaleString('en-IN')}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* GST TAX INVOICE VIEWER MODAL */}
        {selectedInvoice && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl border border-[#E8E8EA] max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-xs animate-in fade-in zoom-in-95 duration-150">
              <button
                onClick={() => setSelectedInvoice(null)}
                className="absolute top-5 right-5 text-[#777780] hover:text-[#18181B] text-xl font-bold cursor-pointer"
              >
                &times;
              </button>

              <div className="flex items-center justify-between pb-4 border-b border-[#E8E8EA]">
                <div>
                  <h3 className="text-base font-bold text-[#18181B]">Tax Invoice Receipt</h3>
                  <p className="text-xs font-mono text-[#7456F1] font-semibold">{selectedInvoice.invoiceNo}</p>
                </div>
                <span className="px-2.5 py-1 rounded bg-[#168365]/10 text-[#168365] font-bold text-[10px] uppercase">
                  PAID &amp; SETTLED
                </span>
              </div>

              <div className="space-y-4 my-5">
                <div className="grid grid-cols-2 gap-4 p-3.5 rounded-xl bg-[#F7F7F5] border border-[#E8E8EA]">
                  <div>
                    <span className="text-[10px] text-[#777780] uppercase font-bold">Billed To (Brand)</span>
                    <p className="font-bold text-[#18181B] mt-0.5">{currentBrand.companyName}</p>
                    <p className="text-[11px] text-[#777780]">GSTIN: {currentBrand.billingInfo.gstin}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#777780] uppercase font-bold">Issuer</span>
                    <p className="font-bold text-[#18181B] mt-0.5">UGCFY Technologies India Pvt Ltd</p>
                    <p className="text-[11px] text-[#777780]">GSTIN: 27AABCT9988Z1Z0</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between py-1 border-b border-[#F4F4F5]">
                    <span className="text-[#777780]">Line Item</span>
                    <span className="font-semibold text-[#18181B]">{selectedInvoice.description}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#F4F4F5]">
                    <span className="text-[#777780]">Date</span>
                    <span className="font-semibold text-[#18181B]">{selectedInvoice.createdAt}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#F4F4F5]">
                    <span className="text-[#777780]">Subtotal</span>
                    <span className="font-semibold text-[#18181B] tabular-nums">
                      ₹{Math.round(selectedInvoice.amount / 1.18).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#F4F4F5]">
                    <span className="text-[#777780]">IGST / CGST (18%)</span>
                    <span className="font-semibold text-[#18181B] tabular-nums">
                      ₹{(selectedInvoice.amount - Math.round(selectedInvoice.amount / 1.18)).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 text-sm font-bold text-[#18181B]">
                    <span>Total Amount Charged</span>
                    <span className="tabular-nums">₹{selectedInvoice.amount.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8E8EA] flex items-center justify-end">
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="px-4 py-2 rounded-xl bg-[#17171C] text-white text-xs font-semibold hover:bg-[#272730] cursor-pointer"
                >
                  Close Receipt
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
