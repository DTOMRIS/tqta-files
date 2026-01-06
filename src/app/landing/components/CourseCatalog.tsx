import React from 'react';
import { Clock, Award, BookOpen, ArrowRight } from 'lucide-react';

// VERİLERİ DİREKT BURAYA YAZIYORUZ (Garanti Yöntem)
const COURSES = [
  {
    id: "pro-chef",
    title: "Professional Aşpazlıq",
    level: "CTH Level 2",
    duration: "6 Ay",
    description: "Beynəlxalq standartlarda professional aşpazlıq təhsili.",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80",
    modules: 12,
  },
  {
    id: "pastry",
    title: "Şirniyyat Sənəti",
    level: "CTH Level 2",
    duration: "4 Ay",
    description: "Modern və klassik şirniyyatların hazırlanması.",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80",
    modules: 8,
  },
  {
    id: "service",
    title: "Restoran Xidməti",
    level: "CTH Level 2",
    duration: "3 Ay",
    description: "Yüksək səviyyəli restoran xidməti və qonaqpərvərlik.",
    image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&q=80",
    modules: 6,
  }
];

const CourseCatalog = () => {
  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Başlık Bölümü */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-sm font-medium mb-6">
          <span className="w-2 h-2 rounded-full bg-[#C5A022]"></span>
          Peşəkar Təhsil
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-[#0A192F] mb-6 font-serif">
          Gələcəyinizi <span className="text-[#C5A022] italic">bişirin</span>
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
          CTH (UK) akkreditasiyalı diplom proqramları ilə beynəlxalq karyeranıza ilk addımı atın.
        </p>
      </div>

      {/* Kartlar Izgarası */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {COURSES.map((course) => (
          <div 
            key={course.id} 
            className="group bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
          >
            {/* Görsel Alanı */}
            <div className="relative h-64 overflow-hidden">
              <div className="absolute top-4 left-4 z-10">
                <span className="px-4 py-2 bg-white/95 backdrop-blur rounded-xl text-xs font-bold text-[#0A192F] shadow-sm uppercase tracking-wider">
                  {course.level}
                </span>
              </div>
              <img 
                src={course.image} 
                alt={course.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/80 via-transparent to-transparent opacity-60"></div>
            </div>

            {/* İçerik Alanı */}
            <div className="p-8 flex-grow flex flex-col">
              <h3 className="text-2xl font-bold text-[#0A192F] mb-3 group-hover:text-[#C5A022] transition-colors">
                {course.title}
              </h3>
              
              <p className="text-slate-500 mb-6 line-clamp-2 text-sm leading-relaxed">
                {course.description}
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center text-slate-600 text-sm">
                  <Clock className="w-4 h-4 mr-3 text-[#C5A022]" />
                  {course.duration}
                </div>
                <div className="flex items-center text-slate-600 text-sm">
                  <BookOpen className="w-4 h-4 mr-3 text-[#C5A022]" />
                  {course.modules} Modul
                </div>
                <div className="flex items-center text-slate-600 text-sm">
                  <Award className="w-4 h-4 mr-3 text-[#C5A022]" />
                  Beynəlxalq Sertifikat
                </div>
              </div>

              <div className="mt-auto">
                <button className="w-full py-4 bg-[#0A192F] text-white rounded-xl font-medium flex items-center justify-center gap-2 group-hover:bg-[#C5A022] transition-colors duration-300">
                  Tədris Planı
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseCatalog;