export type ThemeId =
  | "light-default"
  | "light-warm"
  | "light-cool"
  | "light-mint"
  | "dark-default"
  | "dark-midnight"
  | "dark-ember"
  | "dark-forest";

export type FontId =
  | "inter"
  | "jetbrains"
  | "space-grotesk"
  | "geist"
  | "plus-jakarta"
  | "ibm-plex";

export interface ThemeDef {
  id: ThemeId;
  label: string;
  mode: "light" | "dark";
  preview: { bg: string; accent: string; text: string };
}

export interface FontDef {
  id: FontId;
  label: string;
  variable: string;
  sample: string;
}

export const themes: ThemeDef[] = [
  {
    id: "light-default",
    label: "Default",
    mode: "light",
    preview: { bg: "#f5f5f5", accent: "#1a1a1a", text: "#0a0a0a" },
  },
  {
    id: "light-warm",
    label: "Warm",
    mode: "light",
    preview: { bg: "#faf7f2", accent: "#8b4513", text: "#1c1410" },
  },
  {
    id: "light-cool",
    label: "Cool",
    mode: "light",
    preview: { bg: "#f0f4f8", accent: "#0369a1", text: "#0d1b2a" },
  },
  {
    id: "light-mint",
    label: "Mint",
    mode: "light",
    preview: { bg: "#f0faf4", accent: "#166534", text: "#0a1f14" },
  },
  {
    id: "dark-default",
    label: "Default",
    mode: "dark",
    preview: { bg: "#0a0a0a", accent: "#e5e5e5", text: "#fafafa" },
  },
  {
    id: "dark-midnight",
    label: "Midnight",
    mode: "dark",
    preview: { bg: "#050510", accent: "#7c7cff", text: "#e8e8ff" },
  },
  {
    id: "dark-ember",
    label: "Ember",
    mode: "dark",
    preview: { bg: "#0f0800", accent: "#ff8c00", text: "#fff8f0" },
  },
  {
    id: "dark-forest",
    label: "Forest",
    mode: "dark",
    preview: { bg: "#060f08", accent: "#4ade80", text: "#e8f5ea" },
  },
];

export const fonts: FontDef[] = [
  {
    id: "inter",
    label: "Inter",
    variable: "--font-inter",
    sample: "Aa",
  },
  {
    id: "jetbrains",
    label: "JetBrains Mono",
    variable: "--font-jetbrains-mono",
    sample: "Aa",
  },
  {
    id: "space-grotesk",
    label: "Space Grotesk",
    variable: "--font-space-grotesk",
    sample: "Aa",
  },
  {
    id: "geist",
    label: "Geist",
    variable: "--font-geist-sans",
    sample: "Aa",
  },
  {
    id: "plus-jakarta",
    label: "Plus Jakarta Sans",
    variable: "--font-plus-jakarta",
    sample: "Aa",
  },
  {
    id: "ibm-plex",
    label: "IBM Plex Mono",
    variable: "--font-ibm-plex-mono",
    sample: "Aa",
  },
];
