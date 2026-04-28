"use client";

import React from 'react';
import Image from 'next/image';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] min-h-screen w-full bg-[#0A0A0A] flex items-center justify-center overflow-hidden">
      {/* ব্যাকগ্রাউন্ডে টাইগারের সেই হলুদ আভা */}
      <div className="absolute w-[300px] h-[300px] bg-[#FFD700]/10 rounded-full blur-[100px] animate-pulse" />
      
      <div className="relative flex flex-col items-center gap-8">
        {/* মেইন এনিমেটেড লোগো কন্টেইনার */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          {/* বাইরের স্পিনিং রিং */}
          <div className="absolute inset-0 border-[3px] border-[#FFD700]/20 border-t-[#FFD700] rounded-full animate-spin duration-700"></div>
          
          {/* সেন্টারে টাইগারের লোগো */}
          <div className="relative w-16 h-16 animate-pulse">
            <Image 
              src="/images/royal_bengal_tigers_cleaning.png" 
              alt="Tiger Loading"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>

        {/* টেক্সট সেকশন */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-[#FFD700] text-[10px] font-black uppercase tracking-[0.5em] animate-pulse">
            Tiger Engine Pouncing...
          </p>
          <div className="w-32 h-[1px] bg-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-[#FFD700] animate-tiger-progress"></div>
          </div>
        </div>
      </div>
    </div>
  );
}