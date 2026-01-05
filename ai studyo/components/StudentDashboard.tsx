
import React from 'react';
import { LayoutDashboard, Calendar, Utensils, Award, BookOpen, Clock } from 'lucide-react';
import { NAVY_BLUE, GOLD } from '../constants';

const StudentDashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-3xl font-bold text-[#0A192F]">Tələbə Portalı</h2>
          <p className="text-slate-500 text-sm mt-1">Xoş gəldin, Aysel! Bugünki cədvəlinə bax.</p>
        </div>
        <div className="flex space-x-2">
          <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm">
            <img src="https://picsum.photos/seed/student/100" alt="Student" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Nav (Mock) */}
        <div className="lg:col-span-1 space-y-2">
          {[
            { icon: LayoutDashboard, label: 'Panel', active: true },
            { icon: Calendar, label: 'Cədvəl', active: false },
            { icon: Utensils, label: 'Reseptlərim', active: false },
            { icon: BookOpen, label: 'Dərsliklər', active: false },
            { icon: Award, label: 'Nəticələr', active: false },
          ].map((item, idx) => (
            <button 
              key={idx}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${item.active ? `${NAVY_BLUE} text-white shadow-lg` : 'text-slate-600 hover:bg-white'}`}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-2">Ortalama (GPA)</p>
              <h3 className="text-3xl font-bold text-[#0A192F]">4.8 <span className="text-xs text-green-500">+0.2</span></h3>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-2">Davamiyyət</p>
              <h3 className="text-3xl font-bold text-[#0A192F]">96%</h3>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-2">Sertifikatlar</p>
              <h3 className="text-3xl font-bold text-[#0A192F]">2 <span className="text-xs text-slate-400">Yeni</span></h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Daily Schedule */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <h4 className="font-bold text-[#0A192F] mb-6 flex items-center">
                <Clock className="mr-2 text-[#C5A022]" size={20} /> Bugünki Cədvəl
              </h4>
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-slate-50 rounded-2xl border-l-4 border-[#C5A022]">
                  <div className="text-xs font-bold text-slate-400 w-16">09:00</div>
                  <div className="ml-4">
                    <p className="font-bold text-sm">Fransız Sousları</p>
                    <p className="text-[10px] text-slate-400">Mətbəx A-1</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-slate-50 rounded-2xl border-l-4 border-slate-200">
                  <div className="text-xs font-bold text-slate-400 w-16">11:30</div>
                  <div className="ml-4">
                    <p className="font-bold text-sm">Kulinariya Nəzəriyyəsi</p>
                    <p className="text-[10px] text-slate-400">Auditoriya 302</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-slate-50 rounded-2xl border-l-4 border-slate-200">
                  <div className="text-xs font-bold text-slate-400 w-16">14:00</div>
                  <div className="ml-4">
                    <p className="font-bold text-sm">Mise en place Praktikası</p>
                    <p className="text-[10px] text-slate-400">Laboratoriya B</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Week's Recipe */}
            <div className="bg-[#0A192F] text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <div className="bg-[#C5A022] text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full inline-block mb-4">
                  Həftənin Resepti
                </div>
                <h4 className="text-2xl font-serif font-bold mb-4">Bœuf Bourguignon</h4>
                <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                  Klassik fransız mətbəxinin incisi. Bu həftəki laboratoriya dərsimizin əsas mövzusu.
                </p>
                <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 py-2 px-6 rounded-lg text-sm font-bold transition-all">
                  Resepti Aç
                </button>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 opacity-20 transform translate-x-8 -translate-y-8">
                <Utensils size={128} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
