import type { CardTheme } from '../../styles/constants/cardThemeOptions';
import type { MediaProps } from '../@types';
import Media, { MediaSVG } from '../Media/Media';
import CtaButton, { type CTAButtonProps } from '../CtaButton';
import * as css from './CategoryHeaderCard.styled';
import { Internal } from '../Icons';

export interface CategoryHeaderCardProps {
  media: MediaProps<'media'>;
  icon?: MediaProps<'svg'>;
  title: string;
  link: CTAButtonProps;
  footerTheme?: CardTheme;
  circleTheme?: CardTheme;
  isFirstImage?: boolean;
}

const CategoryHeaderCard = ({
  media,
  icon,
  title,
  link,
  footerTheme,
  circleTheme,
  isFirstImage = false,
}: CategoryHeaderCardProps) => {
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
              <css.CardHeading>{title}</css.CardHeading>
              {link && (
                <css.HiddenBellowMedium>
                  <CtaButton
                    {...link}
                    backgroundColor={footerTheme}
                    htmlAs='div'
                    linkSize='small'
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

export default CategoryHeaderCard;
