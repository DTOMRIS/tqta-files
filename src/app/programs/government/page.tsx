'use client';

import React, { useState } from 'react';
import Navbar from '@/app/landing/components/Navbar';
import Footer from '@/app/landing/components/Footer';
import LeadCaptureModal from '@/app/landing/components/LeadCaptureModal';
import { CheckCircle, Phone, MapPin, Clock, Users, Award, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const NAVY_BLUE = '#0A192F';
const GOLD = '#C5A022';

const GovernmentProgram = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const programs = [
    {
      title: 'Peşəkar Aşpazlıq',
      duration: '2 ay (292 saat)',
      format: 'Gündə 8 saat, həftədə 5 gün',
      jobPlacement: 'Var',
      description: 'Mətbəx cariyerinə tam donanımlı başlayın'
    },
    {
      title: 'Peşəkar Restoran Oficiantı',
      duration: '1 ay (180 saat)',
      format: 'Gündə 8 saat, həftədə 5 gün',
      jobPlacement: 'Var',
      description: 'Elit restoranlar üçün profesyonel xidmət'
    },
    {
      title: 'Professional Barista Hazırlığı',
      duration: '1 ay (84 saat)',
      format: 'Gündə 4 saat, həftədə 5 gün',
      jobPlacement: 'Var',
      description: 'Premium qəhvə dünyasına girişiniz'
    },
    {
      title: 'Professional Barmen Hazırlığı',
      duration: '1 ay (84 saat)',
      format: 'Gündə 4 saat, həftədə 5 gün',
      jobPlacement: 'Var',
      description: 'Bar sənətinin profesyonal mənimsənilməsi'
    },
    {
      title: 'Restoran Əməliyyat İdarəçiliyi',
      duration: '1 ay (84 saat)',
      format: 'Gündə 4 saat, həftədə 5 gün',
      jobPlacement: 'Var',
      description: 'Restoran idarəetməsinin hərtərəfli bilgisi'
    },
    {
      title: 'Turizm və Otel Xidmətləri',
      duration: '1 ay (65-84 saat)',
      format: 'Gündə 3-4 saat, həftədə 5 gün',
      jobPlacement: 'Var',
      description: 'Turizm sektorunun profesyonal həddinə giriş'
    }
  ];

  const requirements = [
    '18 yaşdan yuxarı olmaq',
    'Orta səviyyə təhsil',
    'Sağlamlıq arayışı',
    'İş etməyə maraqlanmaq'
  ];

  const benefits = [
    'Tamamilə PULSUZ təhsil',
    'Aylıq stimul ödəməsi',
    'Real iş təcrübəsi',
    'İşlə təmin olunma',
    'Beynəlxalq sertifikat',
    'Türkiyəyə iş imkanları'
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      {/* Hero Section */}
      <div style={{ backgroundColor: NAVY_BLUE }} className="text-white pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Dövlət Dəstəkli Təhsil Proqramı
              </h1>
              <p className="text-xl mb-8 text-gray-200">
                İşsiz olmağınız halında siz TAMAMILƏ PULSUZ olaraq peşəkar təhsil alaraq düzəltmə garantisi alacaqsınız.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-white text-navy-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center gap-2"
              >
                Qeydiyyat Et <ArrowRight size={20} />
              </button>
            </div>
            <div style={{ backgroundColor: GOLD }} className="rounded-lg p-8 text-navy-900">
              <h2 className="text-2xl font-bold mb-6">Sizə Nə Qalanır?</h2>
              <div className="space-y-4">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle size={24} style={{ color: NAVY_BLUE }} />
                    <span className="text-lg font-semibold">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: NAVY_BLUE }}>
            Proses Necə İşləyir?
          </h2>
          <div className="grid md:grid-cols-5 gap-4">
            {[
              { step: 1, title: 'Qeydiyyat', desc: 'Online forma doldur' },
              { step: 2, title: 'Sənədlər', desc: 'Lazımi sənədləri təqdim et' },
              { step: 3, title: 'Müsahibə', desc: 'Şəxsi müsahibə keç' },
              { step: 4, title: 'Qəbul', desc: 'Proqramda yerini tutal' },
              { step: 5, title: 'Tədris', desc: 'Peşəkar ol və işlə çıx' }
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div
                  style={{ backgroundColor: GOLD }}
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-2xl text-white"
                >
                  {item.step}
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Requirements */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8" style={{ color: NAVY_BLUE }}>
            Qəbul Şərtləri
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {requirements.map((req, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 border-l-4" style={{ borderColor: GOLD }}>
                <CheckCircle size={24} style={{ color: GOLD }} className="flex-shrink-0 mt-1" />
                <span className="text-lg">{req}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Programs */}
      <div className="py-16" style={{ backgroundColor: '#F5F5F5' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center" style={{ color: NAVY_BLUE }}>
            Mövcud Proqramlar
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {programs.map((program, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <h3 className="text-xl font-bold mb-4" style={{ color: NAVY_BLUE }}>
                  {program.title}
                </h3>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Clock size={20} style={{ color: GOLD }} />
                    <span>{program.duration}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Users size={20} style={{ color: GOLD }} />
                    <span>{program.format}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Award size={20} style={{ color: GOLD }} />
                    <span>İşlə təminat: {program.jobPlacement}</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{program.description}</p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-2 rounded font-semibold transition"
                  style={{ backgroundColor: GOLD, color: NAVY_BLUE }}
                >
                  Ətraflı Məlumat Al
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div style={{ backgroundColor: NAVY_BLUE }} className="text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Bizimlə Əlaqə Saxlayın</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start gap-4">
              <Phone size={32} style={{ color: GOLD }} className="flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-2">Telefon</h3>
                <p className="text-xl">+994 51 769 61 81</p>
                <p className="text-gray-300 text-sm mt-2">(Hər gün 9:00-18:00)</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin size={32} style={{ color: GOLD }} className="flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-2">Ünvan</h3>
                <p className="text-lg">Sumqayıt şəhəri</p>
                <p className="text-lg">S.Vurgun küç. 86</p>
              </div>
            </div>
          </div>
          <div className="mt-10 text-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-navy-900 px-12 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition"
            >
              İndi Qeydiyyat Et
            </button>
          </div>
        </div>
      </div>

      <Footer />
      
      {isModalOpen && (
        <LeadCaptureModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          source="government-program"
        />
      )}
    </div>
  );
};

export default GovernmentProgram;
