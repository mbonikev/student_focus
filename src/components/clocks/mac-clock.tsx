"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useClock, pad } from "./use-clock";
import { useAppStore } from "@/store/app-store";

/** macOS-screensaver style clock — large, glowing */
export function MacClock({ full }: { full?: boolean }) {
  const t = useClock();
  const systemTheme = useAppStore((s) => s.systemTheme);
  const dark = systemTheme === "dark";

  const digitSize = full ? "min(22vw, 30vh)" : "clamp(2.5rem, 7vw, 5rem)";
  const colonSize = full ? "min(14vw, 18vh)" : "clamp(1.5rem, 4vw, 3rem)";

  const bg = dark
    ? "radial-gradient(ellipse at 50% 40%, #1a1a2e 0%, #0d0d12 60%, #080810 100%)"
    : "radial-gradient(ellipse at 50% 40%, #eeeef8 0%, #e4e4f0 60%, #d8d8ec 100%)";

  const digitColor = dark ? "rgba(255,255,255,0.92)" : "rgba(10,10,30,0.88)";
  const colonColor = dark ? "rgba(255,255,255,0.25)" : "rgba(10,10,30,0.22)";
  const dateColor = dark ? "rgba(255,255,255,0.28)" : "rgba(10,10,30,0.35)";
  const ampmColor = dark ? "rgba(255,255,255,0.35)" : "rgba(10,10,30,0.4)";
  const glowColor = dark
    ? "rgba(100,80,220,0.06)"
    : "rgba(80,60,200,0.05)";
  const textShadow = dark
    ? "0 0 80px rgba(140,120,255,0.4), 0 0 200px rgba(100,80,220,0.15)"
    : "0 0 60px rgba(80,60,200,0.12)";

  return (
    <div
      className="flex flex-col items-center justify-center w-full h-full select-none"
      style={{ background: bg }}
    >
      {/* Main time */}
      <div
        className="flex items-center font-mono leading-none"
        style={{ gap: full ? "0.02em" : "0.01em" }}
      >
        {[pad(t.hours12), ":", pad(t.minutes)].map((segment, idx) => (
          <AnimatePresence key={idx} mode="popLayout">
            <motion.span
              key={segment}
              initial={idx !== 1 ? { opacity: 0, y: -6 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                fontSize: idx === 1 ? colonSize : digitSize,
                color: idx === 1 ? colonColor : digitColor,
                fontWeight: 100,
                letterSpacing: "-0.06em",
                textShadow: idx !== 1 ? textShadow : "none",
                lineHeight: 1,
              }}
            >
              {segment}
            </motion.span>
          </AnimatePresence>
        ))}
        <span
          style={{
            fontSize: full ? "min(3vw, 3.5vh)" : "0.75rem",
            color: ampmColor,
            fontWeight: 300,
            marginLeft: full ? "0.6em" : "0.4em",
            letterSpacing: "0.12em",
            alignSelf: "flex-end",
            paddingBottom: full ? "2.5vh" : "0.4em",
          }}
        >
          {t.ampm}
        </span>
      </div>

      {/* Date */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{
          color: dateColor,
          fontSize: full ? "min(1.4vw, 1.8vh)" : "0.6rem",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          marginTop: full ? "3vh" : "0.75rem",
          fontWeight: 300,
        }}
      >
        {t.dayStr} · {t.dateStr}
      </motion.div>

      {/* Subtle ambient glow orb */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
        style={{ zIndex: 0 }}
      >
        <div
          style={{
            position: "absolute",
            width: "60%",
            height: "60%",
            top: "20%",
            left: "20%",
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
            filter: "blur(60px)",
          }}
        />
      </div>
    </div>
  );
}
