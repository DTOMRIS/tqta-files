
import React from 'react';
import { BarChart3, TrendingUp, Users, ArrowUpRight, ArrowDownRight, Target, MousePointer2, CreditCard } from 'lucide-react';
import { NAVY_BLUE, GOLD } from './landing-constants';

const AdminAnalytics: React.FC = () => {
  const stats = [
    { label: 'Ümumi Leadlar', value: '1,284', change: '+12%', positive: true, icon: Users },
    { label: 'Konversiya Faizi', value: '4.2%', change: '-0.5%', positive: false, icon: Target },
    { label: 'Gözlənilən Gəlir', value: '45,000 AZN', change: '+8%', positive: true, icon: CreditCard },
    { label: 'AI Chat Aktivliyi', value: '890', change: '+24%', positive: true, icon: MousePointer2 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-3xl font-bold text-[#0A192F]">Admin Analitika</h2>
          <p className="text-slate-500 text-sm mt-1">Platformanın real vaxt performans göstəriciləri.</p>
        </div>
        <button className="bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl text-xs font-bold transition-all">
          Hesabatı Yüklə (PDF)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-slate-50 rounded-2xl text-[#C5A022]">
                <stat.icon size={20} />
              </div>
              <div className={`flex items-center text-[10px] font-bold ${stat.positive ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change} {stat.positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
              </div>
            </div>
            <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-2xl font-bold text-[#0A192F]">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
          <h4 className="font-bold text-[#0A192F] mb-8 flex items-center">
            <BarChart3 className="mr-2 text-[#C5A022]" size={20} /> Konversiya Hunisi (Funnel)
          </h4>
          <div className="space-y-6">
            {[
              { label: 'Giriş (Landing)', value: 100, color: 'bg-[#0A192F]' },
              { label: 'Proqramlara Baxış', value: 65, color: 'bg-[#0097A7]' },
              { label: 'AI Chat Etkileşimi', value: 40, color: 'bg-[#C5A022]' },
              { label: 'Lead Formu', value: 12, color: 'bg-green-500' },
              { label: 'Kayıt (Sales)', value: 4, color: 'bg-amber-600' },
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2 text-slate-400">
                  <span>{step.label}</span>
                  <span>{step.value}%</span>
                </div>
                <div className="h-4 w-full bg-slate-50 rounded-full overflow-hidden">
                  <div className={`h-full ${step.color} transition-all duration-1000`} style={{ width: `${step.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0A192F] rounded-[2.5rem] p-8 text-white shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-6 text-amber-500">
              <TrendingUp size={20} />
              <h4 className="font-bold uppercase tracking-widest text-xs">Maliyyə Proqnozu</h4>
            </div>
            <h3 className="text-4xl font-serif mb-4 font-bold">120,000 AZN</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Cari traektoriya və konversiya dərəcəsinə əsasən növbəti rüb üçün təxmin edilən dövriyyə.
            </p>
          </div>
          <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/10">
            <p className="text-[10px] font-bold text-slate-500 uppercase mb-2">Ən Populyar Kurs</p>
            <p className="text-lg font-bold">Peşəkar Aşpazlıq (CTH L3)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default
