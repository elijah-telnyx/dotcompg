import type { CardTheme } from '../../styles/constants/cardThemeOptions';
import type { SectionProps } from '../Section';
import Grid, { type GridItemProps } from '../Grid';
import Heading from '../Typography/Heading';

import * as css from './ColorfulCards.styled';
import ColorfulCardsItem, {
  simpleColorfulCardsColumns,
} from './ColorfulCardsItem';
import { isDarkColor } from '../../styles/utils';
import { config, theme } from '../../styles';
import useMedia from '../../utils/hooks/useMedia';
import { Fragment } from 'react';

export const gridColumns: GridItemProps = {
  xs: 4,
  small: 8,
  medium: 12,
  large: 12,
  xl: 12,
};

export interface ColorfulCardsItemProps {
  title?: string;
  leadingText?: string;
  highlightTitle: string;
  highlightText: string;
  id: string;
  cardTheme?: CardTheme;
  overlap?: boolean;
}

export interface ColorfulCardsProps extends SectionProps {
  tagline?: string;

  cardTheme: CardTheme;
  /**
   * min of 1 - max of 5
   */
  items: ColorfulCardsItemProps[];
  overlap?: boolean;
}

const ColorfulCards = ({
  tagline,
  cardTheme,
  items,
  overlap,
  ...props
}: ColorfulCardsProps) => {
  const isSmall = useMedia(config.media.small);
  const dark = isDarkColor(props.backgroundColor);
  const isEvenItems = items.length % 2 === 0;
  return (
    <css.SectionWrapper {...props} htmlAs='div'>
      {!!tagline && (
        <Grid.Container
          css={{
            marginBottom: '$large',
            '@medium': {
              marginBottom: '$xxl',
            },
          }}
        >
          <Grid.Item {...gridColumns}>
            <Heading level={2} category htmlAs='p' dark={dark}>
              {tagline}
            </Heading>
          </Grid.Item>
        </Grid.Container>
      )}
      <Grid.Container
        css={{
          rowGap: '$large',
          ...(!overlap && {
            gridAutoRows: '1fr',
            rowGap: '$small',
            '@smallOnly': {
              gridTemplateColumns: `repeat(9, ${theme.sizes.medium})`,
            },
          }),
          '@medium': {
            rowGap: '$xxl',
          },
        }}
      >
        {items?.map((item, index) => {
          const shouldShowEmptyItem =
            !overlap &&
            isEvenItems &&
            items.length >= 4 &&
            index % 2 !== 0 &&
            isSmall;

          return (
            <Fragment key={item.id + index}>
              <ColorfulCardsItem
                {...item}
                cardTheme={cardTheme}
                overlap={overlap}
              />
              {shouldShowEmptyItem && (
                <Grid.Item {...simpleColorfulCardsColumns}></Grid.Item>
              )}
            </Fragment>
          );
        })}
      </Grid.Container>
    </css.SectionWrapper>
  );
};

export default ColorfulCards;
