
import React from 'react';
import { ArrowRight, Star, ShieldCheck, Award, Globe } from 'lucide-react';
import { GOLD_BG } from '../constants';

interface HeroProps {
  onStart: () => void;
  onInvest: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart, onInvest }) => {
  return (
    <div id="top" className="relative h-[90vh] flex items-center overflow-hidden">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=2000" 
          alt="Professional Kitchen"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A192F]/95 via-[#0A192F]/80 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-3xl">
          <div className="flex items-center space-x-3 mb-8">
            <div className="flex space-x-1 text-[#C5A022]">
              {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
            </div>
            <div className="h-4 w-px bg-white/20"></div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-300">CTH Awards Certified Academy</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-[1.1]">
            Azərbaycan'dan <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5A022] to-[#E5C042]">Dünyaya Açılan</span> <br />
            <span className="italic font-serif font-normal">Ləzzət Qapısı</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 mb-12 max-w-xl leading-relaxed">
            TQTA ilə qonaqpərvərlik sənətinin zirvəsinə yüksəlin. 
            Sumqayıtın mərkəzində beynəlxalq standartlarda təhsil və qlobal karyera imkanları.
          </p>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
            <button 
              onClick={onStart}
              className={`${GOLD_BG} text-white px-10 py-5 rounded-2xl font-bold flex items-center justify-center transition-all btn-glow text-lg`}
            >
              Eğitimi Başla <ArrowRight className="ml-2" size={22} />
            </button>
            <button 
              onClick={onInvest}
              className="border-2 border-white/20 hover:border-[#C5A022] hover:bg-white/5 text-white px-10 py-5 rounded-2xl font-bold transition-all backdrop-blur-sm text-lg"
            >
              Yatırımcı Girişi
            </button>
          </div>

          {/* Trust Bar */}
          <div className="pt-12 border-t border-white/10 flex flex-wrap gap-8 items-center opacity-70">
            <div className="flex items-center space-x-2 group cursor-help hover:opacity-100 transition-opacity">
              <ShieldCheck className="text-[#C5A022]" size={20} />
              <span className="text-xs font-bold uppercase tracking-widest">DMA Standartları</span>
            </div>
            <div className="flex items-center space-x-2 group cursor-help hover:opacity-100 transition-opacity">
              <Award className="text-[#C5A022]" size={20} />
              <span className="text-xs font-bold uppercase tracking-widest">CTH Awards UK</span>
            </div>
            <div className="flex items-center space-x-2 group cursor-help hover:opacity-100 transition-opacity">
              <Globe className="text-[#C5A022]" size={20} />
              <span className="text-xs font-bold uppercase tracking-widest">TİKA Dəstəyi</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Blur */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#C5A022] rounded-full blur-[150px] opacity-10"></div>
    </div>
  );
};

export default Hero;
