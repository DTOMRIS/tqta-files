'use client';

import React, { useState } from 'react';
import { 
  Target, Compass, ShieldCheck, Globe, Award, Building2, Users, 
  MapPin, ChevronDown, ChevronUp, FileText, ExternalLink, X, GraduationCap, Briefcase,
  Utensils, Coffee, PartyPopper, Plane
} from 'lucide-react';

// DMA Pulsuz Eğitimler
const DMA_PROGRAMS = [
  { title: 'Aşpaz (Aşbaz)', duration: '49 gün / 292 saat', job: 'Restoran, Otel' },
  { title: 'Barista', duration: '30 gün / 154 saat', job: 'Kafe, Coffee Shop' },
  { title: 'Ofisiant', duration: '30 gün / 180 saat', job: 'Restoran, Banket' },
  { title: 'Otel Qeydiyyatçısı', duration: '29 gün / 170 saat', job: 'Otel Front Office' },
  { title: 'Milli Park Bələdçisi', duration: '30 gün / 171 saat', job: 'Ekoturizm, Gid' },
  { title: 'Turoperator', duration: '30 gün / 168 saat', job: 'Turizm Agentliyi' },
];

// Təsisçilər və Dəstəkçilər
const FOUNDERS = [
  {
    name: 'Azərbaycan Sağlamlıq və Termal Turizm Dəstək İctimai Birliyi',
    icon: Plane,
    color: '#2563eb',
    founder: 'Ruslan Quliyev',
    description: 'Akademiyamızın təsisçisi və strategik tərəfdaşı olaraq qastro-turizm sahəsində dayanıqlı inkişaf və beynəlxalq əməkdaşlıqların təşkilində aparıcı rol oynayır.',
    details: [
      'Akademiyanın təsisçisi',
      'Strategik tərəfdaş',
      'Beynəlxalq əməkdaşlıqlar',
      'Qastro-turizm inkişafı'
    ]
  },
  {
    name: 'Turan Restoranlar Şəbəkəsi',
    icon: Utensils,
    color: '#C5A022',
    founder: 'Mübariz Quliyev',
    description: 'Praktik təhsil və məzunların iş təminatı üçün real sənaye şəraiti təmin edir. Tələbələrimiz Turan Restoranlar Şəbəkəsində staj və işləmək imkanı əldə edir.',
    details: [
      'Staj və iş imkanı',
      'Real sənaye şəraiti',
      'Məzunlara iş təminatı',
      'Dərslərə qatılım və təcrübə paylaşımı'
    ]
  },
  {
    name: 'DK Agency',
    icon: PartyPopper,
    color: '#0097A7',
    founder: 'Doğan Tomris',
    description: 'Restoran sektorunda konsept məsləhətçiliyi və françayz danışmanlığı sahələrində dəstək verir. Forumların təşkili və qastro-turizm sahəsində birgə layihələr həyata keçiririk.',
    details: [
      'Konsept məsləhətçiliyi',
      'Françayz danışmanlığı',
      'Beynəlxalq konfranslar',
      'Gənc istedadların kəşfi və işlə təminatı'
    ]
  },
  {
    name: 'TİKA',
    icon: Globe,
    color: '#e11d48',
    logo: '/brand/tika.jpg',
    description: 'Türkiyə Əməkdaşlıq və Koordinasiya Agentliyi. Akademiyamızın açılışından etibarən texniki avadanlıq, ekspert dəstəyi və təlimçi mübadiləsi proqramları ilə inkişafımıza töhfə verir.',
    details: [
      'Texniki avadanlıq dəstəyi',
      'Ekspert dəstəyi',
      'Təlimçi mübadiləsi proqramları',
      'Beynəlxalq proqramlar'
    ]
  },
  {
    name: 'ASK - Azərbaycan Sahibkarlar Konfederasiyası',
    icon: Building2,
    color: '#059669',
    description: 'Sənaye əməkdaşlığı və məzunların iş bazarına inteqrasiyasında strateji tərəfdaş. İş dünyası ilə akademiya arasında körpü rolunu oynayır.',
    details: [
      'Sənaye əməkdaşlığı',
      'İş bazarına inteqrasiya',
      'Biznes networking',
      'Sahibkarlıq dəstəyi'
    ]
  }
];

export default function AboutSection() {
  const [showMore, setShowMore] = useState(false);
  const [showDMAModal, setShowDMAModal] = useState(false);
  const [showFoundersModal, setShowFoundersModal] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-[#C5A022] font-semibold text-sm tracking-wider uppercase">Haqqimizda</span>
        <h2 className="text-3xl md:text-4xl font-bold text-[#0A192F] mt-2 mb-4">
          Azerbaycanin Kulinariya Geleceyini Insa Edirik
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-[#C5A022] to-[#0097A7] mx-auto mb-4"></div>
        <p className="text-slate-600 max-w-2xl mx-auto">
          TQTA — <span className="font-bold text-[#0A192F]">4 dekabr 2024</span>-cu ilde 
          TIKA desteyi ile Sumqayitda <span className="text-[#C5A022] font-semibold">"Senaye Mekteb"</span> modeli esasinda fealiyyete basladi.
        </p>
      </div>

      {/* CTH Badge - with Certificate Image */}
      <div className="bg-gradient-to-r from-[#0A192F] to-[#1a365d] rounded-2xl p-6 md:p-8 mb-10 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center gap-6">
          {/* CTH Logo */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white rounded-xl p-3 shadow-lg">
              <img 
                src="/brand/CTH Approved Centre rgb.png" 
                alt="CTH Approved Centre"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          
          {/* Info */}
          <div className="flex-1 text-center lg:text-left text-white">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
              <Award className="w-5 h-5 text-[#C5A022]" />
              <span className="text-[#C5A022] font-bold text-sm">CTH Approved Centre</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-2">
              Beynəlxalq Akkreditasiya
            </h3>
            <p className="text-slate-300 text-sm mb-3">
              <span className="text-white font-semibold">Confederation of Tourism and Hospitality</span> — 
              London, Paris, Dubai və Gordon Ramsay Academy-də keçərli sertifikat.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
              <span className="px-3 py-1 bg-white/10 rounded-full text-xs">Level 2-4</span>
              <span className="px-3 py-1 bg-[#C5A022]/20 text-[#C5A022] rounded-full text-xs font-semibold">
                Dünyada Keçərli
              </span>
            </div>
          </div>

          {/* Certificate Image */}
          <div className="flex-shrink-0 hidden md:block">
            <a 
              href="/brand/cth lisans ruhsat.jpg" 
              target="_blank"
              className="block w-40 h-56 bg-white rounded-xl p-2 shadow-lg hover:shadow-2xl transition-shadow"
            >
              <img 
                src="/brand/cth lisans ruhsat.jpg" 
                alt="CTH Lisenziya Sertifikatı"
                className="w-full h-full object-contain rounded-lg"
              />
            </a>
          </div>

          {/* Lisenziya Link - Mobile */}
          <a 
            href="/brand/cth lisans ruhsat.jpg" 
            target="_blank"
            className="md:hidden flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm transition-colors"
          >
            <FileText size={16} />
            <span>Lisenziya</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* Missiya & Vizyon - Kompakt */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[#0A192F]">
          <div className="flex items-center gap-3 mb-3">
            <Target className="text-[#C5A022]" size={24} />
            <h3 className="text-lg font-bold text-[#0A192F]">Missiyamiz</h3>
          </div>
          <p className="text-slate-600 text-sm">
            Azerbaycan kulinariya medeniyyetini beynelxalq seviyyede tebliq etmek, 
            gencleri <span className="text-[#0A192F] font-semibold">ixtisasli kadrlar</span> kimi emek bazarina hazirlamaq.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[#0097A7]">
          <div className="flex items-center gap-3 mb-3">
            <Compass className="text-[#0097A7]" size={24} />
            <h3 className="text-lg font-bold text-[#0A192F]">Vizyonumuz</h3>
          </div>
          <p className="text-slate-600 text-sm">
            Beynelxalq standartlara cavab veren tehsili ile taninan, 
            <span className="text-[#0097A7] font-semibold"> qastro-turizm sahesinde lider</span> tehsil muessisesi olmaq.
          </p>
        </div>
      </div>

      {/* Akademiya Galerisi - 6 şəkil carousel */}
      <div className="mb-10">
        <h3 className="text-lg font-bold text-[#0A192F] mb-4 text-center">Akademiyamızdan Görüntülər</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { src: '/brand/acilis-01.jpeg', label: 'Açılış Mərasimi' },
            { src: '/brand/kurdele-kesimi.jpeg', label: 'Kurdele Kəsimi' },
            { src: '/brand/mutfak.jpeg', label: 'Professional Mətbəx' },
            { src: '/brand/egitim-zali-1.jpeg', label: 'Təhsil Zalı' },
            { src: '/brand/derslerimiz.jpeg', label: 'Dərslərimiz' },
            { src: '/brand/ogrencilerimizle.jpeg', label: 'Tələbələrimizlə' },
          ].map((img, idx) => (
            <div key={idx} className="relative rounded-xl overflow-hidden shadow-lg aspect-[4/3] group cursor-pointer">
              <img 
                src={img.src}
                alt={img.label}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="absolute bottom-3 left-3 text-white text-sm font-medium">{img.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Niye TQTA - Kompakt Stats */}
      <div className="bg-slate-50 rounded-2xl p-6 mb-10">
        <h3 className="text-lg font-bold text-center text-[#0A192F] mb-6">Niye TQTA?</h3>
        <div className="grid grid-cols-4 gap-3">
          {[
            { icon: ShieldCheck, value: 'CTH', label: 'Sertifikat', color: '#C5A022' },
            { icon: Globe, value: '3+', label: 'Olke', color: '#0A192F' },
            { icon: Users, value: '90%', label: 'Is Teminati', color: '#0097A7' },
            { icon: Building2, value: 'DMA', label: 'Dovlet', color: '#059669' }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div 
                className="w-12 h-12 mx-auto mb-2 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}15` }}
              >
                <stat.icon size={24} style={{ color: stat.color }} />
              </div>
              <div className="text-lg font-bold text-[#0A192F]">{stat.value}</div>
              <div className="text-xs text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* DMA - Dovlet Desteyi - Tıklanabilir */}
      <div 
        onClick={() => setShowDMAModal(true)}
        className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-6 mb-8 text-white cursor-pointer hover:from-emerald-500 hover:to-teal-600 transition-all hover:shadow-xl hover:scale-[1.02]"
      >
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <img 
            src="/brand/dma-logo.png" 
            alt="DMA"
            className="w-20 h-20 object-contain bg-white rounded-xl p-2"
          />
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-lg font-bold mb-1">Dövlət Məşğulluq Agentliyi</h3>
            <p className="text-emerald-100 text-sm mb-2">
              Birgə proqramlar: <span className="text-white font-bold">Pulsuz təhsil</span> + İş təminatı
            </p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2">
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs">Pulsuz</span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs">İş Təminatı</span>
              <span className="px-3 py-1 bg-yellow-400 text-emerald-900 rounded-full text-xs font-bold">Ətraflı bax →</span>
            </div>
          </div>
        </div>
      </div>

      {/* DMA Modal */}
      {showDMAModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowDMAModal(false)}>
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-6 rounded-t-3xl text-white relative">
              <button onClick={() => setShowDMAModal(false)} className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full">
                <X size={20} />
              </button>
              <div className="flex items-center gap-4">
                <img src="/brand/dma-logo.png" alt="DMA" className="w-16 h-16 object-contain bg-white rounded-xl p-2" />
                <div>
                  <h3 className="text-xl font-bold">DMA Pulsuz Təhsil Proqramları</h3>
                  <p className="text-emerald-100 text-sm">Dövlət dəstəyi ilə peşə əldə edin</p>
                </div>
              </div>
            </div>
            
            {/* Modal Body */}
            <div className="p-6">
              <div className="grid gap-3 mb-6">
                {DMA_PROGRAMS.map((prog, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-emerald-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <GraduationCap className="text-emerald-600" size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#0A192F]">{prog.title}</h4>
                        <p className="text-xs text-slate-500">{prog.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <Briefcase size={14} />
                      <span>{prog.job}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Üstünlüklər */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200 text-center">
                  <div className="text-2xl font-bold text-emerald-600">200 ₼</div>
                  <div className="text-xs text-emerald-700">Aylıq Təqaüd</div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 text-center">
                  <div className="text-2xl font-bold text-blue-600">100%</div>
                  <div className="text-xs text-blue-700">Pulsuz Təhsil</div>
                </div>
              </div>

              {/* Şərtlər */}
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 mb-4">
                <h5 className="font-bold text-amber-800 mb-2">✅ Kimler müraciət edə bilər?</h5>
                <ul className="text-xs text-amber-700 space-y-1">
                  <li>• İşsiz şəxslər</li>
                  <li>• Torpaq payı olub digər işi olmayanlar</li>
                  <li>• İşaxtaran şəxslər (20% kvota)</li>
                </ul>
                <h5 className="font-bold text-amber-800 mt-3 mb-2">⭐ Üstün hüquqa malik olanlar:</h5>
                <ul className="text-xs text-amber-700 space-y-1">
                  <li>• 3 ildən artıq işləməyənlər</li>
                  <li>• Peşəsi olmayanlar</li>
                  <li>• Şəhid ailəsinin üzvləri</li>
                </ul>
              </div>

              {/* Qaydalar */}
              <div className="bg-red-50 p-3 rounded-xl border border-red-200 mb-4">
                <p className="text-xs text-red-700">
                  <strong>⚠️ Vacib:</strong> Dərslərə qatılım məcburidir. 8 dəfə dərsə qatılmayan tələbə proqramdan xaric edilir.
                </p>
              </div>

              {/* CTA */}
              <a 
                href="https://wa.me/994517696181?text=Salam! DMA pulsuz proqramlar haqqında məlumat almaq istəyirəm."
                target="_blank"
                className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white text-center py-3 rounded-xl font-bold transition-colors"
              >
                Müraciət Et
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Daha Cox - Toggle */}
      <div className="text-center">
        <button
          onClick={() => setShowMore(!showMore)}
          className="inline-flex items-center gap-2 px-5 py-2 bg-slate-100 hover:bg-slate-200 rounded-full text-[#0A192F] font-medium text-sm transition-colors"
        >
          {showMore ? (
            <>
              <ChevronUp size={18} />
              Daha Az
            </>
          ) : (
            <>
              <ChevronDown size={18} />
              Terefdashliklar
            </>
          )}
        </button>
      </div>

      {/* Genisletilmis Bolum */}
      {showMore && (
        <div className="mt-8 space-y-8 animate-in slide-in-from-top duration-300">
          
          {/* Tesisciler - Tıklanabilir */}
          <div>
            <h4 className="text-lg font-bold text-[#0A192F] mb-4 flex items-center gap-2">
              <Building2 size={20} className="text-[#C5A022]" />
              Təsisçi və Dəstəkçilər
              <button 
                onClick={() => setShowFoundersModal(true)}
                className="ml-2 text-xs bg-[#C5A022]/10 text-[#C5A022] px-2 py-1 rounded-full hover:bg-[#C5A022]/20 transition-colors"
              >
                Ətraflı
              </button>
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {FOUNDERS.map((f, i) => {
                const Icon = f.icon;
                return (
                  <button 
                    key={i} 
                    onClick={() => setShowFoundersModal(true)}
                    className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 text-center hover:shadow-md hover:border-[#C5A022]/30 transition-all cursor-pointer group"
                  >
                    {f.logo ? (
                      <img src={f.logo} alt={f.name} className="w-12 h-12 object-contain mx-auto mb-2" />
                    ) : (
                      <div 
                        className="w-12 h-12 rounded-lg mx-auto mb-2 flex items-center justify-center transition-colors"
                        style={{ backgroundColor: `${f.color}15` }}
                      >
                        <Icon size={24} style={{ color: f.color }} />
                      </div>
                    )}
                    <h5 className="font-semibold text-sm text-[#0A192F] group-hover:text-[#C5A022] transition-colors">{f.name}</h5>
                    <p className="text-xs text-slate-500">{f.description.substring(0, 30)}...</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Beynelxalq */}
          <div>
            <h4 className="text-lg font-bold text-[#0A192F] mb-4 flex items-center gap-2">
              <Globe size={20} className="text-[#0097A7]" />
              Beynelxalq
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { name: 'Lefke Avropa Uni.', country: 'SKTC', desc: 'Staj' },
                { name: 'Selcuq Uni.', country: 'Turkiye', desc: 'Akademik' },
                { name: 'Canakkale Uni.', country: 'Turkiye', desc: 'Mubadile' }
              ].map((uni, i) => (
                <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin size={14} className="text-[#0097A7]" />
                    <span className="text-xs text-[#0097A7] font-medium">{uni.country}</span>
                  </div>
                  <h5 className="font-semibold text-sm text-[#0A192F]">{uni.name}</h5>
                  <p className="text-xs text-slate-500">{uni.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Senaye */}
          <div>
            <h4 className="text-lg font-bold text-[#0A192F] mb-4 flex items-center gap-2">
              <Award size={20} className="text-[#C5A022]" />
              Senaye
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { name: 'AQSIA', full: 'Qadin Sahibkarlar Assosiasiyasi' },
                { name: 'AQISA', full: 'Qida Senayecileri Assosiasiyasi' }
              ].map((org, i) => (
                <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="text-lg font-bold text-[#C5A022]">{org.name}</span>
                  <p className="text-sm text-slate-600">{org.full}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Founders Modal */}
      {showFoundersModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-[#0A192F] to-[#1a365d] p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#C5A022] rounded-lg flex items-center justify-center">
                  <Building2 className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Təsisçi və Dəstəkçilərimiz</h3>
                  <p className="text-slate-300 text-sm">TQTA-nın arxasındakı güc</p>
                </div>
              </div>
              <button 
                onClick={() => setShowFoundersModal(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {FOUNDERS.map((founder, idx) => {
                const Icon = founder.icon;
                return (
                  <div 
                    key={idx} 
                    className="bg-slate-50 rounded-xl p-5 border-l-4 hover:shadow-md transition-shadow"
                    style={{ borderColor: founder.color }}
                  >
                    <div className="flex items-start gap-4">
                      <div 
                        className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${founder.color}15` }}
                      >
                        {founder.logo ? (
                          <img src={founder.logo} alt={founder.name} className="w-10 h-10 object-contain" />
                        ) : (
                          <Icon size={28} style={{ color: founder.color }} />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-[#0A192F] mb-1">{founder.name}</h4>
                        {founder.founder && (
                          <p className="text-sm font-semibold mb-2" style={{ color: founder.color }}>
                            Təsisçi: {founder.founder}
                          </p>
                        )}
                        <p className="text-slate-600 text-sm mb-3">{founder.description}</p>
                        
                        <div className="grid grid-cols-2 gap-2">
                          {founder.details.map((detail, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-slate-500">
                              <div 
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: founder.color }}
                              />
                              {detail}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* CTA */}
              <div className="bg-gradient-to-r from-[#C5A022]/10 to-[#0097A7]/10 p-5 rounded-xl border border-[#C5A022]/20">
                <h5 className="font-bold text-[#0A192F] mb-2">Bizimlə Əməkdaşlıq</h5>
                <p className="text-sm text-slate-600 mb-3">
                  TQTA ilə əməkdaşlıq etmək istəyən şirkətlər, sənaye tərəfdaşları və beynəlxalq təşkilatları əməkdaşlığa dəvət edirik.
                </p>
                <a 
                  href="mailto:info@tqta.az?subject=Əməkdaşlıq Təklifi"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#C5A022] hover:bg-[#b8941f] text-white rounded-lg text-sm font-medium transition-colors"
                >
                  <Building2 size={16} />
                  Əlaqə Saxla
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
