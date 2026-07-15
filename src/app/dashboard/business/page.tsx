"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
  Briefcase,
  Smartphone,
  ExternalLink,
  Plus,
  RefreshCw,
  Sliders,
  CheckCircle2,
  AlertCircle,
  Database,
  Cpu,
  Trash2,
  Search
} from "lucide-react";

interface FleetCard {
  id: string;
  uid: string;
  owner: string;
  role: string;
  variant: string;
  status: "active" | "provisioning" | "inactive";
  taps: number;
}

export default function BusinessDashboard() {
  const [fleetCards, setFleetCards] = useState<FleetCard[]>([
    { id: "FC-101", uid: "NFC-8089-A1B2", owner: "Elena Rostova", role: "VP of Product", variant: "Titanium Metal", status: "active", taps: 1420 },
    { id: "FC-102", uid: "NFC-7432-X8Y9", owner: "Marcus Vance", role: "Design Director", variant: "Matte Black", status: "active", taps: 680 },
    { id: "FC-103", uid: "NFC-9912-M3N4", owner: "Aria Thorne", role: "Chief of Staff", variant: "Eco Walnut Wood", status: "provisioning", taps: 95 },
    { id: "FC-104", uid: "NFC-1102-K5L6", owner: "Devon Miller", role: "Partner Manager", variant: "Titanium Metal", status: "inactive", taps: 0 },
  ]);

  const [newOwner, setNewOwner] = useState("");
  const [newRole, setNewRole] = useState("");
  const [selectedVariant, setSelectedVariant] = useState("Titanium Metal");
  const [searchQuery, setSearchQuery] = useState("");

  const handleRegisterCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOwner || !newRole) return;

    const newCard: FleetCard = {
      id: `FC-${100 + fleetCards.length + 1}`,
      uid: `NFC-${Math.floor(1000 + Math.random() * 9000)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      owner: newOwner,
      role: newRole,
      variant: selectedVariant,
      status: "provisioning",
      taps: 0,
    };

    setFleetCards([...fleetCards, newCard]);
    setNewOwner("");
    setNewRole("");

    // Simulate provisioning complete after 3 seconds
    const cardId = newCard.id;
    setTimeout(() => {
      setFleetCards(prev =>
        prev.map(card => card.id === cardId ? { ...card, status: "active" } : card)
      );
    }, 3000);
  };

  const handleProvisionAll = () => {
    setFleetCards(prev =>
      prev.map(card => card.status === "inactive" ? { ...card, status: "provisioning" } : card)
    );
    setTimeout(() => {
      setFleetCards(prev =>
        prev.map(card => card.status === "provisioning" ? { ...card, status: "active" } : card)
      );
    }, 2500);
  };

  const handleDeleteCard = (id: string) => {
    setFleetCards(fleetCards.filter(card => card.id !== id));
  };

  const filteredCards = fleetCards.filter(card =>
    card.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
    card.uid.toLowerCase().includes(searchQuery.toLowerCase()) ||
    card.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-8 font-sans">
        {/* Provisioning Control Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Action Card 1: Batch Action */}
          <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between hover:border-brand-pink/20 transition-all duration-300">
            <div>
              <div className="p-3 bg-brand-pink/10 rounded-xl text-brand-pink w-fit mb-4">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg mb-1">Batch Provisioning Array</h3>
              <p className="text-xs text-zinc-500 mb-4">Provision all pending or inactive tags simultaneously in a background script.</p>
            </div>
            <button
              onClick={handleProvisionAll}
              className="w-full py-2.5 bg-brand-pink text-white rounded-xl text-xs font-semibold hover:bg-brand-pink/90 transition-all cursor-pointer shadow-md shadow-brand-pink/20 flex items-center justify-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Initialize Fleet Provisioning
            </button>
          </div>

          {/* Action Card 2: Metrics Summary */}
          <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between hover:border-brand-pink/20 transition-all duration-300">
            <div>
              <div className="p-3 bg-brand-pink/10 rounded-xl text-brand-pink w-fit mb-4">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg mb-1">Fleet Deployment Stats</h3>
              <p className="text-xs text-zinc-500 mb-4">Real-time status updates of physical business tags deployed.</p>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-white/[0.02] p-2 rounded-xl border border-white/5">
                <div className="text-lg font-bold text-white">{fleetCards.length}</div>
                <div className="text-[9px] text-zinc-500 uppercase">Total</div>
              </div>
              <div className="bg-white/[0.02] p-2 rounded-xl border border-white/5">
                <div className="text-lg font-bold text-emerald-400">
                  {fleetCards.filter(c => c.status === "active").length}
                </div>
                <div className="text-[9px] text-zinc-500 uppercase">Active</div>
              </div>
              <div className="bg-white/[0.02] p-2 rounded-xl border border-white/5">
                <div className="text-lg font-bold text-brand-pink">
                  {fleetCards.filter(c => c.status === "provisioning").length}
                </div>
                <div className="text-[9px] text-zinc-500 uppercase">Pending</div>
              </div>
            </div>
          </div>

          {/* Action Card 3: Model Selector Registry */}
          <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between hover:border-brand-pink/20 transition-all duration-300">
            <div>
              <div className="p-3 bg-brand-pink/10 rounded-xl text-brand-pink w-fit mb-4">
                <Sliders className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg mb-1">Variant Hardware Models</h3>
              <p className="text-xs text-zinc-500 mb-3">Model details and availability tags currently in stock.</p>
            </div>
            <div className="space-y-2 text-xs text-zinc-400">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span>Titanium Metal</span>
                <span className="text-white font-medium">14 deployed</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span>Matte Black Metal</span>
                <span className="text-white font-medium">8 deployed</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Eco Walnut Wood</span>
                <span className="text-white font-medium">3 deployed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form and Table Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Add Card Form */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Register New Corporate Card</h3>
            <form onSubmit={handleRegisterCard} className="glass-panel p-6 rounded-2xl space-y-4">
              <div className="space-y-2">
                <label className="block text-xs text-zinc-400 font-semibold uppercase tracking-wider">Owner Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Elena Rostova"
                  value={newOwner}
                  onChange={(e) => setNewOwner(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white/[0.02] border border-white/10 rounded-xl text-sm focus:outline-none focus:border-brand-pink/50 text-white placeholder-zinc-600"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs text-zinc-400 font-semibold uppercase tracking-wider">Corporate Role</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Marketing Lead"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white/[0.02] border border-white/10 rounded-xl text-sm focus:outline-none focus:border-brand-pink/50 text-white placeholder-zinc-600"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs text-zinc-400 font-semibold uppercase tracking-wider">NFC Model Variant</label>
                <select
                  value={selectedVariant}
                  onChange={(e) => setSelectedVariant(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#0a0a0a] border border-white/10 rounded-xl text-sm focus:outline-none focus:border-brand-pink/50 text-white"
                >
                  <option value="Titanium Metal">Titanium Metal (Premium)</option>
                  <option value="Matte Black">Matte Black (Classic)</option>
                  <option value="Eco Walnut Wood">Eco Walnut Wood (Sustainable)</option>
                  <option value="Custom Gold">Custom Gold (Elite)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-pink/30 text-white text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4 text-brand-pink" /> Register & Begin Provisioning
              </button>
            </form>
          </div>

          {/* Right: Fleet Cards Table */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h3 className="text-lg font-bold">Dynamic Card Fleet Registry</h3>
              
              {/* Search Bar */}
              <div className="relative max-w-xs w-full">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search fleet by owner or UID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white/[0.02] border border-white/10 rounded-xl text-xs focus:outline-none focus:border-brand-pink/50 text-white placeholder-zinc-600"
                />
              </div>
            </div>

            {/* STRICT MOBILE RESPONSIVE OPTIMIZATION RULE: Table Wrapper with overflow-x-auto */}
            <div className="w-full overflow-x-auto rounded-xl border border-white/5 bg-black/20">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-white/5 bg-white/[0.02]">
                    <th className="py-4 px-6 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Device ID</th>
                    <th className="py-4 px-6 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Card Owner / Role</th>
                    <th className="py-4 px-6 text-xs font-semibold text-zinc-400 uppercase tracking-wider">NFC UID Code</th>
                    <th className="py-4 px-6 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Model Variant</th>
                    <th className="py-4 px-6 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Provision Status</th>
                    <th className="py-4 px-6 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Taps</th>
                    <th className="py-4 px-6 text-xs font-semibold text-zinc-400 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredCards.map((card) => (
                    <tr key={card.id} className="hover:bg-white/[0.01] transition-colors group">
                      <td className="py-4 px-6 text-sm font-semibold text-zinc-300 group-hover:text-brand-pink transition-colors">
                        {card.id}
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-semibold text-white text-sm">{card.owner}</div>
                        <div className="text-zinc-500 text-xs">{card.role}</div>
                      </td>
                      <td className="py-4 px-6 text-sm font-mono text-zinc-400">{card.uid}</td>
                      <td className="py-4 px-6 text-sm text-zinc-400">{card.variant}</td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                            card.status === "active"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : card.status === "provisioning"
                              ? "bg-brand-pink/10 text-brand-pink border border-brand-pink/20"
                              : "bg-zinc-800 text-zinc-500 border border-zinc-700"
                          }`}
                        >
                          {card.status === "active" && <CheckCircle2 className="w-3.5 h-3.5" />}
                          {card.status === "provisioning" && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                          {card.status === "inactive" && <AlertCircle className="w-3.5 h-3.5" />}
                          <span className="capitalize">{card.status}</span>
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-white font-mono">{card.taps}</td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => handleDeleteCard(card.id)}
                          className="p-2 rounded bg-white/5 hover:bg-rose-500/10 hover:text-rose-400 text-zinc-400 transition-colors border border-transparent hover:border-rose-500/20 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredCards.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-zinc-500 text-sm">
                        No corporate fleet records matched the current criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
