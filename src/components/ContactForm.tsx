"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MapPin, Mail, Phone, CheckCircle2, Star } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    preference: "matte-black",
    message: "",
  });
  const [focused, setFocused] = useState({
    name: false,
    email: false,
    message: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFocus = (field: string) => setFocused((prev) => ({ ...prev, [field]: true }));
  const handleBlur = (field: string, value: string) => {
    if (!value) {
      setFocused((prev) => ({ ...prev, [field]: false }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setLoading(true);
    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <section id="contact" className="relative py-24 bg-[#050505] overflow-hidden">
      {/* Background neon light */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-brand-violet/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Grid: Contact details */}
          <div className="lg:col-span-5 flex flex-col gap-8 text-center lg:text-left items-center lg:items-start">
            <div className="flex flex-col gap-4 items-center lg:items-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-pink/30 bg-brand-pink/10 text-brand-pink text-sm font-medium w-fit">
                <Star className="w-4 h-4" />
                <span>Start Networking Today</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight">
                Connect With Us. <br />
                <span className="text-gradient-neon font-black">Elevate Your Presence.</span>
              </h2>
              <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                Have questions about custom ordering, corporate bulk discounts, or special card materials? Drop us a line and our smart networking experts will get back to you.
              </p>
            </div>

            {/* Visual cards for contact info */}
            <div className="flex flex-col gap-4">
              {[
                { icon: <MapPin className="w-5 h-5 text-brand-violet" />, title: "HQ Office", value: "100 Innovation Way, San Francisco, CA" },
                { icon: <Mail className="w-5 h-5 text-brand-cyan" />, title: "Corporate Sales", value: "hello@infinitytap.com" },
                { icon: <Phone className="w-5 h-5 text-brand-pink" />, title: "Customer Support", value: "+1 (800) 555-TAPS" }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-4 rounded-2xl glass-panel border border-white/5"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">{item.title}</h4>
                    <p className="text-sm font-medium text-zinc-200 mt-0.5">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Grid: Contact form */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl overflow-hidden glass-panel border border-white/10 p-6 sm:p-12 shadow-2xl">
              
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6"
                  >
                    <div className="flex flex-col gap-2">
                      <h3 className="text-xl font-bold text-white">Send a Message</h3>
                      <p className="text-xs text-zinc-500">Fill in the fields below and we'll connect shortly.</p>
                    </div>

                    {/* Input: Name */}
                    <div className="relative z-0 w-full group">
                      <input
                        type="text"
                        name="name"
                        id="form-name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        onFocus={() => handleFocus("name")}
                        onBlur={(e) => handleBlur("name", e.target.value)}
                        className="block py-3.5 px-4 w-full text-sm text-white bg-transparent rounded-2xl border border-white/10 focus:border-brand-violet focus:ring-1 focus:ring-brand-violet transition-all duration-300 outline-none"
                      />
                      <label
                        htmlFor="form-name"
                        className={`absolute text-sm text-zinc-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#090909] px-2 left-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:scale-75 peer-focus:-translate-y-4 pointer-events-none ${
                          focused.name || formData.name ? "top-0 scale-75 -translate-y-2 text-brand-violet" : "top-1/2 -translate-y-1/2"
                        }`}
                      >
                        Your Name
                      </label>
                    </div>

                    {/* Input: Email */}
                    <div className="relative z-0 w-full group">
                      <input
                        type="email"
                        name="email"
                        id="form-email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onFocus={() => handleFocus("email")}
                        onBlur={(e) => handleBlur("email", e.target.value)}
                        className="block py-3.5 px-4 w-full text-sm text-white bg-transparent rounded-2xl border border-white/10 focus:border-brand-violet focus:ring-1 focus:ring-brand-violet transition-all duration-300 outline-none"
                      />
                      <label
                        htmlFor="form-email"
                        className={`absolute text-sm text-zinc-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#090909] px-2 left-3 pointer-events-none ${
                          focused.email || formData.email ? "top-0 scale-75 -translate-y-2 text-brand-violet" : "top-1/2 -translate-y-1/2"
                        }`}
                      >
                        Email Address
                      </label>
                    </div>

                    {/* Select Input: Card preference */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="form-preference" className="text-xs text-zinc-500 font-semibold px-1">
                        Preferred Card Variant
                      </label>
                      <select
                        name="preference"
                        id="form-preference"
                        value={formData.preference}
                        onChange={(e) => setFormData({ ...formData, preference: e.target.value })}
                        className="block py-3.5 px-4 w-full text-sm text-zinc-300 bg-[#0c0c0c] rounded-2xl border border-white/10 focus:border-brand-violet focus:ring-1 focus:ring-brand-violet transition-all duration-300 outline-none cursor-pointer"
                      >
                        <option value="matte-black">Matte Black Edition - $29</option>
                        <option value="bamboo-wood">Bamboo Wood Edition - $39</option>
                        <option value="titanium-metal">Titanium Metal Edition - $79</option>
                        <option value="custom-print">Holographic Custom Print - $49</option>
                      </select>
                    </div>

                    {/* Textarea: Message */}
                    <div className="relative z-0 w-full group">
                      <textarea
                        name="message"
                        id="form-message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        onFocus={() => handleFocus("message")}
                        onBlur={(e) => handleBlur("message", e.target.value)}
                        rows={4}
                        className="block py-3.5 px-4 w-full text-sm text-white bg-transparent rounded-2xl border border-white/10 focus:border-brand-violet focus:ring-1 focus:ring-brand-violet transition-all duration-300 outline-none resize-none"
                      />
                      <label
                        htmlFor="form-message"
                        className={`absolute text-sm text-zinc-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#090909] px-2 left-3 pointer-events-none ${
                          focused.message || formData.message ? "top-0 scale-75 -translate-y-2 text-brand-violet" : "top-4"
                        }`}
                      >
                        Project Details / Inquiry Message
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      id="form-submit"
                      className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-brand-violet to-brand-pink text-white font-bold text-sm hover:opacity-95 shadow-xl shadow-brand-violet/20 hover:shadow-brand-violet/30 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Inquiry
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center justify-center text-center py-12 gap-6"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="w-20 h-20 rounded-full bg-brand-violet/10 border border-brand-violet/20 flex items-center justify-center text-brand-violet"
                    >
                      <CheckCircle2 className="w-10 h-10" />
                    </motion.div>

                    <div className="flex flex-col gap-2">
                      <h3 className="text-2xl font-bold text-white">Inquiry Received!</h3>
                      <p className="text-sm text-zinc-400 max-w-sm">
                        Thank you for reaching out, <span className="font-semibold text-white">{formData.name}</span>. An Infinity Tap representative will email you at <span className="font-semibold text-white">{formData.email}</span> within 24 hours.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setFormData({ name: "", email: "", preference: "matte-black", message: "" });
                        setFocused({ name: false, email: false, message: false });
                        setSubmitted(false);
                      }}
                      id="form-success-reset"
                      className="px-6 py-2 rounded-xl border border-white/10 hover:bg-white/5 text-xs text-zinc-300 transition-all mt-4"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
