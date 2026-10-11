/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ThreeInteriorStudio } from './components/ThreeInteriorStudio';
import { PortfolioSection } from './components/PortfolioSection';
import { CostEstimator } from './components/CostEstimator';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ConsultationModal } from './components/ConsultationModal';

export default function App() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [activeService, setActiveService] = useState<string>('Complete Home Interior Turnkey');
  const [activeEstimate, setActiveEstimate] = useState<string>('');

  const handleOpenConsultation = (serviceName?: string) => {
    if (serviceName) {
      setActiveService(serviceName);
    }
    setIsConsultationOpen(true);
  };

  const handleSelectServiceFromList = (serviceName: string) => {
    setActiveService(serviceName);
    // Smooth scroll to contact section with service selected
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTransferEstimate = (estimateText: string) => {
    setActiveEstimate(estimateText);
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0e12] text-[#e8e6e3] flex flex-col antialiased selection:bg-[#c99f53] selection:text-[#0c0e12]">
      {/* Fixed Top Bar Navigation */}
      <Navbar onOpenConsultation={() => handleOpenConsultation()} />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero onOpenConsultation={() => handleOpenConsultation()} />

        {/* Brand Philosophy & Guwahati Credentials */}
        <AboutSection />

        {/* Comprehensive Verified Offerings */}
        <ServicesSection onSelectService={handleSelectServiceFromList} />

        {/* Purposeful Interactive 3D Studio (Three.js) */}
        <ThreeInteriorStudio />

        {/* Executed Portfolio & Case Studies */}
        <PortfolioSection onOpenConsultation={() => handleOpenConsultation()} />

        {/* Interactive Cost & Scope Estimator */}
        <CostEstimator onTransferEstimate={handleTransferEstimate} />

        {/* Verified Homeowner Reviews */}
        <TestimonialsSection />

        {/* Studio Contact & Web3Forms Lead Capture */}
        <ContactSection
          initialService={activeService}
          initialEstimate={activeEstimate}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Official WhatsApp Button */}
      <FloatingWhatsApp />

      {/* Consultation Booking Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        prefilledService={activeService}
      />
    </div>
  );
}
