
import React from 'react';
import { Target, Compass, ShieldCheck, Globe } from 'lucide-react';
import { GOLD } from '../constants';

const AboutSection: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-[#0A192F] mb-4">TQTA | Peşəkar Karyeranızın Başlanğıcı</h2>
        <div className="w-24 h-1 bg-[#C5A022] mx-auto mb-6"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
        <div className="bg-white p-10 rounded-3xl shadow-xl border-l-8 border-[#0A192F]">
          <div className="flex items-center mb-6">
            <Target className="text-[#C5A022] mr-4" size={32} />
            <h3 className="text-2xl font-bold text-[#0A192F]">Missiyamız</h3>
          </div>
          <p className="text-slate-600 leading-relaxed text-lg">
            Azərbaycan kulinariya mədəniyyətini beynəlxalq səviyyədə təbliğ etmək, işsiz gənclərin peşə bacarıqlarını inkişaf etdirmək və onları sənayenin tələblərinə cavab verən ixtisaslı kadrlar kimi əmək bazarına hazırlamaqdır.
          </p>
        </div>

        <div className="bg-white p-10 rounded-3xl shadow-xl border-l-8 border-[#0097A7]">
          <div className="flex items-center mb-6">
            <Compass className="text-[#C5A022] mr-4" size={32} />
            <h3 className="text-2xl font-bold text-[#0A192F]">Vizyonumuz</h3>
          </div>
          <p className="text-slate-600 leading-relaxed text-lg">
            Yerli kulinariya irsini qoruyub saxlamaqla yanaşı, beynəlxalq standartlara cavab verən peşəkar təhsili ilə tanınan, Azərbaycanda qastro-turizm sahəsində lider təhsil müəssisəsi olmaqdır.
          </p>
        </div>
      </div>

      <div id="workshops" className="bg-[#0A192F] rounded-[3rem] p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A022] opacity-5 -translate-y-1/2 translate-x-1/2 rounded-full"></div>
        <div className="relative z-10">
          <h3 className="text-3xl font-bold mb-8 text-center">Niyə TQTA Seçilməlidir?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <ShieldCheck className="mx-auto mb-4 text-[#C5A022]" size={40} />
              <h4 className="font-bold mb-2">CTH & DMA Sertifikatlı</h4>
              <p className="text-sm text-slate-400">Beynəlxalq standartlar və Dövlət Məşğulluq Agentliyi tərəfindən tanınan diplomlar.</p>
            </div>
            <div className="text-center">
              <Globe className="mx-auto mb-4 text-[#0097A7]" size={40} />
              <h4 className="font-bold mb-2">Qlobal Karyera</h4>
              <p className="text-sm text-slate-400">Türkiyənin aparıcı universitetləri və otelləri ilə sıx əməkdaşlıq.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 w-10 h-10 border-2 border-[#C5A022] flex items-center justify-center font-bold rounded-lg text-[#C5A022]">90%</div>
              <h4 className="font-bold mb-2">İşlə Təminat</h4>
              <p className="text-sm text-slate-400">Məzunlarımızın böyük hissəsi dərhal professional karyeraya başlayır.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
