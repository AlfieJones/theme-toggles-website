const colors = require("tailwindcss/colors")
const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx}",
    "./src/toggles/data/meta.ts",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        "sm-strong": "0 1px 2px 0 rgba(0, 0, 0, 0.25)",
        strong:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.25)",
        "md-strong":
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.25)",
        "lg-strong":
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.25)",
        "xl-strong":
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.25)",
        "2xl-strong": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        "inner-strong": "inset 0 2px 4px 0 rgba(0, 0, 0, 0.25)",
      },
    },
    screens: {
      "2xs": "400px",
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
        850: "#171717",
        900: "#121212",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
}
