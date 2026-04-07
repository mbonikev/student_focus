"use client";

import { useState, useEffect } from "react";

export type Theme = "light" | "dark";
export type ClockLayout = "minimal";

export interface Settings {
  theme: Theme;
  clockLayout: ClockLayout;
  timezone: string;
  showDate: boolean;
}

const STORAGE_KEY = "special-clocks";

const DEFAULT: Settings = {
  theme: "dark",
  clockLayout: "minimal",
  timezone: "UTC",
  showDate: true,
};

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(DEFAULT);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const browserTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<Settings>;
        setSettings({ ...DEFAULT, timezone: browserTz, ...parsed });
      } else {
        setSettings({ ...DEFAULT, timezone: browserTz });
      }
    } catch {
      setSettings({ ...DEFAULT, timezone: browserTz });
    }
    setMounted(true);
  }, []);

  function update(patch: Partial<Settings>) {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }

  return { settings, update, mounted };
}
