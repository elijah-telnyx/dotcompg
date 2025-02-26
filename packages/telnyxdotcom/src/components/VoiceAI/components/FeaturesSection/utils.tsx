import { slugify } from 'ui/utils/slugify';

export const INITIAL_GRADIENT_ANGLE = {
  number: 245,
  string: '245deg',
} as const;

export const CONTENT_TRANSITION_TIMING = {
  number: 400,
  string: '400ms',
} as const;

export const parseValue = (value: string) => slugify(value);

/**
 * Required for the gradient animation
 * @link https://developer.mozilla.org/en-US/docs/Web/CSS/@property
 * Defines a custom property for use in CSS to animate the gradient angle.
 * This allows for transitioning the angle smoothly.
 */
export const gradientAnimationPropertyStyle = (
  <style key='gradient-animation'>
    {`
        @property --gradient-angle {
          syntax: '<angle>';
          initial-value: ${INITIAL_GRADIENT_ANGLE.string};
          inherits: false;
        }
      `}
  </style>
);
