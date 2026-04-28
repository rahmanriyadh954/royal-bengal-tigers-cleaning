"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  FiZap, FiShield, FiUser, FiMail, FiPhone, 
  FiChevronDown, FiChevronRight, FiChevronLeft, 
  FiCalendar, FiMapPin, FiCheckCircle, FiLoader, 
  FiArrowRight, FiInfo, FiClock, FiActivity,
  FiAlertTriangle, FiCheck, FiSettings, FiLock
} from 'react-icons/fi';

/**
 * COMMAND PORTAL: ADVANCED BOOKING ENGINE
 * Style: Dark Industrial / Royal Bengal Tier
 * Features: Multi-step Validation, Tactical UI, High-Density Logic
 */

// --- TYPES & INTERFACES ---
interface FormData {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  location: string;
  notes: string;
  priority: 'Standard' | 'Tactical' | 'Emergency';
  agreement: boolean;
}

const BookingSystem = () => {
  // --- STATE MANAGEMENT ---
  const [step, setStep] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeHover, setActiveHover] = useState<number | null>(null);
  const [formProgress, setFormProgress] = useState(0);

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    service: 'Select Service Class',
    date: '',
    location: '',
    notes: '',
    priority: 'Standard',
    agreement: false
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  // --- CONFIGURATION DATA ---
  const services = useMemo(() => [
    "Elite Residential Scrub",
    "Industrial Site Sanitization",
    "Tactical Office Maintenance",
    "Deep Forensic Clean",
    "Commercial Disinfection Ops",
    "Post-Construction Cleanup"
  ], []);

  const featureAssets = [
    { 
      icon: FiZap, 
      title: 'Instant Dispatch', 
      desc: 'Real-time operative allocation across Tasmania.',
      status: 'Active'
    },
    { 
      icon: FiShield, 
      title: 'Tactical Quality', 
      desc: 'Rigorous Hobart standards with 100% security.',
      status: 'Verified'
    },
    { 
      icon: FiClock, 
      title: '24/7 Response', 
      desc: 'Emergency extraction teams on standby.',
      status: 'Ready'
    }
  ];

  // --- LOGIC & HANDLERS ---
  const calculateProgress = useCallback(() => {
    const fields = Object.values(formData).filter(val => val !== '' && val !== false).length;
    const totalFields = Object.keys(formData).length;
    setFormProgress((fields / totalFields) * 100);
  }, [formData]);

  useEffect(() => {
    calculateProgress();
  }, [calculateProgress]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({ ...prev, [name]: val }));
    
    // Clear error on change
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateStep = (currentStep: number) => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    
    if (currentStep === 1) {
      if (!formData.fullName) newErrors.fullName = "OPERATIVE NAME REQUIRED";
      if (!formData.email.includes('@')) newErrors.email = "INVALID TRANSMISSION ADDR";
      if (formData.service === 'Select Service Class') newErrors.service = "SELECT MISSION TYPE";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) setStep(prev => prev + 1);
  };

  const prevStep = () => setStep(prev => prev - 1);

  const selectService = (service: string) => {
    setFormData(prev => ({ ...prev, service }));
    setIsDropdownOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(step)) return;

    setIsSubmitting(true);
    // Industrial Simulation Delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  // --- ANIMATION VARIANTS ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="relative bg-[#FFFFFF] overflow-hidden min-h-screen flex items-center py-10 selection:bg-black selection:text-yellow-400">
      {/* AMBIENT BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:40px_40px] opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-400/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* TOP STATUS BAR */}
        <div className="flex justify-between items-center mb-12 border-b-2 border-black/5 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-4 h-4 bg-yellow-500 animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-black">System Status: Operational</span>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Protocol</span>
              <span className="text-[12px] font-black text-black uppercase">RBT-TAS-2026</span>
            </div>
            <div className="w-[2px] h-10 bg-black/10" />
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Encryption</span>
              <span className="text-[12px] font-black text-black uppercase text-green-600 flex items-center gap-2">
                <FiLock size={12} /> AES-256
              </span>
            </div>
          </div>
        </div>

        {/* MAIN MODULE CONTAINER */}
        <div className="flex flex-col lg:flex-row border-[8px] border-black shadow-[40px_40px_0px_0px_rgba(254,224,66,1)] bg-white items-start transition-all duration-500">
          
          {/* --- LEFT SIDE: THE INTEL PANEL --- */}
          <div className="w-full lg:w-[40%] bg-yellow-400 p-8 md:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden border-r-[6px] border-black h-auto">
            
            {/* Background Text Decal */}
            <div className="absolute -bottom-10 -left-10 text-[180px] font-black text-black/5 select-none leading-none rotate-12">
              ROYAL
            </div>

            <motion.div 
              initial="hidden" whileInView="visible" variants={containerVariants}
              className="space-y-14 relative z-10"
            >
              {/* Header Group */}
              <div className="space-y-8">
                <motion.div variants={itemVariants} className="flex items-center gap-4">
                  <span className="h-[2px] w-12 bg-black" />
                  <span className="text-black text-[13px] font-black uppercase tracking-[0.6em]">Operations Portal</span>
                </motion.div>
                
                <motion.h2 variants={itemVariants} className=" text-5xl sm:text-6xl lg:text-7xl font-black uppercase italic tracking-tighter leading-[0.8] text-black">
                  COMMAND <br /> 
                  <span className="text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">LOGISTICS.</span>
                </motion.h2>
                
                <motion.div variants={itemVariants} className="w-32 h-4 bg-black" />
              </div>

              {/* Feature Grid */}
              <div className="space-y-12">
                {featureAssets.map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    variants={itemVariants}
                    onMouseEnter={() => setActiveHover(idx)}
                    onMouseLeave={() => setActiveHover(null)}
                    className="flex gap-8 group cursor-crosshair"
                  >
                    <div className="relative">
                      <div className="w-20 h-20 bg-black flex items-center justify-center text-yellow-400 flex-shrink-0 border-4 border-black transition-all group-hover:bg-white group-hover:text-black">
                        <item.icon size={32} />
                      </div>
                      {activeHover === idx && (
                        <motion.div layoutId="hoverBox" className="absolute -inset-2 border-2 border-black z-[-1]" />
                      )}
                    </div>
                    
                    <div className="flex flex-col justify-center">
                      <div className="flex items-center gap-3">
                        <h4 className="text-black text-[18px] font-black uppercase tracking-tighter">{item.title}</h4>
                        <span className="text-[9px] bg-black text-white px-2 py-0.5 font-bold uppercase">{item.status}</span>
                      </div>
                      <p className="text-black/70 text-[14px] font-bold uppercase tracking-wide mt-2 max-w-[280px] leading-tight">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Bottom Branding / Links */}
            <div className="pt-12 relative z-10">
              <div className="flex flex-col gap-8">
                <div className="space-y-2">
                  <p className="text-black text-[13px] font-black uppercase tracking-widest flex items-center gap-3">
                    <FiInfo className="text-black" /> Secure Member Access
                  </p>
                  <p className="text-black/50 text-[11px] font-bold uppercase">Authorized personnel only.</p>
                </div>
                <Link href="/login" className="group">
                  <button className="w-full border-[6px] border-black px-8 py-5 text-[18px] font-black uppercase tracking-[0.4em] bg-black text-yellow-400 group-hover:bg-transparent group-hover:text-black transition-all relative overflow-hidden">
                    <span className="relative z-10">Access Dashboard</span>
                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* --- RIGHT SIDE: THE TACTICAL ENGINE --- */}
          <div className="w-full lg:w-[60%] bg-white p-8 md:p-12 lg:p-16 relative flex flex-col justify-center h-auto min-h-[900px]">
            
            {/* Progress Visualization */}
            <div className="mb-12">
              <div className="flex justify-between items-end mb-4">
                <h4 className="text-black text-[24px] font-black uppercase italic tracking-tighter">
                  PHASE 0{step} <span className="text-gray-300">/ 02</span>
                </h4>
                <div className="text-right">
                  <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Deployment Readiness</span>
                  <div className="text-[14px] font-black text-black">{Math.round(formProgress)}%</div>
                </div>
              </div>
              <div className="h-4 w-full bg-gray-100 border-2 border-black overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${formProgress}%` }}
                  className="h-full bg-yellow-400 border-r-4 border-black"
                />
              </div>
            </div>

            {/* Multi-Step Form Engine */}
            <form onSubmit={handleSubmit} className="relative flex-1">
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.4, ease: "circOut" }}
                    className="space-y-10"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                      
                      {/* Input: Full Name */}
                      <div className="group relative">
                        <label className={`text-[12px] font-black uppercase tracking-[0.4em] mb-4 block transition-colors ${errors.fullName ? 'text-red-500' : 'text-gray-400 group-focus-within:text-yellow-600'}`}>
                          01. Operative Identifier
                        </label>
                        <div className={`flex items-center border-b-4 ${errors.fullName ? 'border-red-500' : 'border-black/10 group-focus-within:border-black'} py-4 transition-all`}>
                          <FiUser className="text-black/20 mr-4 group-focus-within:text-black transition-colors" size={24} />
                          <input 
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            type="text" 
                            placeholder="INPUT FULL NAME" 
                            className="w-full bg-transparent text-[18px] font-black uppercase tracking-widest text-black placeholder:text-gray-200 focus:outline-none"
                          />
                        </div>
                        {errors.fullName && <p className="text-red-500 text-[9px] font-black mt-2 tracking-widest italic">{errors.fullName}</p>}
                      </div>

                      {/* Input: Email */}
                      <div className="group relative">
                        <label className={`text-[12px] font-black uppercase tracking-[0.4em] mb-4 block transition-colors ${errors.email ? 'text-red-500' : 'text-gray-400 group-focus-within:text-yellow-600'}`}>
                          02. Comms Frequency (Email)
                        </label>
                        <div className={`flex items-center border-b-4 ${errors.email ? 'border-red-500' : 'border-black/10 group-focus-within:border-black'} py-4 transition-all`}>
                          <FiMail className="text-black/20 mr-4 group-focus-within:text-black transition-colors" size={24} />
                          <input 
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            type="email" 
                            placeholder="ENCRYPTED ADDR" 
                            className="w-full bg-transparent text-[18px] font-black uppercase tracking-widest text-black placeholder:text-gray-200 focus:outline-none"
                          />
                        </div>
                        {errors.email && <p className="text-red-500 text-[9px] font-black mt-2 tracking-widest italic">{errors.email}</p>}
                      </div>

                      {/* Input: Phone */}
                      <div className="group relative">
                        <label className="text-gray-400 text-[12px] font-black uppercase tracking-[0.4em] mb-4 block group-focus-within:text-yellow-600 italic">
                          03. Direct Contact Line
                        </label>
                        <div className="flex items-center border-b-4 border-black/10 group-focus-within:border-black py-4 transition-all">
                          <FiPhone className="text-black/20 mr-4 group-focus-within:text-black transition-colors" size={24} />
                          <input 
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            type="tel" 
                            placeholder="+61 XXX XXX XXX" 
                            className="w-full bg-transparent text-[18px] font-black uppercase tracking-widest text-black placeholder:text-gray-200 focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Input: Service Dropdown */}
                      <div className="relative group">
                        <label className={`text-[12px] font-black uppercase tracking-[0.4em] mb-4 block transition-colors ${errors.service ? 'text-red-500' : 'text-gray-400 group-focus-within:text-yellow-600'}`}>
                          04. Deployment Category
                        </label>
                        <div 
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className={`flex items-center justify-between border-b-4 ${errors.service ? 'border-red-500' : 'border-black/10 group-focus-within:border-black'} py-4 cursor-pointer transition-all`}
                        >
                          <div className="flex items-center">
                            <FiActivity className="text-black/20 mr-4 group-focus-within:text-black" size={24} />
                            <span className="text-[18px] font-black uppercase tracking-widest text-black">
                              {formData.service}
                            </span>
                          </div>
                          <FiChevronDown className={`transition-transform duration-500 ${isDropdownOpen ? 'rotate-180' : ''}`} size={24} />
                        </div>
                        
                        <AnimatePresence>
                          {isDropdownOpen && (
                            <motion.div 
                              initial={{ opacity: 0, y: 20, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 20, scale: 0.95 }}
                              className="absolute left-0 right-0 top-[110%] bg-black z-50 border-4 border-yellow-400 shadow-[20px_20px_0px_0px_rgba(0,0,0,1)]"
                            >
                              {services.map((s, i) => (
                                <div 
                                  key={i} 
                                  onClick={() => selectService(s)}
                                  className="px-8 py-6 text-[14px] font-black uppercase tracking-[0.2em] text-white hover:bg-yellow-400 hover:text-black transition-all cursor-pointer border-b border-white/10 flex justify-between items-center group/item"
                                >
                                  {s}
                                  <FiArrowRight className="opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-2 transition-all" />
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                        {errors.service && <p className="text-red-500 text-[9px] font-black mt-2 tracking-widest italic">{errors.service}</p>}
                      </div>
                    </div>

                    {/* Step 1 Actions */}
                    <div className="pt-12 border-t-2 border-black/5">
                      <button 
                        type="button" 
                        onClick={nextStep}
                        className="flex items-center gap-6 bg-black text-white px-10 py-5 text-[16px] font-black uppercase tracking-[0.6em] hover:bg-yellow-400 hover:text-black transition-all relative group shadow-[15px_15px_0px_0px_rgba(254,224,66,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
                      >
                        Initiate Logistics <FiChevronRight className="group-hover:translate-x-3 transition-transform" size={24} />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="step2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-10"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                      {/* Input: Date */}
                      <div className="group relative">
                        <label className="text-gray-400 text-[12px] font-black uppercase tracking-[0.4em] mb-4 block group-focus-within:text-yellow-600 italic">
                          05. Preferred Execution Window
                        </label>
                        <div className="flex items-center border-b-4 border-black/10 group-focus-within:border-black py-4 transition-all">
                          <FiCalendar className="text-black/20 mr-4 group-focus-within:text-black" size={24} />
                          <input 
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            type="date" 
                            className="w-full bg-transparent text-[18px] font-black uppercase tracking-widest text-black focus:outline-none"
                            required 
                          />
                        </div>
                      </div>

                      {/* Input: Location */}
                      <div className="group relative">
                        <label className="text-gray-400 text-[12px] font-black uppercase tracking-[0.4em] mb-4 block group-focus-within:text-yellow-600 italic">
                          06. Deployment Site (TAS)
                        </label>
                        <div className="flex items-center border-b-4 border-black/10 group-focus-within:border-black py-4 transition-all">
                          <FiMapPin className="text-black/20 mr-4 group-focus-within:text-black" size={24} />
                          <input 
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            type="text" 
                            placeholder="STREET, CITY, ZIP" 
                            className="w-full bg-transparent text-[18px] font-black uppercase tracking-widest text-black placeholder:text-gray-200 focus:outline-none"
                            required 
                          />
                        </div>
                      </div>

                      {/* Input: Notes (Full Span) */}
                      <div className="md:col-span-2 group">
                        <label className="text-gray-400 text-[12px] font-black uppercase tracking-[0.4em] mb-4 block group-focus-within:text-yellow-600 italic">
                          07. Tactical Briefing / Special Notes
                        </label>
                        <textarea 
                          name="notes"
                          value={formData.notes}
                          onChange={handleInputChange}
                          placeholder="ADDITIONAL INTEL..." 
                          rows={4}
                          className="w-full bg-gray-50 border-4 border-black p-8 text-[16px] font-black uppercase tracking-widest text-black placeholder:text-gray-300 focus:outline-none focus:bg-white focus:border-yellow-400 transition-all"
                        />
                      </div>

                      {/* Priority Level Selection */}
                      <div className="md:col-span-2">
                        <label className="text-gray-400 text-[12px] font-black uppercase tracking-[0.4em] mb-6 block italic">
                          08. Mission Priority Level
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                          {(['Standard', 'Tactical', 'Emergency'] as const).map((p) => (
                            <div 
                              key={p}
                              onClick={() => setFormData({...formData, priority: p})}
                              className={`cursor-pointer p-6 border-4 flex flex-col items-center gap-2 transition-all ${formData.priority === p ? 'bg-black border-black text-yellow-400 scale-105' : 'bg-white border-black/10 text-black hover:border-black'}`}
                            >
                              {p === 'Emergency' && <FiAlertTriangle size={24} className={formData.priority === p ? 'animate-bounce' : ''} />}
                              <span className="text-[14px] font-black uppercase tracking-widest">{p}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Step 2 Actions */}
                    <div className="flex flex-col sm:flex-row items-center gap-10 pt-10 border-t-2 border-black/5">
                      <button 
                        type="button"
                        onClick={prevStep}
                        className="flex items-center gap-3 text-gray-400 hover:text-black text-[12px] font-black uppercase tracking-[0.4em] transition-all group"
                      >
                        <FiChevronLeft className="group-hover:-translate-x-2 transition-transform" /> Back to Phase 01
                      </button>
                      
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 relative group bg-black text-white py-8 px-16 text-[18px] font-black uppercase tracking-[0.8em] overflow-hidden transition-all active:scale-95 disabled:opacity-50 shadow-[20px_20px_0px_0px_rgba(254,224,66,1)]"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-6 group-hover:text-black transition-colors">
                          {isSubmitting ? (
                            <>
                              <FiLoader className="animate-spin" size={28} />
                              Transmitting...
                            </>
                          ) : (
                            <>
                              Confirm Mission
                              <FiCheck className="group-hover:scale-125 transition-transform" size={28} />
                            </>
                          )}
                        </span>
                        <div className="absolute inset-0 w-0 group-hover:w-full bg-yellow-400 transition-all duration-700 ease-in-out" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            {/* --- SYSTEM SUCCESS OVERLAY --- */}
            <AnimatePresence>
              {isSuccess && (
                <motion.div 
                  initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                  animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
                  className="absolute inset-0 bg-white/90 z-[100] flex flex-col items-center justify-center p-20 text-center"
                >
                  <motion.div 
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", damping: 10 }}
                    className="w-32 h-32 bg-yellow-400 flex items-center justify-center mb-12 border-4 border-black shadow-[15px_15px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <FiCheckCircle size={64} className="text-black" />
                  </motion.div>
                  
                  <h2 className="text-5xl font-black uppercase italic tracking-tighter text-black mb-6">
                    Transmission Received.
                  </h2>
                  <div className="w-24 h-2 bg-black mb-8" />
                  <p className="text-gray-500 text-[14px] font-bold uppercase tracking-[0.2em] leading-relaxed max-w-md mb-16">
                    Briefing dispatched to mission control. Operation teams are being mobilized. 
                    Stand by for secure operative confirmation via {formData.email}.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-6 w-full max-w-sm">
                    <button 
                      onClick={() => setIsSuccess(false)}
                      className="border-4 border-black px-8 py-5 text-[12px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] active:shadow-none"
                    >
                      New Mission
                    </button>
                    <button className="bg-black text-yellow-400 px-8 py-5 text-[12px] font-black uppercase tracking-widest hover:bg-yellow-400 hover:text-black transition-all shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] active:shadow-none">
                      Go Home
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* --- BOTTOM DECORATIVE STRIP --- */}
        <div className="mt-20 flex flex-wrap justify-between items-center gap-10">
          <div className="flex gap-12">
            {['Secure SSL-256', 'Tactical Quality', 'Privacy Verified'].map((t, idx) => (
              <div key={idx} className="flex items-center gap-4 group opacity-40 hover:opacity-100 transition-opacity">
                <div className="w-10 h-10 border-2 border-black flex items-center justify-center group-hover:bg-black group-hover:text-yellow-400 transition-all">
                  <FiShield size={18} />
                </div>
                <span className="text-[11px] font-black uppercase tracking-[0.5em] text-black">
                  {t}
                </span>
              </div>
            ))}
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Global Ops Node</div>
              <div className="text-[14px] font-black text-black uppercase tracking-widest italic">Hobart / Tasmania</div>
            </div>
            <div className="w-16 h-16 bg-black flex items-center justify-center text-yellow-400 border-2 border-black">
              <FiSettings className="animate-spin-slow" size={24} />
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default BookingSystem;