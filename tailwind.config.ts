/** @type{import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';
import type { Config } from "tailwindcss";
import tailwindcss from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate';
import tailwindcssForms from '@tailwindcss/forms';
import tailwindcssTypography from '@tailwindcss/typography';
import preline from 'preline/plugin';


const config: Config = {
  darkMode: "class", 
  content: [
      './index.html',
      './src/**/*.{html,js,jsx,ts,tsx}',
      'node_modules/preline/dist/*.js', 
  ], 
  theme: {
      extend: {
          colors: {
              primary: {
                light: "#2563eb",
                dark: "#1e40af",
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
    preline,
    tailwindcss,
    tailwindcssAnimate,
    tailwindcssForms,
    tailwindcssTypography,
  ],
};

export default config;
