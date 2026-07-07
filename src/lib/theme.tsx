import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type ThemeId = "ac7" | "ac4" | "ac5" | "acz";

export const THEMES: { id: ThemeId; name: string; blurb: string; swatch: string[] }[] = [
  {
    id: "ac7",
    name: "AC7 · Skies Unknown",
    blurb: "Midnight blue · ice HUD · lens flare",
    swatch: ["#031124", "#8adfff", "#c9dcff"],
  },
  {
    id: "ac4",
    name: "AC4 · Tactical Map",
    blurb: "Deep navy · signal blue · red targets",
    swatch: ["#020916", "#35aaff", "#ff4c67"],
  },
  {
    id: "ac5",
    name: "AC5 · Unsung Briefing",
    blurb: "Black teal · mint grid · olive glow",
    swatch: ["#031111", "#7edfc0", "#a69a55"],
  },
  {
    id: "acz",
    name: "AC Zero · Belkan War",
    blurb: "Burnt red · amber HUD · fire glow",
    swatch: ["#160805", "#f2c133", "#e14516"],
  },
];

type Ctx = { theme: ThemeId; setTheme: (t: ThemeId) => void };
const ThemeCtx = createContext<Ctx | null>(null);
const THEME_IDS = new Set<ThemeId>(THEMES.map((theme) => theme.id));
const THEME_STORAGE_KEY = "sra-theme";

function isThemeId(value: string): value is ThemeId {
  return THEME_IDS.has(value as ThemeId);
}

function readStoredTheme() {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    return saved && isThemeId(saved) ? saved : null;
  } catch {
    return null;
  }
}

function writeStoredTheme(theme: ThemeId) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    return;
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeId>("ac7");

  useEffect(() => {
    const saved = readStoredTheme();
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    writeStoredTheme(theme);
  }, [theme]);

  return <ThemeCtx.Provider value={{ theme, setTheme }}>{children}</ThemeCtx.Provider>;
}

export function useTheme() {
  const v = useContext(ThemeCtx);
  if (!v) throw new Error("useTheme requires ThemeProvider");
  return v;
}
