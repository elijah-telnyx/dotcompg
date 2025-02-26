import { addOpacityToHex, getColor } from 'ui/utils/styles';

import type { BackgroundColor } from 'ui/styles/constants/backgroundColorOptions';
import { Dialog } from './Network/Dialog';
import Link from 'next/link';
import NextImage from 'next/image';
import type { ThemedCSS } from 'ui/styles/config/stitches.config';
import { styled } from 'ui/styles';

const hex80opacity = addOpacityToHex(0.8);

//#region Config
const borderRadius = '$large';
const getCardBgColorsVariables = (color: BackgroundColor): ThemedCSS => {
  return {
    $$bgColor: getColor(color),
    $$blurColor: hex80opacity(getColor(color)),
  };
};
const zIndex = {
  link: 5,
  blur: 3,
  IotArrowImage: 1,
  IotPurchaseOneClickImage: 1,
  IotPurchaseOneImage: 2,
};
//#endregion

//#region Card core
export const CardWrapper = styled('div', {
  isolation: 'isolate', // keep inner element z-index context inside card
  borderRadius,
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: '$$bgColor',
  display: 'grid',
  gridTemplateRows: 'auto 1fr',
  '& video, & img, & svg': {
    height: '100%',
    maxWidth: '100%',
  },

  // add blur effect at the bottom of the card
  '&:after': {
    content: '',
    position: 'absolute',
    display: 'block',
    width: '100%',
    height: 80,
    bottom: 0,
    background: `linear-gradient(to bottom, rgba(0, 227, 170, 0) 0%, $$blurColor 100%)`,
    zIndex: zIndex.blur,
  },
  transition: 'box-shadow 0.3s ease, opacity 0.2s ease-out',
  boxShadow: '0px 0px 0px 0px #0000004D',
  '&:hover, &:focus-within': {
    boxShadow: '0px 20px 30px 0px #0000004D',
  },
  '&:hover ~ &, &:has(~ &:hover)': {
    opacity: 0.8,
  },

  variants: {
    bgColor: {
      green: getCardBgColorsVariables('green'),
      citron: getCardBgColorsVariables('citron'),
      blue: getCardBgColorsVariables('blue'),
      tan: getCardBgColorsVariables('tan'),
    },
  },
});

export const LinkWrapper = styled(Link, {
  ':before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: zIndex.link,
  },

  // Card > LinkWrapper > Heading
  '*:hover > & > *': {
    textDecoration: 'underline',
  },
});

export const TextContainer = styled('div', {
  padding: '$large',
  display: 'grid',
  gap: '$medium',

  '@small': {
    textAlign: 'center',
  },

  '@medium': {
    padding: '$xxl',
    paddingBottom: '$xl',
  },
  '@large': {
    padding: '$huge',
    paddingBottom: '$xl',
  },
});

const cardWrapperHover = [`${CardWrapper}:hover &`].toString();
//#endregion

const networkTransitionDuration = {
  dialog: '200ms',
  arrow: '400ms',
};

const networkTransitionDelay = {
  dialog: '0ms',
  arrow: '200ms',
  dialogButton: '300ms',
  wifiTop: '575ms',
  wifiMiddle: '475ms',
  wifiBottom: '375ms',
};
export const NetworkMediaWrapper = styled('div', {
  '& > div': {
    overflow: 'hidden',
  },
  justifySelf: 'center',
  position: 'relative',
  // top image blur effect
  '&:after': {
    position: 'absolute',
    display: 'block',
    width: '100%',
    height: 80,
    top: 0,
    background: `linear-gradient(to top, rgba(0, 227, 170, 0) 0%, $$blurColor 100%)`,
    zIndex: zIndex.blur,
  },
  [cardWrapperHover]: {
    '&:after': {
      content: '',
    },
  },
});

export const DialogWrapper = styled('div', {
  position: 'relative',
  maxHeight: 245,

  bottom: 245 - 280, // image height - original height, negative value to hide the image
  transitionDuration: networkTransitionDuration.dialog,
  transitionProperty: 'bottom',
  [cardWrapperHover]: {
    bottom: 70,
  },
});

export const NetworkDialogImage = styled(Dialog, {
  color: '$green',
  [cardWrapperHover]: {
    color: '$greenCardHoverState',
    transitionDelay: networkTransitionDelay.dialogButton,
  },
});

export const NetworkArrow = styled(NextImage, {
  position: 'absolute',
  bottom: -135,
  height: 30,
  width: 30,
  right: 42,
  scale: 1.5,
  opacity: 0,
  filter: 'blur(2px)',
  [cardWrapperHover]: {
    transitionDuration: networkTransitionDuration.arrow,
    transitionDelay: networkTransitionDelay.arrow,
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
  },
});

export const NetworkWifiWrapper = styled('div', {
  display: 'grid',
  placeItems: 'center',
  zIndex: 4,
  position: 'absolute',
  bottom: 50,
  right: -104,
  '& img': {
    position: 'relative',
    opacity: 0,
    // middle wifi image
    '&:nth-child(2)': {
      top: -24,
    },
    // bottom wifi image
    '&:nth-child(3)': {
      position: 'relative',
      top: -40,
    },
  },
  [cardWrapperHover]: {
    '& img': {
      opacity: 1,
      '&:nth-child(1)': {
        transitionDelay: networkTransitionDelay.wifiTop,
      },
      '&:nth-child(2)': {
        transitionDelay: networkTransitionDelay.wifiMiddle,
      },
      '&:nth-child(3)': {
        transitionDelay: networkTransitionDelay.wifiBottom,
      },
    },
  },
});
//#region Compute

const computeDuration = {
  wrapper: '300ms',
  aiApp: '300ms',
  rightArrow: '300ms',
};

const computeDelay = {
  aiApp: '200ms',
};
export const ComputeMediaWrapper = styled('div', {
  position: 'relative',
  display: 'flex',
  left: 0,
  transitionDuration: computeDuration.wrapper,
  [cardWrapperHover]: {
    paddingBottom: 0,
    left: -200,
  },
});
export const ComputeMainImage = styled(NextImage, {});
export const ComputeLeftArrow = styled(NextImage, {
  marginRight: '$small',
});
export const ComputeRightArrow = styled(NextImage, {
  marginLeft: '$xs',
  marginRight: '$small',
  opacity: 0,
  scale: '0 1',
  transitionProperty: 'scale',
  transitionDuration: computeDuration.rightArrow,
  [cardWrapperHover]: {
    opacity: 1,
    width: 129,
    scale: '1 1',
  },
});
export const ComputeAiApp = styled(NextImage, {
  position: 'relative',
  top: '120%',
  [cardWrapperHover]: {
    transitionDelay: computeDelay.aiApp,
    transitionDuration: computeDuration.aiApp,
    top: 0,
  },
});
//#endregion

//#region Communication
export const CommunicationMediaWrapper = styled('div', {
  justifySelf: 'center',
  position: 'relative',
  left: 0,
  transitionProperty: 'left',
  transitionDelay: '0.3s',
  transitionDuration: '0.3s',
  transitionTimingFunction: 'ease-out',
  [cardWrapperHover]: {
    left: -76,
    transitionDelay: '0s',
  },
});

export const CommunicationChatWindowImage = styled(NextImage, {
  opacity: 0,
  top: 200,
  position: 'absolute',
  left: 'calc(100% - 76px)',
  transition: 'top .5s .1s ease, opacity .7s .1s ease',
  [cardWrapperHover]: {
    top: 0,
    opacity: 1,
  },
});
//#endregion

//#region IoT
const iotTransitionTimeDuration = {
  wrapper: '400ms',
  purchaseZero: '0ms',
  purchaseOneClick: '0ms',
  purchaseOne: '0ms',
  qrCode: '300ms',
  arrow: '200ms',
};
const iotTransitionTimeDelay = {
  wrapper: '400ms',
  purchaseZero: '0ms',
  purchaseOneClick: '200ms',
  purchaseOne: '200ms',
  qrCode: '600ms',
  arrow: '100ms',
};

export const IoTMediaWrapper = styled('div', {
  justifySelf: 'center',
  position: 'relative',
  left: 0,
  transitionProperty: 'left',
  transitionDuration: iotTransitionTimeDuration.wrapper,
  [cardWrapperHover]: {
    left: -111,
    transitionDelay: iotTransitionTimeDelay.wrapper,
  },
});

export const IotPurchaseZeroImage = styled(NextImage, {
  transitionProperty: 'opacity',
  position: 'relative',
  [cardWrapperHover]: {
    opacity: 0,
  },
});

export const IotArrowImage = styled(NextImage, {
  position: 'absolute',
  top: -26,
  right: 20,

  transitionDuration: iotTransitionTimeDuration.arrow,
  transitionProperty: 'opacity',
  [cardWrapperHover]: {
    transitionDelay: iotTransitionTimeDelay.arrow,
    opacity: 0,
    zIndex: zIndex.IotArrowImage,
  },
});

export const IotPurchaseOneClickImage = styled(NextImage, {
  position: 'absolute',
  left: 0,
  [cardWrapperHover]: {
    zIndex: zIndex.IotPurchaseOneClickImage,
    transitionDelay: iotTransitionTimeDelay.purchaseOneClick,
    opacity: 0,
  },
});

export const IotPurchaseOneImage = styled(NextImage, {
  position: 'absolute',
  left: 0,
  opacity: 0,

  transitionProperty: 'opacity',
  [cardWrapperHover]: {
    zIndex: zIndex.IotPurchaseOneImage,
    transitionDelay: iotTransitionTimeDelay.purchaseOne,
    opacity: 1,
  },
});

export const IotQrCodeImage = styled(NextImage, {
  position: 'absolute',
  opacity: 0,
  bottom: '-100%',
  transitionProperty: 'bottom, opacity',
  objectFit: 'contain',
  [cardWrapperHover]: {
    transitionDuration: iotTransitionTimeDuration.qrCode,
    transitionDelay: iotTransitionTimeDelay.qrCode,
    bottom: '-45px',
    opacity: 1,
  },
});
//#endregion
