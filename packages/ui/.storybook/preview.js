import { RouterContext } from 'next/dist/shared/lib/router-context';
import GlobalStyle from '../src/styles/GlobalStyle';
import { theme } from '../src/styles';

const getThemeViewports = () => {
  return Object.values(theme.viewports).reduce(
    (viewports, viewport) => ({
      ...viewports,
      [viewport.token]: {
        name: viewport.token.toUpperCase(),
        styles: {
          width: viewport.value,
          height: '100vh',
        },
      },
    }),
    {}
  );
};

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: {
      ...getThemeViewports(),
    },
  },
  backgrounds: {
    values: [
      { name: 'Figma', value: '#f5f5f5' },
      { name: 'Dark', value: theme.colors.black.value },
      { name: 'Cream', value: theme.colors.cream.value },
    ],
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
};
const withGlobalStyle = (Story, context) => (
  <>
    <GlobalStyle />
    <Story {...context} />
  </>
);

export const decorators = [withGlobalStyle];
