"use client";

import BookingTracking from '../../components/profile/BookingTracking';
import React, { useState, useEffect } from 'react';
import { createClient } from '../../lib/supabase';
import { User, MapPin, Phone, Mail, Fingerprint, Save, Loader2 } from 'lucide-react';

const supabase = createClient()
const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      window.location.href = '/login'; // লগইন না থাকলে ভাগিয়ে দাও
    }
  };
  checkUser();
}, []);


  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (data) {
          setProfile(data);
          setAddress(data.address || "");
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateAddress = async () => {
    setUpdating(true);
    setMessage("");
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { error } = await supabase
          .from('profiles')
          .update({ address: address })
          .eq('id', user.id);

        if (error) throw error;
        setMessage("Elite coordinates updated successfully!");
      }
    } catch (error: any) {
      setMessage("Error: " + error.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#fbfbfd]">
      <Loader2 className="w-8 h-8 animate-spin text-[#FFD700]" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fbfbfd] pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-[40px] shadow-2xl border border-black/5 p-8 md:p-12 transition-all duration-700 ease-in-out">
        
        {/* Header Section with Animation */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12 border-b border-black/5 pb-12">
          <div className="relative group">
            <div className="w-24 h-24 bg-[#FFD700] rounded-full flex items-center justify-center text-4xl font-black shadow-[-20px_20px_50px_rgba(255,215,0,0.3)] transition-transform duration-500 group-hover:scale-110">
              {profile?.full_name?.charAt(0) || profile?.email?.charAt(0).toUpperCase() || "U"}
            </div>
            {/* Status Indicator */}
            <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-4 border-white rounded-full"></div>
          </div>

          <div className="text-center md:text-left">
            <h1 className="text-3xl font-black uppercase tracking-tighter text-black">
              {profile?.full_name || "Elite Member"}
            </h1>
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 mt-3">
              <div className="flex items-center gap-2 text-gray-500 font-bold text-[10px] uppercase tracking-widest bg-gray-50 px-3 py-1.5 rounded-full border border-black/5">
                <Fingerprint className="w-3 h-3 text-[#FFD700]" />
                ID: <span className="text-black font-black">{profile?.user_custom_id || "GENERATING..."}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 font-bold text-[10px] uppercase tracking-widest bg-gray-50 px-3 py-1.5 rounded-full border border-black/5">
                <div className="w-2 h-2 rounded-full bg-[#FFD700] animate-pulse"></div>
                Status: <span className="text-black font-black">Active Agent</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
  <BookingTracking />
</div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column: Credentials */}
          <div className="space-y-8">
            <h3 className="text-[10px] font-black text-[#FFD700] uppercase tracking-[0.3em] mb-4">Secure Credentials</h3>
            
            <div className="group">
              <div className="flex items-center gap-4 p-4 rounded-2xl transition-colors hover:bg-gray-50">
                <div className="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center border border-black/5">
                  <Mail className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
                </div>
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Digital Mail</p>
                  <p className="text-sm font-bold text-black break-all">{profile?.email}</p>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="flex items-center gap-4 p-4 rounded-2xl transition-colors hover:bg-gray-50">
                <div className="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center border border-black/5">
                  <Phone className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
                </div>
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Communication Line</p>
                  <p className="text-sm font-bold text-black">{profile?.phone_number || "NOT LINKED"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Deployment Coordinates */}
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#FFD700]" />
                <p className="text-[10px] font-black text-black uppercase tracking-widest">Service Coordinates</p>
              </div>
            </div>
            
            <div className="relative">
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Locating deployment address..."
                className="w-full bg-gray-50 border-2 border-gray-100 rounded-[24px] p-5 text-sm font-bold text-black focus:border-[#FFD700] focus:bg-white outline-none transition-all h-40 resize-none shadow-inner"
              />
              <div className="absolute bottom-4 right-4 text-[8px] font-black text-gray-300 uppercase tracking-widest pointer-events-none">
                Tiger Location Hub
              </div>
            </div>

            <button
              onClick={handleUpdateAddress}
              disabled={updating}
              className="w-full bg-black text-white py-5 rounded-[20px] font-black uppercase tracking-[0.2em] text-[10px] hover:bg-[#FFD700] hover:text-black hover:shadow-[0_20px_40px_rgba(255,215,0,0.2)] transition-all duration-500 flex items-center justify-center gap-3 group disabled:opacity-50"
            >
              {updating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Save className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
                  <span>Update Coordinates</span>
                </>
              )}
            </button>

            {message && (
              <div className={`mt-4 p-3 rounded-xl text-center text-[9px] font-black uppercase tracking-[0.1em] animate-in fade-in slide-in-from-bottom-2 ${message.includes("Error") ? "bg-red-50 text-red-500" : "bg-green-50 text-green-600"
                }`}>
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;