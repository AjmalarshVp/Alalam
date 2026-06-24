import React from "react";
import { Reveal } from "../Reveal";
import { Clock, Award, Zap, MapPin } from "lucide-react";

const ICONS = [Award, Clock, Zap, MapPin];

const TrustStats = ({ t }) => {
  return (
    <section data-testid="trust-section" className="relative py-20 px-6">
      <div className="max-w-md mx-auto">
        <Reveal>
          <span className="aa-overline left-only">{t.trust.overline}</span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display text-[30px] leading-[1.1] text-white mt-4 tracking-tight">
            {t.trust.title}
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 gap-3.5 mt-9">
          {t.trust.items.map((it, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal key={i} delay={0.08 + i * 0.07}>
                <div
                  data-testid={`trust-card-${i}`}
                  className="aa-card p-5 h-full"
                >
                  <div className="w-9 h-9 rounded-full grid place-items-center bg-cyan-400/10 border border-cyan-400/20 mb-4">
                    <Icon size={16} className="text-cyan-300" />
                  </div>
                  <div className="font-display text-[28px] leading-none text-white">
                    {it.stat}
                  </div>
                  <div className="text-[12.5px] text-slate-400 mt-2 leading-snug">
                    {it.label}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustStats;
