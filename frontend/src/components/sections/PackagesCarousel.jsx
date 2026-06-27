import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { WHATSAPP_NUMBER } from "../../lib/translations";
import { trackEvent } from "../../lib/analytics";
import { EVENTS } from "../../lib/analyticsEvents";
import PlanCard, { PLAN_META } from "../PackageCard";
import { Reveal } from "../Reveal";

const GAP = 20; // px — matches gap-5
const AUTO_DELAY = 4500; // ms
const SPRING = { type: "spring", stiffness: 280, damping: 32, mass: 0.8 };
const EASE_WRAP = { duration: 0.55, ease: [0.4, 0, 0.2, 1] };

const PackagesCarousel = ({ lang, t }) => {
  const isRtl = t.dir === "rtl";
  const plans = t.packages.plans;
  const n = plans.length; // 3

  // ── State ────────────────────────────────────────────────────────────────
  const [index, setIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const [containerW, setContainerW] = useState(0);
  const [paused, setPaused] = useState(false);

  const containerRef = useRef(null);
  const indexRef = useRef(0); // shadow ref to avoid stale closures in setInterval
  const cardWRef = useRef(0);

  // ── Responsive items-per-view ─────────────────────────────────────────────
  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1024) setItemsPerView(3);
      else if (window.innerWidth >= 768) setItemsPerView(2);
      else setItemsPerView(1);
    };
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  // ── Container width via ResizeObserver ───────────────────────────────────
  useEffect(() => {
    const obs = new ResizeObserver(([e]) => setContainerW(e.contentRect.width));
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  // ── Derived dimensions ───────────────────────────────────────────────────
  const cardW = containerW > 0
    ? (containerW - GAP * (itemsPerView - 1)) / itemsPerView
    : 320;
  cardWRef.current = cardW;

  const maxIndex = Math.max(0, n - itemsPerView);

  // Clamp index when layout changes (e.g. resize from mobile to desktop)
  useEffect(() => {
    if (index > maxIndex) snapTo(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxIndex]);

  // ── Motion value for the track x position ───────────────────────────────
  const x = useMotionValue(0);

  const snapTo = useCallback((newIndex, wrap = false) => {
    newIndex = Math.max(0, Math.min(newIndex, maxIndex));
    indexRef.current = newIndex;
    setIndex(newIndex);
    animate(x, -newIndex * (cardWRef.current + GAP), wrap ? EASE_WRAP : SPRING);
  }, [x, maxIndex]);

  // ── Auto-scroll ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (paused || maxIndex === 0) return;
    const id = setInterval(() => {
      const next = indexRef.current >= maxIndex ? 0 : indexRef.current + 1;
      const isWrap = next === 0;
      indexRef.current = next;
      setIndex(next);
      animate(x, -next * (cardWRef.current + GAP), isWrap ? EASE_WRAP : SPRING);
    }, AUTO_DELAY);
    return () => clearInterval(id);
  }, [paused, maxIndex, x]);

  // ── Drag end ─────────────────────────────────────────────────────────────
  const handleDragEnd = useCallback((_, info) => {
    const threshold = cardWRef.current * 0.22;
    const velocity = info.velocity.x;
    const offset = info.offset.x;

    if ((offset < -threshold || velocity < -500) && indexRef.current < maxIndex) {
      snapTo(indexRef.current + 1);
    } else if ((offset > threshold || velocity > 500) && indexRef.current > 0) {
      snapTo(indexRef.current - 1);
    } else {
      snapTo(indexRef.current); // snap back to current
    }
  }, [snapTo, maxIndex]);

  // ── Package CTA → WhatsApp ───────────────────────────────────────────────
  const handleBookNow = useCallback((i) => {
    const meta = PLAN_META[i];
    const plan = plans[i];

    trackEvent(EVENTS.PACKAGE_SELECTED, {
      package_name: plan.name,
      package_type: meta.id,
      package_price: meta.price,
      source_page: "home",
      source_section: "packages_carousel",
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
  }, [lang, plans]);

  // ── Arrow nav ────────────────────────────────────────────────────────────
  const prev = () => snapTo(index - 1);
  const next = () => snapTo(index + 1);

  const totalDots = maxIndex + 1;
  const showArrows = maxIndex > 0;

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-x-0 top-0 h-full aa-radial-glow pointer-events-none opacity-40" />

      <div className="relative max-w-5xl mx-auto px-5">
        {/* ── Section header ── */}
        <div className="flex items-end justify-between mb-10 gap-4">
          <div>
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

          {/* View all packages link */}
          <Reveal delay={0.12}>
            <Link
              to="/packages"
              className="shrink-0 flex items-center gap-1.5 text-[12.5px] font-medium text-cyan-400 hover:text-cyan-200 transition-colors group"
            >
              {lang === "ar" ? "عرض الكل" : "View all"}
              {isRtl
                ? <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
                : <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
              }
            </Link>
          </Reveal>
        </div>

        {/* ── Carousel track ── */}
        <div
          ref={containerRef}
          className="overflow-hidden select-none cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <motion.div
            style={{ x, display: "flex", gap: GAP }}
            drag="x"
            dragConstraints={{
              right: 0,
              left: -(maxIndex * (cardW + GAP)),
            }}
            dragElastic={0.12}
            dragMomentum={false}
            onDragStart={() => setPaused(true)}
            onDragEnd={handleDragEnd}
          >
            {plans.map((plan, i) => {
              const isActive = i === index;
              return (
                <motion.div
                  key={i}
                  style={{ width: cardW, flexShrink: 0 }}
                  animate={{
                    scale: isActive ? 1 : 0.965,
                    y: isActive ? [0, -6, 0] : 0,
                  }}
                  transition={
                    isActive
                      ? {
                          scale: { duration: 0.4, ease: "easeOut" },
                          y: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 3.6,
                            ease: "easeInOut",
                          },
                        }
                      : { scale: { duration: 0.4, ease: "easeOut" }, y: { duration: 0.4 } }
                  }
                  // Pad top so the ribbon badge (-top-4) isn't clipped
                  className="pt-5"
                >
                  <PlanCard
                    plan={plan}
                    index={i}
                    isRtl={isRtl}
                    t={t}
                    onBookNow={handleBookNow}
                    inCarousel
                    isActive={isActive}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* ── Controls row: arrows + dots ── */}
        {showArrows && (
          <div className="mt-8 flex items-center justify-center gap-5">
            {/* Prev arrow */}
            <motion.button
              onClick={prev}
              disabled={index === 0}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
              className="w-9 h-9 grid place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white disabled:opacity-25 transition-all hover:border-cyan-400/50 hover:text-cyan-300"
            >
              {isRtl ? <ArrowRight size={15} /> : <ArrowLeft size={15} />}
            </motion.button>

            {/* Pagination dots */}
            <div className="flex items-center gap-2">
              {Array.from({ length: totalDots }).map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => snapTo(i)}
                  animate={{
                    width: i === index ? 24 : 8,
                    opacity: i === index ? 1 : 0.35,
                    backgroundColor: i === index ? "#00E5FF" : "#ffffff",
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="h-2 rounded-full"
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Next arrow */}
            <motion.button
              onClick={next}
              disabled={index === maxIndex}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
              className="w-9 h-9 grid place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white disabled:opacity-25 transition-all hover:border-cyan-400/50 hover:text-cyan-300"
            >
              {isRtl ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PackagesCarousel;
