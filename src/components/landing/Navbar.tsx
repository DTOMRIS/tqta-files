'use client';

import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Ana Səhifə', id: 'home' },
  { label: 'Haqqımızda', id: 'about' },
  { label: 'Ankət', id: 'assessment' },
  { label: 'Workshoplar', id: 'workshops' },
  { label: 'Proqramlar', id: 'courses' },
  // “İnvestisiya” yerinə daha uyğun:
  { label: 'Tərəfdaşlıq', id: 'investment' },
  { label: 'Əlaqə', id: 'contact' },
];

type Section = string;

export default function Navbar({
  onNavigate,
  activeSection,
}: {
  onNavigate?: (section: Section) => void;
  activeSection?: Section;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Fixed navbar hündürlüyü (səndə h=24 idi → ~96px)
  const NAV_OFFSET = 96;

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    onNavigate?.(id);

    const y = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top: y, behavior: 'smooth' });

    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-[#0A192F] text-white sticky top-0 z-50 border-b border-slate-800 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* LOGO */}
          <button
            className="flex items-center gap-4 text-left"
            onClick={() => scrollToId('home')}
          >
            {/* Sənin public-ə qoyduğun fayl */}
            <img
              src="/tqta-mark.jpeg"
              alt="TQTA"
              className="w-11 h-11 rounded-md object-cover"
            />
            <div className="hidden sm:block">
              <div className="text-lg font-bold leading-tight">
                TURAN Qastro Turizm Akademiyası
              </div>
              <div className="text-[10px] uppercase tracking-widest text-[#C5A022] font-medium">
                Dəyərləri Yaşat, Ustalıqla Paylaş
              </div>
            </div>
          </button>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-6 text-xs font-bold uppercase tracking-widest">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollToId(l.id)}
                className={`hover:text-[#C5A022] transition-colors ${
                  activeSection === l.id ? 'text-[#C5A022]' : ''
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* RIGHT CTA */}
          <div className="flex items-center gap-3">
            {/* Telefonu üst barda saxlamamağı tövsiyə edirəm.
               Kontakt bölməsində + footer-da qalsın → daha premium görünür. */}
            <button className="bg-[#C5A022] text-white px-6 py-2.5 rounded-lg text-xs font-bold transition-all hover:bg-[#B38E1A] shadow-lg">
              Qeydiyyatdan Keç
            </button>

            {/* MOBILE MENU BTN */}
            <button
              onClick={() => setIsMobileMenuOpen((s) => !s)}
              className="lg:hidden p-2 rounded-md hover:bg-white/10"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-[#0A192F]">
          <div className="px-6 py-6 space-y-3">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollToId(l.id)}
                className="block w-full text-left py-3 border-b border-white/10 hover:text-[#C5A022]"
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
