"use client";

import React, { 
  useState, 
  useEffect, 
  useRef,
  useMemo, 
  useCallback, 
  useLayoutEffect 
} from 'react';
import { createBrowserClient } from '@supabase/ssr';
import Link from 'next/link';
import { createClient } from "../../../lib/supabase"; // তোর প্রজেক্টের সুপাবেস পাথ অনুযায়ী
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, Variants } from 'framer-motion';

import { 
  Mail, Lock, User, Phone, ArrowRight, Globe,
  ShieldCheck, Zap, Fingerprint, Sparkles, ArrowLeft, Eye, EyeOff,
  CheckCircle2, AlertCircle, Clock, MapPin, Star, Shield, CreditCard,
  MousePointer2, Layout, Smartphone, Server, Cloud, Search, Settings,
  Bell, Menu, X, Check, ChevronRight, Info, Key, ShieldAlert, 
  Loader2, Activity, Terminal, Cpu, Target, Briefcase, Crown,
  Globe2, LockKeyhole, Database, ZapOff, FingerprintIcon,
  LayoutGrid, Rocket, ShieldQuestion, HardDrive, Share2, Layers,
  Compass, ShieldHalf, RefreshCw, Command, Wifi
} from 'lucide-react';

const supabase = createClient()
// --- Global Constants & Theme Configuration ---
const THEME_PRIMARY = "#FFD700"; // Tiger Gold
const THEME_ACCENT = "#000000"; // Pure Black
const THEME_BG = "#fbfbfd"; // Apple Gray White
const THEME_CARD = "rgba(255, 255, 255, 0.9)";
const TRANSITION_SPRING = { type: "spring", stiffness: 300, damping: 30 };

// --- Animation Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.12, 
      delayChildren: 0.4,
      ease: [0.16, 1, 0.3, 1] 
    }
  }
};

const cardVariants: Variants = {
  initial: { 
    scale: 0.94, 
    opacity: 0, 
    y: 40, 
    filter: "blur(15px)" 
  },
  animate: { 
    scale: 1, 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { 
      duration: 1, 
      ease: [0.16, 1, 0.3, 1] 
    } 
  },
  exit: { 
    scale: 1.08, 
    opacity: 0, 
    filter: "blur(20px)",
    transition: { duration: 0.5 } 
  }
};

const itemFade: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 }
  }
};

const itemFadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

// --- Sub-Components ---

const ServiceBadge = ({ icon: Icon, text }: { icon: any, text: string }) => (
  <motion.div 
    variants={itemFadeIn}
    className="flex flex-col items-center justify-center p-6 bg-white border border-gray-100 rounded-[32px] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group"
  >
    {/* আইকন বক্স */}
    <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#f5f5f7] group-hover:bg-[#FFD700] group-hover:text-black transition-all duration-500 mb-4">
      <Icon className="w-6 h-6" />
    </div>
    
    {/* টেক্সট - হাই-এন্ড লাক্সারি ফন্ট স্টাইল */}
    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-400 group-hover:text-black text-center leading-tight">
      {text}
    </span>
  </motion.div>
);

const SecurityModule = ({ icon: Icon, title, status }: { icon: any, title: string, status: string }) => (
  <motion.div 
    variants={itemFade}
    className="flex items-center gap-4 p-5 bg-white/[0.02] border border-white/[0.05] rounded-[30px] hover:bg-white/[0.05] transition-all duration-500 group"
  >
    <div className="p-3 bg-black rounded-2xl border border-white/10 group-hover:border-[#FFD700]/40 transition-colors">
      <Icon className="w-4 h-4 text-[#FFD700]" />
    </div>
    <div className="flex flex-col">
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/90">{title}</span>
      <div className="flex items-center gap-1.5">
        <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse"></div>
        <span className="text-[8px] text-gray-500 font-bold uppercase tracking-widest">{status}</span>
      </div>
    </div>
  </motion.div>
);

const SecurityBadge = ({ icon: Icon, label, description }: any) => (
  <motion.div 
    variants={itemFadeIn}
    className="flex items-start gap-4 p-5 bg-white/40 border border-white/60 rounded-[28px] backdrop-blur-sm hover:bg-white/80 transition-all duration-500 group cursor-default"
  >
    <div className="p-3 bg-black text-white rounded-2xl group-hover:bg-[#FFD700] group-hover:text-black transition-colors duration-500">
      <Icon className="w-5 h-5" />
    </div>
    <div className="flex flex-col">
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black mb-1">{label}</span>
      <span className="text-[9px] text-gray-500 font-medium leading-tight">{description}</span>
    </div>
  </motion.div>
);

const FeatureCard = ({ icon: Icon, title }: any) => (
  <motion.div 
    variants={itemFadeIn}
    className="flex flex-col items-center justify-center p-6 bg-white border border-gray-100 rounded-[30px] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group"
  >
    <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#f5f5f7] group-hover:bg-[#FFD700] group-hover:text-black transition-all duration-500 mb-4">
      <Icon className="w-6 h-6" />
    </div>
    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 group-hover:text-black transition-colors">{title}</span>
  </motion.div>
);

const LuxuryInput = ({ label, type, placeholder, icon: Icon, value, onChange, showPassword, setShowPassword }: any) => (
  <motion.div variants={itemFadeIn} className="space-y-2 group">
    <div className="flex justify-between items-center px-2">
      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] group-focus-within:text-black transition-colors">
        {label}
      </label>
      <div className="w-1 h-1 rounded-full bg-[#FFD700] opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
    </div>
    <div className="relative">
      <div className="absolute left-5 top-1/2 -translate-y-1/2 z-10">
        <Icon className="w-4.5 h-4.5 text-gray-300 group-focus-within:text-black transition-all duration-300" />
      </div>
      <input 
        type={type === 'password' && !showPassword ? 'password' : 'text'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#f5f5f7] border border-transparent rounded-[20px] py-5 pl-14 pr-14 text-black placeholder:text-gray-400 focus:outline-none focus:bg-white focus:ring-4 focus:ring-[#FFD700]/5 focus:border-gray-200 transition-all duration-500 font-medium text-sm"
        required
      />
      {type === 'password' && (
        <button 
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-5 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-black transition-colors"
        >
          {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
        </button>
      )}
    </div>
  </motion.div>
);

// --- Main Page Component ---
const AuthPage = () => {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const [isLogin, setIsLogin] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Global UI Cleanup
  useEffect(() => {
    setMounted(true);
    
    // মাউস ট্র্যাকিং লজিক
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      document.documentElement.style.setProperty('--mouse-x', `${x}%`);
      document.documentElement.style.setProperty('--mouse-y', `${y}%`);
    };

    const globalNav = document.querySelector('nav');
    const globalFooter = document.querySelector('footer');
    if (globalNav) globalNav.style.display = 'none';
    if (globalFooter) globalFooter.style.display = 'none';

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      if (globalNav) globalNav.style.display = 'flex';
      if (globalFooter) globalFooter.style.display = 'block';
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Supabase Auth Handlers
  
const handleAuth = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  setAuthError(null);
  setSuccessMsg(null);

  try {
    if (isLogin) {
      // --- ১. লগইন লজিক ---
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      if (authData?.user) {
        // প্রোফাইল থেকে রোল চেক করা হচ্ছে
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', authData.user.id)
          .single();

        if (profileError) {
          console.error("Profile Fetch Error:", profileError.message);
          // প্রোফাইল না পেলেও যেন আটকে না থাকে, ডিফল্ট হোমে পাঠাবে
          window.location.assign('/'); 
          return;
        }

        setSuccessMsg("Access Granted! Redirecting...");

        // setTimeout এর বদলে সরাসরি location.assign ইউজ কর, এটা বেশি সলিড
        if (profile?.role === 'admin') {
    router.replace('/admin'); // এখানে দিবি
  } else {
    router.replace('/dashboard'); // এখানে দিবি
  }
      }

    } else {
      // --- ২. সাইন আপ লজিক ---
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { 
            full_name: fullName, 
            phone: phoneNumber,
            password_plain: password // ডাটাবেজে সেভ করার জন্য পাসওয়ার্ড পাঠাচ্ছি
          },
        },
      });

      if (signUpError) throw signUpError;

      if (signUpData?.user) {
        setSuccessMsg("Elite Account Created! Now login to access your dashboard.");
        
        // ফর্ম ক্লিয়ার এবং লগইন মোডে সুইচ
        setIsLogin(true);
        setFullName(""); 
        setPhoneNumber(""); 
        setEmail(""); 
        setPassword("");
      }
    }
  } catch (err: any) {
    console.error("Auth Protocol Error:", err.message);
    setAuthError(err.message || "A tactical error occurred during auth.");
  } finally {
    setIsLoading(false);
  }
};

// --- পাসওয়ার্ড রিসেট ---
const handleResetPassword = async () => {
  if (!email) {
    setAuthError("Please enter your email identification first.");
    return;
  }

  setIsLoading(true);
  setAuthError(null);
  
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
    setSuccessMsg("A private reset link has been dispatched to your email.");
  } catch (err: any) {
    setAuthError(err.message || "Elite recovery protocol failed.");
  } finally {
    setIsLoading(false);
  }
};

// --- গুগল লগইন ---
const handleGoogleLogin = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`, // কলব্যাক পাথ দিলে সেশন ঠিক থাকে
    }
  });
  if (error) setAuthError(error.message);
  };
  


// --- মাউন্টেড চেক (হাইড্রেশন ফিক্স) ---
if (!mounted) {
  return (
    <div className="fixed inset-0 z-[10000] bg-[#fbfbfd] flex flex-col items-center justify-center">
      <div className="w-16 h-16 border-4 border-t-yellow-400 border-black rounded-full animate-spin mb-4"></div>
      <p className="text-[10px] font-black uppercase tracking-[0.3em] animate-pulse text-black">Initiating Tiger OS...</p>
    </div>
  );
}

  return (
    <div ref={containerRef} className="min-h-screen w-full bg-[#fbfbfd] flex items-center justify-center p-6 md:p-12 relative overflow-x-hidden selection:bg-black selection:text-white antialiased font-sans">
    
      {/* Background Layer: Apple-Style Micro-Grids & Blur Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
          <pattern id="grid-large" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="black" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid-large)" />
        </svg>
      
        {/* Self-Drawing Background Lines Logic Overlay */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.02]">
          <pattern id="grid-small" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="0.5" className="self-drawing-path" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid-small)" />
        </svg>

        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-[#FFD700]/10 blur-[140px] rounded-full"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, delay: 1 }}
          className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-blue-100/40 blur-[140px] rounded-full"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-[1300px] grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10 py-10"
      >
      
        {/* Left Section: Brand Story & Features (Integrated Content) */}
        <div className="hidden lg:flex flex-col space-y-12 pr-12">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8">
            <Link href="/" className="inline-flex items-center gap-4 text-gray-400 hover:text-black transition-all group">
              <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:shadow-md transition-shadow">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Back to Frontline</span>
            </Link>

            <div className="space-y-4">
              <motion.div variants={itemFadeIn} className="flex items-center gap-3">
                <div className="h-[2px] w-12 bg-[#FFD700]"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#FFD700]">Elite Territory</span>
              </motion.div>
              <h1 className="text-7xl font-black text-black tracking-tighter leading-[0.9] uppercase italic">
                Experience the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-black via-gray-800 to-[#FFD700]">TIGER PRECISION</span>
              </h1>
              <p className="text-gray-500 text-xl font-medium leading-relaxed max-w-[500px]">
                Join Tasmania's most elite cleaning collective. We combine industrial-grade power with Apple-style high-end luxury aesthetics.
              </p>
            </div>
          </motion.div>

          {/* Feature Badges from Original Content */}
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-3 gap-5">
            <ServiceBadge icon={Shield} text="Military Grade Security" />
            <ServiceBadge icon={Zap} text="Lightning Fast Booking" />
            <ServiceBadge icon={Star} text="Diamond Certified Staff" />
            <ServiceBadge icon={CreditCard} text="Secure Transactions" />
            <ServiceBadge icon={Clock} text="24/7 Priority Support" />
            <ServiceBadge icon={MapPin} text="Tasmania Wide Range" />
          </motion.div>

          {/* Testimonial Snippet - Integrated from First Code */}
          <div className="bg-white/50 backdrop-blur-md border border-white p-8 rounded-[40px] flex items-start gap-6 shadow-sm luxury-float">
            <div className="flex-shrink-0 w-12 h-12 bg-[#FFD700] rounded-full flex items-center justify-center text-black font-black shadow-lg shadow-[#FFD700]/20">HT</div>
            <div>
              <p className="text-gray-600 italic text-sm mb-4 leading-relaxed font-medium">
                "The attention to detail in their service is unmatched. Their digital interface is as clean as the properties they maintain. Simply elite."
              </p>
              <div className="flex items-center gap-2">
                <div className="flex text-[#FFD700]">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
                </div>
                <span className="text-[10px] font-black uppercase text-black">John Hobart, Property Manager</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Luxury Authentication Card */}
        <div className="flex flex-col items-center lg:items-center">
        
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-10">
            <div className="inline-block p-4 rounded-3xl bg-white border border-gray-100 mb-6 shadow-sm">
              <Fingerprint className="w-8 h-8 text-black" />
            </div>
            <h2 className="text-2xl font-black text-black tracking-tighter uppercase">
              ROYAL BENGAL <span className="text-[#FFD700]">TIGERS</span>
            </h2>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login' : 'signup'}
              variants={cardVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full max-w-[520px] bg-white border border-gray-100 rounded-[50px] p-10 md:p-16 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.08)] relative overflow-hidden"
            >
              {/* Card Top Decoration */}
              <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-[#FFD700] via-black to-[#FFD700] opacity-20"></div>

              <div className="mb-12 text-center">
                <div className="inline-flex p-5 rounded-[24px] bg-[#f5f5f7] mb-8 group hover:bg-[#FFD700] transition-colors duration-700 shadow-inner">
                  <Fingerprint className="w-10 h-10 text-black group-hover:scale-110 transition-transform" />
                </div>
                <h2 className="text-4xl font-black text-black tracking-tight uppercase italic leading-none mb-4">
                  {isLogin ? "Sign In" : "Register"}
                </h2>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em]">
                  {isLogin ? "Initialize Tiger Session" : "Apply for Elite Status"}
                </p>
              </div>

              {/* Error/Success Messages from Logic */}
              {authError && (
                <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="mb-8 p-5 bg-red-50 border border-red-100 rounded-3xl flex items-center gap-4 text-red-600">
                  <ShieldAlert className="w-5 h-5 flex-shrink-0" />
                  <span className="text-[10px] font-black uppercase tracking-wider">{authError}</span>
                </motion.div>
              )}

              <form onSubmit={handleAuth} className="space-y-6">
                <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
                
                  {!isLogin && (
                    <>
                      <LuxuryInput
                        label="Account Holder Name"
                        icon={User}
                        placeholder="e.g. David Warner"
                        value={fullName}
                        onChange={setFullName}
                      />
                      <LuxuryInput
                        label="Tactical Phone Number"
                        icon={Phone}
                        placeholder="+61 4XX XXX XXX"
                        value={phoneNumber}
                        onChange={setPhoneNumber}
                      />
                    </>
                  )}

                  <LuxuryInput
                    label="Email Identification"
                    icon={Mail}
                    type="email"
                    placeholder="name@cleaning-tasmania.com.au"
                    value={email}
                    onChange={setEmail}
                  />

                  <LuxuryInput
                    label="Private Cipher Key"
                    icon={Lock}
                    type="password"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={setPassword}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                  />

                </motion.div>

                <div className="flex items-center justify-between px-2 pt-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-5 h-5 border-2 border-gray-200 rounded-lg group-hover:border-[#FFD700] transition-all flex items-center justify-center">
                      <div className="w-2 h-2 bg-[#FFD700] rounded-sm opacity-0 group-hover:opacity-40 transition-opacity"></div>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-black">Remember Session</span>
                  </label>
                  <button type="button" className="text-[10px] font-black uppercase tracking-widest text-[#FFD700] hover:text-black transition-colors" onClick={handleResetPassword}>
                    Lost Key?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-black text-white font-black py-6 rounded-[24px] flex items-center justify-center gap-4 hover:bg-[#FFD700] hover:text-black transition-all duration-500 active:scale-[0.98] mt-6 shadow-2xl shadow-black/10 group overflow-hidden relative"
                >
                  <AnimatePresence mode="wait">
                    {isLoading ? (
                      <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span className="uppercase tracking-[0.3em] text-[10px]">Processing Protocol...</span>
                      </motion.div>
                    ) : (
                      <motion.div key="text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3">
                        <span className="uppercase tracking-[0.3em] text-xs">
                          {isLogin ? "Initialize Access" : "Create Profile"}
                        </span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </form>

              {/* Social Authentication */}
              <div className="relative flex items-center gap-5 my-12">
                <div className="h-[1px] flex-1 bg-gray-100"></div>
                <span className="text-gray-300 text-[9px] font-black uppercase tracking-[0.4em] whitespace-nowrap">Unified Provider Access</span>
                <div className="h-[1px] flex-1 bg-gray-100"></div>
              </div>

              <button
                onClick={handleGoogleLogin}
                className="w-full bg-white border border-gray-100 text-black py-5 rounded-[22px] flex items-center justify-center gap-4 hover:bg-gray-50 transition-all font-black text-[10px] uppercase tracking-[0.2em] group shadow-sm"
              >
                <div className="p-2 bg-[#f5f5f7] rounded-full group-hover:rotate-[360deg] transition-transform duration-1000">
                  <Globe className="w-4 h-4" />
                </div>
                CONTINUE WITH GOOGLE SECURE
              </button>

              <div className="text-center mt-12 pt-10 border-t border-gray-50">
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
                  {isLogin ? "New to the Tiger Pride?" : "Already part of the pride?"}
                </p>
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="px-8 py-3 bg-white border border-gray-100 rounded-full text-black font-black uppercase tracking-widest text-[9px] hover:bg-[#FFD700] hover:border-[#FFD700] transition-all shadow-sm"
                >
                  {isLogin ? "Apply Now" : "Secure Login"}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Tactical Footer Badges */}
          <div className="mt-12 flex gap-10 opacity-20 hover:opacity-100 transition-opacity duration-1000">
            <div className="flex flex-col items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-black" />
              <span className="text-[7px] font-black uppercase tracking-[0.3em]">SSL v4.0 SECURED</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Activity className="w-4 h-4 text-black" />
              <span className="text-[7px] font-black uppercase tracking-[0.3em]">OCEANIA SYNC</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Lock className="w-4 h-4 text-black" />
              <span className="text-[7px] font-black uppercase tracking-[0.3em]">TAS GOV ACT 2026</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Interactive Cursor Tracking Script */}
      

      {/* Global Luxury Styles & Custom Animations */}
      <style jsx global>{`
      :root {
        --mouse-x: 50%;
        --mouse-y: 50%;
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
      @keyframes self-draw {
        from { stroke-dashoffset: 1000; }
        to { stroke-dashoffset: 0; }
      }
      .luxury-float {
        animation: float 4s ease-in-out infinite;
      }
      .self-drawing-path {
        stroke-dasharray: 1000;
        animation: self-draw 3s ease-out forwards;
      }
      ::-webkit-scrollbar {
        width: 4px;
      }
      ::-webkit-scrollbar-thumb {
        background: #000;
        border-radius: 10px;
      }
      .selection-custom::selection {
        background: #FFD700;
        color: #000;
      }
    `}</style>
    </div>
  );
};
export default AuthPage;