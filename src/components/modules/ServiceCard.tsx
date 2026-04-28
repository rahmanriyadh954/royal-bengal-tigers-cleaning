import React from 'react';

// প্রপস ইন্টারফেস ডিফাইন করা (টাইপস্ক্রিপ্ট এরর এড়াতে)
interface ServiceCardProps {
  title: string;
  desc: string;
  price?: string;
  className?: string;
}

const ServiceCard = ({ title, desc, price, className }: ServiceCardProps) => {
  return (
    <div className={`group relative bg-white p-1 rounded-[48px] overflow-hidden shadow-2xl border border-gray-100 transition-all duration-500 hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] ${className}`}>
      <div className="p-10">
        
        <h3 className="text-3xl font-black mb-4 tracking-tighter uppercase">{title}</h3>
        <p className="text-gray-500 mb-8 font-medium leading-relaxed">
          {desc}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-black text-black">
            {price} <span className="text-xs text-gray-400">/start</span>
          </span>
          <button className="p-4 bg-black text-white rounded-2xl group-hover:bg-brand-yellow group-hover:text-black transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;