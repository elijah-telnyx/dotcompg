import Markdown from 'markdown-to-jsx';
import { isDarkBackgroundColor } from '../../styles/constants/backgroundColorOptions';
import Grid, { type GridItemProps } from '../Grid';
import Search from '../Icons/Search';
import Section, { type SectionProps } from '../Section';
import Heading from '../Typography/Heading';
import * as css from './SearchSection.styled';

export interface SearchSectionProps extends SectionProps {
  heading: string;
  searchProps: {
    id: string;
    name: string;
    defaultValue?: string;
    placeholder?: string;
    onSearch?: (searchTerm: string) => void;
  };
}

const headingColumns: GridItemProps = {
  xs: 12,
  medium: 8,
  large: 8,
  xl: 8,
};

const searchBoxColumns: GridItemProps = {
  xs: 12,
  medium: 4,
};

const SearchSection = ({
  heading,
  searchProps,
  ...props
}: SearchSectionProps) => {
  const dark = isDarkBackgroundColor(props.backgroundColor);

  const onSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (searchProps.onSearch && e.key === 'Enter') {
      searchProps.onSearch(e.currentTarget.value);
    }
  };

  return (
    <Section {...props}>
      <Grid.Container
        css={{ rowGap: '$small', '@medium': { rowGap: '$large' } }}
      >
        <Grid.Item {...headingColumns}>
          <Heading level={2} dark={dark} htmlAs='h1'>
            <Markdown>{heading}</Markdown>
          </Heading>
        </Grid.Item>
        <Grid.Item {...searchBoxColumns}>
          <css.SearchBoxWrapper>
            <css.SearchInput
              placeholder={searchProps.placeholder}
              id={searchProps.id}
              name={searchProps.name}
              type='search'
              isDark={dark}
              defaultValue={searchProps.defaultValue}
              onKeyDown={onSearchKeyDown}
              suffix={<Search />}
            />
          </css.SearchBoxWrapper>
        </Grid.Item>
      </Grid.Container>
    </Section>
  );
};

export default SearchSection;
