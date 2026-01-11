'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Ana Səhifə', id: 'home' },
  { label: 'Haqqımızda', id: 'about' },
  { label: 'Proqramlar', id: 'courses' },
  { label: 'Workshoplar', id: 'workshops' },
  { label: 'Korporativ', id: 'corporate' },
  { label: 'Əlaqə', id: 'contact' },
];

export default function Navbar({ onNavigate, activeSection }: any) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (id: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const href = `#${id}`;
    if (!href.startsWith('#')) {
      window.location.href = href;
      return;
    }
    onNavigate?.(id);

    // əvvəlcə birbaşa href ilə axtarırıq (#workshops), tapmasa id ilə (#workshops yenə eyni)
    const el = document.querySelector(href) || document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo (square mark + word) */}
        <button
          onClick={() => handleNav('home')}
          className="flex items-center gap-3 text-left"
          aria-label="TQTA Ana Səhifə"
        >
          <img
            src="/brand/tqta-logo.jpeg"
            alt="TQTA"
            className="w-11 h-11 rounded-lg object-cover"
          />
          <div className="flex flex-col leading-tight">
            <span className={`text-base sm:text-lg font-bold ${isScrolled ? 'text-[#0A192F]' : 'text-white'}`}>
              TURAN Qastro Turizm Akademiyası
            </span>
            <span className={`text-[10px] sm:text-xs font-medium tracking-wide ${
              isScrolled ? 'text-slate-500' : 'text-white/70'
            }`}>
              Dəyərləri Yaşat, Ustalıqla Paylaş
            </span>
          </div>
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={(e) => handleNav(link.id, e)}
              className={`text-sm font-semibold transition-colors hover:text-[#C5A022] ${
                isScrolled ? 'text-slate-700' : 'text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right Side - CTA only (telefon YOX) */}
        <div className="hidden lg:flex items-center">
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-[#C5A022] text-white px-6 py-2.5 rounded-lg text-xs font-bold transition-all hover:bg-[#B38E1A] shadow-lg"
          >
            Qeydiyyatdan Keç
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`lg:hidden p-2 rounded-lg transition-colors ${
            isScrolled ? 'text-[#0A192F] hover:bg-slate-100' : 'text-white hover:bg-white/10'
          }`}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t shadow-xl">
          <div className="px-6 py-6 space-y-2">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={(e) => handleNav(link.id, e)}
                className="w-full text-left block text-lg font-semibold text-slate-800 py-3 border-b border-slate-100 hover:text-[#C5A022] transition-colors"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-4">
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full bg-[#C5A022] text-white py-3 rounded-lg font-bold text-xs hover:bg-[#B38E1A] shadow-lg transition-all"
              >
                Qeydiyyatdan Keç
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
