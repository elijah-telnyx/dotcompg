import { theme } from '../../styles';
import type { SectionProps } from '../Section';
import Grid from '../Grid';
import Media, { type MediaProps } from '../Media';
import Markdown from '../Markdown';
import Heading from '../Typography/Heading';
import { isDarkBackgroundColor } from '../../styles/constants/backgroundColorOptions';
import * as css from './About.styled';

export interface AboutProps extends SectionProps {
  tag: string;
  heading: string;
  copy: string;
  lead?: boolean;
  media?: MediaProps<'media'>;
  reverse?: boolean;
}

// caps at theme.viewports.xl
// this prevents image from growing too big on ultra-wide screens(2560px)
const viewport = `min(100vw, ${theme.viewports.xl})`;

const cssAboutProps = {
  position: 'relative',
  aspectRatio: '4/3',
  $$gridWidth: theme.gridMaxWidth.large,
  $$space: `calc((${viewport} - $$gridWidth)/ 2)`,
  maxWidth: '100%',
  objectFit: 'cover',
  '@large': {
    maxWidth: 'initial',
    // calc width based on the grid.item space(100%) +
    // all the left available space
    width: `calc(100% + $$space)`,
    minHeight: 399,
    left: '-$$space',
  },
  '@xl': {
    $$gridWidth: theme.gridMaxWidth.xl,
    minHeight: 564,
  },
};

const cssAboutReverseProps = {
  ...cssAboutProps,
  '@large': {
    ...cssAboutProps['@large'],
    left: 'auto',
    maxWidth: 'initial',
  },
};

const About = ({
  tag,
  heading,
  copy,
  media,
  lead,
  reverse,
  ...props
}: AboutProps) => {
  const isDark = isDarkBackgroundColor(props.backgroundColor);
  return (
    <css.SectionWrapper {...props}>
      <css.Container>
        {media && (
          <css.MediaItem
            small={6}
            xs={4}
            medium={8}
            large={4}
            reverse={!!reverse}
          >
            <Media
              {...media}
              css={reverse ? cssAboutReverseProps : cssAboutProps}
            />
          </css.MediaItem>
        )}
        <Grid.Item
          medium={8}
          small={6}
          xs={4}
          css={media ? { alignSelf: 'center' } : {}}
          htmlAs='header'
        >
          {tag && (
            <Heading level={2} dark={isDark} category>
              {tag}
            </Heading>
          )}

          {heading && (
            <Heading level={2} dark={isDark} inHeader={!!tag}>
              {heading}
            </Heading>
          )}

          {copy && (
            <Markdown dark={isDark} inHeader={!!(tag || heading)} lead={lead}>
              {copy}
            </Markdown>
          )}
        </Grid.Item>
      </css.Container>
    </css.SectionWrapper>
  );
};

export default About;
