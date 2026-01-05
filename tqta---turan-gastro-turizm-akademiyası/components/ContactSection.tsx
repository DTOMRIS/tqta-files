
import React from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { GOLD_BG, NAVY_BLUE } from '../constants';

const ContactSection: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-[#0A192F] mb-4">Bizimlə Əlaqə</h2>
        <div className="w-24 h-1 bg-[#C5A022] mx-auto mb-6"></div>
        <p className="text-slate-500 max-w-xl mx-auto">Bizimlə əlaqə saxlayın və ya akademiyamızı ziyarət edin.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className={`${NAVY_BLUE} p-10 rounded-3xl text-white lg:col-span-1`}>
          <h3 className="text-2xl font-bold mb-8">Əlaqə Məlumatları</h3>
          <div className="space-y-8">
            <div className="flex items-start">
              <MapPin className="text-[#C5A022] mr-4 shrink-0" size={24} />
              <div>
                <p className="font-bold">Ünvan</p>
                <p className="text-slate-400 text-sm">Baku, Azerbaijan, 28 May Street, Landmark III</p>
              </div>
            </div>
            <div className="flex items-start">
              <Phone className="text-[#C5A022] mr-4 shrink-0" size={24} />
              <div>
                <p className="font-bold">Telefon</p>
                <p className="text-slate-400 text-sm">+994 50 123 45 67</p>
              </div>
            </div>
            <div className="flex items-start">
              <Mail className="text-[#C5A022] mr-4 shrink-0" size={24} />
              <div>
                <p className="font-bold">E-poçt</p>
                <p className="text-slate-400 text-sm">info@tqta.az</p>
              </div>
            </div>
          </div>

          <div className="mt-12 h-48 bg-slate-800 rounded-2xl overflow-hidden grayscale opacity-50 relative">
            <div className="absolute inset-0 flex items-center justify-center">
               <MapPin className="text-white opacity-20" size={48} />
               <span className="text-[10px] uppercase tracking-widest font-bold">Xəritə Tezliklə</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 lg:col-span-2">
          <h3 className="text-2xl font-bold text-[#0A192F] mb-8">Sualınız var?</h3>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Adınız</label>
              <input type="text" className="w-full bg-slate-50 border-none rounded-xl py-4 px-4 focus:ring-2 focus:ring-[#C5A022] outline-none transition-all" placeholder="Adınız" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Soyadınız</label>
              <input type="text" className="w-full bg-slate-50 border-none rounded-xl py-4 px-4 focus:ring-2 focus:ring-[#C5A022] outline-none transition-all" placeholder="Soyadınız" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">E-poçt</label>
              <input type="email" className="w-full bg-slate-50 border-none rounded-xl py-4 px-4 focus:ring-2 focus:ring-[#C5A022] outline-none transition-all" placeholder="email@example.com" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Mesajınız</label>
              <textarea rows={5} className="w-full bg-slate-50 border-none rounded-xl py-4 px-4 focus:ring-2 focus:ring-[#C5A022] outline-none transition-all" placeholder="Necə kömək edə bilərik?"></textarea>
            </div>
            <div className="md:col-span-2">
              <button type="submit" className={`w-full ${GOLD_BG} text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all flex items-center justify-center transform hover:-translate-y-0.5 active:translate-y-0`}>
                Göndər <Send size={18} className="ml-2" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
