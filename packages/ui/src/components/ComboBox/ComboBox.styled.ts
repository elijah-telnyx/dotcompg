import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { styled, theme } from '../../styles';
import type { ThemedCSS } from '../../styles/config/stitches.config';
import ChevronDownOutlineIcon from '../Icons/ChevronDownOutline';

const typography: ThemedCSS = {
  fontFamily: '$inter',
  fontSize: '$xs',
  lineHeight: '$xs',
};

const borderRadius = '$medium';

const padding = {
  y: '$xs',
  x: '$small',
};

const radixWidthVariable = '--radix-popper-anchor-width';

const add75Opacity = (color: string) => `${color}bF`;

export const Wrapper = styled('div', {
  '& div[data-radix-popper-content-wrapper]': {
    display: 'none',
  },

  variants: {
    theme: {
      dark: {
        $$triggerBackgroundColor: '$colors$black',
        $$triggerFontColor: '$colors$cream',
        $$triggerBorderColor: '$colors$cream',
        $$hoverBackgroundColor: '$colors$grayHoverLightBackground',
        $$optionHighlightBackgroundColor: '$colors$grayHoverLightBackground',
        $$selectedBackgroundColor: add75Opacity(
          theme.colors.grayHoverLightBackground.value
        ),
      },
      light: {
        $$triggerBackgroundColor: '$colors$white',
        $$triggerFontColor: '$colors$black',
        $$triggerBorderColor: '$colors$black',
        $$hoverBackgroundColor: '$colors$grayHoverDarkBackground',
        $$optionHighlightBackgroundColor: '$colors$tan',
        $$selectedBackgroundColor: add75Opacity(theme.colors.tan.value),
      },
    },
    contentOpen: {
      true: {
        '& div[data-radix-popper-content-wrapper]': {
          display: 'block',
        },
      },
    },
  },
});

const trigger = {
  backgroundColor: '$$triggerBackgroundColor',
  color: '$$triggerFontColor',
  borderColor: '$$triggerBorderColor',
  hoverBackgroundColor: '$$hoverBackgroundColor',
};

const content = {
  backgroundColor: trigger.backgroundColor,
  borderColor: trigger.borderColor,
};

const option = {
  color: trigger.color,
  backgroundColor: trigger.backgroundColor,
  highlightedBackgroundColor: '$$optionHighlightBackgroundColor',
  selectedBackgroundColor: '$$selectedBackgroundColor',
};

export const Content = styled(DropdownMenu.Content, {
  overflow: 'hidden',
  height: 'var(--radix-popper-anchor-width)',
  backgroundColor: content.backgroundColor,
  zIndex: '$select',
  // use the same width as the trigger
  width: `var(${radixWidthVariable}, max-content)`,

  border: `1px solid ${content.borderColor}`,
  borderTop: '0px',
  paddingBottom: padding.y,
  ...typography,

  '&[data-side="bottom"]': {
    borderBottomLeftRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
  },
  '&[data-side="top"]': {
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
  },
});

export const TriggerContent = styled('span', {
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
});

export const Trigger = styled(DropdownMenu.Trigger, {
  all: 'unset',
  boxSizing: 'border-box',
  display: 'inline-grid',
  gridTemplateColumns: '1fr auto',
  alignItems: 'center',
  borderRadius,
  padding: `${padding.y} ${padding.x}`,
  height: 36,
  gap: '$xs',
  backgroundColor: trigger.backgroundColor,
  color: trigger.color,
  width: '100%',
  border: `1px solid ${trigger.borderColor}`,
  userSelect: 'none',
  ...typography,
  '&:hover': { backgroundColor: trigger.hoverBackgroundColor },
  '& [data-placeholder]': {
    fontWeight: '$semibold',
  },
  '&[data-state="open"]': {
    [`&:has(+ div ${Content}[data-side="bottom"])`]: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderBottom: 0,
    },
    [`&:has(+ div ${Content}[data-side="top"])`]: {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderTop: 0,
    },
  },
  '&[disabled]': {
    cursor: 'not-allowed',
    backgroundColor: trigger.hoverBackgroundColor,
  },
});

export const Icon = styled(ChevronDownOutlineIcon, {
  color: 'currentColor',
  '[data-state="open"] &': {
    transform: 'rotate(180deg)',
  },
});

export const OptionsList = styled('span', {
  display: 'block',
  overflow: 'auto',
  height: 'calc(var(--radix-popper-anchor-width) - 38px)',
});

export const Item = styled(DropdownMenu.Item, {
  ...typography,
  color: option.color,
  padding: `${padding.y} ${padding.x}`,
  position: 'relative',
  userSelect: 'none',
  cursor: 'pointer',

  '&[data-disabled]': {
    opacity: 0.5,
    pointerEvents: 'none',
  },

  '&[data-highlighted]': {
    outline: 'none',
    backgroundColor: option.highlightedBackgroundColor,
  },
  '&[data-state="checked"]': {
    backgroundColor: option.selectedBackgroundColor,
    cursor: 'default',
  },
});

export const SearchInput = styled('input', {
  width: `100%`,
  ...typography,
  color: option.color,
  backgroundColor: option.backgroundColor,
  border: `1px solid ${option.color}`,
  borderInline: 0,

  outline: 'none',
  padding: `${padding.y} ${padding.x}`,
  '&[data-disabled]': {
    opacity: 0.5,
    pointerEvents: 'none',
  },
});

export const NoResults = styled('p', {
  ...typography,
  color: option.color,
  padding: `${padding.y} ${padding.x}`,
  userSelect: 'none',
});
