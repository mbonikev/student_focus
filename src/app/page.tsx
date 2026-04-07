"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Maximize2, Minimize2, LayoutGrid, Globe } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";
import { useClockTime } from "@/hooks/useClockTime";
import { ClockMinimal } from "@/components/clocks/ClockMinimal";
import { LayoutDrawer } from "@/components/LayoutDrawer";
import { TimezoneModal } from "@/components/TimezoneModal";
import type React from "react";

export default function Page() {
  const { settings, update, mounted } = useSettings();
  const clock = useClockTime(settings.timezone);
  const [showLayouts, setShowLayouts] = useState(false);
  const [showTimezone, setShowTimezone] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Apply data-theme and data-clock to <html> so CSS variables resolve correctly
  useEffect(() => {
    if (!mounted) return;
    document.documentElement.dataset.theme = settings.theme;
    document.documentElement.dataset.clock = settings.clockLayout;
  }, [settings.theme, settings.clockLayout, mounted]);

  // Track fullscreen state
  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  // Blank screen before hydration to avoid theme flash
  if (!mounted) {
    return <div style={{ width: "100vw", height: "100vh", background: "var(--ck-bg)" }} />;
  }

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative", overflow: "hidden" }}>
      {/* Clock */}
      <ClockMinimal clock={clock} />

      {/* Floating toolbar — bottom-right */}
      <div
        style={{
          position: "fixed",
          bottom: "1.75rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "row",
          gap: "0.45rem",
          zIndex: 50,
        }}
      >
        <ToolButton
          title={settings.theme === "dark" ? "Light mode" : "Dark mode"}
          onClick={() => update({ theme: settings.theme === "dark" ? "light" : "dark" })}
        >
          {settings.theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
        </ToolButton>

        <ToolButton
          title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
          onClick={toggleFullscreen}
        >
          {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
        </ToolButton>

        <ToolButton title="Change layout" onClick={() => setShowLayouts(true)}>
          <LayoutGrid size={15} />
        </ToolButton>

        <ToolButton title="Change timezone" onClick={() => setShowTimezone(true)}>
          <Globe size={15} />
        </ToolButton>
      </div>

      {/* Layout selection drawer */}
      <LayoutDrawer
        open={showLayouts}
        onClose={() => setShowLayouts(false)}
        current={settings.clockLayout}
        onSelect={(layout) => {
          update({ clockLayout: layout });
          setShowLayouts(false);
        }}
        clock={clock}
        theme={settings.theme}
      />

      {/* Timezone picker modal */}
      <TimezoneModal
        open={showTimezone}
        onClose={() => setShowTimezone(false)}
        current={settings.timezone}
        onSelect={(tz) => update({ timezone: tz })}
      />
    </div>
  );
}

/* ----------------------------------------------------------------
   Toolbar icon button
   ---------------------------------------------------------------- */
function ToolButton({
  children,
  onClick,
  title,
}: {
  children: React.ReactNode;
  onClick: () => void;
  title: string;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      onClick={onClick}
      title={title}
      aria-label={title}
      style={{
        width: "2.25rem",
        height: "2.25rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--ck-surface)",
        border: "1px solid var(--ck-border)",
        color: "var(--ck-icon)",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.color = "var(--ck-icon-hover)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.color = "var(--ck-icon)";
      }}
    >
      {children}
    </motion.button>
  );
}
