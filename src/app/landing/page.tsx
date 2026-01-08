'use client';

import React, { useState } from 'react';
import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import CourseCatalog from '@/components/landing/CourseCatalog';
import InvestmentBridge from '@/components/landing/InvestmentBridge';
import StudentDashboard from '@/components/landing/StudentDashboard';
import AboutSection from '@/components/landing/AboutSection';
import WorkshopsSection from '@/components/landing/WorkshopsSection';
import Instructors from '@/components/landing/Instructors';
import Testimonials from '@/components/landing/Testimonials';
import ContactSection from '@/components/landing/ContactSection';
import CareerAssessment from '@/components/landing/CareerAssessment';
import SuccessSimulator from '@/components/landing/SuccessSimulator';
import Footer from '@/components/landing/Footer';
import AISousChef from '@/components/landing/AISousChef';
import LeadCaptureModal from '@/components/landing/LeadCaptureModal';

enum Section {
  HERO = 'hero',
  ABOUT = 'about',
  ASSESSMENT = 'assessment',
  SIMULATOR = 'simulator',
  WORKSHOPS = 'workshops',
  COURSES = 'courses',
  INVESTMENT = 'investment',
  CONTACT = 'contact',
}

export default function LandingPage() {
  const [activeSection, setActiveSection] = useState<Section>(Section.HERO);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const triggerLeadModal = () => setIsLeadModalOpen(true);

  return (
    <div className="min-h-screen flex flex-col scroll-smooth">
      <Navbar onNavigate={setActiveSection} activeSection={activeSection} />
      
      <main className="flex-grow">
        <Hero 
          onStart={triggerLeadModal} 
          onInvest={triggerLeadModal} 
        />
        
        <section id="about" className="py-24 bg-slate-50">
          <AboutSection />
        </section>

        <section id="assessment" className="py-24 bg-white">
          <CareerAssessment />
        </section>

        <section id="simulator" className="py-24 bg-slate-50 border-y border-slate-100">
          <SuccessSimulator />
        </section>

        <section id="workshops" className="py-24 bg-white">
          <WorkshopsSection />
        </section>

        <section className="py-24 bg-slate-50">
          <Instructors />
        </section>

        <section id="courses" className="py-24 bg-white">
          <CourseCatalog />
        </section>

        <section id="investment" className="py-24 bg-slate-50">
          <InvestmentBridge />
        </section>

        <section className="py-24 bg-[#0A192F] text-white">
          <Testimonials />
        </section>

        <section id="dashboard" className="py-24 bg-white border-t border-slate-100">
          <StudentDashboard />
        </section>

        <section id="contact" className="py-24 bg-slate-50">
          <ContactSection />
        </section>
      </main>

      <Footer />
      
      {/* Sales Lead Capture */}
      <LeadCaptureModal 
        isOpen={isLeadModalOpen} 
        onClose={() => setIsLeadModalOpen(false)} 
      />

      {/* AI Agents */}
      <AISousChef />
    </div>
  );
}
  }