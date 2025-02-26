import path, { dirname, join } from 'path';

/** @type {import('@storybook/nextjs').StorybookConfig} */
const config = {
  staticDirs: ['../public'],
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-interactions'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('storybook-addon-pseudo-states'),
  ],
  typescript: {
    reactDocgen:
      process.env.STORYBOOK_NO_DOCS === 'true'
        ? false
        : 'react-docgen-typescript',
  },
  docs: {
    autodocs: true,
  },
  framework: {
    name: getAbsolutePath('@storybook/nextjs'),
    options: { fastRefresh: true },
    nextConfigPath: path.resolve(
      __dirname,
      '../../telnyxdotcom/next.config.js'
    ),
  },
  core: {
    builder: getAbsolutePath('@storybook/builder-webpack5'),
  },
  features: {
    interactionsDebugger: true,
  },
  webpackFinal: async (config, { configType }) => {
    // Root alias for storybook
    config.resolve.modules.push(path.resolve(__dirname, '../src'));
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src'),
    };

    return config;
  },
};

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')));
}

export default config;
