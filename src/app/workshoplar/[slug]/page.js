'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, User, MapPin, Calendar, CheckCircle } from 'lucide-react';

// Workshop verileri (gerçekte API'den gelecek)
const workshops = {
  'azerbaycan-kabablarinin-sirleri': {
    name: "Azərbaycan Kabablarının Sirləri",
    muellim: "Peşəkar Aşpaz",
    muddet: "3 saat",
    qiymet: 45,
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=80",
    kategori: "Kulinari",
    tarix: "Hər ay",
    yer: "TQTA Mətbəxi",
    desc: "Azərbaycan mətbəxinin əvəzolunmaz ləzzəti olan kababların sirlərini öyrənmək istəyirsiniz?",
    detayliTəsvir: "3 saat ərzində həm nəzəri, həm də praktiki təcrübə qazanacaq və ətlə bağlı bütün suallarınıza cavab tapacaqsınız. Doğru ət seçimi, marinasiya qaydaları, kömür və manqal istifadəsi, kabab bişirmə sirləri və düzgün təqdimat kimi bütün məsələləri əhatə edirik.",
    texnikalar: [
      "Doğru ət seçimi və kəsim texnikaları",
      "Marinasiya qaydaları",
      "Kömür və manqal istifadəsi",
      "Kabab bişirmə sirləri",
      "Düzgün təqdimat"
    ],
    menyu: [
      "Lülə kabab (quzu və dana əti qarışığı ilə)",
      "Tikə kabab (quzu əti ilə)",
      "Antrikot kabab (dana əti ilə)",
      "Cız-bız",
      "Quyruq kabab",
      "Xüsusi marinasiya hazırlanması",
      "Köz pomidor və bibər",
      "Sumaq və göyərti ilə təqdimat"
    ],
    xidmetler: [
      "Bütün ət növləri və əlavə məhsullar",
      "Xüsusi kabab ləvazimatları istifadəsi",
      "Təndir çörəyi",
      "Təzə göyərti və ədviyyatlar"
    ]
  },
  'sadece-espresso-italyan-notalari': {
    name: "Sadəcə Espresso: İtalyan Notaları",
    muellim: "Usta Barista",
    muddet: "3 saat",
    qiymet: 30,
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1200&q=80",
    kategori: "Kafe",
    tarix: "Hər həftə",
    yer: "TQTA Mətbəxi",
    desc: "Professional avadanlıqlardan istifadə edərək düzgün üsullarla ideal Espresso hazırlamağı öyrənin",
    detayliTəsvir: "Espressonun təməli İtaliyada qoyulmuş ola bilər, amma bunun üçün İtaliyaya getməyinizə ehtiyac yoxdur. Bu zəngin, aromatik və məxməri ləzzəti uzaqlarda axtarmayın, TQTA-nın xüsusi barista sinfində yerinizi alın.",
    texnikalar: [
      "Espresso hazırlamanın sirləri",
      "Südü professional şəkildə köpürtmənin yolları",
      "Ürək və yarpaq formalı əfsanəvi Latte Art",
      "Qəhvə növləri və onların unikal xüsusiyyətləri"
    ],
    menyu: [
      "Həqiqi İtalyan Espressosu",
      "Klassik Cappuccino",
      "Məxməri Caffè Latte",
      "Ənənəvi Flat White"
    ],
    xidmetler: [
      "Professional qəhvə avadanlıqları",
      "Bütün lazımi məhsullar",
      "Praktiki təcrübə",
      "Sertifikat"
    ]
  }
};

export default function WorkshopDetayPage({ params }) {
  // Next.js 15: params artık Promise, unwrap etmeliyiz
  const { slug } = use(params);
  const workshop = workshops[slug] || workshops['azerbaycan-kabablarinin-sirleri'];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-32 bg-slate-900">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-slate-900/90 z-10" />
          <img 
            src={workshop.image}
            alt={workshop.name}
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
                {workshop.kategori}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl text-white mb-6 leading-tight font-serif">
              {workshop.name}
            </h1>

            <p className="text-xl text-white/70 mb-8 leading-relaxed">
              {workshop.desc}
            </p>

            <div className="flex flex-wrap gap-6 text-white/60">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{workshop.muddet}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>{workshop.muellim}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>{workshop.yer}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{workshop.tarix}</span>
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
                  Workshop Haqqında
                </h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {workshop.detayliTəsvir}
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6 font-serif">
                  Öyrədiləcək Texnikalar
                </h3>
                <div className="space-y-4">
                  {workshop.texnikalar.map((texnika, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 bg-stone-50 rounded-lg border border-stone-200">
                      <CheckCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-slate-900">{texnika}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {workshop.menyu && (
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 font-serif">
                    Workshop Menyusu
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {workshop.menyu.map((item, i) => (
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

              {workshop.xidmetler && (
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 font-serif">
                    Dərsə Daxildir
                  </h3>
                  <div className="space-y-2">
                    {workshop.xidmetler.map((xidmet, i) => (
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
                  <h3 className="font-bold text-slate-900 mb-4">Workshop Məlumatları</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-slate-500 mb-1">Müddət</div>
                      <div className="font-semibold text-slate-900">{workshop.muddet}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-500 mb-1">Müəllim</div>
                      <div className="font-semibold text-slate-900">{workshop.muellim}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-500 mb-1">Yer</div>
                      <div className="font-semibold text-slate-900">{workshop.yer}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-500 mb-1">Tarix</div>
                      <div className="font-semibold text-slate-900">{workshop.tarix}</div>
                    </div>
                    <div className="pt-4 border-t border-stone-200">
                      <div className="text-sm text-slate-500 mb-1">Qiymət</div>
                      <div className="text-3xl font-bold text-amber-600">{workshop.qiymet} AZN</div>
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

