import React, { useEffect, useRef } from "react";
import { Droplets } from "lucide-react";
import { translations, WHATSAPP_NUMBER } from "../lib/translations";
import { trackPageView, trackSectionView, trackEvent } from "../lib/analytics";
import { EVENTS } from "../lib/analyticsEvents";
import { useScrollDepth } from "../hooks/useScrollDepth";
import { useSectionView } from "../hooks/useSectionView";
import PlanCard, { PLAN_META } from "../components/PackageCard";
import Header from "../components/sections/Header";
import Footer from "../components/sections/Footer";
import FloatingWhatsApp from "../components/sections/FloatingWhatsApp";
import { Reveal } from "../components/Reveal";

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
            import("../lib/analytics").then(({ trackEvent: te }) =>
              te(EVENTS.PACKAGE_CARD_VIEW, {
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

    trackEvent(EVENTS.PACKAGE_SELECTED, {
      package_name: plan.name,
      package_type: meta.id,
      package_price: meta.price,
      source_page: "packages",
      timestamp: Date.now(),
      language: lang,
    });

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

  const scrollTo = (id) => { window.location.href = "/#" + id; };

  return (
    <div className="min-h-screen bg-[#040B16] text-white font-body relative overflow-x-hidden">
      <div className="absolute inset-x-0 top-0 h-[60vh] aa-radial-glow pointer-events-none opacity-70" />

      <Header lang={lang} setLang={setLang} t={t} scrollTo={scrollTo} />

      <main className="relative pt-32 pb-24 px-5">
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

        <div className="max-w-5xl mx-auto" ref={packagesSectionRef}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
            {t.packages.plans.map((plan, i) => (
              <Reveal key={i} delay={0.07 + i * 0.1} className="h-full">
                <PlanCard
                  plan={plan}
                  index={i}
                  isRtl={isRtl}
                  t={t}
                  cardRef={cardRefs[i]}
                  onBookNow={handleBookNow}
                  carouselHighlight={i === 2}
                />
              </Reveal>
            ))}
          </div>

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

export default PackagesPage;
