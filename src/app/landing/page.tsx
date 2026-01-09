'use client';

import React, { useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CourseCatalog from "./components/CourseCatalog";
import InvestmentBridge from "./components/InvestmentBridge";
import StudentDashboard from "./components/StudentDashboard";
import AboutSection from "./components/AboutSection";
import WorkshopsSection from "./components/WorkshopsSection";
import Instructors from "./components/Instructors";
import Testimonials from "./components/Testimonials";
import ContactSection from "./components/ContactSection";
import CareerAssessment from "./components/CareerAssessment";
import Footer from "./components/Footer";
import AISousChef from "./components/AISousChef";
import LeadCaptureModal from "./components/LeadCaptureModal";

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

        {/* ABOUT */}
        <section id="about" className="py-24 bg-slate-50">
          <AboutSection />
        </section>

        {/* ASSESSMENT */}
        <section id="assessment" className="py-24 bg-white">
          <CareerAssessment />
        </section>

        {/* WORKSHOPS (Səndə yox idi, əlavə etdim) */}
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

        {/* PARTNERSHIP / INVESTMENT */}
        <section id="investment" className="py-24 bg-slate-50">
          <InvestmentBridge />
        </section>

        {/* TESTIMONIALS */}
        <section className="py-24 bg-[#0A192F] text-white">
          <Testimonials />
        </section>

        {/* DASHBOARD (navbar linki yoxdursa belə qala bilər) */}
        {/* <section id="dashboard" className="py-24 bg-white border-t border-slate-100">
          <StudentDashboard />
        </section> */}

        {/* CONTACT */}
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
