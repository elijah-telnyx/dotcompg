import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { keyframes, styled } from '../../../styles';
import Plus from '../../Icons/Plus';
import CheckMark from '../../Icons/Checkmark';

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

export const ServicesList = styled('ul', {
  padding: 0,
  margin: 0,
});

export const ServiceItem = styled('li', {
  marginBlock: '$large',
});

export const ServiceHeading = styled('h3', {
  typography: '$p.mobile',
  marginBottom: '$small',
});

export const CoverageList = styled('ul', {
  padding: 0,
  margin: 0,
});

export const CoverageListItem = styled('li', {
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  gap: '$xs',
  '&:not(:last-child)': {
    marginBottom: '$xs',
  },
  variants: {
    hasCover: {
      false: {
        color: '$grayHoverDarkBackground',
      },
    },
  },
});

const iconSize = {
  width: 20,
  height: 20,
};

export const CheckMarkIcon = styled(CheckMark, iconSize, {
  color: '$greenAlt',
});

export const CrossIcon = styled(Plus, iconSize, {
  rotate: '45deg',
  color: '$tan',
});

export const ComingSoonText = styled('span', {
  fontStyle: 'italic',
});

export const HiddenLink = styled('a', {
  display: 'block',
  visibility: 'hidden',
  width: 0,
  height: 0,
});
