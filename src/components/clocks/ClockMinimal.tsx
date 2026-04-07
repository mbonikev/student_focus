"use client";

import type { ClockData } from "@/hooks/useClockTime";

interface Props {
  clock: ClockData;
}

export function ClockMinimal({ clock }: Props) {
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
        <span style={{ color: "var(--ck-muted)" }}>:{clock.seconds}</span>
      </div>

      {/* Date + timezone */}
      <div
        style={{
          fontFamily: "var(--font-inter, system-ui)",
          fontSize: "clamp(8px, min(1.6cqw, 1.4cqh), 16px)",
          color: "var(--ck-muted)",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          marginTop: "min(3cqh, 2.5cqw)",
          textAlign: "center",
          lineHeight: 1.7,
        }}
      >
        {clock.day} · {clock.month} {clock.date}, {clock.year}
        {clock.timezoneLabel && (
          <>
            <br />
            {clock.timezoneLabel}
          </>
        )}
      </div>
    </div>
  );
}
