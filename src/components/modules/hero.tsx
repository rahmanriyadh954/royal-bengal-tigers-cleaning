"use client";

import React from 'react';
import { ArrowRight, Star, FireExtinguisher } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const slidesData = [
  {
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2070",
    titleOne: "ROYAL", titleTwo: "BENGAL", titleThree: "STANDARDS",
    desc: "We don't just clean; we hunt down every particle. Experience the true definition of elite cleanliness.",
  },
  {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1920",
    titleOne: "PURE", titleTwo: "GOLDEN", titleThree: "TOUCH",
    desc: "Every surface is sanitized, polished, and perfected with our surgical attention to detail.",
  },
  {
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2070",
    titleOne: "SANCTUARY", titleTwo: "RECLAIM", titleThree: "THE SPACE",
    desc: "Your home is your kingdom. Let the Tiger Squad reclaim it from the forces of dust and dirt.",
  }
];

const HeroSection = () => {
  return (
    <section className="relative h-[90vh] w-full bg-[#0a0a0a] overflow-hidden">
      
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1000}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true, el: '.tiger-pagination' }}
        loop={true}
        className="h-full w-full"
      >
        {slidesData.map((slide, index) => (
          <SwiperSlide key={index} className="relative h-full w-full">
            
            {/* Background Image - opacity বাড়িয়ে দিছি যাতে ছবি দেখা যায় */}
            <div className="absolute inset-0">
              <img 
                src={slide.image} 
                className="w-full h-full object-cover opacity-40 grayscale-[50%]" 
                alt="Elite interior" 
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#0a0a0a]" />
            </div>

            {/* Content Container */}
            <div className="relative z-20 h-full flex items-center justify-center text-center px-6">
              <div className="w-full max-w-7xl mx-auto">
                
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
                  <Star className="w-3.5 h-3.5 text-[#FFD700] fill-[#FFD700]" />
                  <span className="text-white text-[9px] font-black uppercase tracking-[0.3em]">Tasmania's Finest Elite Squad</span>
                  <Star className="w-3.5 h-3.5 text-[#FFD700] fill-[#FFD700]" />
                </div>

                <h1 className="text-5xl md:text-[110px] font-black text-white leading-[0.85] tracking-tighter mb-6 uppercase">
                  {slide.titleOne} <span className="text-[#FFD700] italic">{slide.titleTwo}</span> <br />
                  <span className="bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">{slide.titleThree}</span>
                </h1>

                <p className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                  {slide.desc}
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                  <a href="#book" className="group px-10 py-5 bg-[#FFD700] text-black font-black text-lg rounded-xl hover:bg-white transition-all duration-300 flex items-center gap-2">
                    INITIATE THE HUNT <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                  
                  <div className="flex items-center gap-3 text-left">
                    <FireExtinguisher className="w-10 h-10 text-[#FFD700]" />
                    <div className="leading-tight">
                      <div className="text-white font-black text-xl tracking-tight leading-none">The 24Hr Clean</div>
                      <div className="text-gray-500 text-[10px] uppercase font-bold tracking-[0.1em] mt-1">Satisfied or We Pounce Back</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination - ডটগুলো ছোট করার জন্য max-w-xs দিছি */}
      <div className="absolute bottom-10 left-0 right-0 z-30 flex justify-center">
        <div className="tiger-pagination flex items-center justify-center gap-2 px-6 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md max-w-fit"></div>
      </div>

    </section>
  );
};

export default HeroSection;