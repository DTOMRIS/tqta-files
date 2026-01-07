'use client';

import React from 'react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-[#0A192F] text-white sticky top-0 z-50 py-6">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-bold">TQTA</div>
          <button className="bg-[#C5A022] px-6 py-2 rounded-lg font-bold">
            Qeydiyyat
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative h-screen flex items-center bg-[#0A192F] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-7xl font-bold mb-6">
            Azərbaycan'dan <br />
            <span className="text-[#C5A022]">Dünyaya Açılan</span> <br />
            Ləzzət Qapısı
          </h1>
          <p className="text-xl mb-10 max-w-2xl">
            TQTA ilə qonaqpərvərlik sənətinin zirvəsinə yüksəlin.
          </p>
          <button className="bg-[#C5A022] px-10 py-5 rounded-2xl font-bold text-lg">
            Eğitimi Başla →
          </button>
        </div>
      </div>

      {/* Courses */}
      <div className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Təhsil Proqramları</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Professional Aşpazlıq', duration: '6 Ay' },
              { title: 'Şirniyyat Sənəti', duration: '4 Ay' },
              { title: 'Restoran Xidməti', duration: '3 Ay' }
            ].map((course, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold mb-4">{course.title}</h3>
                <p className="text-slate-500 mb-6">{course.duration}</p>
                <button className="w-full bg-[#0A192F] text-white py-3 rounded-lg font-bold">
                  Qeydiyyat
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0A192F] text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm">© 2024 TQTA. Bütün hüquqlar qorunur.</p>
        </div>
      </footer>
    </div>
  );
}