import { globalCss } from './';

/**
 * these styles are visible only on staging/prod server/static builds
 */
const globalStyles = globalCss({
  '*': {
    boxSizing: 'border-box',

    '&:focus-visible': {
      outline: '$blue auto 1px',
    },
  },

  'html,body': {
    padding: 0,
    margin: 0,
    fontFamily: '"Inter", "Helvetica Neue",Helvetica,Arial,sans-serif',
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
    textRendering: 'optimizeLegibility',
    backgroundColor: '$cream',
    fontSize: '16px',
    scrollBehavior: 'smooth',
    scrollPaddingBlockStart: 'calc(48px + var(--headerPaddingY))', // default section padding
    width: '100%',
  },

  body: {
    // @radix-ui/react-select
    width: 'calc(100% - var(--removed-body-scroll-bar-size)) !important',
  },
  a: {
    color: 'inherit',
    textDecoration: 'none',
  },

  'h1, h2, h3, h4, h5, h6, p, q': {
    margin: 0,
    padding: 0,
    fontWeight: 400,
  },

  img: {
    maxWidth: '100%',
  },
  button: {
    all: 'unset',
    boxSizing: 'border-box',
    '&:not(:disabled)': {
      cursor: 'pointer',
    },
  },
  pre: {
    margin: 0,
  },
  '.no-scroll': {
    overflow: 'hidden',
  },
  // DOTCOM-2698 - https://www.intercom.com/help/en/articles/189-hide-the-messenger
  '.intercom-borderless-frame': {
    display: 'none !important',
  },
  ':root': {
    '--dynamic-max-width': '$gridMaxWidth$base',
    '@xs': {
      '--dynamic-max-width': '$gridMaxWidth$xs',
    },
    '@small': {
      '--dynamic-max-width': '$gridMaxWidth$small',
    },
    '@medium': {
      '--dynamic-max-width': '$gridMaxWidth$medium',
    },
    '@large': {
      '--dynamic-max-width': '$gridMaxWidth$large',
    },
    '@xl': {
      '--dynamic-max-width': '$gridMaxWidth$xl',
    },
  },
});

export const SetiGlobalStyles = globalCss({
  '*': {
    boxSizing: 'border-box',

    '&:focus-visible': {
      outline: '$blue auto 1px',
    },
  },

  'html,body': {
    padding: 0,
    margin: 0,
    fontFamily: '"Inter", "Helvetica Neue",Helvetica,Arial,sans-serif',
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
    textRendering: 'optimizeLegibility',
    fontSize: '16px',
    scrollBehavior: 'smooth',
    scrollPaddingBlockStart: 'calc(48px + var(--headerPaddingY))', // default section padding
    width: '100%',
  },

  body: {
    // @radix-ui/react-select
    width: 'calc(100% - var(--removed-body-scroll-bar-size)) !important',
    backgroundColor: '$black',
  },
  a: {
    color: 'inherit',
    textDecoration: 'none',
  },

  'h1, h2, h3, h4, h5, h6, p, q': {
    margin: 0,
    padding: 0,
    fontWeight: 400,
  },

  img: {
    maxWidth: '100%',
  },
  button: {
    all: 'unset',
    boxSizing: 'border-box',
    '&:not(:disabled)': {
      cursor: 'pointer',
    },
  },
  pre: {
    margin: 0,
  },
  '.no-scroll': {
    overflow: 'hidden',
  },
  // DOTCOM-2698 - https://www.intercom.com/help/en/articles/189-hide-the-messenger
  '.intercom-borderless-frame': {
    display: 'none !important',
  },
  '.recharts-legend-item-copy': {
    cursor: 'pointer',
    opacity: 0.75,
  },
  '.recharts-legend-item-copy:hover, .recharts-legend-item-copy:focus': {
    opacity: 1,
  },
  ':root': {
    colorScheme: 'only dark',

    '--dynamic-max-width': '$gridMaxWidth$base',
    '@xs': {
      '--dynamic-max-width': '$gridMaxWidth$xs',
    },
    '@small': {
      '--dynamic-max-width': '$gridMaxWidth$small',
    },
    '@medium': {
      '--dynamic-max-width': '$gridMaxWidth$medium',
    },
    '@large': {
      '--dynamic-max-width': '$gridMaxWidth$large',
    },
    '@xl': {
      '--dynamic-max-width': '$gridMaxWidth$xl',
    },
  },
});

export const EnableAlienMode = globalCss({
  'html, body, .recharts-default-legend, input[type="checkbox"], input[type="checkbox"] ~ label':
    {
      // this is needed because when on alien mode hovering over legend default browser cursor was being applied
      cursor: 'url(/assets/cursors/default.svg) 0 0, auto',
    },
  'li a:hover, a:hover, button:hover, div[role=button]:hover, .recharts-wrapper svg:hover, .recharts-legend-item-copy':
    {
      cursor: 'url(/assets/cursors/hand.svg) 0 0, auto',
    },
  body: {
    backgroundImage: 'url(/assets/Alien-land.svg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
  },
  section: {
    background: 'transparent !important',
  },
});

export default globalStyles;
