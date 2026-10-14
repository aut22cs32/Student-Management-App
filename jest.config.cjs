
module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css)$": "<rootDir>/testStyleMock.cjs",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};