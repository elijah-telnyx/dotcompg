import { isDarkBackgroundColor } from '../../styles/constants/backgroundColorOptions';
import Grid from '../Grid';
import type { MediaProps } from '../Media';
import Media from '../Media';
import type { OverviewHeroProps } from '../OverviewHero';
import { OverviewHeroContent } from '../OverviewHero/OverviewHero';
import ScrollToTheSideOnScroll from '../ScrollToTheSideOnScroll';
import Section from '../Section';
import { getSectionProps } from '../Section/Section';
import * as css from './SolutionsOverviewHero.styled';

export interface SolutionsOverviewHeroProps extends OverviewHeroProps {
  mediaList: {
    media: MediaProps<'media'>;
    id: string;
    fm: MediaProps<'media'>['fm'];
  }[];
}

const SolutionsOverviewHero = ({
  mediaList,
  ...props
}: SolutionsOverviewHeroProps) => {
  const isDark = isDarkBackgroundColor(props.backgroundColor);
  const sectionProps = getSectionProps(props);

  return (
    <Section {...sectionProps}>
      <Grid.Container
        css={{
          rowGap: '$small',

          '@medium': {
            rowGap: '$large',
          },
        }}
      >
        <OverviewHeroContent {...props} isDark={isDark} />
      </Grid.Container>
      <ScrollToTheSideOnScroll withGradientBorder>
        {mediaList?.map(({ media, id, fm }) => (
          <css.StyledMediaItem key={id}>
            <Media {...media} fm={fm} />
          </css.StyledMediaItem>
        ))}
      </ScrollToTheSideOnScroll>
    </Section>
  );
};

export default SolutionsOverviewHero;
