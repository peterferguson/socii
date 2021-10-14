const colors = require("tailwindcss/colors")

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      backdropBlur: {
        xs: "2px",
      },
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
          light: {
            est: "#E6F4F1",
            er: "#EEFFF4",
            DEFAULT: "#EEFCFF",
            secondary: "#ECF4F9",
          },
          natural: {
            dark: "#4C9CA9",
          },
          shade: {
            blue: "#00A3EE",
            dark: "#007E95",
            darker: "#00576D",
            darkest: "#003248",
          },
          black: "#37373d",
          blue: { DEFAULT: "#36cff9" },
          purple: { DEFAULT: "#A181EE", light: "#CCB3FE" },
          pink: "#FF72B4",
          green: "#77B44E",
          lightGreen: "#79ffe1",
          lightPink: "#dca3c8",
          teal: "#3fba",
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
        gray: {
          ...colors.gray,
          50: "#f3f5f7",
        },
        teal: colors.teal,
        purple: colors.purple,
        emerald: colors.emerald,
        pink: colors.pink,
      },
      fontFamily: {
        "poppins-100": "poppins-100",
        "poppins-200": "poppins-200",
        "poppins-300": "poppins-300",
        "poppins-400": "poppins-400",
        "poppins-500": "poppins-500",
        "poppins-600": "poppins-600",
        "poppins-700": "poppins-700",
        "poppins-800": "poppins-800",
        "open-sans-300": "open-sans-300",
        "open-sans-400": "open-sans-400",
        "open-sans-600": "open-sans-600",
        "open-sans-700": "open-sans-700",
        "open-sans-800": "open-sans-800",
      },
      fontSize: {
        tiniest: "0.5rem",
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
      height: {
        screen: "calc(var(--innerVh, 1vh) * 100)",
      },
      maxHeight: {
        screen: "calc(var(--innerVh, 1vh) * 100)",
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
        "fade-in-down": "fade-in-down 0.5s ease-out",
        "fade-in-up": "fade-in-up 0.5s ease-out",
        "fade-in-right": "fade-in-down 0.5s ease-out",
        "fade-in-left": "fade-in-up 0.5s ease-out",
      },
      boxShadow: {
        left: "-0.5rem 0 0.5rem rgba(0, 0, 0, 0.3)",
      },
      scale: {
        "-1": "-1",
      },
      screens: {
        thin: "375px",
        lgr: "1152px",
        standalone: { raw: "(display-mode: standalone)" },
      },
      spacing: {
        0.5: "0.125rem",
        "safe-top": "env(safe-area-inset-top)",
        "safe-bottom": "env(safe-area-inset-bottom)",
        "safe-left": "env(safe-area-inset-left)",
        "safe-right": "env(safe-area-inset-right)",
      },
    },
  },
  variants: {
    scale: ["responsive", "hover", "focus", "focus-within"],
    extend: { backgroundColor: ["active"] },
  },
  plugins: [],
}
