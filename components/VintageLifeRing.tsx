'use client';

import React from 'react';

interface ApexEmblemProps {
  className?: string;
  size?: number;
}

export const ApexEmblem: React.FC<ApexEmblemProps> = ({
  className = 'w-9 h-9 sm:w-11 sm:h-11',
  size = 48,
}) => {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={`shrink-0 select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Academic Apex Crest Gradient - Light Red / Rose Crimson */}
        <linearGradient id="apex-shield-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="50%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#BE123C" />
        </linearGradient>

        {/* Academic Gold Laurel Gradient */}
        <linearGradient id="gold-laurel" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>

        {/* Summit Peak Gradient */}
        <linearGradient id="summit-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#FFE4E6" />
        </linearGradient>

        {/* Soft Drop Shadow */}
        <filter id="apex-emblem-shadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#991B1B" floodOpacity="0.3" />
        </filter>
      </defs>

      <g filter="url(#apex-emblem-shadow)">
        {/* Outer Circular Ring with subtle notches */}
        <circle
          cx="24"
          cy="24"
          r="21.5"
          fill="#FFF1F2"
          stroke="url(#apex-shield-grad)"
          strokeWidth="1.5"
        />

        {/* Inner Shield / Crest */}
        <path
          d="M 24 8 L 37 13 C 37 28, 24 39, 24 41 C 24 39, 11 28, 11 13 Z"
          fill="url(#apex-shield-grad)"
          stroke="#9F1239"
          strokeWidth="1"
        />

        {/* Summit Mountain Peak (The "Apex") */}
        <polygon
          points="24,15 32,32 16,32"
          fill="url(#summit-grad)"
        />
        {/* Right slope shadow */}
        <polygon
          points="24,15 32,32 24,32"
          fill="#FDA4AF"
          opacity="0.8"
        />
        {/* Peak Cap (Gold Crown on Summit) */}
        <polygon
          points="24,15 26.5,21 24,19.5 21.5,21"
          fill="url(#gold-laurel)"
        />

        {/* Graduation Laurel Wreath branches on lower flanks */}
        <path
          d="M 7 24 C 7 34, 15 42, 24 43 C 33 42, 41 34, 41 24"
          stroke="url(#gold-laurel)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="2 3"
          fill="none"
        />

        {/* Star of Academic Excellence at Top */}
        <polygon
          points="24,3.5 25.2,6.5 28.5,6.5 25.8,8.5 26.8,11.5 24,9.5 21.2,11.5 22.2,8.5 19.5,6.5 22.8,6.5"
          fill="url(#gold-laurel)"
          stroke="#B45309"
          strokeWidth="0.3"
        />
      </g>
    </svg>
  );
};

// Aliased export to preserve backward compatibility with existing imports
export const VintageLifeRing = ApexEmblem;
