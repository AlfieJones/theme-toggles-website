const { colors } = require("tailwindcss/defaultTheme")
const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  mode: "jit",
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      extend: {
        fontFamily: {
          sans: ["Inter", ...defaultTheme.fontFamily.sans],
        },
      },
    },
    screens: {
      xs: "500px",
      ...defaultTheme.screens,
    },
    colors: {
      ...colors,
      dark: {
        50: "#383838",
        100: "#343434",
        200: "#333333",
        300: "#2e2e2e",
        400: "#2c2c2c",
        500: "#272727",
        600: "#242424",
        700: "#222222",
        800: "#1e1e1e",
        900: "#121212",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
