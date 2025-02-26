import Section, { type SectionProps } from '../Section';
import { MediaImage, type MediaProps } from '../Media';
import Paragraph from '../Typography/Paragraph';
import * as css from './CustomerLogos.styled';
import useLogoSwapper from './useLogoSwapper';
import type { ThemedCSS } from '../../styles/config/stitches.config';
import ParallaxImageRow, {
  type ParallaxImageRowProps,
} from '../ParallaxImageRow/ParallaxImageRow';

export type LogoProps = { media: MediaProps<'media'> };

export interface CustomerLogosProps extends SectionProps {
  copy?: string;
  logos: LogoProps[];
  centered?: boolean;
  maxVisibleLogos?: number;
  css?: ThemedCSS;
  parallaxAnimation?: 'None' | ParallaxImageRowProps['direction'];
  infiniteAnimation?: boolean;
}

const MINIMUM_LOGOS = 2;

const CustomerLogo = ({ media, ...props }: Pick<LogoProps, 'media'>) => {
  return (
    <css.MainImageItem xs={2} medium={3} {...props}>
      <css.MainImageContainer>
        <MediaImage {...media} sizes='100vw' />
      </css.MainImageContainer>
    </css.MainImageItem>
  );
};

const FadeInFadeOutLogos = ({
  logos,
  maxVisibleLogos,
}: Required<Pick<CustomerLogosProps, 'logos' | 'maxVisibleLogos'>>) => {
  const { images, ...props } = useLogoSwapper({ logos, maxVisibleLogos });

  return (
    <>
      {images.map((logo) => (
        <CustomerLogo key={logo.media.src} {...logo} {...props} />
      ))}
    </>
  );
};

const InfiniteScrollLogos = ({
  copy,
  logos,
  ...props
}: Required<Pick<CustomerLogosProps, 'logos'>> &
  Partial<Pick<CustomerLogosProps, 'copy'>>) => {
  return (
    <Section {...props}>
      <css.Container>
        {copy && (
          <css.CopyContainer xs={4} small={8} medium={12}>
            <Paragraph>{copy}</Paragraph>
          </css.CopyContainer>
        )}
        {logos.map((logo, index) => (
          <CustomerLogo key={logo.media.alt + index} {...logo} />
        ))}
      </css.Container>
    </Section>
  );
};

const CustomerLogos = ({
  copy,
  logos,
  centered,
  maxVisibleLogos = css.MAX_VISIBLE_LOGOS,
  parallaxAnimation = 'None',
  infiniteAnimation,
  ...props
}: CustomerLogosProps) => {
  if (infiniteAnimation) {
    return <InfiniteScrollLogos copy={copy} logos={logos} {...props} />;
  }
  if (parallaxAnimation !== 'None') {
    return (
      <Section {...props}>
        <ParallaxImageRow
          direction={parallaxAnimation}
          images={logos.map((it) => it.media)}
        />
      </Section>
    );
  }

  // minimum 3 items displayed
  if (logos.length < MINIMUM_LOGOS) {
    console.warn(`[CustomerLogos] received less than ${MINIMUM_LOGOS} logos`);
  }

  return (
    <Section {...props}>
      <css.Container centered={centered}>
        {logos.length > maxVisibleLogos ? (
          <FadeInFadeOutLogos logos={logos} maxVisibleLogos={maxVisibleLogos} />
        ) : (
          logos.map((logo, index) => (
            <CustomerLogo key={logo.media.alt + index} {...logo} />
          ))
        )}
      </css.Container>
    </Section>
  );
};

export default CustomerLogos;
