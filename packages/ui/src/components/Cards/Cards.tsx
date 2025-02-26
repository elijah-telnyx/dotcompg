import type { GridItemProps } from '../Grid';
import type { MediaProps } from '../Media';
import type { CTAButtonProps } from '../CtaButton';
import Markdown from '../Markdown';
import Media, { MediaSVG } from '../Media';
import CtaButton from '../CtaButton';
import Heading from '../Typography/Heading';
import * as css from './Cards.styled';
import type { SectionProps } from '../Section';
import { isDarkBackgroundColor } from '../../styles/constants/backgroundColorOptions';
import Paragraph from '../Typography/Paragraph';

export interface CardProps extends GridItemProps {
  media?: MediaProps<'media'>;
  icon?: MediaProps<'svg'>;
  tagline?: string;
  heading?: string;
  copy?: string;
  link?: CTAButtonProps;
  order?: number;
  withIconBorder?: boolean;
  clickable?: boolean;
  sectionBackgroundColor?: SectionProps['backgroundColor'];
  extendedLayout?: boolean;
}

export interface CardsProps {
  items: CardProps[];
  withOrder?: boolean;
  withLayout?: GridItemProps;
  sectionBackgroundColor?: SectionProps['backgroundColor'];
  extendedLayout?: boolean;
}

const DEFAULT_LAYOUT = { xs: 4, small: 8, medium: 6 };
const THREE_COLUMN_LAYOUT = { xs: 4, small: 8, medium: 4 };

const LAYOUT: { [length: number]: GridItemProps } = {
  2: DEFAULT_LAYOUT,
  3: THREE_COLUMN_LAYOUT,
  4: { xs: 4, medium: 6 },
  5: DEFAULT_LAYOUT,
  6: { xs: 4, medium: 6, large: 4 },
};

export const Card = ({
  media,
  icon,
  tagline,
  heading,
  copy,
  link,
  order,
  withIconBorder,
  sectionBackgroundColor,
  extendedLayout = false,
  ...props
}: CardProps) => {
  const dark = isDarkBackgroundColor(sectionBackgroundColor);
  return (
    <css.CardItem htmlAs='li' {...props}>
      <css.CardWrapper>
        {media && (
          <css.MediaWrapper extendedLayout={extendedLayout}>
            <Media cover {...media} />
          </css.MediaWrapper>
        )}
        {order && <css.CardOrder>{order}</css.CardOrder>}
        {icon && (
          <css.CardIconWrapper withIconBorder={withIconBorder}>
            <MediaSVG {...icon} />
          </css.CardIconWrapper>
        )}
        {tagline && (
          <css.TagWrapper>
            <Heading level={2} category htmlAs='strong' dark={dark}>
              {tagline}
            </Heading>
          </css.TagWrapper>
        )}
        {heading && (
          <css.HeadingWrapper>
            <Heading level={3} dark={dark}>
              {heading}
            </Heading>
          </css.HeadingWrapper>
        )}
        {copy && <Markdown dark={dark}>{copy}</Markdown>}
        {link && (
          <css.CtaWrapper>
            <CtaButton {...link} backgroundColor={sectionBackgroundColor} />
          </css.CtaWrapper>
        )}
      </css.CardWrapper>
    </css.CardItem>
  );
};

const Cards = ({
  items,
  withOrder,
  sectionBackgroundColor,
  withLayout = {},
  extendedLayout = false,
}: CardsProps) => {
  if (items && !items.length) {
    /**
     * @todo check with design
     */
    return <Paragraph>No results for this filter</Paragraph>;
  }

  // This is for feature flipper DOTCOM_3795_SOLUTIONS_HEADER
  const itemsIsArray = Array.isArray(items);
  const Container = extendedLayout ? css.ContainerExtended : css.Container;

  return (
    <Container as={withOrder ? 'ol' : 'ul'}>
      {itemsIsArray &&
        items.map((card, index) => (
          <Card
            sectionBackgroundColor={sectionBackgroundColor}
            key={card.heading}
            order={withOrder ? index + 1 : undefined}
            {...LAYOUT[items.length]}
            {...card}
            {...withLayout}
            extendedLayout={extendedLayout}
          />
        ))}
    </Container>
  );
};

export default Cards;
