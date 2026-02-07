// tailwind.config.js
import { defineConfig } from "tailwindcss";

export default defineConfig({
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./public/index.html"],
  theme: {
    extend: {
      screens: {
        xs: "320px",
      },
    },
  },
  plugins: [],
});
