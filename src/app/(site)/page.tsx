"use client";
import React from 'react';
import { ArrowRight, Star, Shield, Clock, CheckCircle2, ChevronRight } from 'lucide-react';
import { FiTarget, FiShield, FiDroplet, FiArrowRight, FiZap } from 'react-icons/fi';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Hero from '../../components/modules/hero';
import ServiceCard from '../../components/modules/ServiceCard';// তোর ফাইল পাথ ঠিক থাকলে এটা থাকবে
import BookingForm from '../../components/modules/BookingForm';
import ProcessSection from '../../components/modules/ProcessSection';
import FAQSection from '../../components/modules/FAQSection';
import BeforeAfter from '@/src/components/modules/BeforeAfterSlider';

export default function HomePage() {
  return (
    <main className="bg-white overflow-hidden">
      
      <Hero/>

      {/* --- STATS SECTION: MASSIVE NUMBERS --- */}
      <section className="py-20 bg-brand-yellow relative z-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { n: "5K+", t: "Surfaces Polished" },
            { n: "100%", t: "Bond Back Guarantee" },
            { n: "15+", t: "Elite Tiger Squads" },
            { n: "24/7", t: "Jungle Support" }
          ].map((s, i) => (
            <div key={i} className="text-center md:text-left border-l-2 border-black/10 pl-8">
              <div className="text-5xl font-black text-black leading-none mb-2 tracking-tighter">{s.n}</div>
              <div className="text-sm font-bold uppercase text-black/60 tracking-widest">{s.t}</div>
            </div>
          ))}
        </div>
      </section>
      
      {/* --- SECTION: PREMIUM CLEANING OPERATIONS (SEO OPTIMIZED) --- */}
<section className="py-24 bg-[#F7F7F7] overflow-hidden relative">
  <div className="max-w-7xl mx-auto px-6 relative z-10">
    
    {/* Header Section - No Empty Space, Fully Content Packed */}
    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16 pb-12 border-b border-gray-200">
      
      {/* Left Column: Core Branding & Headline */}
      <div className="md:col-span-7">
        <motion.span 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="text-black font-black uppercase tracking-[0.4em] text-[10px] mb-4 block border-l-4 border-yellow-400 pl-4"
        >
          Industry Standard Cleaning Meta
        </motion.span>
        <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none text-black">
          YOUR TRUSTED <br /> <span className="text-gray-200">CLEANING PARTNER.</span>
        </h2>
        <div className="mt-8 flex flex-wrap gap-3">
          <span className="text-[8px] font-black uppercase bg-white border border-gray-200 px-3 py-1 rounded-full">Residential Expert</span>
          <span className="text-[8px] font-black uppercase bg-white border border-gray-200 px-3 py-1 rounded-full">Commercial Grade</span>
          <span className="text-[8px] font-black uppercase bg-white border border-gray-200 px-3 py-1 rounded-full">Eco-Friendly Ops</span>
        </div>
      </div>

      {/* Right Column: SEO Content & Operational Stats (Fixing the Mark Area) */}
      <div className="md:col-span-5 flex flex-col justify-end">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm mb-6">
          <h4 className="text-[10px] font-black uppercase tracking-widest mb-3 text-yellow-500">Why Professional Care Matters?</h4>
          <p className="text-gray-500 text-[11px] font-medium leading-relaxed uppercase tracking-tight">
            Our cleaning protocols go beyond surface shine. We implement hospital-grade sanitization cycles that eliminate 99.9% of household bacteria and allergens. By choosing our specialized teams, you ensure a sterile environment that promotes health, productivity, and absolute peace of mind.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="text-3xl font-black tracking-tighter text-black">99.7%</span>
            <p className="text-[8px] font-black uppercase text-gray-400 tracking-[0.2em]">Bond Back Success Rate</p>
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-black tracking-tighter text-black">2026</span>
            <p className="text-[8px] font-black uppercase text-gray-400 tracking-[0.2em]">Certified Standards</p>
          </div>
        </div>
      </div>
    </div>

    {/* The Package Grid - Using Your Requested Design Style */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      
      {/* CARD 01: RESIDENTIAL RECON */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.7, 0, 0.84, 0] }}
        className="bg-white p-10 rounded-[4rem] shadow-sm hover:shadow-2xl transition-all duration-700 group border border-gray-50 flex flex-col h-[560px] relative overflow-hidden"
      >
        <div className="flex justify-between items-start mb-10">
          <span className="px-4 py-1.5 bg-black text-white text-[9px] font-black uppercase rounded-full tracking-widest">Domestic Care</span>
          <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100 group-hover:bg-yellow-400 transition-all duration-500">
            <FiArrowRight className="text-black -rotate-45 group-hover:rotate-0 transition-transform" />
          </div>
        </div>

        <div className="mb-8">
          <h4 className="text-3xl font-black uppercase italic leading-[0.9] tracking-tighter">Residential <br/> Refresh</h4>
          <p className="text-gray-400 text-[10px] font-black uppercase mt-3 tracking-[0.2em] italic">Standard Home Maintenance</p>
        </div>

        <p className="text-[11px] text-gray-400 uppercase font-bold leading-[1.6] mb-10 border-l-2 border-gray-100 pl-4">
          A comprehensive sanitization protocol designed for modern living spaces. We focus on high-traffic zones and essential hygiene standards.
        </p>

        <div className="flex items-baseline gap-1 mb-10 border-b border-gray-50 pb-8 mt-auto">
          <span className="text-5xl font-black tracking-tighter text-black">$189</span>
          <span className="text-gray-300 text-[11px] font-black uppercase tracking-widest">/Fixed Rate</span>
        </div>

        <ul className="space-y-4">
          {["Professional Kitchen Scrub", "Bathroom Sanitization", "Floor Deep Steam Clean"].map((item, idx) => (
            <li key={idx} className="flex items-center gap-3 text-[9px] font-black text-gray-500 uppercase tracking-widest">
              <div className="w-1.5 h-1.5 rounded-full bg-black" />
              {item}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* CARD 02: DOMINION DEEP (FEATURED) */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.7, 0, 0.84, 0], delay: 0.1 }}
        className="bg-white p-10 rounded-[4rem] shadow-xl hover:shadow-2xl transition-all duration-700 group border-2 border-yellow-400 flex flex-col h-[560px] relative lg:-translate-y-6"
      >
        <div className="absolute top-6 right-10 bg-yellow-400 text-black text-[8px] font-black uppercase px-4 py-1.5 rounded-full tracking-[0.2em] shadow-lg animate-pulse">Most Requested</div>
        <div className="flex justify-between items-start mb-10">
          <span className="px-4 py-1.5 bg-black text-white text-[9px] font-black uppercase rounded-full tracking-widest">Premium Deep</span>
          <div className="w-12 h-12 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-inner">
            <FiArrowRight className="text-black -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
          </div>
        </div>

        <div className="mb-8">
          <h4 className="text-3xl font-black uppercase italic leading-[0.9] tracking-tighter">Estate <br/> Deep Clean</h4>
          <p className="text-gray-500 text-[10px] font-black uppercase mt-3 tracking-[0.2em] italic">Full Property Restoration</p>
        </div>

        <p className="text-[11px] text-gray-400 uppercase font-bold leading-[1.6] mb-10 border-l-2 border-yellow-200 pl-4">
          Intensive restoration cycle for large estates. Targeting allergens, dust reservoirs, and hard-to-reach structural corners.
        </p>

        <div className="flex items-baseline gap-1 mb-10 border-b border-gray-100 pb-8 mt-auto">
          <span className="text-5xl font-black tracking-tighter text-black">$349</span>
          <span className="text-gray-400 text-[11px] font-black uppercase tracking-widest">/Full Scope</span>
        </div>

        <ul className="space-y-4">
          {["Window Track Extraction", "Eco-Steam Deodorization", "4-Man Specialist Team"].map((item, idx) => (
            <li key={idx} className="flex items-center gap-3 text-[9px] font-black text-black uppercase tracking-widest">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
              {item}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* CARD 03: CORPORATE HUB */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.7, 0, 0.84, 0], delay: 0.2 }}
        className="bg-white p-10 rounded-[4rem] shadow-sm hover:shadow-2xl transition-all duration-700 group border border-gray-50 flex flex-col h-[560px]"
      >
        <div className="flex justify-between items-start mb-10">
          <span className="px-4 py-1.5 bg-black text-white text-[9px] font-black uppercase rounded-full tracking-widest">Corporate Elite</span>
          <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100 group-hover:bg-yellow-400 transition-all duration-500">
            <FiArrowRight className="text-black -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
          </div>
        </div>

        <div className="mb-8">
          <h4 className="text-3xl font-black uppercase italic leading-[0.9] tracking-tighter">Workspace <br/> Nexus</h4>
          <p className="text-gray-400 text-[10px] font-black uppercase mt-3 tracking-[0.2em] italic">Enterprise Maintenance</p>
        </div>

        <p className="text-[11px] text-gray-400 uppercase font-bold leading-[1.6] mb-10 border-l-2 border-gray-100 pl-4">
          High-performance cleaning for commercial environments. Ensuring a sterile, productive, and inviting hub for your professional team.
        </p>

        <div className="flex items-baseline gap-1 mb-10 border-b border-gray-50 pb-8 mt-auto">
          <span className="text-5xl font-black tracking-tighter text-black">$599</span>
          <span className="text-gray-300 text-[11px] font-black uppercase tracking-widest">/Starting Rate</span>
        </div>

        <ul className="space-y-4">
          {["Workstation Sanitization", "Bio-Waste Management", "After-Hours Dispatch"].map((item, idx) => (
            <li key={idx} className="flex items-center gap-3 text-[9px] font-black text-gray-500 uppercase tracking-widest">
              <div className="w-1.5 h-1.5 rounded-full bg-black" />
              {item}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>

    {/* Workflow Banner - Fixing the एलाइनমেন্ট Problem */}
    <div className="mt-20 bg-black text-white p-10 rounded-[3rem] relative overflow-hidden flex flex-col md:flex-row items-center gap-8 border border-gray-800">
      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400 opacity-5 blur-3xl rounded-full" />
      <h5 className="text-[11px] font-black uppercase tracking-[0.4em] border-l-4 border-yellow-400 pl-6 leading-tight">
        Service <br /> Delivery <br /> Pipeline
      </h5>
      <div className="flex-grow grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        {[
          "1. Space Audit",
          "2. Team Dispatch",
          "3. Deep Pounce",
          "4. Quality Sign-off"
        ].map((step, idx) => (
          <div key={idx} className="flex items-center gap-4">
            <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 border border-gray-800 px-4 py-2 rounded-full whitespace-nowrap">
              {step}
            </span>
            {idx < 3 && <span className="hidden md:block text-gray-700">→</span>}
          </div>
        ))}
      </div>
    </div>

    {/* Final CTA - Linked to Pricing */}
    <div className="mt-16 flex flex-col items-center">
      <Link href="/pricing">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-black text-white px-14 py-6 rounded-full text-[12px] font-black uppercase tracking-[0.3em] hover:bg-yellow-400 hover:text-black transition-all duration-700 shadow-2xl flex items-center gap-6 group"
        >
          EXPLORE COMPLETE RATE LOADOUT
          <FiArrowRight className="group-hover:translate-x-3 transition-transform text-xl" />
        </motion.button>
      </Link>
      <p className="mt-8 text-[9px] font-black text-gray-300 uppercase tracking-[0.5em] italic">
        © 2026 Sparks Professional Care | High-Intensity Sanitization Standard
      </p>
    </div>

  </div>
</section>
      
      {/* --- HOME PAGE SECTION: CORE DOMAINS (FINAL OPTIMIZED VOL) --- */}
<section className="py-24 bg-white relative overflow-hidden">
  <div className="max-w-7xl mx-auto px-6">
    
    {/* Header Section */}
    <motion.div 
      initial={{ opacity: 0, x: -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.42, 0, 1, 1] }}
      className="flex flex-col md:flex-row justify-between items-end mb-16 pb-8 border-b-2 border-black"
    >
      <div>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-yellow-400 animate-pulse" />
          <span className="text-[15px] font-black uppercase tracking-[0.4em]">Service Registry 2026</span>
        </div>
        <h2 className="text-7xl font-black uppercase italic tracking-tighter text-black">
          CORE <span className="text-gray-300">DOMAINS.</span>
        </h2>
      </div>
      <div className="text-right hidden md:block">
        <p className="text-[15px] font-black uppercase tracking-[0.2em] text-gray-400">Standardized Australian Protocols</p>
        <p className="text-[15px] font-black uppercase text-black italic font-bold">Operational Excellence Guaranteed</p>
      </div>
    </motion.div>

    <div className="flex flex-col">
      
      {/* SERVICE 01 */}
      <motion.div 
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.7, 0, 0.84, 0] }}
        className="group border-b border-gray-100 hover:bg-[#FBFBFB] transition-all duration-300"
      >
        <Link href="/services/end-of-lease" className="block">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between py-10 px-2 relative overflow-hidden">
            <div className="absolute left-0 top-0 h-full w-0 bg-black group-hover:w-1 transition-all duration-300" />
            <div className="flex items-start gap-8 lg:gap-12 relative z-10">
              <span className="text-[15px] font-black text-gray-200 group-hover:text-black mt-2 transition-colors italic">01</span>
              <div className="max-w-md">
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="text-4xl font-black uppercase italic tracking-tighter transition-all">End of Lease</h4>
                  <span className="px-2 py-0.5 bg-gray-100 text-[10px] font-black uppercase border border-gray-200 group-hover:bg-yellow-400 group-hover:border-yellow-400 transition-colors">High Demand</span>
                </div>
                <p className="text-yellow-500 text-[14px] font-black uppercase tracking-[0.2em] mb-3">Bond Recovery Protocol</p>
                <p className="text-gray-400 text-[14px] leading-snug group-hover:text-gray-600 transition-colors uppercase font-medium">Professional sanitization meeting all Australian real estate exit standards for 100% bond return.</p>
              </div>
            </div>
            <div className="mt-6 lg:mt-0 flex items-center justify-between lg:justify-end gap-16 relative z-10">
              <div className="hidden xl:flex flex-col text-right border-r-2 border-gray-100 pr-8">
                <span className="text-[12px] font-black uppercase text-gray-300 tracking-[0.2em]">Efficiency Rate</span>
                <span className="text-[12px] font-black uppercase text-black">99% Success</span>
              </div>
              <div className="flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-300">
                <span className="text-[12px] font-black uppercase italic hidden md:block tracking-widest">Open Ops</span>
                <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-yellow-400 group-hover:text-black transition-all">
                  <FiArrowRight className="text-xl -rotate-45 group-hover:rotate-0 transition-all duration-500" />
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* SERVICE 02 */}
      <motion.div 
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.7, 0, 0.84, 0] }}
        className="group border-b border-gray-100 hover:bg-[#FBFBFB] transition-all duration-300"
      >
        <Link href="/services/ndis-cleaning" className="block">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between py-10 px-2 relative overflow-hidden">
            <div className="absolute left-0 top-0 h-full w-0 bg-black group-hover:w-1 transition-all duration-300" />
            <div className="flex items-start gap-8 lg:gap-12 relative z-10">
              <span className="text-[15px] font-black text-gray-200 group-hover:text-black mt-2 transition-colors italic">02</span>
              <div className="max-w-md">
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="text-4xl font-black uppercase italic tracking-tighter">NDIS Cleaning</h4>
                  <span className="px-2 py-0.5 bg-gray-100 text-[10px] font-black uppercase border border-gray-200 group-hover:bg-yellow-400 group-hover:border-yellow-400 transition-colors">Certified</span>
                </div>
                <p className="text-yellow-500 text-[14px] font-black uppercase tracking-[0.2em] mb-3">Registered Care Standards</p>
                <p className="text-gray-400 text-[14px] leading-snug group-hover:text-gray-600 transition-colors uppercase font-medium">Specialized support for NDIS participants with strict adherence to health and safety compliance.</p>
              </div>
            </div>
            <div className="mt-6 lg:mt-0 flex items-center justify-between lg:justify-end gap-16 relative z-10">
              <div className="hidden xl:flex flex-col text-right border-r-2 border-gray-100 pr-8">
                <span className="text-[12px] font-black uppercase text-gray-300 tracking-[0.2em]">Efficiency Rate</span>
                <span className="text-[12px] font-black uppercase text-black">Ndis Compliant</span>
              </div>
              <div className="flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-300">
                <span className="text-[12px] font-black uppercase italic hidden md:block tracking-widest">Open Ops</span>
                <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-yellow-400 group-hover:text-black transition-all">
                  <FiArrowRight className="text-xl -rotate-45 group-hover:rotate-0 transition-all duration-500" />
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* SERVICE 03 */}
      <motion.div 
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.7, 0, 0.84, 0] }}
        className="group border-b border-gray-100 hover:bg-[#FBFBFB] transition-all duration-300"
      >
        <Link href="/services/commercial-office" className="block">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between py-10 px-2 relative overflow-hidden">
            <div className="absolute left-0 top-0 h-full w-0 bg-black group-hover:w-1 transition-all duration-300" />
            <div className="flex items-start gap-8 lg:gap-12 relative z-10">
              <span className="text-[15px] font-black text-gray-200 group-hover:text-black mt-2 transition-colors italic">03</span>
              <div className="max-w-md">
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="text-4xl font-black uppercase italic tracking-tighter">Commercial Office</h4>
                  <span className="px-2 py-0.5 bg-gray-100 text-[10px] font-black uppercase border border-gray-200 group-hover:bg-yellow-400 group-hover:border-yellow-400 transition-colors">Contractual</span>
                </div>
                <p className="text-yellow-500 text-[14px] font-black uppercase tracking-[0.2em] mb-3">Corporate Sanitization</p>
                <p className="text-gray-400 text-[14px] leading-snug group-hover:text-gray-600 transition-colors uppercase font-medium">High-intensity workspace maintenance ensuring a sterile and productive environment for enterprise hubs.</p>
              </div>
            </div>
            <div className="mt-6 lg:mt-0 flex items-center justify-between lg:justify-end gap-16 relative z-10">
              <div className="hidden xl:flex flex-col text-right border-r-2 border-gray-100 pr-8">
                <span className="text-[12px] font-black uppercase text-gray-300 tracking-[0.2em]">Efficiency Rate</span>
                <span className="text-[12px] font-black uppercase text-black">Daily Ops</span>
              </div>
              <div className="flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-300">
                <span className="text-[12px] font-black uppercase italic hidden md:block tracking-widest">Open Ops</span>
                <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-yellow-400 group-hover:text-black transition-all">
                  <FiArrowRight className="text-xl -rotate-45 group-hover:rotate-0 transition-all duration-500" />
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* SERVICE 04 */}
      <motion.div 
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.7, 0, 0.84, 0] }}
        className="group border-b border-gray-100 hover:bg-[#FBFBFB] transition-all duration-300"
      >
        <Link href="/services/post-construction" className="block">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between py-10 px-2 relative overflow-hidden">
            <div className="absolute left-0 top-0 h-full w-0 bg-black group-hover:w-1 transition-all duration-300" />
            <div className="flex items-start gap-8 lg:gap-12 relative z-10">
              <span className="text-[15px] font-black text-gray-200 group-hover:text-black mt-2 transition-colors italic">04</span>
              <div className="max-w-md">
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="text-4xl font-black uppercase italic tracking-tighter transition-all">Post-Construction</h4>
                  <span className="px-2 py-0.5 bg-gray-100 text-[10px] font-black uppercase border border-gray-200 group-hover:bg-yellow-400 group-hover:border-yellow-400 transition-colors">Heavy Duty</span>
                </div>
                <p className="text-yellow-500 text-[14px] font-black uppercase tracking-[0.2em] mb-3">Industrial Debris Removal</p>
                <p className="text-gray-400 text-[14px] leading-snug group-hover:text-gray-600 transition-colors uppercase font-medium">Comprehensive extraction of industrial dust and debris from newly built or renovated sites.</p>
              </div>
            </div>
            <div className="mt-6 lg:mt-0 flex items-center justify-between lg:justify-end gap-16 relative z-10">
              <div className="hidden xl:flex flex-col text-right border-r-2 border-gray-100 pr-8">
                <span className="text-[12px] font-black uppercase text-gray-300 tracking-[0.2em]">Efficiency Rate</span>
                <span className="text-[12px] font-black uppercase text-black">Handover Ready</span>
              </div>
              <div className="flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-300">
                <span className="text-[12px] font-black uppercase italic hidden md:block tracking-widest">Open Ops</span>
                <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-yellow-400 group-hover:text-black transition-all">
                  <FiArrowRight className="text-xl -rotate-45 group-hover:rotate-0 transition-all duration-500" />
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* SERVICE 05 */}
      <motion.div 
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.7, 0, 0.84, 0] }}
        className="group border-b border-gray-100 hover:bg-[#FBFBFB] transition-all duration-300"
      >
        <Link href="/services/deep-spring-clean" className="block">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between py-10 px-2 relative overflow-hidden">
            <div className="absolute left-0 top-0 h-full w-0 bg-black group-hover:w-1 transition-all duration-300" />
            <div className="flex items-start gap-8 lg:gap-12 relative z-10">
              <span className="text-[15px] font-black text-gray-200 group-hover:text-black mt-2 transition-colors italic">05</span>
              <div className="max-w-md">
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="text-4xl font-black uppercase italic tracking-tighter transition-all">Deep Spring Clean</h4>
                  <span className="px-2 py-0.5 bg-gray-100 text-[10px] font-black uppercase border border-gray-200 group-hover:bg-yellow-400 group-hover:border-yellow-400 transition-colors">Premium</span>
                </div>
                <p className="text-yellow-500 text-[14px] font-black uppercase tracking-[0.2em] mb-3">Full Interior Restoration</p>
                <p className="text-gray-400 text-[14px] leading-snug group-hover:text-gray-600 transition-colors uppercase font-medium">Intensive floor-to-ceiling restoration focusing on deep-seated allergens and stubborn grime.</p>
              </div>
            </div>
            <div className="mt-6 lg:mt-0 flex items-center justify-between lg:justify-end gap-16 relative z-10">
              <div className="hidden xl:flex flex-col text-right border-r-2 border-gray-100 pr-8">
                <span className="text-[12px] font-black uppercase text-gray-300 tracking-[0.2em]">Efficiency Rate</span>
                <span className="text-[12px] font-black uppercase text-black">40-Point Audit</span>
              </div>
              <div className="flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-300">
                <span className="text-[12px] font-black uppercase italic hidden md:block tracking-widest">Open Ops</span>
                <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-yellow-400 group-hover:text-black transition-all">
                  <FiArrowRight className="text-xl -rotate-45 group-hover:rotate-0 transition-all duration-500" />
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* SERVICE 06 */}
      <motion.div 
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.7, 0, 0.84, 0] }}
        className="group border-b border-gray-100 hover:bg-[#FBFBFB] transition-all duration-300"
      >
        <Link href="/services/strata-cleaning" className="block">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between py-10 px-2 relative overflow-hidden">
            <div className="absolute left-0 top-0 h-full w-0 bg-black group-hover:w-1 transition-all duration-300" />
            <div className="flex items-start gap-8 lg:gap-12 relative z-10">
              <span className="text-[15px] font-black text-gray-200 group-hover:text-black mt-2 transition-colors italic">06</span>
              <div className="max-w-md">
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="text-4xl font-black uppercase italic tracking-tighter transition-all">Strata Maintenance</h4>
                  <span className="px-2 py-0.5 bg-gray-100 text-[10px] font-black uppercase border border-gray-200 group-hover:bg-yellow-400 group-hover:border-yellow-400 transition-colors">Active</span>
                </div>
                <p className="text-yellow-500 text-[14px] font-black uppercase tracking-[0.2em] mb-3">Multi-Unit Property Care</p>
                <p className="text-gray-400 text-[14px] leading-snug group-hover:text-gray-600 transition-colors uppercase font-medium">Systematic care and maintenance of common areas within multi-unit residential developments.</p>
              </div>
            </div>
            <div className="mt-6 lg:mt-0 flex items-center justify-between lg:justify-end gap-16 relative z-10">
              <div className="hidden xl:flex flex-col text-right border-r-2 border-gray-100 pr-8">
                <span className="text-[12px] font-black uppercase text-gray-300 tracking-[0.2em]">Efficiency Rate</span>
                <span className="text-[12px] font-black uppercase text-black">Body Corp Std.</span>
              </div>
              <div className="flex items-center gap-4 group-hover:translate-x-2 transition-transform duration-300">
                <span className="text-[12px] font-black uppercase italic hidden md:block tracking-widest">Open Ops</span>
                <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-yellow-400 group-hover:text-black transition-all">
                  <FiArrowRight className="text-xl -rotate-45 group-hover:rotate-0 transition-all duration-500" />
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>

    </div>
  </div>
      </section>

      <BeforeAfter/>
      {/* --- FINAL BOOKING SECTION --- */}
      <section id="book-now" className="py-32">
        <BookingForm />
      </section>

    </main>
  );
}