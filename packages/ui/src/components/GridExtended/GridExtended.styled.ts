import { styled, theme } from '../../styles';

export const XL_LARGE = '@media screen and (min-width: 1792px)';

const viewportTokens = Object.entries(theme.extended_viewports).map(
  ([, { token }]) => token
);

const getDefaultGridContainerWidths = (
  viewports: Array<keyof typeof theme.extended_viewports>
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
  '@large': {
    gridTemplateColumns: 'repeat(12, 80px)',
    gap: '24px',
    maxWidth: '1224px',
  },
  [XL_LARGE]: {
    gridTemplateColumns: 'repeat(12, 88px)',
    gap: '32px',
    maxWidth: '1408px',
  },
});

export const Item = styled('div', {
  gridColumn: 'auto',
});
