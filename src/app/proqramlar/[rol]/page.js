'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Clock, Users, Award, CheckCircle } from 'lucide-react';

// Slug mapping - URL'den gelen slug'ı decode et
const slugMap = {
  'aspaz-bacariqlari': 'aspaz-bacariqlari',
  'aşpaz-bacariqları': 'aspaz-bacariqlari',
  'barista-bacariqlari': 'barista-bacariqlari',
  'restoran-xidmeti': 'restoran-xidmeti',
  'turizm-ve-qonaqlama-ingilisce': 'turizm-ve-qonaqlama-ingilisce',
};

// Program verileri (Statik Veri - API hatasını önler)
const programs = {
  'aspaz-bacariqlari': {
    name: "Aşpaz Bacarıqları",
    level: "CTH Level 2 Award in Cookery Skills",
    duration: "12 Həftə",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=80",
    kategori: "Kulinari",
    desc: "Peşəkar aşpazlıq texnikaları və beynəlxalq standartlarda təhsil",
    detayliTəsvir: "Bu proqram sizə peşəkar aşpazlıq texnikalarını öyrədir. Bıçaq istifadəsi, yemək hazırlama metodları, porsiya nəzarəti və təqdimat sənəti kimi əsas bacarıqları əhatə edir.",
    modullar: [
      "Bıçaq texnikaları və təhlükəsizlik",
      "Yemək hazırlama metodları",
      "Porsiya nəzarəti və standartlar",
      "Təqdimat və plating",
      "Mətbəx gigiyenası"
    ],
    sertifikat: "CTH Level 2 Award in Cookery Skills",
    qiymet: "Müqavilə əsasında",
    baslamaTarixi: "Hər ay yeni qrup"
  },
  'barista-bacariqlari': {
    name: "Barista Bacarıqları",
    level: "CTH Level 2 Award in Barista Skills",
    duration: "8 Həftə",
    image: "https://images.unsplash.com/photo-1612203985729-70726954388c?w=1200&q=80",
    kategori: "Kafe",
    desc: "Espresso hazırlama, latte art və kofe sənəti",
    detayliTəsvir: "Professional barista olmaq üçün lazım olan bütün bacarıqları öyrənin. Espresso hazırlama, süd köpürtmə, latte art və müştəri xidməti daxil olmaqla geniş spektrumda təhsil alın.",
    modullar: [
      "Qəhvə növləri və xüsusiyyətləri",
      "Espresso hazırlama texnikaları",
      "Süd köpürtmə və temperatur nəzarəti",
      "Latte Art əsasları",
      "Müştəri xidməti və kommunikasiya"
    ],
    sertifikat: "CTH Level 2 Award in Barista Skills",
    qiymet: "Müqavilə əsasında",
    baslamaTarixi: "Hər ay yeni qrup"
  },
  'restoran-xidmeti': {
    name: "Restoran Xidməti",
    level: "CTH Level 2 Certificate in Professional Restaurant Front of House Service",
    duration: "10 Həftə",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
    kategori: "Restoran",
    desc: "Qonaq xidməti, restoran idarəetməsi və peşəkar xidmət standartları",
    detayliTəsvir: "Restoran xidməti sahəsində peşəkar olmaq üçün lazım olan bütün bacarıqları mənimsəyin. Qonaq qarşılama, sifariş qəbulu, masaya xidmət və müştəri məmnuniyyəti kimi əsas məsələləri öyrənin.",
    modullar: [
      "Qonaq qarşılama və yönləndirmə",
      "Sifariş qəbulu və qeydiyyat",
      "Masaya xidmət texnikaları",
      "İçki xidməti və məsləhət",
      "Müştəri məmnuniyyəti və problem həlli"
    ],
    sertifikat: "CTH Level 2 Certificate in Professional Restaurant Front of House Service",
    qiymet: "Müqavilə əsasında",
    baslamaTarixi: "Hər ay yeni qrup"
  },
  'turizm-ve-qonaqlama-ingilisce': {
    name: "Turizm və Qonaqlama İngiliscəsi",
    level: "CTH Level 1 Certificate in English for Tourism and Hospitality",
    duration: "16 Həftə",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80",
    kategori: "Turizm",
    desc: "Turizm və qonaqlama sənayesi üçün xüsusi İngilis dili təhsili",
    detayliTəsvir: "Turizm və qonaqlama sənayesində işləmək üçün lazım olan İngilis dili bacarıqlarını inkişaf etdirin. Müştəri xidməti, rezervasiya, şikayət həlli və peşəkar ünsiyyət kimi sahələri əhatə edir.",
    modullar: [
      "Əsas söhbət və salamlaşma",
      "Rezervasiya və yerləşdirmə",
      "Müştəri xidməti dialoqları",
      "Şikayət həlli və problem həll",
      "Peşəkar yazılı kommunikasiya"
    ],
    sertifikat: "CTH Level 1 Certificate in English for Tourism and Hospitality",
    qiymet: "Müqavilə əsasında",
    baslamaTarixi: "Hər ay yeni qrup"
  }
};

export default function ProgramDetayPage({ params }) {
  const { slug } = use(params);
  
  // Slug'ı decode et ve normalize et
  let decodedSlug = '';
  try {
    decodedSlug = decodeURIComponent(slug || '');
  } catch (e) {
    decodedSlug = slug || '';
  }
  
  const normalizedSlug = slugMap[decodedSlug] || 
                          slugMap[decodedSlug.toLowerCase()] || 
                          slugMap[slug] ||
                          slug || 
                          'aspaz-bacariqlari';
  
  const program = programs[normalizedSlug] || programs['aspaz-bacariqlari'];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-32 bg-slate-900">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-slate-900/90 z-10" />
          {/* Next.js Image yerine normal img kullanarak hatayı ekarte ettik */}
          <img 
            src={program.image}
            alt={program.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 max-w-6xl mx-auto px-6">
          <Link href="/landing#programlar" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Geri</span>
          </Link>

          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-amber-500/20 text-amber-300 text-sm rounded-full font-medium">
                {program.kategori}
              </span>
              <span className="px-3 py-1 bg-white/10 text-white text-sm rounded-full">
                {program.level}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl text-white mb-6 leading-tight font-serif">
              {program.name}
            </h1>

            <p className="text-xl text-white/70 mb-8 leading-relaxed">
              {program.desc}
            </p>

            <div className="flex flex-wrap gap-6 text-white/60">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{program.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                <span>{program.sertifikat}</span>
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
                  Proqram Haqqında
                </h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {program.detayliTəsvir}
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6 font-serif">
                  Proqram Modulları
                </h3>
                <div className="space-y-4">
                  {program.modullar.map((modul, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 bg-stone-50 rounded-lg border border-stone-200">
                      <CheckCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-1">{modul}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="bg-stone-50 p-6 rounded-lg border border-stone-200">
                  <h3 className="font-bold text-slate-900 mb-4">Proqram Məlumatları</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-slate-500 mb-1">Müddət</div>
                      <div className="font-semibold text-slate-900">{program.duration}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-500 mb-1">Sertifikat</div>
                      <div className="font-semibold text-slate-900">{program.sertifikat}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-500 mb-1">Başlama Tarixi</div>
                      <div className="font-semibold text-slate-900">{program.baslamaTarixi}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-500 mb-1">Qiymət</div>
                      <div className="font-semibold text-slate-900">{program.qiymet}</div>
                    </div>
                  </div>
                </div>

                <Link href="/telebe-qeydiyyat">
                  <Button className="w-full py-6 bg-amber-600 text-white font-medium hover:bg-amber-700 transition-colors rounded-lg text-lg">
                    Qeydiyyatdan Keç
                    <ArrowRight className="ml-2 h-5 w-5" />
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
// Git update fix