import Section, { type SectionProps } from '../Section';
import Heading from '../Typography/Heading';
import Codes from '../Codes';
import Cards from '../Cards';
import Grid from '../Grid';
import Markdown from '../Markdown';
import type { GridItemProps } from '../Grid';
import type { CardsProps } from '../Cards';
import type { CodesProps } from '../Codes';
import * as css from './Resources.styled';

const headingGridColumns: GridItemProps = {
  xs: 4,
  small: 8,
  medium: 4,
  xl: 3,
};

const padGridColumns: GridItemProps = {
  xs: 0,
  small: 0,
  medium: 0,
  large: 0,
  xl: 1,
};

const codeSnippetGridColumns: GridItemProps = {
  xs: 4,
  small: 8,
};

const gridColumns: GridItemProps = {
  xs: 4,
  small: 8,
  medium: 12,
  large: 12,
  xl: 12,
};

export interface ResourcesProps extends SectionProps {
  tagline: string;
  heading?: string;
  copy?: string;
  codes?: CodesProps['items'];
  cards: CardsProps['items'];
}
const Resources = ({
  tagline,
  heading,
  copy,
  cards,
  codes,
  ...props
}: ResourcesProps) => {
  return (
    <Section {...props}>
      <css.Container>
        <Grid.Item {...gridColumns}>
          <Heading level={2} category>
            {tagline}
          </Heading>
        </Grid.Item>

        {(heading || copy) && (
          <>
            <Grid.Item {...headingGridColumns} htmlAs='header'>
              {heading && <Heading level={2}>{heading}</Heading>}

              {copy && <Markdown inHeader={!!heading}>{copy}</Markdown>}
            </Grid.Item>

            <Grid.Item {...padGridColumns} />
          </>
        )}

        {codes && (
          <css.CodesItem {...codeSnippetGridColumns}>
            <Codes tagline={tagline} items={codes} />
          </css.CodesItem>
        )}

        <css.CardsItem {...gridColumns}>
          <Cards items={cards} />
        </css.CardsItem>
      </css.Container>
    </Section>
  );
};

export default Resources;
