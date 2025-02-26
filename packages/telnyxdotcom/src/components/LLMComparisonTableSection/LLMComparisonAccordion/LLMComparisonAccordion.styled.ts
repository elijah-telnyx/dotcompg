import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { keyframes, styled } from 'ui/styles';
import Plus from 'ui/components/Icons/Plus';

const ANIMATION_DURATION = '300ms';
const ANIMATION_TRANSITION = 'cubic-bezier(0.87, 0, 0.13, 1)';
const ICON_SIZE = 20;

const slideDown = keyframes({
  from: { height: 0 },
  to: { height: 'var(--radix-accordion-content-height)' },
});

const slideUp = keyframes({
  from: { height: 'var(--radix-accordion-content-height)' },
  to: { height: 0 },
});

export const Accordion = styled(AccordionPrimitive.Root, {
  '@medium': {
    opacity: 0,
  },
});
export const AccordionItem = styled(AccordionPrimitive.Item, {
  borderTop: '1px solid $tan',
  paddingBlock: '$xs',
  overflow: 'hidden',
  '@medium': {
    paddingBlock: '$small',
  },
});

export const AccordionTrigger = styled(AccordionPrimitive.Trigger, {
  typography: '$cta.mobile',
  // font offset
  translate: '0 2px',
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  width: '100%',
});

export const AccordionContent = styled(AccordionPrimitive.Content, {
  paddingRight: '$small',
  marginRight: ICON_SIZE, //icon size
  '@medium': {
    paddingRight: '$large',
  },
  '&[data-state="open"]': {
    animation: `${slideDown} ${ANIMATION_DURATION} ${ANIMATION_TRANSITION}`,
  },
  '&[data-state="closed"]': {
    animation: `${slideUp} ${ANIMATION_DURATION} ${ANIMATION_TRANSITION}`,
  },
});

export const PlusIcon = styled(Plus, {
  width: ICON_SIZE,
  height: ICON_SIZE,
  transition: `ease-out ${ANIMATION_DURATION} rotate`,
  [`[data-state="open"] &`]: {
    rotate: '45deg',
  },
});

export const UnorderedList = styled('ul', {
  padding: 0,
  margin: 0,
});

export const ListItem = styled('li', {
  marginBlock: '$large',
});

export const ListItemHeading = styled('h3', {
  typography: '$p.mobile',
  marginBottom: '$small',
  fontWeight: 'bold',
});

export const ListItemValue = styled('span', {
  a: {
    color: '$blue',
    textDecoration: 'underline',
    '&:hover': {
      color: 'unset',
    },
  },
  marginLeft: '$small',
  variants: {
    capitalize: {
      true: {
        textTransform: 'capitalize',
      },
    },
  },
});

export const LLMLink = styled('a', {
  display: 'block',
  visibility: 'hidden',
  width: 0,
  height: 0,
});
