"use client";

import React from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import { ArrowRight, CreditCard, Infinity as InfinityIcon } from "lucide-react";

// ─── Spring physics ───────────────────────────────────────────────────────────
// Low stiffness + moderate damping → the deck physically lags behind the cursor
const SPRING = { stiffness: 100, damping: 18, mass: 0.8 };

// ─── Deck card definitions ────────────────────────────────────────────────────
//
// Standard business-card aspect ratio: 85.6 × 54 mm → 1.585:1
// Container: desktop 340 × 214 px, mobile 280 × 177 px
//
// z-index 0 = furthest back, 2 = foreground front card.
// offsetX/offsetY spread the cards in the fan. rotateZ is the fan angle.
// opacity dims back cards for depth perception.
//
// ── Structural black-box annihilation ──
// Each image wrapper uses rounded-[16px] + overflow-hidden.
// The baked-in square black PNG background is physically clipped by the
// browser compositor — no blend modes or CSS masks needed.
// object-cover fills the rounded frame edge-to-edge; no gap remains.

export default function Hero() {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const [isFanned, setIsFanned] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    if (!isMobile) {
      setIsFanned(false);
      return;
    }
    const interval = setInterval(() => {
      setIsFanned((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, [isMobile]);

  const activeFanState = isMobile ? isFanned : isHovered;

  // Raw pointer offset from the perspective container centre (px)
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Map pointer offsets to mild tilt angles (±14°)
  const mappedRotateX: MotionValue<number> = useTransform(
    rawY,
    [-300, 300],
    [14, -14],
  );
  const mappedRotateY: MotionValue<number> = useTransform(
    rawX,
    [-300, 300],
    [-14, 14],
  );

  // Spring-smooth the tilt so the deck lags behind the cursor physically
  const rotateX = useSpring(mappedRotateX, SPRING);
  const rotateY = useSpring(mappedRotateY, SPRING);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    rawX.set(e.clientX - rect.left - rect.width / 2);
    rawY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#030303]"
    >
      {/* Background neon glow orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-violet/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[450px] h-[450px] bg-brand-pink/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Subtle radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full z-10">

        {/* ── Left: Text & CTA ── */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-6 text-center lg:text-left items-center lg:items-start"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-violet/30 bg-brand-violet/10 text-brand-violet text-sm font-medium w-fit">
            <InfinityIcon className="w-4 h-4" />
            <span>The Future of Networking is Here</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white tracking-tight">
            The Smart NFC <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent font-black">Card</span> <br />
            <span className="text-gradient-neon font-black">That Changes Everything.</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 max-w-xl leading-relaxed font-semibold">
            The Last Business Card You Will Ever Need.
          </p>

          <p className="text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed">
            Ditch outdated paper cards. Instantly share your contact details,
            social links, portfolio, and website with a simple tap of your
            premium NFC business card.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
            <a
              href="#products"
              id="hero-cta-order"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-brand-violet to-brand-pink hover:shadow-lg hover:shadow-brand-violet/20 text-white font-semibold transition-all duration-300 transform hover:-translate-y-0.5 w-full sm:w-auto"
            >
              <CreditCard className="w-5 h-5" />
              Order Infinity Card
            </a>

            <a
              href="#showcase"
              id="hero-cta-explore"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/10 hover:border-white/20 bg-white/5 text-white font-semibold hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-0.5 w-full sm:w-auto"
            >
              See How It Works
              <ArrowRight className="w-4 h-4 text-brand-pink" />
            </a>
          </div>

          {/* Micro Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-10 border-t border-white/5 mt-6 w-full text-center lg:text-left">
            <div>
              <p className="text-xl sm:text-2xl font-bold text-white">100k+</p>
              <p className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-wider">Taps Done</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-white">99.8%</p>
              <p className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-wider">Connection Rate</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-white">100%</p>
              <p className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-wider">Eco-Friendly</p>
            </div>
          </div>
        </motion.div>

        {/* ── Right: 3-card landscape fan-out deck ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden md:flex justify-center items-center relative w-full"
        >
          {/*
           * Perspective + mouse-event capture container.
           * The padding keeps the rotated back-cards fully in view without
           * needing overflow-visible on any ancestor layout element.
           */}
          <div
            className="relative cursor-crosshair select-none flex justify-center items-center mx-auto"
            style={{ perspective: 1600, padding: isMobile ? "40px 30px" : "80px 60px" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
              setIsHovered(false);
              handleMouseLeave();
            }}
            onMouseEnter={() => setIsHovered(true)}
          >
            {/*
             * Float wrapper — isolates the idle bob animation onto its own
             * animated layer so it cannot conflict with the spring-driven
             * rotateX / rotateY values on the deck beneath it.
             * Framer Motion merges style + animate; keeping translateY here
             * prevents the two motion systems from fighting each other.
             */}
            <motion.div
              aria-hidden
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="flex justify-center items-center w-full"
            >
              {/*
               * Deck container — sized to match the card bounds.
               * Back cards fan out via absolute positioning — overflow is
               * intentionally visible on this element.
               */}
              <motion.div
                id="hero-card-deck"
                className="relative w-[220px] h-[138px] md:w-[320px] md:h-[200px] mx-auto"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Card 3 — Back — Metal Titanium */}
                <motion.div
                  id="hero-card-0"
                  animate={{
                    opacity: 0.72,
                    x: activeFanState ? (isMobile ? -28 : -40) : 0,
                    y: activeFanState ? (isMobile ? -32 : -45) : 6,
                    rotateZ: activeFanState ? (isMobile ? 12 : 14) : -2,
                    scale: 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                  }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 0,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div
                    className="relative w-full h-full rounded-[16px] overflow-hidden"
                    style={{ boxShadow: "0 18px 48px rgba(0,0,0,0.55)" }}
                  >
                    <Image
                      src="/metal-card-isolated.png"
                      alt="Infinity Tap Metal Titanium NFC Card"
                      fill
                      sizes="(max-width: 768px) 220px, 320px"
                      className="object-cover object-center scale-150"
                    />
                  </div>
                </motion.div>

                {/* Card 2 — Middle — Bamboo Wood */}
                <motion.div
                  id="hero-card-1"
                  animate={{
                    opacity: 0.86,
                    x: activeFanState ? (isMobile ? 28 : 40) : 0,
                    y: activeFanState ? (isMobile ? -22 : -30) : 6,
                    rotateZ: activeFanState ? (isMobile ? -10 : -12) : -2,
                    scale: 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                  }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 1,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div
                    className="relative w-full h-full rounded-[16px] overflow-hidden"
                    style={{ boxShadow: "0 22px 60px rgba(0,0,0,0.65)" }}
                  >
                    <Image
                      src="/custom-card-isolated.png"
                      alt="Infinity Tap Custom Bamboo NFC Card"
                      fill
                      sizes="(max-width: 768px) 220px, 320px"
                      className="object-cover object-center scale-150"
                    />
                  </div>
                </motion.div>

                {/* Card 1 — Front — Matte Black */}
                <motion.div
                  id="hero-card-2"
                  animate={{
                    opacity: 1,
                    x: 0,
                    y: 6,
                    rotateZ: -2,
                    scale: 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                  }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 2,
                    transformStyle: "preserve-3d",
                    rotateX: isMobile ? 0 : rotateX,
                    rotateY: isMobile ? 0 : rotateY,
                  }}
                >
                  <div
                    className="relative w-full h-full rounded-[16px] overflow-hidden"
                    style={{
                      boxShadow:
                        "0 32px 90px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.07), 0 0 60px rgba(139,92,246,0.12)",
                    }}
                  >
                    <Image
                      src="/black-card-isolated.png"
                      alt="Infinity Tap Matte Black NFC Card"
                      fill
                      sizes="(max-width: 768px) 220px, 320px"
                      priority
                      className="object-cover object-center scale-150"
                    />
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
