const { colors: defaultColors } = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */

const colors = {
  primary: {
    default: "#6e38e5",
    light: '#8c6bd6'
  },
  border: {
    light: '#9875e6'
  }
};

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors,
    },
  },
  plugins: [],
};
