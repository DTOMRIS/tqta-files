'use client';

import React from 'react';
import { Instagram, Facebook, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

// TikTok icon component
const TikTok = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0A192F] text-white relative overflow-hidden">
      {/* Decorative stars */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-[10%] text-2xl">✦</div>
        <div className="absolute top-20 right-[15%] text-xl">✦</div>
        <div className="absolute bottom-32 left-[25%] text-lg">✦</div>
        <div className="absolute top-40 right-[35%] text-xl">✦</div>
        <div className="absolute bottom-20 right-[10%] text-2xl">✦</div>
        <div className="absolute top-32 left-[50%] text-lg">✦</div>
        <div className="absolute bottom-40 left-[60%] text-xl">✦</div>
        <div className="absolute top-16 left-[75%] text-lg">✦</div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* TQTA Branding */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/brand/tqta-logo.jpeg" alt="TQTA" className="w-12 h-12 rounded-lg object-cover shadow-lg" />
              <div>
                <div className="font-bold text-xl">
                  <span className="text-[#C5A022]">TQTA</span>
                </div>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Azərbaycanın kulinariya gələcəyini bizimlə kəşf edin. Beynəlxalq CTH sertifikatlı peşəkar təhsil və karyera imkanları.
            </p>
          </div>

          {/* Sürətli Keçidlər */}
          <div>
            <h4 className="text-[#C5A022] font-bold mb-6 text-sm">Sürətli Keçidlər</h4>
            <ul className="space-y-3 text-slate-300 text-sm">
              <li>
                <a href="#about" className="hover:text-[#C5A022] transition-colors">Haqqımızda</a>
              </li>
              <li>
                <a href="#courses" className="hover:text-[#C5A022] transition-colors">Təhsil Proqramları</a>
              </li>
              <li>
                <a href="#workshops" className="hover:text-[#C5A022] transition-colors">Workshoplar</a>
              </li>
              <li>
                <Link href="/portal/student" className="hover:text-[#C5A022] transition-colors">Tələbə Portalı</Link>
              </li>
            </ul>
          </div>

          {/* Əlaqə */}
          <div>
            <h4 className="text-[#C5A022] font-bold mb-6 text-sm">Əlaqə</h4>
            <div className="space-y-3 text-slate-300 text-sm">
              <div className="flex items-start gap-3">
                <Mail size={16} className="text-[#C5A022] mt-0.5 flex-shrink-0" />
                <a href="mailto:info@tqta.az" className="hover:text-[#C5A022] transition-colors">
                  info@tqta.az
                </a>
              </div>
            </div>

            {/* Social Media */}
            <h5 className="text-white font-semibold mt-6 mb-3 text-sm">Bizi İzləyin</h5>
            <div className="flex gap-3">
              <a 
                href="https://www.instagram.com/tqta.az/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-[#C5A022] rounded-lg flex items-center justify-center transition-all hover:scale-110"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://www.facebook.com/p/Turan-Qastro-Turizm-Akademiyas%C4%B1-61572037133543/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-[#C5A022] rounded-lg flex items-center justify-center transition-all hover:scale-110"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://www.linkedin.com/company/106026029/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-[#C5A022] rounded-lg flex items-center justify-center transition-all hover:scale-110"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="https://www.tiktok.com/@turan.qastro.turi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-[#C5A022] rounded-lg flex items-center justify-center transition-all hover:scale-110"
              >
                <TikTok size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-slate-400 text-sm">
            <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-1">
              <a href="#about" className="hover:text-[#C5A022] transition-colors">Haqqımızda</a>
              <span className="text-slate-600">✦</span>
              <a href="#contact" className="hover:text-[#C5A022] transition-colors">Əlaqə</a>
              <span className="text-slate-600">|</span>
              <Link href="/mexfilik" className="hover:text-[#C5A022] transition-colors">Məxfilik</Link>
              <span className="text-slate-600">|</span>
              <Link href="/istifade-sertleri" className="hover:text-[#C5A022] transition-colors">İstifadə Şərtləri</Link>
              <span className="text-slate-600">|</span>
              <Link href="/cerez-siyaseti" className="hover:text-[#C5A022] transition-colors">Çərəz Siyasəti</Link>
            </div>
          </div>
          <div className="text-center text-slate-500 text-xs mt-4">
            © 2026 TQTA — Turan Qastro Turizm Akademiyası. Bütün hüquqlar qorunur.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
