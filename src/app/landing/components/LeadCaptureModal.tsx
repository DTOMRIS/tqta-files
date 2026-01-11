import React, { useState } from 'react';
import { X, CheckCircle2, Send, GraduationCap, Gift, Globe, Bot, ChefHat, Plane, Clock } from 'lucide-react';
import { GOLD_BG } from './landing-constants';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', 
    phone: '', 
    email: '',
    field: '',      // culinary / tourism
    programType: '' // free / cth
  });

  // Sahə seçimləri
  const fields = [
    { 
      value: 'culinary', 
      label: 'Kulinariya & Aşpazlıq', 
      icon: ChefHat,
      duration: '2 ay'
    },
    { 
      value: 'tourism', 
      label: 'Turizm & Qonaqpərvərlik', 
      icon: Plane,
      duration: '1 ay'
    },
  ];

  // Proqram növləri
  const programTypes = [
    { 
      value: 'free', 
      label: 'Dövlət Dəstəkli', 
      tag: 'PULSUZ',
      desc: 'İşsizlər üçün — yerli sertifikat + iş təminatı',
      icon: Gift,
      tagColor: 'bg-green-500'
    },
    { 
      value: 'cth', 
      label: 'Beynəlxalq CTH', 
      tag: 'ÖDƏNİŞLİ',
      desc: 'İngiltərə diplomu — dünyada keçərli',
      icon: Globe,
      tagColor: 'bg-blue-500'
    },
  ];

  const selectedField = fields.find(f => f.value === formData.field);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adSoyad: formData.name,
          telefon: formData.phone,
          email: formData.email,
          ilgilenilenProgram: `${formData.field} - ${formData.programType}`,
          kaynak: 'landing-modal'
        }),
      });
      
      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          onClose();
          setFormData({ name: '', phone: '', email: '', field: '', programType: '' });
        }, 4000);
      } else {
        const error = await res.json();
        alert(error.error || 'Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.');
      }
    } catch (err) {
      console.error('Lead submission error:', err);
      alert('Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.');
    }
  };

  const scrollToBeledchi = () => {
    onClose();
    setTimeout(() => {
      const element = document.getElementById('beledchi');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-[#0A192F]/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden relative border border-white/20 max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 z-10"
        >
          <X size={20} />
        </button>

        {!submitted ? (
          <div className="p-6 sm:p-8">
            {/* Header */}
            <div className="text-center mb-5">
              <div className="w-14 h-14 bg-[#C5A022]/10 rounded-2xl flex items-center justify-center mb-3 mx-auto">
                <GraduationCap className="text-[#C5A022]" size={28} />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0A192F] mb-1">Peşəni Seç, Gələcəyini Planla</h2>
              <p className="text-slate-500 text-xs">
                Peşəkar sertifikat • İş imkanı • Beynəlxalq diplom
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Step 1: Sahə Seçimi */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">1. Sahə Seçin</label>
                <div className="grid grid-cols-2 gap-2">
                  {fields.map((f) => (
                    <label 
                      key={f.value}
                      className={`flex flex-col items-center p-3 rounded-xl border-2 cursor-pointer transition-all text-center ${
                        formData.field === f.value 
                          ? 'border-[#C5A022] bg-[#C5A022]/5' 
                          : 'border-slate-100 hover:border-slate-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="field"
                        value={f.value}
                        checked={formData.field === f.value}
                        onChange={e => setFormData({...formData, field: e.target.value})}
                        className="sr-only"
                      />
                      <f.icon size={24} className={formData.field === f.value ? 'text-[#C5A022]' : 'text-slate-400'} />
                      <div className="font-medium text-sm text-[#0A192F] mt-1">{f.label}</div>
                      <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-1">
                        <Clock size={10} />
                        <span>{f.duration}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Step 2: Proqram Növü */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">2. Proqram Növü</label>
                <div className="space-y-2">
                  {programTypes.map((p) => (
                    <label 
                      key={p.value}
                      className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.programType === p.value 
                          ? 'border-[#C5A022] bg-[#C5A022]/5' 
                          : 'border-slate-100 hover:border-slate-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="programType"
                        value={p.value}
                        checked={formData.programType === p.value}
                        onChange={e => setFormData({...formData, programType: e.target.value})}
                        className="sr-only"
                      />
                      <p.icon size={18} className={formData.programType === p.value ? 'text-[#C5A022]' : 'text-slate-400'} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm text-[#0A192F]">{p.label}</span>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded text-white font-bold ${p.tagColor}`}>{p.tag}</span>
                        </div>
                        <div className="text-[11px] text-slate-500">{p.desc}</div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        formData.programType === p.value 
                          ? 'border-[#C5A022] bg-[#C5A022]' 
                          : 'border-slate-300'
                      }`}>
                        {formData.programType === p.value && (
                          <div className="w-1.5 h-1.5 bg-white rounded-full" />
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Duration Info */}
              {selectedField && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
                  <div className="text-amber-800 text-sm font-medium">
                    📚 {selectedField.label} təhsili <span className="font-bold">{selectedField.duration}</span> davam edir
                  </div>
                </div>
              )}

              {/* Contact Info */}
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 ml-1">Ad Soyad</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-2.5 px-4 focus:border-[#C5A022] outline-none transition-all text-sm"
                    placeholder="Məs: Aysel Məmmədova"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 ml-1">Telefon</label>
                    <input 
                      required
                      type="tel" 
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-2.5 px-4 focus:border-[#C5A022] outline-none transition-all text-sm"
                      placeholder="+994 50 123 45 67"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 ml-1">E-poçt</label>
                    <input 
                      type="email" 
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-2.5 px-4 focus:border-[#C5A022] outline-none transition-all text-sm"
                      placeholder="email@mail.com"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              
              {/* Submit Button */}
              <button 
                type="submit"
                disabled={!formData.field || !formData.programType || !formData.name || !formData.phone}
                className={`w-full ${GOLD_BG} text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-amber-500/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none text-sm`}
              >
                <span>Mənimlə Əlaqə Saxlayın</span>
                <Send size={16} />
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-slate-200"></div>
                <span className="text-[10px] text-slate-400">sualınız var?</span>
                <div className="flex-1 h-px bg-slate-200"></div>
              </div>

              {/* AI Chat Button */}
              <button 
                type="button"
                onClick={scrollToBeledchi}
                className="w-full bg-gradient-to-r from-[#0A192F] to-[#1a365d] text-white font-medium py-3 rounded-xl flex items-center justify-center space-x-2 hover:opacity-90 transition-all text-sm"
              >
                <Bot size={18} />
                <span>AI Bələdçi ilə Danış</span>
                <span className="text-[9px] bg-green-500 px-1.5 py-0.5 rounded-full">7/24</span>
              </button>
            </form>

            {/* Footer Note */}
            <p className="text-[9px] text-slate-400 text-center mt-3">
              🔒 Məlumatlarınız təhlükəsizdir və yalnız sizinlə əlaqə üçün istifadə olunur
            </p>
          </div>
        ) : (
          <div className="p-10 text-center animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="text-green-500" size={40} />
            </div>
            <h2 className="text-xl font-bold text-[#0A192F] mb-2">Təşəkkür Edirik!</h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-3">
              Məlumatlarınız qeydə alındı. <br/>Tezliklə sizinlə əlaqə saxlayacağıq.
            </p>
            
            {/* AI Chat suggestion */}
            <div className="bg-slate-50 rounded-xl p-4 mt-4">
              <p className="text-xs text-slate-600 mb-2">Gözləmək istəmirsinizsə:</p>
              <button 
                onClick={scrollToBeledchi}
                className="bg-[#0A192F] text-white text-sm font-medium py-2 px-4 rounded-lg flex items-center justify-center space-x-2 mx-auto hover:opacity-90 transition-all"
              >
                <Bot size={16} />
                <span>AI Bələdçi ilə indi danış</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadCaptureModal;
