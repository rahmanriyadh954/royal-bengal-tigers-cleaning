"use client";

import React, { useState, useRef, useCallback, FC } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { 
  FiMove, FiMaximize2, FiArrowUpRight, FiZap, FiTarget 
} from 'react-icons/fi';

// --- UPDATED PROJECT DATA (With better Before image for Project 03) ---
const PROJECTS_DATA = [
  {
    id: "01",
    title: "Executive Office",
    category: "Deep Sanitization",
    headerBrief: "Transforming corporate workspaces into high-safety zones with medical-grade disinfection protocols.",
    before: "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?q=80&w=2000",
    after: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2000",
    purity: "99.9%",
    duration: "4 Hours",
    detailedAnalysis: "Our team executed a full microbial sweep, focusing on high-touch surfaces and HVAC vents. Using non-toxic solutions, we ensured the office was ready for staff within hours."
  },
  {
    id: "02",
    title: "Luxury Kitchen",
    category: "Steam Cleaning",
    headerBrief: "Eliminating deep-seated grease and organic residues using high-pressure thermal technology.",
    before: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2000",
    after: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?q=80&w=2000",
    purity: "100%",
    duration: "2.5 Hours",
    detailedAnalysis: "Post-cleaning analysis showed zero traces of carbonized grease. We utilized steam at 180°C to sanitize porous stone countertops without using harsh abrasives."
  },
  {
    id: "03",
    title: "Industrial Lab",
    category: "Hazardous Clean",
    headerBrief: "Specialized decontamination for sensitive laboratory environments requiring ISO compliance.",
    before: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2000",
    after: "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?q=80&w=2000",
    purity: "99.99%",
    duration: "6 Hours",
    detailedAnalysis: "Bio-hazard compliant cleaning involving air filtration and chemical residue removal. We successfully removed contaminants from sensitive electronic testing equipment."
  }
];

const CleaningBeforeAfter: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeProject = PROJECTS_DATA[currentIndex];
  
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(50);
  const springX = useSpring(mouseX, { damping: 30, stiffness: 300 });

  const handleMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(0, Math.min(100, position)));
    mouseX.set(position);
  }, [mouseX]);

  return (
    <section className="relative py-12 bg-[#fcfcfc] overflow-hidden font-sans select-none">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* --- 1. DYNAMIC HEADER SECTION --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-[2px] bg-yellow-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-yellow-600">Visual Verification</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-gray-900 uppercase leading-[0.8] mb-6">
              The Art of <br /> <span className="text-yellow-500 italic">Sterilization.</span>
            </h2>
            <AnimatePresence mode="wait">
              <motion.p 
                key={activeProject.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-gray-500 text-lg font-medium leading-tight max-w-lg border-l-2 border-gray-100 pl-6"
              >
                {activeProject.headerBrief}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Project Buttons */}
          <div className="flex flex-wrap gap-3 self-end lg:self-center mt-30">
            {PROJECTS_DATA.map((project, index) => (
              <button
                key={project.id}
                onClick={() => {
                  setCurrentIndex(index);
                  setSliderPos(50); // Reset slider position on project change
                }}
                className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                  currentIndex === index 
                  ? "bg-gray-900 text-white shadow-xl scale-110" 
                  : "bg-white text-gray-400 border border-gray-100 hover:border-yellow-500"
                }`}
              >
                Project {project.id}
              </button>
            ))}
          </div>
        </div>

        {/* --- 2. SLIDER CONTAINER --- */}
        <div 
          ref={containerRef}
          onMouseMove={handleMove}
          onTouchMove={handleMove}
          className="relative h-[500px] md:h-[500px] w-full bg-white rounded-[45px] overflow-hidden cursor-none shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border-[10px] border-white"
        >
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeProject.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <img src={activeProject.after} className="w-full h-full object-cover" alt="After" />
              <motion.div 
                style={{ width: `${sliderPos}%` }} 
                className="absolute inset-0 z-10 overflow-hidden border-r-[3px] border-white/70"
              >
                <div className="absolute inset-0 w-[1280px] h-full">
                  <img 
                    src={activeProject.before} 
                    className="w-full h-full object-cover grayscale-[0.2] brightness-90"
                    style={{ width: containerRef.current?.offsetWidth }}
                    alt="Before" 
                  />
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* HUD Status Labels */}
          <div className="absolute top-8 left-8 z-30 bg-black/50 backdrop-blur-md px-5 py-2 rounded-full text-[9px] font-bold text-white uppercase tracking-widest border border-white/10">
            Status: Pre-Cleaning condition
          </div>
          <div className="absolute top-8 right-8 z-30 bg-yellow-500 px-5 py-2 rounded-full text-[9px] font-bold text-black uppercase tracking-widest shadow-lg">
            Result: Clinical Grade
          </div>

          {/* Slider Handle */}
          <motion.div style={{ left: `${sliderPos}%` }} className="absolute top-0 bottom-0 z-20 pointer-events-none flex items-center justify-center">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-2xl rounded-full border border-white/30 flex flex-col items-center justify-center -translate-x-1/2 shadow-2xl">
              <FiMove className="text-white mb-1" size={20} />
              <span className="text-[9px] font-black text-white">{Math.round(sliderPos)}%</span>
            </div>
          </motion.div>
        </div>

        {/* --- 3. UPDATED DETAILS CARDS --- */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Detailed Info Card */}
          <motion.div 
            key={activeProject.id + "info"}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="lg:col-span-8 bg-white p-6 rounded-[40px] border border-gray-100 shadow-sm"
          >
            <div className="flex flex-col md:flex-row justify-between gap-10">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <span className="bg-yellow-500 text-black text-[9px] font-black px-4 py-1 rounded-full uppercase tracking-widest">
                    {activeProject.category}
                  </span>
                  <span className="text-gray-300 font-mono text-[10px]">ID_CORE_{activeProject.id}</span>
                </div>
                <h3 className="text-4xl font-black text-gray-900 uppercase italic mb-4">{activeProject.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-medium mb-6">
                  {activeProject.detailedAnalysis}
                </p>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 text-gray-900 font-bold text-xs">
                    <FiZap className="text-yellow-500" /> Bio-Safe Solution
                  </div>
                  <div className="flex items-center gap-2 text-gray-900 font-bold text-xs">
                    <FiTarget className="text-yellow-500" /> Precision Tech
                  </div>
                </div>
              </div>
              
              <div className="flex md:flex-col justify-around md:justify-center gap-8 bg-gray-50 px-10 py-6 rounded-[30px] border border-gray-100">
                <div className="text-center md:text-left">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Purity Index</p>
                  <p className="text-3xl font-black text-gray-900">{activeProject.purity}</p>
                </div>
                <div className="text-center md:text-left">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Time</p>
                  <p className="text-3xl font-black text-gray-900 whitespace-nowrap">{activeProject.duration}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Static CTA Card */}
          <a 
            href="/portfolio" 
            className="lg:col-span-4 bg-yellow-500 p-10 rounded-[40px] flex flex-col justify-between group hover:bg-gray-900 transition-all duration-700 relative overflow-hidden"
          >
            <div className="flex justify-between items-start relative z-10">
              <div className="w-14 h-14 bg-black/5 rounded-2xl flex items-center justify-center group-hover:bg-white/10 transition-colors">
                <FiMaximize2 className="text-black group-hover:text-yellow-500 transition-colors" size={28} />
              </div>
              <FiArrowUpRight className="text-black group-hover:text-yellow-500 group-hover:translate-x-2 group-hover:-translate-y-2 transition-all duration-500" size={32} />
            </div>
            <div className="relative z-10">
              <h4 className="text-2xl font-black text-black group-hover:text-white uppercase leading-tight">View Full <br /> Showcase</h4>
              <p className="text-black/40 group-hover:text-white/40 text-[10px] font-bold uppercase mt-4 tracking-[0.2em]">Explore our 2026 Archive</p>
            </div>
          </a>

        </div>
      </div>
    </section>
  );
};

export default CleaningBeforeAfter;