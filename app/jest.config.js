module.exports = {
  setupFiles: ["<rootDir>/jest.env.js"],
  setupFilesAfterEnv: ["./jest.setup.js"],
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  moduleFileExtensions: ["ts", "tsx", "js", "json", "jsx"],
  testPathIgnorePatterns: [
    "<rootDir>[/\\\\](node_modules|.next)[/\\\\]",
    "__tests__/utils",
  ],
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
  moduleNameMapper: {
    "^@socii/shared/alpaca(.*)$": "<rootDir>/alpaca$1",
    "^@stream(.*)$": "<rootDir>/stream$1",
    "^@tests(.*)$": "<rootDir>/__tests__$1",
    "^@contexts(.*)$": "<rootDir>/contexts$1",
    "^@components(.*)$": "<rootDir>/components$1",
    "^@models(.*)$": "<rootDir>/models$1",
    "^@styles(.*)$": "<rootDir>/styles$1",
    "^@utils(.*)$": "<rootDir>/utils$1",
    "^@api(.*)$": "<rootDir>/pages/api$1",
    "^@lib(.*)$": "<rootDir>/lib$1",
    "^@hooks(.*)$": "<rootDir>/hooks$1",
    "^@pages(.*)$": "<rootDir>/pages$1",
    "^@public(.*)$": "<rootDir>/public$1",
    "^@icons(.*)$": "<rootDir>/public/icons$1",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
    "\\.(css|less)$": "identity-obj-proxy",
  },
  verbose: false,
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
  },
  collectCoverageFrom: ["**/*.{js,jsx,ts,tsx}", "!**/*.d.ts", "!**/node_modules/**"],
}
