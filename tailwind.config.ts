import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        // Primary text: near-black
        primary: {
          DEFAULT: "#0c0c0c",
          foreground: "#0c0c0c",
        },
        // Dominant background
        background: "#ffffff",
        // Cool greys: UI structure, dividers, secondary text
        grey: {
          50: "#f8f9fa",
          100: "#f1f3f5",
          200: "#e9ecef",
          300: "#dee2e6",
          400: "#ced4da",
          500: "#adb5bd",
          600: "#868e96",
          700: "#495057",
          800: "#343a40",
          900: "#212529",
        },
        // Semantic alias for secondary text / muted
        muted: {
          DEFAULT: "#495057",
          foreground: "#868e96",
        },
      },
      backgroundImage: {
        "gradient-signature":
          "linear-gradient(135deg, #7c3aed 0%, #2563eb 25%, #db2777 50%, #ea580c 100%)",
        "gradient-signature-soft":
          "linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(37,99,235,0.1) 25%, rgba(219,39,119,0.1) 50%, rgba(234,88,12,0.12) 100%)",
      },
      borderRadius: {
        DEFAULT: "0.75rem",
        sm: "0.5rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        full: "9999px",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
      },
      lineHeight: {
        relaxed: "1.625",
        loose: "1.75",
      },
      boxShadow: {
        soft: "0 2px 8px rgba(12, 12, 12, 0.06)",
        medium: "0 4px 20px rgba(12, 12, 12, 0.08)",
        subtle: "0 1px 3px rgba(12, 12, 12, 0.04)",
      },
      transitionDuration: {
        DEFAULT: "200ms",
      },
      transitionTimingFunction: {
        DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      fontWeight: {
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
    },
  },
  plugins: [],
};

export default config;
