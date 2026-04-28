"use client";
import React, { useState } from 'react';
import { createClient } from '../../lib/supabase';
import { Lock, Loader2 } from 'lucide-react';

const supabase = createClient()
const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) setMessage("Error: " + error.message);
    else {
      setMessage("Success! Password updated. Redirecting...");
      setTimeout(() => window.location.href = '/login', 2000);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#fbfbfd] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-10 border border-black/5">
        <h1 className="text-2xl font-black uppercase tracking-tighter mb-6 text-center">New Credentials</h1>
        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="password" 
              placeholder="Enter New Password"
              className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:border-[#FFD700] outline-none transition-all"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button className="w-full bg-black text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#FFD700] hover:text-black transition-all flex items-center justify-center gap-2">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Secure New Password"}
          </button>
        </form>
        {message && <p className="mt-4 text-center text-[10px] font-bold uppercase tracking-widest text-[#FFD700]">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;