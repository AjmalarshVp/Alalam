import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  Star,
  Check,
  CalendarCheck,
} from "lucide-react";
import { WHATSAPP_LINK } from "../../lib/translations";
import { trackButtonClick, trackExternalLink } from "../../lib/analytics";
import { useSectionView } from "../../hooks/useSectionView";
import { setBookingContext } from "../../lib/bookingContext";
import { EVENTS } from "../../lib/analyticsEvents";

// Deep twilight luxury pool — dark blue tones for strong text contrast
const HERO_IMG =
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1400&q=85";

const Hero = ({ t, scrollTo }) => {
  const navigate = useNavigate();
  const lang = document.documentElement.lang || "en";

  // Track when hero section enters viewport
  const sectionRef = useSectionView(EVENTS.HERO_SECTION_VIEW, {
    page: "home",
    language: lang,
  });

  const handleBookNow = () => {
    setBookingContext({ sourcePage: "home", sourceSection: "hero" });
    trackButtonClick(EVENTS.HERO_BOOK_NOW_CLICK, {
      language: lang, section: "hero", page: "home",
    });
    scrollTo("contact");
  };

  const handlePackages = () => {
    trackButtonClick(EVENTS.HERO_PACKAGES_CLICK, {
      language: lang, section: "hero", page: "home",
    });
    navigate("/packages");
  };

  const handleWhatsApp = () => {
    trackExternalLink({
      specificEvent: EVENTS.HERO_WHATSAPP_CLICK,
      linkName: "hero_whatsapp",
      linkType: "whatsapp",
      destinationDomain: "wa.me",
      page: "home",
      section: "hero",
      language: lang,
    });
  };

  return (
    <section
      ref={sectionRef}
      data-testid="hero-section"
      id="top"
      className="relative min-h-[100svh] w-full overflow-hidden pt-20 pb-10"
    >
      {/* Background pool image with slow pan */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 aa-pan will-change-transform">
          <img
            src={HERO_IMG}
            alt="Luxury twilight pool"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>

        {/* Strong dark overlay tuned for text contrast on any background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020812]/75 via-[#040B16]/65 to-[#040B16]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#04111F]/55 via-transparent to-[#04111F]/45" />

        {/* Animated water shimmer — SVG noise displacement */}
        <svg className="absolute inset-0 w-full h-full opacity-25 mix-blend-screen pointer-events-none">
          <defs>
            <filter id="hero-water">
              <feTurbulence type="fractalNoise" baseFrequency="0.008 0.018" numOctaves="2" seed="2">
                <animate
                  attributeName="baseFrequency"
                  dur="22s"
                  values="0.008 0.018;0.014 0.026;0.008 0.018"
                  repeatCount="indefinite"
                />
              </feTurbulence>
              <feColorMatrix values="0 0 0 0 0.12  0 0 0 0 0.78  0 0 0 0 0.95  0 0 0 0.45 0" />
            </filter>
          </defs>
          <rect width="100%" height="100%" filter="url(#hero-water)" />
        </svg>

        {/* Radial aqua glow at bottom */}
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[140%] h-[55%] aa-radial-glow opacity-90" />

        {/* Floating shimmer particles */}
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
              className="absolute rounded-full bg-cyan-200/80 aa-float blur-[1px]"
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

      {/* Hero content */}
      <div className="relative z-10 max-w-md mx-auto px-6 flex flex-col items-start min-h-[calc(100svh-80px)]">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mt-4"
        >
          <span
            data-testid="hero-badge"
            className="inline-flex items-center gap-2 aa-glass-soft rounded-full ps-2.5 pe-3.5 py-1.5 text-[10.5px] uppercase tracking-[0.18em] font-semibold text-cyan-100"
          >
            <Sparkles size={11} className="text-cyan-300" />
            {t.hero.badge}
          </span>
        </motion.div>

        {/* Headline — three-tier hierarchy */}
        <motion.h1
          data-testid="hero-headline"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="font-display tracking-tight mt-7 sm:mt-4"
        >
          {/* Tier 1: "30% OFF" — eye-catching deal line in cyan gradient */}
          <span
            className="block text-[34px] sm:text-[42px] leading-[1.0] font-bold bg-gradient-to-r from-[#A8F0FF] via-[#00E5FF] to-[#4FACFE] bg-clip-text text-transparent"
          >
            {t.hero.headline[0]}
          </span>

          {/* Tier 2: "Instant Pool Cleaning" — primary, largest, most prominent */}
          <span
            className="block text-[42px] sm:text-[52px] leading-[1.01] font-medium text-white mt-0.5"
            style={{ textShadow: "0 4px 28px rgba(0,0,0,0.65)" }}
          >
            {t.hero.headline[1]}
          </span>

          {/* Tier 3: "At Your Doorstep in 30 Minutes" — speed/trust tagline */}
          {t.hero.headline[2] && (
            <span
              className="block font-body text-[15.5px] sm:text-[18px] font-semibold text-cyan-100/90 mt-3 tracking-normal leading-snug"
              style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}
            >
              {t.hero.headline[2]}
            </span>
          )}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.28 }}
          className="text-[13.5px] leading-relaxed text-slate-100/85 mt-4 max-w-[34ch]"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}
        >
          {t.hero.sub}
        </motion.p>

        {/* 9 service pills — staggered reveal */}
        <motion.ul
          data-testid="hero-services-pills"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.04, delayChildren: 0.4 } },
          }}
          className="mt-6 grid grid-cols-2 gap-x-2 gap-y-2.5 sm:grid-cols-3 sm:gap-1.5 w-full mb-1"
        >
          {t.services.list.slice(0, -1).map((s, i) => (
            <motion.li
              key={i}
              data-testid={`hero-service-pill-${i}`}
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
              }}
              className="aa-glass-soft rounded-full px-2 py-1.5 flex items-center gap-1.5 text-[10px] font-medium text-white/95 leading-none"
            >
              <span className="w-3.5 h-3.5 rounded-full bg-cyan-400/25 border border-cyan-300/50 grid place-items-center shrink-0">
                <Check size={8} className="text-cyan-100" strokeWidth={3} />
              </span>
              <span className="truncate">{s.name}</span>
            </motion.li>
          ))}
        </motion.ul>

        {/* CTAs — Book Now primary, Quote secondary, WhatsApp tertiary inline */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="mt-5 w-full flex flex-col gap-2.5"
        >
          <button
            data-testid="hero-cta-book"
            onClick={handleBookNow}
            className="aa-btn-primary w-full relative overflow-hidden aa-shimmer"
          >
            <CalendarCheck size={17} />
            {t.hero.ctaPrimary}
            <ArrowRight size={16} />
          </button>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              data-testid="hero-cta-quote"
              onClick={handlePackages}
              className="aa-btn-ghost !py-3 !text-[13px] w-full"
            >
              {t.hero.ctaSecondary}
            </button>
            <a
              data-testid="hero-cta-whatsapp"
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              onClick={handleWhatsApp}
              className="aa-btn-ghost !py-3 !text-[13px] w-full"
              style={{
                borderColor: "rgba(37,211,102,0.45)",
                color: "#9CE8B6",
              }}
            >
              <MessageCircle size={14} />
              WhatsApp
            </a>
          </div>
        </motion.div>

        {/* Micro trust */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.0 }}
          className="mt-auto pt-5 w-full"
        >
          <div className="flex items-center gap-2 text-[11px] text-slate-200/80">
            <ShieldCheck size={13} className="text-cyan-300" />
            <span>{t.hero.microTrust}</span>
          </div>
          <div className="flex items-center gap-1 mt-1.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} size={11} className="fill-cyan-300 text-cyan-300" />
            ))}
            <span className="text-[10.5px] text-slate-300 ms-2">
              4.9 · 320+ reviews
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
