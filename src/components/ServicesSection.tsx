import React, { useState } from 'react';
import {
  UtensilsCrossed,
  DoorClosed,
  Tv,
  Bed,
  Layers,
  Sparkles,
  Sofa,
  Hammer,
  Grid,
  Paintbrush,
  Zap,
  Box,
  Briefcase,
  ArrowRight,
  Check,
} from 'lucide-react';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

const SERVICES_DATA: (ServiceItem & { icon: React.ElementType })[] = [
  {
    id: 'modular-kitchen',
    title: 'Modular Kitchens',
    category: 'modular',
    icon: UtensilsCrossed,
    summary: 'Custom Island, L-Shape & Parallel layouts with German hardware and waterproof HDHMR.',
    description:
      'Engineered specifically for Indian cooking demands. Built with Action TESA HDHMR boards, acrylic and PU finishes, quartz countertops, and Blum/Hettich hydraulic soft-close pullouts.',
    features: [
      'Boiling Water-Proof (BWP) Marine Grade Core',
      'Seamless Quartz / Granite Waterfall Countertops',
      'Anti-Scratch Acrylic, High-Gloss & Matte PU Shutter Finishes',
      'Hettich InnoTech Tandem Drawers with 10-Yr Guarantee',
    ],
    materials: ['HDHMR', 'Anti-Fingerprint Acrylic', 'Quartz', 'German Hardware'],
    timeline: '25 – 30 Days',
    startingPrice: '₹950 / sq. ft.',
  },
  {
    id: 'modular-wardrobe',
    title: 'Modular Wardrobes & Closets',
    category: 'modular',
    icon: DoorClosed,
    summary: 'Floor-to-ceiling sliding, hinged, and walk-in dressing suites with sensor lighting.',
    description:
      'Ergonomic storage designed to maximize vertical space. Options include lacquered tinted glass sliders, fluted veneer doors, built-in vanity mirrors, and concealed jewel drawers.',
    features: [
      'Floor-to-Ceiling Space Optimization with Loft Storage',
      'Telescopic Soft-Close Sliding Track System',
      'Integrated LED Profile Motion Sensors Inside Wardrobe',
      'Customized Organizers for Sarees, Suits, and Accessories',
    ],
    materials: ['Commercial HDHMR', 'Lacquered Glass', 'Fluted Laminate', 'Anodized Profiles'],
    timeline: '20 – 25 Days',
    startingPrice: '₹950 / sq. ft.',
  },
  {
    id: 'tv-units',
    title: 'TV Units & Media Panelling',
    category: 'living',
    icon: Tv,
    summary: 'Floating marble backsplashes, vertical fluted wooden louvers, and hidden cabling.',
    description:
      'Create an architectural focal point in your living room. Seamlessly integrates large screens with Statuario marble sheets, warm halo LED backlighting, and floating gold-trimmed consoles.',
    features: [
      'Zero-Cabling Wire Concealment Channeling',
      'Italian Statuario Marble / Onyx Acrylic Backlit Accent',
      'Vertical Fluted Wooden Slats in Walnut or Teak Finishes',
      'Floating Console Drawers with Heavy-Duty Hydraulic Sliders',
    ],
    materials: ['Marble Sheet', 'Fluted Louvers', 'Warm Strip LED', 'MDF Carcass'],
    timeline: '10 – 15 Days',
    startingPrice: '₹1,050 / sq. ft.',
  },
  {
    id: 'luxury-bedroom',
    title: 'Luxury Bedroom Suites',
    category: 'living',
    icon: Bed,
    summary: 'Bespoke upholstered king beds with signature backlit geometric CNC headboards.',
    description:
      'Inspired by our executed master bedroom at Fatasil Charali. Featuring customized architectural headboards, integrated wooden acoustic wall panelling, matching nightstands, and dressing tables.',
    features: [
      'Custom Backlit CNC Laser-Cut Geometric Wall Panels',
      'Hydraulic Bed Storage with Easy Gas-Lift Mechanism',
      'Integrated Bedside Floating Nightstands & Hanging Pendants',
      'Harmonized Wardrobe & Dressing Unit Aesthetics',
    ],
    materials: ['Acoustic Fabrics', 'Laser CNC Panels', 'Teak Veneer', 'Hydraulic Pistons'],
    timeline: '20 – 30 Days',
    startingPrice: '₹1,000 / sq. ft.',
  },
  {
    id: 'false-ceiling',
    title: 'False Ceiling & Architectural Lighting',
    category: 'ceilings',
    icon: Layers,
    summary: 'Gypsum cove ceilings, wooden rafter details, and 2700K indirect ambient lighting.',
    description:
      'Transform the height and mood of any room. We install precision Saint-Gobain gypsum false ceilings, perimeter warm coves, magnetic track lights, and customized wooden ceiling insets.',
    features: [
      'Saint-Gobain Moisture-Resistant Gypsum Board Framing',
      'Shadow-Line Perimeter Details with Warm 2700K Strip Profiles',
      'Custom Wooden Rafter Accents & Recessed Spotlight Grid',
      'Thermal & Acoustic Insulation Optimization',
    ],
    materials: ['Saint-Gobain Gypsum', 'Aluminum Channels', 'Philips/Havells Profiles'],
    timeline: '10 – 14 Days',
    startingPrice: '₹120 / sq. ft.',
  },
  {
    id: 'modular-temple',
    title: 'Modular Mandir / Sacred Pooja Units',
    category: 'sacred',
    icon: Sparkles,
    summary: 'Devotional sanctuaries with laser-cut brass/wood jali lattice and warm sanctum glow.',
    description:
      'Specialized Indian home temples designed with reverence and architectural dignity. Includes intricate brass CNC jali backsplashes, pure white Corian/marble altars, and brass bell insets.',
    features: [
      'Laser-Cut Geometric & Traditional CNC Jali Backpanels',
      'Dedicated Storage Drawers for Pooja Samagri & Diyas',
      'Heat-Resistant Brass/Marble Altar Pedestal Surfaces',
      'Concealed Warm Backlit Sanctum Illumination',
    ],
    materials: ['Assam Teak', 'Brass Lattice', 'Corian Marble', 'Warm Backlight'],
    timeline: '12 – 18 Days',
    startingPrice: '₹18,000 onwards',
  },
  {
    id: 'living-dining',
    title: 'Living & Dining Interiors',
    category: 'living',
    icon: Sofa,
    summary: 'Custom sofas, dining tables, partition louvers, and bespoke soft furnishings.',
    description:
      'Cohesive open-concept living. Includes custom-crafted sectional sofas, marble/wood dining tables with upholstered dining chairs, and decorative laser partition screens.',
    features: [
      'High-Density Foam Custom Upholstered Sofas',
      '6-Seater & 8-Seater Designer Marble/Veneer Dining Sets',
      'Aesthetic Room Partitions (Fluted Glass & Metal Frames)',
      'Curated Accent Curtains, Sheers, and Cushions',
    ],
    materials: ['Solid Teak', 'Marble Top', 'High-Resilience Foam', 'Textured Linen'],
    timeline: '25 – 35 Days',
    startingPrice: 'Customized Quote',
  },
  {
    id: 'turnkey-execution',
    title: 'Turnkey Civil, Flooring & Painting',
    category: 'turnkey',
    icon: Hammer,
    summary: 'Complete civil alterations, Italian marble flooring, electrical, and PU painting.',
    description:
      'Single-point turnkey management for end-to-end renovations in Guwahati. We coordinate all civil masonry, tile laying, concealed plumbing, copper wiring, and luxury wall finishes.',
    features: [
      'Certified Electrical Wiring with Legrand/Schneider Switchgear',
      'Italian Marble & Large-Format Vitrified Tile Installation',
      'Asian Paints Royale Luxury Emulsion & PU Wood Polishing',
      'Full Plumbing Overhauls with Jaquar/Kohler Fittings',
    ],
    materials: ['Vitrified Tiles', 'Copper Wiring', 'Asian Paints Royale', 'PU Polish'],
    timeline: '45 Days Handover',
    startingPrice: '₹950 / sq. ft.',
  },
  {
    id: 'commercial-office',
    title: 'Commercial & Office Spaces',
    category: 'turnkey',
    icon: Briefcase,
    summary: 'Modern executive offices, ergonomic workstations, and retail showrooms.',
    description:
      'Productive, high-impact workspace design for Guwahati businesses. Modular workstation clusters, acoustic conference rooms, reception desks, and branded feature entrances.',
    features: [
      'Modular Cable-Managed Workstations with Privacy Screens',
      'Acoustic Fabric Baffles and Conference Room Panelling',
      'Executive Director Desks and Credenzas',
      'Commercial Grade Durability & Fast 30-Day Setup',
    ],
    materials: ['Commercial HDHMR', 'Glass Partitions', 'Acoustic Felt', 'Metal Framing'],
    timeline: '30 – 40 Days',
    startingPrice: 'Custom Commercial Rate',
  },
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<ServiceItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Offerings' },
    { id: 'modular', label: 'Modular & Storage' },
    { id: 'living', label: 'Living & Bedroom' },
    { id: 'ceilings', label: 'Ceilings & Lighting' },
    { id: 'sacred', label: 'Sacred Mandir' },
    { id: 'turnkey', label: 'Turnkey Civil & Commercial' },
  ];

  const filteredServices =
    activeCategory === 'all'
      ? SERVICES_DATA
      : SERVICES_DATA.filter((s) => s.category === activeCategory);

  return (
    <section id="services" className="py-16 lg:py-20 bg-[#090b0e] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d4af37] mb-2.5">
            Comprehensive Capabilities · Under One Roof
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#f7f5f0] font-serif-luxury text-balance">
            Modular Precision & Complete Turnkey Services
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#9ea8b8] leading-relaxed">
            Every service is engineered with verified Indian home durability, precision factory joinery, and premium architectural aesthetics.
          </p>

          {/* Interactive Category Filter Tabs */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-1.5 p-1 bg-[#121620] rounded-xl border border-white/5 max-w-2xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-[#eed187] to-[#d4af37] text-[#0c0e12] font-semibold shadow'
                    : 'text-[#9fa6b2] hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="p-6 rounded-2xl bg-gradient-to-b from-[#131722] to-[#0e1118] border border-[#d4af37]/20 hover:border-[#d4af37]/60 transition-all group flex flex-col justify-between shadow-lg hover:shadow-[0_10px_30px_rgba(212,175,55,0.15)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold font-sans text-[#ffd700] tabular-nums bg-[#d4af37]/15 px-3 py-1 rounded-md border border-[#d4af37]/30">
                      {service.startingPrice}
                    </span>
                  </div>

                  <h3 className="text-xl font-normal text-white font-serif-luxury group-hover:text-[#ffd700] transition-colors mb-2 leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-xs text-[#9ea8b8] leading-relaxed mb-4">
                    {service.summary}
                  </p>

                  {/* Bullet features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.slice(0, 2).map((feat, i) => (
                      <li key={i} className="text-xs text-[#c2cad6] flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedServiceDetail(service)}
                    className="text-xs font-medium text-[#ffd700] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Specifications</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onSelectService(service.title)}
                    className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider bg-[#d4af37]/15 hover:bg-[#d4af37] text-[#ffd700] hover:text-[#0c0e12] rounded transition-all cursor-pointer"
                  >
                    Enquire
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Service Detail Drawer / Modal */}
        {selectedServiceDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
            <div className="relative w-full max-w-xl bg-[#141824] border border-[#d4af37] rounded-2xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setSelectedServiceDetail(null)}
                className="absolute top-5 right-5 text-[#9fa6b2] hover:text-white text-sm p-1 rounded cursor-pointer"
              >
                ✕
              </button>

              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#d4af37] mb-2">
                <span>Detailed Specification</span>
                <span>·</span>
                <span>{selectedServiceDetail.startingPrice}</span>
              </div>

              <h3 className="text-2xl font-bold text-white font-serif-luxury mb-4">
                {selectedServiceDetail.title}
              </h3>

              <p className="text-sm text-[#b5becd] leading-relaxed mb-6">
                {selectedServiceDetail.description}
              </p>

              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-2">
                    Key Architectural Features
                  </h4>
                  <ul className="space-y-2">
                    {selectedServiceDetail.features.map((f, i) => (
                      <li key={i} className="text-xs text-[#c9d1df] flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 text-xs">
                  <div>
                    <span className="text-[#8e97a5] block">Standard Materials</span>
                    <span className="font-medium text-white">{selectedServiceDetail.materials.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-[#8e97a5] block">Execution Duration</span>
                    <span className="font-medium text-white">{selectedServiceDetail.timeline}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <button
                  onClick={() => {
                    const title = selectedServiceDetail.title;
                    setSelectedServiceDetail(null);
                    onSelectService(title);
                  }}
                  className="flex-1 py-3 text-xs font-semibold uppercase tracking-wider text-[#0c0e12] bg-gradient-to-r from-[#eed187] to-[#d4af37] rounded-lg text-center cursor-pointer"
                >
                  Request Consultation For This Service
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
