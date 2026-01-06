'use client';

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CourseCatalog from './components/CourseCatalog';
import InvestmentBridge from './components/InvestmentBridge';
import StudentDashboard from './components/StudentDashboard';
import AboutSection from './components/AboutSection';
import WorkshopsSection from './components/WorkshopsSection';
import Instructors from './components/Instructors';
import Testimonials from './components/Testimonials';
import ContactSection from './components/ContactSection';
import CareerAssessment from './components/CareerAssessment';
import SuccessSimulator from './components/SuccessSimulator';
import Footer from './components/Footer';
import AISousChef from './components/AISousChef';
import LeadCaptureModal from './components/LeadCaptureModal';
import Beledchiniz from './components/Beledchiniz';
import { Section } from './types';

export default function LandingPage() {
  const [activeSection, setActiveSection] = useState<Section>(Section.HERO);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const triggerLeadModal = () => setIsLeadModalOpen(true);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900 overflow-x-hidden selection:bg-gold selection:text-white">
      {/* Navbar */}
      <Navbar onNavigate={setActiveSection} activeSection={activeSection} />

      <main className="flex-grow pt-20"> {/* Navbar için üstten boşluk */}
        
        {/* Hero Section */}
        <div id="home">
            <Hero onStart={triggerLeadModal} onInvest={triggerLeadModal} />
        </div>

        {/* Hakkımızda */}
        <section id="about" className="py-24 bg-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
          <AboutSection />
        </section>

        {/* Kariyer Testi */}
        <section id="assessment" className="py-24 bg-slate-50 border-y border-slate-200">
          <CareerAssessment />
        </section>

        {/* Başarı Simülatörü */}
        <section id="simulator" className="py-24 bg-white">
          <SuccessSimulator />
        </section>

        {/* Atölyeler */}
        <section id="workshops" className="py-24 bg-slate-50">
          <WorkshopsSection />
        </section>

        {/* Eğitmenler */}
        <section className="py-24 bg-white border-t border-slate-100">
          <Instructors />
        </section>

        {/* Kurs Kataloğu */}
        <section id="courses" className="py-24 bg-slate-50">
          <CourseCatalog />
        </section>

        {/* Yatırımcı Köprüsü */}
        <section id="investment" className="py-24 bg-navy text-white relative">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80')] opacity-5 bg-cover bg-center mix-blend-overlay"></div>
          <InvestmentBridge />
        </section>

        {/* Öğrenci Yorumları */}
        <section className="py-24 bg-[#0A192F] text-white border-t border-slate-700">
          <Testimonials />
        </section>

        {/* Öğrenci Paneli Önizleme */}
        <section id="dashboard" className="py-24 bg-white">
          <StudentDashboard />
        </section>

        {/* İletişim */}
        <section id="contact" className="py-24 bg-slate-50 border-t border-slate-200">
          <ContactSection />
        </section>

      </main>

      <Footer />

      {/* Modallar ve AI Asistanlar */}
      <LeadCaptureModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
      />
      <AISousChef />
      <Beledchiniz />
    </div>
  );
}