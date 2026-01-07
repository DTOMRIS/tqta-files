'use client';

import React from 'react';
import { ChefHat } from 'lucide-react';

interface NavbarProps {
  onNavigate: (section: string) => void;
  activeSection: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeSection }) => {
  const scrollTo = (id: string) => {
    onNavigate(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="bg-[#0A192F] text-white sticky top-0 z-50 border-b border-slate-800 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <div className="flex items-center space-x-4 cursor-pointer" onClick={() => scrollTo('top')}>
            <div className="grid grid-cols-2 gap-0.5 w-12 h-12">
              <div className="bg-[#0A192F] border border-white/20 flex items-center justify-center font-bold text-lg">T</div>
              <div className="bg-[#0097A7] border border-white/20 flex items-center justify-center font-bold text-lg">Q</div>
              <div className="bg-[#0097A7] border border-white/20 flex items-center justify-center font-bold text-lg">T</div>
              <div className="bg-[#0A192F] border border-white/20 flex items-center justify-center font-bold text-lg">A</div>
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-bold tracking-tight block leading-tight">TURAN Qastro Turizm Akademiyası</span>
              <span className="text-[10px] uppercase tracking-widest text-[#C5A022] font-medium">Dəyərləri Yaşat, Ustalıqla Paylaş</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-6 text-xs font-bold uppercase tracking-widest">
            <button onClick={() => scrollTo('about')} className="hover:text-[#C5A022] transition-colors">Haqqımızda</button>
            <button onClick={() => scrollTo('courses')} className="hover:text-[#C5A022] transition-colors">Proqramlar</button>
            <button onClick={() => scrollTo('contact')} className="hover:text-[#C5A022] transition-colors">Əlaqə</button>
          </div>

          {/* CTA Button */}
          <div className="flex items-center space-x-3">
            <a href="tel:+994517696181" className="hidden xl:block text-sm font-bold text-[#C5A022]">+994 51 769 61 81</a>
            <button className="bg-[#C5A022] text-white px-6 py-2.5 rounded-lg text-xs font-bold transition-all hover:bg-[#B38E1A] shadow-lg">
              Qeydiyyatdan Keç
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;