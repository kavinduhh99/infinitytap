"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, CreditCard, Infinity as InfinityIcon } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Features", href: "#hero" },
    { name: "NFC Tap Showcase", href: "#showcase" },
    { name: "Products", href: "#products" },
    { name: "Customizer", href: "#customizer" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-4 bg-[#030303]/70 backdrop-blur-md border-b border-white/5"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 group" id="nav-logo">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-tr from-brand-violet to-brand-pink text-white shadow-lg shadow-brand-violet/20">
            <InfinityIcon className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-brand-violet">
            Infinity<span className="text-gradient-neon font-black">Tap</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors relative group py-2"
              id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-violet to-brand-pink transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="/login"
            id="nav-login-desktop"
            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors py-2 px-4 border border-white/10 rounded-full hover:bg-white/5 transition-all duration-300"
          >
            Workspace Login
          </a>
          <a
            href="#products"
            id="nav-cta-desktop"
            className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-full group bg-gradient-to-br from-brand-violet to-brand-pink text-white hover:text-white focus:ring-4 focus:outline-none focus:ring-purple-800"
          >
            <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-[#030303] rounded-full group-hover:bg-opacity-0">
              Order Card
            </span>
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          id="nav-mobile-toggle"
          aria-label="Toggle Navigation Menu"
          className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white focus:outline-none"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-b border-white/5 bg-[#030303]/95 backdrop-blur-lg overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-zinc-300 hover:text-white transition-colors py-2 border-b border-white/5"
                  id={`nav-mobile-link-${link.name.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="/login"
                onClick={() => setIsOpen(false)}
                id="nav-login-mobile"
                className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold text-sm transition-all duration-300"
              >
                Workspace Login
              </a>
              <a
                href="#products"
                onClick={() => setIsOpen(false)}
                id="nav-cta-mobile"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-r from-brand-violet to-brand-pink text-white font-semibold text-sm hover:shadow-lg hover:shadow-brand-violet/20 transition-all duration-300"
              >
                <CreditCard className="w-4 h-4" />
                Order Your Card
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
