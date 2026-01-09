
import React from 'react';
import { Calendar, Tag, UserPlus, Star } from 'lucide-react';
import { WORKSHOPS, GOLD, NAVY_BLUE, TEAL_BG } from '../constants';

const WorkshopsSection: React.FC = () => {
  return (
    <div id="workshops" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <div>
          <h2 className="text-4xl font-bold text-[#0A192F] mb-4">TQTA Workshop'ları</h2>
          <p className="text-slate-500">Mətbəxin sehrini kəşf edin: Fevral - İyun 2025 proqramı.</p>
        </div>
        <div className="mt-6 md:mt-0 flex items-center space-x-2 bg-slate-100 p-2 rounded-xl">
          <Star className="text-[#C5A022]" size={20} />
          <span className="text-sm font-bold text-[#0A192F]">Qiymətlər 19 AZN-dən başlayır</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {WORKSHOPS.map((ws) => (
          <div key={ws.id} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-xl transition-all relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div className={`${TEAL_BG} text-white px-4 py-1.5 rounded-xl text-xs font-bold`}>
                  {ws.month} 2025
                </div>
                <div className="text-2xl font-bold text-[#C5A022]">{ws.price}</div>
              </div>
              
              <h3 className="text-xl font-bold text-[#0A192F] mb-4">{ws.title}</h3>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                {ws.description}
              </p>

              <div className="flex items-center space-x-4 mb-8 text-xs font-bold text-slate-400 uppercase tracking-widest">
                <div className="flex items-center"><UserPlus size={16} className="mr-2" /> Yaş: {ws.age}</div>
              </div>

              <button className="w-full py-3 border-2 border-[#0A192F] text-[#0A192F] hover:bg-[#0A192F] hover:text-white rounded-xl font-bold transition-all flex items-center justify-center">
                Yerini Ayır <Calendar size={18} className="ml-2" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16 bg-slate-100 p-8 rounded-[2rem] flex flex-col md:flex-row items-center justify-between">
        <div className="mb-6 md:mb-0">
          <h4 className="text-xl font-bold text-[#0A192F]">Korporativ Workshop Tələb Edirsiniz?</h4>
          <p className="text-sm text-slate-500 mt-1">Komanda quruculuğu və xüsusi günlər üçün bizimlə əlaqə saxlayın.</p>
        </div>
        <a href="tel:+994517696181" className="bg-[#0A192F] text-white px-8 py-3 rounded-xl font-bold flex items-center hover:bg-slate-800 transition-colors">
          Bizə zəng et: +994 51 769 61 81
        </a>
      </div>
    </div>
  );
};

export default WorkshopsSection;
