"use client";

import React from "react";
import { ArrowUp, Radio, CreditCard } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#030303] border-t border-white/5 pt-16 pb-8 overflow-hidden">
      {/* Background radial glowing grid */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-violet/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Brand details */}
          <div className="flex flex-col gap-4 md:col-span-1">
            <a href="#hero" className="flex items-center gap-2 group w-fit" id="footer-logo">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-violet to-brand-pink text-white shadow-lg shadow-brand-violet/20">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                  />
                </svg>
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Infinity<span className="text-gradient-neon font-black">Tap</span>
              </span>
            </a>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Redefining networking in the digital age. Instantly share your credentials with a simple tap. Fast, secure, sustainable.
            </p>
            <div className="flex gap-4 mt-2">
              {[
                {
                  icon: (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                  ),
                  href: "#"
                },
                {
                  icon: (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  ),
                  href: "#"
                },
                {
                  icon: (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  ),
                  href: "#"
                }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="w-8 h-8 rounded-lg border border-white/5 bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/20 transition-all duration-300 transform hover:-translate-y-1"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Products */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">Card Variants</h4>
            {[
              { name: "Matte Black", href: "#products" },
              { name: "Bamboo Wood", href: "#products" },
              { name: "Titanium Metal", href: "#products" },
              { name: "Holographic Custom", href: "#products" }
            ].map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs text-zinc-500 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Column 3: Tech details */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">Technology</h4>
            <div className="flex flex-col gap-2">
              <span className="text-xs text-zinc-500 flex items-center gap-1.5 font-medium">
                <Radio className="w-3.5 h-3.5 text-brand-cyan" />
                NTAG213 Microchips
              </span>
              <span className="text-xs text-zinc-500 flex items-center gap-1.5 font-medium">
                <CreditCard className="w-3.5 h-3.5 text-brand-violet" />
                HF 13.56 MHz NFC Frequency
              </span>
              <span className="text-xs text-zinc-500 flex items-center gap-1.5 font-medium">
                🔒 AES-128 Bit Secure Linking
              </span>
            </div>
          </div>

          {/* Column 4: Newsletter/Updates */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">Newsletter</h4>
            <p className="text-xs text-zinc-500">Subscribe for custom layout releases & discount codes.</p>
            <div className="flex gap-2 mt-1">
              <input
                type="email"
                placeholder="Enter email"
                className="bg-[#090909] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-brand-violet outline-none flex-1 min-w-0"
              />
              <button className="bg-white text-black hover:bg-zinc-200 text-xs font-bold rounded-xl px-3 transition-colors">
                Join
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-white/5 text-[10px] text-zinc-600 font-medium gap-4">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <p>© {new Date().getFullYear()} Infinity Tap Inc. All rights reserved.</p>
            <p className="text-xs text-gray-500 hover:text-brand-primary transition-colors cursor-default">
              Powered by NextLoop IT
            </p>
          </div>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              Back to top
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
