
import React from 'react';
import { ChefHat, Award, Linkedin } from 'lucide-react';
import { GOLD } from './landing-constants';

const INSTRUCTORS = [
  {
    name: "Şef Elnur Əzizov",
    role: "Kulinariya Direktoru",
    bio: "20 ildən artıq beynəlxalq təcrübə, Michelin ulduzlu restoranlarda staj.",
    image: "https://images.unsplash.com/photo-1583394293214-28dea15ee548?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Sarah Jenkins",
    role: "Qonaqpərvərlik Meneceri",
    bio: "Böyük Britaniyadan dəvət olunmuş mütəxəssis, CTH üzrə baş təlimçi.",
    image: "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Murat Bəy",
    role: "Master Barista",
    bio: "Qəhvə mədəniyyəti və miksologiya üzrə regional çempion.",
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80&w=400"
  }
];

const Instructors: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-[#0A192F] mb-4">Peşəkar Mentorlarımız</h2>
        <div className="w-24 h-1 bg-[#C5A022] mx-auto"></div>
        <p className="mt-6 text-slate-500">Öz sahəsinin ustalarından sirləri öyrənin.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {INSTRUCTORS.map((ins, idx) => (
          <div key={idx} className="group text-center">
            <div className="relative mb-6 mx-auto w-64 h-64 overflow-hidden rounded-full border-4 border-white shadow-2xl">
              <img src={ins.image} alt={ins.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 bg-[#0A192F]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Linkedin className="text-white cursor-pointer" size={24} />
              </div>
            </div>
            <h4 className="text-xl font-bold text-[#0A192F]">{ins.name}</h4>
            <p className={`${GOLD} text-xs font-bold uppercase tracking-widest mb-4`}>{ins.role}</p>
            <p className="text-slate-500 text-sm max-w-xs mx-auto">{ins.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instructors;
