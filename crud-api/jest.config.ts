module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts?$": "ts-jest"
  },
  testRegex: "/__tests__/.*\\.test\\.(js|ts)$",
  transformIgnorePatterns: [
    "<rootDir>/node_modules/"
  ],
}