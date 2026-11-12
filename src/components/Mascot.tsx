'use client';

import React from 'react';

export type MascotMood = 'happy' | 'cheering' | 'puzzled' | 'sad' | 'determined';

interface MascotProps {
  mood?: MascotMood;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  speechBubble?: string;
  className?: string;
}

export const Mascot: React.FC<MascotProps> = ({
  mood = 'happy',
  size = 'md',
  speechBubble,
  className = ''
}) => {
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-36 h-36',
    xl: 'w-48 h-48'
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Animated SVG Byte the AI Owl */}
      <div className={`relative ${sizeMap[size]} transition-transform duration-300 transform hover:scale-105`}>
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Body / Head */}
          <rect
            x="30"
            y="40"
            width="140"
            height="130"
            rx="50"
            className={
              mood === 'determined'
                ? 'fill-amber-500 transition-colors'
                : mood === 'sad'
                ? 'fill-slate-500 transition-colors'
                : 'fill-emerald-500 transition-colors'
            }
          />
          {/* Cyber Ears / Antennae */}
          <path
            d="M 50 40 L 30 15 L 70 30 Z"
            className={mood === 'sad' ? 'fill-slate-600' : 'fill-emerald-600'}
          />
          <path
            d="M 150 40 L 170 15 L 130 30 Z"
            className={mood === 'sad' ? 'fill-slate-600' : 'fill-emerald-600'}
          />
          {/* Glowing Antenna Nodes */}
          <circle
            cx="30"
            cy="15"
            r="8"
            className={mood === 'determined' ? 'fill-yellow-300 animate-pulse' : 'fill-cyan-400'}
          />
          <circle
            cx="170"
            cy="15"
            r="8"
            className={mood === 'determined' ? 'fill-yellow-300 animate-pulse' : 'fill-cyan-400'}
          />

          {/* Belly Patch */}
          <ellipse
            cx="100"
            cy="125"
            rx="45"
            ry="35"
            className="fill-emerald-200 dark:fill-emerald-800 opacity-90"
          />

          {/* Cyber Eyes */}
          {mood === 'sad' ? (
            // Sad / Drooping Eyes
            <g>
              <ellipse cx="70" cy="85" rx="18" ry="12" className="fill-white" />
              <ellipse cx="130" cy="85" rx="18" ry="12" className="fill-white" />
              <circle cx="70" cy="88" r="6" className="fill-slate-700" />
              <circle cx="130" cy="88" r="6" className="fill-slate-700" />
              {/* Tear */}
              <circle cx="70" cy="105" r="4" className="fill-sky-400 animate-bounce" />
            </g>
          ) : mood === 'puzzled' ? (
            // Inquisitive Eyes
            <g>
              <circle cx="70" cy="80" r="18" className="fill-white" />
              <circle cx="130" cy="76" r="22" className="fill-white" />
              <circle cx="73" cy="80" r="8" className="fill-cyan-500" />
              <circle cx="127" cy="76" r="10" className="fill-cyan-500" />
              {/* Question mark spark */}
              <circle cx="135" cy="72" r="3" className="fill-white" />
            </g>
          ) : mood === 'determined' ? (
            // High-Tech Cyber Visor / Boss mode
            <g>
              <rect x="50" y="70" width="100" height="24" rx="12" className="fill-cyan-900" />
              <line
                x1="55"
                y1="82"
                x2="145"
                y2="82"
                stroke="#22D3EE"
                strokeWidth="6"
                strokeLinecap="round"
                className="animate-pulse"
              />
            </g>
          ) : (
            // Cheerful / Wide Curious Eyes
            <g>
              <circle cx="70" cy="80" r="20" className="fill-white" />
              <circle cx="130" cy="80" r="20" className="fill-white" />
              <circle cx="72" cy="80" r="10" className="fill-slate-900" />
              <circle cx="128" cy="80" r="10" className="fill-slate-900" />
              {/* Catchlight */}
              <circle cx="68" cy="76" r="4" className="fill-white" />
              <circle cx="124" cy="76" r="4" className="fill-white" />
            </g>
          )}

          {/* Cute Orange Beak */}
          <polygon
            points={
              mood === 'sad'
                ? "100,105 88,98 112,98"
                : "100,108 88,94 112,94"
            }
            className="fill-orange-400"
          />

          {/* Little Wings */}
          {mood === 'cheering' ? (
            // Raised wings celebrating
            <g>
              <path d="M 30 90 C 10 60, 10 50, 20 40 C 35 50, 35 70, 30 90 Z" className="fill-emerald-600" />
              <path d="M 170 90 C 190 60, 190 50, 180 40 C 165 50, 165 70, 170 90 Z" className="fill-emerald-600" />
            </g>
          ) : (
            // Resting side wings
            <g>
              <ellipse cx="28" cy="115" rx="10" ry="24" className="fill-emerald-600" />
              <ellipse cx="172" cy="115" rx="10" ry="24" className="fill-emerald-600" />
            </g>
          )}

          {/* Feet */}
          <ellipse cx="75" cy="170" rx="14" ry="6" className="fill-orange-400" />
          <ellipse cx="125" cy="170" rx="14" ry="6" className="fill-orange-400" />
        </svg>
      </div>

      {/* Comic Speech Bubble */}
      {speechBubble && (
        <div className="relative max-w-xs p-3 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm text-sm font-semibold text-slate-800 dark:text-slate-100">
          <div className="absolute -left-2 top-4 w-3 h-3 bg-white dark:bg-slate-800 border-l-2 border-b-2 border-slate-200 dark:border-slate-700 transform rotate-45" />
          {speechBubble}
        </div>
      )}
    </div>
  );
};

