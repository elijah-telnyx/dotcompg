import * as css from './LinkImageRowSection.styled';
import ArrowRight from '../Icons/ArrowRight';
import Carousel from './Carousel';
import Grid from '../Grid';
import Link from 'next/link';
import { MediaImage, type MediaProps } from '../Media';
import Section from '../Section';
import SectionHeader, {
  type SectionHeaderProps,
} from '../Section/SectionHeader';
import type { SectionProps } from '../Section';

export interface LinkImageProps {
  src: string;
  alt: string;
  href: string;
  label: string;
  base64BlurImage?: string;
  mobileSrc: MediaProps<'media'>['mobileSrc'];
}

export const LinkImage = ({
  src,
  alt,
  href,
  label,
  base64BlurImage,
  mobileSrc,
  ...props
}: LinkImageProps) => {
  return (
    <css.LinkImageWrapper {...props}>
      <css.LinkImageContainer>
        <css.ImageWrapper>
          <MediaImage src={src} fill alt={alt} mobileSrc={mobileSrc} />
        </css.ImageWrapper>
        <Link href={href}>
          <css.LinkImageLabel>
            {label}
            <ArrowRight />
          </css.LinkImageLabel>
        </Link>
      </css.LinkImageContainer>
    </css.LinkImageWrapper>
  );
};
interface ImageRowAutoScrollProps {
  images: LinkImageProps[];
}

const ImagesRowsAutoScroll = ({ images }: ImageRowAutoScrollProps) => {
  const topImages = images.slice(0, images.length / 2);
  const bottomImages = images.slice(topImages.length);

  return (
    <css.LinkImageRowBannerWrapper>
      <css.RowImagesGrid scrollDirection='left'>
        {[...topImages, ...topImages].map((image, index) => {
          return (
            <LinkImage
              {...image}
              key={index + image.href}
              aria-hidden={index > topImages.length}
            />
          );
        })}
      </css.RowImagesGrid>
      <css.RowImagesGrid scrollDirection='right'>
        {[...bottomImages, ...bottomImages].map((image, index) => (
          <LinkImage
            {...image}
            key={index + image.href}
            aria-hidden={index > bottomImages.length}
          />
        ))}
      </css.RowImagesGrid>
    </css.LinkImageRowBannerWrapper>
  );
};

export interface LinkImageRowSectionProps
  extends SectionProps,
    SectionHeaderProps {
  images: LinkImageProps[];
}

const LinkImageRowSection = ({
  tagline,
  heading,
  copy,
  images,
  ...sectionProps
}: LinkImageRowSectionProps) => {
  return (
    <Section {...sectionProps}>
      <Grid.Container>
        <Grid.FullWidthItem>
          <SectionHeader
            tagline={tagline}
            heading={heading}
            copy={copy}
            variant='large'
          />
        </Grid.FullWidthItem>
        <Grid.FullWidthItem>
          <css.Mobile>
            <Carousel>
              {images.map((image, index) => {
                return <LinkImage {...image} key={index + image.href} />;
              })}
            </Carousel>
          </css.Mobile>
        </Grid.FullWidthItem>
      </Grid.Container>

      <css.Desktop>
        <ImagesRowsAutoScroll images={images} />
      </css.Desktop>
    </Section>
  );
};

export default LinkImageRowSection;
