"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Infinity as InfinityIcon,
  LogOut,
  Users,
  ShoppingBag,
  DollarSign,
  Settings,
  Database,
  Cpu,
  Activity,
  Sliders,
  User,
  TrendingUp,
  Truck,
  Lock
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

type Role = "admin" | "business" | "standard";

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Extract active role based on current path
  let activeRole: Role = "admin";
  if (pathname.includes("/dashboard/business")) {
    activeRole = "business";
  } else if (pathname.includes("/dashboard/standard")) {
    activeRole = "standard";
  }

  const getRoleTheme = (role: Role) => {
    switch (role) {
      case "admin":
        return {
          color: "text-brand-violet",
          bg: "bg-brand-violet/10",
          border: "border-brand-violet/20",
          gradient: "from-brand-violet/20 to-purple-950/20",
          accent: "#8b5cf6",
        };
      case "business":
        return {
          color: "text-brand-pink",
          bg: "bg-brand-pink/10",
          border: "border-brand-pink/20",
          gradient: "from-brand-pink/20 to-rose-950/20",
          accent: "#ec4899",
        };
      case "standard":
        return {
          color: "text-brand-cyan",
          bg: "bg-brand-cyan/10",
          border: "border-brand-cyan/20",
          gradient: "from-brand-cyan/20 to-teal-950/20",
          accent: "#06b6d4",
        };
    }
  };

  const currentTheme = getRoleTheme(activeRole);

  // Isolated matrix mapping navigation nodes explicitly by active role bounds
  const navigationMatrix: Record<Role, { name: string; icon: React.ComponentType<any> }[]> = {
    admin: [
      { name: "Platform Users", icon: Users },
      { name: "Marketplace Orders", icon: ShoppingBag },
      { name: "Financial Audits", icon: DollarSign },
      { name: "System Settings", icon: Settings },
    ],
    business: [
      { name: "Fleet Registry", icon: Database },
      { name: "Provision Core", icon: Cpu },
      { name: "Scan Matrix", icon: Activity },
      { name: "Gateway Triggers", icon: Sliders },
    ],
    standard: [
      { name: "Personal Profile", icon: User },
      { name: "Tap Metrics", icon: TrendingUp },
      { name: "Shipping Tracker", icon: Truck },
      { name: "Security Vault", icon: Lock },
    ],
  };

  const sidebarContent = (
    <div className="flex-1 flex flex-col justify-between h-full">
      <div>
        <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4 px-2">
          {activeRole === "admin" && "Platform Operations"}
          {activeRole === "business" && "Corporate Actions"}
          {activeRole === "standard" && "Personal Space"}
        </div>
        
        <div className="space-y-2">
          {navigationMatrix[activeRole].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] text-zinc-300 hover:text-white transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-zinc-400 group-hover:scale-105 transition-transform" style={{ color: currentTheme.accent }} />
                  <span className="text-sm font-semibold">{item.name}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-6 border-t border-white/5 space-y-4">
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center">
          <div className="text-xs text-zinc-400 mb-1">Signed in as</div>
          <div className="font-semibold text-xs truncate">
            {activeRole === "admin" && "admin@infinitytap.com"}
            {activeRole === "business" && "partner@infinityloop.io"}
            {activeRole === "standard" && "user@shopx.lk"}
          </div>
          <div className="text-[10px] text-zinc-500 capitalize mt-1.5 px-2 py-0.5 bg-white/5 rounded-full inline-block">
            {activeRole} console
          </div>
        </div>

        <button
          onClick={() => {
            setIsMobileMenuOpen(false);
            router.push("/login");
          }}
          className="w-full flex items-center justify-center gap-2 py-3 border border-white/5 bg-white/[0.01] hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/20 text-xs font-semibold rounded-xl text-zinc-400 transition-all duration-300 cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Exit Simulator</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#030303] text-white flex flex-col md:flex-row relative font-sans">
      {/* -------------------- SIDEBAR -------------------- */}
      {/* Desktop Sidebar (Left Rail) */}
      <aside className="hidden md:flex md:w-64 lg:w-72 flex-col fixed inset-y-0 left-0 glass-panel border-r border-white/5 z-30 p-6">
        <div className="flex items-center gap-2 mb-10 cursor-pointer" onClick={() => router.push("/")}>
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-violet to-brand-pink text-white shadow-md">
            <InfinityIcon className="w-4 h-4" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            Infinity<span className="text-gradient-neon font-black">Tap</span>
          </span>
        </div>
        {sidebarContent}
      </aside>

      {/* Mobile Sliding Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-40 md:hidden"
            />
            {/* Drawer */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed inset-y-0 left-0 w-80 bg-[#09090b] border-r border-white/10 shadow-2xl z-50 md:z-auto p-6 flex flex-col md:hidden"
            >
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-2">
                  <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-violet to-brand-pink text-white">
                    <InfinityIcon className="w-4 h-4" />
                  </div>
                  <span className="text-lg font-bold tracking-tight text-white">
                    Infinity<span className="text-gradient-neon font-black">Tap</span>
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* -------------------- MAIN PANEL -------------------- */}
      <div className="flex-1 md:pl-64 lg:pl-72 flex flex-col min-h-screen overflow-x-hidden">
        {/* Header */}
        <header className="sticky top-0 z-20 w-full glass-panel border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 focus:outline-none cursor-pointer"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden sm:block">
              <span className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Simulator Dashboard</span>
              <h1 className="text-xl font-bold flex items-center gap-2">
                <span>Workspace:</span>
                <span className={`capitalize ${currentTheme.color}`}>
                  {activeRole}
                </span>
              </h1>
            </div>
            <div className="block sm:hidden">
              <h1 className="text-lg font-bold flex items-center gap-2">
                <span className={`capitalize ${currentTheme.color}`}>
                  {activeRole}
                </span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Demo
            </div>

            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-brand-violet to-brand-pink flex items-center justify-center font-bold text-sm text-white shadow-sm shadow-brand-violet/20">
              K
            </div>
          </div>
        </header>

        {/* Content Container */}
        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto space-y-8">
          {/* Quick Info Box / Banner */}
          <div className={`p-6 rounded-2xl bg-gradient-to-r ${currentTheme.gradient} border ${currentTheme.border} relative overflow-hidden`}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.01] rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 font-sans">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: currentTheme.accent }}>
                Simulating Permissions
              </div>
              <h2 className="text-2xl font-bold mb-2">
                {activeRole === "admin" && "Global Operations Console"}
                {activeRole === "business" && "Corporate NFC Intelligence Hub"}
                {activeRole === "standard" && "Personal Smart Networking Space"}
              </h2>
              <p className="text-zinc-400 text-sm max-w-2xl">
                {activeRole === "admin" &&
                  "You have global permissions. Oversee system revenues, transaction ledgers, inventory distribution, and marketplace performance metrics."}
                {activeRole === "business" &&
                  "Manage dynamic corporate card fleets, oversee product variant select matrices, and execute real-time card provisioning array commands."}
                {activeRole === "standard" &&
                  "Review your personal card interaction statistics, track shipping status telemetry, and configure active profile redirect targets."}
              </p>
            </div>
          </div>

          {/* Children views */}
          <div className="px-1">{children}</div>
        </main>

        {/* Footer */}
        <footer className="py-8 px-6 text-center text-xs text-zinc-600 border-t border-white/5 mt-auto">
          &copy; 2026 Infinity Tap. Powered by Next.js & Tailwind CSS. Simulated Dashboard Mode.
        </footer>
      </div>
    </div>
  );
}
