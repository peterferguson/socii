module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    // "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:tailwind/recommended",
    // "plugin:tailwindcss/recommended",
  ],
  globals: {
    React: true,
    JSX: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: [
    "react",
    "@typescript-eslint",
    // "tailwindcss"
  ],
  rules: {
    "react/prop-types": 0,
    "react/display-name": 0,
    "no-unused-vars": 0,
    "react/react-in-jsx-scope": 0,
    "react/jsx-no-target-blank": 0,
    "@typescript-eslint/no-unused-vars": 0,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
}
