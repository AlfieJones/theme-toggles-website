const defaultTheme = require("tailwindcss/defaultTheme")

const plugin = require("tailwindcss/plugin");

const scrollbar = plugin(function ({ addUtilities, matchUtilities, theme }) {
    const scrollbarTrackColorValue = (value) => ({
        '--scrollbar-track': value,
        '&::-webkit-scrollbar-track': {
            "background-color": value
        }
    })

    const scrollbarTrackRoundedValue = (value) => ({
        '&::-webkit-scrollbar-track': {
            "border-radius": value
        }
    });

    const scrollbarThumbColorValue = (value) => ({
        '--scrollbar-thumb': value,
        '&::-webkit-scrollbar-thumb': {
            "background-color": value
        }
    });

    const scrollbarThumbRoundedValue = (value) => ({
        '&::-webkit-scrollbar-thumb': {
            "border-radius": value
        }
    });

    addUtilities({
        '.scrollbar': {
            '--scrollbar-thumb': '#cdcdcd',
            '--scrollbar-track': '#f0f0f0',
            '--scrollbar-width': '17px',
            'scrollbar-color': 'var(--scrollbar-thumb) var(--scrollbar-track)',
            '&::-webkit-scrollbar': {
                'width': 'var(--scrollbar-width)'
            }
        },
        '.scrollbar-thin': {
            '--scrollbar-width': '8px',
            'scrollbar-width': 'thin'
        }
    });

    Object.entries(theme('colors')).forEach(([colorName, color]) => {
        switch (typeof color) {
            case 'object':
                matchUtilities(
                    {
                        [`scrollbar-track-${colorName}`]: (value) => (scrollbarTrackColorValue(value)),
                        [`scrollbar-thumb-${colorName}`]: (value) => (scrollbarThumbColorValue(value))
                    },
                    {
                        values: color
                    }
                )
                break;
            case 'function':
                addUtilities({
                    [`.scrollbar-track-${colorName}`]: scrollbarTrackColorValue(color({})),
                    [`.scrollbar-thumb-${colorName}`]: scrollbarThumbColorValue(color({}))
                })
                break;
            case 'string':
                addUtilities({
                    [`.scrollbar-track-${colorName}`]: scrollbarTrackColorValue(color),
                    [`.scrollbar-thumb-${colorName}`]: scrollbarThumbColorValue(color)
                })
                break;
        }
    });

    matchUtilities(
        {
            'scrollbar-track-rounded': (value) => (scrollbarTrackRoundedValue(value)),
            'scrollbar-thumb-rounded': (value) => (scrollbarThumbRoundedValue(value))
        },
        {
            values: theme('borderRadius')
        }
    )
});

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
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
      colors: {
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
    screens: {
      "2xs": "400px",
      xs: "500px",
      ...defaultTheme.screens,
    },

  },
  plugins: [scrollbar],
}
