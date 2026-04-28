"use client";
import React, { useEffect, useState, useMemo } from 'react';
import { createClient } from '../../lib/supabase';
import { 
  Search, Filter, MoreVertical, CheckCircle, 
  Clock, Loader2, Phone, MapPin, User, Mail,
  Calendar, CreditCard, ArrowUpDown, Trash2, 
  ExternalLink, CheckCircle2, XCircle, 
  ChevronRight, RefreshCcw, LayoutGrid
} from 'lucide-react';

// --- TYPES DEFINITION ---
interface Booking {
  id: string;
  created_at: string;
  client_full_name: string;
  client_email: string;
  client_phone: string;
  service_type: string;
  cleaning_address: string;
  preferred_date: string;
  booking_status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  total_price: number;
  bedrooms: number;
  bathrooms: number;
}

const supabase = createClient()
const AdminBookingMaster = () => {
  // --- STATES ---
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // --- FETCH DATA FROM SUPABASE ---
  const fetchAllBookings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setBookings(data as Booking[]);
    } catch (error: any) {
      console.error("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBookings();
  }, [refreshKey]);

  // --- UPDATE BOOKING STATUS ---
  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      setUpdatingId(id);
      const { error } = await supabase
        .from('bookings')
        .update({ booking_status: newStatus })
        .eq('id', id);

      if (error) throw error;
      
      // লোকাল স্টেট আপডেট (যাতে সাথে সাথে রিফ্লেক্ট করে)
      setBookings(prev => 
        prev.map(booking => 
          booking.id === id ? { ...booking, booking_status: newStatus as any } : booking
        )
      );
    } catch (error: any) {
      alert("Failed to update status: " + error.message);
    } finally {
      setUpdatingId(null);
    }
  };

  // --- FILTER & SEARCH LOGIC ---
  const filteredBookings = useMemo(() => {
    return bookings.filter(item => {
      const matchesSearch = 
        item.client_full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.client_phone?.includes(searchTerm) ||
        item.service_type?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || item.booking_status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter, bookings]);

  // --- UI RENDER HELPERS ---
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-50 text-green-600 border-green-100';
      case 'confirmed': return 'bg-black text-white border-black';
      case 'in-progress': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'cancelled': return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-gray-50 text-gray-400 border-gray-100';
    }
  };

  if (loading && bookings.length === 0) {
    return (
      <div className="w-full bg-white rounded-[40px] p-20 flex flex-col items-center justify-center border border-black/5">
        <Loader2 className="w-10 h-10 animate-spin text-black mb-4" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Syncing Master Database...</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* ১. কন্ট্রোল বার (সার্চ ও ফিল্টার) */}
      <div className="flex flex-col xl:flex-row gap-4 items-center justify-between">
        <div className="relative w-full xl:w-[500px] group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-black transition-colors" />
          <input 
            type="text"
            placeholder="Search by name, phone, or service type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-black/5 rounded-[22px] py-4 pl-14 pr-6 text-xs font-bold outline-none focus:border-black shadow-sm transition-all"
          />
        </div>

        <div className="flex items-center gap-3 w-full xl:w-auto">
          <div className="flex bg-white p-1.5 rounded-[22px] border border-black/5 shadow-sm overflow-x-auto">
            {['all', 'pending', 'confirmed', 'in-progress', 'completed'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-5 py-2 rounded-[16px] text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                  statusFilter === status ? 'bg-black text-white shadow-lg shadow-black/10' : 'text-gray-400 hover:text-black'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
          <button 
            onClick={() => setRefreshKey(prev => prev + 1)}
            className="p-4 bg-white border border-black/5 rounded-[22px] hover:bg-black hover:text-white transition-all shadow-sm group"
          >
            <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
          </button>
        </div>
      </div>

      {/* ২. ডাটা টেবিল কন্টেইনার */}
      <div className="bg-white rounded-[40px] border border-black/5 shadow-2xl shadow-black/[0.02] overflow-hidden">
        <div className="overflow-x-auto px-2">
          <table className="w-full text-left border-separate border-spacing-y-3">
            <thead>
              <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                <th className="px-8 py-6">Customer Profile</th>
                <th className="px-6 py-6">Service Summary</th>
                <th className="px-6 py-6">Logistics</th>
                <th className="px-6 py-6">Operational Status</th>
                <th className="px-8 py-6 text-right">System Controls</th>
              </tr>
            </thead>
            <tbody className="before:block before:h-2">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <tr key={booking.id} className="group hover:scale-[1.005] transition-all duration-300">
                    
                    {/* কাস্টমার কলাম */}
                    <td className="px-8 py-5 bg-gray-50/50 group-hover:bg-gray-50 rounded-l-[30px] border-y border-l border-black/5">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center font-black text-sm shadow-xl shadow-black/10 group-hover:rotate-6 transition-transform">
                            {booking.client_full_name?.[0]}
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-4 border-white rounded-full"></div>
                        </div>
                        <div>
                          <h4 className="font-black text-xs uppercase italic tracking-tight">{booking.client_full_name}</h4>
                          <div className="flex flex-col gap-0.5 mt-1">
                            <span className="flex items-center gap-1 text-[9px] font-bold text-gray-400">
                              <Mail className="w-2.5 h-2.5" /> {booking.client_email}
                            </span>
                            <span className="flex items-center gap-1 text-[9px] font-black text-black uppercase">
                              <Phone className="w-2.5 h-2.5" /> {booking.client_phone}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* সার্ভিস ডিটেইলস */}
                    <td className="px-6 py-5 bg-gray-50/50 group-hover:bg-gray-50 border-y border-black/5">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black uppercase bg-white border border-black/5 px-2 py-1 rounded-md w-fit">
                          {booking.service_type}
                        </span>
                        <div className="flex items-center gap-2 text-[9px] font-bold text-gray-400 mt-1">
                          <LayoutGrid className="w-3 h-3 text-gray-300" />
                          {booking.bedrooms} Bed • {booking.bathrooms} Bath
                        </div>
                        <div className="flex items-center gap-1 text-[10px] font-black text-black">
                          <CreditCard className="w-3 h-3" /> Total: ${booking.total_price}
                        </div>
                      </div>
                    </td>

                    {/* লোকেশন ও তারিখ */}
                    <td className="px-6 py-5 bg-gray-50/50 group-hover:bg-gray-50 border-y border-black/5">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-black" />
                          <span className="text-[10px] font-black uppercase tracking-tighter">{booking.preferred_date}</span>
                        </div>
                        <div className="flex items-start gap-2 max-w-[200px]">
                          <MapPin className="w-3.5 h-3.5 text-gray-300 mt-0.5" />
                          <span className="text-[9px] font-bold text-gray-400 leading-relaxed uppercase">
                            {booking.cleaning_address}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* স্ট্যাটাস ব্যাজ */}
                    <td className="px-6 py-5 bg-gray-50/50 group-hover:bg-gray-50 border-y border-black/5">
                      <div className={`px-4 py-2 rounded-xl border text-[9px] font-black uppercase tracking-widest text-center shadow-sm inline-block min-w-[110px] transition-all ${getStatusStyle(booking.booking_status)}`}>
                        {updatingId === booking.id ? (
                          <Loader2 className="w-3 h-3 animate-spin mx-auto" />
                        ) : (
                          booking.booking_status
                        )}
                      </div>
                    </td>

                    {/* কন্ট্রোল একশনস */}
                    <td className="px-8 py-5 bg-gray-50/50 group-hover:bg-gray-50 rounded-r-[30px] border-y border-r border-black/5 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <select 
                          disabled={updatingId === booking.id}
                          value={booking.booking_status}
                          onChange={(e) => handleUpdateStatus(booking.id, e.target.value)}
                          className="bg-white border-2 border-black/5 rounded-xl px-3 py-2 text-[10px] font-black uppercase outline-none focus:border-black transition-all cursor-pointer shadow-sm"
                        >
                          <option value="pending">Set Pending</option>
                          <option value="confirmed">Confirm</option>
                          <option value="in-progress">Start Task</option>
                          <option value="completed">Complete</option>
                          <option value="cancelled">Cancel</option>
                        </select>
                        
                        <button className="p-2.5 bg-white border border-black/5 rounded-xl hover:bg-black hover:text-white transition-all shadow-sm">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                        <Search className="w-6 h-6 text-gray-200" />
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-300">No matching logs found in system</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ৩. টেবিল ফুটার (প্যাগিনেশন এর জন্য জায়গা রাখা হয়েছে) */}
        <div className="p-8 border-t border-black/[0.03] flex items-center justify-between bg-gray-50/30">
          <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
            Showing <span className="text-black">{filteredBookings.length}</span> of {bookings.length} active entries
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-black/5 rounded-xl text-[9px] font-black uppercase opacity-50 cursor-not-allowed">Prev</button>
            <button className="px-4 py-2 bg-white border border-black/5 rounded-xl text-[9px] font-black uppercase hover:bg-black hover:text-white transition-all shadow-sm">Next Page</button>
          </div>
        </div>
      </div>

      {/* ৪. সিস্টেম স্ট্যাটাস নোট */}
      <div className="flex items-center gap-4 px-4 opacity-50">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
          <span className="text-[8px] font-black uppercase tracking-widest text-gray-500">Database Encrypted</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
          <span className="text-[8px] font-black uppercase tracking-widest text-gray-500">Live Socket Connected</span>
        </div>
      </div>

    </div>
  );
};

export default AdminBookingMaster;