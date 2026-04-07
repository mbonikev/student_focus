"use client";

import type { ClockData } from "@/hooks/useClockTime";

interface Props {
  clock: ClockData;
  preview?: boolean;
  showDate?: boolean;
}

export function ClockMinimal({ clock, preview, showDate = true }: Props) {
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
      }}
    >
      {/* Time */}
      <div
        style={{
          fontFamily: "var(--font-mono, monospace)",
          fontSize: "min(20cqw, 22cqh)",
          fontWeight: 200,
          letterSpacing: "-0.04em",
          lineHeight: 1,
          color: "var(--ck-text)",
        }}
      >
        {clock.hours}:{clock.minutes}
        <span style={{ color: "var(--ck-muted)", opacity: ".6" }}>:{clock.seconds}</span>
      </div>

      {/* Date + timezone — hidden in preview cards or when showDate is off */}
      {!preview && showDate && (
        <div
          style={{
            fontFamily: "var(--font-inter, system-ui)",
            fontSize: "clamp(11px, min(2cqw, 1.8cqh), 18px)",
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
          {/* {clock.timezoneLabel && (
            <>
              <br />
              {clock.timezoneLabel}
            </>
          )} */}
        </div>
      )}
    </div>
  );
}
