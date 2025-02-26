import { styled } from '../../../styles';
import { backgroundColorVariants } from '../../../styles/constants/backgroundColorOptions';
import type { CtaBannerProps } from '../../CTABanner';
import CtaButton from '../../CtaButton';
import type { MediaProps } from '../../Media';
import Media from '../../Media';

export interface HeaderNavigationMenuCTABannerProps extends CtaBannerProps {
  media: MediaProps<'media'>;
}

export function HeaderNavigationMenuCTABanner({
  heading,
  backgroundColor,
  ctaButtons,
  media,
  title: _title, //to remove from the html
}: HeaderNavigationMenuCTABannerProps) {
  return (
    <BannerWrapper backgroundColor={backgroundColor}>
      <TextContainer>
        <Headline>{heading}</Headline>
        <CTAContainer>
          {ctaButtons?.map((ctaButton) => (
            <CtaButton
              {...ctaButton}
              key={'header-cta-button_' + ctaButton.href}
              buttonVariant='header'
            />
          ))}
        </CTAContainer>
      </TextContainer>
      <MediaContainer>
        <Media cover {...media} useSrcSetGenerator={false} />
      </MediaContainer>
    </BannerWrapper>
  );
}

const BannerWrapper = styled('div', {
  gridColumn: 'span 2',
  color: '$black',
  borderRadius: '$medium',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '$medium',
  overflow: 'hidden',
  width: '100%',
  maxHeight: 158,
  variants: {
    ...backgroundColorVariants,
  },
});

const TextContainer = styled('div', {
  padding: '$xl',
});

const Headline = styled('h3', {
  typography: '$h3.mobile',
  marginBottom: '$small',
});

const CTAContainer = styled('div', {
  display: 'flex',
  gap: '$small',
  justifyItems: 'space-between',
});

const MediaContainer = styled('div', {
  position: 'relative',
  maxHeight: 158,
  img: {
    display: 'block',
  },
});
