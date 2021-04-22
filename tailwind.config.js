const colors = require('tailwindcss/colors');

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#3fbaeb",
          DEFAULT: "#0fa9e6",
          dark: "#0c87b8",
        },
        back: {
          DEFAULT: "#0D5F78",
          light: "#0E7B82"
        },
        gray: colors.blueGray,
        teal: colors.teal,
        orange: colors.orange,
      },
      fontFamily: {
        "work-sans": ['"Work Sans"', "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      fontSize: {
        "tiny": "0.625rem"
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
      boxShadow:{
        "left": "-1rem 0 3rem rgba(0, 0, 0, 0.3)",
      },
      spacing:{
        "0.5": "0.125rem",
      }
    },
  },
  variants: {
    scale: ["responsive", "hover", "focus", "focus-within"],
    extend: {
      backgroundColor: ["active"],
    },
  },
  plugins: [],
};
