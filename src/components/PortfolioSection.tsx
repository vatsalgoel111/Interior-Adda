import React, { useState } from 'react';
import { PortfolioProject } from '../types';
import { MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { BedroomSuiteVisual } from './BedroomSuiteVisual';

interface PortfolioSectionProps {
  onOpenConsultation: () => void;
}

const PROJECTS: PortfolioProject[] = [
  {
    id: 'fatasil-master-suite',
    title: 'Master Bedroom Suite & Backlit Headboard',
    subtitle: 'Full-Scope Turnkey Master Bedroom Execution',
    category: 'bedroom',
    location: 'Fatasil Charali, Guwahati-09',
    isRealExecuted: true,
    imageUrl:
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
    specs: {
      area: '240 sq. ft.',
      timeline: '24 Days Handover',
      finish: 'Natural Oak Paneling & Frosted CNC Jali',
      highlight: 'Custom Backlit Circular Geometric Headboard Art',
    },
    description:
      'A bespoke residential master bedroom designed and executed by Interior Adda in Guwahati. The focal wall features a custom laser-cut geometric CNC jali backplate with integrated 2700K warm LED halo diffusion and an off-center circular dressing mirror. The room integrates full-height flush wooden wardrobes with seamless matching doors, warm ceiling cove lighting, and acoustic floor finishes.',
    features: [
      'Authentic Executed Project in Guwahati, Assam',
      'Laser-Calibrated Backlit CNC Jali Headboard Feature',
      'Floor-to-Ceiling Flush Wardrobes with Concealed Joinery',
      'Warm LED Perimeter Cove Lighting on Teak Ceiling Slat',
      'Custom Fabric Upholstered King Bed & Nightstands',
    ],
  },
  {
    id: 'heritage-luxury-living',
    title: 'Modern Heritage Living & Media Wall',
    subtitle: 'Living & Dining Architectural Concept',
    category: 'living',
    location: 'Guwahati, Assam',
    isRealExecuted: false,
    imageUrl:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    specs: {
      area: '480 sq. ft.',
      timeline: '35 Days Estimated',
      finish: 'Italian Statuario Marble & Smoked Walnut',
      highlight: 'Double-Height Circular Brass Chandelier & TV Louvers',
    },
    description:
      'A refined contemporary living and dining sanctuary concept tailored for large Guwahati apartments and bungalows. Balances sleek Statuario marble entertainment walls with warm acoustic walnut louvers, custom modular sectional seating, and indirect architectural perimeter coves.',
    features: [
      'Italian Statuario Marble Large-Format Accent Panel',
      'Concealed Wire Channeling & Floating Brass-Trimmed Console',
      'Architectural Ceiling Ring Chandelier with Dimmable Warm Glow',
      'Integrated Modular Glass Display Vitrines',
    ],
  },
  {
    id: 'island-quartz-kitchen',
    title: 'Minimalist Quartz Waterfall Kitchen',
    subtitle: 'Modular Kitchen Concept',
    category: 'kitchen',
    location: 'Guwahati, Assam',
    isRealExecuted: false,
    imageUrl:
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    specs: {
      area: '180 sq. ft.',
      timeline: '25 Days Estimated',
      finish: 'Matte Graphite Acrylic & Calacatta Quartz',
      highlight: 'Zero-Fingerprint Acrylic Shutters & Waterfall Island',
    },
    description:
      'Engineered for culinary ergonomics. Features boiling water-proof HDHMR carcass, anti-fingerprint matte charcoal cabinetry, Blum tandem drawer systems, and a seamless quartz waterfall breakfast island.',
    features: [
      'Waterproof Action TESA HDHMR Marine-Grade Carcass',
      'Waterfall Edge Quartz Breakfast Counter with Stool Seating',
      'Under-Cabinet High-CRI LED Task Strip Lighting',
      'Modular Pantry Pullouts & Built-In Microwave / Oven Cavity',
    ],
  },
  {
    id: 'teak-sacred-mandir',
    title: 'Sacred Teak Mandir & Brass Lattice',
    subtitle: 'Pooja Room Sanctum Concept',
    category: 'sacred',
    location: 'Guwahati, Assam',
    isRealExecuted: false,
    imageUrl:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    specs: {
      area: '80 sq. ft.',
      timeline: '18 Days Estimated',
      finish: 'Assam Teakwood & Laser Brass Jali',
      highlight: 'Backlit Brass Devotional Lattice & Corian Altar',
    },
    description:
      'A serene sacred prayer nook honoring Indian cultural heritage. Crafted with indigenous Assam teakwood frames, laser-carved brass jali backlighting, Corian heat-proof pedestals, and dedicated storage drawers for daily pooja samagri.',
    features: [
      'Laser-Cut Sacred Geometric Brass Jali Backsplash',
      'Heat-Resistant Pristine Corian / White Marble Pedestal',
      'Concealed Deep Storage Drawers for Pooja Articles',
      'Hidden Warm 2700K Glow Sanctum Illumination',
    ],
  },
  {
    id: 'commercial-corporate-hub',
    title: 'Contemporary Workspace & Director Suite',
    subtitle: 'Commercial Turnkey Office Concept',
    category: 'commercial',
    location: 'Guwahati, Assam',
    isRealExecuted: false,
    imageUrl:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    specs: {
      area: '1,200 sq. ft.',
      timeline: '35 Days Estimated',
      finish: 'Commercial HDHMR, Fluted Glass & Acoustic Felt',
      highlight: 'Ergonomic Cable-Managed Workstations & Executive Cabin',
    },
    description:
      'A turnkey corporate renovation designed for modern business operations. Combines ergonomic 6-pod workstations with cable management spines, acoustic wall paneling, conference room video-wall cabinetry, and executive veneer desks.',
    features: [
      'Heavy-Duty Modular Workstations with Privacy Dividers',
      'Acoustic Felt Baffles for Sound Absorption',
      'Frameless Toughened Glass Office Partitions',
      'Integrated High-Efficiency Commercial LED Profiles',
    ],
  },
];

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onOpenConsultation }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [activeModalProject, setActiveModalProject] = useState<PortfolioProject | null>(null);

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'bedroom', label: 'Bedroom Suites' },
    { id: 'living', label: 'Living & Lounge' },
    { id: 'kitchen', label: 'Modular Kitchens' },
    { id: 'sacred', label: 'Mandir & Sacred' },
    { id: 'commercial', label: 'Commercial' },
  ];

  const filteredProjects =
    activeFilter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section id="portfolio" className="py-16 lg:py-20 bg-[#0c0e12] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d4af37] mb-2.5">
            Executed Projects & Architectural Concepts
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#f7f5f0] font-serif-luxury text-balance">
            Real Craftsmanship Grounded in Guwahati
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#9ea8b8] leading-relaxed">
            Honest design transparency: explore our verified client execution in Guwahati alongside studio architectural design concepts.
          </p>

          {/* Filter Tabs */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-1.5 p-1 bg-[#121620] rounded-xl border border-white/5 max-w-2xl mx-auto">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeFilter === f.id
                    ? 'bg-gradient-to-r from-[#eed187] to-[#d4af37] text-[#0c0e12] font-semibold shadow'
                    : 'text-[#9fa6b2] hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Case Study Hero Card: The Verified Fatasil Charali Master Suite */}
        <div className="mb-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#171b26] via-[#141822] to-[#10131b] border border-[#d4af37]/35 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-2 mb-3 text-xs">
                <span className="px-2.5 py-1 rounded bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#ffd700] font-semibold uppercase tracking-wider">
                  ★ Verified Client Execution
                </span>
                <span className="text-[#a8b1be] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                  N.S Road, Fatasil Charali, Guwahati-09
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-white font-serif-luxury mb-3 leading-snug">
                The Fatasil Charali Master Suite
              </h3>

              <p className="text-xs sm:text-sm text-[#b5bfce] leading-relaxed mb-6 font-normal">
                A premier residential master suite executed by Interior Adda in Guwahati. Designed with bespoke wooden ceiling paneling, concealed AC mounting, integrated flush wardrobe systems, and our signature backlit CNC geometric jali headboard with an off-center circular dressing mirror.
              </p>

              {/* Verified Specs Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-black/40 border border-white/5 mb-6 text-xs">
                <div>
                  <span className="text-[#8992a0] block text-[11px]">Turnkey Scope</span>
                  <span className="font-semibold text-white">Full Bedroom Suite</span>
                </div>
                <div>
                  <span className="text-[#8992a0] block text-[11px]">Primary Finish</span>
                  <span className="font-semibold text-white">Natural Oak & CNC</span>
                </div>
                <div>
                  <span className="text-[#8992a0] block text-[11px]">Lighting</span>
                  <span className="font-semibold text-white">2700K Warm Halo Cove</span>
                </div>
                <div>
                  <span className="text-[#8992a0] block text-[11px]">Execution Time</span>
                  <span className="font-semibold text-[#ffd700]">24 Days Completed</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setActiveModalProject(PROJECTS[0])}
                  className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0c0e12] bg-gradient-to-r from-[#eed187] to-[#d4af37] rounded-lg hover:from-[#fff0b2] hover:to-[#c99728] transition-all cursor-pointer flex items-center gap-2 shadow"
                >
                  <span>Explore Case Study Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="#studio-3d"
                  className="px-3.5 py-2.5 text-xs font-medium text-[#ffd700] hover:text-white transition-colors"
                >
                  Explore in 3D Studio ↓
                </a>
              </div>
            </div>

            {/* Photorealistic Bedroom Suite Case Study Visual */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <BedroomSuiteVisual />
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl overflow-hidden bg-gradient-to-b from-[#131722] to-[#0e1118] border border-[#d4af37]/20 hover:border-[#d4af37]/50 transition-all flex flex-col justify-between group shadow-lg hover:shadow-[0_10px_30px_rgba(212,175,55,0.12)]"
            >
              <div>
                {/* Project Image Preview */}
                {project.imageUrl && (
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#10131b]">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-100"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e1118] via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-3 left-3 z-10">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md ${
                          project.isRealExecuted
                            ? 'bg-[#d4af37]/90 text-[#0c0e12]'
                            : 'bg-black/60 text-[#c2cad6] border border-white/10'
                        }`}
                      >
                        {project.isRealExecuted ? '★ Executed Project' : 'Studio Concept'}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 z-10 text-[10px] font-medium text-[#cad2de] bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                      {project.specs.timeline}
                    </div>
                  </div>
                )}

                <div className="p-5">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-[11px] text-[#8891a0] flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#d4af37]" />
                      {project.location}
                    </span>
                    <span className="text-[11px] text-[#ffd700] font-semibold">
                      {project.specs.area}
                    </span>
                  </div>

                  <h3 className="text-lg font-normal text-white font-serif-luxury group-hover:text-[#ffd700] transition-colors mb-2 leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs text-[#9ea8b8] leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Highlights Pill */}
                  <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 text-[11px]">
                    <span className="text-[#86909e] block text-[10px] uppercase tracking-wider">Highlight:</span>
                    <span className="font-medium text-[#ffd700] truncate block">
                      {project.specs.highlight}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-white/5 flex items-center justify-between mt-2">
                <button
                  onClick={() => setActiveModalProject(project)}
                  className="text-xs font-semibold text-[#ffd700] hover:underline flex items-center gap-1 cursor-pointer pt-3"
                >
                  <span>Project Specs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={onOpenConsultation}
                  className="text-[11px] font-semibold uppercase tracking-wider text-white hover:text-[#ffd700] cursor-pointer pt-3"
                >
                  Enquire
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Inspector */}
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
            <div className="relative w-full max-w-2xl bg-[#141824] border border-[#d4af37]/50 rounded-2xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setActiveModalProject(null)}
                className="absolute top-5 right-5 text-[#9fa6b2] hover:text-white text-sm p-1 rounded cursor-pointer"
                aria-label="Close modal"
              >
                ✕
              </button>

              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#d4af37] mb-2">
                <span>{activeModalProject.isRealExecuted ? '★ Verified Client Execution' : 'Studio Concept'}</span>
                <span>·</span>
                <span>{activeModalProject.location}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-normal text-white font-serif-luxury mb-3 leading-snug">
                {activeModalProject.title}
              </h3>

              {activeModalProject.imageUrl && (
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-4 border border-white/10">
                  <img
                    src={activeModalProject.imageUrl}
                    alt={activeModalProject.title}
                    className="w-full h-full object-cover opacity-100"
                    decoding="async"
                  />
                </div>
              )}

              <p className="text-xs sm:text-sm text-[#b5becd] leading-relaxed mb-6 font-normal">
                {activeModalProject.description}
              </p>

              <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 text-xs">
                <div>
                  <span className="text-[#8891a0] block text-[11px]">Area Covered</span>
                  <span className="font-semibold text-white">{activeModalProject.specs.area}</span>
                </div>
                <div>
                  <span className="text-[#8891a0] block text-[11px]">Timeline</span>
                  <span className="font-semibold text-white">{activeModalProject.specs.timeline}</span>
                </div>
                <div>
                  <span className="text-[#8891a0] block text-[11px]">Finish Standard</span>
                  <span className="font-semibold text-white">{activeModalProject.specs.finish}</span>
                </div>
                <div>
                  <span className="text-[#8891a0] block text-[11px]">Key Feature</span>
                  <span className="font-semibold text-[#ffd700]">{activeModalProject.specs.highlight}</span>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-2">
                  Scope Deliverables & Specifications
                </h4>
                <ul className="space-y-2">
                  {activeModalProject.features.map((feat, i) => (
                    <li key={i} className="text-xs text-[#c9d1df] flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <button
                  onClick={() => {
                    setActiveModalProject(null);
                    onOpenConsultation();
                  }}
                  className="flex-1 py-3 text-xs font-semibold uppercase tracking-wider text-[#0c0e12] bg-gradient-to-r from-[#eed187] to-[#d4af37] hover:from-[#fff0b2] hover:to-[#c99728] rounded-lg text-center cursor-pointer transition-all shadow"
                >
                  Schedule Site Inspection In Guwahati
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
