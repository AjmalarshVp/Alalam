/**
 * Shared package card — used on both the Packages page (grid) and the Home
 * page carousel.  Import `PlanCard` for the card UI, and `PLAN_META` /
 * `PLAN_FEATURE_ICONS` for the supporting data.
 */
import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight, ArrowLeft, Star, CheckCircle2,
  Calendar, Droplets, Waves, Wind, Paintbrush, Settings2,
  Wrench, ShieldCheck, Zap, Sparkles, Activity, Timer,
} from "lucide-react";

export const PLAN_FEATURE_ICONS = [
  [Calendar, Droplets, Waves, Wind, Activity, Paintbrush, Settings2, Wrench],
  [Calendar, CheckCircle2, Droplets, Activity, Zap, ShieldCheck, Wrench],
  [Droplets, Wind, Waves, Settings2, Wrench, Sparkles],
];

export const PLAN_META = [
  { id: "weekly",  duration: "monthly",  price: "SAR 349" },
  { id: "premium", duration: "monthly",  price: "SAR 599" },
  { id: "instant", duration: "one-time", price: "SAR 199" },
];

/**
 * @param {object}   plan            – plan object from translations
 * @param {number}   index           – 0 | 1 | 2
 * @param {boolean}  isRtl
 * @param {object}   t               – full translations[lang] object
 * @param {function} onBookNow       – called with (index)
 * @param {object}   [cardRef]            – optional ref for IntersectionObserver on packages page
 * @param {boolean}  [inCarousel]         – disables whileInView feature animations inside carousel
 * @param {boolean}  [isActive]           – carousel active state for shadow elevation
 * @param {boolean}  [carouselHighlight]  – extra visual prominence for the hero card in carousel
 */
const PlanCard = ({
  plan,
  index,
  isRtl,
  t,
  onBookNow,
  cardRef = null,
  inCarousel = false,
  isActive = false,
  carouselHighlight = false,
}) => {
  const icons = PLAN_FEATURE_ICONS[index] || [];
  const isFeatured = plan.featured;

  // carouselHighlight overrides the card's own "featured" look with a strong cyan emphasis
  const cardStyle = carouselHighlight
    ? {
        background:
          "linear-gradient(180deg, rgba(0,229,255,0.12) 0%, rgba(79,172,254,0.05) 100%)",
        borderColor: "rgba(0,229,255,0.65)",
        boxShadow: isActive
          ? "0 0 120px -18px rgba(0,229,255,0.6), inset 0 1px 0 rgba(0,229,255,0.25), 0 24px 64px -12px rgba(0,0,0,0.65)"
          : "0 0 90px -22px rgba(0,229,255,0.45), inset 0 1px 0 rgba(0,229,255,0.18)",
      }
    : isFeatured
    ? {
        background:
          "linear-gradient(180deg, rgba(251,191,36,0.09) 0%, rgba(217,119,6,0.04) 100%)",
        borderColor: "rgba(251,191,36,0.55)",
        boxShadow: isActive
          ? "0 0 100px -20px rgba(251,191,36,0.55), inset 0 1px 0 rgba(251,191,36,0.18), 0 20px 60px -12px rgba(0,0,0,0.6)"
          : "0 0 80px -20px rgba(251,191,36,0.38), inset 0 1px 0 rgba(251,191,36,0.18)",
      }
    : isActive
    ? {
        boxShadow:
          "0 0 60px -20px rgba(0,229,255,0.25), 0 20px 60px -12px rgba(0,0,0,0.55)",
      }
    : {};

  const priceStyle = isFeatured
    ? {
        background: "linear-gradient(90deg, #FDE68A, #F59E0B, #D97706)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }
    : { color: "#fff" };

  const iconRingClass =
    carouselHighlight || !isFeatured
      ? "bg-cyan-400/20 border-cyan-300/40"
      : "bg-amber-400/20 border-amber-300/40";

  const iconColor =
    carouselHighlight || !isFeatured ? "text-cyan-200" : "text-amber-200";

  return (
    <div ref={cardRef} className="relative h-full">
      {/* Fastest Service ribbon — carousel-only highlight for Instant Cleaning */}
      {carouselHighlight && (
        <div className="absolute -top-4 inset-x-0 flex justify-center z-10">
          <span
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.22em] text-[#04111F]"
            style={{
              background:
                "linear-gradient(135deg, #A8F0FF 0%, #00E5FF 55%, #4FACFE 100%)",
              boxShadow: "0 4px 20px -4px rgba(0,229,255,0.55)",
            }}
          >
            <Timer size={9} />
            {t.packages.fastestService}
          </span>
        </div>
      )}

      {/* Most Popular ribbon */}
      {!carouselHighlight && isFeatured && (
        <div className="absolute -top-4 inset-x-0 flex justify-center z-10">
          <span
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.22em] text-[#1C0A00]"
            style={{
              background: "linear-gradient(135deg, #FDE68A 0%, #F59E0B 55%, #D97706 100%)",
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
        className="aa-card p-6 flex flex-col h-full transition-shadow duration-500"
        style={cardStyle}
      >
        <span
          className={`text-[10px] font-bold uppercase tracking-[0.28em] ${
            !carouselHighlight && isFeatured ? "text-amber-400" : "text-cyan-400"
          }`}
        >
          {plan.label}
        </span>

        <h2 className="font-display text-[22px] leading-[1.1] text-white mt-2 tracking-tight">
          {plan.name}
        </h2>

        <p className="text-[12.5px] text-slate-400 mt-1">{plan.subtitle}</p>

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

        <div className="aa-divider my-5" />

        <ul className="space-y-3 flex-1">
          {plan.features.map((feat, j) => {
            const IconComp = icons[j] || CheckCircle2;
            return (
              <motion.li
                key={j}
                // Inside the carousel the feature list should be instantly visible —
                // whileInView can misfire on clipped carousel items.
                initial={inCarousel ? false : { opacity: 0, x: isRtl ? 8 : -8 }}
                whileInView={inCarousel ? undefined : { opacity: 1, x: 0 }}
                animate={inCarousel ? { opacity: 1, x: 0 } : undefined}
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

        <motion.button
          onClick={() => onBookNow(index)}
          whileHover={{ scale: 1.025 }}
          whileTap={{ scale: 0.975 }}
          className={`mt-7 w-full flex items-center justify-center gap-2 font-semibold text-[14px] rounded-xl py-3 px-6 transition-all duration-200 ${
            carouselHighlight || isFeatured ? "" : "aa-btn-ghost"
          }`}
          style={
            carouselHighlight
              ? {
                  background:
                    "linear-gradient(135deg, #A8F0FF 0%, #00E5FF 55%, #4FACFE 100%)",
                  color: "#04111F",
                  boxShadow: "0 4px 24px -6px rgba(0,229,255,0.55)",
                }
              : isFeatured
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

export default PlanCard;
