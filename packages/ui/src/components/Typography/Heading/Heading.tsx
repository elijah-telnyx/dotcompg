import * as css from './Heading.styled';

import type { BaseHTMLAttributes } from 'react';
import type { BaseProps } from '../utils';
import type { ThemedCSS } from '../../../styles/config/stitches.config';
import type { VariantProps } from '@stitches/react';

export type HeadingTag = 'h1' | 'h2' | 'h3';

export interface HeadingProps
  extends BaseProps,
    BaseHTMLAttributes<HTMLElement> {
  /**
   * The hierarchy of the heading
   */
  level: 1 | 2 | 3;
  /**
   * Only for level 2
   */
  category?: boolean;
  /**
   * Only for level 1
   */
  alt?: VariantProps<typeof css.Heading1>['alt'];
  /**
   * Blog-specific styles
   */
  blog?: boolean;
  /**
   * Dashboard-specific styles
   */
  dashboard?: boolean;
  /**
   * Section heading specific styles
   */
  inHeader?: boolean;
  htmlAs?: keyof JSX.IntrinsicElements;
  css?: ThemedCSS;
}

const Heading = ({
  level,
  category,
  alt,
  blog,
  dashboard,
  htmlAs,
  ...props
}: HeadingProps) => {
  switch (level) {
    case 1:
      return (
        <css.Heading1
          {...props}
          blog={blog}
          alt={alt}
          dashboard={dashboard}
          as={htmlAs}
        />
      );
    case 2:
      if (category) {
        return <css.Heading2Category as={htmlAs} {...props} />;
      }

      return (
        <css.Heading2
          {...props}
          blog={blog}
          dashboard={dashboard}
          as={htmlAs}
          alt={alt}
        />
      );
    case 3:
      return (
        <css.Heading3
          {...props}
          blog={blog}
          dashboard={dashboard}
          as={htmlAs}
          alt={alt}
        />
      );
  }
};

export default Heading;
