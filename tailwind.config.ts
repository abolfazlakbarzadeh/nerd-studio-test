import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        nav: "#ececee",
        disable: "#dadee3",
        secondary: "#8a939d",
        "white-secondary": "hsl(0deg 0% 100% / 65.1%)",
        brand: "#6841ea",
        grayblue: "rgba(79, 89, 102, .08)",
        active: "#20262e",
        "grayblue-8": "rgba(79, 89, 102, .08)",
        "grayblue-300": "#dadee3",
        "grayblue-400": "#c0c5cc",
        "grayblue-600": "#545c66",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
