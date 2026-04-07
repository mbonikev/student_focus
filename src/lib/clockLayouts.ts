/**
 * Clock layout registry — the single place to register a new layout.
 *
 * To add a new layout:
 *   1. Create your component in src/components/clocks/ClockYourName.tsx
 *   2. Import it below and add one entry to `registry`
 *
 * Everything else (type, drawer, CSS vars) is derived automatically.
 */

import type React from "react";
import type { ClockData } from "@/hooks/useClockTime";
import { ClockMinimal } from "@/components/clocks/ClockMinimal";
import { ClockMidnight } from "@/components/clocks/ClockMidnight";

/** Use this for layouts that look the same in both light and dark mode. */
export const oneTheme = (vars: LayoutVars) => ({ dark: vars, light: vars });

export interface LayoutVars {
  "--ck-bg": string;
  "--ck-text": string;
  "--ck-muted": string;
  "--ck-surface": string;
  "--ck-border": string;
  "--ck-icon": string;
  "--ck-icon-hover": string;
  [key: string]: string; // allow layout-specific extras like --ck-scan
}

export interface LayoutEntry {
  id: string;
  label: string;
  Component: React.ComponentType<{
    clock: ClockData;
    preview?: boolean;
    showDate?: boolean;
  }>;
  vars: {
    dark: LayoutVars;
    light: LayoutVars;
  };
}

// Use `id: "name" as const` so TypeScript infers string literal types
const registry = [
  {
    id: "minimal" as const,
    label: "Minimal",
    Component: ClockMinimal,
    vars: {
      dark: {
        "--ck-bg": "#0a0a0a",
        "--ck-text": "#ffffff",
        "--ck-muted": "#ffffff83",
        "--ck-surface": "#ffffff0f",
        "--ck-border": "#ffffff14",
        "--ck-icon": "#ffffff73",
        "--ck-icon-hover": "#ffffffe6",
      },
      light: {
        "--ck-bg": "#f2f2f2",
        "--ck-text": "#0a0a0a",
        "--ck-muted": "#000000ae",
        "--ck-surface": "#0000000d",
        "--ck-border": "#00000017",
        "--ck-icon": "#00000066",
        "--ck-icon-hover": "#000000d9",
      },
    },
  },
  {
    id: "midnight" as const,
    label: "Midnight",
    Component: ClockMidnight,
    vars: oneTheme({
      "--ck-bg": "#0a0a0a",
      "--ck-text": "#ffffff",
      "--ck-muted": "#ffffff83",
      "--ck-surface": "#0a0a0a90",
      "--ck-border": "#ffffff14",
      "--ck-icon": "#ffffff73",
      "--ck-icon-hover": "#ffffffe6",
    }),
  },

];

/** Union type of all registered layout ids — auto-updated when you add an entry. */
export type ClockLayout = (typeof registry)[number]["id"];

export const CLOCK_LAYOUTS = registry satisfies LayoutEntry[];
