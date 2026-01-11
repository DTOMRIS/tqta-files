'use client';

import React, { useState, useMemo } from 'react';
import { Calendar, Users, Star, Heart, Clock, ChefHat, Wine, Phone, X, MapPin, Check, Baby, Coffee, UtensilsCrossed, Filter } from 'lucide-react';
import { WORKSHOPS, MASTERCLASSES } from './landing-constants';

// Ay sıralaması
const MONTHS = ['Fevral', 'Mart', 'Nisan', 'May', 'İyun'];

// Kategori tanımları
const CATEGORIES = [
  { id: 'hamisi', label: 'Hamısı', icon: Filter },
  { id: 'cocuklar', label: 'Uşaqlar', icon: Baby },
  { id: 'genc', label: 'Gənclər', icon: Users },
  { id: 'yetiskin', label: 'Yetişkin', icon: ChefHat },
  { id: 'pastacilik', label: 'Şirniyyat', icon: Star },
  { id: 'icecek', label: 'Qəhvə & Çay', icon: Coffee },
  { id: 'bolge', label: 'Bölgə Mətbəxi', icon: MapPin },
];

const WorkshopsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'workshops' | 'masterclass'>('workshops');
  const [selectedMonth, setSelectedMonth] = useState<string>('hamisi');
  const [selectedCategory, setSelectedCategory] = useState<string>('hamisi');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Filtrelenmiş workshop'lar
  const filteredWorkshops = useMemo(() => {
    return WORKSHOPS.filter(ws => {
      const monthMatch = selectedMonth === 'hamisi' || ws.month === selectedMonth;
      const categoryMatch = selectedCategory === 'hamisi' || ws.category === selectedCategory;
      return monthMatch && categoryMatch;
    });
  }, [selectedMonth, selectedCategory]);

  // Öne çıkan workshop'lar
  const featuredWorkshops = filteredWorkshops.filter(w => w.special);
  const regularWorkshops = filteredWorkshops.filter(w => !w.special);

  // Ay bazında workshop sayıları
  const monthCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    MONTHS.forEach(m => {
      counts[m] = WORKSHOPS.filter(w => w.month === m).length;
    });
    return counts;
  }, []);

  return (
    <div id="workshops" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-8">
        <span className="text-[#C5A022] font-semibold text-sm tracking-wider uppercase">Praktik Təhsil</span>
        <h2 className="text-3xl md:text-4xl font-bold text-[#0A192F] mt-2 mb-4">
          Workshop və Masterclass
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Mətbəxin sehrini kəşf et — bir günlük praktik təcrübə ilə
        </p>
        <div className="flex justify-center gap-4 mt-4 text-sm">
          <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-medium">
            {WORKSHOPS.length} Workshop
          </span>
          <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-medium">
            {MASTERCLASSES.length} Masterclass
          </span>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex bg-slate-100 p-1.5 rounded-2xl">
          <button
            onClick={() => setActiveTab('workshops')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'workshops' 
                ? 'bg-white text-[#0A192F] shadow-md' 
                : 'text-slate-500 hover:text-[#0A192F]'
            }`}
          >
            <ChefHat size={18} />
            Workshop ({WORKSHOPS.length})
          </button>
          <button
            onClick={() => setActiveTab('masterclass')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'masterclass' 
                ? 'bg-white text-[#0A192F] shadow-md' 
                : 'text-slate-500 hover:text-[#0A192F]'
            }`}
          >
            <Wine size={18} />
            Masterclass
          </button>
        </div>
      </div>

      {activeTab === 'workshops' && (
        <>
          {/* Filters */}
          <div className="bg-slate-50 rounded-2xl p-4 mb-8 sticky top-20 z-10">
            {/* Month Filter */}
            <div className="mb-4">
              <p className="text-xs font-bold text-slate-500 mb-2 uppercase">Ay seçin:</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedMonth('hamisi')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    selectedMonth === 'hamisi'
                      ? 'bg-[#0A192F] text-white'
                      : 'bg-white text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Hamısı
                </button>
                {MONTHS.map(month => (
                  <button
                    key={month}
                    onClick={() => setSelectedMonth(month)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
                      selectedMonth === month
                        ? 'bg-[#C5A022] text-white'
                        : 'bg-white text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {month}
                    <span className={`text-xs ${selectedMonth === month ? 'text-white/80' : 'text-slate-400'}`}>
                      ({monthCounts[month]})
                    </span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Category Filter */}
            <div>
              <p className="text-xs font-bold text-slate-500 mb-2 uppercase">Kateqoriya:</p>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                        selectedCategory === cat.id
                          ? 'bg-[#0097A7] text-white'
                          : 'bg-white text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <Icon size={14} />
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-slate-600">
              <span className="font-bold text-[#0A192F]">{filteredWorkshops.length}</span> workshop tapıldı
            </p>
            {(selectedMonth !== 'hamisi' || selectedCategory !== 'hamisi') && (
              <button
                onClick={() => { setSelectedMonth('hamisi'); setSelectedCategory('hamisi'); }}
                className="text-sm text-[#C5A022] hover:underline"
              >
                Filtrləri sıfırla
              </button>
            )}
          </div>

          {/* Featured Workshops */}
          {featuredWorkshops.length > 0 && (
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="text-red-500" size={20} />
                <h3 className="text-lg font-bold text-[#0A192F]">Xüsusi Təkliflər</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredWorkshops.slice(0, 3).map((ws) => (
                  <div 
                    key={ws.id} 
                    onClick={() => setSelectedItem({ ...ws, type: 'workshop' })}
                    className="relative bg-gradient-to-br from-pink-50 to-red-50 rounded-2xl overflow-hidden border-2 border-pink-200 hover:border-red-300 hover:shadow-xl transition-all group cursor-pointer"
                  >
                    {/* Image */}
                    <div className="relative h-44 overflow-hidden">
                      <img 
                        src={ws.image} 
                        alt={ws.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400';
                        }}
                      />
                      <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <Heart size={12} /> Xüsusi
                      </div>
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[#0A192F] px-2 py-1 rounded-lg text-xs font-bold">
                        {ws.day} {ws.month}
                      </div>
                    </div>

                    <div className="p-5">
                      <h4 className="text-lg font-bold text-[#0A192F] mb-2">{ws.title}</h4>
                      <p className="text-slate-600 text-sm mb-4 line-clamp-2">{ws.description}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Users size={14} />
                          <span>{ws.spots} yer</span>
                        </div>
                        <span className="text-lg font-bold text-red-500">{ws.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Regular Workshops Grid */}
          {regularWorkshops.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-[#0A192F] mb-4">Bütün Workshoplar</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {regularWorkshops.map((ws) => (
                  <div 
                    key={ws.id} 
                    onClick={() => setSelectedItem({ ...ws, type: 'workshop' })}
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-slate-100 group cursor-pointer"
                  >
                    {/* Image */}
                    <div className="relative h-32 overflow-hidden">
                      <img 
                        src={ws.image} 
                        alt={ws.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400';
                        }}
                      />
                      <div className="absolute top-2 left-2 bg-[#0097A7] text-white px-2 py-0.5 rounded text-xs font-bold">
                        {ws.day} {ws.month}
                      </div>
                      {ws.category === 'cocuklar' && (
                        <div className="absolute top-2 right-2 bg-purple-500 text-white px-2 py-0.5 rounded text-xs font-bold">
                          👶 Uşaqlar
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <h4 className="font-bold text-[#0A192F] mb-1 text-sm line-clamp-1">{ws.title}</h4>
                      <p className="text-slate-500 text-xs mb-3 line-clamp-2">{ws.description}</p>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400">{ws.age}</span>
                        <span className="text-sm font-bold text-[#C5A022]">{ws.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredWorkshops.length === 0 && (
            <div className="text-center py-12 bg-slate-50 rounded-2xl">
              <ChefHat size={48} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-lg font-bold text-slate-600 mb-2">Workshop tapılmadı</h3>
              <p className="text-slate-500 text-sm">Filtrləri dəyişdirərək yenidən cəhd edin.</p>
            </div>
          )}
        </>
      )}

      {activeTab === 'masterclass' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MASTERCLASSES.map((mc) => (
            <div 
              key={mc.id} 
              onClick={() => setSelectedItem({ ...mc, type: 'masterclass' })}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-slate-100 flex flex-col md:flex-row cursor-pointer"
            >
              {/* Image */}
              <div className="relative w-full md:w-48 h-48 md:h-auto flex-shrink-0">
                <img 
                  src={mc.image} 
                  alt={mc.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400';
                  }}
                />
                <div className="absolute top-3 left-3 bg-[#C5A022] text-white px-3 py-1 rounded-lg text-xs font-bold">
                  Masterclass
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-grow">
                <h4 className="text-lg font-bold text-[#0A192F] mb-2">{mc.title}</h4>
                <p className="text-slate-500 text-sm mb-3">{mc.description}</p>

                <div className="flex flex-wrap gap-3 mb-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <ChefHat size={14} className="text-[#C5A022]" />
                    {mc.instructor}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} className="text-[#0097A7]" />
                    {mc.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} className="text-slate-400" />
                    {mc.date}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-[#C5A022]">{mc.price}</span>
                  <span className="bg-[#0A192F] text-white px-4 py-2 rounded-lg text-sm font-bold">
                    Rezerv Et
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Korporativ CTA */}
      <div className="mt-12 bg-gradient-to-r from-[#0A192F] to-[#1a365d] p-6 md:p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-white text-center md:text-left">
          <h4 className="text-xl font-bold mb-1">Korporativ Workshop?</h4>
          <p className="text-slate-300 text-sm">Şirkətiniz üçün xüsusi team-building və ya masterclass təşkil edək.</p>
        </div>
        <a 
          href="tel:+994517696181" 
          className="bg-[#C5A022] hover:bg-[#d4b82e] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 whitespace-nowrap"
        >
          <Phone size={18} />
          +994 51 769 61 81
        </a>
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedItem(null)}>
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            {/* Image */}
            <div className="relative h-56">
              <img 
                src={selectedItem.image} 
                alt={selectedItem.title}
                className="w-full h-full object-cover"
              />
              <button 
                onClick={() => setSelectedItem(null)} 
                className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg"
              >
                <X size={20} />
              </button>
              <div className={`absolute top-4 left-4 px-3 py-1 rounded-lg text-xs font-bold text-white ${selectedItem.special ? 'bg-red-500' : selectedItem.type === 'workshop' ? 'bg-[#0097A7]' : 'bg-[#C5A022]'}`}>
                {selectedItem.special ? '❤️ Xüsusi' : selectedItem.type === 'workshop' ? 'Workshop' : 'Masterclass'}
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6">
              <h3 className="text-2xl font-bold text-[#0A192F] mb-2">{selectedItem.title}</h3>
              <p className="text-slate-600 mb-4">{selectedItem.description}</p>
              
              {/* Details */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-slate-50 p-3 rounded-xl">
                  <p className="text-xs text-slate-500 mb-1">Tarix</p>
                  <p className="font-bold text-[#0A192F]">{selectedItem.day} {selectedItem.month || selectedItem.date}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl">
                  <p className="text-xs text-slate-500 mb-1">Qiymət</p>
                  <p className="font-bold text-[#C5A022]">{selectedItem.price}</p>
                </div>
                {selectedItem.spots && (
                  <div className="bg-slate-50 p-3 rounded-xl">
                    <p className="text-xs text-slate-500 mb-1">Yerlər</p>
                    <p className="font-bold text-[#0A192F]">{selectedItem.spots} yer</p>
                  </div>
                )}
                {selectedItem.duration && (
                  <div className="bg-slate-50 p-3 rounded-xl">
                    <p className="text-xs text-slate-500 mb-1">Müddət</p>
                    <p className="font-bold text-[#0A192F]">{selectedItem.duration}</p>
                  </div>
                )}
                {selectedItem.age && (
                  <div className="bg-slate-50 p-3 rounded-xl">
                    <p className="text-xs text-slate-500 mb-1">Yaş</p>
                    <p className="font-bold text-[#0A192F]">{selectedItem.age}</p>
                  </div>
                )}
                {selectedItem.instructor && (
                  <div className="bg-slate-50 p-3 rounded-xl">
                    <p className="text-xs text-slate-500 mb-1">Təlimçi</p>
                    <p className="font-bold text-[#0A192F]">{selectedItem.instructor}</p>
                  </div>
                )}
              </div>

              {/* Özel Menü */}
              {selectedItem.menu && (
                <div className="mb-6 bg-pink-50 p-4 rounded-xl border border-pink-200">
                  <p className="font-bold text-[#0A192F] mb-3 flex items-center gap-2">
                    <Heart size={18} className="text-red-500" /> Workshop Menyusu
                  </p>
                  <div className="space-y-2">
                    {selectedItem.menu.map((item: string, i: number) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-slate-700">
                        <span className="text-red-400">•</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Öğrenilecek Teknikler */}
              {selectedItem.techniques && (
                <div className="mb-6">
                  <p className="font-bold text-[#0A192F] mb-2">Öyrədiləcək Texnikalar:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedItem.techniques.map((tech: string, i: number) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 p-2 rounded-lg">
                        <Check size={14} className="text-emerald-500" />
                        <span>{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Neler Dahil */}
              <div className="mb-6">
                <p className="font-bold text-[#0A192F] mb-2">Nələr daxildir:</p>
                <div className="space-y-2">
                  {(selectedItem.includes || ['Bütün materiallar', 'Sertifikat', 'Dequstasiya', 'Resept kitabçası']).map((item: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                      <Check size={16} className="text-emerald-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
                <MapPin size={16} />
                <span>TQTA Akademiya, Sumqayıt</span>
              </div>
              
              {/* CTA */}
              <a 
                href={`https://wa.me/994517696181?text=Salam! ${selectedItem.title} ${selectedItem.type === 'workshop' ? 'workshop-una' : 'masterclass-ına'} qeydiyyat olmaq istəyirəm.`}
                target="_blank"
                className={`block w-full text-white text-center py-4 rounded-xl font-bold transition-colors ${selectedItem.special ? 'bg-red-500 hover:bg-red-600' : 'bg-[#C5A022] hover:bg-[#b8941f]'}`}
              >
                WhatsApp ilə Qeydiyyat
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkshopsSection;
