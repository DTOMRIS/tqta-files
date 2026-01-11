
import React from 'react';
import { ChefHat, Award, Users, GraduationCap } from 'lucide-react';
import { GOLD } from './landing-constants';

const Instructors: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-[#0A192F] mb-4">Peşəkar Mentorlarımız</h2>
        <div className="w-24 h-1 bg-[#C5A022] mx-auto"></div>
        <p className="mt-6 text-slate-500">Öz sahəsinin ustalarından sirləri öyrənin.</p>
      </div>

      {/* Coming Soon Banner */}
      <div className="bg-gradient-to-r from-[#0A192F] to-[#1a365d] rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 border-2 border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 border-2 border-white rounded-full"></div>
        </div>
        
        <div className="relative z-10">
          <div className="w-20 h-20 bg-[#C5A022]/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="text-[#C5A022]" size={40} />
          </div>
          
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Təcrübəli Komandamız</h3>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8 text-lg">
            TQTA-da <span className="text-[#C5A022] font-bold">beynəlxalq təcrübəyə</span> malik şeflər, 
            barmenler və qonaqpərvərlik mütəxəssisləri sizə təlim keçir.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#C5A022]">5+</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider">Təlimçi</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#C5A022]">30+</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider">İl Təcrübə</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#C5A022]">CTH</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider">Sertifikatlı</div>
            </div>
          </div>

          <p className="text-sm text-slate-400">
            <GraduationCap className="inline mr-2" size={16} />
            Təlimçi profilləri tezliklə əlavə olunacaq
          </p>
        </div>
      </div>
    </div>
  );
};

export default Instructors;
