'use client';

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import CourseCatalog from './components/CourseCatalog';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import LeadCaptureModal from './components/LeadCaptureModal';

export default function LandingPage() {
  const [activeSection, setActiveSection] = useState('home');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar onNavigate={setActiveSection} activeSection={activeSection} />

      <main>
        {/* Hero Section */}
        <Hero 
          onStart={() => setIsModalOpen(true)} 
          onInvest={() => setIsModalOpen(true)} 
        />

        {/* About Section */}
        <section id="about" className="py-24 bg-white">
          <AboutSection />
        </section>

        {/* Courses Section */}
        <section id="courses" className="py-24 bg-slate-50">
          <CourseCatalog />
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-white">
          <ContactSection />
        </section>
      </main>

      <Footer />

      {/* Lead Capture Modal */}
      <LeadCaptureModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}