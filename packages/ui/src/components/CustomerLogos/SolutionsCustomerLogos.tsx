import Section, { type SectionProps } from '../Section';
import { MediaImage, type MediaProps } from '../Media';
import { SolutionsCss } from './CustomerLogos.styled';
import useLogoSwapper from './useLogoSwapper';
import useMedia from '../../utils/hooks/useMedia';
import { config } from '../../styles';

export type LogoProps = { media: MediaProps<'media'> };

export interface CustomerLogosProps extends SectionProps {
  logos: LogoProps[];
  maxVisibleLogos?: number;
}

const FadeInFadeOutLogos = ({
  logos,
  maxVisibleLogos,
}: Required<Pick<CustomerLogosProps, 'logos' | 'maxVisibleLogos'>>) => {
  const { images, ...props } = useLogoSwapper({ logos, maxVisibleLogos });
  return (
    <>
      {images.map((logo, index) => (
        <SolutionsCss.mediaWrapper key={logo.media.alt + index} {...props}>
          <MediaImage {...logo.media} contain />
        </SolutionsCss.mediaWrapper>
      ))}
    </>
  );
};

const CustomerLogos = ({
  logos,
  maxVisibleLogos = 4,
  ...props
}: CustomerLogosProps) => {
  // minimum 3 items displayed
  if (logos.length < 3) {
    console.warn('[CustomerLogos] received less than three (3) logos');
  }
  const isXs = useMedia(config.media.lessThanSmall);

  return (
    <Section {...props}>
      <SolutionsCss.container>
        {isXs || logos.length > maxVisibleLogos ? (
          <FadeInFadeOutLogos
            logos={logos}
            maxVisibleLogos={isXs ? 1 : maxVisibleLogos}
          />
        ) : (
          logos.map((logo, index) => (
            <SolutionsCss.mediaWrapper key={logo.media.alt + index}>
              <MediaImage {...logo.media} contain={true} />
            </SolutionsCss.mediaWrapper>
          ))
        )}
      </SolutionsCss.container>
    </Section>
  );
};

export default CustomerLogos;
