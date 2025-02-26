import { useState, useEffect } from 'react';

import { type SectionProps } from '../Section';
import { type MediaProps } from '../Media';
import { type NetworkMapSectionProps } from '../NetworkMapSection';
import Grid from '../Grid';
import CtaButton, { type CTAButtonProps } from '../CtaButton';
import NetworkMapSection from '../NetworkMapSection';
import NetworkMapLoading from '../NetworkMapSection/NetworkMapLoading';
import { isDarkBackgroundColor } from '../../styles/constants/backgroundColorOptions';
import { useIntersectionObserver } from '../../utils/hooks/useIntersectionObserver';
import * as css from './OurNetworkHero.styled';

const HERO_CONTENT_CONTAINER_ID = 'our-network-hero-content-container';
const HERO_NETWORK_MAP_ID = 'our-network-hero-network-map';
const HERO_NETWORK_LOAD_TIMEOUT_MS = 500;

export interface OurNetworkHeroProps extends SectionProps {
  media: MediaProps<'img'>;
  heading: string;
  copy?: string;
  ctaButtons?: CTAButtonProps[];
  networkMap: NetworkMapSectionProps;
}

type OurNetworkHeroComponentProps = Omit<
  OurNetworkHeroProps,
  'media' | 'networkMap'
>;

export const OurNetworkHeroContent = ({
  backgroundColor,
  heading,
  copy,
  ctaButtons,
}: OurNetworkHeroComponentProps) => {
  const dark = isDarkBackgroundColor(backgroundColor);

  return (
    <>
      <css.HeadingItem>
        <css.Heading level={1} dark={dark}>
          {heading}
        </css.Heading>
      </css.HeadingItem>
      {copy && (
        <css.CopyItem>
          <css.Paragraph dark={dark}>{copy}</css.Paragraph>
        </css.CopyItem>
      )}
      {ctaButtons && (
        <Grid.FullWidthItem>
          <css.ButtonsWrapper>
            {ctaButtons.map((cta) => (
              <CtaButton
                {...cta}
                key={cta.href}
                backgroundColor={backgroundColor}
              />
            ))}
          </css.ButtonsWrapper>
        </Grid.FullWidthItem>
      )}
    </>
  );
};

const OurNetworkHeroComponent = ({
  heading,
  copy,
  ctaButtons,
  backgroundColor = 'black',
  ...props
}: OurNetworkHeroComponentProps) => {
  return (
    <css.SectionWrapper {...props} transparent>
      <css.HeroContainer
        id={HERO_CONTENT_CONTAINER_ID}
        css={{
          rowGap: '$small',

          '@medium': {
            rowGap: '$large',
          },
        }}
      >
        <OurNetworkHeroContent
          backgroundColor={backgroundColor}
          heading={heading}
          copy={copy}
          ctaButtons={ctaButtons}
        />
      </css.HeroContainer>
    </css.SectionWrapper>
  );
};

const OurNetworkHero = ({
  media,
  networkMap,
  ...props
}: OurNetworkHeroProps) => {
  const [loadingMap, setLoadingMap] = useState(true);
  const { observerRef, entry } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.2,
  });

  useEffect(() => {
    setTimeout(() => {
      if (!loadingMap) return;

      setLoadingMap(!entry?.isIntersecting);
    }, HERO_NETWORK_LOAD_TIMEOUT_MS);
  }, [entry?.isIntersecting, loadingMap]);

  return (
    <>
      <css.BackgroundGradient />
      <css.BackgroundImageWrapper>
        <css.BackgroundImage
          {...media}
          loading='eager'
          useSrcSetGenerator={false}
        />
      </css.BackgroundImageWrapper>
      <OurNetworkHeroComponent {...props} />
      {/* next/dynamic doesn't work on scroll snap sections */}
      {loadingMap && (
        <css.NetworkMapLoading ref={observerRef} id={HERO_NETWORK_MAP_ID}>
          <NetworkMapLoading />
        </css.NetworkMapLoading>
      )}
      {!loadingMap && (
        <css.NetworkMap id={HERO_NETWORK_MAP_ID}>
          <NetworkMapSection {...networkMap} />
        </css.NetworkMap>
      )}
    </>
  );
};

export default OurNetworkHero;
