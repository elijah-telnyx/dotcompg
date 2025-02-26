// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.mjs and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  rootDir: "../..",

  // If you're using [Module Path Aliases](https://nextjs.org/docs/advanced-features/module-path-aliases),
  // you will have to add the moduleNameMapper in order for jest to resolve your absolute paths.
  // The paths have to be matching with the paths option within the compilerOptions in the tsconfig.json
  // For example:

  moduleNameMapper: {
    "^ui/(.*)$": "<rootDir>/packages/ui/src/$1",
    "^components/(.*)": "<rootDir>/packages/seti/src/components/$1",
    "^constants/(.*)": "<rootDir>/packages/seti/src/constants/$1",
    "^data/(.*)": "<rootDir>/packages/seti/src/data/$1",
    "^env/(.*)": "<rootDir>/packages/seti/src/env/$1",
    env: "<rootDir>/packages/seti/src/env",
    "^lib/(.*)": "<rootDir>/packages/seti/src/lib/$1",
    "^services/(.*)": "<rootDir>/packages/seti/src/services/$1",
    "^utils/(.*)": "<rootDir>/packages/seti/src/utils/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/packages/seti/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  testMatch: ["<rootDir>/packages/seti/src/**/?(*.)+(spec|test).[jt]s?(x)"],
  testPathIgnorePatterns: ["/node_modules/"],
  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        jsc: {
          parser: {
            syntax: "typescript",
            tsx: true,
            dynamicImport: true, // account for dynamic imports in components
            topLevelAwait: true, // handle awaits
          },
          transform: {
            react: {
              // to account new React versions where import React is not needed
              runtime: "automatic",
            },
          },
        },
      },
    ],
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
