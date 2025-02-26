import TypographyLink from '../Typography/Link';
import TypographyCTA from '../Typography/CTA';
import { css, styled } from '../../styles';
import IconExternal from '../Icons/External';

export const AnchorElement = 'a';

export const UnderlineElement = styled('span', {
  variants: {
    noUnderline: {
      false: {
        position: 'relative',
        [`&::before`]: {
          content: '',
          display: 'block',
          height: 0,
          width: '100%',
          position: 'absolute',
          bottom: '2px',
          transition: 'height 0.25s ease-out',
          zIndex: -1,
        },
      },
    },
    underlineAlwaysVisible: {
      true: {
        [`&::before`]: {
          height: '0.225em',
        },
      },
    },
    underlineColor: {
      green: {
        [`&::before`]: {
          backgroundColor: '$green',
        },
      },
      citron: {
        [`&::before`]: {
          backgroundColor: '$citron',
        },
      },
      cream: {
        [`&::before`]: {
          backgroundColor: '$cream',
        },
      },
    },
  },
  defaultVariants: {
    underlineColor: 'green',
  },
});

export const iconStyles = css({
  display: 'inline-block',
  marginLeft: '$xxxs',
  transition: 'translate 0.5s ease-out',
  width: '$lineHeights$small',
  height: '$lineHeights$small',
  translate: `0px 0px`,

  '@medium': {
    width: '$lineHeights$medium',
    height: '$lineHeights$medium',
  },
  verticalAlign: 'middle',
});

export const Icon = styled('span', iconStyles);
export const ExternalIcon = styled(IconExternal, iconStyles);

export const ArrowDownIcon = styled('span', iconStyles, {
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  // blue version
  backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfMjAzMTZfNTQwOSkiPgogICAgPHBhdGggZD0iTTExIDBMMTEgLTFMOSAtMUw5IDBMMTEgMFpNOSAwTDkgMTJMMTEgMTJMMTEgMEw5IDBaIiBmaWxsPSIjMzQzNEVGIiAvPgogICAgPHBhdGgKICAgICAgZD0iTTEwLjg5NDQgMTguMjExMUMxMC41MjU5IDE4Ljk0ODIgOS40NzQxIDE4Ljk0ODIgOS4xMDU1NyAxOC4yMTExTDUuNzIzNjEgMTEuNDQ3MkM1LjM5MTE2IDEwLjc4MjMgNS44NzQ2NSAxMCA2LjYxODA0IDEwTDEzLjM4MiAxMEMxNC4xMjUzIDEwIDE0LjYwODggMTAuNzgyMyAxNC4yNzY0IDExLjQ0NzJMMTAuODk0NCAxOC4yMTExWiIKICAgICAgZmlsbD0iIzM0MzRFRiIgLz4KICA8L2c+CiAgPGRlZnM+CiAgICA8Y2xpcFBhdGggaWQ9ImNsaXAwXzIwMzE2XzU0MDkiPgogICAgICA8cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9IndoaXRlIiAvPgogICAgPC9jbGlwUGF0aD4KICA8L2RlZnM+Cjwvc3ZnPgo=")`,
  ':hover > &': {
    // black version
    backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzIwMzE2XzU0MDkpIj4KPHBhdGggZD0iTTExIDBMMTEgLTFMOSAtMUw5IDBMMTEgMFpNOSAwTDkgMTJMMTEgMTJMMTEgMEw5IDBaIiBmaWxsPSJibGFjayIvPgo8cGF0aCBkPSJNMTAuODk0NCAxOC4yMTExQzEwLjUyNTkgMTguOTQ4MiA5LjQ3NDEgMTguOTQ4MiA5LjEwNTU3IDE4LjIxMTFMNS43MjM2MSAxMS40NDcyQzUuMzkxMTYgMTAuNzgyMyA1Ljg3NDY1IDEwIDYuNjE4MDQgMTBMMTMuMzgyIDEwQzE0LjEyNTMgMTAgMTQuNjA4OCAxMC43ODIzIDE0LjI3NjQgMTEuNDQ3MkwxMC44OTQ0IDE4LjIxMTFaIiBmaWxsPSJibGFjayIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzIwMzE2XzU0MDkiPgo8cmVjdCB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==")`,
  },
});

export const Content = styled('span', {
  display: 'inline-flex',
  alignItems: 'center',
  variants: {
    direction: {
      ltr: {
        [`&:hover ${Icon}`]: {
          translate: `4px 0`,
        },
      },
      rtl: {
        [`& ${UnderlineElement}`]: {
          order: 1,
        },

        [`& ${Icon}`]: {
          marginLeft: 0,
          marginRight: '$xs',
          order: 0,
        },

        [`&:hover ${Icon}`]: {
          translate: `-4px 0`,
        },
      },
    },
    noIconEffect: {
      true: {
        [`& ${Icon}`]: {
          marginLeft: '$xxs',
        },

        [`&:hover ${Icon}`]: {
          translate: `unset`,
        },
      },
    },
  },
});

export const Link = styled(Content, TypographyLink, {
  variants: {
    size: {
      small: {
        typography: '$label.mobile',
        '@medium': {
          typography: '$label',
        },
      },
    },
  },
});
export const CTA = styled(Content, TypographyCTA, {
  color: 'inherit',
  textDecoration: 'none',
  isolation: 'isolate',
});

export const Anchor = styled(AnchorElement, {
  cursor: 'pointer',
  [`&:hover ${UnderlineElement}, *:focus > & ${UnderlineElement}, &:focus ${UnderlineElement}, ${UnderlineElement}:hover`]:
    {
      outline: 0,

      [`&::before`]: {
        /* keep consistent across different font-sizes */
        height: '0.225em',
      },
    },
});
