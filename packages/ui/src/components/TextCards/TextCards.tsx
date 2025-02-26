import type { CardsProps } from '../Cards';
import type { CTAButtonProps } from '../CtaButton';
import Section, { type SectionProps } from '../Section';
import Grid, { type GridItemProps } from '../Grid';
import Cards from '../Cards';
import CtaButton from '../CtaButton';
import Markdown from '../Markdown';
import Heading from '../Typography/Heading';
import { isDarkBackgroundColor } from '../../styles/constants/backgroundColorOptions';
import * as css from './TextCards.styled';

const headingGridColumns: GridItemProps = {
  xs: 4,
  small: 6,
  medium: 9,
  large: 8,
};

const gridColumns: GridItemProps = {
  xs: 4,
  small: 8,
  medium: 12,
  large: 12,
  xl: 12,
};

export interface TextCardsProps extends SectionProps {
  id?: string;
  tagline: string;
  heading?: string;
  copy: string;
  lead?: boolean;
  items: CardsProps['items'];
  withOrder: CardsProps['withOrder'];
  ctaButtons: CTAButtonProps[];
}
const TextCards = ({
  id,
  tagline,
  heading,
  copy,
  lead,
  items,
  withOrder,
  ctaButtons,
  ...props
}: TextCardsProps) => {
  const dark = isDarkBackgroundColor(props.backgroundColor);
  return (
    <Section {...props}>
      <css.Container>
        <css.HeaderItem
          {...headingGridColumns}
          htmlAs='header'
          hidden={!tagline && !heading && !copy}
        >
          {tagline && (
            <Heading level={2} dark={dark} category>
              {tagline}
            </Heading>
          )}

          {heading && (
            <Heading id={id} level={2} dark={dark} inHeader={!!tagline}>
              {heading}
            </Heading>
          )}

          {copy && (
            <Markdown dark={dark} inHeader={!!(tagline || heading)} lead={lead}>
              {copy}
            </Markdown>
          )}
        </css.HeaderItem>

        <Grid.Item {...gridColumns}>
          <Cards
            items={items}
            withOrder={withOrder}
            sectionBackgroundColor={props.backgroundColor}
          />
        </Grid.Item>
        {ctaButtons?.length && (
          <Grid.FullWidthItem>
            <css.ButtonsContainer>
              {ctaButtons.map((cta) => (
                <CtaButton
                  {...cta}
                  key={cta.href}
                  backgroundColor={props.backgroundColor}
                />
              ))}
            </css.ButtonsContainer>
          </Grid.FullWidthItem>
        )}
      </css.Container>
    </Section>
  );
};

export default TextCards;
