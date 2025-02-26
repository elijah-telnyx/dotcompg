import type { MouseEventHandler, ReactNode } from 'react';
import Author from '../Author';
import type { MediaProps } from '../Media';
import Tagline from '../Tagline';
import * as css from './CarouselCard.styled';
import { getElement, interactiveElements } from './utils';
import type { BackgroundColor } from '../../styles/constants/backgroundColorOptions';
import type { HeadingProps } from '../Typography/Heading';

interface CarouselCardTagline {
  name: string;
  color: BackgroundColor;
}

export interface CarouselCardProps {
  media?: MediaProps<'media'>;
  heading?: string;
  tagline: string | CarouselCardTagline;
  author: {
    media?: MediaProps<'media'>;
    name: string;
  };
  isDark?: boolean;
  semanticHeading?: boolean;
  href?: string;
  forceNotInteractive?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  onMouseDown?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  isEditor?: boolean;
}

export const CardMedia = ({ media }: { media: MediaProps<'media'> }) => {
  return (
    <css.BaseCardMediaWrapper>
      <css.BaseCardMedia {...media} cover />
    </css.BaseCardMediaWrapper>
  );
};

export const CardRoot = ({
  children,
  label,
  forceNotInteractive,
  ...props
}: {
  children: ReactNode;
  label?: string;
} & Partial<CarouselCardProps>) => {
  const wrapperElement = getElement(props);
  const isInteractive = forceNotInteractive
    ? false
    : interactiveElements.includes(wrapperElement);

  return (
    <css.CardWrapper
      {...props}
      as={wrapperElement}
      data-is-interactive={isInteractive}
      aria-label={isInteractive ? label : undefined}
    >
      {children}
    </css.CardWrapper>
  );
};

export const CardTagline = ({
  children,
  color = 'black',
  isDark = false,
}: {
  children: string;
  color?: BackgroundColor;
  isDark?: CarouselCardProps['isDark'];
}) => {
  return (
    <Tagline
      color={color}
      isDark={isDark}
      variants={{ mobileTypography: true }}
    >
      {children}
    </Tagline>
  );
};

export const CardHeading = ({
  children,
  semanticHeading,
  isDark,
  ...props
}: {
  children: ReactNode;
  semanticHeading?: boolean;
  isDark?: CarouselCardProps['isDark'];
} & Omit<HeadingProps, 'level'>) => {
  return (
    <css.Heading
      {...props}
      htmlAs={semanticHeading ? 'h3' : 'p'}
      level={3}
      dark={isDark}
    >
      {children}
    </css.Heading>
  );
};

export const CardAuthor = ({
  author,
  isDark,
  ...props
}: Pick<CarouselCardProps, 'author' | 'isDark' | 'isEditor'>) => {
  return (
    <css.AuthorWrapper>
      <Author {...author} isDark={isDark} isEditor={props.isEditor} />
    </css.AuthorWrapper>
  );
};

const CarouselCard = ({
  media,
  heading,
  tagline: taglineProp,
  author,
  isDark = false,
  semanticHeading,
  ...props
}: CarouselCardProps) => {
  const tagline = {
    name: typeof taglineProp === 'string' ? taglineProp : taglineProp.name,
    color: typeof taglineProp === 'string' ? undefined : taglineProp?.color,
  };

  return (
    <CardRoot {...props} label={`${tagline.name} ${heading} by ${author.name}`}>
      {media && <CardMedia media={media} />}
      <CardTagline isDark={isDark} color={tagline.color}>
        {tagline.name}
      </CardTagline>
      {heading && (
        <CardHeading semanticHeading={semanticHeading} isDark={isDark}>
          {heading}
        </CardHeading>
      )}
      <CardAuthor author={author} isDark={isDark} isEditor={props.isEditor} />
    </CardRoot>
  );
};

export default CarouselCard;
