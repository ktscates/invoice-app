/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        purple: "#7C5DFA",
        purpleHover: "#9277FF",
        red: "#EC5757",
        redHover: "#FF9797",
        navy: "#1E2139",
        navyHover: "#252945",
        lightGray: "#DFE3FA",
        gray: "#888EB0",
        blueGray: "#7E88C3",
        black: "#0C0E16",
        lightbg: "#F8F8FB",
        dark: "#141625",
      },

      fontFamily: {
        primary: ["League Spartan", "sans-serif"],
      },
    },
  },
  plugins: [],
};
