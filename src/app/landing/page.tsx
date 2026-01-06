'use client';

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CourseCatalog from './components/CourseCatalog';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { Section } from './types';

export default function LandingPage() {
  const [activeSection, setActiveSection] = useState<Section>(Section.HERO);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
      
      {/* Navbar artık çalışacak */}
      <Navbar onNavigate={setActiveSection} activeSection={activeSection} />

      <main className="flex-grow pt-10">
        
        <Hero onStart={() => {}} onInvest={() => {}} />

        {/* Premium Kurslar */}
        <section id="courses" className="py-24 bg-slate-50">
          <CourseCatalog />
        </section>

        <section id="contact" className="py-24 bg-slate-50 border-t border-slate-200">
          <ContactSection />
        </section>

      </main>

      {/* Footer artık çalışacak */}
      <Footer />
    </div>
  );
}