import type { HTMLAttributes } from 'react';
import Media, { MediaSVG, type MediaProps } from '../Media';
import Heading from '../Typography/Heading';
import Paragraph from '../Typography/Paragraph';
import * as css from './Carousel.styled';

export interface CarouselCardProps extends HTMLAttributes<HTMLAnchorElement> {
  media?: MediaProps<'media'>;
  icon?: MediaProps<'svg'>;
  heading: string;
  copy: string;
  backgroundColor?: 'cream' | 'black';
  variant?: 'icon' | 'image';
  linkText: string;
  linkHref: string;
  linkIcon?: MediaProps<'svg'>;
}

export const CarouselCard = ({
  media,
  icon,
  heading,
  copy,
  linkText,
  linkHref,
  linkIcon,
  backgroundColor = 'cream',
  ...props
}: CarouselCardProps) => (
  <css.CardWrapper
    {...props}
    variant={media ? 'image' : 'icon'}
    href={linkHref}
    backgroundColor={backgroundColor}
  >
    {media ? (
      <css.ImageWrapper>
        <Media {...media} />
      </css.ImageWrapper>
    ) : icon ? (
      <css.IconWrapper>
        <MediaSVG {...icon} />
      </css.IconWrapper>
    ) : null}
    <css.TextWrapper>
      <Heading level={3} css={{ marginBottom: '$xs' }}>
        {heading}
      </Heading>
      <Paragraph css={{ marginBottom: '$large' }}>{copy}</Paragraph>
    </css.TextWrapper>
    {linkText && (
      <css.CarouselCardCTA>
        <span>{linkText}</span>
        {linkIcon && (
          <css.CTAIconWrapper>
            <MediaSVG {...linkIcon} />
          </css.CTAIconWrapper>
        )}
      </css.CarouselCardCTA>
    )}
  </css.CardWrapper>
);
