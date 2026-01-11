import React from 'react';
import { Quote, MapPin, Briefcase, Star, ChevronLeft, ChevronRight, Building2 } from 'lucide-react';
import { useState } from 'react';

const AlumniSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const alumni = [
    {
      name: 'Aynur Həsənova',
      photo: '/alumni/aynur.jpg',
      position: 'Şef Aşpaz',
      company: 'Hilton Baku',
      program: 'Professional Cookery',
      year: '2024',
      quote: 'TQTA sayəsində 3 ay ərzində dünya standartlarında təhsil aldım və arzuladığım işi tapdım.',
      salary: '1800 AZN',
    },
    {
      name: 'Orxan Məmmədov',
      photo: '/alumni/orxan.jpg',
      position: 'Restoran Meneceri',
      company: 'JW Marriott',
      program: 'Restaurant Management',
      year: '2024',
      quote: 'CTH diplomu karyeramda çox böyük dəyişiklik etdi. İndi beynəlxalq brendlərdə işləyirəm.',
      salary: '2500 AZN',
    },
    {
      name: 'Leyla Quliyeva',
      photo: '/alumni/leyla.jpg',
      position: 'Baş Barista',
      company: 'Starbucks Reserve',
      program: 'Barista & Miksologiya',
      year: '2025',
      quote: 'Heç təcrübəm yox idi, indi Bakının ən yaxşı kafelərdən birində baş barista kimi çalışıram.',
      salary: '1200 AZN',
    },
    {
      name: 'Tural Əliyev',
      photo: '/alumni/tural.jpg',
      position: 'Tour Manager',
      company: 'Azerbaijan Tourism Board',
      program: 'Turizm & Qonaqpərvərlik',
      year: '2025',
      quote: '1 aylıq turizm proqramı məni bu sahəyə hazırladı. İndi xarici turistlərlə işləyirəm.',
      salary: '1600 AZN',
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % alumni.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + alumni.length) % alumni.length);
  };

  const currentAlumni = alumni[currentIndex];

  return (
    <section id="alumni" className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Briefcase size={16} />
            <span>90% İşə Düzəlmə Nisbəti</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0A192F] mb-4">
            Uğurlu Məzunlarımız
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            TQTA məzunları Azərbaycanın ən prestijli otel və restoranlarında çalışır
          </p>
        </div>

        {/* Main Alumni Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-5 gap-0">
              {/* Photo Side */}
              <div className="md:col-span-2 bg-gradient-to-br from-[#0A192F] to-[#1a365d] p-8 flex flex-col justify-center items-center text-center text-white">
                <div className="w-32 h-32 rounded-full bg-white/10 flex items-center justify-center mb-4 text-5xl">
                  {currentAlumni.name.charAt(0)}
                </div>
                <h3 className="text-xl font-bold mb-1">{currentAlumni.name}</h3>
                <p className="text-[#C5A022] font-medium">{currentAlumni.position}</p>
                <div className="flex items-center gap-1 text-white/70 text-sm mt-2">
                  <Building2 size={14} />
                  <span>{currentAlumni.company}</span>
                </div>
                <div className="mt-4 bg-green-500/20 text-green-400 px-4 py-2 rounded-lg">
                  <div className="text-xs">Aylıq Maaş</div>
                  <div className="text-lg font-bold">{currentAlumni.salary}</div>
                </div>
              </div>

              {/* Content Side */}
              <div className="md:col-span-3 p-8">
                <div className="flex items-start gap-3 mb-6">
                  <Quote size={32} className="text-[#C5A022] flex-shrink-0 rotate-180" />
                  <p className="text-slate-700 text-lg leading-relaxed italic">
                    {currentAlumni.quote}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-50 rounded-xl p-4">
                    <div className="text-xs text-slate-500 mb-1">Proqram</div>
                    <div className="font-semibold text-[#0A192F]">{currentAlumni.program}</div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <div className="text-xs text-slate-500 mb-1">Mezuniyyət</div>
                    <div className="font-semibold text-[#0A192F]">{currentAlumni.year}</div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {alumni.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          idx === currentIndex ? 'bg-[#C5A022] w-6' : 'bg-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={prevSlide}
                      className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {[
            { value: '500+', label: 'Məzun' },
            { value: '90%', label: 'İşə Düzəlmə' },
            { value: '50+', label: 'Tərəfdaş Şirkət' },
            { value: '1500₼', label: 'Orta Maaş' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 text-center shadow-lg border border-slate-100">
              <div className="text-3xl font-bold text-[#C5A022] mb-1">{stat.value}</div>
              <div className="text-sm text-slate-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AlumniSection;
