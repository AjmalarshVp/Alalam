import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Sparkles, ShieldCheck, Star } from "lucide-react";
import { WHATSAPP_LINK } from "../../lib/translations";

const HERO_IMG =
  "https://images.unsplash.com/photo-1727579674528-600120447183?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzR8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBzd2ltbWluZyUyMHBvb2x8ZW58MHx8fHwxNzgyMzI0MDYzfDA&ixlib=rb-4.1.0&q=85";

const Hero = ({ t, scrollTo }) => {
  return (
    <section
      data-testid="hero-section"
      id="top"
      className="relative min-h-[100svh] w-full overflow-hidden pt-24 pb-14"
    >
      {/* Pool image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 aa-pan will-change-transform">
          <img
            src={HERO_IMG}
            alt="Luxury pool"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
        {/* dark gradient overlay — lighter at top, opaque toward bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#040B16]/30 via-[#040B16]/55 to-[#040B16]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#040B16]/35 via-transparent to-[#040B16]/20" />
        {/* radial cyan glow */}
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[120%] h-[60%] aa-radial-glow opacity-90" />
        {/* floating shimmer dots */}
        <div className="absolute inset-0 pointer-events-none">
          {[
            { l: "12%", t: "28%", s: 4, d: "0s" },
            { l: "78%", t: "22%", s: 3, d: "1.2s" },
            { l: "30%", t: "55%", s: 5, d: "2.1s" },
            { l: "65%", t: "70%", s: 3, d: "3.4s" },
            { l: "18%", t: "75%", s: 4, d: "4.0s" },
          ].map((p, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-cyan-200/70 aa-float blur-[1px]"
              style={{
                left: p.l,
                top: p.t,
                width: p.s,
                height: p.s,
                animationDelay: p.d,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-md mx-auto px-6 flex flex-col items-start min-h-[calc(100svh-96px)]">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mt-6"
        >
          <span
            data-testid="hero-badge"
            className="inline-flex items-center gap-2 aa-glass-soft rounded-full ps-2.5 pe-3.5 py-1.5 text-[11px] uppercase tracking-[0.18em] font-semibold text-cyan-200"
          >
            <Sparkles size={12} className="text-cyan-300" />
            {t.hero.badge}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          data-testid="hero-headline"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[44px] leading-[1.02] sm:text-[56px] font-medium text-white mt-7 tracking-tight"
        >
          <span className="block">{t.hero.headline[0]}</span>
          <span className="block">
            <em className="not-italic bg-gradient-to-r from-[#7BE5FF] via-[#00E5FF] to-[#4FACFE] bg-clip-text text-transparent">
              {t.hero.headline[1]}
            </em>
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.28 }}
          className="text-[15px] leading-relaxed text-slate-200/85 mt-5 max-w-[34ch]"
        >
          {t.hero.sub}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.42 }}
          className="mt-8 w-full flex flex-col gap-3"
        >
          <button
            data-testid="hero-cta-quote"
            onClick={() => scrollTo("contact")}
            className="aa-btn-primary w-full"
          >
            {t.hero.ctaPrimary}
            <ArrowRight size={17} />
          </button>
          <a
            data-testid="hero-cta-whatsapp"
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="aa-btn-ghost w-full"
          >
            <MessageCircle size={17} />
            {t.hero.ctaWhatsapp}
          </a>
        </motion.div>

        {/* Micro trust */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-auto pt-10 w-full"
        >
          <div className="flex items-center gap-2 text-[12px] text-slate-300/80">
            <ShieldCheck size={14} className="text-cyan-300" />
            <span>{t.hero.microTrust}</span>
          </div>
          <div className="flex items-center gap-1 mt-2.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} size={12} className="fill-cyan-300 text-cyan-300" />
            ))}
            <span className="text-[11px] text-slate-400 ms-2">4.9 · 320+ reviews</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
