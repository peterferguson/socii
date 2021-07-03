const colors = require("tailwindcss/colors")

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        palette: {
          darkest: "#1595c9",
          dark: "#17a7e0",
          primary: "#28b2e9",
          light: "#56c2ed",
          lighter: "#6dcbf0",
          lightest: "#84d3f2",
        },
        brand: {
          // - brand colors based on DEFAULT using mycolors.space
          DEFAULT: "#3fbaeb",
          natural: {
            lightest: "#E6F4F1",
            light: "#EEFCFF",
            dark: "#4C9CA9",
          },
          shade: {
            blue: "#00A3EE",
            dark: "#007E95",
            darker: "#00576D",
            darkest: "#003248",
          },
          purple: { DEFAULT: "#A181EE", light: "#CCB3FE" },
          pink: "#FF72B4",
          green: "#77B44E",
          lightGreen: "#79ffe1",
          lightPink: "#dca3c8",
          lightTeal: "#a6fff8",
          cyan: {
            DEFAULT: "#00D2EA",
            green: "#38E8D9",
            vivid: "#11D5ED",
          },
        },
        bitcoin: "#f2a900",
        facebook: "#1778f2",
        twitter: "#1DA1F2",
        blueGray: colors.blueGray,
        trueGray: colors.trueGray,
        teal: colors.teal,
        emerald: colors.emerald,
        orange: colors.orange,
        pink: colors.pink,
      },
      fontFamily: {
        "work-sans": ['"Work Sans"', "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      fontSize: {
        tiny: "0.625rem",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": {
            transform: "rotate(-3deg)",
          },
          "50%": {
            transform: "rotate(3deg)",
          },
        },
        "fade-in-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-in-left": {
          "0%": {
            opacity: "0",
            transform: "translateX(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        "fade-in-right": {
          "0%": {
            opacity: "0",
            transform: "translateX(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
        "fade-in-down": "fade-in-down 0.5s ease-out",
        "fade-in-up": "fade-in-up 0.5s ease-out",
        "fade-in-right": "fade-in-down 0.5s ease-out",
        "fade-in-left": "fade-in-up 0.5s ease-out",
      },
      boxShadow: {
        left: "-1rem 0 3rem rgba(0, 0, 0, 0.3)",
      },
      scale: {
        "-1": "-1",
      },
      screens: {
        lgr: "1152px",
      },
      spacing: {
        0.5: "0.125rem",
      },
    },
  },
  variants: {
    scale: ["responsive", "hover", "focus", "focus-within"],
    extend: {
      backgroundColor: ["active"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
