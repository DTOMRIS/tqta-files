'use client';

import React, { useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CourseCatalog from "./components/CourseCatalog";
import AboutSection from "./components/AboutSection";
import WorkshopsSection from "./components/WorkshopsSection";
import Instructors from "./components/Instructors";
import Testimonials from "./components/Testimonials";
import ContactSection from "./components/ContactSection";
import CareerAssessment from "./components/CareerAssessment";
import Footer from "./components/Footer";
import AISousChef from "./components/AISousChef";
import LeadCaptureModal from "./components/LeadCaptureModal";
import WelcomePopup from "./components/WelcomePopup";
import JobTicker from "./components/JobTicker";
import EmployerSection from "./components/EmployerSection";
import CorporateSection from "./components/CorporateSection";
import CookieConsent from "./components/CookieConsent";

enum Section {
  HERO = "hero",
  ABOUT = "about",
  ASSESSMENT = "assessment",
  WORKSHOPS = "workshops",
  COURSES = "courses",
  INVESTMENT = "investment",
  CONTACT = "contact",
}

export default function LandingPage() {
  const [activeSection, setActiveSection] = useState<Section>(Section.HERO);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const triggerLeadModal = () => setIsLeadModalOpen(true);

  return (
    <div className="min-h-screen flex flex-col scroll-smooth">
      <Navbar onNavigate={setActiveSection as any} activeSection={activeSection as any} />

      <main className="flex-grow">
        {/* HERO */}
        <section id="home">
          <Hero onStart={triggerLeadModal} onInvest={triggerLeadModal} />
        </section>

        {/* JOB TICKER - Kayan iş ilanları */}
        <JobTicker />

        {/* ABOUT */}
        <section id="about" className="py-24 bg-slate-50">
          <AboutSection />
        </section>

        {/* ASSESSMENT */}
        <section id="assessment" className="py-24 bg-white">
          <CareerAssessment />
        </section>

        {/* WORKSHOPS */}
        <section id="workshops" className="py-24 bg-white">
          <WorkshopsSection />
        </section>

        {/* INSTRUCTORS */}
        <section className="py-24 bg-slate-50">
          <Instructors />
        </section>

        {/* COURSES */}
        <section id="courses" className="py-24 bg-white">
          <CourseCatalog />
        </section>

        {/* CORPORATE - Korporativ Həllər */}
        <section id="corporate" className="py-24 bg-slate-50">
          <CorporateSection />
        </section>

        {/* EMPLOYER SECTION - İşəgötürənlər & Tərəfdaşlar */}
        <EmployerSection />

        {/* TESTIMONIALS */}
        <section className="py-24 bg-gradient-to-b from-white to-slate-50">
          <Testimonials />
        </section>

        {/* AI Bələdçi Section */}
        <section id="beledchi" className="py-24 bg-[#0A192F]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">AI Bələdçi ilə Danış</h2>
              <p className="text-slate-400">7/24 suallarınıza cavab veririk</p>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-24 bg-slate-50">
          <ContactSection />
        </section>
      </main>

      <Footer />

      {/* Welcome Popup - 5 saniyə sonra açılır */}
      <WelcomePopup onOpenLeadModal={triggerLeadModal} />

      {/* Sales Lead Capture Modal */}
      <LeadCaptureModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
      />

      {/* AI Sous Chef - Floating */}
      <AISousChef />

      {/* Cookie Consent Banner */}
      <CookieConsent />
    </div>
  );
}
