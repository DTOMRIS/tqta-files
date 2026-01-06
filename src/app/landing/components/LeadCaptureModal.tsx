
import React, { useState } from 'react';
import { X, CheckCircle2, Send, ChefHat } from 'lucide-react';
import { GOLD_BG, NAVY_BLUE } from '../constants';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    console.log('Lead Captured:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-[#0A192F]/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden relative border border-white/20">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
        >
          <X size={24} />
        </button>

        {!submitted ? (
          <div className="p-10">
            <div className="w-16 h-16 bg-[#C5A022]/10 rounded-2xl flex items-center justify-center mb-6">
              <ChefHat className="text-[#C5A022]" size={32} />
            </div>
            <h2 className="text-3xl font-bold text-[#0A192F] mb-4">Gələcəyin Şefi Olmağa Hazırsınız?</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Məlumatlarınızı buraxın, mütəxəssisimiz sizə zəng edib ən uyğun proqramı seçməyə kömək etsin.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 ml-1">Ad Soyad</label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 px-6 focus:border-[#C5A022] outline-none transition-all"
                  placeholder="Məs: Aysel Məmmədova"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 ml-1">E-poçt</label>
                  <input 
                    required
                    type="email" 
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 px-6 focus:border-[#C5A022] outline-none transition-all"
                    placeholder="email@tqta.az"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 ml-1">Telefon</label>
                  <input 
                    required
                    type="tel" 
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 px-6 focus:border-[#C5A022] outline-none transition-all"
                    placeholder="+994"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>
              <button 
                type="submit"
                className={`w-full ${GOLD_BG} text-white font-bold py-5 rounded-2xl shadow-xl hover:shadow-amber-500/30 transition-all transform hover:-translate-y-1 flex items-center justify-center space-x-2`}
              >
                <span>Mənimlə Əlaqə Saxlayın</span>
                <Send size={18} />
              </button>
            </form>
          </div>
        ) : (
          <div className="p-16 text-center animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="text-green-500" size={48} />
            </div>
            <h2 className="text-3xl font-bold text-[#0A192F] mb-4">Təşəkkür Edirik!</h2>
            <p className="text-slate-500 leading-relaxed">
              Məlumatlarınız uğurla qeydə alındı. Tezliklə sizinlə əlaqə saxlayacağıq.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadCaptureModal;
