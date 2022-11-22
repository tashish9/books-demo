/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#27378C",
      },
      screens: {
        xs: "450px",
      },
      fontFamily: {
        sans: ["Satoshi", "sans-serif"],
      },
      aspectRatio: {
        a4: "1 / 1.44",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
