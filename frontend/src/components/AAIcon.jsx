import React from "react";

// Inline brand mark — minimalist water drop wave
export const AAMark = ({ size = 28, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="aa-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#7BE5FF" />
        <stop offset="55%" stopColor="#00E5FF" />
        <stop offset="100%" stopColor="#4FACFE" />
      </linearGradient>
    </defs>
    <path
      d="M16 2.5c4.7 6.2 9.2 11.2 9.2 17a9.2 9.2 0 0 1-18.4 0c0-5.8 4.5-10.8 9.2-17z"
      fill="url(#aa-grad)"
      opacity="0.95"
    />
    <path
      d="M11.5 18.2c1.5 1.4 3.6 1.4 5 0 1.5-1.4 3.6-1.4 5 0"
      stroke="#04111F"
      strokeWidth="1.4"
      strokeLinecap="round"
      fill="none"
      opacity="0.85"
    />
  </svg>
);

export const Logo = ({ className = "" }) => (
  <div className={`flex items-center gap-2.5 ${className}`}>
    <AAMark size={30} />
    <div className="leading-none">
      <div className="font-display text-[17px] font-semibold tracking-tight text-white">
        Al Alam
      </div>
      <div className="text-[10px] uppercase tracking-[0.32em] text-cyan-300/80 mt-0.5">
        Pools
      </div>
    </div>
  </div>
);
