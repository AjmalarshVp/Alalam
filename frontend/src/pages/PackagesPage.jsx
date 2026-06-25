import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, ArrowLeft, Droplets, Star } from "lucide-react";
import { translations } from "../lib/translations";
import { trackPageView, trackButtonClick, trackSectionView } from "../lib/analytics";
import { setBookingContext } from "../lib/bookingContext";
import { EVENTS, PACKAGE_BOOK_NOW_EVENTS } from "../lib/analyticsEvents";
import { useScrollDepth } from "../hooks/useScrollDepth";
import { useSectionView } from "../hooks/useSectionView";
import Header from "../components/sections/Header";
import Footer from "../components/sections/Footer";
import FloatingWhatsApp from "../components/sections/FloatingWhatsApp";
import { Reveal } from "../components/Reveal";

// Maps plan index → package metadata for analytics params
const PLAN_META = [
  { id: "monthly",   duration: "monthly",   price: "SAR 1,199" },
  { id: "quarterly", duration: "quarterly",  price: "SAR 3,499" },
  { id: "yearly",    duration: "yearly",     price: "SAR 5,499" },
];

const PackagesPage = ({ lang, setLang }) => {
  const t = translations[lang];
  const isRtl = t.dir === "rtl";

  // Track page view on mount and language change
  useEffect(() => {
    trackPageView({ pageName: "packages", pagePath: "/packages", language: lang });
  }, [lang]);

  // Scroll depth milestones
  useScrollDepth({ page: "packages", pagePath: "/packages", language: lang });

  // Packages section view (fires once when cards container enters viewport)
  const packagesSectionRef = useSectionView(EVENTS.PACKAGES_SECTION_VIEW, {
    page: "packages",
    language: lang,
  });

  // Card view tracking — one IntersectionObserver per card
  const cardRefs = [useRef(null), useRef(null), useRef(null)];
  const cardFired = useRef([false, false, false]);

  useEffect(() => {
    cardFired.current = [false, false, false]; // reset on lang change
    const observers = cardRefs.map((ref, i) => {
      if (!ref.current || typeof IntersectionObserver === "undefined") return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !cardFired.current[i]) {
            cardFired.current[i] = true;
            const meta = PLAN_META[i];
            trackSectionView(EVENTS.PACKAGE_CARD_VIEW, {
              page: "packages",
              language: lang,
            });
            // Re-fire with richer params via trackEvent directly
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
        { threshold: 0.3 }
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
    // Store package context so the contact form can include it in the spreadsheet payload
    setBookingContext({
      sourcePage: "packages",
      sourceSection: `package_${meta.id}`,
      selectedPackage: plan.name,
    });
    trackButtonClick(PACKAGE_BOOK_NOW_EVENTS[i], {
      language: lang,
      section: `package_card_${meta.id}`,
      page: "packages",
      package_id: meta.id,
      package_name: plan.name,
      package_duration: meta.duration,
      package_price: meta.price,
    });
    // Navigate to the booking form on the homepage
    window.location.href = "/#contact";
  };

  const scrollTo = (id) => {
    window.location.href = "/#" + id;
  };

  return (
    <div className="min-h-screen bg-[#040B16] text-white font-body relative overflow-x-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-x-0 top-0 h-[60vh] aa-radial-glow pointer-events-none opacity-70" />

      <Header lang={lang} setLang={setLang} t={t} scrollTo={scrollTo} />

      <main className="relative pt-32 pb-24 px-5">
        {/* ── Section intro ── */}
        <div className="max-w-lg mx-auto text-center mb-14">
          <Reveal>
            <span className="aa-overline">{t.packages.overline}</span>
          </Reveal>
          <Reveal delay={0.09}>
            <h1
              className="font-display text-[34px] sm:text-[42px] leading-[1.08] text-white mt-5 tracking-tight"
              style={{ textShadow: "0 4px 24px rgba(0,0,0,0.4)" }}
            >
              {t.packages.headline}
            </h1>
          </Reveal>
          <Reveal delay={0.17}>
            <p className="text-[14px] text-slate-400 mt-4 leading-relaxed max-w-[40ch] mx-auto">
              {t.packages.sub}
            </p>
          </Reveal>
        </div>

        {/* ── Package cards ── */}
        <div className="max-w-4xl mx-auto" ref={packagesSectionRef}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
            {t.packages.plans.map((plan, i) => (
              <Reveal key={i} delay={0.07 + i * 0.1}>
                <div
                  ref={cardRefs[i]}
                  className={`relative ${plan.featured ? "md:-mt-5" : ""}`}
                >
                  {/* Most Popular badge */}
                  {plan.featured && (
                    <div className="absolute -top-4 inset-x-0 flex justify-center z-10">
                      <span
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.22em] text-[#04111F]"
                        style={{
                          background:
                            "linear-gradient(135deg, #7BE5FF 0%, #00E5FF 50%, #4FACFE 100%)",
                        }}
                      >
                        <Star size={9} fill="currentColor" />
                        {t.packages.popular}
                      </span>
                    </div>
                  )}

                  {/* Card */}
                  <div
                    className="aa-card p-6 flex flex-col h-full"
                    style={
                      plan.featured
                        ? {
                            background:
                              "linear-gradient(180deg, rgba(0,229,255,0.09) 0%, rgba(79,172,254,0.05) 100%)",
                            borderColor: "rgba(0,229,255,0.5)",
                            boxShadow:
                              "0 0 70px -18px rgba(0,229,255,0.4), inset 0 1px 0 rgba(0,229,255,0.18)",
                          }
                        : {}
                    }
                  >
                    {/* Label */}
                    <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-cyan-400">
                      {plan.label}
                    </span>

                    {/* Plan name */}
                    <h2 className="font-display text-[24px] leading-[1.1] text-white mt-2 tracking-tight">
                      {plan.name}
                    </h2>

                    {/* Price */}
                    <div className="mt-4 flex items-end gap-1.5 flex-wrap">
                      <span
                        className="font-display text-[30px] leading-none font-semibold"
                        style={
                          plan.featured
                            ? {
                                background:
                                  "linear-gradient(90deg, #A8F0FF, #00E5FF, #4FACFE)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                              }
                            : { color: "#fff" }
                        }
                      >
                        {plan.price}
                      </span>
                      <span className="text-[13px] text-slate-400 mb-1">
                        {plan.period}
                      </span>
                    </div>

                    {/* Visits badge */}
                    <div className="mt-3 mb-5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-[11.5px] text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                        {plan.visits}
                      </span>
                    </div>

                    {/* Divider */}
                    <div className="aa-divider mb-5" />

                    {/* Features */}
                    <ul className="space-y-3 flex-1">
                      {plan.features.map((feat, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2.5 text-[13px] text-slate-300 leading-snug"
                        >
                          <span className="mt-0.5 w-4 h-4 rounded-full bg-cyan-400/20 border border-cyan-300/40 grid place-items-center shrink-0">
                            <Check size={9} className="text-cyan-200" strokeWidth={3} />
                          </span>
                          {feat}
                        </li>
                      ))}
                    </ul>

                    {/* Book Now — navigates to the homepage contact form */}
                    <motion.button
                      onClick={() => handleBookNow(i)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`mt-7 w-full ${
                        plan.featured
                          ? "aa-btn-primary relative overflow-hidden aa-shimmer"
                          : "aa-btn-ghost"
                      }`}
                    >
                      {t.packages.bookNow}
                      {isRtl ? (
                        <ArrowLeft size={15} />
                      ) : (
                        <ArrowRight size={15} />
                      )}
                    </motion.button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Bottom note */}
          <Reveal delay={0.35}>
            <div className="mt-12 flex items-center justify-center gap-2.5 text-[12px] text-slate-500">
              <Droplets size={14} className="text-cyan-400/50 shrink-0" />
              <span>{t.packages.note}</span>
            </div>
          </Reveal>
        </div>
      </main>

      <Footer t={t} scrollTo={scrollTo} />
      <FloatingWhatsApp />
    </div>
  );
};

export default PackagesPage;
