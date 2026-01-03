import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-main': '#232020',
        'bg-card': '#2c2a2a',
        'bg-header': 'rgba(30, 28, 28, 0.85)',
        'bg-footer': '#1a1818',
        'text-primary': '#f0f0f0',
        'text-secondary': '#b0b0b0',
        'text-headings': '#ffffff',
        'accent-primary': '#ffffff',
        'accent-secondary': '#cccccc',
        'button-bg-light': '#e0e0e0',
        'button-text-dark': '#232020',
        'shadow-color': 'rgba(255, 255, 255, 0.05)',
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;


