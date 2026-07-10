"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, ShoppingBag, Eye, Radio, HelpCircle } from "lucide-react";
import Image from "next/image";

interface CardVariant {
  id: string;
  name: string;
  tagline: string;
  price: string;
  description: string;
  material: string;
  chip: string;
  bgGlow: string;
  image: string;
  badge?: string;
  gridClass: string;
}

export default function Products() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const cardVariants: CardVariant[] = [
    {
      id: "matte-black",
      name: "Matte Black Edition",
      tagline: "Stealth. Minimalist. Uncompromising.",
      price: "$29",
      description: "Made from aerospace-grade ultra-durable polymer. Features a double-sided matte finish that is highly scratch-resistant.",
      material: "Premium Polymer",
      chip: "NTAG213 Smart Chip",
      bgGlow: "group-hover:shadow-brand-violet/20 group-hover:border-brand-violet/30",
      image: "/black-card.png",
      badge: "Best Seller",
      gridClass: "col-span-1 md:col-span-2 row-span-1"
    },
    {
      id: "bamboo-wood",
      name: "Bamboo Wood Edition",
      tagline: "Sustainable. Organic. Unique Grain.",
      price: "$39",
      description: "Crafted from 100% sustainable organic bamboo wood. Laser engraved logo with natural grain textures.",
      material: "Sustainable Bamboo",
      chip: "NTAG213 Smart Chip",
      bgGlow: "group-hover:shadow-amber-500/20 group-hover:border-amber-500/30",
      image: "/wood-card.png",
      gridClass: "col-span-1"
    },
    {
      id: "titanium-metal",
      name: "Titanium Metal Edition",
      tagline: "Heavyweight. Indestructible. Lux.",
      price: "$79",
      description: "Brushed titanium base core with gold-plated laser etched inlay. Ultimate premium weight and style.",
      material: "Brushed Titanium Steel",
      chip: "High-Freq NTAG213",
      bgGlow: "group-hover:shadow-yellow-500/20 group-hover:border-yellow-500/30",
      image: "/metal-card.png",
      badge: "Premium",
      gridClass: "col-span-1"
    },
    {
      id: "custom-print",
      name: "Holographic Custom Print",
      tagline: "Your Brand. Your Logo. Iridescent Shimmer.",
      price: "$49",
      description: "Upload your custom brand guidelines. Multi-color spot UV and holographic shift options.",
      material: "Holographic Composite",
      chip: "NTAG213 Smart Chip",
      bgGlow: "group-hover:shadow-brand-cyan/20 group-hover:border-brand-cyan/30",
      image: "/custom-card.png",
      gridClass: "col-span-1 md:col-span-2"
    }
  ];

  return (
    <section id="products" className="relative py-24 bg-[#030303] overflow-hidden">
      {/* Background radial orbs */}
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-80 h-80 bg-brand-pink/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-brand-violet/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 z-10 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-violet/30 bg-brand-violet/10 text-brand-violet text-sm font-medium w-fit">
            <CreditCard className="w-4 h-4" />
            <span>Select Your Style</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight">
            Premium Card Materials <br />
            <span className="text-gradient-neon font-black">Crafted for Professionals.</span>
          </h2>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
            Choose from polymer, natural organic wood, heavy titanium metal, or build a fully custom card tailored to your brand identity.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto md:auto-rows-[450px]">
          {cardVariants.map((card) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className={`group relative rounded-3xl overflow-hidden glass-panel border border-white/5 flex flex-col justify-between p-6 glass-panel-hover transition-all duration-300 ${card.gridClass}`}
            >
              {/* Card Hover Glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`} />

              {/* Top Row: Badge & Price */}
              <div className="flex justify-between items-start z-10">
                <div>
                  {card.badge && (
                    <span className="px-3 py-1 text-xs font-bold uppercase tracking-widest bg-brand-violet text-white rounded-full">
                      {card.badge}
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-white">{card.price}</span>
                  <span className="text-zinc-500 text-xs block">one-time</span>
                </div>
              </div>

              {/* Middle Row: Image mockups container */}
              <div className="relative w-full h-[180px] my-4 flex items-center justify-center pointer-events-none">
                {/* Embedded 3D card image */}
                <div className="relative w-[280px] h-[175px] rounded-xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:rotate-2">
                  <Image
                    src={card.image}
                    alt={card.name}
                    fill
                    sizes="280px"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10" />
                </div>
              </div>

              {/* Bottom Row: Details and CTA */}
              <div className="z-10 flex flex-col gap-2">
                <h3 className="text-lg font-bold text-white group-hover:text-brand-violet transition-colors">
                  {card.name}
                </h3>
                <p className="text-xs text-zinc-400 font-medium line-clamp-2">
                  {card.tagline}
                </p>

                {/* Tech Specs Drawer Trigger */}
                <div className="flex gap-4 mt-2 mb-1">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest flex items-center gap-1 font-semibold">
                    <Radio className="w-3 h-3 text-brand-pink" />
                    {card.chip}
                  </span>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest flex items-center gap-1 font-semibold">
                    <HelpCircle className="w-3 h-3 text-brand-cyan" />
                    {card.material}
                  </span>
                </div>

                {/* CTA Row */}
                <div className="flex items-center gap-2 mt-2">
                  <a
                    href="#contact"
                    id={`btn-buy-${card.id}`}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-black hover:bg-zinc-200 font-semibold text-xs transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Order Card
                  </a>
                  <button
                    onClick={() => setSelectedCard(card.id === selectedCard ? null : card.id)}
                    id={`btn-spec-${card.id}`}
                    aria-label="View specifications"
                    className="p-3 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Card specifications popup drawer on absolute overlay */}
              {selectedCard === card.id && (
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute inset-0 bg-black/95 flex flex-col justify-between p-6 z-20"
                >
                  <div>
                    <h4 className="text-white font-bold text-lg">{card.name} Details</h4>
                    <p className="text-zinc-400 text-xs mt-2 leading-relaxed">{card.description}</p>
                    
                    <div className="flex flex-col gap-2 mt-4">
                      <div className="flex justify-between border-b border-white/5 py-1">
                        <span className="text-zinc-500 text-[10px] uppercase">Material</span>
                        <span className="text-zinc-300 text-xs font-semibold">{card.material}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 py-1">
                        <span className="text-zinc-500 text-[10px] uppercase">NFC Protocol</span>
                        <span className="text-zinc-300 text-xs font-semibold">ISO 14443-3A Type 2</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 py-1">
                        <span className="text-zinc-500 text-[10px] uppercase">Chip Memory</span>
                        <span className="text-zinc-300 text-xs font-semibold">144 Bytes (NTAG213)</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedCard(null)}
                    id={`btn-close-spec-${card.id}`}
                    className="w-full py-2.5 rounded-lg border border-white/10 hover:bg-white/5 text-xs text-white transition-colors"
                  >
                    Close Specs
                  </button>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
