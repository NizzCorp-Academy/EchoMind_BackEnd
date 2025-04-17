// /** @type {import('ts-jest').JestConfigWithTsJest} **/
// module.exports = {
//     testEnvironment: "node",
//     transform: {
//       "^.+\.tsx?$": ["ts-jest",{}],
//     },
//   };
import type { Config } from 'jest';

const config: Config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default config;
