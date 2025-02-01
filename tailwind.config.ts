import defaultTheme from 'tailwindcss/defaultTheme';
import type { Config } from "tailwindcss";
import tailwindcssAnimate from 'tailwindcss-animate';
import tailwindcssForms from '@tailwindcss/forms';
import tailwindcssTypography from '@tailwindcss/typography';

const config: Config = {
  darkMode: "class", 
  content: ["./src/**/*.{tsx,ts}"], 
  theme: {
      extend: {
          colors: {
              primary: {
                light: "#2563eb",
                dark: "#1e40af",
              },
              background: {
                light: "#ffffff",
                dark: "#111827",
              },
              text: {
                light: "#1f2937",
                dark: "#f9fafb",
              },
          },
          fontFamily: {
              sans: ['var(--font-space-default)', ...defaultTheme.fontFamily.sans],
              display: ['var(--font-space-display)', ...defaultTheme.fontFamily.sans],
              cursive: ['cursive'],
          },

      },
  },
  plugins: [
  
    tailwindcssAnimate,
    tailwindcssForms,
    tailwindcssTypography,
  ],
};

export default config;
