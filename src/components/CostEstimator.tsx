import React, { useState } from 'react';
import { Calculator, CheckCircle2, ArrowRight, MessageCircle } from 'lucide-react';

interface CostEstimatorProps {
  onTransferEstimate: (estimateText: string) => void;
}

export const CostEstimator: React.FC<CostEstimatorProps> = ({ onTransferEstimate }) => {
  const [bhkType, setBhkType] = useState<'1bhk' | '2bhk' | '3bhk' | '4bhk' | 'custom'>('2bhk');
  const [customSqft, setCustomSqft] = useState<number>(1000);
  const [scopePackage, setScopePackage] = useState<'essential' | 'premium' | 'luxury'>('premium');

  const bhkPresets = {
    '1bhk': { label: '1 BHK', area: 550 },
    '2bhk': { label: '2 BHK', area: 900 },
    '3bhk': { label: '3 BHK', area: 1350 },
    '4bhk': { label: '4 BHK / Villa', area: 2100 },
    custom: { label: 'Custom Area', area: customSqft },
  };

  const currentArea = bhkType === 'custom' ? customSqft : bhkPresets[bhkType].area;

  const packageRates = {
    essential: {
      rate: 950,
      name: 'Essential Modular',
      subtitle: 'Kitchen & Wardrobe Core',
      description:
        'Complete modular kitchen and bedroom wardrobes with boiling water-proof (BWP) HDHMR and German soft-close systems.',
      includes: [
        'Modular Kitchen with BWP Marine Core',
        'Floor-to-Ceiling Wardrobes in Bedrooms',
        'German Soft-Close Hinges (10-Yr Guarantee)',
      ],
    },
    premium: {
      rate: 1250,
      name: 'Comprehensive Interior',
      subtitle: 'Complete Living & Ceiling',
      description:
        'End-to-end turnkey cabinetry, designer gypsum false ceilings with warm 2700K coves, and media entertainment panelling.',
      includes: [
        'Everything in Essential Modular',
        'Gypsum False Ceilings with 2700K Warm LED Coves',
        'Architectural TV Wall Panelling & Console',
        'Complimentary 3D Architectural Walkthrough',
      ],
    },
    luxury: {
      rate: 1650,
      name: 'Ultra Luxury Turnkey',
      subtitle: 'Bespoke Executive Residence',
      description:
        'Full bespoke transformation with custom sacred Mandir, loose designer furniture, full electrical track profiles, and Asian Paints Royale finish.',
      includes: [
        'Everything in Comprehensive Interior',
        'Bespoke Teak Mandir with Laser Brass Jali',
        'Custom King Bed Suite with Backlit Headboard',
        'Asian Paints Royale Luxury Hand-Rubbed Finish',
        'Priority 45-Day Handover Guarantee',
      ],
    },
  };

  const activePkg = packageRates[scopePackage];
  const baselineCost = currentArea * activePkg.rate;
  const upperCost = Math.round(baselineCost * 1.15);

  const formatLakhs = (amount: number) => {
    const inLakhs = amount / 100000;
    return `₹${inLakhs.toFixed(2)} Lakhs`;
  };

  const handleApply = () => {
    const summary = `${bhkPresets[bhkType].label} (${currentArea} sq.ft) with ${activePkg.name} package (Est: ${formatLakhs(
      baselineCost
    )} – ${formatLakhs(upperCost)})`;
    onTransferEstimate(summary);
  };

  const whatsappMsg = `Hello Interior Adda, I calculated an interior estimate on your website for a ${
    bhkPresets[bhkType].label
  } (${currentArea} sq.ft) with ${activePkg.name} package. Estimated range: ${formatLakhs(
    baselineCost
  )} – ${formatLakhs(upperCost)}. Could we discuss the exact scope in Guwahati?`;
  const whatsappUrl = `https://wa.me/919101668680?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <section id="estimator" className="py-16 lg:py-20 bg-[#090b0e] relative overflow-hidden border-t border-[#d4af37]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#d4af37] bg-[#d4af37]/10 rounded border border-[#d4af37]/20 mb-2.5">
            <Calculator className="w-3.5 h-3.5" />
            <span>Guwahati Turnkey Budget Calculator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#f7f5f0] font-serif-luxury text-balance">
            Estimate Your Dream Home Project
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#9ea8b8] leading-relaxed">
            Transparent pricing starting from verified ₹950/sq.ft. Select your home configuration and scope to receive an instant realistic budget range.
          </p>
        </div>

        {/* Calculator Body */}
        <div className="max-w-4xl mx-auto bg-gradient-to-b from-[#141822] to-[#0e1118] border border-[#d4af37]/35 rounded-2xl p-6 sm:p-10 shadow-2xl">
          {/* Step 1: Residence Typology */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold uppercase tracking-[0.15em] text-[#d4af37]">
                1. Select Home Typology or Carpet Area
              </label>
              <span className="text-xs text-[#9eb0c6] font-medium font-sans">
                Active Area: <strong className="text-white font-semibold">{currentArea} sq.ft</strong>
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {(['1bhk', '2bhk', '3bhk', '4bhk', 'custom'] as const).map((type) => {
                const isSelected = bhkType === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setBhkType(type)}
                    className={`p-3.5 sm:p-4 rounded-xl border text-center transition-all cursor-pointer font-sans ${
                      isSelected
                        ? 'bg-[#1e2535] border-[#ffd700] ring-1 ring-[#ffd700]/30 shadow-lg'
                        : 'bg-black/35 border-white/10 hover:border-white/25 text-[#9fa6b2]'
                    }`}
                  >
                    <span className={`block text-sm font-semibold tracking-normal ${isSelected ? 'text-white' : 'text-[#d6dbe4]'}`}>
                      {bhkPresets[type].label}
                    </span>
                    <span className={`block text-xs mt-1 tabular-nums ${isSelected ? 'text-[#ffd700] font-medium' : 'text-[#8e9cae]'}`}>
                      {type === 'custom' ? `${customSqft} sq.ft` : `~${bhkPresets[type].area} sq.ft`}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Custom Sq. Ft Slider if selected */}
            {bhkType === 'custom' && (
              <div className="mt-5 p-4 rounded-xl bg-black/50 border border-white/15 flex flex-col sm:flex-row items-center gap-4">
                <span className="text-xs sm:text-sm font-medium text-[#cad1df] shrink-0 font-sans">
                  Custom Area Slider:
                </span>
                <input
                  type="range"
                  min="400"
                  max="4500"
                  step="50"
                  value={customSqft}
                  onChange={(e) => setCustomSqft(Number(e.target.value))}
                  className="w-full accent-[#d4af37] cursor-pointer h-2 bg-[#2a3040] rounded-lg"
                />
                <span className="text-sm sm:text-base font-bold text-[#ffd700] font-sans tabular-nums shrink-0 bg-[#d4af37]/15 px-3 py-1 rounded border border-[#d4af37]/35">
                  {customSqft} sq. ft.
                </span>
              </div>
            )}
          </div>

          {/* Step 2: Scope Package */}
          <div className="mb-10">
            <label className="text-xs font-bold uppercase tracking-[0.15em] text-[#d4af37] block mb-3">
              2. Select Scope Package
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(['essential', 'premium', 'luxury'] as const).map((pkgKey) => {
                const pkg = packageRates[pkgKey];
                const isSelected = scopePackage === pkgKey;
                return (
                  <button
                    key={pkgKey}
                    type="button"
                    onClick={() => setScopePackage(pkgKey)}
                    className={`p-5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between font-sans ${
                      isSelected
                        ? 'bg-[#182030] border-[#ffd700] ring-1 ring-[#ffd700]/30 shadow-xl'
                        : 'bg-black/35 border-white/10 hover:border-white/25 hover:bg-[#121622]'
                    }`}
                  >
                    <div>
                      {/* Package Title & Price Header */}
                      <div className="flex items-start justify-between gap-2 border-b border-white/10 pb-3 mb-3">
                        <div>
                          <span className={`text-base font-bold block ${isSelected ? 'text-white' : 'text-[#e2e7f0]'}`}>
                            {pkg.name}
                          </span>
                          <span className="text-[11px] text-[#9eb0c6] block mt-0.5">
                            {pkg.subtitle}
                          </span>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-base sm:text-lg font-bold text-[#ffd700] tabular-nums block">
                            ₹{pkg.rate}
                          </span>
                          <span className="text-[10px] uppercase font-semibold text-[#8e9cae] block">
                            / sq. ft.
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-[#aebccd] leading-relaxed mb-4">
                        {pkg.description}
                      </p>
                    </div>

                    {/* Inclusions Checklist */}
                    <div className="space-y-2 pt-3 border-t border-white/10 mt-auto">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#d4af37] block">
                        Included In Package:
                      </span>
                      {pkg.includes.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-[#d5dce6] leading-snug">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Result Banner */}
          <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-[#1c2232] via-[#171b26] to-[#11141c] border-2 border-[#d4af37]/45 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-7">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#d4af37] block">
                  Estimated Turnkey Investment Range
                </span>
                <div className="mt-2 flex flex-wrap items-baseline gap-2.5">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#ffd700] font-sans tracking-tight tabular-nums">
                    {formatLakhs(baselineCost)}
                  </span>
                  <span className="text-sm font-semibold text-[#8e9cae] uppercase tracking-wider px-1">
                    to
                  </span>
                  <span className="text-3xl sm:text-4xl font-extrabold text-white font-sans tracking-tight tabular-nums">
                    {formatLakhs(upperCost)}
                  </span>
                </div>
                <p className="mt-3 text-xs sm:text-sm text-[#aab6c8] leading-relaxed">
                  Calculated at verified ₹{activePkg.rate}/sq.ft for {currentArea} sq.ft under the {activePkg.name} tier. Includes on-site material measurement, 3D floor plan review, and turnkey project scheduling in Guwahati.
                </p>
              </div>

              <div className="md:col-span-5 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={handleApply}
                  className="w-full py-3.5 px-5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#0c0e12] bg-gradient-to-r from-[#eed187] via-[#d4af37] to-[#b38128] hover:from-[#fff0b2] hover:to-[#c99728] rounded-lg shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer font-sans"
                >
                  <span>Apply To Enquiry Form</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#25d366] bg-[#25d366]/10 hover:bg-[#25d366]/20 border border-[#25d366]/30 rounded-lg transition-all flex items-center justify-center gap-2 font-sans"
                >
                  <MessageCircle className="w-4 h-4 fill-[#25d366]" />
                  <span>Send Estimate on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
