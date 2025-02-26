import { styled, theme } from '../../styles';

const viewportTokens = Object.entries(theme.viewports).map(
  ([, { token }]) => token
);

const getDefaultGridContainerWidths = (
  viewports: Array<keyof typeof theme.viewports>
) =>
  viewports.reduce(
    (gridContainerWidths, viewport) => ({
      ...gridContainerWidths,
      [`@${viewport}`]: {
        gridContainerWidth: viewport,
      },
    }),
    {}
  );

export const Container = styled('div', {
  display: 'grid',
  justifyContent: 'space-between',
  margin: '0 auto',
  gridContainerWidth: 'base',
  ...getDefaultGridContainerWidths(viewportTokens),
  variants: {
    increasedWidth: {
      true: {
        '@large': {
          maxWidth: '1120px',
        },
      },
    },
  },
});

export const Item = styled('div', {
  gridColumn: 'auto',
});
