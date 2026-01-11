import React, { useState } from 'react';
import { Building2, Users, Handshake, Send, CheckCircle, FileText, Briefcase } from 'lucide-react';

const EmployerSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'hire' | 'partner'>('hire');
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    phone: '',
    email: '',
    type: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const res = await fetch('/api/employers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          requestType: activeTab
        }),
      });
      
      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setFormData({ companyName: '', contactName: '', phone: '', email: '', type: '', message: '' });
        }, 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const partnerLogos = [
    { name: 'Hilton', logo: '/partners/hilton.svg' },
    { name: 'Marriott', logo: '/partners/marriott.svg' },
    { name: 'Fairmont', logo: '/partners/fairmont.svg' },
    { name: 'Four Seasons', logo: '/partners/fourseasons.svg' },
    { name: 'Hyatt', logo: '/partners/hyatt.svg' },
    { name: 'Sheraton', logo: '/brand/Sheraton-Logo.png' }
  ];

  return (
    <section id="employers" className="py-20 bg-[#0A192F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#C5A022]/20 text-[#C5A022] px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Handshake size={16} />
            <span>İşəgötürənlər üçün</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Sumqayıtın Gələcəyinə<br/>
            <span className="text-[#C5A022]">Bizimlə İnvestisiya Edin</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            TQTA gənc potensialı sektorun ehtiyacları ilə birləşdirir. 
            Professional məşğulluq şəbəkəmizə qoşulun.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - Info Cards */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: '90%', label: 'İşə Düzəlmə' },
                { value: '500+', label: 'Hazır Kadr' },
                { value: '50+', label: 'Tərəfdaş' },
              ].map((stat, idx) => (
                <div key={idx} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
                  <div className="text-2xl font-bold text-[#C5A022]">{stat.value}</div>
                  <div className="text-xs text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Benefits */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-4">Niyə TQTA Məzunları?</h3>
              <div className="space-y-3">
                {[
                  'Beynəlxalq CTH standartlarında təhsil almış kadrlar',
                  'Praktiki təcrübə ilə hazırlanmış peşəkarlar',
                  'Həm kulinariya həm turizm sahəsində mütəxəssislər',
                  '1-2 ay ərzində işə hazır səviyyə',
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-slate-300 text-sm">
                    <CheckCircle size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Partner Logos */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-wider">Mezunlarimiz Isleyir</h3>
              <div className="grid grid-cols-4 gap-3">
                {partnerLogos.map((partner, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-2 flex items-center justify-center h-12">
                    <img 
                      src={partner.logo} 
                      alt={partner.name}
                      className="max-h-8 max-w-full object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.innerHTML = `<span class="text-xs text-slate-600">${partner.name}</span>`;
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="bg-white rounded-2xl p-6 sm:p-8">
            {/* Tabs */}
            <div className="flex bg-slate-100 rounded-xl p-1 mb-6">
              <button
                onClick={() => setActiveTab('hire')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'hire' 
                    ? 'bg-white shadow text-[#0A192F]' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Users size={16} />
                <span>Məzun İşə Al</span>
              </button>
              <button
                onClick={() => setActiveTab('partner')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'partner' 
                    ? 'bg-white shadow text-[#0A192F]' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Handshake size={16} />
                <span>Tərəfdaşlıq</span>
              </button>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Şirkət Adı</label>
                    <input
                      required
                      type="text"
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-2.5 px-4 focus:border-[#C5A022] outline-none text-sm"
                      placeholder="Şirkət MMC"
                      value={formData.companyName}
                      onChange={e => setFormData({...formData, companyName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Əlaqədar Şəxs</label>
                    <input
                      required
                      type="text"
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-2.5 px-4 focus:border-[#C5A022] outline-none text-sm"
                      placeholder="Ad Soyad"
                      value={formData.contactName}
                      onChange={e => setFormData({...formData, contactName: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Telefon</label>
                    <input
                      required
                      type="tel"
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-2.5 px-4 focus:border-[#C5A022] outline-none text-sm"
                      placeholder="+994"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">E-poçt</label>
                    <input
                      type="email"
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-2.5 px-4 focus:border-[#C5A022] outline-none text-sm"
                      placeholder="email@company.az"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                {activeTab === 'hire' && (
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Axtardığınız Vəzifə</label>
                    <select
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-2.5 px-4 focus:border-[#C5A022] outline-none text-sm"
                      value={formData.type}
                      onChange={e => setFormData({...formData, type: e.target.value})}
                    >
                      <option value="">Seçin...</option>
                      <option value="chef">Aşpaz / Şef</option>
                      <option value="souschef">Sous Chef</option>
                      <option value="barista">Barista</option>
                      <option value="manager">Restoran Meneceri</option>
                      <option value="tourism">Turizm Mütəxəssisi</option>
                      <option value="other">Digər</option>
                    </select>
                  </div>
                )}

                {activeTab === 'partner' && (
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Tərəfdaşlıq Növü</label>
                    <select
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-2.5 px-4 focus:border-[#C5A022] outline-none text-sm"
                      value={formData.type}
                      onChange={e => setFormData({...formData, type: e.target.value})}
                    >
                      <option value="">Seçin...</option>
                      <option value="internship">Təcrübə Proqramı</option>
                      <option value="education">Təhsil Tərəfdaşlığı</option>
                      <option value="sponsorship">Sponsorluq</option>
                      <option value="corporate">Korporativ Təlim</option>
                      <option value="other">Digər</option>
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Əlavə Qeyd</label>
                  <textarea
                    rows={3}
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-2.5 px-4 focus:border-[#C5A022] outline-none text-sm resize-none"
                    placeholder="Əlavə məlumat..."
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#C5A022] text-white font-bold py-3.5 rounded-xl hover:bg-[#B38E1A] transition-all flex items-center justify-center gap-2"
                >
                  <span>{activeTab === 'hire' ? 'Kadr Sorğusu Göndər' : 'Tərəfdaşlığa Başla'}</span>
                  <Send size={16} />
                </button>
              </form>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="text-green-500" size={32} />
                </div>
                <h3 className="text-xl font-bold text-[#0A192F] mb-2">Müraciətiniz Qəbul Edildi!</h3>
                <p className="text-slate-600 text-sm">
                  Komandamız tezliklə sizinlə əlaqə saxlayacaq.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmployerSection;
