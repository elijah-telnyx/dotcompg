import { styled, theme } from '../../styles';
import type {
  CSSVariables,
  ThemedCSS,
} from '../../styles/config/stitches.config';
import LabelTypography from '../Typography/Label';
import ParagraphTypography from '../Typography/Paragraph';

const checkboxIcon = ({
  backgroundColor = '$black',
  checkboxIconStyles = {},
  checkIconColor = '$green',
  size = 16,
}: {
  backgroundColor?: CSSVariables<'colors'>;
  checkboxIconStyles?: ThemedCSS;
  checkIconColor?: CSSVariables<'colors'>;
  size?: number;
} = {}): ThemedCSS => {
  const parseColor = (color: CSSVariables<'colors'> | string): string => {
    const isHex = color.startsWith('#');
    if (isHex) {
      return color.replace('#', '%23');
    }
    const isFromTheme = color.startsWith('$');
    if (isFromTheme) {
      const themeColor =
        theme.colors[color.replace('$', '') as keyof typeof theme.colors];
      if (themeColor) return parseColor(themeColor.value);
    }
    return color;
  };

  return {
    '&:after': {
      ...checkboxIconStyles,
      content: `url("data:image/svg+xml,%3Csvg width='${size}' height='${size}' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='16' height='16' rx='4' /%3E%3Cpath d='M4 7.17647L7.04762 10L12 4' stroke='${parseColor(
        checkIconColor
      )}' stroke-width='4'/%3E%3C/svg%3E%0A")`,
    },
    '&:before': {
      backgroundColor,
    },
  };
};

export const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$xxs',
  position: 'relative',
  '&:has(input:disabled)': {
    opacity: 0.5,
    pointerEvents: 'none',
  },

  variants: {
    showMessageOnActive: {
      true: {
        '& ~ div': {
          display: 'block',
        },
      },
    },
  },
});

export const CheckboxWrapper = styled(Wrapper, {
  alignItems: 'flex-start',
  flexDirection: 'row',
  gap: '$xs',
});

export const RangeWithLabelWrapper = styled(Wrapper, {
  alignItems: 'center',
  flexDirection: 'row',
  gap: '$xs',
});

export const RangeLabelsWrapper = styled(Wrapper, {
  justifyContent: 'space-between',
  flexDirection: 'row',
  gap: '$xs',
});

export const Label = styled(LabelTypography, {
  '&:hover': {
    color: '$grayHoverLightBackground',
  },

  variants: {
    size: {
      small: {
        typography: '$label.mobile',
        '@medium': {
          typography: '$label',
        },
      },
    },
    isDark: {
      true: {
        color: '$cream',
        '&:hover': {
          color: '$cream',
        },
      },
    },
  },
});

export const RangeLabel = styled(Label, {
  padding: '0 $small',
});

export const Input = styled(ParagraphTypography, {
  backgroundColor: '$tan',
  display: 'inline-block',
  position: 'relative',
  borderRadius: '$small',
  border: '1px solid transparent',
  padding: '$xs',
  whiteSpace: 'nowrap',
  minWidth: 304,

  '@medium': {
    minWidth: 352,
  },

  '&::placeholder': {
    color: '$grayHoverDarkBackground',
  },

  '&:hover': {
    border: '1px solid $grayHoverLightBackground',
  },

  '&:focus, &:active': {
    border: '1px solid $greenAlt',
    outline: '0 none',
  },

  '&[aria-invalid="true"]': {
    border: '1px solid $redAlt',

    '&:hover, &:focus, &:active': {
      border: '1px solid $redAlt',
    },

    '~ div': {
      color: '$redAlt',
      fontStyle: 'normal',
      fontWeight: '$medium',

      '@medium': {
        fontStyle: 'normal',
        fontWeight: '$medium',
      },
    },
  },

  '&[type="checkbox"]': {
    appearance: 'none',
    borderRadius: '$xs',
    border: 'none',
    boxSizing: 'border-box',
    padding: 0,
    margin: 0,
    minWidth: 16,
    height: 16,
    marginTop: '$xxs',

    '@medium': {
      height: 16,
      minWidth: 16,
    },

    [`~ ${Label}`]: {
      typography: '$p.mobile',
      '@medium': {
        typography: '$p',
      },
    },

    // checkbox empty
    '&:before': {
      borderRadius: '$xs',
      display: 'block',
      content: '',
      backgroundColor: '$tan',
      height: 16,
    },

    '&:checked': {
      // checkbox
      ...checkboxIcon({
        checkboxIconStyles: { height: 16, position: 'absolute', top: '-2px' },
      }),
    },

    '&[aria-invalid="true"]': {
      border: '1px solid $redAlt',
    },
  },

  '&[type="textarea"]': {
    minHeight: 144,
  },

  '&[type="range"]': {
    appearance: 'none',
    background: 'transparent',
    cursor: 'pointer',
    accentColor: '#000', // this value has to be hardcoded for chrome

    '&::-webkit-slider-runnable-track': {
      background: '$tan',
      height: '0.25rem',
      borderRadius: '0.25rem',
    },

    '&::-moz-range-track': {
      background: '$tan',
      height: '0.25rem',
      borderRadius: '0.25rem',
    },

    '&::-webkit-slider-thumb': {
      width: '1rem',
      height: '1rem',
      marginTop: '-0.375rem',
      color: '$black',
      background: '$black',
      backgroundColor: '$black',
    },

    '&::-moz-range-thumb': {
      width: '1rem',
      height: '1rem',
      border: 'none',
      color: '$black',
      background: '$black',
      backgroundColor: '$black',
    },

    [`~ ${Label}`]: {
      typography: '$p.mobile',
      '@medium': {
        typography: '$p',
      },
    },
  },

  '&[type="search"]': {
    backgroundColor: '$cream',
    border: '2px solid $grayHoverDarkBackground',
    borderRadius: 100,
    padding: '$xs $small $xxs',
    transition: 'color 0.2s ease-out',
    typography: '$cta.mobile',
    outline: 'none',
    position: 'relative',
    color: '$black',

    '&::placeholder': {
      color: '$black',
      typography: '$cta.mobile',
    },

    '&:hover': {
      backgroundColor: '$grayHoverDarkBackground',
      borderColor: '$black',

      '&::-webkit-search-cancel-button': {
        '-webkit-appearance': 'none',
        cursor: 'pointer',
        height: '16px',
        width: '16px',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.1666 1.33334L14.6666 3.83333L11.4848 7.01514C10.9409 7.55906 10.9409 8.44092 11.4848 8.98484L14.6667 12.1667L12.1667 14.6667L8.98484 11.4848C8.44092 10.9409 7.55906 10.9409 7.01515 11.4848L3.83333 14.6666L1.33334 12.1667L4.51515 8.98484C5.05907 8.44092 5.05907 7.55906 4.51515 7.01514L1.33336 3.83335L3.83335 1.33336L7.01515 4.51515C7.55906 5.05906 8.44092 5.05906 8.98484 4.51515L12.1666 1.33334Z' fill='black'/%3E%3C/svg%3E%0A")`,
        backgroundSize: 'contain',
      },
    },

    '&:focus, &:active': {
      backgroundColor: '$black',
      borderColor: '$black',
      color: '$cream',

      '&::placeholder': {
        color: '$grayHoverDarkBackground',
      },

      '&::-webkit-search-cancel-button': {
        '-webkit-appearance': 'none',
        cursor: 'pointer',
        height: '16px',
        width: '16px',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.1666 1.33334L14.6666 3.83333L11.4848 7.01514C10.9409 7.55906 10.9409 8.44092 11.4848 8.98484L14.6667 12.1667L12.1667 14.6667L8.98484 11.4848C8.44092 10.9409 7.55906 10.9409 7.01515 11.4848L3.83333 14.6666L1.33334 12.1667L4.51515 8.98484C5.05907 8.44092 5.05907 7.55906 4.51515 7.01514L1.33336 3.83335L3.83335 1.33336L7.01515 4.51515C7.55906 5.05906 8.44092 5.05906 8.98484 4.51515L12.1666 1.33334Z' fill='%23FEFDF5'/%3E%3C/svg%3E%0A")`,
        backgroundSize: 'contain',
      },
    },

    '@medium': {
      padding: '$small $medium $xs',
      typography: '$cta',

      '&::placeholder': {
        typography: '$cta',
      },
    },
  },

  '&[type="radio"]': {
    appearance: 'none',
    margin: 0,
    minWidth: 16,
    height: 16,
    width: 16,
    backgroundColor: '$tan',
    display: 'grid',
    placeContent: 'center',
    borderRadius: '100%',
    '&:checked': {
      backgroundColor: '$black',
      '&::before': {
        content: '',
        display: 'block',
        width: 8,
        height: 8,
        backgroundColor: '$green',
        borderRadius: '100%',
      },
    },
    [`~ ${Label}`]: {
      typography: '$p.mobile',
      '@medium': {
        typography: '$p',
      },
    },
    '&[aria-invalid="true"]': {
      border: '1px solid $redAlt',
      [`~ ${Label}`]: {
        color: '$redAlt',
      },
    },
  },

  variants: {
    variant: {
      gray: {
        '&[type="checkbox"]:checked': {
          ...checkboxIcon({
            backgroundColor: '$grayHoverLightBackground',
          }),
        },
      },
    },
    labelSize: {
      small: {
        '&[type="checkbox"],&[type="radio"]': {
          [`~ ${Label}`]: {
            typography: '$label.mobile',
            '@medium': {
              typography: '$label',
            },
          },
        },
      },
    },
    isDark: {
      true: {
        '&[type="search"], &[type="tel"]': {
          backgroundColor: '$grayEmbed',
          borderColor: '$grayStroke',
          color: '$cream',
          '&::placeholder': { color: '$cream', opacity: 0.5 },
          '&:focus, &:active, &:hover': {
            borderColor: '$grayHoverDarkBackground',
            '&::-webkit-search-cancel-button': {
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.1666 1.33334L14.6666 3.83333L11.4848 7.01514C10.9409 7.55906 10.9409 8.44092 11.4848 8.98484L14.6667 12.1667L12.1667 14.6667L8.98484 11.4848C8.44092 10.9409 7.55906 10.9409 7.01515 11.4848L3.83333 14.6666L1.33334 12.1667L4.51515 8.98484C5.05907 8.44092 5.05907 7.55906 4.51515 7.01514L1.33336 3.83335L3.83335 1.33336L7.01515 4.51515C7.55906 5.05906 8.44092 5.05906 8.98484 4.51515L12.1666 1.33334Z' fill='white'/%3E%3C/svg%3E%0A")`,
            },
          },
        },
      },
    },
  },
});

export const RangeInput = styled(ParagraphTypography, {
  backgroundColor: '$tan',
  display: 'inline-block',
  position: 'relative',
  borderRadius: '$small',
  border: '1px solid transparent',
  padding: '$xs',
  whiteSpace: 'nowrap',
  minWidth: '5rem',
  maxWidth: '5rem',
  width: '5rem',
});

export const SuffixWrapper = styled('span', {
  position: 'absolute',
  right: 8,
  top: '50%',
  zIndex: 1,
  transform: 'translateY(-50%)',
  lineHeight: 0,
});

export const InputWithSuffixWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  [`& ${Input}[type="search"]`]: {
    /*
     * Extra right padding required so
     * the text doesn't extend bellow
     * the icon. These value will work
     * well for 16px ~ 20px icons.
     */
    paddingRight: 'calc($xs + 28px)',
    '@medium': { paddingRight: 'calc($medium + 22px)' },

    [`& +  ${SuffixWrapper}`]: {
      right: '$medium',
    },
    '&::-webkit-search-cancel-button': {
      display: 'none',
    },
    [`&:focus + ${SuffixWrapper}, &:active + ${SuffixWrapper}`]: {
      color: '$cream',
    },
  },
  variants: {
    isDark: {
      true: {
        [`& ${Input}[type="search"]`]: {
          [`& +  ${SuffixWrapper}`]: {
            color: '$cream',
          },
        },
      },
    },
  },
});

export const LabelOptional = styled('span', {
  width: '100%',
  em: {
    float: 'right',
    color: '$grayHoverLightBackground',
  },
});

export const RadioWrapper = styled('span', {
  display: 'flex',
  gap: '$xs',
  alignItems: 'center',
});
