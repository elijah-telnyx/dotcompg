import { isDarkCardTheme } from '../../styles/constants/cardThemeOptions';
import Section from '../Section';
import type {
  ColorfulCardsProps,
  ColorfulCardsItemProps,
} from '../ColorfulCards';
import type { CTAButtonProps } from '../CtaButton';
import Grid, { type GridItemProps } from '../Grid';
import Heading from '../Typography/Heading';
import Paragraph from '../Typography/Paragraph';
import * as css from './OddColorfulCards.styled';
import CtaButton from '../CtaButton';

const gridColumns: GridItemProps = {
  xs: 4,
  small: 8,
  medium: 12,
  large: 12,
  xl: 12,
};

export interface OddColorfulCardItemProps
  extends Omit<ColorfulCardsItemProps, 'title' | 'leadingText'> {
  title: string;
  leadingText: string;
  link?: CTAButtonProps;
  highlightLink?: CTAButtonProps;
}

export const OddColorfulCardItem = ({
  title,
  leadingText,
  link,
  highlightTitle,
  highlightText,
  highlightLink,
  cardTheme,
}: OddColorfulCardItemProps) => {
  const dark = isDarkCardTheme(cardTheme);

  return (
    <css.CardWrapper cardTheme={cardTheme} {...gridColumns}>
      <css.CardAside>
        <Heading level={3} dark htmlAs='strong'>
          {highlightTitle}
        </Heading>
        <Paragraph dark lead>
          {highlightText}
        </Paragraph>
        {highlightLink && (
          <css.CtaButtonWrapper>
            <CtaButton {...highlightLink} backgroundColor='black' />
          </css.CtaButtonWrapper>
        )}
      </css.CardAside>
      <css.Card>
        <Heading level={3} dark={dark} htmlAs='strong'>
          {title}
        </Heading>
        <Paragraph dark={dark} lead>
          {leadingText}
        </Paragraph>
        {link && (
          <css.CtaButtonWrapper>
            <CtaButton
              {...link}
              backgroundColor={cardTheme}
              linkUnderlineColor={cardTheme === 'green' ? 'citron' : 'green'}
            />
          </css.CtaButtonWrapper>
        )}
      </css.Card>
    </css.CardWrapper>
  );
};

export interface OddColorfulCardsProps extends ColorfulCardsProps {
  /**
   * min of 1 - max of 4
   */
  items: OddColorfulCardItemProps[];
}

const OddColorfulCards = ({
  tagline,
  cardTheme,
  items,
  ...props
}: OddColorfulCardsProps) => {
  return (
    <Section {...props}>
      <css.Container>
        <Grid.Item {...gridColumns}>
          <Heading level={2} category htmlAs='strong'>
            {tagline}
          </Heading>
        </Grid.Item>

        {items?.map((item) => (
          <OddColorfulCardItem {...item} cardTheme={cardTheme} key={item.id} />
        ))}
      </css.Container>
    </Section>
  );
};

export default OddColorfulCards;
