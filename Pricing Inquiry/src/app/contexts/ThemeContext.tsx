import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface ThemeColors {
  sidebarBg: string;
  sidebarBorder: string;
  sidebarText: string;
  sidebarTextMuted: string;
  sidebarHover: string;
  sidebarActive: string;
  mainBg: string;
  cardBg: string;
  cardBorder: string;
  primary: string;
  primaryLight: string;
  primaryText: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  inputBg: string;
  inputBorder: string;
  messageBg: string;
  headerBg: string;
  headerBorder: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  tagBg: string;
  rightBg: string;
  stepConnector: string;
  securityBg: string;
  securityText: string;
  suggestionBg: string;
  suggestionBorder: string;
  suggestionHover: string;
}

const light: ThemeColors = {
  sidebarBg: "#ffffff",
  sidebarBorder: "#E5E7EB",
  sidebarText: "#111827",
  sidebarTextMuted: "#6B7280",
  sidebarHover: "rgba(17,24,39,0.04)",
  sidebarActive: "rgba(28,114,36,0.12)",
  mainBg: "#F9FAFB",
  cardBg: "#FFFFFF",
  cardBorder: "#E5E7EB",
  primary: "#1c7224",
  primaryLight: "#DCFCE7",
  primaryText: "#14532D",
  text: "#111827",
  textSecondary: "#6B7280",
  textMuted: "#9CA3AF",
  border: "#E5E7EB",
  inputBg: "#F9FAFB",
  inputBorder: "#D1D5DB",
  messageBg: "#F3F4F6",
  headerBg: "#FFFFFF",
  headerBorder: "#E5E7EB",
  badgeBg: "#DCFCE7",
  badgeBorder: "#BBF7D0",
  badgeText: "#14532D",
  tagBg: "#F3F4F6",
  rightBg: "#F9FAFB",
  stepConnector: "#D1D5DB",
  securityBg: "#DCFCE7",
  securityText: "#14532D",
  suggestionBg: "#FFFFFF",
  suggestionBorder: "#E5E7EB",
  suggestionHover: "#F9FAFB",
};

const dark: ThemeColors = {
  sidebarBg: "#0F172A",
  sidebarBorder: "#334155",
  sidebarText: "rgba(255,255,255,0.95)",
  sidebarTextMuted: "rgba(255,255,255,0.75)",
  sidebarHover: "rgba(255,255,255,0.06)",
  sidebarActive: "rgba(28,114,36,0.18)",
  mainBg: "#0F172A",
  cardBg: "#1E293B",
  cardBorder: "#334155",
  primary: "#1c7224",
  primaryLight: "#14532D",
  primaryText: "#86EFAC",
  text: "#F1F5F9",
  textSecondary: "#94A3B8",
  textMuted: "#64748B",
  border: "#334155",
  inputBg: "#0F172A",
  inputBorder: "#475569",
  messageBg: "#1E293B",
  headerBg: "#1E293B",
  headerBorder: "#334155",
  badgeBg: "#14532D",
  badgeBorder: "#14532D",
  badgeText: "#DCFCE7",
  tagBg: "#0F172A",
  rightBg: "#1E293B",
  stepConnector: "#475569",
  securityBg: "#14532D",
  securityText: "#DCFCE7",
  suggestionBg: "#1E293B",
  suggestionBorder: "#334155",
  suggestionHover: "#334155",
};

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  c: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggleTheme: () => {},
  c: light,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("sb100-theme");
    if (stored === "dark") setIsDark(true);
  }, []);

  function toggleTheme() {
    setIsDark((v) => {
      const next = !v;
      localStorage.setItem("sb100-theme", next ? "dark" : "light");
      return next;
    });
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, c: isDark ? dark : light }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}