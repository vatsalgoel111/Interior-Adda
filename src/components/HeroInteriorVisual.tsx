import React, { useState } from 'react';
import { Sparkles, Sun, Moon } from 'lucide-react';

const HERO_IMG_PRIMARY =
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85';
const HERO_IMG_FALLBACK =
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85';

export const HeroInteriorVisual: React.FC = () => {
  const [isEvening, setIsEvening] = useState(true);
  const [imgSrc, setImgSrc] = useState(HERO_IMG_PRIMARY);

  return (
    <div className="relative group w-full">
      {/* Ambient Architectural Lighting Bloom */}
      <div
        className={`absolute -inset-2 rounded-3xl blur-2xl transition-all duration-700 pointer-events-none ${
          isEvening
            ? 'bg-gradient-to-tr from-[#d4af37]/25 via-[#c99f53]/15 to-transparent opacity-60 group-hover:opacity-85'
            : 'bg-gradient-to-tr from-[#7a9ecb]/20 via-[#e0d8cb]/15 to-transparent opacity-50 group-hover:opacity-75'
        }`}
      />

      {/* Main Elegant Frame */}
      <div className="relative rounded-2xl overflow-hidden border border-[#d4af37]/30 bg-[#0c0e13] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] transition-all duration-500 hover:border-[#d4af37]/55">
        {/* Photo Container */}
        <div className="relative aspect-[4/3] sm:aspect-[16/12] w-full overflow-hidden select-none bg-[#12151d]">
          {/* Background backdrop strictly behind image (z-0) */}
          <div className="absolute inset-0 z-0 bg-[#12151d]" />

          {/* Luxury Interior Photograph - Fully Visible Immediately On Load (z-10) */}
          <img
            src={imgSrc}
            alt="Interior Adda bespoke luxury living room interior with warm architectural lighting and fluted wood textures"
            className={`relative z-10 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.02] opacity-100 ${
              isEvening
                ? 'brightness-[0.98] contrast-[1.04] sepia-[0.08]'
                : 'brightness-[1.05] contrast-[1.01] sepia-0'
            }`}
            loading="eager"
            decoding="async"
            onError={() => {
              if (imgSrc !== HERO_IMG_FALLBACK) {
                setImgSrc(HERO_IMG_FALLBACK);
              }
            }}
          />

          {/* Cinematic Vignette & Bottom Depth Gradient (z-10) */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0c0e12]/75 via-[#0c0e12]/15 to-transparent pointer-events-none" />
          <div className="absolute inset-0 z-10 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />

          {/* Minimal Lighting Mood Switcher in Top Right */}
          <div className="absolute top-3.5 right-3.5 z-20 flex items-center bg-[#0c0e12]/75 backdrop-blur-md rounded-full border border-white/10 p-1 shadow-lg">
            <button
              type="button"
              onClick={() => setIsEvening(true)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
                isEvening
                  ? 'bg-gradient-to-r from-[#eed187] to-[#d4af37] text-[#0c0e12] font-semibold shadow-sm'
                  : 'text-[#9ea8b8] hover:text-white'
              }`}
              title="Warm 2700K Architectural Evening Lighting"
            >
              <Moon className="w-3 h-3" />
              <span>Warm 2700K</span>
            </button>
            <button
              type="button"
              onClick={() => setIsEvening(false)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
                !isEvening
                  ? 'bg-white/20 text-white font-semibold shadow-sm'
                  : 'text-[#9ea8b8] hover:text-white'
              }`}
              title="Natural Daylight Ambience"
            >
              <Sun className="w-3 h-3" />
              <span>Daylight</span>
            </button>
          </div>

          {/* Minimal Top-Left Refined Badge */}
          <div className="absolute top-3.5 left-3.5 z-20">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0c0e12]/75 backdrop-blur-md border border-[#d4af37]/30 text-[11px] text-[#ffd700] font-medium shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse" />
              <span>Bespoke Living Sanctuary</span>
            </div>
          </div>

          {/* Editorial Bottom Glass Label (Refined, no bulky technical clutter) */}
          <div className="absolute bottom-3.5 left-3.5 right-3.5 z-20 flex items-center justify-between p-3 rounded-xl bg-[#0c0e12]/80 backdrop-blur-md border border-white/10 shadow-lg">
            <div className="flex flex-col">
              <span className="text-[11px] uppercase tracking-wider text-[#d4af37] font-semibold">
                Turnkey Execution Standard
              </span>
              <span className="text-xs sm:text-sm font-medium text-white">
                Fluted Walnut Paneling · Statuario Marble · Architectural Coves
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#d4af37]/15 border border-[#d4af37]/30 text-[#ffd700] text-xs font-semibold tabular-nums shrink-0">
              <Sparkles className="w-3 h-3" />
              <span>₹950 / sq.ft</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
