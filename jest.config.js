/** @type {import('ts-jest').JestConfigWithTsJest} **/
// import AppendReporter from "./src/utils/jest-reporter";

// module.exports = {
export default {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  // reporters: [
  //   "default",
  // ["jest-junit", { outputDirectory: "reports", outputName: "report.xml" }],
  // ],
  // reporters: ["default", AppendReporter],
  reporters: ["default", "<rootDir>/jest_report.js"],
};

// import AppendReporter from "./src/utils/jest-reporter";

// export default {
//   reporters: ["default", AppendReporter],
// };
