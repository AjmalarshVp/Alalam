import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AAMark } from "./AAIcon";
import { Volume2, VolumeX } from "lucide-react";

/**
 * Cinematic water-entry overlay.
 * Phase 1 (0-0.6s): dark pool-toned screen with shimmer
 * Phase 2 (0.6-2.0s): logo emerges with ripple + water mask reveals "Al Alam Pools"
 * Phase 3 (2.0-2.8s): settles on pool surface with ripples
 * Phase 4 (2.8s+): fades out, hero takes over
 */
const WaterIntro = ({ onDone }) => {
  const [visible, setVisible] = useState(true);
  const [muted, setMuted] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    // Attempt to play soft water ambience (may be blocked — handled gracefully)
    const a = audioRef.current;
    if (a) {
      a.volume = 0.35;
      a.play().catch(() => {
        /* autoplay blocked; user can tap unmute button */
      });
    }
    const t1 = setTimeout(() => setVisible(false), 2800);
    const t2 = setTimeout(() => onDone && onDone(), 3400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onDone]);

  const toggleSound = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.muted = false;
      a.play().catch(() => {});
      setMuted(false);
    } else {
      a.muted = !a.muted;
      setMuted(a.muted);
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] grid place-items-center overflow-hidden"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 40%, #073854 0%, #04111F 50%, #020812 100%)",
          }}
        >
          {/* soft animated water shimmer */}
          <svg
            className="absolute inset-0 w-full h-full opacity-60"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="water-displace">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.012 0.022"
                  numOctaves="2"
                  seed="3"
                >
                  <animate
                    attributeName="baseFrequency"
                    dur="14s"
                    values="0.012 0.022;0.018 0.03;0.012 0.022"
                    repeatCount="indefinite"
                  />
                </feTurbulence>
                <feDisplacementMap in="SourceGraphic" scale="22" />
              </filter>
              <radialGradient id="waterGrad" cx="50%" cy="55%" r="60%">
                <stop offset="0%" stopColor="#1FB6CE" stopOpacity="0.45" />
                <stop offset="60%" stopColor="#0A2540" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#020812" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#waterGrad)" filter="url(#water-displace)" />
          </svg>

          {/* concentric ripples */}
          {[0, 0.5, 1.0].map((d) => (
            <motion.span
              key={d}
              initial={{ scale: 0.2, opacity: 0.55 }}
              animate={{ scale: 5, opacity: 0 }}
              transition={{ duration: 2.6, delay: d, ease: "easeOut" }}
              className="absolute w-40 h-40 rounded-full border border-cyan-300/60"
            />
          ))}

          {/* logo + wordmark */}
          <div className="relative flex flex-col items-center gap-4 px-6">
            <motion.div
              initial={{ scale: 0.6, opacity: 0, filter: "blur(8px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <AAMark size={68} />
            </motion.div>

            {/* Water-mask reveal of brand name */}
            <div className="relative overflow-hidden">
              <motion.h1
                initial={{ y: 28, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.0, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-[34px] sm:text-[44px] tracking-tight font-medium leading-none"
                style={{
                  background:
                    "linear-gradient(180deg, #ffffff 0%, #BDEFFE 50%, #4FACFE 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  textShadow: "0 4px 28px rgba(0,229,255,0.25)",
                }}
              >
                Al Alam Pools
              </motion.h1>
              {/* water sweep highlight */}
              <motion.span
                initial={{ x: "-110%" }}
                animate={{ x: "110%" }}
                transition={{ duration: 1.6, delay: 1.0, ease: "easeInOut" }}
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(100deg, transparent 35%, rgba(255,255,255,0.85) 50%, transparent 65%)",
                  mixBlendMode: "screen",
                }}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="text-[10.5px] uppercase tracking-[0.38em] text-cyan-300/80 mt-2"
            >
              Saudi Arabia
            </motion.div>
          </div>

          {/* pool surface reflection at bottom */}
          <div
            className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, transparent 0%, rgba(31,182,206,0.18) 60%, rgba(31,182,206,0.32) 100%)",
              filter: "blur(2px)",
            }}
          />

          {/* sound toggle */}
          <button
            onClick={toggleSound}
            aria-label={muted ? "Enable sound" : "Mute sound"}
            data-testid="intro-sound-toggle"
            className="absolute top-5 end-5 w-10 h-10 rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-md grid place-items-center text-cyan-200 hover:border-cyan-300/40 transition"
          >
            {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>

          {/* small skip hint */}
          <button
            onClick={() => {
              setVisible(false);
              setTimeout(() => onDone && onDone(), 500);
            }}
            data-testid="intro-skip"
            className="absolute bottom-6 inset-x-0 mx-auto text-[10.5px] uppercase tracking-[0.32em] text-white/60 hover:text-cyan-200 transition w-fit"
          >
            Skip
          </button>

          {/* ambient water sound — small CC0 splash loop */}
          <audio
            ref={audioRef}
            loop
            muted={muted}
            preload="auto"
            src="https://cdn.pixabay.com/download/audio/2022/03/15/audio_1718e84cba.mp3"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WaterIntro;
