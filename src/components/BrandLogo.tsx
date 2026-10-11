import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  showTagline = true,
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-14 h-14',
  };

  const textSizes = {
    sm: 'text-sm tracking-[0.2em]',
    md: 'text-base md:text-lg tracking-[0.22em]',
    lg: 'text-2xl md:text-3xl tracking-[0.25em]',
  };

  const subTextSizes = {
    sm: 'text-[9px] tracking-[0.25em]',
    md: 'text-[10px] tracking-[0.28em]',
    lg: 'text-xs tracking-[0.3em]',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Golden iA Monogram Emblem */}
      <div className={`relative ${iconSizes[size]} shrink-0 flex items-center justify-center`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)]"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2B2" />
              <stop offset="25%" stopColor="#DFB253" />
              <stop offset="60%" stopColor="#B38128" />
              <stop offset="90%" stopColor="#FFDE7A" />
              <stop offset="100%" stopColor="#8D5B14" />
            </linearGradient>
            <linearGradient id="goldStem" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFEAA7" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#996515" />
            </linearGradient>
            <radialGradient id="goldSphere" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="30%" stopColor="#FFE599" />
              <stop offset="70%" stopColor="#B8860B" />
              <stop offset="100%" stopColor="#5C4008" />
            </radialGradient>
          </defs>

          {/* Golden sphere for the 'i' dot */}
          <circle cx="28" cy="22" r="7.5" fill="url(#goldSphere)" />

          {/* Lowercase 'i' vertical column */}
          <path
            d="M 24 37 L 32 37 L 31 78 L 25 78 Z"
            fill="url(#goldStem)"
          />

          {/* Architectural 'A' Apex & Legs */}
          <path
            d="M 62 16 L 73 16 L 90 84 L 81 84 L 75 60 L 52 60 L 46 84 L 38 84 Z M 54 52 L 73 52 L 67 29 L 63 29 Z"
            fill="url(#goldGradient)"
          />

          {/* Architectural Horizontal cross-tie line */}
          <path
            d="M 31 56 L 68 56"
            stroke="url(#goldGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Stylized drafting bottom serif flourish */}
          <path
            d="M 23 80 L 29 80"
            stroke="url(#goldGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <span
          className={`font-brand font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFF0B2] via-[#E5BA55] to-[#C99728] uppercase ${textSizes[size]}`}
          style={{ letterSpacing: '0.22em' }}
        >
          INTERIOR ADDA
        </span>

        {showTagline && (
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="h-[1px] w-2.5 bg-gradient-to-r from-transparent via-[#C99728] to-[#FFF0B2]" />
            <span
              className={`font-serif-luxury italic text-[#d4af37] opacity-90 ${subTextSizes[size]}`}
            >
              We Design Your Dreams
            </span>
            <span className="h-[1px] w-2.5 bg-gradient-to-l from-transparent via-[#C99728] to-[#FFF0B2]" />
          </div>
        )}
      </div>
    </div>
  );
};
