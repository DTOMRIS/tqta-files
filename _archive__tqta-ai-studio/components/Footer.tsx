
import React from 'react';
import { ChefHat, Facebook, Instagram, Linkedin, MapPin, Phone, Mail } from 'lucide-react';
import { NAVY_BLUE, GOLD } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className={`${NAVY_BLUE} text-white pt-20 pb-10 border-t border-slate-800`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className={`p-2 bg-slate-800 rounded-lg ${GOLD}`}>
                <ChefHat size={24} />
              </div>
              <span className="text-xl font-bold tracking-tight">TQTA</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Azərbaycanın kulinariya gələcəyini bizimlə kəşf edin. Peşəkar təhsil və beynəlxalq karyera imkanları.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:text-[#C5A022] transition-colors"><Instagram size={18} /></a>
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:text-[#C5A022] transition-colors"><Facebook size={18} /></a>
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:text-[#C5A022] transition-colors"><Linkedin size={18} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Proqramlar</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Professional Cookery</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Barista & Miksologiya</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Restaurant Management</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pastry Art</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Faydalı Linklər</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Haqqımızda</a></li>
              <li><a href="#" className="hover:text-white transition-colors">İnvestisiya Klubu</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Karyera Portalı</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tələbə Portalı</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Əlaqə</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="flex items-start">
                <MapPin size={18} className={`mr-3 ${GOLD} shrink-0`} />
                <span>Baku, Azerbaijan <br /> 28 May Street, Landmark III</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className={`mr-3 ${GOLD} shrink-0`} />
                <span>+994 50 123 45 67</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className={`mr-3 ${GOLD} shrink-0`} />
                <span>info@tqta.az</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-slate-500 text-[10px] uppercase tracking-widest">
          <p>© 2024 Turan Gastro Turizm Akademiyası. Bütün hüquqlar qorunur.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Məxfilik Siyasəti</a>
            <a href="#" className="hover:text-white">İstifadə Şərtləri</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
