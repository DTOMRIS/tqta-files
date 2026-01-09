'use client';

import React from 'react';
import { ArrowRight, Play, Award, Globe, Users } from 'lucide-react';

export default function Hero({ onStart, onInvest }: any) {
  return (
    <div id="home" className="relative min-h-screen flex items-center overflow-hidden bg-[#0A192F]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80"
          className="w-full h-full object-cover opacity-30"
          alt="Professional Culinary Background"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A192F] via-[#0A192F]/90 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 py-32">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#C5A022] text-sm font-bold mb-8 uppercase tracking-wide">
            <Award className="w-4 h-4" />
            <span>UK akkreditasiyalı akademiya</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight">
            Azərbaycandan <br />
            <span className="text-[#C5A022] italic">Dünyaya açılan</span> <br />
            <span className="font-[var(--font-playfair)] italic font-normal">Ləzzət qapısı</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-2xl leading-relaxed">
            CTH tərəfindən akkreditə olunmuş proqramlarla beynəlxalq karyeranızı qurun.
            Qonaqpərvərlik sənətində peşəkar səviyyəyə yüksəlin.
          </p>

          {/* CTA Buttons */}
          {/* CTA Buttons */}
<div className="flex flex-col sm:flex-row gap-4 mb-16">
  <button
    onClick={onStart}
    className="group px-10 py-5 bg-gradient-to-r from-[#C5A022] via-[#D4AF37] to-[#C5A022] bg-size-200 bg-pos-0 hover:bg-pos-100 text-white font-bold rounded-2xl shadow-2xl hover:shadow-amber-500/50 transition-all duration-500 transform hover:-translate-y-1 flex items-center justify-center gap-3"
  >
    <span className="text-lg">Təhsilə başla</span>
    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
  </button>

  <button
    onClick={() => {
      document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' });
    }}
    className="px-10 py-5 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/20 hover:border-white/50 transition-all flex items-center justify-center gap-3"
  >
    <span className="text-lg">Proqramlara bax</span>
  </button>
</div>


          {/* Trust Bar */}
          <div className="flex flex-col gap-6">
            <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">
              Beynəlxalq tərəfdaşlar
            </p>

            <div className="flex flex-wrap items-center gap-8 md:gap-12">
              {/* CTH */}
              <div className="group relative">
                <img
                  src="/logos/cth.png"
                  alt="CTH Awards UK"
                  className="h-12 md:h-16 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 hover:scale-110"
                  onError={(e: any) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden items-center gap-2 text-white/80 text-sm font-bold">
                  <Award className="w-5 h-5 text-[#C5A022]" />
                  <span>CTH Awards</span>
                </div>
              </div>

              {/* DMA */}
              <div className="group relative">
                <img
                  src="/logos/dma.png"
                  alt="DMA"
                  className="h-12 md:h-16 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 hover:scale-110"
                  onError={(e: any) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden items-center gap-2 text-white/80 text-sm font-bold">
                  <Globe className="w-5 h-5 text-[#C5A022]" />
                  <span>DMA</span>
                </div>
              </div>

              {/* TİKA */}
              <div className="group relative">
                <img
                  src="/logos/tika.png"
                  alt="TİKA"
                  className="h-12 md:h-16 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 hover:scale-110"
                  onError={(e: any) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden items-center gap-2 text-white/80 text-sm font-bold">
                  <Users className="w-5 h-5 text-[#C5A022]" />
                  <span>TİKA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:block">
        <div className="flex flex-col items-center gap-2 text-white/60 animate-bounce">
          <span className="text-xs font-medium uppercase tracking-wider">Aşağı keçin</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      <style jsx>{`
        .bg-size-200 { background-size: 200% 200%; }
        .bg-pos-0 { background-position: 0% 50%; }
        .hover\\:bg-pos-100:hover { background-position: 100% 50%; }
      `}</style>
    </div>
  );
}
