import type { CategoryHeaderCardProps } from '../CategoryHeaderCard';
import CategoryHeaderCard from '../CategoryHeaderCard';
import Section, { type SectionProps } from '../Section';
import * as css from './CategoryHeader.styled';
import Grid from '../GridExtended';

export interface CategoryHeaderProps extends SectionProps {
  items: CategoryHeaderCardProps[];
}

const generatedCardList = (items: CategoryHeaderCardProps[]) => {
  return items?.map((item, index) => {
    return (
      <Grid.Item
        key={`media-card - ${index}`}
        xs={4}
        small={index === 0 ? 8 : 4}
        medium={index === 0 ? 6 : 3}
        css={{
          gridRow: index === 0 ? 'span 2' : 'span 1',
        }}
      >
        <CategoryHeaderCard {...item} isFirstImage={index == 0} />
      </Grid.Item>
    );
  });
};

const CategoryHeader = ({ items, id, ...props }: CategoryHeaderProps) => {
  return (
    <Section {...props} id={id} spacingBottom='none'>
      <css.WrapperGrid>
        {items?.length > 0 && <>{generatedCardList(items)}</>}
      </css.WrapperGrid>
    </Section>
  );
};

export default CategoryHeader;
