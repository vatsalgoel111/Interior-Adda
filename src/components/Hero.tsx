import React from 'react';
import { ArrowRight, Phone, MessageCircle, MapPin } from 'lucide-react';
import { HeroInteriorVisual } from './HeroInteriorVisual';

interface HeroProps {
  onOpenConsultation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation }) => {
  const verifiedPhone = '9101668680';
  const whatsappUrl = `https://wa.me/91${verifiedPhone}?text=${encodeURIComponent(
    'Hello Interior Adda, I am looking for interior design services for my home in Guwahati. Could we discuss?'
  )}`;

  return (
    <section className="relative pt-28 pb-14 lg:pt-32 lg:pb-16 overflow-hidden bg-[#0c0e12]">
      {/* Background Architectural Ambient Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.12)_0%,_rgba(12,14,18,0)_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 2-Column Split: Editorial Copy on Left, Photorealistic Visual on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: 6.5 Cols */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center">
            {/* Editorial Location Kicker */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#c99f53] mb-3">
              <span>Guwahati Premier Turnkey Studio</span>
              <span aria-hidden="true" className="text-white/20">·</span>
              <span className="flex items-center gap-1 text-[#9fa6b4] lowercase first-letter:uppercase">
                <MapPin className="w-3.5 h-3.5 text-[#c99f53] shrink-0" />
                Fatasil Charali, Ghy-09
              </span>
            </div>

            {/* Headline with Cormorant / DM Serif Display Elegance */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#f7f5f0] font-serif-luxury text-balance leading-[1.12]">
              Transforming <span className="gold-text-gradient font-medium">Spaces</span>,<br className="hidden sm:inline" />{' '}
              Elevating <span className="gold-text-gradient font-medium">Lives</span>.
            </h1>

            {/* Editorial Supporting Description */}
            <p className="mt-5 text-sm sm:text-base text-[#aab3c2] leading-relaxed max-w-xl font-normal">
              Guwahati’s luxury turnkey interior design studio. We bring bespoke modular concepts to life—from modular kitchens and luxury bedrooms to complete residences and commercial spaces.
            </p>

            {/* Verified Starting Rate Card */}
            <div className="mt-6 inline-flex items-center gap-3.5 p-3 sm:p-3.5 rounded-xl bg-gradient-to-r from-[#161a24] via-[#131620] to-[#10131b] border border-[#d4af37]/30 max-w-lg shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
              <div className="px-3 py-1.5 rounded-lg bg-[#d4af37]/15 border border-[#d4af37]/35 text-center shrink-0">
                <span className="block text-[9px] uppercase font-bold tracking-widest text-[#d4af37]">Starts From</span>
                <span className="text-xl sm:text-2xl font-bold font-sans text-[#ffd700] tabular-nums tracking-tight">₹950</span>
                <span className="block text-[9px] text-[#9fa6b2]">/ sq. ft.</span>
              </div>
              <div className="text-xs text-[#cbd3e0] border-l border-white/10 pl-3">
                <span className="font-semibold text-white block text-xs sm:text-sm">Complete Home Interior Solution Under One Roof</span>
                <span className="text-[#8e98a8] text-[11px]">Action TESA HDHMR, German hardware & factory-finished edge precision.</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-7 flex flex-wrap items-center gap-3.5">
              <button
                onClick={onOpenConsultation}
                className="px-5 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#0c0e12] bg-gradient-to-r from-[#eed187] via-[#d4af37] to-[#b38128] hover:from-[#fff0b2] hover:to-[#c99728] rounded-lg shadow-[0_4px_25px_rgba(212,175,55,0.3)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap flex items-center gap-2 cursor-pointer"
              >
                <span>Book Free Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#25d366] bg-[#25d366]/10 hover:bg-[#25d366]/20 border border-[#25d366]/30 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 fill-[#25d366]" />
                <span>WhatsApp Quote</span>
              </a>

              <a
                href={`tel:+91${verifiedPhone}`}
                className="px-3 py-3 text-xs sm:text-sm font-medium text-[#b0b8c6] hover:text-white transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                <span className="tabular-nums">+91 91016 68680</span>
              </a>
            </div>
          </div>

          {/* Right Column: Photorealistic Luxury Living Render */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center">
            <HeroInteriorVisual />
          </div>
        </div>

        {/* 4-Column KPI / Trust Strip */}
        <div className="mt-12 pt-7 border-t border-[#d4af37]/20 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-extrabold font-sans text-[#ffd700] tabular-nums tracking-tight">₹950+</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-white mt-1">Starting Baseline / Sq. Ft.</span>
            <span className="text-xs text-[#8a93a2] mt-0.5">Transparent turnkey pricing</span>
          </div>

          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-extrabold font-sans text-[#ffd700] tabular-nums tracking-tight">45 Days</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-white mt-1">Guaranteed Handover</span>
            <span className="text-xs text-[#8a93a2] mt-0.5">Milestone schedule commitment</span>
          </div>

          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-extrabold font-sans text-[#ffd700] tabular-nums tracking-tight">100%</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-white mt-1">Factory-Finished Precision</span>
            <span className="text-xs text-[#8a93a2] mt-0.5">Machine-calibrated edge-banding</span>
          </div>

          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-extrabold font-sans text-[#ffd700] tabular-nums tracking-tight">Free</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-white mt-1">3D Visualization & Visit</span>
            <span className="text-xs text-[#8a93a2] mt-0.5">On-site site inspection in Guwahati</span>
          </div>
        </div>
      </div>
    </section>
  );
};

