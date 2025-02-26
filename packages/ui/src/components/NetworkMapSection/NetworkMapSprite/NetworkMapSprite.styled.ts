import { keyframes, styled } from '../../../styles';

const fade = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const getTransition = (property: string | { (): string; name: string }) =>
  `${property} .25s linear`;

export const Group = styled('g', {});

export const Path = styled('path', {});

export const IconFlag = styled('img', {
  width: 14,
  height: 16,
  paddingBlockStart: '$xxs',
});

export const Tooltip = styled('div', {
  backgroundColor: '$cream',
  borderRadius: '$small',
  boxShadow: '$blackBackgroundBlue',
  color: '$black',
  display: 'none',
  maxHeight: 68,
  minWidth: 108,
  maxWidth: 102,
  width: 'max-content',
  padding: '$small',
  position: 'fixed', // needed because element position is determined by the SVG Path getBoundingClientRect
  top: '50%',
  left: '50%',
  pointerEvents: 'all',
  overflow: 'hidden',
  opacity: 0,
  animation: `${getTransition(fade)}`,

  '@medium': {
    maxHeight: 92,
    minWidth: 148,
    maxWidth: 204,
  },

  '&:focus, &:active': {
    zIndex: 2,
    display: 'block',
    opacity: 1,
  },

  variants: {
    copy: {
      true: {
        '&:hover, &:active': {
          cursor: 'pointer',
        },
      },
      false: {},
    },
  },
});

export const TitleText = styled('span', {
  display: 'none',

  '@medium': {
    display: 'block',
  },
});

export const Title = styled('div', {
  display: 'flex',
  alignItems: 'baseline',
  gap: '$xxs',
  fontFamily: '$formula',
  fontSize: '$xs',
  fontWeight: '$extrabold',
  fontStyle: 'normal',
  lineHeight: '$xs',
  maxHeight: 42,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  textTransform: 'uppercase',

  '@medium': {
    maxHeight: 'inherit',
  },
});

export const Copy = styled('div', {
  fontFamily: '$inter',
  fontSize: '$xxxs',
  fontWeight: '$medium',
  fontStyle: 'normal',
  lineHeight: '$xxs',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  position: 'relative',

  variants: {
    plural: {
      true: {
        '&:after': {
          content: '"s"',
        },
      },
      false: {},
    },
  },
});

const pathRegionStyles = {
  filter: 'drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.16))',
};

const pathOtherRegionsStyles = {
  cursor: 'auto',
  fill: '$blueAlt',
  pointerEvents: 'none',
};

export const Option = styled('div', {
  position: 'absolute',
  width: '100%',
  height: '100%',

  '&, & svg': {
    pointerEvents: 'none',
  },

  [`& ${Path}`]: {
    fill: '$blueAlt',
    stroke: '$blue',
    strokeWidth: '0.3',
    pointerEvents: 'fill',
  },

  '&:focus, &:active': {
    [`& ${Tooltip}`]: {
      zIndex: 2,
      display: 'block',
      opacity: 1,
    },
  },

  '&:not([aria-disabled="true"])': {
    [`& ${Path}`]: {
      fill: '$green',
    },

    '&:hover, &:active, &:focus': {
      [`& ${Path}`]: {
        cursor: 'pointer',
        fill: '$grayHoverBlueBackground',
        filter: 'drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.16))',
      },
    },
  },

  '&[aria-disabled="true"]': {
    [`& ${Path}`]: {
      fill: '$blueAlt',
      transition: getTransition('fill'),
    },

    '&:hover, &:active, &:focus': {
      [`& ${Path}`]: {
        fill: '$blueHoverDarkBackground',
        transition: 'none',
      },
    },
  },

  variants: {
    pin: {
      true: {
        '&:not([aria-disabled="true"])': {
          [`& ${Path}`]: {
            fill: '$blueAlt',
            pointerEvents: 'none',
          },
        },
      },
    },

    region: {
      all: {},
      na: {
        [`&:not([aria-disabled="true"])[data-region="na"] ${Path}`]:
          pathRegionStyles,
        [`&:not([data-region="na"]) ${Path}`]: pathOtherRegionsStyles,
      },
      eu: {
        [`&:not([aria-disabled="true"])[data-region="eu"] ${Path}`]:
          pathRegionStyles,
        [`&:not([data-region="eu"]) ${Path}`]: pathOtherRegionsStyles,
      },
      as: {
        [`&:not([aria-disabled="true"])[data-region="as"] ${Path}`]:
          pathRegionStyles,
        [`&:not([data-region="as"]) ${Path}`]: pathOtherRegionsStyles,
      },
      sa: {
        [`&:not([aria-disabled="true"])[data-region="sa"] ${Path}`]:
          pathRegionStyles,
        [`&:not([data-region="sa"]) ${Path}`]: pathOtherRegionsStyles,
      },
      af: {
        [`&:not([aria-disabled="true"])[data-region="af"] ${Path}`]:
          pathRegionStyles,
        [`&:not([data-region="af"]) ${Path}`]: pathOtherRegionsStyles,
      },
      oc: {
        [`&:not([aria-disabled="true"])[data-region="oc"] ${Path}`]:
          pathRegionStyles,
        [`&:not([data-region="oc"]) ${Path}`]: pathOtherRegionsStyles,
      },
    },
  },
});

export const Container = styled('div', {
  position: 'relative',
  width: '100%',
  height: '100%',
  outline: '0 none',

  '& *': {
    outline: '0 none',
    touchAction: 'manipulation', // pinch zoom on enabled devices
  },
});
