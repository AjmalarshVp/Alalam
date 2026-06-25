import React from "react";
import { Reveal } from "../Reveal";

const Process = ({ t }) => {
  return (
    <section
      data-testid="process-section"
      id="process"
      className="relative py-12 px-6 overflow-hidden"
    >
      <div className="absolute inset-x-0 -top-24 h-96 aa-radial-glow-soft opacity-80 pointer-events-none" />

      <div className="max-w-md mx-auto">
        <Reveal>
          <span className="aa-overline left-only">{t.process.overline}</span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display text-[30px] leading-[1.1] text-white mt-4 tracking-tight">
            {t.process.title}
          </h2>
        </Reveal>

        <div className="relative mt-10">
          {/* vertical line */}
          <span className="absolute top-2 bottom-2 start-[18px] w-px bg-gradient-to-b from-cyan-400/60 via-cyan-400/20 to-transparent" />

          <ul className="space-y-6">
            {t.process.steps.map((s, i) => (
              <Reveal key={i} delay={0.05 + i * 0.08}>
                <li
                  data-testid={`process-step-${i}`}
                  className="relative ps-12"
                >
                  <span className="absolute start-0 top-0 w-9 h-9 grid place-items-center rounded-full aa-glass border border-cyan-400/30 text-[11.5px] font-semibold text-cyan-200">
                    {s.n}
                  </span>
                  <div className="aa-card p-5">
                    <h3 className="font-display text-[19px] text-white leading-snug">
                      {s.t}
                    </h3>
                    <p className="text-[13.5px] text-slate-400 mt-2 leading-relaxed">
                      {s.d}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Process;
