"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/store/app-store";
import { themes, fonts, type ThemeId, type FontId } from "@/lib/themes";
import { PageShell } from "@/components/page-shell";
import { Monitor } from "lucide-react";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[10px] font-semibold uppercase tracking-widest mb-3"
      style={{ color: "var(--text-subtle)" }}
    >
      {children}
    </p>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      className="flex items-center justify-between py-3 border-b"
      style={{ borderColor: "var(--border)" }}
    >
      <span className="text-sm" style={{ color: "var(--text)" }}>
        {label}
      </span>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  );
}

export default function SettingsPage() {
  const {
    themeId,
    fontId,
    systemTheme,
    setThemeId,
    setFontId,
    focusDuration,
    shortBreakDuration,
    longBreakDuration,
    longBreakInterval,
    autoStartBreaks,
    autoStartPomodoros,
    setTimerSettings,
  } = useAppStore();

  const lightThemes = themes.filter((t) => t.mode === "light");
  const darkThemes = themes.filter((t) => t.mode === "dark");
  const suggestedThemes = systemTheme === "dark" ? darkThemes : lightThemes;
  const otherThemes = systemTheme === "dark" ? lightThemes : darkThemes;

  const selectedFont = fonts.find((f) => f.id === fontId)!;

  return (
    <PageShell className="h-full overflow-y-auto">
      {/* Header */}
      <div
        className="px-6 py-4 border-b sticky top-0 z-10"
        style={{ borderColor: "var(--border)", background: "var(--surface)" }}
      >
        <h1 className="text-base font-semibold tracking-tight" style={{ color: "var(--text)" }}>
          Settings
        </h1>
      </div>

      <div className="px-6 py-6 flex flex-col gap-8 max-w-xl">
        {/* ---- APPEARANCE ---- */}
        <section>
          <SectionTitle>Appearance</SectionTitle>

          {/* System theme badge */}
          <div
            className="flex items-center gap-2 mb-4 px-3 py-2 border text-xs"
            style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
          >
            <Monitor size={12} />
            System theme detected: {systemTheme}
          </div>

          {/* Theme picker */}
          <div className="mb-5">
            <p className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>
              {systemTheme === "dark" ? "Dark themes" : "Light themes"} (matches system)
            </p>
            <div className="grid grid-cols-4 gap-2">
              {suggestedThemes.map((t) => (
                <ThemeCard
                  key={t.id}
                  theme={t}
                  active={themeId === t.id}
                  onSelect={() => setThemeId(t.id as ThemeId)}
                />
              ))}
            </div>

            <p className="text-xs mt-4 mb-2" style={{ color: "var(--text-subtle)" }}>
              {systemTheme === "dark" ? "Light themes" : "Dark themes"}
            </p>
            <div className="grid grid-cols-4 gap-2">
              {otherThemes.map((t) => (
                <ThemeCard
                  key={t.id}
                  theme={t}
                  active={themeId === t.id}
                  onSelect={() => setThemeId(t.id as ThemeId)}
                />
              ))}
            </div>
          </div>

          {/* Font picker */}
          <div>
            <p className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>
              Font
            </p>
            <div className="flex flex-col border" style={{ borderColor: "var(--border)" }}>
              {fonts.map((font, i) => (
                <button
                  key={font.id}
                  onClick={() => setFontId(font.id as FontId)}
                  className="flex items-center justify-between px-4 py-3 transition-colors duration-100 text-left"
                  style={{
                    background: fontId === font.id ? "var(--bg-muted)" : "var(--surface)",
                    borderBottom: i < fonts.length - 1 ? "1px solid var(--border)" : "none",
                  }}
                >
                  <span
                    className="text-sm"
                    style={{
                      fontFamily: `var(${font.variable})`,
                      color: "var(--text)",
                    }}
                  >
                    {font.label}
                  </span>
                  <span
                    className="text-lg"
                    style={{
                      fontFamily: `var(${font.variable})`,
                      color: fontId === font.id ? "var(--accent)" : "var(--text-subtle)",
                    }}
                  >
                    {font.sample}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ---- TIMER ---- */}
        <section>
          <SectionTitle>Timer</SectionTitle>
          <div
            className="border divide-y"
            style={{ borderColor: "var(--border)", color: "var(--border)" }}
          >
            <Row label="Focus duration">
              <DurationControl
                value={focusDuration / 60}
                onChange={(v) => setTimerSettings({ focusDuration: v * 60 })}
                min={1}
                max={90}
              />
            </Row>
            <Row label="Short break">
              <DurationControl
                value={shortBreakDuration / 60}
                onChange={(v) => setTimerSettings({ shortBreakDuration: v * 60 })}
                min={1}
                max={30}
              />
            </Row>
            <Row label="Long break">
              <DurationControl
                value={longBreakDuration / 60}
                onChange={(v) => setTimerSettings({ longBreakDuration: v * 60 })}
                min={1}
                max={60}
              />
            </Row>
            <Row label="Long break after">
              <DurationControl
                value={longBreakInterval}
                onChange={(v) => setTimerSettings({ longBreakInterval: v })}
                min={2}
                max={8}
                unit="sessions"
              />
            </Row>
            <Row label="Auto-start breaks">
              <Toggle
                value={autoStartBreaks}
                onChange={(v) => setTimerSettings({ autoStartBreaks: v })}
              />
            </Row>
            <Row label="Auto-start pomodoros">
              <Toggle
                value={autoStartPomodoros}
                onChange={(v) => setTimerSettings({ autoStartPomodoros: v })}
              />
            </Row>
          </div>
        </section>

        {/* Preview */}
        <section>
          <SectionTitle>Preview</SectionTitle>
          <div
            className="border p-5 flex flex-col gap-2"
            style={{ borderColor: "var(--border)", background: "var(--surface)" }}
          >
            <p
              className="text-lg font-semibold"
              style={{ fontFamily: `var(${selectedFont.variable})`, color: "var(--text)" }}
            >
              The quick brown fox jumps over the lazy dog
            </p>
            <p
              className="text-sm"
              style={{ fontFamily: `var(${selectedFont.variable})`, color: "var(--text-muted)" }}
            >
              0123456789 — {selectedFont.label}
            </p>
          </div>
        </section>
      </div>
    </PageShell>
  );
}

/* Sub-components */
function ThemeCard({
  theme,
  active,
  onSelect,
}: {
  theme: (typeof themes)[0];
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.button
      onClick={onSelect}
      className="flex flex-col items-center gap-2 p-2 border text-center transition-colors duration-100"
      style={{
        borderColor: active ? "var(--accent)" : "var(--border)",
        background: "var(--surface)",
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.08 }}
    >
      {/* Color preview */}
      <div
        className="w-full h-6 border"
        style={{
          background: theme.preview.bg,
          borderColor: theme.preview.accent,
        }}
      />
      <div className="flex gap-1">
        <div className="w-3 h-3" style={{ background: theme.preview.accent }} />
        <div className="w-3 h-3" style={{ background: theme.preview.text }} />
      </div>
      <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>
        {theme.label}
      </span>
    </motion.button>
  );
}

function DurationControl({
  value,
  onChange,
  min,
  max,
  unit = "min",
}: {
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  unit?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        className="w-7 h-7 flex items-center justify-center border transition-colors hover:bg-[var(--bg-muted)]"
        style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
      >
        −
      </button>
      <span className="text-sm font-mono w-12 text-center" style={{ color: "var(--text)" }}>
        {value} {unit}
      </span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        className="w-7 h-7 flex items-center justify-center border transition-colors hover:bg-[var(--bg-muted)]"
        style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
      >
        +
      </button>
    </div>
  );
}

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className="relative w-10 h-5 border transition-colors duration-150"
      style={{
        borderColor: value ? "var(--accent)" : "var(--border)",
        background: value ? "var(--accent)" : "var(--surface)",
      }}
    >
      <motion.div
        className="absolute top-0.5 w-3.5 h-3.5"
        style={{ background: value ? "var(--accent-fg)" : "var(--border-strong)" }}
        animate={{ left: value ? "calc(100% - 18px)" : "2px" }}
        transition={{ type: "spring", stiffness: 500, damping: 40 }}
      />
    </button>
  );
}
