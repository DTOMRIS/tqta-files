'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, User, MapPin, Calendar, Sparkles, CheckCircle } from 'lucide-react';

// Masterclass verileri (gerçekte API'den gelecek)
const masterclasses = {
  'metbex-sirleri': {
    name: "Mətbəx Sirləri: Vaz-ke-çə bil-mə-di-yi-miz və-ris-lə-ri-miz",
    muellim: "Peşəkar Şeflər",
    muellimBio: "TQTA Professional Komanda",
    muddet: "1 gün",
    qiymet: 45,
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=80",
    kategori: "Kulinari",
    tarix: "Aylıq",
    yer: "TQTA Mətbəxi",
    desc: "Qərb və Azərbaycan mətbəxinin klassik ləzzətləri",
    detayliTəsvir: "Klassik restoran ləzzətlərini TQTA fərqi ilə öyrənin. Professional bıçaq texnikaları, restoranvari plating və təqdimat, sous hazırlama texnikaları, temperatur nəzarəti və düzgün mövsüm məhsulları seçimi kimi bütün məsələləri əhatə edirik.",
    texnikalar: [
      "Professional bıçaq texnikaları",
      "Restoranvari plating və təqdimat",
      "Sous hazırlama texnikaları",
      "Temperatur nəzarəti",
      "Düzgün mövsüm məhsulları seçimi"
    ],
    menyu: [
      "Sezar salatası (toyuqlu)",
      "Göbələkli risotto",
      "Café de Paris souslu bonfile",
      "Crème brûlée"
    ],
    xidmetler: [
      "Bütün məhsullar və avadanlıqlar",
      "TQTA loqolu önlük (hədiyyə)",
      "Reseptlər kitabçası",
      "Sertifikat",
      "Hazırlanan yeməkləri evə aparmaq üçün qablar"
    ]
  },
  'azerbaycanin-bolge-metbexleri': {
    name: "Azərbaycanın Bölgə Mətbəxləri",
    muellim: "Regional Şeflər",
    muellimBio: "Şəki, Lənkəran, Gəncə mətbəxləri",
    muddet: "3 saat",
    qiymet: 40,
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1200&q=80",
    kategori: "Regional",
    tarix: "Aylıq",
    yer: "TQTA Mətbəxi",
    desc: "Şəki pitisi, Lənkəran ləvəngisi, Gəncə doğramacı",
    detayliTəsvir: "Azərbaycanın regional mətbəxlərinin sirlərini kəşf edin. Şəki, Lənkəran və Gəncə mətbəxlərinin ənənəvi reseptlərini professional şeflərimizdən öyrənin.",
    texnikalar: [
      "Regional reseptlər və texnikalar",
      "Ənənəvi bişirmə üsulları",
      "Yerli məhsulların istifadəsi",
      "Mədəniyyət və tarix",
      "Təqdimat və bəzəmə"
    ],
    menyu: [
      "Şəki pitisi",
      "Lənkəran ləvəngisi",
      "Gəncə doğramacı",
      "Regional çörək növləri"
    ],
    xidmetler: [
      "Bütün xammal və avadanlıqlar",
      "Professional mətbəx istifadəsi",
      "Sertifikat",
      "Resept kitabçası"
    ]
  }
};

export default function MasterclassDetayPage({ params }) {
  // Next.js 15: params artık Promise, unwrap etmeliyiz
  const { slug } = use(params);
  const masterclass = masterclasses[slug] || masterclasses['metbex-sirleri'];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-32 bg-slate-900">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-slate-900/90 z-10" />
          <img 
            src={masterclass.image}
            alt={masterclass.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 max-w-6xl mx-auto px-6">
          <Link href="/landing" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Geri</span>
          </Link>

          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-amber-500/20 text-amber-300 text-sm rounded-full font-medium">
                {masterclass.kategori}
              </span>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full font-medium flex items-center gap-1">
                <Sparkles className="h-4 w-4" />
                Aylıq Masterclass
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl text-white mb-6 leading-tight font-serif">
              {masterclass.name}
            </h1>

            <p className="text-xl text-white/70 mb-8 leading-relaxed">
              {masterclass.desc}
            </p>

            <div className="flex flex-wrap gap-6 text-white/60">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{masterclass.muddet}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>{masterclass.muellim}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>{masterclass.yer}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{masterclass.tarix}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4 font-serif">
                  Masterclass Haqqında
                </h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {masterclass.detayliTəsvir}
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6 font-serif">
                  Öyrədiləcək Texnikalar
                </h3>
                <div className="space-y-4">
                  {masterclass.texnikalar.map((texnika, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 bg-stone-50 rounded-lg border border-stone-200">
                      <CheckCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-slate-900">{texnika}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {masterclass.menyu && (
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 font-serif">
                    Masterclass Menyusu
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {masterclass.menyu.map((item, i) => (
                      <div key={i} className="p-4 bg-stone-50 rounded-lg border border-stone-200">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-amber-600 rounded-full" />
                          <span className="text-slate-900">{item}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {masterclass.xidmetler && (
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 font-serif">
                    Dərsə Daxildir
                  </h3>
                  <div className="space-y-2">
                    {masterclass.xidmetler.map((xidmet, i) => (
                      <div key={i} className="flex items-center gap-3 text-slate-700">
                        <CheckCircle className="h-5 w-5 text-amber-600" />
                        <span>{xidmet}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="bg-stone-50 p-6 rounded-lg border border-stone-200">
                  <h3 className="font-bold text-slate-900 mb-4">Masterclass Məlumatları</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-slate-500 mb-1">Müddət</div>
                      <div className="font-semibold text-slate-900">{masterclass.muddet}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-500 mb-1">Müəllim</div>
                      <div className="font-semibold text-slate-900">{masterclass.muellim}</div>
                      <div className="text-xs text-slate-500 mt-1">{masterclass.muellimBio}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-500 mb-1">Yer</div>
                      <div className="font-semibold text-slate-900">{masterclass.yer}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-500 mb-1">Tarix</div>
                      <div className="font-semibold text-slate-900">{masterclass.tarix}</div>
                    </div>
                    <div className="pt-4 border-t border-stone-200">
                      <div className="text-sm text-slate-500 mb-1">Qiymət</div>
                      <div className="text-3xl font-bold text-amber-600">{masterclass.qiymet} AZN</div>
                    </div>
                  </div>
                </div>

                <Link href="/telebe-qeydiyyat">
                  <Button className="w-full py-6 bg-amber-600 text-white font-medium hover:bg-amber-700 transition-colors rounded-lg text-lg">
                    Qeydiyyatdan Keç
                    <ArrowLeft className="ml-2 h-5 w-5 rotate-180" />
                  </Button>
                </Link>

                <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
                  <h4 className="font-semibold text-amber-900 mb-2">Əlaqə</h4>
                  <p className="text-sm text-amber-800 mb-3">
                    Ətraflı məlumat üçün bizimlə əlaqə saxlayın
                  </p>
                  <a href="tel:+994517696181" className="text-amber-600 font-medium hover:text-amber-700">
                    📲 +994 51 769 61 81
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

