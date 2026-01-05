
import React, { useState } from 'react';
import { Briefcase, Landmark, Handshake, Mail, User, ShieldCheck, Phone } from 'lucide-react';
import { NAVY_BLUE, GOLD, GOLD_BG } from '../constants';

const InvestmentBridge: React.FC = () => {
  const [activeForm, setActiveForm] = useState<'hire' | 'partner'>('hire');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        <div className="lg:w-1/2">
          <div className={`inline-flex items-center px-4 py-1 rounded-full bg-[#0097A7]/20 text-[#0097A7] text-xs font-bold uppercase tracking-widest mb-6`}>
            <Landmark size={14} className="mr-2" />
            Karyera və Məşğulluq Körpüsü
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A192F] mb-8 leading-tight">
            Sumqayıtın Gələcəyinə <br />
            <span className={GOLD}>Bizimlə İnvestisiya Edin</span>
          </h2>
          <p className="text-slate-600 text-lg mb-10 leading-relaxed">
            TQTA gənc potensialı sektorun ehtiyacları ilə birləşdirir. Məzunlarımızın 90%-i dərhal işlə təmin olunur. Bizim professional məşğulluq şəbəkəmizə qoşulun.
          </p>

          <div className="space-y-6">
            <div className="flex items-start p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className={`p-3 rounded-xl bg-slate-50 ${GOLD}`}>
                <Briefcase size={24} />
              </div>
              <div className="ml-4">
                <h4 className="font-bold text-[#0A192F]">Məzun İşə Al</h4>
                <p className="text-sm text-slate-500">Professional kadrlarla müəssisənizi gücləndirin.</p>
              </div>
            </div>
            <div className="flex items-start p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className={`p-3 rounded-xl bg-slate-50 ${GOLD}`}>
                <Handshake size={24} />
              </div>
              <div className="ml-4">
                <h4 className="font-bold text-[#0A192F]">Tərəfdaşlıq</h4>
                <p className="text-sm text-slate-500">Təcrübə proqramları və təhsil tərəfdaşlığı üçün bizə qoşulun.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 w-full">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden border border-slate-100">
            <div className="flex mb-8 bg-slate-100 p-1 rounded-xl">
              <button 
                onClick={() => setActiveForm('hire')}
                className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${activeForm === 'hire' ? 'bg-white shadow-md text-[#0A192F]' : 'text-slate-500'}`}
              >
                İşə Götürən
              </button>
              <button 
                onClick={() => setActiveForm('partner')}
                className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${activeForm === 'partner' ? 'bg-white shadow-md text-[#0A192F]' : 'text-slate-500'}`}
              >
                Tərəfdaşlıq
              </button>
            </div>

            <form className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Şirkət və ya Adınız</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-[#C5A022] outline-none transition-all" placeholder="Tam məlumat" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Əlaqə Nömrəsi</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input type="tel" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-[#C5A022] outline-none transition-all" placeholder="+994" />
                </div>
              </div>
              
              <button className={`w-full ${GOLD_BG} text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center justify-center`}>
                <Mail size={18} className="mr-2" /> Əməkdaşlığı Başlat
              </button>

              <div className="flex items-center justify-center text-slate-400 text-[10px] uppercase tracking-widest">
                <ShieldCheck size={12} className="mr-1 text-green-500" /> 
                Professional dəstək komandamız sizlə əlaqə saxlayacaq
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentBridge;
