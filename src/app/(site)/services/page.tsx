"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  FiArrowRight, FiCheckCircle, FiStar, 
  FiShield, FiClock
} from 'react-icons/fi';

// --- SERVICE DATA ---
const SERVICES = [
  {
    id: "01",
    slug: "end-of-lease",
    title: "End of Lease Cleaning",
    sub: "100% Bond Back Guarantee",
    desc: "Our specialized team follows a strict real-estate checklist to ensure every corner of your rental property is spotless.",
    features: ["Kitchen Deep Clean", "Window Scrub", "Wall Spot Removal", "Carpet Steam"],
    time: "4-8 Hours",
    price: "From $299"
  },
  {
    id: "02",
    slug: "residential-deep-clean",
    title: "Residential Deep Clean",
    sub: "For a Healthier Home",
    desc: "We go beyond the surface to remove dust, allergens, and hidden dirt using hospital-grade equipment.",
    features: ["Sanitized Bath", "Dust-Free", "Floor Mopping", "Kitchen Scrub"],
    time: "3-5 Hours",
    price: "From $150"
  },
  {
    id: "03",
    slug: "commercial-office",
    title: "Commercial & Office Ops",
    sub: "Professional Workspace",
    desc: "Scheduled maintenance for corporate hubs and shops, ensuring a safe and hygienic environment.",
    features: ["Desk Sanitization", "High-Traffic Care", "Waste Mgmt", "Restroom Hygiene"],
    time: "Flexible",
    price: "Custom Quote"
  },
  {
    id: "04",
    slug: "ndis-specialized",
    title: "NDIS Specialized Care",
    sub: "Safe & Compassionate",
    desc: "High-standard cleaning services tailored for NDIS participants with strict reliability and respect.",
    features: ["Safety-First", "Custom Schedule", "Insured Staff", "Accessible Support"],
    time: "Recurring",
    price: "NDIS Rates"
  },
  {
    id: "05",
    slug: "after-builders",
    title: "After Builders Cleaning",
    sub: "Post-Construction Recovery",
    desc: "Removing fine construction dust, paint splatters, and debris left behind after renovation.",
    features: ["Fine Dust Extraction", "Paint Removal", "Sticker Peel", "Interior Polish"],
    time: "6-10 Hours",
    price: "From $450"
  }
];

const SectionLabel = ({ text, dark = false }: { text: string, dark?: boolean }) => (
  <span className={`text-[9px] font-black uppercase tracking-[0.4em] mb-3 block italic ${dark ? 'text-gray-500' : 'text-yellow-400'}`}>
    // {text}
  </span>
);

export default function ServicesPage() {
  return (
    <main className="bg-white min-h-screen font-sans selection:bg-yellow-400">
      
      {/* 1. HERO SECTION */}
      <section className="pt-40 pb-20 px-6 md:px-12 bg-[#1A1A1A] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
          <h2 className="text-[25vw] font-black italic text-white leading-none -ml-10">TIGERS</h2>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <SectionLabel text="Service Catalogue 2026" />
            <h1 className="text-6xl md:text-[90px] font-black uppercase italic tracking-tighter leading-[0.85] text-white">
              ELITE <span className="text-yellow-400">CLEANING</span> <br /> 
              <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>SOLUTIONS.</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* 2. WHY CHOOSE US - COMPACT */}
      <section className="py-12 px-6 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: FiShield, title: "Fully Insured", desc: "Police-checked and covered by public liability." },
            { icon: FiClock, title: "Reliable Timing", desc: "On time, every time. Your schedule is our priority." },
            { icon: FiStar, title: "Quality Guarantee", desc: "Fix-it-free guarantee within 48 hours." }
          ].map((item, i) => (
            <div key={i} className="flex gap-4 items-center">
              <div className="bg-black p-3 rounded-xl text-yellow-400 shrink-0">
                <item.icon size={20} />
              </div>
              <div>
                <h4 className="font-black italic uppercase tracking-tighter text-lg text-black leading-none">{item.title}</h4>
                <p className="text-[10px] text-gray-500 font-bold uppercase mt-1 tracking-wider">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. COMPACT SERVICE LIST - LINKABLE & BORDERED */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-6">
          {SERVICES.map((service, idx) => (
            <Link href={`/services/${service.slug}`} key={service.id} className="block group">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border border-gray-200 rounded-[3rem] p-8 md:p-12 hover:border-black transition-all duration-500 hover:shadow-xl relative flex flex-col lg:flex-row items-center gap-8"
              >
                {/* ID & Info */}
                <div className="lg:w-1/3 space-y-4">
                  <span className="text-5xl font-black italic text-gray-100 group-hover:text-yellow-400 transition-colors leading-none">
                    {service.id}
                  </span>
                  <div>
                    <SectionLabel text={service.sub} dark />
                    <h3 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter leading-none text-black">
                      {service.title}
                    </h3>
                  </div>
                  <div className="flex gap-2">
                    <div className="bg-gray-100 px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest flex items-center gap-2 text-gray-600">
                      <FiClock /> {service.time}
                    </div>
                    <div className="bg-black text-white px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest">
                      {service.price}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="lg:w-5/12 space-y-6 lg:border-l lg:border-gray-100 lg:pl-10">
                  <p className="text-gray-500 text-xs font-medium leading-relaxed">
                    {service.desc}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {service.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2">
                        <FiCheckCircle className="text-yellow-500 shrink-0" size={14} />
                        <span className="text-[9px] font-black uppercase tracking-wide text-black">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <div className="lg:w-1/4 flex justify-end">
                  <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-yellow-400 group-hover:border-yellow-400 group-hover:text-black transition-all duration-500">
                    <FiArrowRight size={24} />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. COMPACT CALL TO ACTION */}
      <section className="pb-24 px-6">
        <div className="max-w-5xl mx-auto bg-black rounded-[4rem] p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#FACC1515_0%,transparent_70%)]" />

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative z-10 space-y-6"
          >
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white leading-none">
              Need a Custom <span className="text-yellow-400">Solution?</span>
            </h2>
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] max-w-lg mx-auto leading-relaxed">
              Every space is unique. Contact us for a tailor-made cleaning plan that fits your requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button className="bg-yellow-400 text-black px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all">
                Get a Quote
              </button>
              <button className="border border-white text-white px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                Contact Ops
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}