import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { keyframes, styled } from '../../styles';
import Section from '../Section';

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

export const SectionWrapper = styled(Section);

export const Question = styled(AccordionPrimitive.Trigger, {
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  width: '100%',
  '&:hover': {
    color: '$grayHoverLightBackground',
  },
});

export const Accordion = styled(AccordionPrimitive.Root, {});
export const AccordionItem = styled(AccordionPrimitive.Item, {
  borderTop: '2px solid $black',
  paddingBlock: '$xs',
  overflow: 'hidden',
  '@medium': {
    paddingBlock: '$small',
  },
});

export const PlusIcon = styled('span', {
  display: 'inline-block',
  width: ICON_SIZE,
  height: ICON_SIZE,
  transition: `ease-out ${ANIMATION_DURATION} rotate`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  // blue
  backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfMTE2NjVfNDI2MjEpIj4KICAgIDxwYXRoCiAgICAgIGQ9Ik00LjY3NDE5IDAuMjU0NzY4TDcuMzI1ODMgMC4yNTQ3NjhMNy4zMjU4MyAzLjYyOTU5QzcuMzI1ODMgNC4yMDY1IDcuNzkzNTEgNC42NzQxOCA4LjM3MDQyIDQuNjc0MThIMTEuNzQ1M0wxMS43NDUzIDcuMzI1ODJMOC4zNzA0MiA3LjMyNTgyQzcuNzkzNTEgNy4zMjU4MiA3LjMyNTgzIDcuNzkzNSA3LjMyNTgzIDguMzcwNDFMNy4zMjU4MyAxMS43NDUyTDQuNjc0MTkgMTEuNzQ1Mkw0LjY3NDE5IDguMzcwNDFDNC42NzQxOSA3Ljc5MzUgNC4yMDY1MSA3LjMyNTgyIDMuNjI5NiA3LjMyNTgyTDAuMjU0ODAxIDcuMzI1ODJMMC4yNTQ4MDEgNC42NzQxOEwzLjYyOTYgNC42NzQxOEM0LjIwNjUxIDQuNjc0MTggNC42NzQxOSA0LjIwNjUgNC42NzQxOSAzLjYyOTU5TDQuNjc0MTkgMC4yNTQ3NjhaIgogICAgICBmaWxsPSIjMzQzNEVGIiAvPgogIDwvZz4KICA8ZGVmcz4KICAgIDxjbGlwUGF0aCBpZD0iY2xpcDBfMTE2NjVfNDI2MjEiPgogICAgICA8cmVjdCB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIGZpbGw9IndoaXRlIiAvPgogICAgPC9jbGlwUGF0aD4KICA8L2RlZnM+Cjwvc3ZnPgo=")`,
  ':hover > &': {
    // black
    backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfMTE2NjVfNDI2MjEpIj4KICAgIDxwYXRoCiAgICAgIGQ9Ik00LjY3NDE5IDAuMjU0NzY4TDcuMzI1ODMgMC4yNTQ3NjhMNy4zMjU4MyAzLjYyOTU5QzcuMzI1ODMgNC4yMDY1IDcuNzkzNTEgNC42NzQxOCA4LjM3MDQyIDQuNjc0MThIMTEuNzQ1M0wxMS43NDUzIDcuMzI1ODJMOC4zNzA0MiA3LjMyNTgyQzcuNzkzNTEgNy4zMjU4MiA3LjMyNTgzIDcuNzkzNSA3LjMyNTgzIDguMzcwNDFMNy4zMjU4MyAxMS43NDUyTDQuNjc0MTkgMTEuNzQ1Mkw0LjY3NDE5IDguMzcwNDFDNC42NzQxOSA3Ljc5MzUgNC4yMDY1MSA3LjMyNTgyIDMuNjI5NiA3LjMyNTgyTDAuMjU0ODAxIDcuMzI1ODJMMC4yNTQ4MDEgNC42NzQxOEwzLjYyOTYgNC42NzQxOEM0LjIwNjUxIDQuNjc0MTggNC42NzQxOSA0LjIwNjUgNC42NzQxOSAzLjYyOTU5TDQuNjc0MTkgMC4yNTQ3NjhaIgogICAgICBmaWxsPSIjMDAwIiAvPgogIDwvZz4KICA8ZGVmcz4KICAgIDxjbGlwUGF0aCBpZD0iY2xpcDBfMTE2NjVfNDI2MjEiPgogICAgICA8cmVjdCB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIGZpbGw9IndoaXRlIiAvPgogICAgPC9jbGlwUGF0aD4KICA8L2RlZnM+Cjwvc3ZnPgo=")`,
  },
  [`[data-state="open"] &`]: {
    rotate: '45deg',
  },
});

export const Answer = styled(AccordionPrimitive.Content, {
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
