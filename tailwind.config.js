/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/preline/preline.js",
  ],
  theme: {
    extend: {
      colors: {
        brown: "#734434",
        brown01: "#b47866",
        brown02: "#735f5f",
        lightBrown01: "#ECE1CD",
      },
    },
  },
  plugins: [require("preline/plugin")],
};
