import type { ThemedCSS } from '../../styles/config/stitches.config';
import { globalCss, styled, theme } from '../../styles';

import H from '../Typography/Heading';
import LabelTypography from '../Typography/Label';
import { MARKETO_PHONE_BASE_ID, MARKETO_PHONE_EXT_ID } from './constants';

export const FormWrapper = styled('div', {
  '& .mktoButtonRow': {
    display: 'flex',
    width: '100%',
  },
  variants: {
    align: {
      left: {
        textAlign: 'left',
        '& .mktoButtonRow': {
          justifyContent: 'flex-start',
        },
      },
      center: {
        textAlign: 'center',
        '& .mktoButtonRow': {
          justifyContent: 'center',
        },
      },
    },
  },

  defaultVariants: {
    align: 'center',
  },
});

// the min width set by marketo
const SELECT_MIN_WIDTH = '150px';
const SELECT_TYPOGRAPHY_OFFSET = '2px';
const TEXT_AREA_ROWS = 1;
const FIELD_MAX_WIDTH = '274px';

export const Heading = styled(H, {
  marginBottom: '$xs',
  '@medium': {
    marginBottom: '$medium',
  },
});

export const Label = styled(LabelTypography, {
  display: 'inline-block',
  marginTop: '$xs',
  '@medium': {
    marginTop: '$medium',
  },
});

const getButtonStyles = (): ThemedCSS => {
  const borderSize = '2px';
  /**
   * this is required because the typography save some spacing at the bottom for
   * specific characters like "g".
   */
  const typographyOffset = '4px';
  const reduceBorderSize = (padding: string): string => {
    const [paddingValue] = padding.split('px');
    const [borderValue] = borderSize.split('px');
    return Number(paddingValue) - Number(borderValue) + 'px';
  };

  const paddingSpacingDesktop = reduceBorderSize(theme.space.medium.value);
  const paddingSpacingMobile = reduceBorderSize(theme.space.small.value);

  return {
    backgroundImage: 'none !important',
    backgroundColor: '$black !important',
    boxShadow: 'unset !important',
    color: '$cream !important',
    fontFamily: '$formula',
    fontSize: '$small !important',
    fontWeight: '$extrabold',
    lineHeight: '$medium !important',
    letterSpacing: 'initial !important',
    textAlign: 'center',
    textTransform: 'uppercase',
    display: 'inline-block !important',
    borderRadius: '100px !important',
    border: `${borderSize} solid transparent !important`,
    overflow: 'hidden !important',
    padding: 'var(--spacing) !important',
    paddingBottom: `calc(var(--spacing) - ${typographyOffset}) !important`,
    whiteSpace: 'nowrap !important',
    // typography
    '--spacing': paddingSpacingMobile,

    '@medium': {
      '--spacing': paddingSpacingDesktop,
      fontSize: '$medium !important',
      lineHeight: '$xs !important',
    },
    '@lessThanMedium': {
      fontSize: '$small !important',
    },
  };
};

const getErrorStyles = (): ThemedCSS => {
  return {
    marginTop: '$xxs',
    maxWidth: FIELD_MAX_WIDTH,
    boxShadow: 'none',
    border: '0',
    background: 'unset',
    textShadow: 'none',
    padding: '0',
    typography: '$error',
    color: '$redAlt',
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingLeft: '$large',
    gap: '$xxs',
    // match icon size
    lineHeight: '$xs',
    span: {
      paddingLeft: '$xs',
    },
    '&:before': {
      content: '',
      display: 'block',
      backgroundImage: 'url("/images/alert.svg")',
      width: 20,
      height: 20,
    },
  };
};

/**
  These styles are mostly overrides for the automatically applied
  classes that the marketo script adds.
 */

export const Form = styled('form', {
  width: '100% !important',
  minHeight: 400,
  lineHeight: 'initial',
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  variants: {
    hasTopMargin: {
      true: {
        marginBlockStart: '$large',
      },
    },

    isDark: {
      true: {},
    },

    singleFieldLayout: {
      true: {
        minHeight: 'unset',
        flexWrap: 'nowrap',
        flexDirection: 'column',
        rowGap: '$large',
        '& .mktoLabel': { display: 'none' },
        '& .mktoFormRow': {
          paddingBottom: 0,
          '@lessThanMedium': {
            padding: '0 $large',
          },
        },
        '& .mktoFieldDescriptor': { marginBottom: '0 !important' },
        '& .mktoButtonRow': {
          width: 'unset',
          /*
           * This negative margin is required to
           * vertically align the button with the
           * text input.
           */
          marginTop: -4,
          '@small': { marginTop: -3 },
        },
        '@medium': {
          flexDirection: 'row',
          columnGap: '$small',
        },
      },
    },

    // also single field, but not inline
    smallFieldLayout: {
      true: {
        minHeight: 'unset',

        '& .mktoButtonRow': {
          marginTop: '$xs',
          justifyContent: 'flex-start',

          '@medium': {
            marginTop: '$medium',
          },
        },
      },
    },
  },
  compoundVariants: [
    {
      isDark: true,
      singleFieldLayout: true,
      css: {
        '& .mktoField[type="checkbox"] ~ label, & .mktoLabel': {
          color: '$cream',
        },

        '& .mktoField[type="checkbox"] ~ label:hover, & .mktoLabel:hover': {
          color: '$grayLight',
        },

        '& .mktoButton': {
          backgroundColor: '$cream !important',
          color: '$black !important',
        },
      },
    },
  ],
});

export const globalStyles = globalCss({
  'form.mktoForm': {
    padding: '0 !important',
  },
  form: {
    // marketoStyleReset - start
    '& .mktoGutter, & .mktoOffset, & .mktoClear, & .mktoAsterix': {
      display: 'none !important',
      float: 'unset !important',
      clear: 'unset !important',
    },

    '& .mktoFieldWrap, & .mktoFormCol': {
      width: 'inherit',
      float: 'unset !important',
    },

    '& input.mktoField[type], & .mktoField[type="checkbox"] + label:before': {
      marginTop: 0,
      marginBottom: 0,
      boxShadow: 'unset !important',
    },

    '& select.mktoField, & textarea.mktoField': {
      boxShadow: 'unset !important',
    },
    // marketoStyleReset - end

    // button - start;
    '.mktoButton': {
      ...getButtonStyles(),
    },

    '.mktoButtonWrap': {
      margin: '0 !important',
    },
    // button - end

    '& .mktoFieldWrap': {
      display: 'grid',
      position: 'relative',

      // input - start
      '& input.mktoField:not([type="checkbox"]), & textarea.mktoField': {
        width: '100% !important',
        padding: '$xs',
        background: '$tan !important',
        border: '1px solid $tan !important',
        borderRadius: '$small',
        typography: '$p.mobile',

        '@medium': {
          typography: '$p',
        },

        '&:hover': {
          border: '1px solid $grayHoverLightBackground !important',
        },

        '&:focus, active': {
          border: '1px solid $greenAlt !important',
          outline: '0 none',
        },

        '&[aria-describedby].mktoInvalid': {
          borderColor: '$redAlt !important',

          '&:hover, &:focus, &:active': {
            border: '1px solid $redAlt !important',
          },
        },
      },

      '& input.mktoField:not([type="checkbox"])': {
        height: 38,

        '@medium': {
          height: 40,
        },
      },

      '& select': {
        appearance: 'none',
        background: `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9.74825 11.5197C8.98624 12.8913 7.01363 12.8913 6.25162 11.5197L2.98399 5.63791C2.24339 4.30485 3.20733 2.66663 4.7323 2.66663L11.2676 2.66663C12.7925 2.66663 13.7565 4.30485 13.0159 5.63791L9.74825 11.5197Z' fill='black'/%3E%3C/svg%3E%0A") no-repeat calc(100% - 7px) 50% !important`,
        backgroundColor: '$cream !important',
        borderRadius: '$xl !important',
        border: '2px solid !important',
        borderColor: '$grayHoverDarkBackground !important',
        padding: `$xs $large calc($xs - ${SELECT_TYPOGRAPHY_OFFSET}) $small !important`,
        fontSize: '$small !important',
        typography: '$cta.mobile',
        minWidth: '100% !important',

        '&[style=""], &:not([style])': {
          minWidth: '100% !important',
        },

        [`&[style="width: ${SELECT_MIN_WIDTH};"]`]: {
          width: '100% !important',
          maxWidth: '100% !important',
        },

        '&:hover, &:active': {
          backgroundColor: '$grayHoverDarkBackground !important',
          borderColor: '$black !important',
        },

        '&:active, &:focus': {
          borderColor: '$green !important',
          outline: 0,
        },

        '&[aria-describedby].mktoInvalid': {
          borderColor: '$redAlt !important',

          '&:hover, &:focus, &:active': {
            borderColor: '$redAlt !important',
          },
        },

        '@medium': {
          fontSize: '$small !important',
          maxWidth: `${FIELD_MAX_WIDTH} !important`,
          padding: `calc($small - ${SELECT_TYPOGRAPHY_OFFSET}) $xl calc($xs - ${SELECT_TYPOGRAPHY_OFFSET}) $medium !important`,
          typography: '$cta',

          [`&[style="width: ${SELECT_MIN_WIDTH};"]`]: {
            maxWidth: '100% !important',
          },
        },
      },
      // input - end

      // checkbox - start
      '& .mktoField[type="checkbox"]': {
        appearance: 'none !important',
        position: 'relative',
        marginTop: '$xxs',
        width: 'auto',
        height: 'auto',
        opacity: 1,

        '&:before': {
          display: 'block',
          border: '1px solid $tan',
          backgroundColor: '$tan',
          borderRadius: '$xs',
          content: '',
          width: 16,
          height: 16,
        },

        '&:hover:before': {
          color: '$grayHoverLightBackground',
          borderColor: '$grayHoverLightBackground',
        },

        '&:checked': {
          '&:after': {
            content: `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='16' height='16' rx='4' fill='black'/%3E%3Cpath d='M4 7.17647L7.04762 10L12 4' stroke='%2300E3AA' stroke-width='4'/%3E%3C/svg%3E%0A")`,
            position: 'absolute',
            width: 16,
            height: 16,
            border: '1px solid $black',
            borderRadius: '$xs',
            top: 0,
          },

          '&:before': {
            borderColor: '$black',
            backgroundColor: '$black',
          },
        },

        '& + label': {
          marginLeft: 0,
          paddingLeft: 0,

          '&:hover': {
            color: '$grayHoverLightBackground',
          },
        },
        '& + label:before': {
          display: 'none',
        },
      },
      // checkbox - end

      // textarea
      '& textarea.mktoField': {
        '--textAreaHeight': `calc($lineHeights$medium * ${TEXT_AREA_ROWS} + $space$medium)`, // content line-height + padding of the textarea
        height: 'var(--textAreaHeight)',
        minHeight: 'var(--textAreaHeight)',
        overflowY: 'hidden',
        resize: 'vertical',
      },
      // error - start
      '& .mktoError': {
        position: 'initial !important',
        right: 'unset !important',
        bottom: '-16px !important',
        zIndex: '0 !important',

        '& .mktoErrorArrowWrap': {
          display: 'none',
        },

        '& .mktoErrorMsg': {
          ...getErrorStyles(),
        },
        '& .mktoErrorMsg::before': {
          position: 'absolute',
          left: 0,
          top: 0,
        },
        '& .mktoErrorMsg span': {
          paddingLeft: 0,
        },
      },
      // error - end

      // label - start
      '& label': {
        color: '$black',
        fontWeight: '$regular !important',
        lineHeight: '$small !important',
        typography: '$label.mobile',
        marginBottom: '$xxs',
        paddingTop: '0 !important',
        width: 'fit-content !important',

        '@medium': {
          lineHeight: '$medium !important',
          typography: '$label',
        },

        '&:hover': {
          color: '$grayHoverLightBackground',
        },
      },

      '& .mktoField[type="checkbox"] ~ label': {
        color: '$black',
        fontWeight: '$regular',
        typography: '$p.mobile',
        fontSize: '$xs',
        '@medium': {
          typography: '$p',
          fontSize: '$xs',
        },
      },

      [`& label[for="${MARKETO_PHONE_BASE_ID}"]`]: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        width: 'auto !important',
      },

      [`& label[for="${MARKETO_PHONE_EXT_ID}"]`]: {
        whiteSpace: 'nowrap',
      },
      // label - end
    },

    '& .mktoFormRow': {
      display: 'flex',
      gap: '$xs',
      paddingBottom: '$small',
      width: '100%',

      flexWrap: 'wrap',

      '@xs': {
        flexWrap: 'nowrap',
      },
    },

    '& .mktoFieldDescriptor': {
      marginBottom: '$medium !important',
    },

    '& .mktoCheckboxList': {
      width: '100% !important',
      display: 'grid !important',
      gap: '$xs',
      gridTemplateColumns: 'auto 1fr',
      alignItems: 'flex-start',
      padding: '0 !important',

      '& label': {
        margin: '0 !important',
      },
    },

    '& .mktoCaptchaDisclaimer': {
      display: 'none',
    },

    '& .grecaptcha-badge': {
      visibility: 'visible !important',
    },

    a: {
      typography: '$link.mobile',
      '@medium': {
        typography: '$link',
      },
    },
  },
});
