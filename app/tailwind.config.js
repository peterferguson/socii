const colors = require("tailwindcss/colors");

module.exports = {
  mode: 'jit',
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#3fbaeb",
          DEFAULT: "#0fa9e6",
          dark: "#0c87b8",
          teal: "#a6fff8"
        },
        back: {
          DEFAULT: "#0D5F78",
          light: "#0E7B82",
          blue: "#005fff",
        },
        present: {
          DEFAULT: "#20e070",
        },
        blueGray: colors.blueGray,
        trueGray: colors.trueGray,
        teal: colors.teal,
        emerald: colors.emerald,
        lightBlue: colors.lightBlue,
        orange: colors.orange,
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
      spacing: {
        0.5: "0.125rem",
      },
      margin:{
        "-46": "-11.5rem",
      },
      borderRadius:{
        "2.5xl": "20px",
      },
      padding:{
        "1.5": "6px",
      },
      minHeight: {
        '60px': '60px',
      },
      minWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        '85': '85%',
        '215': '215px',
        '330': '330px',
      },
      maxWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        '95': '95%',
      },
      width: {
        88: "22rem",
        "1/7": "14.2857143%",
        "2/7": "28.5714286%",
        "3/7": "42.8571429%",
        "4/7": "57.1428571%",
        "5/7": "71.4285714%",
        "6/7": "85.7142857%",
    },
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
