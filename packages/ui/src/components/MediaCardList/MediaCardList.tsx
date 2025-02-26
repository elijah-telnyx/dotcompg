import { isDarkColor } from '../../styles/utils';
import Grid from '../Grid';
import type { MediaCardProps } from '../MediaCard';
import MediaCard from '../MediaCard';
import Section, { type SectionProps } from '../Section';
import Heading from '../Typography/Heading';
import * as css from './MediaCardList.styled';

export interface MediaCardListProps extends SectionProps {
  tagline: string;
  heading: string;
  id?: string;
  items: MediaCardProps[];
}

const generatedCardList = (items: MediaCardProps[]) => {
  return items?.map((item, index) => {
    return (
      <Grid.Item key={`media-card - ${index}`} xs={4} small={4} medium={6}>
        <MediaCard {...item} />
      </Grid.Item>
    );
  });
};

const MediaCardList = ({
  tagline,
  heading,
  items,
  backgroundColor,
  id,
  ...props
}: MediaCardListProps) => {
  const dark = isDarkColor(backgroundColor);

  return (
    <Section backgroundColor={backgroundColor} {...props} id={id}>
      <Grid.Container>
        <Grid.Item xs={4} small={5} medium={6} large={8}>
          <Heading level={2} category blog dark={dark}>
            {tagline}
          </Heading>
          <css.Heading level={1} blog dark={dark} htmlAs='h2'>
            {heading}
          </css.Heading>
        </Grid.Item>
      </Grid.Container>
      {items?.length > 0 && (
        <>
          <Grid.Container>
            <Grid.Item xs={4} small={8} medium={12}>
              <MediaCard {...items[0]} isFirstImage={true} />
            </Grid.Item>
          </Grid.Container>

          <css.ContainerCards>
            {generatedCardList(items.slice(1))}
          </css.ContainerCards>
        </>
      )}
    </Section>
  );
};

export default MediaCardList;
