module.exports = {
  setupFiles: ["<rootDir>/jest.env.js"],
  setupFilesAfterEnv: ["./jest.setup.js"],
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  moduleFileExtensions: ["ts", "tsx", "js", "json", "jsx"],
  testPathIgnorePatterns: [
    "<rootDir>[/\\\\](node_modules|.next)[/\\\\]",
    "__tests__/utils",
  ],
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$"],
  moduleNameMapper: {
    "^@alpaca(.*)$": "<rootDir>/alpaca$1",
    "^@stream(.*)$": "<rootDir>/stream$1",
    "^@tests(.*)$": "<rootDir>/__tests__$1",
    "^@contexts(.*)$": "<rootDir>/contexts$1",
    "^@components(.*)$": "<rootDir>/components$1",
    "^@model(.*)$": "<rootDir>/models$1",
    "^@styles(.*)$": "<rootDir>/styles$1",
    "^@utils(.*)$": "<rootDir>/utils$1",
    "^@api(.*)$": "<rootDir>/pages/api$1",
    "^@lib(.*)$": "<rootDir>/lib$1",
    "^@hooks(.*)$": "<rootDir>/hooks$1",
    "^@pages(.*)$": "<rootDir>/pages$1",
    "^@public(.*)$": "<rootDir>/public$1",
    "^@icons(.*)$": "<rootDir>/public/icons$1",
  },
  verbose: false,
}