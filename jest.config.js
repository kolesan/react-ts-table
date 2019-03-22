module.exports = {
  verbose: false,
  reporters: [
    ["jest-summarizing-reporter", {diffs: true}]
  ],
  preset: "ts-jest",
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json"
  ],
  testEnvironment: 'node',
  // testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$"
};