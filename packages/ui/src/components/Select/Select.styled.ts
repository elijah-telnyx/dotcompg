import { css, styled } from '../../styles';
import { ChevronDown } from '../Icons';
import * as ReactSelect from '@radix-ui/react-select';
import * as Scroll from '@radix-ui/react-scroll-area';
import TypographyCTA from '../Typography/CTA';

export const ScrollArea = styled(Scroll.Root, {
  width: '100%',
  height: 'fit-content',
  marginBlockEnd: '$small', // account for trigger padding
  overflow: 'hidden',

  variants: {
    scrollable: {
      true: {
        height: 244,
      },
    },
  },
});
export const ScrollViewport = styled(Scroll.Viewport, {
  width: '100%',
  height: '100%',
  borderRadius: 'inherit',
});
export const ScrollBar = styled(Scroll.Scrollbar, {
  width: 4,
});
export const ScrollThumb = styled(Scroll.Thumb, {
  backgroundColor: '$grayHoverDarkBackground',
  borderRadius: 50,
  width: '100%',
  '&:hover': {
    backgroundColor: '$grayHoverLightBackground',
  },
});

export const Wrapper = styled('div', {
  position: 'relative',
  width: '100%',
  outline: 'none',
});

export const Select = styled(ReactSelect.Root, {
  position: 'relative',
  width: '100%',
});

export const Icon = styled(ChevronDown, {
  width: 13,
  marginLeft: '$xs',
  transition: 'all 0.2s ease-out',
  // font height compensation
  translate: '0 -2px',
  '@medium': {
    marginLeft: '$medium',
  },
  '[data-state="open"] &': {
    color: '$cream',
    rotate: '180deg',
  },
});

export const SelectTriggerStyle = css({
  width: '100%',
  padding: '$xs $medium $xxs',
  cursor: 'pointer',
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  alignItems: 'center',
  '@medium': {
    padding: '$small $medium $xs',
  },
  backgroundColor: '$cream',
  border: '2px solid $grayHoverDarkBackground',
  borderRadius: 100,
  transition: 'color 0.2s ease-out',
  outline: 'none',

  '&:hover': {
    backgroundColor: '$grayHoverDarkBackground',
    borderColor: '$black',
  },

  '&:focus': {
    backgroundColor: '$black',
    borderColor: '$black',
    color: '$cream',
  },

  '&[data-state="open"]': {
    backgroundColor: '$black',
    borderColor: '$black',
    color: '$cream',
    // top values
    borderRadius: '$medium $medium 0 0',
  },
  // The link component append a svg
  // if the href is a anchor.
  // We don't want to display it on Select.
  '& a[href^="#"] svg': {
    display: 'none',
  },
});

export const Trigger = styled(ReactSelect.Trigger, SelectTriggerStyle, {
  // stitches uncontrolled element
  '& + div': {
    width: '100%',
    position: 'absolute !important',
    left: '0 !important',
    right: '0 !important',
    top: '100% !important',
    marginTop: '0px !important',
    justifyContent: 'flex-start !important',
  },
});

export const ContentViewport = styled(ReactSelect.Viewport, {
  height: '100%',
});

export const SelectContentStyle = css({
  backgroundColor: '$black',
  color: '$cream',
  border: '2px solid $black',
  borderRadius: '0 0 $medium $medium',
  zIndex: '$select',
});

export const Content = styled(ReactSelect.Content, SelectContentStyle, {});

export const Portal = styled(ReactSelect.Portal, {
  marginTop: 'calc($lineHeights$small + $space$xs)',

  '@medium': {
    marginTop: 'calc($lineHeights$medium + $space$small)',
  },
});

export const GroupLabel = styled(ReactSelect.Label, {
  color: '$citron',
  padding: '$xxs $medium',
  marginTop: '$xs',
});

export const Item = styled(ReactSelect.Item, {
  width: '100%',
  cursor: 'pointer',
  display: 'block',
  padding: '$xxs $medium',
  outline: 'none',
  'a[href^="#"] svg': {
    display: 'none',
  },
  '&[data-highlighted]': {
    '@medium': {
      color: '$grayHoverDarkBackground',
    },
  },
  '&[data-state="checked"]': {
    color: '$grayHoverDarkBackground',
  },
});

export const SelectItemContainer = styled('div', {
  position: 'relative',
});

export const ItemIndicator = styled('div', {
  position: 'absolute',
  right: 0,
  top: 0,
  width: '100%', //used to force the entire element to be clicked
  '& button': {
    width: '100%',
    padding: '0px 10px',
    textAlign: 'end',
    zIndex: 1,
  },
  '& svg': {
    color: '$grayHoverDarkBackground',
    width: 24,
    height: 24,
  },
});

export const InteractiveAnchor = styled(TypographyCTA, {
  cursor: 'pointer',
  textDecoration: 'none',
});
