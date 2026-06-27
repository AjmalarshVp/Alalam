import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight, ArrowLeft, Droplets, Star,
  Calendar, Waves, Wind, Paintbrush, Settings2,
  Wrench, ShieldCheck, CheckCircle2, Zap, Sparkles, Activity,
} from "lucide-react";
import { translations, WHATSAPP_NUMBER } from "../lib/translations";
import { trackPageView, trackSectionView, trackEvent } from "../lib/analytics";
import { EVENTS } from "../lib/analyticsEvents";
import { useScrollDepth } from "../hooks/useScrollDepth";
import { useSectionView } from "../hooks/useSectionView";
import Header from "../components/sections/Header";
import Footer from "../components/sections/Footer";
import FloatingWhatsApp from "../components/sections/FloatingWhatsApp";
import { Reveal } from "../components/Reveal";

// Icon sets mapped per plan index, then per feature index
const PLAN_FEATURE_ICONS = [
  // Weekly Care
  [Calendar, Droplets, Waves, Wind, Activity, Paintbrush, Settings2, Wrench],
  // Premium Care
  [Calendar, CheckCircle2, Droplets, Activity, Zap, ShieldCheck, Wrench],
  // Instant Cleaning
  [Droplets, Wind, Waves, Settings2, Wrench, Sparkles],
];

const PLAN_META = [
  { id: "weekly",  duration: "monthly",  price: "SAR 349" },
  { id: "premium", duration: "monthly",  price: "SAR 599" },
  { id: "instant", duration: "one-time", price: "SAR 199" },
];

const PackagesPage = ({ lang, setLang }) => {
  const t = translations[lang];
  const isRtl = t.dir === "rtl";

  useEffect(() => {
    trackPageView({ pageName: "packages", pagePath: "/packages", language: lang });
  }, [lang]);

  useScrollDepth({ page: "packages", pagePath: "/packages", language: lang });

  const packagesSectionRef = useSectionView(EVENTS.PACKAGES_SECTION_VIEW, {
    page: "packages",
    language: lang,
  });

  const cardRefs = [useRef(null), useRef(null), useRef(null)];
  const cardFired = useRef([false, false, false]);

  useEffect(() => {
    cardFired.current = [false, false, false];
    const observers = cardRefs.map((ref, i) => {
      if (!ref.current || typeof IntersectionObserver === "undefined") return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !cardFired.current[i]) {
            cardFired.current[i] = true;
            const meta = PLAN_META[i];
            import("../lib/analytics").then(({ trackEvent }) =>
              trackEvent(EVENTS.PACKAGE_CARD_VIEW, {
                package_id: meta.id,
                package_name: t.packages.plans[i]?.name,
                package_duration: meta.duration,
                package_price: meta.price,
                language: lang,
              })
            );
          }
        },
        { threshold: 0.25 }
      );
      obs.observe(ref.current);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const handleBookNow = (i) => {
    const meta = PLAN_META[i];
    const plan = t.packages.plans[i];

    // Fire package_selected analytics event
    trackEvent(EVENTS.PACKAGE_SELECTED, {
      package_name: plan.name,
      package_type: meta.id,
      package_price: meta.price,
      source_page: "packages",
      timestamp: Date.now(),
      language: lang,
    });

    // Build pre-filled WhatsApp message per plan
    const isInstant = meta.id === "instant";
    const msgBody = isInstant
      ? `Hello Al Alam Swimming Pools,\n\nI'm interested in your *${plan.name}* service.\n\nPlease share more details and help me book the service.\n\nThank you.`
      : `Hello Al Alam Swimming Pools,\n\nI'm interested in your *${plan.name}* package.\n\nPlease share more details and help me schedule my pool service.\n\nThank you.`;

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msgBody)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const scrollTo = (id) => {
    window.location.href = "/#" + id;
  };

  return (
    <div className="min-h-screen bg-[#040B16] text-white font-body relative overflow-x-hidden">
      <div className="absolute inset-x-0 top-0 h-[60vh] aa-radial-glow pointer-events-none opacity-70" />

      <Header lang={lang} setLang={setLang} t={t} scrollTo={scrollTo} />

      <main className="relative pt-32 pb-24 px-5">
        {/* Section intro */}
        <div className="max-w-xl mx-auto text-center mb-16">
          <Reveal>
            <span className="aa-overline">{t.packages.overline}</span>
          </Reveal>
          <Reveal delay={0.09}>
            <h1
              className="font-display text-[34px] sm:text-[44px] leading-[1.06] text-white mt-5 tracking-tight"
              style={{ textShadow: "0 4px 24px rgba(0,0,0,0.4)" }}
            >
              {t.packages.headline}
            </h1>
          </Reveal>
          <Reveal delay={0.17}>
            <p className="text-[14px] text-slate-400 mt-4 leading-relaxed max-w-[42ch] mx-auto">
              {t.packages.sub}
            </p>
          </Reveal>
        </div>

        {/* Cards grid */}
        <div className="max-w-5xl mx-auto" ref={packagesSectionRef}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
            {t.packages.plans.map((plan, i) => (
              <Reveal key={i} delay={0.07 + i * 0.1}>
                <PlanCard
                  plan={plan}
                  index={i}
                  isRtl={isRtl}
                  t={t}
                  cardRef={cardRefs[i]}
                  onBookNow={handleBookNow}
                />
              </Reveal>
            ))}
          </div>

          {/* Pricing disclaimer */}
          <Reveal delay={0.4}>
            <div className="mt-12 max-w-2xl mx-auto">
              <div className="flex items-start gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.025] px-5 py-4">
                <Droplets size={15} className="text-cyan-400/60 shrink-0 mt-0.5" />
                <p className="text-[11.5px] text-slate-500 leading-relaxed">
                  {t.packages.note}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </main>

      <Footer t={t} scrollTo={scrollTo} />
      <FloatingWhatsApp />
    </div>
  );
};

/* ── Individual plan card ───────────────────────────────────────────────────── */

const PlanCard = ({ plan, index, isRtl, t, cardRef, onBookNow }) => {
  const icons = PLAN_FEATURE_ICONS[index] || [];

  const isFeatured = plan.featured;

  const cardStyle = isFeatured
    ? {
        background:
          "linear-gradient(180deg, rgba(251,191,36,0.09) 0%, rgba(217,119,6,0.04) 100%)",
        borderColor: "rgba(251,191,36,0.55)",
        boxShadow:
          "0 0 80px -20px rgba(251,191,36,0.38), inset 0 1px 0 rgba(251,191,36,0.18)",
      }
    : {};

  const priceStyle = isFeatured
    ? {
        background: "linear-gradient(90deg, #FDE68A, #F59E0B, #D97706)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }
    : { color: "#fff" };

  const iconRingClass = isFeatured
    ? "bg-amber-400/20 border-amber-300/40"
    : "bg-cyan-400/20 border-cyan-300/40";

  const iconColor = isFeatured ? "text-amber-200" : "text-cyan-200";

  return (
    <div ref={cardRef} className="relative h-full">
      {/* Most Popular ribbon */}
      {isFeatured && (
        <div className="absolute -top-4 inset-x-0 flex justify-center z-10">
          <span
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.22em] text-[#1C0A00]"
            style={{
              background:
                "linear-gradient(135deg, #FDE68A 0%, #F59E0B 55%, #D97706 100%)",
              boxShadow: "0 4px 20px -4px rgba(251,191,36,0.5)",
            }}
          >
            <Star size={9} fill="currentColor" />
            {t.packages.popular}
          </span>
        </div>
      )}

      {/* Card body */}
      <div
        className="aa-card p-6 flex flex-col h-full"
        style={cardStyle}
      >
        {/* Plan label */}
        <span
          className={`text-[10px] font-bold uppercase tracking-[0.28em] ${
            isFeatured ? "text-amber-400" : "text-cyan-400"
          }`}
        >
          {plan.label}
        </span>

        {/* Plan name */}
        <h2 className="font-display text-[22px] leading-[1.1] text-white mt-2 tracking-tight">
          {plan.name}
        </h2>

        {/* Subtitle */}
        <p className="text-[12.5px] text-slate-400 mt-1">{plan.subtitle}</p>


        {/* Price */}
        <div className="mt-5">
          <span className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
            {t.packages.startingFrom}
          </span>
          <div className="flex items-end gap-1.5 flex-wrap mt-1">
            <span
              className="font-display text-[32px] leading-none font-semibold"
              style={priceStyle}
            >
              {plan.price}
            </span>
            <span className="text-[13px] text-slate-400 mb-0.5">{plan.period}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="aa-divider my-5" />

        {/* Features */}
        <ul className="space-y-3 flex-1">
          {plan.features.map((feat, j) => {
            const IconComp = icons[j] || CheckCircle2;
            return (
              <motion.li
                key={j}
                initial={{ opacity: 0, x: isRtl ? 8 : -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: j * 0.04 }}
                className="flex items-start gap-2.5 text-[13px] text-slate-300 leading-snug"
              >
                <span
                  className={`mt-0.5 w-5 h-5 rounded-full border grid place-items-center shrink-0 ${iconRingClass}`}
                >
                  <IconComp size={10} className={iconColor} strokeWidth={2} />
                </span>
                {feat}
              </motion.li>
            );
          })}
        </ul>

        {/* CTA button */}
        <motion.button
          onClick={() => onBookNow(index)}
          whileHover={{ scale: 1.025 }}
          whileTap={{ scale: 0.975 }}
          className={`mt-7 w-full flex items-center justify-center gap-2 font-semibold text-[14px] rounded-xl py-3 px-6 transition-all duration-200 ${
            isFeatured ? "" : "aa-btn-ghost"
          }`}
          style={
            isFeatured
              ? {
                  background:
                    "linear-gradient(135deg, #FDE68A 0%, #F59E0B 55%, #D97706 100%)",
                  color: "#1C0A00",
                  boxShadow: "0 4px 24px -6px rgba(251,191,36,0.55)",
                }
              : {}
          }
        >
          {plan.cta}
          {isRtl ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}
        </motion.button>
      </div>
    </div>
  );
};

export default PackagesPage;
