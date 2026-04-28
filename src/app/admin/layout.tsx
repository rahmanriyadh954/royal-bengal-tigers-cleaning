"use client";
import React from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // এখানে আমরা মেইন সাইটের Layout ইউজ করছি না, তাই Navbar/Footer আসবে না
    <div className="bg-[#F4F7FE] min-h-screen">
      {children}
    </div>
  );
}