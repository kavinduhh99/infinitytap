"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Smartphone, 
  Wifi, 
  CheckCircle2, 
  Globe, 
  Mail, 
  Phone, 
  Download, 
  ArrowRight,
  RefreshCw
} from "lucide-react";
import Image from "next/image";

export default function TapShowcase() {
  const [tapState, setTapState] = useState<"idle" | "approaching" | "tapped" | "profile">("idle");
  const [rippleCount, setRippleCount] = useState<number[]>([]);
  
  // Interactive holding state variables
  const [isHolding, setIsHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [isProfileUnlocked, setIsProfileUnlocked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewports
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Trigger concentric ripples
  const triggerRipples = () => {
    setRippleCount((prev) => [...prev, Date.now()]);
  };

  // 1. Auto-loop animation when NOT holding and NOT unlocked
  useEffect(() => {
    if (isHolding || isProfileUnlocked) return;

    let approachTimer: ReturnType<typeof setTimeout>;
    let tapTimer: ReturnType<typeof setTimeout>;
    let profileTimer: ReturnType<typeof setTimeout>;

    const runLoop = () => {
      // Stage 1: Approach
      setTapState("approaching");

      // Stage 2: Tap & Ripple
      approachTimer = setTimeout(() => {
        setTapState("tapped");
        triggerRipples();

        // Stage 3: After a brief checkmark moment, unlock profile
        tapTimer = setTimeout(() => {
          setIsProfileUnlocked(true);
          setTapState("profile");
        }, 700);
      }, 1200);
    };

    // Single run — profile unlock stops the loop naturally
    profileTimer = setTimeout(runLoop, 400);

    return () => {
      clearTimeout(approachTimer);
      clearTimeout(tapTimer);
      clearTimeout(profileTimer);
    };
  }, [isHolding, isProfileUnlocked]);

  // 2. RequestAnimationFrame handler for Hold-to-Connect progress
  useEffect(() => {
    let timer: any;
    let startTime: number;

    if (isHolding && !isProfileUnlocked) {
      startTime = Date.now();
      const updateProgress = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min((elapsed / 1500) * 100, 100);
        setHoldProgress(progress);

        if (progress < 100) {
          timer = requestAnimationFrame(updateProgress);
        } else {
          // Locked Tap Triggered at 100%
          setIsProfileUnlocked(true);
          setTapState("profile");
          setIsHolding(false);
          triggerRipples();
        }
      };
      timer = requestAnimationFrame(updateProgress);
    } else {
      setHoldProgress(0);
    }

    return () => {
      cancelAnimationFrame(timer);
    };
  }, [isHolding, isProfileUnlocked]);

  // 3. Auto-reset profile back to idle after 3 seconds of being active
  useEffect(() => {
    if (!isProfileUnlocked) return;

    const resetTimer = setTimeout(() => {
      handleReset();
    }, 3000);

    return () => {
      clearTimeout(resetTimer);
    };
  }, [isProfileUnlocked]);

  // Holding event triggers
  const startHolding = () => {
    if (!isProfileUnlocked) {
      setIsHolding(true);
      setTapState("approaching");
    }
  };

  const stopHolding = () => {
    if (isHolding) {
      setIsHolding(false);
      setTapState("idle");
    }
  };

  const handleReset = () => {
    setIsProfileUnlocked(false);
    setIsHolding(false);
    setHoldProgress(0);
    setTapState("idle");
    setRippleCount([]);
  };

  return (
    <section
      id="showcase"
      className="relative py-24 bg-[#050505] border-y border-white/5"
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-cyan/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Content */}
        <div className="flex flex-col gap-6 order-2 lg:order-1 text-center lg:text-left items-center lg:items-start">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-cyan/30 bg-brand-cyan/10 text-brand-cyan text-sm font-medium w-fit">
            <Wifi className="w-4 h-4 animate-pulse" />
            <span>Interactive NFC Experience</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight">
            Tap & Connect. <br />
            <span className="text-gradient-neon font-black">Hover Phone to Connect.</span>
          </h2>

          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-lg">
            Experience our smart cards live. Hover or click & hold the top of the smartphone simulator to simulate placing your NFC card near the sensor and trigger a profile download.
          </p>

          {/* Feature List */}
          <ul className="flex flex-col gap-4 mt-2 text-left">
            {[
              "Hover over the top of the phone screen to initiate tap",
              "Hold cursor there for 1.5 seconds to unlock profile",
              "Watch it reset and auto-loop continuously when idle"
            ].map((feature, i) => (
              <li key={i} className="flex items-start gap-3 text-zinc-300">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan text-xs font-bold mt-0.5">
                  ✓
                </span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-6 w-full sm:w-auto">
            <button
              onClick={handleReset}
              id="showcase-btn-replay"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white font-medium transition-all duration-300"
            >
              <RefreshCw className="w-4 h-4" />
              Reset Simulator
            </button>
            <a
              href="#products"
              id="showcase-btn-view-cards"
              className="flex items-center justify-center gap-1 text-sm font-semibold text-brand-cyan hover:underline"
            >
              Choose Card Design <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Right Animated NFC Interactive Frame */}
        <div className="flex items-center justify-center min-h-[560px] order-1 lg:order-2 relative select-none">
          
          {/* Ripple Wave Elements — origin locked to top-notch NFC sensor */}
          {rippleCount.map((timestamp) => (
            <motion.div
              key={timestamp}
              initial={{ scale: 0.2, opacity: 0.8 }}
              animate={{ scale: 3.5, opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute w-36 h-36 rounded-full border border-brand-cyan/40 bg-gradient-to-r from-brand-cyan/5 to-brand-violet/5 pointer-events-none z-10"
              style={{
                /* Center the ripple on the phone's top notch:
                   phone top ≈ (container 560px − phone 540px) / 2 = 10px from container top
                   notch center ≈ 10px + ~14px = ~24px from container top
                   ripple is 144px (w-36), so offset by half = 72px */
                top: "calc(2% - 58px)",
                left: "calc(50% - 72px)",
              }}
            />
          ))}

          {/* Smartphone Container Mockup */}
          <motion.div
            layout
            className="w-[280px] h-[540px] rounded-[48px] border-4 border-zinc-800 bg-[#090909] shadow-2xl relative overflow-hidden flex flex-col items-center p-3 z-20"
          >
            {/* Top speaker / Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-800 rounded-2xl flex items-center justify-center z-30">
              <div className="w-12 h-1 bg-black rounded-full mb-1" />
            </div>

            {/* Screen Content Wrapper */}
            <div className="w-full h-full rounded-[40px] bg-[#0c0c0c] border border-white/5 relative overflow-hidden flex flex-col justify-between p-4 pt-10">

              {/* Wallpaper glowing pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.15),transparent_70%)] pointer-events-none" />

              {/* NFC Hotspot Hover Detector — top half of the screen */}
              {!isProfileUnlocked && (
                <div
                  onMouseEnter={startHolding}
                  onMouseLeave={stopHolding}
                  onMouseDown={startHolding}
                  onMouseUp={stopHolding}
                  onTouchStart={startHolding}
                  onTouchEnd={stopHolding}
                  className="absolute top-0 left-0 right-0 h-48 z-40 cursor-pointer bg-transparent"
                  id="nfc-hotspot-detector"
                />
              )}

              {/*
               * All screen states are wrapped in a single AnimatePresence so
               * Framer Motion can crossfade between them as the key changes.
               */}
              <AnimatePresence mode="wait">

                {/* State 1: Idle / Approaching — locked screen */}
                {!isHolding && !isProfileUnlocked && (tapState === "idle" || tapState === "approaching") && (
                  <motion.div
                    key="locked"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="h-full flex flex-col justify-between items-center text-center py-12"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-zinc-500 text-[10px] tracking-widest uppercase font-bold">NFC Hotspot</span>
                      <span className="text-sm font-semibold text-brand-cyan mt-1">Hover here to connect</span>
                    </div>

                    <div className="flex flex-col items-center gap-4 text-zinc-600">
                      <Smartphone className="w-12 h-12 animate-bounce" />
                      <span className="text-xs">Hold card to top of phone</span>
                    </div>

                    <div className="h-6" />
                  </motion.div>
                )}

                {/* State 1.5: Holding — NFC handshake progress bar */}
                {isHolding && !isProfileUnlocked && (
                  <motion.div
                    key="holding"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="h-full flex flex-col justify-between items-center text-center py-12 px-2"
                  >
                    <div className="flex flex-col gap-1 w-full mt-4">
                      <span className="text-zinc-500 text-[10px] tracking-widest uppercase font-bold">NFC Handshake</span>
                      <span className="text-xs font-semibold text-brand-cyan mt-1">Holding card to tap...</span>
                    </div>

                    <div className="flex flex-col items-center gap-4 w-full px-2">
                      {/* Glowing Linear Progress Bar */}
                      <div className="w-full bg-zinc-900 border border-white/5 h-2.5 rounded-full overflow-hidden p-0.5 shadow-inner">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-brand-cyan to-brand-violet transition-none"
                          style={{ width: `${holdProgress}%` }}
                        />
                      </div>
                      <span className="text-xl font-black text-white">{Math.round(holdProgress)}%</span>
                    </div>

                    <span className="text-[10px] text-zinc-500 font-medium">Keep holding near the reader...</span>
                  </motion.div>
                )}

                {/* State 2: Tapped — checkmark flash before profile morphs in */}
                {!isHolding && !isProfileUnlocked && tapState === "tapped" && (
                  <motion.div
                    key="tapped"
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.05, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="h-full flex flex-col items-center justify-center text-center gap-4"
                  >
                    <motion.div
                      initial={{ rotate: -90, scale: 0 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    >
                      <CheckCircle2 className="w-16 h-16 text-brand-cyan" />
                    </motion.div>
                    <div className="flex flex-col">
                      <span className="text-white font-semibold">Infinity Tap Detected</span>
                      <span className="text-xs text-zinc-400">Loading digital profile...</span>
                    </div>
                  </motion.div>
                )}

              {/* State 3: Active digital business profile */}
              {isProfileUnlocked && tapState === "profile" && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="h-full flex flex-col justify-between"
                >
                  {/* Top Profile Header */}
                  <div className="flex flex-col items-center text-center pt-2">
                    {/* Avatar with gradient border */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1, type: "spring" }}
                      className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-brand-cyan via-brand-violet to-brand-pink"
                    >
                      <div className="w-full h-full rounded-full bg-[#0c0c0c] flex items-center justify-center overflow-hidden relative">
                        <div className="w-12 h-12 bg-gradient-to-tr from-zinc-700 to-zinc-900 rounded-full flex items-center justify-center font-bold text-sm text-white">
                          AP
                        </div>
                      </div>
                    </motion.div>

                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-base font-bold text-white mt-3"
                    >
                      Alexander Pierce
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-[10px] text-zinc-400 font-medium"
                    >
                      Founder & Creative Director
                    </motion.p>
                  </div>

                  {/* Actions / Buttons List */}
                  <div className="flex flex-col gap-2 my-2">
                    {[
                      { icon: (
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                          <rect x="2" y="9" width="4" height="12" />
                          <circle cx="4" cy="4" r="2" />
                        </svg>
                      ), name: "LinkedIn", color: "hover:bg-zinc-800 bg-zinc-900/50" },
                      { icon: <Globe className="w-3.5 h-3.5" />, name: "Portfolio", color: "hover:bg-zinc-800 bg-zinc-900/50" },
                      { icon: <Mail className="w-3.5 h-3.5" />, name: "Email Me", color: "hover:bg-zinc-800 bg-zinc-900/50" },
                      { icon: <Phone className="w-3.5 h-3.5" />, name: "Call Direct", color: "hover:bg-zinc-800 bg-zinc-900/50" }
                    ].map((btn, index) => (
                      <motion.a
                        key={btn.name}
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className={`flex items-center gap-3 px-3 py-2 rounded-xl border border-white/5 text-[11px] text-zinc-300 font-medium transition-all ${btn.color}`}
                      >
                        {btn.icon}
                        <span>{btn.name}</span>
                      </motion.a>
                    ))}
                  </div>

                  {/* Footer Action: Add to Contacts */}
                  <motion.button
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-violet text-white font-semibold text-[11px] shadow-lg shadow-brand-cyan/10 hover:opacity-90 active:scale-95 transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Save Contact Info
                  </motion.button>
                </motion.div>
              )}

              </AnimatePresence>

            </div>
          </motion.div>

          {/* Animated NFC Business Card floating overlay */}
          <AnimatePresence>
            {!isProfileUnlocked && (
              <motion.div
                /**
                 * Card at FULL scale: 1.0 throughout every state.
                 * Card dimensions: 230 × 362px, position: absolute at (0,0).
                 * Card centre (natural): x=115, y=181.
                 *
                 * Container min-h: 560px. Phone h: 540px.
                 *   → phone top  ≈ (560 − 540) / 2 = 10px from container top.
                 *   → notch top  ≈ 10 + 8 (top-2) = 18px.
                 *   → notch centre ≈ 18 + 12 = ~30px from container top.
                 *
                 * We want the card's bottom edge flush with the notch at full scale:
                 *   y_translate = notch_top − card_height = 18 − 362 = −344px
                 * Tapped (kissing the notch): push 8px further → −352px
                 * Idle: card rests lower-right, visibly outside the phone frame.
                 *   Phone right edge ≈ container_centre + 140 ≈ 420px from left
                 *   Card left at x=0, so x ≈ 240 moves it beyond the phone's right.
                 */
                initial={isMobile ? { x: 30, y: 180, rotateZ: 12, scale: 0.8, opacity: 0 } : { x: 320, y: 220, rotateZ: 38, scale: 1, opacity: 0 }}
                animate={
                  isHolding
                    // Locked to top notch — full size, clean clockwise tilt
                    ? { x: isMobile ? 25 : 25, y: isMobile ? -360 : -344, rotateZ: 6, scale: isMobile ? 0.9 : 1, opacity: 1 }
                    : tapState === "approaching"
                    // Arcing up smoothly to the notch at full scale
                    ? { x: isMobile ? 25 : 25, y: isMobile ? -360 : -344, rotateZ: 6, scale: isMobile ? 0.9 : 1, opacity: 1 }
                    : tapState === "tapped"
                    // Physical contact — flush to the notch, nearly flat
                    ? { x: isMobile ? 25 : 25, y: isMobile ? -368 : -352, rotateZ: 2, scale: isMobile ? 0.9 : 1, opacity: 1 }
                    // Idle — resting lower-right, clearly outside the phone
                    : { x: isMobile ? 80 : 240, y: isMobile ? 150 : 185, rotateZ: isMobile ? 12 : 28, scale: isMobile ? 0.85 : 1, opacity: 1 }
                }
                exit={{ scale: 0.8, opacity: 0, y: -380, transition: { duration: 0.5, ease: "easeIn" } }}
                transition={{
                  type: "spring",
                  stiffness: 70,
                  damping: 13,
                }}
                className="absolute w-[230px] h-[362px] z-30 select-none pointer-events-none"
                style={{ mixBlendMode: "screen" }}
              >
                {/* Card Graphic — radial mask fades the hard edges */}
                <div
                  className="absolute inset-0 z-0 select-none pointer-events-none"
                  style={{
                    maskImage: "radial-gradient(ellipse at center, black 58%, transparent 92%)",
                    WebkitMaskImage: "radial-gradient(ellipse at center, black 58%, transparent 92%)",
                  }}
                >
                  <Image
                    src="/black-card-isolated.png"
                    alt="Infinity Tap NFC Card"
                    fill
                    sizes="(max-width: 768px) 195px, 230px"
                    priority
                    className="object-contain object-center pointer-events-none"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
