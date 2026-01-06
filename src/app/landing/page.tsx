'use client';

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import CareerAssessment from './components/CareerAssessment';
import SuccessSimulator from './components/SuccessSimulator';
import Footer from './components/Footer';
import LeadCaptureModal from './components/LeadCaptureModal';
import InvestmentBridge from './components/InvestmentBridge';
// Riskli listeler şimdilik kapalı, bir sonraki adımda açacağız
// import WorkshopsSection from './components/WorkshopsSection';
// import Instructors from './components/Instructors';
// import CourseCatalog from './components/CourseCatalog';
// import Testimonials from './components/Testimonials';
// import StudentDashboard from './components/StudentDashboard';
import { Section } from './types';

export default function LandingPage() {
  const [activeSection, setActiveSection] = useState<Section>(Section.HERO);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const triggerLeadModal = () => setIsLeadModalOpen(true);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900 overflow-x-hidden selection:bg-[#C5A022] selection:text-white">
      {/* Navbar - Artık çalışmalı çünkü constants.tsx dolu */}
      <Navbar onNavigate={setActiveSection} activeSection={activeSection} />

      <main className="flex-grow pt-20">
        
        {/* Hero Section - Sitenin Vitrini */}
        <div id="home">
            <Hero onStart={triggerLeadModal} onInvest={triggerLeadModal} />
        </div>

        {/* Hakkımızda */}
        <section id="about" className="py-24 bg-white relative overflow-hidden">
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

        {/* Yatırımcı Köprüsü */}
        <section id="investment" className="py-24 bg-[#0A192F] text-white relative">
          <InvestmentBridge />
        </section>

        {/* İletişim */}
        <section id="contact" className="py-24 bg-slate-50 border-t border-slate-200">
          <ContactSection />
        </section>

      </main>

      <Footer />

      {/* Modallar */}
      <LeadCaptureModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
      />
      
    </div>
  );
}