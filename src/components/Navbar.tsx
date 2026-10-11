import React, { useState, useEffect } from 'react';
import { BrandLogo } from './BrandLogo';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenConsultation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Philosophy', href: '#philosophy' },
    { label: 'Services', href: '#services' },
    { label: '3D Studio', href: '#studio-3d' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Estimator', href: '#estimator' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0c0e12]/90 backdrop-blur-md border-b border-[#d4af37]/15 py-3 shadow-xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (Single text/logo lockup, single line) */}
          <a
            href="#"
            className="flex items-center whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#d4af37]"
            aria-label="Interior Adda Homepage"
          >
            <BrandLogo size="md" showTagline={false} />
          </a>

          {/* Zone 2: 5 Clean Single-Line Text Links (whitespace-nowrap) */}
          <nav className="hidden lg:flex items-center gap-7 text-xs tracking-wider uppercase font-medium text-[#b3b9c6]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#ffd700] transition-colors whitespace-nowrap shrink-0 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#ffd700] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="hidden sm:flex items-center gap-4 shrink-0">
            <button
              onClick={onOpenConsultation}
              className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0c0e12] bg-gradient-to-r from-[#eed187] via-[#d4af37] to-[#b38128] hover:from-[#fff0b2] hover:to-[#c99728] rounded-md shadow-[0_2px_12px_rgba(212,175,55,0.25)] hover:shadow-[0_4px_20px_rgba(212,175,55,0.4)] transition-all transform hover:-translate-y-0.5 whitespace-nowrap shrink-0 active:translate-y-0 cursor-pointer"
            >
              Book Free Consultation
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#e8e6e3] hover:text-[#d4af37] focus:outline-none"
              aria-label="Toggle mobile navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0e1117] border-b border-[#d4af37]/20 px-6 py-6 shadow-2xl animate-in slide-in-from-top-2">
          <nav className="flex flex-col gap-4 text-sm font-medium tracking-wide">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#d0d4dc] hover:text-[#ffd700] py-2 border-b border-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-[#0c0e12] bg-gradient-to-r from-[#eed187] via-[#d4af37] to-[#b38128] rounded-md text-center"
              >
                Book Free Consultation
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
