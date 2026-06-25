import React from "react";
import { Reveal } from "../Reveal";
import {
  Droplets,
  FlaskConical,
  Filter,
  Sparkles,
  Search,
  Cog,
  Hammer,
  Waves,
  ShieldCheck,
} from "lucide-react";
import { useSectionView } from "../../hooks/useSectionView";
import { EVENTS } from "../../lib/analyticsEvents";

const ICONS = [
  Droplets,
  FlaskConical,
  Filter,
  Sparkles,
  Search,
  Cog,
  Hammer,
  Waves,
  ShieldCheck,
];

const Services = ({ t, scrollTo }) => {
  const lang = document.documentElement.lang || "en";
  const sectionRef = useSectionView(EVENTS.SERVICES_SECTION_VIEW, { page: "home", language: lang });
  return (
    <section
      ref={sectionRef}
      data-testid="services-section"
      id="services"
      className="relative py-12 px-6"
    >
      {/* soft underwater glow */}
      <div className="absolute inset-x-0 top-0 h-72 aa-radial-glow-soft pointer-events-none" />

      <div className="max-w-md mx-auto">
        <Reveal>
          <span className="aa-overline left-only">{t.services.overline}</span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display text-[30px] leading-[1.1] text-white mt-4 tracking-tight">
            {t.services.title}
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="text-[14.5px] text-slate-400 mt-3 leading-relaxed">
            {t.services.sub}
          </p>
        </Reveal>

        <div className="grid grid-cols-2 gap-3.5 mt-9">
          {t.services.list.slice(0, -1).map((s, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={i} delay={0.05 + i * 0.04}>
                <button
                  type="button"
                  data-testid={`service-card-${i}`}
                  onClick={() => scrollTo("contact")}
                  className="aa-card p-4 text-start w-full h-full group relative overflow-hidden"
                >
                  <div className="w-9 h-9 rounded-xl grid place-items-center bg-gradient-to-br from-cyan-400/20 to-blue-500/10 border border-cyan-400/15 mb-3.5">
                    <Icon size={16} className="text-cyan-200" />
                  </div>
                  <div className="text-[14.5px] font-semibold text-white leading-snug">
                    {s.name}
                  </div>
                  <div className="text-[11.5px] text-slate-400 mt-1.5 leading-snug">
                    {s.desc}
                  </div>
                  {/* shimmer line */}
                  <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
