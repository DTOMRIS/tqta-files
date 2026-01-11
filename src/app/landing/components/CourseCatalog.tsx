'use client';

import React, { useState } from 'react';
import { Clock, Award, ChevronRight, Download, CheckCircle, GraduationCap, Briefcase, Plane } from 'lucide-react';
import { COURSES } from './landing-constants';
import Link from 'next/link';

const CourseCatalog: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('Kulinariya');
  const categories = [
    { id: 'Kulinariya', label: 'Kulinariya', icon: GraduationCap, count: COURSES.filter(c => c.category === 'Kulinariya').length },
    { id: 'Turizm', label: 'Turizm', icon: Plane, count: COURSES.filter(c => c.category === 'Turizm').length },
    { id: 'İdarəetmə', label: 'Idareetme', icon: Briefcase, count: COURSES.filter(c => c.category === 'İdarəetmə').length }
  ];

  const filteredCourses = COURSES.filter(c => c.category === activeTab);

  const getTipBadge = (tip: string, price: number) => {
    if (tip === 'CTH') return { bg: 'bg-[#0A192F]', text: 'CTH Beynelxalq', icon: '🌍' };
    if (tip === 'DMA') return { bg: 'bg-emerald-600', text: 'Pulsuz DMA', icon: '💚' };
    return { bg: 'bg-[#C5A022]', text: `${price} AZN`, icon: '⭐' };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-10">
        <span className="text-[#C5A022] font-semibold text-sm tracking-wider uppercase">Tehsil Proqramlari</span>
        <h2 className="text-3xl md:text-4xl font-bold text-[#0A192F] mt-2 mb-4">
          Pesekar Karyeraniza Baslayin
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto">
          CTH beynelxalq sertifikatli ve DMA dovlet destekli pulsuz proqramlar
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex bg-slate-100 p-1.5 rounded-2xl">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === cat.id 
                  ? 'bg-white text-[#0A192F] shadow-md' 
                  : 'text-slate-500 hover:text-[#0A192F]'
              }`}
            >
              <cat.icon size={18} />
              <span className="hidden sm:inline">{cat.label}</span>
              <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                activeTab === cat.id ? 'bg-[#C5A022] text-white' : 'bg-slate-200 text-slate-600'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const badge = getTipBadge(course.tip, course.price);
          return (
            <div key={course.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-slate-100 flex flex-col">
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600';
                  }}
                />
                {/* CTH Logo - sadece CTH kursları için */}
                {course.tip === 'CTH' && (
                  <div className="absolute bottom-3 right-3 w-12 h-12 bg-white rounded-lg p-1.5 shadow-lg">
                    <img 
                      src="/brand/CTH Approved Centre rgb.png" 
                      alt="CTH" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                {/* DMA Logo - sadece DMA kursları için */}
                {course.tip === 'DMA' && (
                  <div className="absolute bottom-3 right-3 w-12 h-12 bg-white rounded-lg p-1.5 shadow-lg">
                    <img 
                      src="/brand/dma-logo.png" 
                      alt="DMA" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                {/* Tip Badge */}
                <div className={`absolute top-3 left-3 ${badge.bg} text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1`}>
                  <span>{badge.icon}</span>
                  <span>{badge.text}</span>
                </div>
                {/* Category Badge */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[#0A192F] px-2 py-1 rounded-lg text-[10px] font-bold uppercase">
                  {course.level}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-grow flex flex-col">
                <h3 className="text-lg font-bold text-[#0A192F] mb-2 group-hover:text-[#C5A022] transition-colors line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2 flex-grow">
                  {course.description}
                </p>
                
                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-slate-400 mb-4 pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-1">
                    <Clock size={14} className="text-[#C5A022]" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Award size={14} className="text-[#0097A7]" />
                    <span>{course.certification}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link 
                    href={`/kurslar/${course.id}`}
                    className="flex-1 py-2.5 bg-[#0A192F] text-white text-sm font-bold rounded-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-1"
                  >
                    Etrafli <ChevronRight size={16} />
                  </Link>
                  {course.syllabus && (
                    <a 
                      href={course.syllabus}
                      target="_blank"
                      className="px-3 py-2.5 border border-slate-200 text-slate-500 rounded-lg hover:border-[#C5A022] hover:text-[#C5A022] transition-all flex items-center"
                      title="Syllabus Yukle"
                    >
                      <Download size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stats Bar */}
      <div className="mt-12 bg-gradient-to-r from-[#0A192F] to-[#1a365d] rounded-2xl p-6 md:p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          <div>
            <div className="text-3xl font-bold text-[#C5A022]">{COURSES.length}+</div>
            <div className="text-sm text-slate-300">Proqram</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-emerald-400">{COURSES.filter(c => c.tip === 'DMA').length}</div>
            <div className="text-sm text-slate-300">Pulsuz DMA</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#C5A022]">{COURSES.filter(c => c.tip === 'CTH').length}</div>
            <div className="text-sm text-slate-300">CTH Beynelxalq</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white">90%</div>
            <div className="text-sm text-slate-300">Ise Duzelme</div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8 text-center">
        <Link 
          href="/telebe-qeydiyyat"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#C5A022] hover:bg-[#d4b82e] text-white font-bold rounded-xl shadow-lg hover:shadow-amber-500/30 transition-all"
        >
          <CheckCircle size={20} />
          Pulsuz Qeydiyyat
        </Link>
      </div>
    </div>
  );
};

export default CourseCatalog;
