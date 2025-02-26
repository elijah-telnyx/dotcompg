// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.mjs and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  rootDir: '../..',

  // If you're using [Module Path Aliases](https://nextjs.org/docs/advanced-features/module-path-aliases),
  // you will have to add the moduleNameMapper in order for jest to resolve your absolute paths.
  // The paths have to be matching with the paths option within the compilerOptions in the tsconfig.json
  // For example:

  moduleNameMapper: {
    '^ui/(.*)$': '<rootDir>/packages/ui/src/$1',
    '^components/(.*)': '<rootDir>/packages/telnyxdotcom/src/components/$1',
    '^constants/(.*)': '<rootDir>/packages/telnyxdotcom/src/constants/$1',
    '^env/(.*)': '<rootDir>/packages/telnyxdotcom/src/env/$1',
    '^hooks/(.*)': '<rootDir>/packages/telnyxdotcom/src/hooks/$1',
    '^lib/(.*)': '<rootDir>/packages/telnyxdotcom/src/lib/$1',
    '^services/(.*)': '<rootDir>/packages/telnyxdotcom/src/services/$1',
    '^utils/(.*)': '<rootDir>/packages/telnyxdotcom/src/utils/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/packages/telnyxdotcom/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['<rootDir>/packages/telnyxdotcom/src/**/?(*.)+(spec|test).[jt]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: true,
            dynamicImport: true, // account for dynamic imports in components
            topLevelAwait: true, // handle awaits
          },
          transform: {
            react: {
              // to account new React versions where import React is not needed
              runtime: 'automatic',
            },
          },
        },
      },
    ],
  },

  // for reason, see packages/ui/jest.config.js
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!(@lottiefiles|@preact)/)'],
};

async function jestConfig() {
  // createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
  const nextJestConfig = await createJestConfig(customJestConfig)();
  // /node_modules/ is the first pattern
  nextJestConfig.transformIgnorePatterns[0] = '<rootDir>/node_modules/(?!(@lottiefiles|@preact)/)';
  return nextJestConfig;
}

// https://github.com/vercel/next.js/issues/35634#issuecomment-1115250297
module.exports = jestConfig;
