import * as Select from '@radix-ui/react-select';
import { styled, theme } from '../../../styles';
import type { ThemedCSS } from '../../../styles/config/stitches.config';

const typography: ThemedCSS = {
  fontFamily: '$inter',
  fontSize: '$xs',
  lineHeight: '$xs',
};

const padding = {
  y: '$xs',
  x: '$small',
};

const add75Opacity = (color: string) => `${color}bF`;

export const SelectWrapper = styled('div', {
  variants: {
    theme: {
      dark: {
        $$triggerBackgroundColor: '$colors$black',
        $$triggerFontColor: '$colors$cream',
        $$triggerBorderColor: '$colors$cream',
        $$triggerBorderRadius: '$radii$xs',
        $$hoverBackgroundColor: '$colors$grayHoverLightBackground',
        $$optionHighlightBackgroundColor: '$colors$grayHoverLightBackground',
        $$selectedBackgroundColor: add75Opacity(
          theme.colors.grayHoverLightBackground.value
        ),
      },
      darkSeti: {
        $$triggerBackgroundColor: '$colors$setiTransparentGray',
        $$triggerFontColor: '$colors$cream',
        $$triggerBorderColor: '$colors$grayStroke',
        $$triggerBorderRadius: '$radii$xs',
        $$hoverBackgroundColor: '$colors$grayHoverLightBackground',
        $$optionHighlightBackgroundColor: '$colors$grayHoverLightBackground',
        $$selectedBackgroundColor: add75Opacity(
          theme.colors.grayHoverLightBackground.value
        ),

        '& button': {
          justifyContent: 'flex-end',
          gap: '$small',
          paddingInline: 'calc($space$medium + $space$xxxs)',
        },

        '& div[role="option"]': {
          paddingInline: 'calc($space$medium + $space$xxxs)',
          textAlign: 'right',
        },

        '& [data-placeholder]': {
          color: '$grayHoverDarkBackground',
          fontWeight: '$regular',
        },

        '& svg': {
          width: 16,
          height: 16,
        },
      },
      light: {
        $$triggerBackgroundColor: '$colors$cream',
        $$triggerFontColor: '$colors$black',
        $$triggerBorderColor: '$colors$black',
        $$triggerBorderRadius: '$radii$xs',
        $$hoverBackgroundColor: '$colors$grayHoverDarkBackground',
        $$optionHighlightBackgroundColor: '$colors$tan',
        $$selectedBackgroundColor: add75Opacity(theme.colors.tan.value),
      },
    },
  },
});

const trigger = {
  backgroundColor: '$$triggerBackgroundColor',
  color: '$$triggerFontColor',
  borderColor: '$$triggerBorderColor',
  borderRadius: '$$triggerBorderRadius',
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

export const SelectTrigger = styled(Select.SelectTrigger, {
  all: 'unset',
  boxSizing: 'border-box',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: trigger.borderRadius,
  padding: `${padding.y} ${padding.x}`,
  height: 36,
  gap: '$xs',
  backgroundColor: trigger.backgroundColor,
  color: trigger.color,
  width: '100%',
  border: `1px solid ${trigger.borderColor}`,
  '& > span': {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  ...typography,
  '&:hover': { backgroundColor: trigger.hoverBackgroundColor },
  '&[data-placeholder]': {
    fontWeight: '$semibold',
  },
  '&[data-state="open"]': {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottom: 0,
  },
});

export const SelectIcon = styled(Select.SelectIcon, {
  color: 'currentColor',
  '[data-state="open"] &': {
    transform: 'rotate(180deg)',
  },
});

export const SelectContent = styled(Select.Content, {
  overflow: 'hidden',
  backgroundColor: content.backgroundColor,
  zIndex: '$select',
  // use the same width as the trigger
  width: 'var(--radix-select-trigger-width, max-content)',
  borderBottomLeftRadius: trigger.borderRadius,
  borderBottomRightRadius: trigger.borderRadius,
  border: `1px solid ${content.borderColor}`,
  borderTop: '0px',
  paddingBottom: padding.y,
  ...typography,
});

export const SelectViewport = styled(Select.Viewport, {
  maxHeight: '70vh',
});

export const SelectItem = styled(Select.Item, {
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
