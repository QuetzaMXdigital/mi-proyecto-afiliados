import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        quetza: {
          green: '#0D5C46', // El verde esmeralda institucional
          gold: '#C59A3F',  // El dorado de los botones y etiquetas
        }
      }
    },
  },
  plugins: [],
};
export default config;