import React from "react";

// Wave divider used between sections — adds subtle water-flow continuity
export const WaveDivider = ({ flip = false, className = "" }) => (
  <div
    aria-hidden="true"
    className={`relative w-full overflow-hidden h-8 ${className} ${
      flip ? "rotate-180" : ""
    }`}
  >
    <svg
      viewBox="0 0 1200 80"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full"
    >
      <defs>
        <linearGradient id="wave-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(0,229,255,0)" />
          <stop offset="50%" stopColor="rgba(0,229,255,0.35)" />
          <stop offset="100%" stopColor="rgba(0,229,255,0)" />
        </linearGradient>
      </defs>
      <path
        d="M0,40 C200,10 400,70 600,40 C800,10 1000,70 1200,40 L1200,80 L0,80 Z"
        fill="url(#wave-grad)"
        opacity="0.5"
      />
      <path
        d="M0,55 C200,25 400,85 600,55 C800,25 1000,85 1200,55"
        fill="none"
        stroke="rgba(123,229,255,0.35)"
        strokeWidth="1"
      />
    </svg>
  </div>
);
