import React from "react";
import { Reveal } from "../Reveal";
import { ArrowRight } from "lucide-react";
import { WHATSAPP_LINK } from "../../lib/translations";

const IMAGES = [
  "https://images.unsplash.com/photo-1680609989998-6183fcea718b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzR8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBzd2ltbWluZyUyMHBvb2x8ZW58MHx8fHwxNzgyMzI0MDYzfDA&ixlib=rb-4.1.0&q=85",
  "https://images.pexels.com/photos/16573669/pexels-photo-16573669.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
];

const Spotlights = ({ t, scrollTo }) => {
  return (
    <section data-testid="spotlight-section" className="relative py-10 px-6">
      <div className="max-w-md mx-auto">
        <Reveal>
          <span className="aa-overline left-only">{t.spotlight.overline}</span>
        </Reveal>

        <div className="mt-6 space-y-5">
          {t.spotlight.items.map((it, i) => (
            <Reveal key={i} delay={0.05 + i * 0.1}>
              <article
                data-testid={`spotlight-card-${i}`}
                className="relative rounded-3xl overflow-hidden aa-card p-0"
              >
                <div className="relative h-[230px] overflow-hidden">
                  <img
                    src={IMAGES[i]}
                    alt={it.title}
                    loading="lazy"
                    className="w-full h-full object-cover scale-[1.05] transition-transform duration-[1200ms] hover:scale-[1.12]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040B16] via-[#040B16]/40 to-transparent" />
                  <span className="absolute top-4 start-4 aa-glass-soft rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-cyan-200 font-semibold">
                    {it.tag}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-[24px] leading-[1.15] text-white tracking-tight">
                    {it.title}
                  </h3>
                  <p className="text-[14px] text-slate-400 mt-3 leading-relaxed">
                    {it.body}
                  </p>
                  <div className="mt-5 flex gap-2.5">
                    <button
                      data-testid={`spotlight-cta-${i}`}
                      onClick={() => scrollTo("contact")}
                      className="aa-btn-primary !py-3 !px-5 !text-[13.5px]"
                    >
                      {it.cta}
                      <ArrowRight size={15} />
                    </button>
                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noreferrer"
                      data-testid={`spotlight-wa-${i}`}
                      className="aa-btn-ghost !py-3 !px-5 !text-[13.5px]"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Spotlights;
