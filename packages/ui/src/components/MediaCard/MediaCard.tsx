import { isDarkCardTheme } from '../../styles/constants/cardThemeOptions';
import type { CardTheme } from '../../styles/constants/cardThemeOptions';
import type { MediaProps } from '../@types';
import Media, { MediaSVG } from '../Media/Media';
import Heading from '../Typography/Heading';
import CtaButton, { type CTAButtonProps } from '../CtaButton';
import * as css from './MediaCard.styled';
import { Internal } from '../Icons';

export interface MediaCardProps {
  media: MediaProps<'media'>;
  icon?: MediaProps<'svg'>;
  title: string;
  link: CTAButtonProps;
  footerTheme?: CardTheme;
  circleTheme?: CardTheme;
  isFirstImage?: boolean;
}

const MediaCard = ({
  media,
  icon,
  title,
  link,
  footerTheme,
  circleTheme,
  isFirstImage = false,
}: MediaCardProps) => {
  const dark = isDarkCardTheme(footerTheme);

  return (
    <css.Link href={link.href}>
      <css.Wrapper>
        <css.ContainerImage isFirstImage={isFirstImage}>
          <Media {...media} />
        </css.ContainerImage>
        <css.FooterCard backgroundColor={footerTheme} hasNotIcon={!!icon}>
          <css.ContainerCircle>
            {icon && (
              <css.Circle backgroundColor={circleTheme}>
                <css.MediaIconWrapper>
                  <MediaSVG {...icon} />
                </css.MediaIconWrapper>
              </css.Circle>
            )}
            <css.ContainerHeading>
              <Heading level={3} dark={dark}>
                {title}
              </Heading>
              {link && (
                <css.HiddenBellowMedium>
                  <CtaButton
                    {...link}
                    backgroundColor={footerTheme}
                    htmlAs='div'
                  />
                </css.HiddenBellowMedium>
              )}
            </css.ContainerHeading>
          </css.ContainerCircle>
          <css.HiddenAboveMedium>
            <css.ArrowIconWrapper>
              <Internal />
            </css.ArrowIconWrapper>
          </css.HiddenAboveMedium>
        </css.FooterCard>
      </css.Wrapper>
    </css.Link>
  );
};

export default MediaCard;
