import type { Config } from 'jest';

const config: Config = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!**/**.d.ts',
    // "!**/*index.ts",
    // "!src/helpers/**.*",
  ],
  testEnvironment: 'jsdom',
  // testRegex: [
  //   "^(?!.*\.(mock.spec)\.ts$).*\.spec.(ts|tsx)$"
  // ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.(ts|js|tsx|jsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  // moduleNameMapper: {
  //   "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  // },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/coverage',
    'package.json',
    'package-lock.json',
    'reportWebVitals.ts',
    'setupTests.ts',
    'index.tsx',
  ],
};

export default config;
