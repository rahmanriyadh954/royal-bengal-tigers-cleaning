import React from 'react';

const FAQSection = () => {
  const faqs = [
    { q: "Are the cleaning squads insured?", a: "Yes, every member of our Tiger Squad is fully insured and background-checked for your safety." },
    { q: "Do you bring your own chemicals?", a: "We bring our premium, pet-safe, and eco-friendly cleaning arsenal. You don't need to provide anything." },
    { q: "What if I'm not happy with the clean?", a: "We offer a 24-hour re-clean guarantee. If you aren't satisfied, we come back and fix it for free." }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-black mb-16 text-center uppercase tracking-tighter italic">
          FREQUENTLY ASKED <span className="text-brand-yellow">QUESTIONS</span>
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-8 bg-gray-50 rounded-[32px] border border-gray-100 hover:border-brand-yellow transition-all">
              <h4 className="text-xl font-black mb-3 text-brand-dark">Q: {faq.q}</h4>
              <p className="text-gray-500 font-medium leading-relaxed">A: {faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;