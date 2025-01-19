import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";
import { PluginAPI } from "tailwindcss/types/config";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F5F5F5",
        default: "#212121",
        gray: "#525252",
        grey: "#CCCCCC",
        white: "#FFF",
        // primary: "#FCC734",
        // primary_light: "#FF9F241A",
        // text_color: "#918FA8",
        // heading_color: "#1C1A3C",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        lato: ["Lato", "sans-serif"],
      },
      container: {
        screens: {
          DEFAULT: "1290px",
        },
        center: true,
        padding: "1.2rem",
      },
      backgroundImage: {
        "black-gradient":
          "linear-gradient(178deg, rgba(0, 0, 0, 0.00) 44.14%, #000 98.09%)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      screens: {
        xs: "540px",
      },
      animation: {
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
      },
      clipPath: {
        desktop: "polygon(0 10%, 100% 0, 100% 100%, 0 90%)",
        mobile: "polygon(0 0%, 100% 0, 100% 100%, 0 100%)",
      },
    },
  },
  darkMode: "class",
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [
    nextui(),
    tailwindcssAnimate,
    function ({ addComponents }: PluginAPI) {
      addComponents({
        ".dashboard-containers": {
          maxWidth: "100%", // Default for all screen sizes
          paddingTop: "2rem", // Default padding for all screen sizes
          paddingBottom: "2rem", // Default padding for all screen sizes
          paddingRight: "1rem", // Default padding for all screen sizes
          paddingLeft: "1rem", // Default padding for all screen sizes
          margin: "0 auto", // Center the container

          // For small screens (sm)
          "@screen sm": {
            maxWidth: "100%", // Full width
            padding: "2rem", // Adjust padding for small screens
          },

          // For medium screens (md)
          "@screen md": {
            maxWidth: "100%", // Medium screen container width
            padding: "2rem", // Adjust padding for medium screens
          },

          // For large screens (lg)
          "@screen lg": {
            maxWidth: "100%", // Larger screen container width
            padding: "2rem",
          },

          // For extra-large screens (xl)
          "@screen xl": {
            maxWidth: "100%", // Maximum width for the container on extra-large screens
            padding: "2rem",
          },
        },
      });
    },
  ],
};

export default config;
