"use client";

import type { ClockData } from "@/hooks/useClockTime";

interface Props {
  clock: ClockData;
  /** True when rendered as a small preview card in the layout drawer */
  preview?: boolean;
  /** Controlled by the "Show date" setting */
  showDate?: boolean;
}

export function ClockMidnight({ clock, preview, showDate = true }: Props) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        containerType: "size",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--ck-bg)",
        userSelect: "none",
        position: "relative",
      }}
    >
      <img src="/backgrounds/midnight2.jpg" alt="" className="midnight" />
      {/* ── Time ─────────────────────────────────────────────── */}
      <div
        style={{
          fontFamily: "var(--font-sp-display, system-ui)",
          fontSize: "min(26cqw, 28cqh)",
          fontWeight: 600,
          letterSpacing: "0",
          lineHeight: 1,
          color: "var(--ck-text)",
          fontVariantNumeric: "tabular-nums",
          zIndex: "2",
          // opacity: "0.8",
          textShadow: "0 0 40px rgba(0,0,0,0.1), 0 5px 20px rgba(0,0,0,0.1)",
          // filter: "blur(1px)",
        }}
      >
        {clock.hours}:{clock.minutes}
        <span style={{ color: "var(--ck-text)", opacity: 0.7 }}>
          :{clock.seconds}
        </span>
      </div>

      {/* ── Date — hidden in preview cards or when showDate is off ── */}
      {!preview && showDate && (
        <div
          style={{
            fontFamily: "var(--font-sp-display, system-ui)",
            fontSize: "clamp(14px, min(2.6cqw, 2.5cqh), 32px)",
            color: "var(--ck-text)",
            opacity: 0.55,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            marginTop: "min(3cqh, 2.5cqw)",
            textAlign: "center",
            lineHeight: 1.8,
          }}
        >
          {clock.day} · {clock.month} {clock.date}, {clock.year}
        </div>
      )}
    </div>
  );
}
