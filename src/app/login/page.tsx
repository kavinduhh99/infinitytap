"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, Mail, Lock, Infinity as InfinityIcon, ArrowRight, ArrowLeft, Shield, Briefcase, User } from "lucide-react";

type RoleType = "admin" | "business" | "standard";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@infinitytap.com");
  const [password, setPassword] = useState("admin@pass123");
  const [selectedRole, setSelectedRole] = useState<RoleType>("admin");
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelect = (role: RoleType) => {
    setSelectedRole(role);
    if (role === "admin") {
      setEmail("admin@infinitytap.com");
      setPassword("admin@pass123");
    } else if (role === "business") {
      setEmail("partner@infinityloop.io");
      setPassword("business@pass123");
    } else if (role === "standard") {
      setEmail("user@shopx.lk");
      setPassword("user@pass123");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate 1 second authentication latency
    setTimeout(() => {
      setIsLoading(false);
      router.push(`/dashboard/${selectedRole}`);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white flex flex-col items-center justify-center p-4 relative font-sans selection:bg-brand-violet/30 selection:text-white">
      {/* Background radial effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-violet/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-brand-pink/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md glass-panel p-8 rounded-3xl relative overflow-hidden shadow-2xl border border-white/10 flex flex-col"
      >
        {/* Subtle top indicator line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-violet via-brand-pink to-brand-cyan" />

        {/* Return to Home Anchor */}
        <a
          href="/"
          className="text-xs text-zinc-400 hover:text-brand-violet flex items-center gap-1.5 transition-colors cursor-pointer self-start mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </a>

        {/* Logo and title */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-violet to-brand-pink text-white shadow-lg shadow-brand-violet/20 mb-4">
            <InfinityIcon className="w-6 h-6 animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Sign In to <span className="text-gradient-neon font-black">InfinityTap</span>
          </h2>
          <p className="text-zinc-500 text-sm mt-1">Select your simulator permissions to log in</p>
        </div>

        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email input */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full pl-11 pr-4 py-3 bg-white/[0.02] border border-white/10 rounded-xl text-sm focus:outline-none focus:border-brand-violet/50 focus:bg-white/[0.04] transition-all text-white placeholder-zinc-600"
              />
            </div>
          </div>

          {/* Password input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                Password
              </label>
              <a href="#" className="text-xs text-brand-violet hover:underline">Forgot password?</a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-11 pr-4 py-3 bg-white/[0.02] border border-white/10 rounded-xl text-sm focus:outline-none focus:border-brand-violet/50 focus:bg-white/[0.04] transition-all text-white placeholder-zinc-600"
              />
            </div>
          </div>

          {/* Quick role-select selector pills */}
          <div className="space-y-3">
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Simulated Role Permissions
            </label>
            <div className="grid grid-cols-3 gap-2">
              {/* Admin Pill */}
              <button
                type="button"
                onClick={() => handleRoleSelect("admin")}
                className={`py-2.5 px-2 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer ${
                  selectedRole === "admin"
                    ? "bg-brand-violet/10 text-white border-brand-violet/50 neon-glow-violet"
                    : "bg-white/[0.01] border-white/5 text-zinc-400 hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                <Shield className={`w-4 h-4 ${selectedRole === "admin" ? "text-brand-violet" : "text-zinc-500"}`} />
                <span>Admin</span>
              </button>

              {/* Business Pill */}
              <button
                type="button"
                onClick={() => handleRoleSelect("business")}
                className={`py-2.5 px-2 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer ${
                  selectedRole === "business"
                    ? "bg-brand-pink/10 text-white border-brand-pink/50 neon-glow-pink"
                    : "bg-white/[0.01] border-white/5 text-zinc-400 hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                <Briefcase className={`w-4 h-4 ${selectedRole === "business" ? "text-brand-pink" : "text-zinc-500"}`} />
                <span>Business</span>
              </button>

              {/* Standard Pill */}
              <button
                type="button"
                onClick={() => handleRoleSelect("standard")}
                className={`py-2.5 px-2 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer ${
                  selectedRole === "standard"
                    ? "bg-brand-cyan/10 text-white border-brand-cyan/50 shadow-[0_0_20px_rgba(6,182,212,0.1)]"
                    : "bg-white/[0.01] border-white/5 text-zinc-400 hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                <User className={`w-4 h-4 ${selectedRole === "standard" ? "text-brand-cyan" : "text-zinc-500"}`} />
                <span>Standard</span>
              </button>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-brand-violet via-brand-pink to-brand-cyan text-white text-sm font-bold flex items-center justify-center gap-2 hover:opacity-95 disabled:opacity-50 transition-all duration-300 shadow-lg shadow-brand-violet/20 hover:shadow-brand-violet/30 cursor-pointer mt-4"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating User...</span>
              </>
            ) : (
              <>
                <span>Sign In to Space</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
