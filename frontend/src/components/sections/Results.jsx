import React, { useRef, useState } from "react";
import { Reveal } from "../Reveal";
import { ChevronsLeftRight } from "lucide-react";
import { useSectionView } from "../../hooks/useSectionView";
import { EVENTS } from "../../lib/analyticsEvents";

const BEFORE = "/Before.png";
const AFTER = "/After.png";

const Results = ({ t }) => {
  const [pos, setPos] = useState(50);
  const ref = useRef(null);
  const lang = document.documentElement.lang || "en";
  const sectionRef = useSectionView(EVENTS.REAL_TRANSFORMATIONS_SECTION_VIEW, { page: "home", language: lang });
  const isRtl =
    typeof document !== "undefined" && document.body?.dir === "rtl";

  const update = (clientX) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    let pct = ((clientX - rect.left) / rect.width) * 100;
    if (isRtl) pct = 100 - pct;
    setPos(Math.max(6, Math.min(94, pct)));
  };

  return (
    <section ref={sectionRef} data-testid="results-section" className="relative py-12 px-6">
      <div className="max-w-md mx-auto">
        <Reveal>
          <span className="aa-overline left-only">{t.results.overline}</span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display text-[30px] leading-[1.1] text-white mt-4 tracking-tight">
            {t.results.title}
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="text-[14px] text-slate-400 mt-3 leading-relaxed">
            {t.results.sub}
          </p>
        </Reveal>

        {/* Slider */}
        <Reveal delay={0.2}>
          <div
            ref={ref}
            data-testid="results-slider"
            className="relative mt-8 h-[300px] rounded-3xl overflow-hidden select-none touch-none aa-card !p-0"
            onMouseMove={(e) => e.buttons === 1 && update(e.clientX)}
            onMouseDown={(e) => update(e.clientX)}
            onTouchMove={(e) => update(e.touches[0].clientX)}
            onTouchStart={(e) => update(e.touches[0].clientX)}
          >
            {/* AFTER (full) */}
            <img
              src={AFTER}
              alt="After"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <span className="absolute bottom-3 end-3 z-30 aa-glass-soft rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-cyan-200 font-semibold">
              {t.results.afterLabel}
            </span>

            {/* BEFORE clipped */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                clipPath: isRtl
                  ? `inset(0 0 0 ${100 - pos}%)`
                  : `inset(0 ${100 - pos}% 0 0)`,
              }}
            >
              <img
                src={BEFORE}
                alt="Before"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <span className="absolute bottom-3 start-3 aa-glass-soft rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-cyan-200 font-semibold">
                {t.results.beforeLabel}
              </span>
            </div>

            {/* Handle */}
            <div
              className="absolute top-0 bottom-0 w-px bg-white/80 shadow-[0_0_18px_rgba(0,229,255,0.6)] z-20 pointer-events-none"
              style={{ left: `${isRtl ? 100 - pos : pos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full grid place-items-center bg-gradient-to-br from-[#7BE5FF] to-[#4FACFE] text-[#04111F] shadow-xl">
                <ChevronsLeftRight size={16} />
              </div>
            </div>
          </div>
        </Reveal>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-2.5 mt-6">
          {t.results.metrics.map((m, i) => (
            <Reveal key={i} delay={0.05 + i * 0.07}>
              <div className="aa-card p-3.5 text-center" data-testid={`result-metric-${i}`}>
                <div className="font-display text-[22px] text-cyan-300 leading-none">
                  {m.v}
                </div>
                <div className="text-[10.5px] text-slate-400 mt-2 uppercase tracking-[0.12em]">
                  {m.l}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Results;
