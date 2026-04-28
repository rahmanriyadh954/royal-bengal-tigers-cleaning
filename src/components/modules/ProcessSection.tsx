import React from 'react';
import { Search, Crosshair, Sparkles } from 'lucide-react';

const ProcessSection = () => {
  const steps = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "The Scouting",
      desc: "We inspect every corner to identify high-traffic zones and hidden dust."
    },
    {
      icon: <Crosshair className="w-8 h-8" />,
      title: "The Pounce",
      desc: "Our elite squad deploys industrial-grade tech to eliminate all dirt."
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Royal Polish",
      desc: "A final inspection ensures your den meets the Bengal Tiger standard."
    }
  ];

  return (
    <section className="py-24 bg-brand-dark text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <h2 className="text-5xl font-black mb-20 tracking-tighter uppercase text-center">
          OUR <span className="text-brand-yellow">HUNTING</span> PROCESS
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group">
              <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-brand-yellow group-hover:text-black transition-all duration-500">
                {step.icon}
              </div>
              <h3 className="text-3xl font-bold mb-4 italic">{idx + 1}. {step.title}</h3>
              <p className="text-gray-400 leading-relaxed">{step.desc}</p>
              {idx < 2 && <div className="hidden lg:block absolute top-10 -right-6 text-brand-yellow/20 text-6xl">→</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;