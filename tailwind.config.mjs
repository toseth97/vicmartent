/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c3d66",
          950: "#051e3e",
        },
        secondary: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#145231",
        },
        accent: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
        },
        dark: "#0f172a",
        light: "#f8fafc",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-hero": "linear-gradient(135deg, #0c3d66 0%, #075985 100%)",
        "gradient-subtle": "linear-gradient(180deg, rgba(12, 61, 102, 0.05) 0%, transparent 100%)",
      },
      boxShadow: {
        "card": "0 10px 30px rgba(0, 0, 0, 0.08)",
        "card-hover": "0 20px 40px rgba(0, 0, 0, 0.12)",
        "soft": "0 4px 15px rgba(0, 0, 0, 0.05)",
      },
      borderRadius: {
        "3xl": "1.5rem",
      },
      spacing: {
        "128": "32rem",
      },
      transitionDuration: {
        "300": "300ms",
        "500": "500ms",
      },
    },
  },
  plugins: [],
};
