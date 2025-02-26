import type { ConfigType } from '@stitches/react/types/config';
import theme from 'telnyxdotcom-theme';

const remove1PxFrom = (viewport: keyof typeof theme.viewports) =>
  Number(theme.viewports[viewport].split('px')[0]) - 1 + 'px';

const customMedia = {
  lessThanSmall: `screen and (max-width: ${remove1PxFrom('small')})`,
  lessThanMedium: `screen and (max-width: ${remove1PxFrom('medium')})`,
  smallOnly: `screen and (min-width: ${
    theme.viewports.small
  }) and (max-width: ${remove1PxFrom('medium')})`,
  headerDesktop: `screen and (min-width: 1260px)`,
  headerMobileOnly: `screen and (max-width: 1259px)`,
};

const media: ConfigType.Media<typeof theme.viewports & typeof customMedia> = {
  ...customMedia,
  ...Object.entries(theme.viewports).reduce(
    (media, [name, value]) => ({
      ...media,
      [name]: `screen and (min-width: ${value})`,
    }),
    theme.viewports
  ),
};
export default media;
