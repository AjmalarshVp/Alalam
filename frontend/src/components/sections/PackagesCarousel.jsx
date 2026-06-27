import React, { useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { WHATSAPP_NUMBER } from "../../lib/translations";
import { trackEvent } from "../../lib/analytics";
import { EVENTS } from "../../lib/analyticsEvents";
import PlanCard, { PLAN_META } from "../PackageCard";
import { Reveal } from "../Reveal";

const INSTANT_INDEX = 2;

const PackagesCarousel = ({ lang, t }) => {
  const isRtl = t.dir === "rtl";
  const navigate = useNavigate();
  const instantPlan = t.packages.plans[INSTANT_INDEX];

  const handleBookNow = useCallback(() => {
    const meta = PLAN_META[INSTANT_INDEX];
    const plan = t.packages.plans[INSTANT_INDEX];

    trackEvent(EVENTS.PACKAGE_SELECTED, {
      package_name: plan.name,
      package_type: meta.id,
      package_price: meta.price,
      source_page: "home",
      source_section: "instant_highlight",
      timestamp: Date.now(),
      language: lang,
    });

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        `Hello Al Alam Swimming Pools,\n\nI'm interested in your *${plan.name}* service.\n\nPlease share more details and help me book the service.\n\nThank you.`
      )}`,
      "_blank",
      "noopener,noreferrer"
    );
  }, [lang, t.packages.plans]);

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-x-0 top-0 h-full aa-radial-glow pointer-events-none opacity-40" />

      <div className="relative max-w-5xl mx-auto px-5">
        {/* Section header */}
        <div className="mb-10">
          <Reveal>
            <span className="aa-overline">{t.packages.overline}</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              className="font-display text-[28px] sm:text-[36px] leading-[1.08] text-white mt-4 tracking-tight"
              style={{ textShadow: "0 4px 20px rgba(0,0,0,0.4)" }}
            >
              {t.packages.headline}
            </h2>
          </Reveal>
        </div>

        {/* Instant Cleaning card — centred, capped width, floating animation */}
        <Reveal delay={0.14}>
          <div className="flex justify-center">
            <div className="w-full max-w-sm">
              <motion.div
                animate={{ scale: 1.0, y: [0, -7, 0] }}
                transition={{
                  scale: { duration: 0.45, ease: "easeOut" },
                  y: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 3.2,
                    ease: "easeInOut",
                  },
                }}
                className="pt-6"
              >
                <PlanCard
                  plan={instantPlan}
                  index={INSTANT_INDEX}
                  isRtl={isRtl}
                  t={t}
                  onBookNow={handleBookNow}
                  inCarousel
                  isActive
                  carouselHighlight
                />
              </motion.div>
            </div>
          </div>
        </Reveal>

        {/* Explore Packages — secondary CTA */}
        <Reveal delay={0.22}>
          <div className="flex justify-center mt-8">
            <motion.button
              onClick={() => navigate("/packages")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="aa-btn-ghost flex items-center gap-2 px-8"
            >
              {lang === "ar" ? "استكشف الباقات" : "Explore Packages"}
              {isRtl
                ? <ArrowLeft size={15} />
                : <ArrowRight size={15} />
              }
            </motion.button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default PackagesCarousel;
