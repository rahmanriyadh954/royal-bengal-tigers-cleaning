"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, Mail, MapPin, Zap, ArrowRight, 
  Globe, Send, CheckCircle2, Share2, 
  MousePointer2, LayoutGrid
} from 'lucide-react';

export default function ContactCleaning() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      window.open(`https://wa.me/61400000000?text=Hello, I want to book a cleaning service.`, '_blank');
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <main className="bg-white min-h-screen font-sans selection:bg-[#FACC15] selection:text-black">
      
      {/* 1. HERO & COMPANY INFO (ASH BACKGROUND) */}
      <section className="pt-40 pb-20 px-6 md:px-12 bg-[#1A1A1A] relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left: About Company */}
            <div className="lg:col-span-7 space-y-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full"
              >
                <div className="w-2 h-2 rounded-full bg-[#FACC15] animate-pulse" />
                <span className="text-[10px] font-black tracking-[0.3em] text-white/60 uppercase">Available 24/7 in Tasmania</span>
              </motion.div>

              <h1 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter text-white leading-tight">
                Get Your Place <span className="text-[#FACC15]">Sparkling Clean.</span>
              </h1>

              <div className="space-y-6">
                <p className="text-gray-400 text-sm md:text-base font-bold uppercase tracking-widest leading-relaxed border-l-4 border-[#FACC15] pl-6">
                  Royal Bengal Tigers Cleaning is your trusted partner for professional cleaning services. 
                  Whether it's your home or office, we ensure a spotless environment with our expert team 
                  and eco-friendly tools. Simple, fast, and reliable.
                </p>
                
                <div className="flex flex-wrap gap-4 pt-4">
                  {['LOCAL_TASMANIA', 'ECO_FRIENDLY', 'BOND_BACK'].map((tag) => (
                    <span key={tag} className="text-[9px] font-black text-white/30 border border-white/5 px-4 py-2 rounded-lg bg-white/5 uppercase tracking-widest hover:text-[#FACC15] hover:border-[#FACC15] transition-all">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Contact Card */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-5 w-full"
            >
              <div className="bg-[#111] border border-white/10 p-10 md:p-12 rounded-[50px] shadow-2xl relative group">
                <div className="absolute -top-4 -right-4 bg-[#FACC15] p-5 rounded-3xl group-hover:rotate-12 transition-transform">
                  <Zap size={24} className="text-black fill-black" />
                </div>

                <div className="space-y-10">
                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] italic">// Quick Contact</span>
                    <h4 className="text-2xl font-black italic text-white uppercase tracking-tighter">Office Address</h4>
                  </div>

                  <div className="space-y-6">
                    <a href="tel:+61400000000" className="flex items-center gap-6 group/item">
                      <div className="p-4 bg-white/5 rounded-2xl group-hover/item:bg-[#FACC15] group-hover/item:text-black transition-all">
                        <Phone size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-gray-500 uppercase">Call Us</p>
                        <p className="text-lg font-black italic text-white uppercase tracking-tighter">+61 400 000 000</p>
                      </div>
                    </a>

                    <a href="mailto:ops@royalbengal.pro" className="flex items-center gap-6 group/item">
                      <div className="p-4 bg-white/5 rounded-2xl group-hover/item:bg-[#FACC15] group-hover/item:text-black transition-all">
                        <Mail size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-gray-500 uppercase">Email Us</p>
                        <p className="text-lg font-black italic text-white uppercase tracking-tighter">hello@royalbengal.pro</p>
                      </div>
                    </a>
                  </div>

                  <div className="pt-8 border-t border-white/5 flex justify-between items-center">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-[#111] bg-gray-800 flex items-center justify-center">
                          <CheckCircle2 size={12} className="text-[#FACC15]" />
                        </div>
                      ))}
                    </div>
                    <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest italic">100% Satisfaction Guaranteed</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES LIST (NO ICONS - FOCUS ON TEXT) */}
      <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { label: "End of Lease", desc: "Expert cleaning to help you get your full bond back with ease." },
            { label: "Home Cleaning", desc: "Complete residential cleaning for a fresh and healthy home." },
            { label: "Office Scrub", desc: "Professional workspace sanitization for a better work environment." },
            { label: "NDIS Cleaning", desc: "Specialized care and cleaning for NDIS participants with safety." }
          ].map((item, i) => (
            <div key={i} className="p-10 bg-white border border-gray-100 rounded-[40px] hover:border-black transition-all group shadow-sm hover:shadow-xl">
              <h5 className="text-xl font-black italic uppercase tracking-tighter mb-4 group-hover:text-[#FACC15] transition-colors">{item.label}</h5>
              <p className="text-xs font-bold text-gray-500 uppercase leading-relaxed tracking-wide">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. BOOKING FORM (SIMPLE & EASY) */}
      <section className="pb-32 px-6 md:px-12 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
        <div className="lg:col-span-5 space-y-10">
          <div className="space-y-4">
            <h3 className="text-4xl font-black italic uppercase tracking-tighter leading-none">Book Your <br /> <span className="text-gray-300">Service Now.</span></h3>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest leading-relaxed">
              Fill out the form below and our team will contact you shortly to confirm your booking.
            </p>
          </div>
          
          <motion.div 
            whileHover={{ x: 10 }}
            className="flex items-center gap-6 p-4 bg-gray-50 rounded-3xl w-fit pr-10 border border-gray-100"
          >
            <div className="bg-black p-4 rounded-2xl text-[#FACC15]"><MousePointer2 size={20} /></div>
            <span className="text-[10px] font-black uppercase tracking-widest">Typical Reply Time: 15 Mins</span>
          </motion.div>
        </div>

        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="bg-white border-2 border-black p-10 md:p-16 rounded-[60px] shadow-3xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Full Name</label>
                <input required type="text" placeholder="YOUR NAME" className="w-full bg-gray-50 border-2 border-transparent rounded-[2rem] px-8 py-6 text-[12px] font-black uppercase focus:border-black focus:bg-white outline-none transition-all" />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Email Address</label>
                <input required type="email" placeholder="EMAIL@EXAMPLE.COM" className="w-full bg-gray-50 border-2 border-transparent rounded-[2rem] px-8 py-6 text-[12px] font-black uppercase focus:border-black focus:bg-white outline-none transition-all" />
              </div>
            </div>
            
            <div className="space-y-3 mb-12">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Tell us about your needs</label>
              <textarea rows={4} required placeholder="DESCRIBE YOUR PLACE, LOCATION, AND PREFERRED DATE..." className="w-full bg-gray-50 border-2 border-transparent rounded-[2.5rem] px-10 py-8 text-[12px] font-black outline-none focus:border-black focus:bg-white transition-all resize-none" />
            </div>

            <motion.button 
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              className="w-full bg-black text-[#FACC15] py-8 rounded-[2.5rem] text-xl font-black italic uppercase tracking-[0.4em] flex items-center justify-center gap-8 shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              <span className="relative z-10 uppercase tracking-widest">{isSubmitting ? 'Sending Request...' : 'Send Message'}</span>
              <Send size={24} className="relative z-10 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
            </motion.button>
          </form>
        </div>
      </section>

      {/* 4. FOOTER */}
      <footer className="py-16 bg-[#1A1A1A] border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.6)]" />
              <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">We are online and ready to help</span>
            </div>
            <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest">
              Royal Bengal Tigers Cleaning Service © 2026
            </p>
          </div>
          
          <div className="flex gap-8">
            {[Share2, Globe, LayoutGrid].map((Icon, i) => (
              <Icon key={i} size={18} className="text-gray-700 hover:text-[#FACC15] cursor-pointer transition-colors" />
            ))}
          </div>
        </div>
      </footer>

    </main>
  );
}