import Link from 'next/link';
import { type SectionProps } from '../Section';
import { MediaImage, type MediaProps } from '../Media';
import * as css from './LargeLinkImageRowSection.styled';
import ArrowRight from '../Icons/ArrowRight';
import External from '../Icons/External';
import { isTelnyxHref } from '../Link/Link';

export interface LargeLinkImageProps {
  src: string;
  alt: string;
  href: string;
  label: string;
  base64BlurImage?: string;
  mobileSrc?: MediaProps<'media'>['mobileSrc'];
}

export interface LargeLinkImageRowSectionProps extends SectionProps {
  images: LargeLinkImageProps[];
}

export const LargeLinkImage = ({
  src,
  alt,
  href,
  label,
  base64BlurImage,
  mobileSrc,
  ...props
}: LargeLinkImageProps): JSX.Element => {
  return (
    <css.LinkImageWrapper {...props}>
      <css.LinkImageContainer>
        <css.ImageWrapper>
          <MediaImage src={src} fill alt={alt} mobileSrc={mobileSrc} />
        </css.ImageWrapper>
        <Link href={href}>
          <css.LinkImageLabel>
            {label}
            {isTelnyxHref(href) ? <ArrowRight /> : <External />}
          </css.LinkImageLabel>
        </Link>
      </css.LinkImageContainer>
    </css.LinkImageWrapper>
  );
};

const LargeLinkImageRowSection = ({
  images,
}: LargeLinkImageRowSectionProps): JSX.Element => {
  return (
    <css.LinkImageRowBannerWrapper>
      <css.RowImagesGrid scrollDirection='left'>
        {images.map((image, index) => {
          return <LargeLinkImage {...image} key={index + image.href} />;
        })}
        {/*Duplicate the images to create a seamless scroll effect*/}
        {images.map((image, index) => {
          return <LargeLinkImage {...image} key={index + image.href} />;
        })}
      </css.RowImagesGrid>
    </css.LinkImageRowBannerWrapper>
  );
};

export default LargeLinkImageRowSection;
