import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    
    const [theme, setTheme] = useState<Theme>(() => {
      if (typeof window !== "undefined") {
        return (localStorage.getItem("theme") as Theme) || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      }
      return "light";
    });

    useEffect(() => {
        if (theme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
  
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    
    return context;
}
