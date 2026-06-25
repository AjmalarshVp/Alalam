import React, { useState } from "react";
import { Reveal } from "../Reveal";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

const Testimonials = ({ t }) => {
  const [idx, setIdx] = useState(0);
  const total = t.testimonials.list.length;
  const next = () => setIdx((i) => (i + 1) % total);
  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const current = t.testimonials.list[idx];

  return (
    <section data-testid="testimonials-section" className="relative py-12 px-6">
      <div className="max-w-md mx-auto">
        <Reveal>
          <span className="aa-overline left-only">
            {t.testimonials.overline}
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display text-[28px] leading-[1.12] text-white mt-4 tracking-tight">
            {t.testimonials.title}
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <div
            data-testid="testimonial-card"
            className="aa-card p-7 mt-8 relative"
          >
            <Quote
              size={28}
              className="text-cyan-300/70 absolute top-5 end-5 opacity-70"
            />
            <div className="flex items-center gap-1 mb-4">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star
                  key={i}
                  size={13}
                  className="fill-cyan-300 text-cyan-300"
                />
              ))}
            </div>
            <p className="font-display italic text-[18px] leading-[1.45] text-white/95">
              "{current.q}"
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-300/30 to-blue-500/20 border border-cyan-300/30 grid place-items-center text-[12.5px] font-semibold text-cyan-100">
                {current.n.charAt(0)}
              </div>
              <div>
                <div className="text-[13.5px] font-semibold text-white">
                  {current.n}
                </div>
                <div className="text-[11.5px] text-slate-400">{current.r}</div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {t.testimonials.list.map((_, i) => (
              <span
                key={i}
                data-testid={`testimonial-dot-${i}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === idx ? "w-7 bg-cyan-300" : "w-1.5 bg-white/20"
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              data-testid="testimonial-prev"
              onClick={prev}
              aria-label="Previous"
              className="w-10 h-10 rounded-full border border-white/12 grid place-items-center text-white hover:border-cyan-400/40 transition"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              data-testid="testimonial-next"
              onClick={next}
              aria-label="Next"
              className="w-10 h-10 rounded-full border border-white/12 grid place-items-center text-white hover:border-cyan-400/40 transition"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
