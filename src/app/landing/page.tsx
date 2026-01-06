'use client';

import React from 'react';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A192F] text-white font-sans">
      <div className="text-center p-8 max-w-2xl">
        <h1 className="text-5xl font-bold mb-6 text-[#C5A022]">TQTA Akademi</h1>
        <p className="text-xl mb-8 text-slate-300">
          Sistem hazırlanıyor. Lütfen bekleyiniz...
        </p>
        <div className="inline-block px-6 py-3 border border-[#C5A022] rounded-full text-[#C5A022] animate-pulse">
          Site Yükleniyor...
        </div>
      </div>
    </div>
  );
}