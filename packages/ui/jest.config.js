module.exports = {
  rootDir: '../..',
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['<rootDir>/packages/ui/src/**/?(*.)+(spec|test).[jt]s?(x)'],
  setupFilesAfterEnv: ['<rootDir>/packages/ui/jest.setup.js'],
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
  /**
   * Ignore transforms except for these modules:

  * lottiefiles
  ```
    node_modules/@lottiefiles/dotlottie-react/dist/index.js:1
    ({"Object.<anonymous>":function(module,exports,require,__dirname,__filename,jest){import React, { useState, useRef, useCallback, useMemo, useEffect, useLayoutEffect } from 'react';
                                                                                      ^^^^^^

    SyntaxError: Cannot use import statement outside a module

      10 | const DotLottieReact: ComponentType<DotLottieReactProps> = dynamic(
      11 |   () =>
    > 12 |     import('@lottiefiles/dotlottie-react').then(
         |     ^
      13 |       (module) => module.DotLottieReact
      14 |     ),
      15 |   { ssr: false }

      at Runtime.createScriptFromCode (node_modules/jest-runtime/build/index.js:1505:14)
      at packages/ui/src/components/Media/MediaDotLottie.tsx:12:5

  ```

  * preact

  ```
    node_modules/@preact/signals-react/dist/signals.module.js:1
    ({"Object.<anonymous>":function(module,exports,require,__dirname,__filename,jest){export{Signal,batch,computed,effect,signal,untracked}from"@preact/signals-core";export{useComputed,useSignal,useSignalEffect}from"@preact/signals-react/runtime";//# sourceMappingURL=signals.module.js.map

    SyntaxError: Unexpected token 'export'

      20 |
      21 |   const computedDirection = blockHeaderBehavior.value
    > 22 |     ? ScrollDirection.DOWN
         |                       ^
      23 |     : direction;
      24 |
      25 |   return (

      at Runtime.createScriptFromCode (node_modules/jest-runtime/build/index.js:1505:14)
      at Object.<anonymous> (packages/ui/src/components/Header/HeaderContainer/HeaderContainer.tsx:22:23)
      at Object.<anonymous> (packages/ui/src/components/Header/HeaderContainer/HeaderContainer.spec.tsx:8:65)

  ```
  */
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!(@lottiefiles|@preact)/)',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/packages/ui/src/$1',
    '^styles(.*)$': '<rootDir>/packages/ui/src/styles/$1',
    '^components/(.*)$': '<rootDir>/packages/ui/src/components/$1',
    '^~test/(.*)$': '<rootDir>/packages/ui/src/test/$1',
  },
};
