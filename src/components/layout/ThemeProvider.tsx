"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
  resolvedTheme: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "system",
  setTheme: () => {},
  resolvedTheme: "light",
});

export function useTheme() {
  return useContext(ThemeContext);
}

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(resolved: "light" | "dark") {
  const root = document.documentElement;
  if (resolved === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  // Load saved theme from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("breath-theme") as Theme | null;
    if (saved && ["light", "dark", "system"].includes(saved)) {
      setThemeState(saved);
    }
    setMounted(true);
  }, []);

  // Resolve and apply theme whenever `theme` changes or system preference changes
  useEffect(() => {
    if (!mounted) return;

    const resolve = () => {
      const resolved = theme === "system" ? getSystemTheme() : theme;
      setResolvedTheme(resolved);
      applyTheme(resolved);
    };

    resolve();

    // Listen for system theme changes when in "system" mode
    if (theme === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => resolve();
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, [theme, mounted]);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    localStorage.setItem("breath-theme", t);
  }, []);

  // Prevent flash: render nothing or a hidden state until mounted
  // Actually, we render children always but the theme won't flash because
  // CSS defaults to light (no .dark class) which matches the initial state
  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
