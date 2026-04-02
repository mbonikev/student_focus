"use client";

import { useEffect } from "react";
import { useAppStore } from "@/store/app-store";
import { fonts } from "@/lib/themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { lightThemeId, darkThemeId, fontId, systemTheme, setSystemTheme, activeThemeId } =
    useAppStore();

  /* Apply active theme to <html> whenever lightThemeId, darkThemeId, or systemTheme changes */
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", activeThemeId());
  }, [lightThemeId, darkThemeId, systemTheme, activeThemeId]);

  /* Apply chosen font as CSS variable on body */
  useEffect(() => {
    const font = fonts.find((f) => f.id === fontId);
    if (font) {
      document.body.style.setProperty("--app-font", `var(${font.variable})`);
    }
  }, [fontId]);

  /* Track system color-scheme — triggers theme switch automatically */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemTheme(mq.matches ? "dark" : "light");

    const handler = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [setSystemTheme]);

  return <>{children}</>;
}
