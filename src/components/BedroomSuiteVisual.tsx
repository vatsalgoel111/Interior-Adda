import React, { useState } from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

const BEDROOM_IMG_PRIMARY =
  'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=85';
const BEDROOM_IMG_FALLBACK =
  'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1600&q=85';

export const BedroomSuiteVisual: React.FC = () => {
  const [imgSrc, setImgSrc] = useState(BEDROOM_IMG_PRIMARY);

  return (
    <div className="relative group w-full">
      {/* Subtle Warm Halo Glow */}
      <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-[#d4af37]/25 via-[#aa771c]/15 to-transparent blur-2xl opacity-60 group-hover:opacity-85 transition-opacity duration-700 pointer-events-none" />

      {/* Main Editorial Case Study Photo Container */}
      <div className="relative rounded-2xl overflow-hidden border border-[#d4af37]/35 bg-[#0a0d12] shadow-[0_20px_50px_rgba(0,0,0,0.85)] transition-all duration-500 hover:border-[#d4af37]/65">
        <div className="relative aspect-[4/3] sm:aspect-[16/12] w-full overflow-hidden select-none bg-[#12151d]">
          {/* Background backdrop strictly behind image (z-0) */}
          <div className="absolute inset-0 z-0 bg-[#12151d]" />

          {/* High-Resolution Luxury Bedroom Photograph - Fully Visible Immediately On Load (z-10) */}
          <img
            src={imgSrc}
            alt="Interior Adda executed master bedroom suite in Fatasil Charali with natural oak panelling, backlit headboard glow, and flush wardrobes"
            className="relative z-10 w-full h-full object-cover opacity-100 transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            loading="eager"
            decoding="async"
            onError={() => {
              if (imgSrc !== BEDROOM_IMG_FALLBACK) {
                setImgSrc(BEDROOM_IMG_FALLBACK);
              }
            }}
          />

          {/* Subtle Bottom Depth Vignette (z-10, non-obscuring) */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0c0e12]/75 via-[#0c0e12]/15 to-transparent pointer-events-none" />
          <div className="absolute inset-0 z-10 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />

          {/* Verified Case Study Kicker in Top Left */}
          <div className="absolute top-3.5 left-3.5 z-20">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0c0e12]/80 backdrop-blur-md border border-[#d4af37]/40 text-[11px] text-[#ffd700] font-semibold shadow-md">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#ffd700]" />
              <span>Executed Case Study · Guwahati</span>
            </div>
          </div>

          {/* 24-Day Handover Pill in Top Right */}
          <div className="absolute top-3.5 right-3.5 z-20">
            <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-medium text-[#cdd4df]">
              24-Day Handover
            </span>
          </div>

          {/* Clean Case Study Spec Label in Bottom (Minimal & Editorial) */}
          <div className="absolute bottom-3.5 left-3.5 right-3.5 z-20 p-3 sm:p-3.5 rounded-xl bg-[#0c0e12]/80 backdrop-blur-md border border-white/10 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#d4af37] font-semibold">
                  Fatasil Charali Master Suite
                </div>
                <div className="text-xs sm:text-sm font-medium text-white mt-0.5">
                  Natural Oak Paneling · Backlit Jali Headboard · Flush Wardrobes
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-1 text-[11px] text-[#ffd700] font-semibold bg-[#d4af37]/15 px-2.5 py-1 rounded border border-[#d4af37]/30 shrink-0">
                <Sparkles className="w-3 h-3" />
                <span>Turnkey</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
