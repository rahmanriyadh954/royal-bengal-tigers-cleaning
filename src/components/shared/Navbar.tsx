"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Link from 'next/link';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { Menu, X, Phone, User, Search, LogOut, LayoutDashboard } from 'lucide-react';
import Image from 'next/image';
import { createClient } from '../../lib/supabase'; // তোর সুপাবেস কনফিগ পাথ ঠিক আছে তো? না থাকলে বদলে নিস


const Navbar = () => {
  const supabase = createClient()
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const pathname = usePathname(); // ১. এটা একদম শুরুতে দিবি
  const [mounted, setMounted] = useState(false);

  useEffect(() => {

    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // ১. সেশন চেক করা
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        setUserProfile(session.user.user_metadata);
      }
    };
    checkUser();

    // ২. অথেনটিকেশন স্টেট চেঞ্জ মনিটর করা (লগইন/লগআউট হলে সাথে সাথে আপডেট হবে)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
  if (session) {
    setUser(session.user);
    setUserProfile(session.user.user_metadata);
  } else {
    setUser(null);
    setUserProfile(null);
  }
});

    return () => {
      window.removeEventListener('scroll', handleScroll);
      subscription.unsubscribe();
    };

    return () => window.removeEventListener('scroll', handleScroll);

  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  if (!mounted) return null;

  // ৫. লগইন বা অ্যাডমিন পেজে গেলে নেভবার রিটার্ন করবে না (পুরো খালি করে দিবে)
  if (pathname === "/login" || pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <nav className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${
      isScrolled ? 'py-3' : 'py-8'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`relative flex items-center justify-between px-6 py-4 rounded-[32px] transition-all duration-500 border ${
          isScrolled 
          ? 'bg-white/40 backdrop-blur-[30px] border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.1)]' 
          : 'bg-transparent border-transparent'
        }`}>
          
          {/* 1. Logo Section */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-12 h-12 flex-shrink-0">
              <Image 
                src="/images/royal_bengal_tigers_cleaning.png" 
                alt="Royal Bengal Tigers Logo"
                fill
                className="object-cover transition-transform group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority 
              />
            </div>
            
            <div className="flex flex-col leading-none">
              <span className={`text-xl font-black tracking-tighter transition-colors ${
                isScrolled ? 'text-black' : 'text-white'
              }`}>
                ROYAL BENGAL <span className="text-[#FFD700]">TIGERS</span>
              </span>
              <span className={`text-[10px] font-bold uppercase tracking-[0.3em] mt-1 ${
                isScrolled ? 'text-black/60' : 'text-white/60'
              }`}>
                Cleaning Services
              </span>
            </div>
          </Link>

          {/* 2. Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            {['Services', 'Process', 'Pricing', 'About'].map((item) => (
              <Link 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className={`text-xs font-extrabold uppercase tracking-widest hover:text-[#FFD700] transition-all ${
                  isScrolled ? 'text-black/80' : 'text-white/80'
                }`}
              >
                {item}
              </Link>
            ))}
          </div>

          {/* 3. Action Icons & Dynamic Auth */}
          <div className="hidden md:flex items-center gap-5 border-l border-black/5 ml-2 pl-8">
            <button className={`hover:text-[#FFD700] transition-transform ${isScrolled ? 'text-black' : 'text-white'}`}>
              <Search className="w-5 h-5" />
            </button>

            {user ? (
              /* লগইন থাকলে এই পার্টটা দেখাবে */
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 group cursor-pointer relative">
                  <div className="w-8 h-8 rounded-full bg-[#FFD700] flex items-center justify-center font-black text-black text-[10px] shadow-lg ring-2 ring-white/20">
                    {userProfile?.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${isScrolled ? 'text-black' : 'text-white'}`}>
                      {userProfile?.full_name?.split(" ")[0] || "Squad Member"}
                    </span>
                    <button onClick={handleLogout} className="text-[8px] font-bold text-red-500 uppercase tracking-tighter flex items-center gap-1 hover:text-red-600 transition-colors">
                      <LogOut className="w-2 h-2" /> Security Exit
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* লগইন না থাকলে আগের "Account" বাটন */
              <Link href="/login" className={`flex items-center gap-2 font-bold text-xs uppercase tracking-wider hover:text-[#FFD700] transition-all ${
                isScrolled ? 'text-black' : 'text-white'
              }`}>
                <User className="w-5 h-5 text-[#FFD700]" />
                Account
              </Link>
            )}

            <Link href="/book-service">

  <button className="bg-black text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-[0.15em] hover:bg-[#FFD700] hover:text-black transition-all duration-300 shadow-xl">

    Book Now

  </button>

</Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? (
              <X className={isScrolled ? 'text-black' : 'text-white'} />
            ) : (
              <Menu className={isScrolled ? 'text-black' : 'text-white'} />
            )}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-6 right-6 mt-4 p-8 bg-white/60 backdrop-blur-[40px] rounded-[40px] shadow-2xl border border-white/20 animate-in fade-in zoom-in duration-300">
            <div className="flex flex-col gap-6 items-center text-center">
              {user ? (
                <div className="flex flex-col items-center gap-2 mb-2">
                   <div className="w-12 h-12 rounded-full bg-[#FFD700] flex items-center justify-center font-black text-xl mb-2">
                    {userProfile?.full_name?.charAt(0) || "U"}
                  </div>
                  <span className="font-black text-black uppercase tracking-widest">{userProfile?.full_name || user.email}</span>
                  <button onClick={handleLogout} className="text-xs font-bold text-red-500 uppercase">Logout</button>
                </div>
              ) : (
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#FFD700]">The Squad Menu</span>
              )}
              
              {['Services', 'Process', 'Pricing', 'About'].map((item) => (
                <Link key={item} href={`#${item.toLowerCase()}`} className="text-2xl font-black uppercase tracking-tighter" onClick={() => setMobileMenuOpen(false)}>
                  {item}
                </Link>
              ))}
              <hr className="w-full border-black/5" />
              {!user && <Link href="/login" className="font-black text-black uppercase tracking-widest text-lg">Login</Link>}
              <a href="tel:+610000000" className="w-full bg-[#FFD700] text-black py-4 rounded-2xl font-black uppercase tracking-widest">Call The Tiger</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;