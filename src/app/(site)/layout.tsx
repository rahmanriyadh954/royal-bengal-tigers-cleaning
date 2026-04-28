"use client";
import React from "react";
/**
 * (site) Route Group Layout
 * এই লেআউটটি শুধুমাত্র হোমপেজ, সার্ভিস, কন্টাক্ট ইত্যাদি সাধারণ পেজে কাজ করবে।
 * যেহেতু এটা (site) ফোল্ডারে আছে, তাই Admin বা Profile পেজে এই Navbar/Footer আসবে না।
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* পেজের মেইন কন্টেন্ট এরিয়া */}
      <div className="min-h-screen flex flex-col pt-[Navbar_Height]"> 
        {/* যদি নেভবার ফিক্সড থাকে তবে উপরে একটু প্যাডিং দিস */}
        <main className="flex-grow">
          {children}
        </main>
      </div>
    </>
  );
}