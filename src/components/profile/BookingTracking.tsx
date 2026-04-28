"use client";
import React, { useEffect, useState } from 'react';
import { createClient } from '../../lib/supabase';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2, Truck, PackageCheck, MapPin } from 'lucide-react';
const supabase = createClient()
const BookingTracking = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Database theke oi user-er sob booking niye asha
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (!error) setBookings(data);
      }
      setLoading(false);
    };
    fetchBookings();
  }, []);

  // Status onujayi progress bar-er step thik kora
  const getStatusStep = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'pending': return 1;
      case 'confirmed': return 2;
      case 'in-progress': return 3;
      case 'completed': return 4;
      default: return 1;
    }
  };

  if (loading) return <div className="p-10 text-center font-black uppercase text-[10px] tracking-widest">Updating Tiger Records...</div>;

  return (
    <div className="space-y-12">
      <h2 className="text-2xl font-black uppercase tracking-tighter">My Service Status</h2>
      
      {bookings.length === 0 ? (
        <div className="bg-gray-50 p-12 rounded-[30px] text-center border-2 border-dashed border-gray-200">
          <p className="text-gray-400 font-bold uppercase text-xs">No active bookings found in your profile.</p>
        </div>
      ) : (
        bookings.map((booking) => (
          <div key={booking.id} className="bg-white border border-black/5 p-8 rounded-[40px] shadow-sm hover:shadow-xl transition-all">
            <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
              <div>
                <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Service Reference</span>
                <h4 className="font-bold text-sm">#BK-{booking.id.slice(0, 8).toUpperCase()}</h4>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Scheduled Date</span>
                <h4 className="font-bold text-sm">{booking.preferred_date}</h4>
              </div>
            </div>

            {/* Tracking Progress Bar */}
            <div className="relative flex justify-between items-center mb-10 mt-6">
              {[
                { label: 'Received', icon: Clock },
                { label: 'Confirmed', icon: PackageCheck },
                { label: 'Cleaning', icon: Truck },
                { label: 'Finished', icon: CheckCircle2 }
              ].map((step, index) => {
                const currentStatusStep = getStatusStep(booking.booking_status);
                const isActive = index + 1 <= currentStatusStep;
                const Icon = step.icon;

                return (
                  <div key={index} className="z-10 flex flex-col items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${isActive ? 'bg-black text-white shadow-lg' : 'bg-gray-100 text-gray-300'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[9px] font-black uppercase tracking-widest ${isActive ? 'text-black' : 'text-gray-300'}`}>{step.label}</span>
                  </div>
                );
              })}
              
              {/* Connector Line */}
              <div className="absolute top-6 left-0 w-full h-[2px] bg-gray-100 -z-0">
                <motion.div 
                  className="h-full bg-black" 
                  initial={{ width: 0 }}
                  animate={{ width: `${((getStatusStep(booking.booking_status) - 1) / 3) * 100}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-gray-50">
               <div>
                  <span className="text-[9px] font-black uppercase text-gray-400">Property</span>
                  <p className="font-bold text-[11px] uppercase">{booking.property_type}</p>
               </div>
               <div>
                  <span className="text-[9px] font-black uppercase text-gray-400">Net Total</span>
                  <p className="font-bold text-[11px]">${booking.total_price}</p>
               </div>
               <div className="col-span-2">
                  <span className="text-[9px] font-black uppercase text-gray-400">Assigned Address</span>
                  <p className="font-bold text-[11px] truncate"><MapPin className="inline w-3 h-3 mr-1"/> {booking.cleaning_address}</p>
               </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BookingTracking;