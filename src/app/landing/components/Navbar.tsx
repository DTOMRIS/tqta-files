import React, { useState, useEffect } from 'react';
import { Menu, X, ChefHat, ArrowRight } from 'lucide-react';

// GÖMÜLÜ VERİ - ARTIK HATA YAPAMAZ
const NAV_LINKS = [
  { label: "Ana Səhifə", href: "#home" },
  { label: "Haqqımızda", href: "#about" },
  { label: "Proqramlar", href: "#courses" },
  { label: "İnvestisiya", href: "#investment" },
  { label: "Əlaqə", href: "#contact" },
];

const Navbar = ({ onNavigate, activeSection }: any) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tighter text-[#0A192F]">
          <div className="bg-[#0A192F] p-2 rounded-xl text-white">
            <ChefHat size={24} />
          </div>
          TQTA
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link, index) => (
            <a 
              key={index}
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-[#C5A022] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button className="bg-[#C5A022] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:shadow-lg hover:bg-[#b89520] transition-all flex items-center gap-2">
            Başvuru Yap <ArrowRight size={16} />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-[#0A192F]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-t border-slate-100 p-6 shadow-xl md:hidden flex flex-col gap-4">
          {NAV_LINKS.map((link, index) => (
            <a 
              key={index} 
              href={link.href}
              className="text-lg font-medium text-slate-800 py-2 border-b border-slate-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;