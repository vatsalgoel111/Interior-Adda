import React from 'react';
import { BrandLogo } from './BrandLogo';
import { MapPin, Phone, Mail, Instagram, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#07090c] border-t border-[#d4af37]/20 text-[#9ba4b2] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: Brand & Bio (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <BrandLogo size="md" showTagline={true} />
            <p className="text-xs text-[#8e97a6] leading-relaxed max-w-sm pt-2">
              Interior Adda is Guwahati’s luxury modular interior & turnkey execution studio. Transforming spaces and elevating lives across Assam through bespoke craftsmanship, transparent pricing, and German hardware standards.
            </p>
            <div className="pt-2 text-[11px] text-[#ffd700]">
              <span>Modular Kitchens · Luxury Bedrooms · False Ceilings · Turnkey Execution</span>
            </div>
          </div>

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white font-serif-luxury">
              Quick Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#philosophy" className="hover:text-[#ffd700] transition-colors">
                  Philosophy
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#ffd700] transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#studio-3d" className="hover:text-[#ffd700] transition-colors">
                  3D Studio
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-[#ffd700] transition-colors">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#estimator" className="hover:text-[#ffd700] transition-colors">
                  Cost Estimator
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#ffd700] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Services (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white font-serif-luxury">
              Key Offerings
            </h4>
            <ul className="space-y-2 text-[#8b95a4]">
              <li>Modular Kitchen</li>
              <li>Modular Wardrobe</li>
              <li>Backlit Headboards</li>
              <li>TV Unit Panelling</li>
              <li>Pooja Mandir Units</li>
              <li>Office Renovation</li>
            </ul>
          </div>

          {/* Col 4: Studio Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white font-serif-luxury">
              Guwahati Studio
            </h4>
            <div className="space-y-2 text-xs">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                <span>N.S Road, Fatasil Charali, Guwahati - 781009, Assam</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <a href="tel:+919101668680" className="hover:text-[#ffd700] tabular-nums">
                  +91 91016 68680
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <a href="mailto:interioradda05@gmail.com" className="hover:text-[#ffd700]">
                  interioradda05@gmail.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Instagram className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <a
                  href="https://www.instagram.com/interioradda05/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#ffd700]"
                >
                  @interioradda05
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#717a88]">
          <div>
            © {new Date().getFullYear()} Interior Adda. All rights reserved. Registered Studio in Guwahati, Assam.
          </div>

          <div className="flex items-center gap-6">
            <span>Verified Turnkey & Modular Contractor</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-[#ffd700] transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
