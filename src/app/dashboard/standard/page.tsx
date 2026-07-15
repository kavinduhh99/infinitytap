"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
  Activity,
  User,
  Settings,
  ShieldCheck,
  TrendingUp,
  Link2,
  Save,
  Globe,
  Mail,
  ChevronRight
} from "lucide-react";

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function StandardDashboard() {
  // Telemetry chart mock dataset
  const weeklyData = [
    { day: "Mon", taps: 24 },
    { day: "Tue", taps: 38 },
    { day: "Wed", taps: 45 },
    { day: "Thu", taps: 67 },
    { day: "Fri", taps: 92 },
    { day: "Sat", taps: 54 },
    { day: "Sun", taps: 22 },
  ];

  const maxTaps = Math.max(...weeklyData.map(d => d.taps));

  // Profile configuration state
  const [profile, setProfile] = useState({
    name: "Kavindu Herath",
    title: "Engineering Lead",
    company: "Infinity Tap Systems",
    directLink: "https://infinitytap.com/kavindu",
    linkedin: "linkedin.com/in/kavindu-herath",
    fallbackEmail: "kavindu@infinitytap.com",
    offlineRedirect: true,
    tapAction: "portfolio",
  });

  const [isSavedAlert, setIsSavedAlert] = useState(false);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavedAlert(true);
    setTimeout(() => setIsSavedAlert(false), 3000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 font-sans">
        {/* Top: Interaction bar metrics and Weekly Telemetry Chart split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Interaction Bar Metrics */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Activity className="w-5 h-5 text-brand-cyan" />
              <span>Personal Interaction Metrics</span>
            </h3>
            
            <div className="glass-panel p-6 rounded-2xl space-y-5">
              {/* Progress 1 */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-zinc-400">Monthly Card Taps</span>
                  <span className="text-brand-cyan font-mono">342 / 500</span>
                </div>
                <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-brand-cyan h-full transition-all duration-500" style={{ width: "68.4%" }} />
                </div>
              </div>

              {/* Progress 2 */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-zinc-400">Contact Downloads</span>
                  <span className="text-brand-cyan font-mono">180 / 250</span>
                </div>
                <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-brand-cyan h-full transition-all duration-500" style={{ width: "72%" }} />
                </div>
              </div>

              {/* Progress 3 */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-zinc-400">Portfolio Clicks</span>
                  <span className="text-brand-cyan font-mono">112 / 150</span>
                </div>
                <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-brand-cyan h-full transition-all duration-500" style={{ width: "74.6%" }} />
                </div>
              </div>

              {/* Progress 4 */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-zinc-400">Active Campaign Leads</span>
                  <span className="text-brand-cyan font-mono">42 / 60</span>
                </div>
                <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-brand-cyan h-full transition-all duration-500" style={{ width: "70%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Weekly Telemetry Chart (Custom SVG bar chart) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-brand-cyan" />
                <span>Weekly Telemetry Scan Analytics</span>
              </h3>
              <span className="text-[10px] text-zinc-500 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                Past 7 Days
              </span>
            </div>

            <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between h-[235px]">
              {/* Telemetry Chart Graphic SVG */}
              <div className="w-full flex-1 flex items-end justify-between px-4 pb-2 pt-4 relative">
                {/* Horizontal reference lines */}
                <div className="absolute left-0 right-0 top-1/4 border-t border-white/[0.03]" />
                <div className="absolute left-0 right-0 top-2/4 border-t border-white/[0.03]" />
                <div className="absolute left-0 right-0 top-3/4 border-t border-white/[0.03]" />

                {weeklyData.map((data, index) => {
                  const pctHeight = (data.taps / maxTaps) * 100;
                  return (
                    <div key={data.day} className="flex flex-col items-center flex-1 group z-10">
                      <div className="text-[10px] text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity font-mono mb-1">
                        {data.taps} taps
                      </div>
                      
                      {/* Interactive Bar */}
                      <div 
                        style={{ height: `${pctHeight * 1.1}px` }} 
                        className="w-8 sm:w-10 max-h-[120px] rounded-t-lg bg-gradient-to-t from-brand-cyan/20 to-brand-cyan border border-brand-cyan/30 hover:to-indigo-400 hover:from-brand-cyan/40 transition-all duration-300 relative"
                      >
                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 bg-brand-cyan rounded-t-lg filter blur-md opacity-0 group-hover:opacity-30 transition-opacity" />
                      </div>

                      <span className="text-xs text-zinc-500 font-semibold mt-2">{data.day}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Settings Panel and Profile preview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Settings form */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Settings className="w-5 h-5 text-brand-cyan" />
              <span>Target Profile Settings</span>
            </h3>

            <form onSubmit={handleProfileSave} className="glass-panel p-6 rounded-2xl space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs text-zinc-400 font-semibold uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    required
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white/[0.02] border border-white/10 rounded-xl text-sm focus:outline-none focus:border-brand-cyan/50 text-white placeholder-zinc-600"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs text-zinc-400 font-semibold uppercase tracking-wider">Job Title</label>
                  <input
                    type="text"
                    required
                    value={profile.title}
                    onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white/[0.02] border border-white/10 rounded-xl text-sm focus:outline-none focus:border-brand-cyan/50 text-white placeholder-zinc-600"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs text-zinc-400 font-semibold uppercase tracking-wider">Company</label>
                  <input
                    type="text"
                    required
                    value={profile.company}
                    onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white/[0.02] border border-white/10 rounded-xl text-sm focus:outline-none focus:border-brand-cyan/50 text-white placeholder-zinc-600"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs text-zinc-400 font-semibold uppercase tracking-wider">Fallback Redirect Email</label>
                  <input
                    type="email"
                    required
                    value={profile.fallbackEmail}
                    onChange={(e) => setProfile({ ...profile, fallbackEmail: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white/[0.02] border border-white/10 rounded-xl text-sm focus:outline-none focus:border-brand-cyan/50 text-white placeholder-zinc-600"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/5">
                <div className="space-y-2">
                  <label className="block text-xs text-zinc-400 font-semibold uppercase tracking-wider">Redirect Links</label>
                  
                  <div className="relative">
                    <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="text"
                      value={profile.directLink}
                      onChange={(e) => setProfile({ ...profile, directLink: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-white/[0.02] border border-white/10 rounded-xl text-sm focus:outline-none focus:border-brand-cyan/50 text-white placeholder-zinc-600"
                    />
                  </div>

                  <div className="relative">
                    <LinkedInIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="text"
                      value={profile.linkedin}
                      onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-white/[0.02] border border-white/10 rounded-xl text-sm focus:outline-none focus:border-brand-cyan/50 text-white placeholder-zinc-600"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setProfile({ ...profile, offlineRedirect: !profile.offlineRedirect })}
                    className={`w-10 h-6 rounded-full transition-colors flex items-center p-0.5 ${
                      profile.offlineRedirect ? "bg-brand-cyan" : "bg-zinc-800"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white transition-transform ${
                        profile.offlineRedirect ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </button>
                  <div>
                    <span className="text-xs font-semibold block">Enable Lead Form Redirection</span>
                    <span className="text-[10px] text-zinc-500 block">Triggers direct details submission form</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-brand-cyan text-[#030303] text-xs font-bold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-1.5 shadow-md shadow-brand-cyan/20 cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Save Target Config
                </button>
              </div>

              {isSavedAlert && (
                <div className="p-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl text-xs font-semibold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  Target redirect parameters updated successfully.
                </div>
              )}
            </form>
          </div>

          {/* Profile card preview */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Personal Profile Card</h3>
            <div className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center text-center">
              {/* Premium Card Graphic */}
              <div className="w-full max-w-[240px] aspect-[1.586/1] rounded-xl bg-gradient-to-tr from-[#121212] via-[#242424] to-[#0c0c0c] border border-white/10 p-4 flex flex-col justify-between relative overflow-hidden shadow-2xl group cursor-pointer mb-6">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-cyan/5 rounded-full blur-2xl group-hover:bg-brand-cyan/15 transition-all duration-500" />
                
                <div className="flex justify-between items-start">
                  <span className="text-[10px] tracking-widest font-mono text-zinc-500">INFINITY TAP</span>
                  <div className="w-5 h-5 rounded-full bg-brand-cyan/10 flex items-center justify-center text-brand-cyan border border-brand-cyan/20">
                    <User className="w-3 h-3" />
                  </div>
                </div>

                <div className="text-left mt-4">
                  <div className="text-sm font-bold tracking-wide">{profile.name}</div>
                  <div className="text-[10px] text-zinc-500">{profile.title} at {profile.company}</div>
                </div>

                <div className="flex justify-between items-center mt-3 pt-2 border-t border-white/5 text-[9px] text-zinc-500 font-mono">
                  <span>ID: 8089-NFC</span>
                  <span>ACTIVE</span>
                </div>
              </div>

              {/* Dynamic Information Display */}
              <div className="w-full space-y-3 text-xs text-left">
                <div className="flex items-center gap-2 text-zinc-400 bg-white/[0.01] border border-white/5 p-2 rounded-xl">
                  <Globe className="w-4 h-4 text-brand-cyan flex-shrink-0" />
                  <span className="truncate">{profile.directLink}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400 bg-white/[0.01] border border-white/5 p-2 rounded-xl">
                  <LinkedInIcon className="w-4 h-4 text-brand-cyan flex-shrink-0" />
                  <span className="truncate">{profile.linkedin}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400 bg-white/[0.01] border border-white/5 p-2 rounded-xl">
                  <Mail className="w-4 h-4 text-brand-cyan flex-shrink-0" />
                  <span className="truncate">{profile.fallbackEmail}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
