
module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#3fbaeb",
          DEFAULT: "#0fa9e6",
          dark: "#0c87b8"
        },
      },
      fontFamily: {
        'work-sans': ['"Work Sans"', "sans-serif"],
        'poppins': ['Poppins', "sans-serif"],
      },
    },
  },
  variants: {
    scale: ["responsive", "hover", "focus", "focus-within"],
    extend: {
      backgroundColor: ["active"]
    },
  },
  plugins: [],
};
