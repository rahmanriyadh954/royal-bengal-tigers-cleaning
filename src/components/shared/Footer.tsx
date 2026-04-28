"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiArrowUp, 
  FiInstagram, 
  FiFacebook, 
  FiMapPin, 
  FiPhone, 
  FiMail,
  FiArrowRight,
  FiZap,
  FiClock, 
  FiShield, 
  FiCheckCircle,
  FiLinkedin,
  FiYoutube,
  FiExternalLink,
  FiTarget,
  FiCpu,
  FiActivity,
  FiLock,
  FiAward,
  FiTool
} from 'react-icons/fi';

/**
 * ROYAL BENGAL TIGERS CLEANING - ELITE INDUSTRIAL FOOTER
 * Design: Dark Industrial / Tactical Ash
 * Feature: Ultra-High Density Components
 */

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [isHovered, setIsHovered] = useState<string | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const serviceLinks = [
    { name: 'Residential Pounce', desc: 'Tactical home sanitization' },
    { name: 'End of Lease Hunt', desc: 'Bond return guaranteed' },
    { name: 'Corporate Jungle', desc: 'High-rise office ops' },
    { name: 'Deep Scrub Ops', desc: 'Molecular level cleaning' },
    { name: 'Window Extraction', desc: 'Crystal clear visibility' },
    { name: 'Sanitization Strike', desc: 'Bio-hazard removal' },
    { name: 'Post-Construction Squad', desc: 'Debris elimination' }
  ];

  const intelligenceLinks = [
    { name: 'Operational Process', path: '/process' },
    { name: 'Safety Audit', path: '/safety' },
    { name: 'Tigers Squad', path: '/squad' },
    { name: 'Equipment Meta', path: '/gear' },
    { name: 'Client Intel', path: '/intel' },
    { name: 'Field Reports', path: '/reports' },
    { name: 'Mission Log', path: '/logs' }
  ];

  const operationalZones = [
    'Hobart CBD, TAS',
    'Sandy Bay, TAS',
    'Glenorchy, TAS',
    'Kingston, TAS',
    'Clarence, TAS',
    'Moonah, TAS',
    'Rosny Park, TAS'
  ];

  return (
    <footer className="bg-[#0A0A0A] text-white pt-25 pb-4 overflow-hidden relative border-t border-gray-900">
      {/* --- AMBIENT BACKGROUND MOTION LAYER --- */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />
        <motion.div 
          animate={{ 
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.1, 1] 
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -top-48 -left-48 w-[600px] h-[600px] bg-yellow-500/5 rounded-full blur-[150px]" 
        />
        <div className="absolute bottom-0 right-0 w-[800px] h-[400px] bg-blue-500/5 rounded-full blur-[150px] opacity-10" />
      </div>

      <div className="max-w-[1440px] mx-auto px-8 relative z-10">
        
        {/* --- TOP BRANDING & MISSION CONTROL --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20"> {/* mb-28 কমিয়ে mb-10 করছি */}
          
          <div className="lg:col-span-7 space-y-8">
            <div className="flex flex-wrap md:flex-nowrap justify-center gap-12 md:gap-16  py-12 items-start">
              {/* BRAND LOGO UNIT */}
              <motion.div 
                whileHover={{ rotate: -5, scale: 1.05 }}
                className="w-24 h-24 relative flex-shrink-0 bg-black p-3 rounded-2xl border border-gray-800 shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <Image 
                  src="/images/royal_bengal_tigers_cleaning.png" 
                  alt="Royal Bengal Tigers Logo" 
                  fill 
                  className="object-cover "
                />
              </motion.div>

              {/* BRAND IDENTITY TEXT */}
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-[0.85] text-white">
    ROYAL BENGAL <br /> 
    <span className="text-yellow-400">TIGERS CLEANING.</span>
  </h2>
                <div className="flex items-center gap-2 text-gray-500 font-black text-[10px] uppercase tracking-[0.4em]">
                  <motion.span 
                    initial={{ width: 0 }}
                    whileInView={{ width: 40 }}
                    className="h-[2px] bg-yellow-400" 
                  />
                  Hobart's Elite Sanitization Squad
                </div>
              </div>
            </div>

            <div className="max-w-2xl relative">
              <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-yellow-500 via-gray-800 to-transparent" />
              <p className="text-gray-400 text-[13px] font-bold uppercase leading-relaxed tracking-[0.15em] italic pl-8">
                Based in Hobart, Tasmania, we set the benchmark for high-intensity cleaning. From residential pounces to end-of-lease hunts, our squad operates with lethal precision across the Australian domain.
              </p>
            </div>

            {/* TRUST BADGE GRID */}
            <div className="inline-flex flex-wrap items-center gap-6 bg-[#0D0D0D] p-5 rounded-[2rem] border border-gray-800/50 shadow-2xl group/badges">
              <div className="flex -space-x-4"> {/* Overlap enhanced */}
                {[1, 2, 3].map((i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -5, zIndex: 50 }}
                    className="w-12 h-12 rounded-full border-2 border-[#0A0A0A] bg-gray-900 overflow-hidden relative shadow-2xl"
                  >
                    <Image 
                      src={`/image/royal_bengal_tigers_cleaning.png`} //
                      alt="Quality Badge" 
                      fill 
                      className="object-cover"
                    />
                  </motion.div>
                ))}
              </div>
              <div className="border-l border-gray-800 pl-6">
                <p className="text-[11px] font-black uppercase tracking-widest text-white mb-1 flex items-center gap-2">
                  Top Rated in Hobart <FiAward className="text-yellow-400" />
                </p>
                <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-gray-600 italic">Tasmania Licensed & Insured</p>
              </div>
              <motion.div 
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="ml-4"
              >
                <FiZap className="text-yellow-400 text-xl" />
              </motion.div>
            </div>
          </div>

          {/* --- CONTACT OPS CENTER --- */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-b from-[#111] to-black p-10 rounded-[3.5rem] border border-gray-800/50 backdrop-blur-xl relative overflow-hidden group hover:border-yellow-400/20 transition-all duration-500">
              <div className="absolute -top-10 -right-10 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                <FiTarget size={200} />
              </div>
              
              <h4 className="text-white text-[13px] font-black uppercase tracking-[0.6em] mb-12 flex items-center gap-4">
                <span className="w-3 h-6 bg-yellow-400 rounded-full animate-pulse" />
                Contact Operations Center
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-12 gap-x-8">
                {/* CONTACT ITEMS */}
                <div className="space-y-10">
                  <div className="flex items-start gap-6 group/item">
                    <div className="w-12 h-12 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-center text-yellow-400 group-hover/item:bg-yellow-400 group-hover/item:text-black transition-all shadow-lg">
                      <FiMapPin size={20} />
                    </div>
                    <div className="pt-1">
                      <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.3em] mb-2">Local HQ</p>
                      <p className="text-[12px] font-black uppercase tracking-widest text-white leading-tight">Hobart, Tasmania <br /> Australia</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6 group/item">
                    <div className="w-12 h-12 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-center text-yellow-400 group-hover/item:bg-yellow-400 group-hover/item:text-black transition-all shadow-lg">
                      <FiPhone size={20} />
                    </div>
                    <div className="pt-1">
                      <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.3em] mb-2">Comms Line</p>
                      <p className="text-[12px] font-black uppercase tracking-widest text-white">+61 XXX XXX XXX</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-10">
                  <div className="flex items-start gap-6 group/item">
                    {/* EMAIL ICON UNIFORM FIX */}
                    <div className="w-12 h-12 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-center text-yellow-400 group-hover/item:bg-yellow-400 group-hover/item:text-black transition-all shadow-lg">
                      <FiMail size={20} />
                    </div>
                    <div className="pt-1">
                      <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.3em] mb-2">Inquiry Desk</p>
                      <p className="text-[12px] font-black uppercase tracking-widest text-white">ops@tigerscleaning.au</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6 group/item">
                    <div className="w-12 h-12 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-center text-yellow-400 group-hover/item:bg-yellow-400 group-hover/item:text-black transition-all shadow-lg">
                      <FiClock size={20} />
                    </div>
                    <div className="pt-1">
                      <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.3em] mb-2">Squad Hours</p>
                      <p className="text-[12px] font-black uppercase tracking-widest text-white">Mon-Sun: 24/7 Dispatch</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* SOCIAL OPS - CENTERED */}
              <div className="mt-14 pt-10 border-t border-gray-900/50 flex gap-5 justify-center">
                {[
                  { icon: <FiFacebook />, url: '#' },
                  { icon: <FiInstagram />, url: '#' },
                  { icon: <FiLinkedin />, url: '#' },
                  { icon: <FiYoutube />, url: '#' }
                ].map((social, i) => (
                  <motion.a 
                    key={i}
                    href={social.url}
                    whileHover={{ y: -5, scale: 1.1 }}
                    className="w-14 h-14 rounded-full border border-gray-800 flex items-center justify-center text-gray-500 hover:bg-white hover:text-black hover:border-white transition-all shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>

{/* --- NAVIGATION GRID: CENTERED & BALANCED --- */}
<div className="flex flex-wrap md:flex-nowrap justify-center gap-10 md:gap-20 mb-10 border-y border-gray-850/60 py-12 items-start"> 
  {/* justify-center দিয়ে পুরো কন্টেন্ট মাঝখানে আনা হয়েছে এবং কলামের গ্যাপ ২০ করা হয়েছে */}

  {/* 1. PRIMARY SERVICES (Left Column) */}
  <div className="space-y-4">
    <h4 className="text-white text-[10px] font-black uppercase tracking-[0.5em] opacity-40 mb-6">Our Services</h4>
    <ul className="space-y-2.5">
      {[
        'End of Lease Cleaning', 
        'Residential Cleaning', 
        'Office Sanitization', 
        'Deep Scrub Ops', 
        'Window Cleaning'
      ].map((service) => (
        <li key={service}>
          <Link href="#" className="w-fit text-gray-500 text-[10px] font-black uppercase tracking-widest hover:text-yellow-400 hover:translate-x-1 transition-all duration-200 flex">
            {service}
          </Link>
        </li>
      ))}
    </ul>
  </div>

  {/* 2. QUICK LINKS (Center Double Column) */}
  <div className="space-y-4">
    <h4 className="text-white text-[10px] font-black uppercase tracking-[0.5em] opacity-40 mb-6 text-center">Quick Links</h4>
    
    <div className="grid grid-cols-2 gap-x-8 gap-y-3">
      {/* INVERTED LEFT COLUMN: RIGHT ALIGN */}
      <div className="flex flex-col items-end space-y-3">
        {[
          { name: 'Our Services', path: '/services' },
          { name: 'Operational Process', path: '/process' },
          { name: 'Pricing Tiers', path: '/pricing' },
          { name: 'About Our Squad', path: '/about' }
        ].map((link) => (
          <Link key={link.name} href={link.path} className="w-fit text-gray-500 text-[10px] font-black uppercase tracking-widest hover:text-yellow-400 hover:-translate-x-1 transition-all duration-200 text-right">
            {link.name}
          </Link>
        ))}
      </div>

      {/* INVERTED RIGHT COLUMN: LEFT ALIGN */}
      <div className="flex flex-col items-start space-y-3 border-l border-gray-900/30 pl-8">
        {[
          { name: 'Terms of Service', path: '/terms' },
          { name: 'Privacy Policy', path: '/privacy' },
          { name: 'Member Login', path: '/login' },
          { name: 'Contact Command', path: '/contact' }
        ].map((link) => (
          <Link key={link.name} href={link.path} className="w-fit text-gray-500 text-[10px] font-black uppercase tracking-widest hover:text-yellow-400 hover:translate-x-1 transition-all duration-200">
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  </div>

  {/* 3. SUBSCRIBE OPS (Right Column) */}
  <div className="w-full md:w-[280px] space-y-5 border-l border-gray-900/30 pl-8"> 
    {/* নির্দিষ্ট উইডথ (280px) দিয়েছি যাতে এটি খুব বেশি ছড়িয়ে না যায় */}
    <h4 className="text-white text-[10px] font-black uppercase tracking-[0.5em] opacity-40">Squad Intel</h4>
    <p className="text-[9px] text-gray-500 uppercase font-bold tracking-widest leading-tight">
      Subscribe for tactical updates.
    </p>
    
    <div className="space-y-3">
      <div className="relative">
        <input 
          type="email" 
          placeholder="ENTER EMAIL" 
          className="w-full bg-transparent border-b border-gray-800 py-1.5 text-[10px] font-black tracking-widest text-white focus:outline-none focus:border-yellow-400 transition-colors placeholder:text-gray-700"
        />
      </div>
      
      <Link href="/subscribe" className="block">
        <button className="w-full bg-yellow-400 hover:bg-white text-black py-3 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 group">
          JOIN THE SQUAD
          <FiExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </Link>
    </div>
  </div>
</div>

        {/* --- BOTTOM ARCHITECTURE - CENTERED --- */}
        <div className="flex flex-col items-center justify-center space-y-8 pt-4 pb-12 relative">
          
          {/* SLOGAN BAR */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex flex-wrap items-center justify-center gap-8">
              <p className="text-[11px] font-black uppercase tracking-[0.7em] text-gray-700 italic">
                Elite Tasmanian Sanitization Standards
              </p>
              <div className="w-12 h-[2px] bg-gray-900 hidden md:block" />
              <p className="text-[11px] font-black uppercase tracking-[0.7em] text-gray-700 italic">
                Hobart Exclusive
              </p>
            </div>
            
            {/* COPYRIGHT LINE */}
            <div className="text-center space-y-2">
              <p className="text-[13px] font-bold text-gray-500 uppercase tracking-[0.4em]">
                © {currentYear} Royal Bengal Tigers Cleaning
              </p>
              <p className="text-[9px] font-black text-gray-800 uppercase tracking-[0.5em]">
                Australian Business Registered | Hobart, TAS | Tactical Cleaning Division
              </p>
            </div>
          </div>
          {/* DECORATIVE BOTTOM LINE */}
          <div className="w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-gray-900 to-transparent" />
        </div>
      </div>
      {/* ASCEND BUTTON - EXTREME RIGHT POSITION */}
          <div className="md:absolute md:right-0 md:bottom-12 pr-20 pb-10">
            <motion.button 
              whileHover={{ scale: 1.15, y: -8 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-18 h-18 bg-yellow-400 text-black rounded-3xl flex flex-col items-center justify-center shadow-[0_20px_50px_rgba(234,179,8,0.25)] group border-4 border-black"
            >
              <FiArrowUp size={24} className="group-hover:-translate-y-1 transition-transform mb-1" />
              <span className="text-[8px] font-black uppercase tracking-widest">ASCEND</span>
            </motion.button>
          </div>
    </footer>
  );
};

export default Footer;