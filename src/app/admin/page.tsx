"use client";
import React, { useState, useEffect } from 'react';
import { 
  Database, LayoutDashboard, Users, Zap, Bell, Search, Settings, LogOut, 
  ArrowUpRight, TrendingUp, CreditCard, Calendar, AlertCircle,
  Clock, Download, Filter, MousePointerClick, ShieldCheck,
  ChevronRight, MoreHorizontal, BarChart3, Activity, 
  MessageSquare, Edit3, Trash2, Save, Plus, Globe, Lock, Eye
} from 'lucide-react';
import { createClient } from '../../lib/supabase'; // তোর সুপাবেস পাথ

export default function SuperAdminTerminal() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isSaving, setIsSaving] = useState(false);
  const supabase = createClient()

  // ১. সেই সিকিউরিটি লেয়ার (এখানেই বসাতে হয়)
  useEffect(() => {
  const checkAdmin = async () => {
    // ১. আগে সেশন থেকে ইউজার আইডি নে
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      window.location.href = "/login";
      return;
    }

    // ২. ডাটাবেস (profiles table) থেকে ওই ইউজারের রোল চেক কর
    const { data: profile, error } = await supabase
      .from('profiles') // তোর টেবিলের নাম যদি 'users' হয় তবে সেটা দিবি
      .select('role')
      .eq('id', session.user.id)
      .single();

    // ৩. রোল যদি 'admin' না হয়, তবে কিক আউট কর
    if (error || profile?.role !== 'admin') {
      alert("তোর তো অ্যাডমিন পাওয়ার নাই ভাই!");
      window.location.href = "/"; // হোমপেজে পাঠায় দে
    } else {
      setLoading(false); // রোল অ্যাডমিন হলে ড্যাশবোর্ড দেখাও
    }
  };
  
  checkAdmin();
}, []);

  // ২. ফাংশনালিটি: সাইট কন্টেন্ট সেভ করার লজিক
  const handleSaveContent = async () => {
    setIsSaving(true);
    // এখানে তোর সুপাবেস আপডেট লজিক বসবে
    setTimeout(() => {
      setIsSaving(false);
      alert("Site Content Updated Successfully!");
    }, 1500);
  };

  return (
    <div className="flex min-h-screen bg-[#F4F7FE] text-black font-sans selection:bg-yellow-400">
      
      {/* বাম পাশের পাওয়ারফুল সাইডবার */}
      <aside className={`${isSidebarOpen ? 'w-72' : 'w-24'} hidden lg:flex flex-col bg-black text-white p-6 fixed h-full z-50 transition-all duration-500 ease-in-out`}>
        <div className="flex items-center gap-4 mb-12 px-2">
          <div className="w-12 h-12 bg-yellow-400 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-yellow-400/20">
            <Zap className="text-black fill-black" size={24} />
          </div>
          {isSidebarOpen && (
            <div className="overflow-hidden">
              <h2 className="text-xl font-black italic tracking-tighter uppercase leading-none">Tiger OS</h2>
              <p className="text-[9px] font-black text-yellow-400/50 uppercase tracking-[0.3em] mt-1">Admin Terminal</p>
            </div>
          )}
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          {[
            { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'bookings', label: 'Bookings', icon: Calendar },
            { id: 'cms', label: 'CMS Editor', icon: Globe },
            { id: 'users', label: 'User Master', icon: Users },
            { id: 'analytics', label: 'Financials', icon: BarChart3 },
            { id: 'security', label: 'Security', icon: Lock },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`group w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all relative ${activeTab === item.id ? 'bg-white text-black shadow-2xl shadow-white/10' : 'text-gray-500 hover:bg-white/5 hover:text-white'}`}
            >
              <item.icon size={20} className={activeTab === item.id ? 'text-black' : 'group-hover:scale-110 transition-transform'} />
              {isSidebarOpen && <span className="text-[11px] font-black uppercase tracking-widest">{item.label}</span>}
              {activeTab === item.id && <div className="absolute right-4 w-1.5 h-1.5 bg-black rounded-full"></div>}
            </button>
          ))}
        </nav>

        <button className="flex items-center gap-4 px-4 py-4 text-red-500 hover:bg-red-500/10 rounded-2xl transition-all group">
          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
          {isSidebarOpen && <span className="text-[11px] font-black uppercase tracking-widest">Terminate Session</span>}
        </button>
      </aside>

      {/* মেইন কন্টেন্ট এরিয়া */}
      <main className={`flex-1 ${isSidebarOpen ? 'lg:ml-72' : 'lg:ml-24'} transition-all duration-500`}>
        
        {/* হেডার সেকশন */}
        <header className="sticky top-0 z-40 bg-[#F4F7FE]/80 backdrop-blur-xl border-b border-black/[0.03] px-10 py-6 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-3 bg-white border border-black/5 rounded-xl hover:bg-black hover:text-white transition-all shadow-sm">
              <MoreHorizontal size={20} />
            </button>
            <div>
              <h1 className="text-3xl font-black tracking-tighter uppercase italic leading-none">Commander <span className="text-gray-300 italic">Console</span></h1>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em] mt-1 italic">Status: {activeTab}</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
             <div className="text-right hidden md:block">
                <p className="text-[11px] font-black uppercase tracking-widest">{currentTime.toLocaleTimeString()}</p>
                <p className="text-[9px] font-bold text-gray-400 uppercase">{currentTime.toDateString()}</p>
             </div>
             <div className="relative p-3 bg-white border border-black/5 rounded-xl shadow-sm hover:scale-105 transition-all cursor-pointer">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
             </div>
             <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white font-black text-xs border-4 border-white shadow-xl">AD</div>
          </div>
        </header>

        {/* ডাইনামিক কন্টেন্ট সুইচ */}
        <div className="p-10 max-w-[1600px] mx-auto space-y-10">

          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: "Gross Revenue", val: "$24,500", trend: "+12.5%", color: "text-blue-600", icon: CreditCard },
                  { label: "Total Bookings", val: "142", trend: "Today", color: "text-black", icon: Activity },
                  { label: "Active Customers", val: "1,204", trend: "+28", color: "text-purple-600", icon: Users },
                  { label: "System Health", val: "99.9%", trend: "Stable", color: "text-green-500", icon: ShieldCheck },
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-8 rounded-[40px] border border-black/5 shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden">
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-4 bg-gray-50 rounded-2xl group-hover:bg-black group-hover:text-white transition-all">
                        <stat.icon size={22} />
                      </div>
                      <span className="text-[10px] font-black bg-gray-100 px-3 py-1 rounded-full uppercase italic">{stat.trend}</span>
                    </div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                    <h3 className={`text-3xl font-black tracking-tighter ${stat.color}`}>{stat.val}</h3>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
                <div className="xl:col-span-2 bg-white p-10 rounded-[50px] border border-black/5 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-10 opacity-5 italic font-black text-8xl uppercase pointer-events-none">Growth</div>
                  <h4 className="text-xl font-black uppercase tracking-tighter mb-10 flex items-center gap-3">
                    <TrendingUp className="text-green-500" /> Revenue Flow
                  </h4>
                  <div className="h-64 flex items-end gap-3 justify-between">
                    {[40, 70, 45, 90, 65, 80, 55, 95, 75, 85, 60, 100].map((h, i) => (
                      <div key={i} className="flex-1 bg-gray-50 rounded-t-2xl relative group cursor-pointer hover:bg-gray-100 transition-all">
                        <div style={{ height: `${h}%` }} className="bg-black/5 group-hover:bg-black transition-all rounded-t-2xl"></div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-10 rounded-[50px] border border-black/5 shadow-sm">
                  <h4 className="text-xl font-black uppercase tracking-tighter mb-8 italic text-red-500 flex items-center gap-2">
                    <Activity size={18} /> Live Events
                  </h4>
                  <div className="space-y-6">
                    {[
                      { msg: "New payment from Tas-Cleaning", time: "2m ago", icon: CreditCard, color: "bg-blue-50 text-blue-600" },
                      { msg: "Server backup completed", time: "1h ago", icon: Database, color: "bg-green-50 text-green-600" },
                      { msg: "Failed login from IP: 192.168.1.1", time: "3h ago", icon: AlertCircle, color: "bg-red-50 text-red-600" },
                      { msg: "Service 'Deep Clean' price updated", time: "5h ago", icon: Edit3, color: "bg-yellow-50 text-yellow-600" }
                    ].map((log, i) => (
                      <div key={i} className="flex gap-4 group">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:rotate-12 ${log.color}`}>
                          <log.icon size={18} />
                        </div>
                        <div>
                          <p className="text-[11px] font-black uppercase leading-tight text-gray-800">{log.msg}</p>
                          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1 italic">{log.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CMS EDITOR TAB (A to Z Control) */}
          {activeTab === 'cms' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500 max-w-5xl space-y-10 pb-20">
              <header className="flex justify-between items-center">
                <div>
                  <h2 className="text-4xl font-black uppercase tracking-tightest italic leading-none">Visual <span className="text-gray-300">Editor</span></h2>
                  <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.4em] mt-2 italic">Real-time Frontend Synchronizer</p>
                </div>
                <button 
                  onClick={handleSaveContent}
                  disabled={isSaving}
                  className={`bg-black text-white px-10 py-5 rounded-[20px] text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl flex items-center gap-3 hover:scale-105 active:scale-95 transition-all ${isSaving ? 'opacity-50' : ''}`}
                >
                  {isSaving ? <Clock className="animate-spin" size={18} /> : <Save size={18} />}
                  {isSaving ? "Syncing..." : "Publish Changes"}
                </button>
              </header>

              {/* Hero Section Edit */}
              <div className="bg-white p-10 rounded-[50px] border border-black/5 shadow-sm space-y-8">
                <div className="flex items-center gap-3 pb-6 border-b border-black/[0.03]">
                  <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center font-black">01</div>
                  <h3 className="text-xs font-black uppercase tracking-widest italic">Hero Section Configuration</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Main Headline</label>
                    <textarea rows={3} className="w-full bg-gray-50 border-none rounded-3xl p-6 font-bold text-sm focus:ring-2 ring-yellow-400 transition-all outline-none" defaultValue="We pounce on every mess with tiger-like precision." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Subheadline Text</label>
                    <textarea rows={3} className="w-full bg-gray-50 border-none rounded-3xl p-6 font-bold text-sm focus:ring-2 ring-yellow-400 transition-all outline-none" defaultValue="Tasmania's most trusted professional cleaning service. From residential to commercial deep cleaning." />
                  </div>
                </div>
              </div>

              {/* Service Management */}
              <div className="bg-white p-10 rounded-[50px] border border-black/5 shadow-sm space-y-8">
                <div className="flex items-center justify-between pb-6 border-b border-black/[0.03]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center font-black">02</div>
                    <h3 className="text-xs font-black uppercase tracking-widest italic">Service Catalog Inventory</h3>
                  </div>
                  <button className="text-[10px] font-black uppercase bg-gray-50 px-5 py-2 rounded-xl hover:bg-black hover:text-white transition-all flex items-center gap-2">
                    <Plus size={14} /> Add New Service
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { name: "Residential Deep Clean", price: "$150", status: "Active" },
                    { name: "End of Lease Cleaning", price: "$280", status: "Popular" },
                    { name: "Office/Commercial", price: "$45/hr", status: "Active" }
                  ].map((s, i) => (
                    <div key={i} className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl hover:bg-white hover:shadow-xl hover:scale-[1.02] transition-all border border-transparent hover:border-black/5">
                      <div className="flex items-center gap-6">
                         <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                           <Zap size={18} className="text-yellow-500" />
                         </div>
                         <div>
                           <p className="text-sm font-black uppercase italic leading-none">{s.name}</p>
                           <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase">{s.price} • {s.status}</p>
                         </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-3 bg-white text-black rounded-xl border border-black/5 hover:bg-black hover:text-white transition-all"><Edit3 size={16} /></button>
                        <button className="p-3 bg-white text-red-500 rounded-xl border border-black/5 hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* USER MASTER TAB */}
          {activeTab === 'users' && (
            <div className="animate-in fade-in slide-in-from-left-4 duration-500 space-y-10">
              <div className="flex items-center justify-between">
                <h2 className="text-4xl font-black uppercase tracking-tightest italic">Client <span className="text-gray-300">Base</span></h2>
                <div className="flex gap-4">
                  <div className="flex items-center bg-white border border-black/5 rounded-2xl px-6 py-3 shadow-sm group">
                    <Search className="text-gray-300" size={16} />
                    <input type="text" placeholder="Search by name, email or phone..." className="bg-transparent border-none outline-none px-4 text-xs font-bold w-72 uppercase tracking-wider" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[50px] overflow-hidden border border-black/5 shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-black/[0.03]">
                    <tr>
                      {['Customer', 'Status', 'Last Booking', 'Total Spent', 'Action'].map((th) => (
                        <th key={th} className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">{th}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/[0.03]">
                    {[
                      { name: "Sarah J.", email: "sarah@gmail.com", status: "Premium", date: "Apr 24, 2026", spent: "$1,240" },
                      { name: "Mike R.", email: "mike.ross@outlook.com", status: "Active", date: "Apr 20, 2026", spent: "$450" },
                      { name: "John Wick", email: "babayaga@killer.com", status: "Banned", date: "Jan 12, 2026", spent: "$0" },
                    ].map((user, i) => (
                      <tr key={i} className="hover:bg-gray-50/50 transition-all group">
                        <td className="px-10 py-6">
                          <p className="text-xs font-black uppercase italic">{user.name}</p>
                          <p className="text-[9px] font-bold text-gray-400 uppercase mt-1">{user.email}</p>
                        </td>
                        <td className="px-10 py-6">
                          <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase italic ${user.status === 'Banned' ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'}`}>{user.status}</span>
                        </td>
                        <td className="px-10 py-6 text-[10px] font-bold text-gray-500 uppercase">{user.date}</td>
                        <td className="px-10 py-6 font-black text-sm italic">{user.spent}</td>
                        <td className="px-10 py-6">
                           <button className="p-3 bg-gray-50 rounded-xl hover:bg-black hover:text-white transition-all opacity-0 group-hover:opacity-100"><MessageSquare size={16} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

        {/* ফুটার ফুটপ্রিন্ট */}
        <footer className="text-center py-20 opacity-20">
          <p className="text-[10px] font-black uppercase tracking-[1em]">Tiger Core Engine v3.0-Stable • RSA-256 Encrypted</p>
        </footer>
      </main>

      {/* কুইক অ্যাকশন ফ্লোটার */}
      <button className="fixed bottom-10 right-10 w-20 h-20 bg-black text-white rounded-[30px] shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-[60] group">
        <ShieldCheck size={32} className="text-yellow-400 group-hover:rotate-12 transition-transform" />
      </button>

    </div>
  );
}