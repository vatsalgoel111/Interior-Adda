import React from 'react';
import { ShieldCheck, Users, Clock, Compass, Award, CheckCircle } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Super Quality Craftsmanship',
      description:
        'We exclusively use boiling water-proof (BWP) and high-density moisture-resistant (HDHMR) core boards with German soft-close hardware (Hettich & Blum standards).',
      metric: '10-Year Hardware Warranty',
    },
    {
      icon: Users,
      title: 'Experienced In-House Team',
      description:
        'Architects, 3D visualization designers, master carpenters, and electrical specialists collaborate to eliminate third-party miscommunication.',
      metric: 'Dedicated Project Lead',
    },
    {
      icon: Clock,
      title: 'On-Time Milestone Delivery',
      description:
        'We adhere to strict 45-day residential turnkey timelines with transparent weekly milestone progress updates directly to the client.',
      metric: 'Milestone-Linked Handover',
    },
    {
      icon: Compass,
      title: 'Complimentary 3D Consultation',
      description:
        'Before committing to execution, our Guwahati team inspects your site, understands your family’s requirements, and produces 3D architectural renders.',
      metric: 'Zero-Cost Initial Planning',
    },
  ];

  return (
    <section id="philosophy" className="py-16 lg:py-20 bg-[#0c0e12] relative overflow-hidden">
      {/* Background Decorative Accent */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-[radial-gradient(circle,_rgba(212,175,55,0.06)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-10">
          <div className="lg:col-span-8">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d4af37] mb-2.5">
              Brand Philosophy & Guwahati Heritage
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#f7f5f0] font-serif-luxury text-balance">
              Design That Defines You, Built for Generations
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-sm text-[#9ea8b8] leading-relaxed">
              Based in Fatasil Charali, Guwahati, Interior Adda combines contemporary architectural elegance with practical modular solutions tailored for Indian family lifestyles.
            </p>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-6 rounded-xl bg-gradient-to-b from-[#141822] to-[#0f1218] border border-[#d4af37]/20 hover:border-[#d4af37]/50 transition-all group shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] group-hover:scale-105 transition-transform mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-medium tracking-wider text-[#c99f53] block mb-1">
                    0{idx + 1} · Standard
                  </span>
                  <h3 className="text-lg font-medium text-white mb-2 font-serif-luxury">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#95a0b0] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-white/5 flex items-center justify-between text-xs text-[#d4af37] font-medium">
                  <span>{pillar.metric}</span>
                  <CheckCircle className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Turnkey Scope Summary Banner */}
        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-[#171b25] via-[#141822] to-[#12151e] border border-[#d4af37]/30 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#d4af37] block mb-2">
                Turnkey Transparency
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-serif-luxury">
                Every Trade Handled Under One Roof — No Subcontractor Hassles
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#a3abb8] leading-relaxed">
                From civil alterations and false ceiling framing to electrical LED profile channeling, customized modular cabinetry, and final Italian PU painting, Interior Adda manages the entire workflow with single-source accountability.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <div className="p-3.5 rounded-lg bg-black/40 border border-white/10 text-xs">
                <span className="font-semibold text-white block">📍 Studio Location:</span>
                <span className="text-[#a8b1be]">N.S Road, Fatasil Charali, Guwahati-781009</span>
              </div>
              <div className="p-3.5 rounded-lg bg-black/40 border border-white/10 text-xs">
                <span className="font-semibold text-white block">📞 Direct Line:</span>
                <a href="tel:+919101668680" className="text-[#ffd700] hover:underline font-mono tabular-nums">
                  +91 91016 68680
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
