import Heading from '../Typography/Heading';
import Paragraph from '../Typography/Paragraph';
import { gridColumns, type ColorfulCardsItemProps } from './ColorfulCards';
import * as css from './ColorfulCards.styled';
import type { GridItemProps } from '../Grid';

export const simpleColorfulCardsColumns: GridItemProps = {
  xs: 4,
  small: 3,
  medium: 4,
};

const SimpleColorfulCardsItem = ({
  highlightText,
  highlightTitle,
  cardTheme,
}: ColorfulCardsItemProps) => {
  return (
    <css.CardWrapper
      cardTheme={cardTheme}
      {...simpleColorfulCardsColumns}
      overlap={false}
      css={{
        '@lessThanSmall': {
          display: 'grid',
          placeContent: 'center',
        },
      }}
    >
      <css.StatisticsHighlight major={{ '@initial': true, '@medium': false }}>
        {highlightTitle}
      </css.StatisticsHighlight>
      <Heading category level={2} htmlAs='p'>
        {highlightText}
      </Heading>
    </css.CardWrapper>
  );
};

const OverlappingCardsItem = ({
  highlightText,
  highlightTitle,
  leadingText,
  title,
  cardTheme,
}: ColorfulCardsItemProps) => {
  return (
    <css.CardWrapper cardTheme={cardTheme} {...gridColumns} overlap={true}>
      <css.CardContent>
        <css.CardContentText>
          <Heading
            level={2}
            css={{
              marginBottom: '$xs',
              '@medium': {
                marginBottom: '$large',
              },
            }}
            htmlAs='p'
          >
            {title}
          </Heading>
          <Paragraph>{leadingText}</Paragraph>
        </css.CardContentText>
      </css.CardContent>
      <css.CardHighlight>
        <css.StatisticsHighlight major>
          {highlightTitle}
        </css.StatisticsHighlight>
        <Heading level={2} category htmlAs='p'>
          {highlightText}
        </Heading>
      </css.CardHighlight>
    </css.CardWrapper>
  );
};

const ColorfulCardsItem = (props: ColorfulCardsItemProps) => {
  if (props.overlap) {
    return <OverlappingCardsItem {...props} />;
  }
  return <SimpleColorfulCardsItem {...props} />;
};
export default ColorfulCardsItem;
