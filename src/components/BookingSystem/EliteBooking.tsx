"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { createClient } from '../../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, Building2, Bed, Bath, Move, Calendar, 
  Clock, CheckCircle2, ChevronRight, ChevronLeft,
  Sparkles, ShieldCheck, MapPin, CreditCard,
  Info, Trash2, Plus, Minus, Zap
} from 'lucide-react';

const supabase = createClient()
// --- Price Constants (Australian Market Standard) ---
const PRICES = {
  DOMESTIC_BASE: 120,
  BEDROOM: 40,
  BATHROOM: 30,
  SQM_RATE: 1.5,
  EXTRAS: {
    Oven: 50,
    Windows: 80,
    Carpet: 100,
    Garage: 40
  }
};

const EliteBooking = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // --- Form State ---
  const [formData, setFormData] = useState({
    property_type: 'Domestic',
    service_category: 'Residential',
    service_type: 'Regular Clean',
    bedrooms: 2,
    bathrooms: 1,
    total_area_sqm: 0,
    client_full_name: '',
    client_email: '',
    client_phone: '',
    cleaning_address: '',
    postcode: '',
    preferred_date: '',
    preferred_time_slot: 'Morning (9 AM)',
    special_instructions: '',
    extras: [] as string[]
  });

  // --- Auto-fetch User Profile ---
  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (profile) {
          setFormData(prev => ({
            ...prev,
            client_full_name: profile.full_name || '',
            client_email: profile.email || '',
            client_phone: profile.phone_number || '',
            cleaning_address: profile.address || ''
          }));
        }
      }
    };
    fetchProfile();
  }, []);

  // --- Dynamic Pricing Logic ---
  const totalPrice = useMemo(() => {
    let total = 0;
    if (formData.property_type === 'Domestic') {
      total = PRICES.DOMESTIC_BASE + (formData.bedrooms * PRICES.BEDROOM) + (formData.bathrooms * PRICES.BATHROOM);
    } else {
      total = formData.total_area_sqm * PRICES.SQM_RATE;
    }
    
    formData.extras.forEach(extra => {
      total += PRICES.EXTRAS[extra as keyof typeof PRICES.EXTRAS] || 0;
    });
    
    return total;
  }, [formData]);

  const toggleExtra = (item: string) => {
    setFormData(prev => ({
      ...prev,
      extras: prev.extras.includes(item) 
        ? prev.extras.filter(i => i !== item) 
        : [...prev.extras, item]
    }));
  };

  // --- Final Submission ---
  const handleFinalSubmit = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      alert("Session expired. Please login again.");
      return;
    }

    const bookingPayload = {
      user_id: user.id,
      ...formData,
      total_price: totalPrice,
      booking_status: 'pending'
    };

    const { error } = await supabase.from('bookings').insert([bookingPayload]);

    if (!error) {
      setIsSuccess(true);
      setStep(5); // Success step
    } else {
      alert("Error: " + error.message);
    }
    setLoading(false);
  };

  // --- UI Helpers ---
  const inputStyle = "w-full bg-gray-50 border-2 border-gray-100 rounded-[20px] py-4 px-6 font-bold text-black focus:border-black outline-none transition-all placeholder:text-gray-300";

  return (
    <div className="min-h-screen bg-[#fbfbfd] text-black py-20 px-4">
      <div className="max-w-5xl mx-auto">
        
        <div className="bg-white rounded-[50px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] border border-black/5 overflow-hidden flex flex-col md:flex-row">
          
          {/* Left Side: Steps & Summary */}
          <div className="md:w-1/3 bg-black p-12 text-white flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-8 text-[#FFD700]">
                <Sparkles className="w-5 h-5" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Elite Status</span>
              </div>
              <h2 className="text-4xl font-black tracking-tighter leading-none mb-6">TIGER<br/>RESERVE</h2>
              
              <div className="space-y-6 mt-12">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className={`flex items-center gap-4 transition-opacity ${step >= num ? 'opacity-100' : 'opacity-30'}`}>
                    <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-[10px] font-bold">
                      {step > num ? <CheckCircle2 className="w-4 h-4 text-[#FFD700]" /> : num}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      {num === 1 && "Property"}
                      {num === 2 && "Configuration"}
                      {num === 3 && "Personal Info"}
                      {num === 4 && "Final Review"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-12 border-t border-white/10">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Estimated Quote</p>
              <h3 className="text-5xl font-black tracking-tighter text-[#FFD700]">${totalPrice}</h3>
              <p className="text-[10px] text-gray-400 mt-2 italic font-medium">Standard Tasmanian Rates Applied</p>
            </div>
          </div>

          {/* Right Side: Form Fields */}
          <div className="md:w-2/3 p-12 md:p-20 relative">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} key="s1">
                  <h3 className="text-2xl font-black tracking-tighter uppercase mb-8">What are we cleaning?</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {['Domestic', 'Corporate'].map(type => (
                      <button 
                        key={type}
                        onClick={() => setFormData({...formData, property_type: type as any})}
                        className={`p-10 rounded-[35px] border-4 transition-all text-left group ${formData.property_type === type ? 'border-black bg-white' : 'border-gray-50 bg-gray-50 hover:border-gray-200'}`}
                      >
                        {type === 'Domestic' ? <Home className="mb-4" /> : <Building2 className="mb-4" />}
                        <span className="block font-black uppercase text-xs tracking-widest">{type}</span>
                        <span className="text-[10px] text-gray-400 font-bold uppercase">{type === 'Domestic' ? 'Homes & Apartments' : 'Offices & Retail'}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} key="s2">
                  <h3 className="text-2xl font-black tracking-tighter uppercase mb-8">Service Configuration</h3>
                  {formData.property_type === 'Domestic' ? (
                    <div className="space-y-8">
                      <div className="flex items-center justify-between p-6 bg-gray-50 rounded-[30px]">
                        <div className="flex items-center gap-4">
                          <div className="p-4 bg-white rounded-2xl shadow-sm"><Bed className="w-5 h-5"/></div>
                          <div>
                            <span className="block font-black text-xs uppercase">Bedrooms</span>
                            <span className="text-[10px] text-gray-400 font-bold uppercase">Tasmania Standard</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <button onClick={() => setFormData(f => ({...f, bedrooms: Math.max(1, f.bedrooms - 1)}))} className="p-2 hover:bg-white rounded-full transition-colors"><Minus className="w-4 h-4"/></button>
                          <span className="text-xl font-black">{formData.bedrooms}</span>
                          <button onClick={() => setFormData(f => ({...f, bedrooms: f.bedrooms + 1}))} className="p-2 hover:bg-white rounded-full transition-colors"><Plus className="w-4 h-4"/></button>
                        </div>
                      </div>
                      {/* Repeat for Bathrooms... */}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Area (SQM)</label>
                      <input 
                        type="number" 
                        className={inputStyle}
                        placeholder="e.g. 500"
                        onChange={(e) => setFormData({...formData, total_area_sqm: parseInt(e.target.value)})}
                      />
                    </div>
                  )}
                </motion.div>
              )}

              {step === 3 && (
                <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} key="s3">
                   <h3 className="text-2xl font-black tracking-tighter uppercase mb-8">Details & Location</h3>
                   <div className="grid grid-cols-1 gap-4">
                      <input 
                        type="text" placeholder="Full Address in Tasmania" 
                        className={inputStyle}
                        value={formData.cleaning_address}
                        onChange={(e) => setFormData({...formData, cleaning_address: e.target.value})}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input 
                          type="date" className={inputStyle}
                          onChange={(e) => setFormData({...formData, preferred_date: e.target.value})}
                        />
                        <select 
                          className={inputStyle}
                          onChange={(e) => setFormData({...formData, preferred_time_slot: e.target.value})}
                        >
                          <option>Morning (9 AM)</option>
                          <option>Afternoon (1 PM)</option>
                          <option>Evening (5 PM)</option>
                        </select>
                      </div>
                   </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} key="s4">
                   <h3 className="text-2xl font-black tracking-tighter uppercase mb-8">Tiger Review</h3>
                   <div className="bg-gray-50 rounded-[35px] p-8 space-y-4">
                      <div className="flex justify-between border-b border-gray-200 pb-4">
                        <span className="text-[10px] font-black uppercase text-gray-400">Type</span>
                        <span className="font-bold">{formData.property_type}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-200 pb-4">
                        <span className="text-[10px] font-black uppercase text-gray-400">Schedule</span>
                        <span className="font-bold">{formData.preferred_date} @ {formData.preferred_time_slot}</span>
                      </div>
                      <div className="pt-4 flex justify-between items-center">
                        <span className="text-xl font-black uppercase tracking-tighter text-gray-400 text-xs">Total Commitment</span>
                        <span className="text-3xl font-black">${totalPrice}</span>
                      </div>
                   </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="mt-20 flex items-center justify-between">
              {step > 1 && step < 5 && (
                <button 
                  onClick={() => setStep(s => s - 1)}
                  className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-black transition-colors"
                >
                  Back
                </button>
              )}
              <button 
                onClick={() => step < 4 ? setStep(s => s + 1) : handleFinalSubmit()}
                disabled={loading}
                className="ml-auto bg-black text-white px-12 py-5 rounded-[25px] font-black uppercase text-[10px] tracking-[0.4em] hover:bg-[#FFD700] hover:text-black transition-all flex items-center gap-4 shadow-2xl shadow-black/20"
              >
                {loading ? 'Processing...' : step === 4 ? 'Confirm Reservation' : 'Next Level'}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EliteBooking;