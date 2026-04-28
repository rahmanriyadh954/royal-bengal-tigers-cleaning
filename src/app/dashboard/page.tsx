"use client";

import { useEffect, useState } from 'react';
import { createClient } from '../../lib/supabase';
import { cn } from '../../lib/utils';

const supabase = createClient()
export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const getSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = '/login'; // লগইন না থাকলে লগইন পেজে পাঠিয়ে দেবে
      } else {
        setUser(user);
        // ইউজারের ইমেইল দিয়ে ডাটা ফিল্টার করা
        const { data } = await supabase
          .from('bookings')
          .select('*')
          .eq('email', user.email)
          .order('created_at', { ascending: false });
        if (data) setBookings(data);
      }
    };
    getSession();
  }, []);

  if (!user) return <div className="flex justify-center items-center h-screen font-bold">Loading...</div>;

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto pt-32 px-6">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-brand-dark">User Dashboard</h1>
            <p className="text-gray-500">Welcome back, {user.email}</p>
          </div>
          <button 
            onClick={() => supabase.auth.signOut().then(() => window.location.href = '/')}
            className="bg-red-50 text-red-600 px-4 py-2 rounded-xl font-semibold hover:bg-red-100 transition-all"
          >
            Logout
          </button>
        </div>

        <div className="grid gap-6">
          <h2 className="text-xl font-bold">My Bookings</h2>
          {bookings.length === 0 ? (
            <div className="bg-white p-10 rounded-3xl text-center border-2 border-dashed border-gray-200">
              <p className="text-gray-400">You haven't booked any service yet.</p>
            </div>
          ) : (
            bookings.map((b) => (
              <div key={b.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex justify-between items-center">
                <div>
                  <span className="text-xs font-bold text-brand-yellow uppercase tracking-widest">{b.service_type}</span>
                  <p className="text-lg font-bold text-brand-dark">Cleaning Service</p>
                  <p className="text-sm text-gray-400">{new Date(b.created_at).toLocaleDateString()}</p>
                </div>
                <div className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-black uppercase",
                  b.status === 'pending' ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"
                )}>
                  {b.status}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}