"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiShield, FiZap, FiAward } from 'react-icons/fi';

const PLANS = [
  { name: "BASIC RECON", price: "129", cycle: "per visit", features: ["2 Elite Agents", "Standard Sanitization", "Vacuum & Mop", "Kitchen/Bath Focus"], active: false },
  { name: "PREDATOR OPS", price: "450", cycle: "monthly", features: ["Weekly Deep Pounce", "HEPA Extraction", "Window Polishing", "Priority Scheduling", "NDIS Certified"], active: true },
  { name: "APEX SQUAD", price: "1.2K", cycle: "monthly", features: ["Daily Maintenance", "Full Sterilization", "Dedicated Team", "Waste Management", "Emergency Dispatch"], active: false }
];

export default function PricingPage() {
  return (
    <main className="bg-[#050505] text-white pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h1 className="text-7xl font-black uppercase italic tracking-tighter mb-4">SELECT YOUR <span className="text-yellow-400">LOADOUT.</span></h1>
          <p className="text-gray-500 text-xs uppercase font-bold tracking-[0.4em]">Automated Excellence on a Global Standard</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {PLANS.map((plan, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className={`p-16 rounded-[4rem] border transition-all duration-500 flex flex-col h-full ${plan.active ? 'border-yellow-400 bg-black shadow-2xl shadow-yellow-400/10' : 'border-gray-900 bg-transparent'}`}
            >
              {plan.active && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-black px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest">Most Deployed</span>}
              <h4 className="text-2xl font-black italic uppercase mb-8">{plan.name}</h4>
              
              <div className="flex items-baseline gap-2 mb-12">
                <span className="text-6xl font-black text-yellow-400">${plan.price}</span>
                <span className="text-gray-600 text-xs font-bold uppercase">{plan.cycle}</span>
              </div>

              <ul className="space-y-5 mb-16 flex-grow">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-4 text-xs font-bold text-gray-400 italic">
                    <FiCheck className="text-yellow-400" /> {f}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-6 rounded-2xl font-black uppercase text-xs tracking-[0.2em] transition-all ${plan.active ? 'bg-yellow-400 text-black hover:bg-white' : 'bg-white/5 text-white hover:bg-yellow-400 hover:text-black border border-white/10'}`}>
                INITIALIZE PLAN
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}