
import React from 'react';
import { Quote, Star } from 'lucide-react';
import { GOLD } from './landing-constants';

const TESTIMONIALS = [
  {
    name: "Leyla Əliyeva",
    role: "Four Seasons Baku, Pastry Chef",
    text: "TQTA-da aldığım təhsil mənim karyeramda dönüş nöqtəsi oldu. Beynəlxalq sertifikat sayəsində xəyal etdiyim işə qəbul oldum.",
    image: "https://i.pravatar.cc/150?u=leyla"
  },
  {
    name: "Kamran Həsənov",
    role: "Restoran Sahibi, 'Lezzet' Bistro",
    text: "Akademiyanın investisiya proqramı sayəsində öz restoranımı açmaq üçün lazım olan həm biliyi, həm də dəstəyi tapdım.",
    image: "https://i.pravatar.cc/150?u=kamran"
  },
  {
    name: "Nigar Sultanova",
    role: "Məzun, Head of Service",
    text: "Müəllimlərin peşəkarlığı və AI köməkçisi dərsləri daha maraqlı və effektiv edirdi. Hər kəsə tövsiyə edirəm!",
    image: "https://i.pravatar.cc/150?u=nigar"
  }
];

const Testimonials: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-[#0A192F] mb-4">Məzunlarımızın Uğur Hekayələri</h2>
        <div className="w-24 h-1 bg-[#C5A022] mx-auto"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {TESTIMONIALS.map((t, idx) => (
          <div key={idx} className="bg-white p-8 rounded-3xl shadow-xl border border-slate-50 relative">
            <Quote className={`${GOLD} opacity-20 absolute top-6 right-6`} size={48} />
            <div className="flex items-center space-x-1 mb-4">
              {[1,2,3,4,5].map(s => <Star key={s} size={14} className={GOLD} fill="currentColor" />)}
            </div>
            <p className="text-slate-600 italic mb-8 leading-relaxed">"{t.text}"</p>
            <div className="flex items-center">
              <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full mr-4 border-2 border-[#C5A022]" />
              <div>
                <h4 className="font-bold text-[#0A192F] text-sm">{t.name}</h4>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
