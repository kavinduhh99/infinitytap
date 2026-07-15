"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
  DollarSign,
  Users,
  CreditCard,
  TrendingUp,
  Clock,
  Plus,
  X,
  CheckCircle2
} from "lucide-react";

interface Transaction {
  id: string;
  client: string;
  cardType: string;
  amount: string;
  status: "completed" | "pending" | "failed";
  date: string;
}

export default function AdminDashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: "TX-1001", client: "Elena Rostova", cardType: "Titanium Metal", amount: "$349.00", status: "completed", date: "2026-07-15" },
    { id: "TX-1002", client: "Marcus Vance", cardType: "Matte Black", amount: "$129.00", status: "completed", date: "2026-07-14" },
    { id: "TX-1003", client: "Aria Thorne", cardType: "Eco Walnut Wood", amount: "$149.00", status: "pending", date: "2026-07-14" },
    { id: "TX-1004", client: "Devon Miller", cardType: "Titanium Metal", amount: "$349.00", status: "completed", date: "2026-07-13" },
    { id: "TX-1005", client: "Sienna Brooks", cardType: "Matte Black", amount: "$129.00", status: "failed", date: "2026-07-12" },
  ]);

  const handleSimulateTransaction = () => {
    const newTx: Transaction = {
      id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
      client: "New Customer",
      cardType: "Titanium Metal",
      amount: "$349.00",
      status: "completed",
      date: new Date().toISOString().split("T")[0],
    };
    setTransactions([newTx, ...transactions]);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 font-sans">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Stat Card 1 */}
          <div className="glass-panel glass-panel-hover p-6 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-violet to-brand-pink opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-brand-violet/10 rounded-xl text-brand-violet">
                <DollarSign className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +14.2%
              </span>
            </div>
            <div className="text-zinc-400 text-sm font-medium mb-1">Total System Revenue</div>
            <div className="text-3xl font-extrabold tracking-tight">$42,950.50</div>
            <div className="text-xs text-zinc-500 mt-2">from 280 payments this month</div>
          </div>

          {/* Stat Card 2 */}
          <div className="glass-panel glass-panel-hover p-6 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-violet to-brand-pink opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-brand-violet/10 rounded-xl text-brand-violet">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +8.9%
              </span>
            </div>
            <div className="text-zinc-400 text-sm font-medium mb-1">Active Network Users</div>
            <div className="text-3xl font-extrabold tracking-tight">12,480</div>
            <div className="text-xs text-zinc-500 mt-2">1.2k profiles added this week</div>
          </div>

          {/* Stat Card 3 */}
          <div className="glass-panel glass-panel-hover p-6 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-violet to-brand-pink opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-brand-violet/10 rounded-xl text-brand-violet">
                <CreditCard className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Clock className="w-3 h-3" /> 24 Pending
              </span>
            </div>
            <div className="text-zinc-400 text-sm font-medium mb-1">Smart Cards Shipped</div>
            <div className="text-3xl font-extrabold tracking-tight">8,104</div>
            <div className="text-xs text-zinc-500 mt-2">Titanium & Wood variants lead</div>
          </div>
        </div>

        {/* Table Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold">Recent Marketplace Transactions</h3>
              <p className="text-sm text-zinc-400">Review, approve, and track client card custom orders</p>
            </div>
            <button
              onClick={handleSimulateTransaction}
              className="px-4 py-2 rounded-lg bg-brand-violet text-white text-xs font-semibold hover:bg-brand-violet/95 transition-all duration-300 flex items-center gap-1.5 shadow-md shadow-brand-violet/20 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Simulate Transaction
            </button>
          </div>

          {/* STRICT MOBILE RESPONSIVE OPTIMIZATION RULE: Table Wrapper with overflow-x-auto */}
          <div className="w-full overflow-x-auto rounded-xl border border-white/5 bg-black/20">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="py-4 px-6 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Transaction ID</th>
                  <th className="py-4 px-6 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Client Name</th>
                  <th className="py-4 px-6 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Card Variant</th>
                  <th className="py-4 px-6 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Amount Paid</th>
                  <th className="py-4 px-6 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Status</th>
                  <th className="py-4 px-6 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Checkout Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-white/[0.01] transition-colors group">
                    <td className="py-4 px-6 text-sm font-semibold text-zinc-300 group-hover:text-brand-violet transition-colors">
                      {tx.id}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-white">{tx.client}</td>
                    <td className="py-4 px-6 text-sm text-zinc-400">{tx.cardType}</td>
                    <td className="py-4 px-6 text-sm font-semibold text-white">{tx.amount}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                          tx.status === "completed"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : tx.status === "pending"
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                        }`}
                      >
                        {tx.status === "completed" && <CheckCircle2 className="w-3.5 h-3.5" />}
                        {tx.status === "pending" && <Clock className="w-3.5 h-3.5 animate-spin" />}
                        {tx.status === "failed" && <X className="w-3.5 h-3.5" />}
                        <span className="capitalize">{tx.status}</span>
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-zinc-500">{tx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
