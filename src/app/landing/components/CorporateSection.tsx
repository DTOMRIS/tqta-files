'use client';

import React, { useState } from 'react';
import { 
  Users, ChefHat, Coffee, Utensils, Gift, Trophy, Star, Calendar,
  Phone, Mail, MapPin, X, Check, Building2, Sparkles, PartyPopper,
  Presentation, GraduationCap, Heart, Cake, Award, Globe, Pizza,
  ArrowRight, Clock, UserCheck
} from 'lucide-react';

// Korporativ paketler
const CORPORATE_PACKAGES = [
  {
    id: 'team-building',
    title: 'Mətbəxdə Komanda Quruculuğu',
    subtitle: 'Komandanızın ruhunu mətbəxdə kəşf edin',
    icon: Users,
    color: '#0097A7',
    description: 'Professional şeflərimizin rəhbərliyi altında komanda ruhunu əyləncəli mühitdə yaşayın!',
    features: [
      'Dünya mətbəxi səyahəti',
      'Pizza və pide ustası',
      'Qəhvə sənəti və latte art',
      'Əyləncəli kulinariya yarışları'
    ],
    benefits: [
      'Komanda ünsiyyətinin güclənməsi',
      'Əməkdaşlıq bacarıqlarının inkişafı',
      'Stress idarəetməsi',
      'Yaradıcılığın inkişafı'
    ],
    includes: [
      'Professional şeflərin rəhbərliyi',
      'Bütün məhsul və ləvazimatlar',
      'Önlük və mətbəx aksesuarları',
      'Dequstasiya',
      'Xatirə şəkilləri',
      'Sertifikatlar'
    ],
    capacity: '10-20 nəfər',
    duration: '2-4 saat',
    price: 'Sorğu ilə'
  },
  {
    id: 'workshops',
    title: 'İlhamverici Workshop\'lar',
    subtitle: 'Hər resept yeni bir kəşf, hər təcrübə yeni bir hekayədir',
    icon: ChefHat,
    color: '#C5A022',
    description: 'Şirkətinizin xüsusi günü və ya fərqli bir komanda təcrübəsi yaşamaq istəyirsiniz?',
    features: [
      'Pizza & Pide Workshop',
      'Barista Təcrübəsi',
      'Döner & Fast Food Masterclass',
      'Azərbaycan Mətbəxi'
    ],
    benefits: [
      'Professional sobada praktik təcrübə',
      'Latte art və espresso sirləri',
      'Street food texnikaları',
      'Milli mətbəx ənənələri'
    ],
    includes: [
      'Professional avadanlıqlar',
      'Bütün xammal',
      'Şef rəhbərliyi',
      'Resept kitabçası',
      'Sertifikat'
    ],
    capacity: '8-15 nəfər',
    duration: '2-3 saat',
    price: '35-50 AZN/nəfər'
  },
  {
    id: 'product-launch',
    title: 'Məhsul Təqdimatları',
    subtitle: 'Brendinizin hekayəsini ən təsirli şəkildə anladın',
    icon: Presentation,
    color: '#e11d48',
    description: 'Yeni məhsulunuzu canlı və interaktiv bir mətbəx təcrübəsi ilə təqdim edin.',
    features: [
      'Demo mətbəx imkanları',
      'Canlı kulinariya nümayişləri',
      'İnteraktiv dequstasiyalar',
      'Məhsul test sessiyaları'
    ],
    benefits: [
      'Professional təqdimat mühiti',
      'Qrup müzakirələri üçün rahat məkan',
      'Brendinizin dadını çatdırma',
      'Unudulmaz təcrübə'
    ],
    includes: [
      'Demo mətbəx istifadəsi',
      'Professional avadanlıqlar',
      'Dequstasiya zalı (10 nəfər)',
      'Texniki dəstək',
      'Fotosessiya imkanı'
    ],
    capacity: '10-30 nəfər',
    duration: '2-4 saat',
    price: 'Sorğu ilə'
  },
  {
    id: 'special-events',
    title: 'Xüsusi Tədbirlər',
    subtitle: 'Hər tədbir özünəməxsus bir əsər olmalıdır',
    icon: PartyPopper,
    color: '#8b5cf6',
    description: 'Xüsusi günlərinizi professional komandamızla unutulmaz xatirələrə çevirin!',
    features: [
      'Ad günü tədbirləri',
      'Yubiley mərasimləri',
      'Korporativ bayramlar',
      'Əyləncəli mətbəx yarışları'
    ],
    benefits: [
      'Tort bəzəmə master-klassı',
      'Kulinariya yarışmaları',
      'İnteraktiv yemək şousu',
      'Dünya mətbəxi səyahəti'
    ],
    includes: [
      '10-80 nəfərlik məkan',
      'Xüsusi menyu tərtibatı',
      'Professional təşkilatçılıq',
      'Dekorasiya',
      'Musiqi sistemi'
    ],
    capacity: '10-80 nəfər',
    duration: '3-5 saat',
    price: 'Büdcəyə uyğun paketlər'
  }
];

// Tədbir formatları
const EVENT_FORMATS = [
  {
    title: 'Culinary Team Building',
    description: 'Komandanızla birlikdə dünya mətbəxinin sirlərinə səyahət edin.',
    icon: Users
  },
  {
    title: 'Workshop + Toplantı',
    description: 'İş görüşünüzü praktiki master-klassla birləşdirin.',
    icon: GraduationCap
  },
  {
    title: 'Dequstasiya Tədbirləri',
    description: 'Məhsullarınızı professional mühitdə təqdim edin.',
    icon: Utensils
  },
  {
    title: 'Əyləncəli Yarışmalar',
    description: 'Komandaları kiçik qruplara bölərək kulinariya yarışı təşkil edin.',
    icon: Trophy
  }
];

// Məkan imkanları
const VENUE_FEATURES = [
  { title: 'Tədris Mətbəxi', capacity: '10-20 nəfər', icon: ChefHat },
  { title: 'Bar Sahəsi', capacity: '4-8 nəfər', icon: Coffee },
  { title: 'Demo Mətbəx', capacity: '10 nəfər', icon: Presentation },
  { title: 'Toplantı Zalı', capacity: '10-80 nəfər', icon: Building2 },
];

export default function CorporateSection() {
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [showContactModal, setShowContactModal] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-[#C5A022] font-semibold text-sm tracking-wider uppercase">Korporativ Həllər</span>
        <h2 className="text-3xl md:text-4xl font-bold text-[#0A192F] mt-2 mb-4">
          Şirkətinizin İnkişafı Üçün Fərqli Yanaşma
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-[#C5A022] to-[#0097A7] mx-auto mb-4"></div>
        <p className="text-slate-600 max-w-3xl mx-auto">
          TQTA-da hər bir korporativ tədbir sadəcə bir görüş deyil, unudulmaz bir təcrübədir. 
          Müasir mətbəximiz və peşəkar komandamızla şirkətinizin hədəflərinə çatmasında sizə dəstək oluruq.
        </p>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#0A192F] to-[#1a365d] rounded-3xl p-8 md:p-12 mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A022]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#0097A7]/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Komandanızı İlhamlandıran Təcrübələr
            </h3>
            <p className="text-slate-300 mb-6">
              Biz ənənəvi korporativ tədbirləri əyləncəli və öyrədici kulinariya səyahətinə çevirir, 
              komanda ruhunu mətbəx fəlsəfəsi ilə birləşdiririk.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="bg-white/10 text-white px-4 py-2 rounded-full text-sm flex items-center gap-2">
                <Users size={16} /> 10-80 nəfərlik qruplar
              </span>
              <span className="bg-white/10 text-white px-4 py-2 rounded-full text-sm flex items-center gap-2">
                <Clock size={16} /> 2-5 saat proqramlar
              </span>
              <span className="bg-white/10 text-white px-4 py-2 rounded-full text-sm flex items-center gap-2">
                <ChefHat size={16} /> Professional şeflər
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {VENUE_FEATURES.map((venue, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <venue.icon className="w-8 h-8 text-[#C5A022] mx-auto mb-2" />
                <h4 className="text-white font-semibold text-sm">{venue.title}</h4>
                <p className="text-slate-400 text-xs">{venue.capacity}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Korporativ Paketler */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-[#0A192F] text-center mb-8">Korporativ Paketlərimiz</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {CORPORATE_PACKAGES.map((pkg) => (
            <div 
              key={pkg.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-[#0097A7] hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
              onClick={() => setSelectedPackage(pkg)}
            >
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${pkg.color}15` }}
                  >
                    <pkg.icon className="w-7 h-7" style={{ color: pkg.color }} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-[#0A192F] group-hover:text-[#0097A7] transition-colors">
                      {pkg.title}
                    </h4>
                    <p className="text-sm text-slate-500">{pkg.subtitle}</p>
                  </div>
                </div>
                
                <p className="text-slate-600 text-sm mb-4">{pkg.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {pkg.features.slice(0, 3).map((feature, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs">
                      {feature}
                    </span>
                  ))}
                  {pkg.features.length > 3 && (
                    <span className="bg-[#0097A7]/10 text-[#0097A7] px-3 py-1 rounded-full text-xs">
                      +{pkg.features.length - 3} daha
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Users size={14} /> {pkg.capacity}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} /> {pkg.duration}
                    </span>
                  </div>
                  <button className="text-[#0097A7] font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    Ətraflı <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tədbir Formatları */}
      <div className="bg-slate-50 rounded-3xl p-8 mb-12">
        <h3 className="text-2xl font-bold text-[#0A192F] text-center mb-8">İnnovativ Tədbir Formatları</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {EVENT_FORMATS.map((format, idx) => (
            <div key={idx} className="bg-white rounded-xl p-5 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#0097A7]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <format.icon className="w-6 h-6 text-[#0097A7]" />
              </div>
              <h4 className="font-bold text-[#0A192F] mb-2">{format.title}</h4>
              <p className="text-slate-500 text-sm">{format.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Xüsusi Tədbirlər Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-3xl p-8 mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="relative z-10 text-center">
          <PartyPopper className="w-12 h-12 text-white mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">Xüsusi Günləriniz Üçün</h3>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            Ad günü, yubiley, korporativ bayram — hər bir xüsusi günü TQTA fərqi ilə qeyd edin!
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm flex items-center gap-2">
              <Cake size={16} /> Ad günü partisi
            </span>
            <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm flex items-center gap-2">
              <Trophy size={16} /> Yubiley ziyafəti
            </span>
            <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm flex items-center gap-2">
              <Star size={16} /> Korporativ bayram
            </span>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#0A192F] rounded-3xl p-8 text-center">
        <h3 className="text-2xl font-bold text-white mb-4">Tədbirinizi Planlaşdıraq</h3>
        <p className="text-slate-400 mb-6 max-w-xl mx-auto">
          Korporativ tədbir və təkliflərimiz haqqında ətraflı məlumat üçün bizimlə əlaqə saxlayın
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <a href="tel:+994517696181" className="bg-[#C5A022] hover:bg-[#a88a1d] text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-colors">
            <Phone size={18} /> +994 51 769 61 81
          </a>
          <a href="mailto:info@tqta.az" className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-colors">
            <Mail size={18} /> info@tqta.az
          </a>
        </div>
        <p className="text-slate-500 text-sm flex items-center justify-center gap-2">
          <MapPin size={14} /> Sumqayıt şəhəri, S.Vurğun küç. 86
        </p>
      </div>

      {/* Paket Detay Modal */}
      {selectedPackage && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedPackage(null)}>
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div 
              className="p-6 rounded-t-3xl relative"
              style={{ backgroundColor: `${selectedPackage.color}15` }}
            >
              <button 
                onClick={() => setSelectedPackage(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-slate-100 transition-colors"
              >
                <X size={20} className="text-slate-600" />
              </button>
              <div className="flex items-center gap-4">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: selectedPackage.color }}
                >
                  <selectedPackage.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#0A192F]">{selectedPackage.title}</h3>
                  <p className="text-slate-600">{selectedPackage.subtitle}</p>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              <p className="text-slate-600">{selectedPackage.description}</p>

              {/* Features */}
              <div>
                <h4 className="font-bold text-[#0A192F] mb-3 flex items-center gap-2">
                  <Sparkles size={18} className="text-[#C5A022]" /> Proqram Seçimləri
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {selectedPackage.features.map((feature: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                      <Check size={16} className="text-emerald-500 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h4 className="font-bold text-[#0A192F] mb-3 flex items-center gap-2">
                  <Award size={18} className="text-[#0097A7]" /> Faydaları
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {selectedPackage.benefits.map((benefit: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                      <Star size={14} className="text-[#C5A022] flex-shrink-0" />
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>

              {/* Includes */}
              <div className="bg-slate-50 rounded-xl p-4">
                <h4 className="font-bold text-[#0A192F] mb-3 flex items-center gap-2">
                  <Gift size={18} className="text-purple-500" /> Paketə Daxildir
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedPackage.includes.map((item: string, idx: number) => (
                    <span key={idx} className="bg-white px-3 py-1 rounded-full text-sm text-slate-600 border border-slate-200">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Info */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-[#0097A7]/10 rounded-xl">
                  <Users className="w-6 h-6 text-[#0097A7] mx-auto mb-1" />
                  <p className="text-xs text-slate-500">Qrup ölçüsü</p>
                  <p className="font-bold text-[#0A192F]">{selectedPackage.capacity}</p>
                </div>
                <div className="text-center p-3 bg-[#C5A022]/10 rounded-xl">
                  <Clock className="w-6 h-6 text-[#C5A022] mx-auto mb-1" />
                  <p className="text-xs text-slate-500">Müddət</p>
                  <p className="font-bold text-[#0A192F]">{selectedPackage.duration}</p>
                </div>
                <div className="text-center p-3 bg-purple-100 rounded-xl">
                  <Award className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                  <p className="text-xs text-slate-500">Qiymət</p>
                  <p className="font-bold text-[#0A192F]">{selectedPackage.price}</p>
                </div>
              </div>

              {/* CTA */}
              <div className="flex gap-3">
                <a 
                  href="tel:+994517696181"
                  className="flex-1 bg-[#0097A7] hover:bg-[#007d8a] text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone size={18} /> Zəng Et
                </a>
                <a 
                  href="https://wa.me/994517696181"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
