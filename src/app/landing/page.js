'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import {
  ChefHat,
  ArrowRight,
  Menu,
  X
} from 'lucide-react';
import LeadCaptureModal from './components/LeadCaptureModal';
import AIAssistant from './components/AIAssistant';
import './landing.css';

export default function TQTALandingPremium() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % 2);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const testimonials = [
    {
      quote: "TQTA-da aldığım təhsil karyeramın dönüş nöqtəsi oldu. Beynəlxalq standartlarda hazırlandım.",
      name: "Əli Məmmədov",
      title: "Sous Chef",
      company: "Hilton Baku",
    },
    {
      quote: "CTH diplomu ilə Avropada iş tapmaq çox asan oldu. Təşəkkürlər TQTA.",
      name: "Leyla Həsənova", 
      title: "Pastry Chef",
      company: "Four Seasons Dubai",
    },
  ];

  // Slug mapping function
  const createSlug = (name) => {
    const slugMap = {
      'Aşpaz Bacarıqları': 'aspaz-bacariqlari',
      'Barista Bacarıqları': 'barista-bacariqlari',
      'Restoran Xidməti': 'restoran-xidmeti',
      'Turizm və Qonaqlama İngiliscəsi': 'turizm-ve-qonaqlama-ingilisce',
    };
    return slugMap[name] || name.toLowerCase().replace(/\s+/g, '-').replace(/[ə]/g, 'e').replace(/[ı]/g, 'i').replace(/[ö]/g, 'o').replace(/[ü]/g, 'u').replace(/[ş]/g, 's').replace(/[ğ]/g, 'g').replace(/[ç]/g, 'c');
  };

  const programs = [
    { 
      name: "Aşpaz Bacarıqları",
      slug: "aspaz-bacariqlari",
      level: "CTH Level 2 Award in Cookery Skills",
      duration: "12 Həftə",
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&q=80",
      desc: "Peşəkar aşpazlıq texnikaları və beynəlxalq standartlarda təhsil",
      kategori: "Kulinari"
    },
    { 
      name: "Barista Bacarıqları",
      slug: "barista-bacariqlari",
      level: "CTH Level 2 Award in Barista Skills", 
      duration: "8 Həftə",
      image: "https://images.unsplash.com/photo-1612203985729-70726954388c?w=600&q=80",
      desc: "Espresso hazırlama, latte art və kofe sənəti",
      kategori: "Kafe"
    },
    { 
      name: "Restoran Xidməti",
      slug: "restoran-xidmeti",
      level: "CTH Level 2 Certificate in Professional Restaurant Front of House Service",
      duration: "10 Həftə",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
      desc: "Qonaq xidməti, restoran idarəetməsi və peşəkar xidmət standartları",
      kategori: "Restoran"
    },
    { 
      name: "Turizm və Qonaqlama İngiliscəsi",
      slug: "turizm-ve-qonaqlama-ingilisce",
      level: "CTH Level 1 Certificate in English for Tourism and Hospitality",
      duration: "16 Həftə",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=80",
      desc: "Turizm və qonaqlama sənayesi üçün xüsusi İngilis dili təhsil",
      kategori: "Turizm"
    },
  ];

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all ${isScrolled ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200/50' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl flex items-center justify-center shadow-lg">
                <ChefHat className="h-7 w-7 text-white" />
              </div>
              <div>
                <div className={`font-bold text-xl tracking-tight transition-colors ${isScrolled ? 'text-slate-900' : 'text-white'}`}>TQTA</div>
                <div className={`text-[10px] uppercase tracking-widest font-medium transition-colors ${isScrolled ? 'text-gray-500' : 'text-white/70'}`}>Turan Qastro Turizm Akademiyası</div>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="#programlar" className={`font-medium text-sm transition-colors ${isScrolled ? 'text-gray-700 hover:text-slate-900' : 'text-white/90 hover:text-white'}`}>Proqramlar</Link>
              <Link href="#haqqimizda" className={`font-medium text-sm transition-colors ${isScrolled ? 'text-gray-700 hover:text-slate-900' : 'text-white/90 hover:text-white'}`}>Haqqımızda</Link>
              <Link href="#reyler" className={`font-medium text-sm transition-colors ${isScrolled ? 'text-gray-700 hover:text-slate-900' : 'text-white/90 hover:text-white'}`}>Rəylər</Link>
              <Link href="/login" className={`font-medium text-sm transition-colors ${isScrolled ? 'text-gray-700 hover:text-slate-900' : 'text-white/90 hover:text-white'}`}>Daxil Ol</Link>
              <Link href="/telebe-qeydiyyat">
                <Button className={`text-sm px-6 py-2.5 rounded-full transition-all ${isScrolled ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-amber-600 text-white hover:bg-amber-700'}`}>
                  Qeydiyyat
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className={`h-6 w-6 ${isScrolled ? 'text-slate-900' : 'text-white'}`} /> : <Menu className={`h-6 w-6 ${isScrolled ? 'text-slate-900' : 'text-white'}`} />}
            </button>
          </div>
        </div>
      </nav>

      {/* HERO - SİYAH */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-slate-900/85 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=1920&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 max-w-6xl mx-auto px-6 py-32">
          <div className="max-w-3xl">
            <p className="text-amber-500 text-sm uppercase tracking-widest mb-6 font-medium">
              UK Akkreditasiyalı Kulinariya Akademiyası
            </p>

            <h1 className="text-5xl md:text-7xl text-white mb-8 leading-tight font-serif">
              Kulinariya sənətində
              <span className="block text-amber-500">mükəmməlliyə</span>
              aparan yol
            </h1>

            <p className="text-xl text-white/70 mb-10 max-w-xl leading-relaxed">
              CTH tərəfindən akkreditə olunmuş proqramlarla beynəlxalq karyeranızı qurun.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setLeadModalOpen(true)}
                className="px-8 py-4 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 text-white font-semibold rounded-full shadow-lg hover:shadow-2xl hover:shadow-amber-500/50 hover:scale-105 transition-all duration-300 animate-glow"
              >
                Proqramları Kəşf Et ✨
              </button>
              <button
                onClick={() => setLeadModalOpen(true)}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300"
              >
                Pulsuz Məsləhət Alın 📞
              </button>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-slate-900/95 backdrop-blur border-t border-white/10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-4 divide-x divide-white/10">
              {[
                { value: "450+", label: "Məzun" },
                { value: "75%", label: "İşlə təminat" },
                { value: "12+", label: "Proqram" },
                { value: "2024", label: "Təsis ili" },
              ].map((stat, i) => (
                <div key={i} className="py-6 text-center">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-white/50 uppercase tracking-wider mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR - BEYAZ */}
      <section className="py-8 bg-white border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-12">
            {['CTH', 'WORLDCHEFS'].map((partner, i) => (
              <div 
                key={i} 
                className="text-stone-400 hover:text-amber-600 transition-all duration-300 cursor-pointer group"
              >
                <span className="text-lg font-semibold tracking-wider group-hover:scale-110 transition-transform inline-block">
                  {partner}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT - BEYAZ */}
      <section className="py-24 bg-white" id="haqqimizda">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-amber-600 text-sm uppercase tracking-widest mb-4 font-medium">
                Haqqımızda
              </p>
              <h2 className="text-4xl lg:text-5xl text-slate-900 mb-8 leading-tight font-serif">
                Sumqayıtın ilk müasir{' '}
                <span className="text-amber-600">gastronomiya</span>{' '}
                təhsil mərkəzi
              </h2>
              <div className="space-y-6 text-slate-600 leading-relaxed">
                <p>
                  Turan Qastro Turizm Akademiyası (TQTA) — Sumqayıtda ilk müasir gastronomiya təhsil mərkəzidir. 
                  Hər bir tələbəni dünya səviyyəli qonaqlama peşəkarlarına çevirməyə həsr olunmuş akademiyamız, 
                  beynəlxalq standartlara uyğun təhsil təklif edir.
                </p>
                <p>
                  CTH tərəfindən akkreditə olunmuş tədris mərkəzi kimi, beynəlxalq tanınan sertifikatlar veririk. 
                  TİKA (Türkiyə Əməkdaşlıq və Koordinasiya Agentliyi) dəstəyi ilə müasir, son texnologiyalı təlim 
                  mətbəxləri, sinif otaqları və təhsil resursları ilə təchiz olunmuş akademiyamız, tələbələrin 
                  öyrənməsi və inkişafı üçün ilhamverici mühit yaradır.
                </p>
              </div>
              <div className="mt-10 pt-10 border-t border-stone-200 grid grid-cols-2 gap-8">
                <div>
                  <div className="text-3xl font-bold text-slate-900">UK</div>
                  <div className="text-sm text-slate-500 mt-1">Ofqual Regulated</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-900">Ekim 2025</div>
                  <div className="text-sm text-slate-500 mt-1">CTH Akreditasiya</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] bg-stone-200 overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80"
                  alt="TQTA Kitchen"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 border-2 border-amber-500 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMS - SİYAH */}
      <section className="py-24 bg-slate-900" id="programlar">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <p className="text-amber-500 text-sm uppercase tracking-widest mb-4 font-medium">
              Proqramlar
            </p>
            <h2 className="text-4xl lg:text-5xl text-white mb-6 font-serif">
              Peşəkar proqramlarımız
            </h2>
            <p className="text-white/60 leading-relaxed">
              Hər biri CTH tərəfindən akkreditə olunmuş, beynəlxalq standartlara uyğun proqramlar.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {programs.map((program, i) => (
              <article 
                key={i}
                className="group cursor-pointer"
                onClick={() => {
                  setSelectedProgram(program.name);
                  setLeadModalOpen(true);
                }}
              >
                <div className="aspect-[4/3] overflow-hidden mb-6 bg-slate-800 rounded-lg">
                  <img 
                    src={program.image}
                    alt={program.name}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-amber-500 text-sm font-medium">{program.level}</p>
                    {program.kategori && (
                      <span className="px-2 py-1 bg-amber-500/20 text-amber-300 text-xs rounded-full font-medium">
                        {program.kategori}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl text-white mb-2 group-hover:text-amber-500 transition-colors font-semibold">
                    {program.name}
                  </h3>
                  {program.desc && (
                    <p className="text-white/60 text-sm mb-3 leading-relaxed">{program.desc}</p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-white/50 text-sm">{program.duration}</span>
                    <span className="text-white/30 group-hover:text-amber-500 transition-colors">→</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL - BEYAZ */}
      <section className="py-24 bg-stone-100" id="reyler">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="aspect-square bg-stone-300 overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=800&q=80"
                alt="Student"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="relative">
              <span className="absolute -top-4 -left-2 text-8xl text-amber-500/20 font-serif">"</span>
              
              <blockquote className="text-2xl lg:text-3xl text-slate-900 leading-relaxed mb-8 font-serif relative z-10">
                {testimonials[activeTestimonial].quote}
              </blockquote>

              <div className="flex items-center gap-4">
                <div className="w-px h-12 bg-amber-500" />
                <div>
                  <div className="font-semibold text-slate-900">
                    {testimonials[activeTestimonial].name}
                  </div>
                  <div className="text-sm text-slate-500">
                    {testimonials[activeTestimonial].title}, {testimonials[activeTestimonial].company}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-10">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={`h-1 transition-all rounded-full ${
                      i === activeTestimonial ? 'bg-amber-500 w-8' : 'bg-stone-300 w-4 hover:bg-stone-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WORKSHOPS - SİYAH (Programs gibi) */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <p className="text-amber-500 text-sm uppercase tracking-widest mb-4 font-medium">
              Workshoplar
            </p>
            <h2 className="text-4xl lg:text-5xl text-white mb-6 font-serif">
              Qısa müddətli praktiki təlimlər
            </h2>
            <p className="text-white/60 leading-relaxed">
              Peşəkar müəllimlər tərəfindən keçirilən intensiv workshoplar. Yeni bacarıqlar öyrənin və praktiki təcrübə qazanın.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Azərbaycan Kabablarının Sirləri",
                muellim: "Peşəkar Aşpaz",
                muddet: "3 saat",
                qiymet: 45,
                image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&q=80",
                kategori: "Kulinari"
              },
              {
                name: "Sadəcə Espresso: İtalyan Notaları",
                muellim: "Usta Barista",
                muddet: "3 saat",
                qiymet: 30,
                image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&q=80",
                kategori: "Kafe"
              },
              {
                name: "Şəkərbura və Paxlava Sirləri",
                muellim: "Pastry Chef",
                muddet: "3 saat",
                qiymet: 35,
                image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80",
                kategori: "Şirniyyat"
              },
              {
                name: "Azərbaycan Plovları",
                muellim: "Peşəkar Aşpaz",
                muddet: "4 saat",
                qiymet: 40,
                image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=600&q=80",
                kategori: "Kulinari"
              },
            ].map((workshop, i) => (
              <Link key={i} href={`/workshoplar/${workshop.name.toLowerCase().replace(/\s+/g, '-').replace(/ə/g, 'e').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ü/g, 'u').replace(/ğ/g, 'g').replace(/ş/g, 's').replace(/ç/g, 'c')}`}>
                <article className="group cursor-pointer">
                  <div className="aspect-[4/3] overflow-hidden mb-6 bg-slate-800 rounded-lg">
                    <img 
                      src={workshop.image}
                      alt={workshop.name}
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-amber-500 text-sm font-medium">{workshop.muellim}</p>
                      {workshop.kategori && (
                        <span className="px-2 py-1 bg-amber-500/20 text-amber-300 text-xs rounded-full font-medium">
                          {workshop.kategori}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl text-white mb-2 group-hover:text-amber-500 transition-colors font-semibold">
                      {workshop.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-white/50 text-sm">{workshop.muddet} • {workshop.qiymet} AZN</span>
                      <span className="text-white/30 group-hover:text-amber-500 transition-colors">→</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* KURUMSAL EĞİTİMLER - BEYAZ */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-amber-600 text-sm uppercase tracking-widest mb-4 font-medium">
                Şirkətlər üçün
              </p>
              <h2 className="text-4xl lg:text-5xl text-slate-900 mb-8 leading-tight font-serif">
                Korporativ təlim və{' '}
                <span className="text-amber-600">təqdimatlar</span>
              </h2>
              <div className="space-y-6 text-slate-600 leading-relaxed mb-8">
                <p>
                  Restoran, otel və qida sənayesi şirkətləri üçün xüsusi hazırlanmış korporativ təlim proqramları. 
                  Komandanızın peşəkar bacarıqlarını artırın və xidmət keyfiyyətini yüksəldin.
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-600">
                  <li>Peşəkar təlim proqramları (onsite/online)</li>
                  <li>Şirkət təqdimatları və masterclasslar</li>
                  <li>Mətbəx komandası hazırlığı</li>
                  <li>Xidmət standartları təlimi</li>
                  <li>Franchise sistemi təlimi</li>
                </ul>
              </div>
              <div className="flex gap-4">
                <Link href="/telebe-qeydiyyat">
                  <Button className="px-8 py-4 bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors rounded-full">
                    Təklif Al
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { title: "Kulinari", desc: "Peşəkar mətbəx komandası", icon: "👨‍🍳" },
                { title: "Restoran", desc: "Qonaq xidməti və idarəetmə", icon: "🍽️" },
                { title: "Kafe", desc: "Barista və kafe idarəçiliyi", icon: "☕" },
                { title: "Franchise", desc: "Franchise sistemi təlimi", icon: "🏢" },
              ].map((item, i) => (
                <div key={i} className="bg-stone-100 p-6 rounded-lg border border-stone-200 hover:border-amber-300 hover:shadow-md transition-all">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MASTERCLASSLAR - SİYAH (Programs gibi) */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <p className="text-amber-500 text-sm uppercase tracking-widest mb-4 font-medium">
              Aylıq Masterclasslar
            </p>
            <h2 className="text-4xl lg:text-5xl text-white mb-6 font-serif">
              Dünya səviyyəli ustadlardan öyrənin
            </h2>
            <p className="text-white/60 leading-relaxed">
              Hər ay beynəlxalq səviyyəli şef və peşəkarlar tərəfindən keçirilən eksklüziv masterclasslar.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Mətbəx Sirləri",
                muellim: "Peşəkar Şeflər",
                muellimBio: "TQTA Professional Komanda",
                muddet: "1 gün",
                qiymet: 45,
                image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80",
                desc: "Qərb və Azərbaycan mətbəxinin klassik ləzzətləri"
              },
              {
                name: "Azərbaycanın Bölgə Mətbəxləri",
                muellim: "Regional Şeflər",
                muellimBio: "Şəki, Lənkəran, Gəncə mətbəxləri",
                muddet: "3 saat",
                qiymet: 40,
                image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80",
                desc: "Şəki pitisi, Lənkəran ləvəngisi, Gəncə doğramacı"
              },
            ].map((masterclass, i) => (
              <Link key={i} href={`/masterclasslar/${masterclass.name.toLowerCase().replace(/\s+/g, '-').replace(/ə/g, 'e').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ü/g, 'u').replace(/ğ/g, 'g').replace(/ş/g, 's').replace(/ç/g, 'c')}`}>
                <article className="group cursor-pointer">
                  <div className="aspect-[4/3] overflow-hidden mb-6 bg-slate-800 rounded-lg">
                    <img 
                      src={masterclass.image}
                      alt={masterclass.name}
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-amber-500 text-sm font-medium">{masterclass.muellim}</p>
                      <span className="px-2 py-1 bg-amber-500/20 text-amber-300 text-xs rounded-full font-medium">
                        Aylıq
                      </span>
                    </div>
                    <h3 className="text-xl text-white mb-2 group-hover:text-amber-500 transition-colors font-semibold">
                      {masterclass.name}
                    </h3>
                    {masterclass.desc && (
                      <p className="text-white/60 text-sm mb-3 leading-relaxed">{masterclass.desc}</p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-white/50 text-sm">{masterclass.muddet} • {masterclass.qiymet} AZN</span>
                      <span className="text-white/30 group-hover:text-amber-500 transition-colors">→</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTH SECTION - BEYAZ */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-2 text-center lg:text-left">
              <div className="inline-block p-8 border-2 border-slate-900">
                <div className="text-4xl font-bold text-slate-900">CTH</div>
                <div className="text-xs uppercase tracking-widest text-slate-500 mt-2">
                  Confederation of<br/>Tourism & Hospitality
                </div>
              </div>
              <p className="mt-6 text-sm text-slate-500">UK Ofqual Regulated</p>
            </div>

            <div className="lg:col-span-3">
              <h2 className="text-3xl lg:text-4xl text-slate-900 mb-6 leading-tight font-serif">
                Beynəlxalq tanınma ilə gələcəyinizi təmin edin
              </h2>
              <p className="text-slate-600 leading-relaxed mb-8">
                CTH diplomları Böyük Britaniyanın Ofqual təşkilatı tərəfindən tənzimlənir. 
                Bu, diplomlarınızın dünya üzrə 130+ ölkədə tanınması deməkdir.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "130+", label: "Tanınan ölkə" },
                  { value: "Global", label: "Karyera imkanı" },
                  { value: "UK", label: "Standart keyfiyyət" },
                ].map((item, i) => (
                  <div key={i} className="text-center p-6 bg-stone-100 rounded-lg">
                    <div className="text-xl font-bold text-slate-900">{item.value}</div>
                    <div className="text-xs text-slate-500 mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - SİYAH */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-amber-500 text-sm uppercase tracking-widest mb-6 font-medium">
            Növbəti addım
          </p>
          <h2 className="text-4xl lg:text-5xl text-white mb-8 font-serif">
            Kulinariya səyahətinizə başlayın
          </h2>
          <p className="text-white/60 mb-12 leading-relaxed">
            60 saniyəlik karyera testimizi keçin və sizə ən uyğun proqramı tapın.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setLeadModalOpen(true)}
              className="px-10 py-4 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 text-white font-semibold rounded-full shadow-lg hover:shadow-2xl hover:shadow-amber-500/50 hover:scale-105 transition-all duration-300 animate-glow"
            >
              Müraciət Et ✨
            </button>
            <button
              onClick={() => setLeadModalOpen(true)}
              className="px-10 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300"
            >
              Pulsuz Məsləhət Alın 📞
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER - SİYAH */}
      <footer className="py-12 bg-slate-950 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-2xl font-bold text-white">TQTA</div>
            <div className="text-sm text-white/40 text-center">
              <p>© 2025 Turan Qastro Turizm Akademiyası MMC</p>
              <p className="mt-1">Sumqayıt şəhəri</p>
              <p className="mt-1">📲 +994 51 769 61 81</p>
            </div>
            <div className="flex gap-6">
              <a 
                href="https://www.instagram.com/p/DSmtQ2XjN7X/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-white/40 hover:text-white cursor-pointer transition-colors"
              >
                Instagram
              </a>
              <a 
                href="tel:+994517696181"
                className="text-sm text-white/40 hover:text-white cursor-pointer transition-colors"
              >
                +994 51 769 61 81
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Lead Capture Modal */}
      <LeadCaptureModal
        open={leadModalOpen}
        onOpenChange={setLeadModalOpen}
        program={selectedProgram}
      />

      {/* AI Assistant - Beledçiniz */}
      <AIAssistant />
    </div>
  );
}
