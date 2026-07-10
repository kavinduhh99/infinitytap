"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CreditCard, 
  Upload, 
  Infinity as InfinityIcon, 
  ShoppingBag, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Loader2, 
  Image as ImageIcon,
  AlertCircle
} from "lucide-react";

// Preset theme definitions
interface ColorPreset {
  id: string;
  name: string;
  gradientClass: string;
  textColor: string;
  glowColor: string;
  chipColor: string;
}

const PRESETS: ColorPreset[] = [
  {
    id: "obsidian",
    name: "Matte Obsidian",
    gradientClass: "bg-gradient-to-tr from-[#1c1c1e] via-[#0d0d0c] to-[#030303] border-white/10",
    textColor: "text-zinc-300",
    glowColor: "rgba(255, 255, 255, 0.05)",
    chipColor: "bg-zinc-700",
  },
  {
    id: "gold",
    name: "Luxury Gold",
    gradientClass: "bg-gradient-to-tr from-[#bf953f] via-[#fcf6ba] to-[#b38728] border-yellow-500/20",
    textColor: "text-[#5e481c] drop-shadow-sm font-semibold",
    glowColor: "rgba(191, 149, 63, 0.2)",
    chipColor: "bg-[#e5c158]",
  },
  {
    id: "royal-blue",
    name: "Royal Bank Blue",
    gradientClass: "bg-gradient-to-tr from-[#1e3a8a] via-[#1e40af] to-[#0f172a] border-blue-500/20",
    textColor: "text-blue-100",
    glowColor: "rgba(30, 64, 175, 0.3)",
    chipColor: "bg-blue-300",
  },
  {
    id: "turquoise",
    name: "Turquoise Tech",
    gradientClass: "bg-gradient-to-tr from-[#0f766e] via-[#06b6d4] to-[#115e59] border-cyan-500/20",
    textColor: "text-cyan-50",
    glowColor: "rgba(6, 182, 212, 0.3)",
    chipColor: "bg-cyan-200",
  },
];

export default function CardCustomizer() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState("ALEXANDER PIERCE");
  const [logo, setLogo] = useState<string | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<ColorPreset>(PRESETS[0]);
  
  // Checkout Form states
  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank">("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [receiptUploaded, setReceiptUploaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const receiptInputRef = useRef<HTMLInputElement>(null);

  // Logo file upload handler
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (logo) URL.revokeObjectURL(logo); // cleanup previous
      setLogo(URL.createObjectURL(file));
    }
  };

  const triggerLogoUpload = () => {
    fileInputRef.current?.click();
  };

  const removeLogo = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (logo) URL.revokeObjectURL(logo);
    setLogo(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Receipt upload handler
  const handleReceiptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setReceiptUploaded(true);
    }
  };

  // Checkout submission
  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === "bank" && !receiptUploaded) {
      alert("Please upload your transfer receipt first.");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate order placement delay
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3);
    }, 1800);
  };

  // Formatting helpers for credit card inputs
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
    }
    return v;
  };

  return (
    <section id="customizer" className="relative py-24 bg-[#030303] overflow-hidden border-t border-white/5">
      {/* Background neon glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-brand-violet/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-brand-cyan/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 z-10 relative">
        
        {/* Step-specific headers */}
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-violet/30 bg-brand-violet/10 text-brand-violet text-sm font-medium w-fit">
            <InfinityIcon className="w-4 h-4" />
            <span>Customize & Order</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight">
            {step === 1 ? (
              <>
                Design Your Premium <br />
                <span className="text-gradient-neon font-black">NFC Smart Card.</span>
              </>
            ) : step === 2 ? (
              <>
                Confirm Order & <br />
                <span className="text-gradient-neon font-black">Secure Checkout.</span>
              </>
            ) : (
              <>
                Congratulations! <br />
                <span className="text-gradient-neon font-black">Order Placed Successfully.</span>
              </>
            )}
          </h2>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
            {step === 1 
              ? "Instantly preview your card face with custom branding. Choose premium color styles, type your name, and upload your high-resolution brand logo."
              : step === 2
              ? "Review your customized card configuration and choose your preferred payment method below to complete the secure order transaction."
              : "Your custom NFC business card is now queued for production. Our designers will review your assets and follow up via email shortly."
            }
          </p>
        </div>

        {/* Animation Step Container */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step-customizer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start w-full"
            >
              
              {/* LEFT COLUMN: Live Preview */}
              <div className="flex flex-col items-center justify-center lg:sticky lg:top-28">
                <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-6 block text-center">Live Preview (Card Front)</span>
                
                {/* 3D Landscape Card Wrapper */}
                <div 
                  className={`w-full max-w-[380px] aspect-[1.585] rounded-[20px] p-6 flex flex-col justify-between border relative shadow-2xl transition-all duration-500 ${selectedPreset.gradientClass}`}
                  style={{
                    boxShadow: `0 35px 80px -15px ${selectedPreset.glowColor}, 0 0 0 1px rgba(255,255,255,0.05)`,
                  }}
                >
                  {/* Subtle glass reflection overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.08] rounded-[20px] pointer-events-none" />
                  
                  {/* Top Row: NFC Chip Mockup & Brand Logo */}
                  <div className="flex justify-between items-start z-10">
                    {/* Metal Chip Plate */}
                    <div className={`w-11 h-9 rounded-md border border-white/10 relative overflow-hidden flex flex-col justify-between p-1.5 shadow-md ${selectedPreset.chipColor}`}>
                      <div className="w-full h-px bg-white/20" />
                      <div className="w-full h-px bg-white/20" />
                      <div className="w-full h-px bg-white/20" />
                      {/* Vertical metal pins */}
                      <div className="absolute inset-y-0 left-1/3 w-px bg-white/20" />
                      <div className="absolute inset-y-0 right-1/3 w-px bg-white/20" />
                    </div>

                    {/* Logo Overlay */}
                    {logo ? (
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white/5 flex items-center justify-center p-1 border border-white/10 shadow-sm animate-fade-in">
                        <img src={logo} alt="Custom Logo Preview" className="object-contain w-full h-full max-h-full" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 border border-dashed border-white/20 rounded-lg flex items-center justify-center text-white/20 text-xs">
                        <ImageIcon className="w-5 h-5 opacity-40" />
                      </div>
                    )}
                  </div>

                  {/* Center Accent: Dynamic wireless symbol */}
                  <div className="flex justify-center items-center my-2 opacity-80 z-10">
                    <svg className={`w-8 h-8 ${selectedPreset.id === 'gold' ? 'text-[#5e481c]' : 'text-white/60'} animate-pulse`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2a10 10 0 0 1 10 10" />
                      <path d="M12 6a6 6 0 0 1 6 6" />
                      <path d="M12 10a2 2 0 0 1 2 2" />
                      <circle cx="12" cy="12" r="1" />
                    </svg>
                  </div>

                  {/* Bottom Row: Customized Cardholder Name */}
                  <div className="flex justify-between items-end z-10">
                    <div className="flex flex-col gap-0.5">
                      <span className={`text-[9px] uppercase tracking-widest opacity-60 font-semibold ${selectedPreset.id === 'gold' ? 'text-[#5e481c]' : 'text-zinc-400'}`}>Cardholder</span>
                      <h4 className={`text-sm tracking-widest font-black ${selectedPreset.textColor} truncate max-w-[220px]`}>
                        {name ? name.toUpperCase() : "YOUR NAME HERE"}
                      </h4>
                    </div>

                    <span className={`text-[10px] tracking-widest font-black uppercase opacity-65 ${selectedPreset.id === 'gold' ? 'text-[#5e481c]' : 'text-white'}`}>
                      INFINITY TAP
                    </span>
                  </div>
                </div>

                <div className="mt-8 text-center bg-zinc-900/40 border border-white/5 py-3 px-6 rounded-2xl max-w-[380px] w-full">
                  <span className="text-zinc-500 text-[10px] tracking-wider uppercase block">Material Spec</span>
                  <span className="text-white text-xs font-semibold mt-0.5 block">Premium Smart Polycarbonate • $49.00</span>
                </div>
              </div>

              {/* RIGHT COLUMN: Control Panel */}
              <div className="glass-panel p-8 rounded-3xl border border-white/5 flex flex-col gap-8 shadow-xl">
                
                {/* Option 1: Cardholder Name Input */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="card-name-input" className="text-xs text-zinc-400 font-bold uppercase tracking-wider">
                    1. Cardholder Name
                  </label>
                  <div className="relative rounded-2xl bg-zinc-900/60 border border-white/5 overflow-hidden transition-all duration-300 focus-within:border-brand-violet/40 focus-within:ring-1 focus-within:ring-brand-violet/30">
                    <input
                      id="card-name-input"
                      type="text"
                      maxLength={24}
                      value={name}
                      onChange={(e) => setName(e.target.value.toUpperCase())}
                      placeholder="e.g. ALEXANDER PIERCE"
                      className="w-full px-5 py-4 bg-transparent text-white font-semibold text-sm outline-none placeholder:text-zinc-600"
                    />
                  </div>
                </div>

                {/* Option 2: Custom Logo Upload */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">
                    2. Upload Brand Logo (Optional)
                  </span>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />

                  {logo ? (
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900/40 border border-white/5">
                      <div className="relative w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center p-1 border border-white/10">
                        <img src={logo} alt="Preview thumbnail" className="object-contain w-full h-full" />
                      </div>
                      <div className="flex-1 flex flex-col">
                        <span className="text-xs font-bold text-white">Logo Uploaded</span>
                        <span className="text-[10px] text-zinc-500">Image is ready for print engraving</span>
                      </div>
                      <button
                        onClick={removeLogo}
                        className="px-3 py-1.5 rounded-lg border border-white/10 hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-500 text-[10px] text-zinc-400 font-bold transition-all"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div 
                      onClick={triggerLogoUpload}
                      className="border border-dashed border-white/10 hover:border-brand-violet/40 rounded-2xl p-6 bg-zinc-900/30 hover:bg-zinc-900/60 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-300 group"
                    >
                      <div className="p-3 rounded-xl bg-zinc-800/80 text-zinc-400 group-hover:text-brand-violet group-hover:bg-brand-violet/10 transition-colors">
                        <Upload className="w-5 h-5" />
                      </div>
                      <div className="text-center flex flex-col gap-1">
                        <span className="text-xs font-semibold text-zinc-300">Drag & drop logo file here</span>
                        <span className="text-[10px] text-zinc-500">Supports PNG, JPG, or SVG (Square ratio recommended)</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Option 3: Color Preset Selector */}
                <div className="flex flex-col gap-3">
                  <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">
                    3. Select Color Theme
                  </span>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => setSelectedPreset(preset)}
                        className={`flex flex-col gap-3 p-3 rounded-2xl border text-left transition-all duration-300 ${
                          selectedPreset.id === preset.id 
                            ? "border-brand-violet bg-brand-violet/5 scale-[1.02] shadow-[0_0_15px_rgba(139,92,246,0.1)]"
                            : "border-white/5 bg-zinc-900/30 hover:border-white/10 hover:bg-zinc-900/50"
                        }`}
                      >
                        {/* Preset Card Mini Render */}
                        <div className={`w-full aspect-[1.585] rounded-lg shadow-sm border ${preset.gradientClass}`} />
                        <span className="text-[10px] text-zinc-300 font-bold truncate block">{preset.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Proceed Button */}
                <button
                  onClick={() => setStep(2)}
                  className="w-full flex items-center justify-center gap-2 py-4 mt-2 rounded-full bg-gradient-to-r from-brand-violet to-brand-pink text-white font-semibold hover:opacity-95 active:scale-[0.99] transition-all shadow-lg shadow-brand-violet/10 group"
                >
                  Proceed to Payment
                  <ArrowRight className="w-4 h-4 text-brand-pink group-hover:translate-x-0.5 transition-transform" />
                </button>

              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step-checkout"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start w-full"
            >
              
              {/* LEFT COLUMN: Summary / Card View */}
              <div className="flex flex-col gap-8 lg:sticky lg:top-28">
                
                {/* Back button */}
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 text-zinc-400 hover:text-white text-xs font-semibold transition-colors w-fit group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                  Back to Editor
                </button>

                {/* Mini Card Preview */}
                <div className="flex flex-col items-center justify-center bg-zinc-900/20 border border-white/5 p-8 rounded-3xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-brand-violet/5 rounded-full blur-[80px]" />
                  
                  {/* Micro Card Template */}
                  <div 
                    className={`w-[240px] aspect-[1.585] rounded-xl p-4 flex flex-col justify-between border relative shadow-xl scale-95 transition-all duration-300 ${selectedPreset.gradientClass}`}
                  >
                    <div className="flex justify-between items-start">
                      {/* Mini Chip */}
                      <div className={`w-8 h-6 rounded border border-white/10 relative p-1 ${selectedPreset.chipColor}`} />
                      {/* Mini Logo */}
                      {logo ? (
                        <div className="relative w-6 h-6 rounded bg-white/5 flex items-center justify-center p-0.5">
                          <img src={logo} alt="Mini Logo" className="object-contain w-full h-full" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 border border-dashed border-white/20 rounded flex items-center justify-center text-white/20 text-[6px]">
                          TAP
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between items-end">
                      <div className="flex flex-col gap-0.5">
                        <span className={`text-[6px] uppercase tracking-widest opacity-50 ${selectedPreset.id === 'gold' ? 'text-[#5e481c]' : 'text-zinc-400'}`}>Cardholder</span>
                        <h4 className={`text-[9px] tracking-wider font-black ${selectedPreset.textColor} truncate max-w-[130px]`}>
                          {name ? name.toUpperCase() : "YOUR NAME HERE"}
                        </h4>
                      </div>
                      <span className={`text-[7px] tracking-widest font-black uppercase opacity-60 ${selectedPreset.id === 'gold' ? 'text-[#5e481c]' : 'text-white'}`}>
                        INFINITY TAP
                      </span>
                    </div>
                  </div>

                  <h3 className="text-white font-bold text-sm mt-6">Customized NFC Smart Card</h3>
                  <span className="text-[10px] text-zinc-500 uppercase font-semibold mt-1">Preset: {selectedPreset.name}</span>
                </div>

                {/* Order Summary Pricing Panel */}
                <div className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col gap-4">
                  <h4 className="text-zinc-400 text-xs font-bold uppercase tracking-wider">Order Summary</h4>
                  <div className="flex flex-col gap-2 mt-1">
                    <div className="flex justify-between text-xs py-1 border-b border-white/5">
                      <span className="text-zinc-500">Customized NFC Card (Polycarbonate)</span>
                      <span className="text-white font-semibold">$49.00</span>
                    </div>
                    <div className="flex justify-between text-xs py-1 border-b border-white/5">
                      <span className="text-zinc-500">Eco Shipping & Express Coding</span>
                      <span className="text-brand-cyan font-semibold">FREE</span>
                    </div>
                    <div className="flex justify-between text-sm py-2 font-bold mt-2">
                      <span className="text-white">Order Total</span>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-violet to-brand-pink font-black text-lg">$49.00</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: Payment Panel */}
              <div className="glass-panel p-8 rounded-3xl border border-white/5 flex flex-col gap-8 shadow-xl">
                
                <div className="flex flex-col gap-4">
                  <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Select Payment Method</span>
                  
                  {/* Payment Tabs Selector */}
                  <div className="grid grid-cols-2 p-1 rounded-2xl bg-zinc-950 border border-white/5 relative">
                    <button
                      onClick={() => setPaymentMethod("card")}
                      className={`relative z-10 py-3 text-xs font-bold rounded-xl transition-all duration-300 ${
                        paymentMethod === "card" ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      {paymentMethod === "card" && (
                        <motion.div 
                          layoutId="active-tab-indicator"
                          className="absolute inset-0 rounded-xl bg-zinc-900 border border-white/5 z-[-1]"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      Card Payment
                    </button>
                    <button
                      onClick={() => setPaymentMethod("bank")}
                      className={`relative z-10 py-3 text-xs font-bold rounded-xl transition-all duration-300 ${
                        paymentMethod === "bank" ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      {paymentMethod === "bank" && (
                        <motion.div 
                          layoutId="active-tab-indicator"
                          className="absolute inset-0 rounded-xl bg-zinc-900 border border-white/5 z-[-1]"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      Bank Transfer
                    </button>
                  </div>
                </div>

                {/* Form Wrapper */}
                <form onSubmit={handleCheckoutSubmit} className="flex flex-col gap-6">
                  <AnimatePresence mode="wait">
                    {paymentMethod === "card" ? (
                      <motion.div
                        key="payment-card"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="flex flex-col gap-4"
                      >
                        {/* Mock Credit Card Inputs */}
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="card-number" className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Card Number</label>
                          <div className="relative rounded-xl bg-zinc-900/60 border border-white/5 overflow-hidden focus-within:border-brand-violet/40 focus-within:ring-1 focus-within:ring-brand-violet/30 transition-all">
                            <input
                              id="card-number"
                              type="text"
                              required
                              placeholder="0000 0000 0000 0000"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                              maxLength={19}
                              className="w-full px-4 py-3 bg-transparent text-white font-semibold text-xs outline-none placeholder:text-zinc-700"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label htmlFor="card-expiry" className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Expiry Date</label>
                            <div className="relative rounded-xl bg-zinc-900/60 border border-white/5 overflow-hidden focus-within:border-brand-violet/40 focus-within:ring-1 focus-within:ring-brand-violet/30 transition-all">
                              <input
                                id="card-expiry"
                                type="text"
                                required
                                placeholder="MM/YY"
                                value={cardExpiry}
                                onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                                maxLength={5}
                                className="w-full px-4 py-3 bg-transparent text-white font-semibold text-xs outline-none placeholder:text-zinc-700"
                              />
                            </div>
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label htmlFor="card-cvc" className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">CVC / CVV</label>
                            <div className="relative rounded-xl bg-zinc-900/60 border border-white/5 overflow-hidden focus-within:border-brand-violet/40 focus-within:ring-1 focus-within:ring-brand-violet/30 transition-all">
                              <input
                                id="card-cvc"
                                type="password"
                                required
                                placeholder="•••"
                                value={cardCvc}
                                onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, ""))}
                                maxLength={3}
                                className="w-full px-4 py-3 bg-transparent text-white font-semibold text-xs outline-none placeholder:text-zinc-700 tracking-widest"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="cardholder-name" className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Cardholder Name</label>
                          <div className="relative rounded-xl bg-zinc-900/60 border border-white/5 overflow-hidden focus-within:border-brand-violet/40 focus-within:ring-1 focus-within:ring-brand-violet/30 transition-all">
                            <input
                              id="cardholder-name"
                              type="text"
                              required
                              placeholder="e.g. ALEXANDER PIERCE"
                              value={cardholderName}
                              onChange={(e) => setCardholderName(e.target.value.toUpperCase())}
                              className="w-full px-4 py-3 bg-transparent text-white font-semibold text-xs outline-none placeholder:text-zinc-700"
                            />
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="payment-bank"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="flex flex-col gap-5"
                      >
                        {/* Bank Details Presentation */}
                        <div className="p-5 rounded-2xl bg-zinc-950/80 border border-white/5 flex flex-col gap-3">
                          <div className="flex justify-between items-center pb-2 border-b border-white/5">
                            <span className="text-[10px] text-zinc-500 uppercase font-semibold">Bank Name</span>
                            <span className="text-white text-xs font-bold">Royal Alpha Bank</span>
                          </div>
                          <div className="flex justify-between items-center py-1">
                            <span className="text-[10px] text-zinc-500 uppercase font-semibold">Account Holder</span>
                            <span className="text-zinc-300 text-xs font-semibold">Infinity Tap LLC</span>
                          </div>
                          <div className="flex justify-between items-center py-1">
                            <span className="text-[10px] text-zinc-500 uppercase font-semibold">Account Number</span>
                            <span className="text-brand-cyan text-xs font-bold font-mono">1009-4829-3829</span>
                          </div>
                          <div className="flex justify-between items-center py-1">
                            <span className="text-[10px] text-zinc-500 uppercase font-semibold">Branch</span>
                            <span className="text-zinc-300 text-xs font-semibold">Headquarters Main Branch</span>
                          </div>
                        </div>

                        {/* Transfer Receipt Uploader */}
                        <div className="flex flex-col gap-2">
                          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                            Upload Transfer Receipt
                          </span>

                          <input
                            ref={receiptInputRef}
                            type="file"
                            accept="image/*,.pdf"
                            onChange={handleReceiptUpload}
                            className="hidden"
                          />

                          {receiptUploaded ? (
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-brand-cyan/5 border border-brand-cyan/20">
                              <div className="p-2 rounded-lg bg-brand-cyan/25 text-brand-cyan">
                                <Check className="w-5 h-5" />
                              </div>
                              <div className="flex-1 flex flex-col">
                                <span className="text-xs font-bold text-white">Receipt Attached</span>
                                <span className="text-[10px] text-zinc-400">Review pending checkout validation</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => setReceiptUploaded(false)}
                                className="text-[10px] font-semibold text-zinc-500 hover:text-white"
                              >
                                Edit
                              </button>
                            </div>
                          ) : (
                            <div 
                              onClick={() => receiptInputRef.current?.click()}
                              className="border border-dashed border-white/10 hover:border-brand-cyan/40 rounded-xl p-5 bg-zinc-900/20 hover:bg-zinc-900/40 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-300"
                            >
                              <Upload className="w-4 h-4 text-zinc-500" />
                              <div className="text-center flex flex-col gap-0.5">
                                <span className="text-[11px] font-semibold text-zinc-300">Click to upload transfer screenshot</span>
                                <span className="text-[9px] text-zinc-500">Supports PDF, PNG, or JPG</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submission Row */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-4 mt-4 rounded-full bg-gradient-to-r from-brand-violet to-brand-pink text-white font-semibold hover:opacity-95 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-brand-violet/10"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        Processing Secured Order...
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        Complete Order ($49.00)
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[9px] text-zinc-600 font-semibold uppercase tracking-wider mt-2">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>SSL Secured 256-bit Encrypted Transaction</span>
                  </div>
                </form>

              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="glass-panel p-12 rounded-3xl border border-white/5 max-w-lg mx-auto flex flex-col items-center justify-center text-center gap-8 shadow-2xl relative overflow-hidden"
            >
              {/* Background glows */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-brand-cyan/10 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-brand-pink/5 rounded-full blur-[80px] pointer-events-none" />

              {/* Animated Checkmark Circle */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 15, delay: 0.1 }}
                className="w-20 h-20 rounded-full bg-gradient-to-tr from-brand-cyan to-brand-violet flex items-center justify-center shadow-lg shadow-brand-cyan/20 p-0.5"
              >
                <div className="w-full h-full rounded-full bg-[#0c0c0c] flex items-center justify-center">
                  <motion.svg 
                    className="w-10 h-10 text-brand-cyan" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth="3"
                  >
                    <motion.path 
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M5 13l4 4L19 7" 
                    />
                  </motion.svg>
                </div>
              </motion.div>

              <div className="flex flex-col gap-3">
                <h3 className="text-2xl font-black text-white">Order Confirmed</h3>
                <span className="text-brand-cyan text-xs font-bold uppercase tracking-widest font-mono">Invoice ID: #INF-928420</span>
                <p className="text-zinc-400 text-sm max-w-sm leading-relaxed mt-2">
                  Thank you for your purchase! We have received your order details for the customized card. A confirmation invoice is sent to your email.
                </p>
              </div>

              {/* Order configuration summary details */}
              <div className="w-full bg-zinc-950/80 border border-white/5 rounded-2xl p-5 flex flex-col gap-3 text-left">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-500">Name on Card:</span>
                  <span className="text-white font-bold tracking-wider">{name.toUpperCase()}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-500">Theme Preset:</span>
                  <span className="text-white font-bold">{selectedPreset.name}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-500">Brand Logo:</span>
                  <span className="text-white font-bold">{logo ? "Attached" : "None"}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setName("ALEXANDER PIERCE");
                  setLogo(null);
                  setSelectedPreset(PRESETS[0]);
                  setCardNumber("");
                  setCardExpiry("");
                  setCardCvc("");
                  setCardholderName("");
                  setReceiptUploaded(false);
                  setStep(1);
                }}
                className="w-full py-3.5 rounded-full border border-white/10 hover:bg-white/5 text-zinc-300 font-bold text-xs transition-colors"
              >
                Build Another Card
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
