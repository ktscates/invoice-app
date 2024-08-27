/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      screens: {
        xs: "375px",
        sm: "640px",
        md: "1024px",
        lg: "1280px",
      },
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
        sidebar: "#373B53",
        divider: "#494E6E",
      },

      fontFamily: {
        primary: ["League Spartan", "sans-serif"],
      },
    },
  },
  plugins: [],
};
