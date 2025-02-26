import Section, { type SectionProps } from '../Section';
import type { CardProps, CardsProps } from '../Cards';

import GridExtended from '../GridExtended';
import Heading from '../Typography/Heading';
import Cards from '../Cards';
import * as css from './GridCards.styled';
import { type SelectProps } from '../Select';
import Markdown from '../Markdown';
import MultiSelect from '../MultiSelect';
import {
  type PaginationPageCounterProps,
  type PaginationButtonProps,
} from '../Pagination';
import Search from '../Icons/Search';
import { useState, useEffect } from 'react';

import ScrollingPagination from './ScrollingPagination';
import Spinner from '../Spinner';

import {
  useStickyScroll,
  type UseStickyScrollOptions,
} from '../../utils/hooks/useStickyScroll';

export interface SearchResponseProps<T> {
  status: string;
  items: T[];
  pagination: {
    currentPage: string | number;
    totalPages: string | number;
  };
}

export type FilterCategoryProps = {
  name: string;
  items: {
    name: string;
    value: string;
  }[];
};

export type getUseCaseProps = (params: {
  page?: string | undefined;
  search?: string | undefined;
  filterQuery?: { [key: string]: string | undefined };
}) => Promise<SearchResponseProps<CardProps>>;

export interface GridCardsProps extends SectionProps {
  href?: string;
  tagline?: string;
  heading: string;
  items: CardsProps[];
  enableScroll?: boolean;
  filter: {
    id: SelectProps['id'];
    placeholder: SelectProps['placeholder'];
    items: SelectProps['items'];
    value?: SelectProps['value'];
    onValueChange?: SelectProps['onValueChange'];
  };
  resetLinkFilter?: string;
  pagination: {
    pageCounter: PaginationPageCounterProps;
    previous: {
      onClick?: PaginationButtonProps['onClick'];
      href?: PaginationButtonProps['href'];
    };
    next: {
      onClick?: PaginationButtonProps['onClick'];
      href?: PaginationButtonProps['href'];
    };
  };
  getUseCases?: getUseCaseProps;
  filterCategory?: FilterCategoryProps[];
  totalPages?: number;
}

interface SearchBoxProps {
  getUseCases?: GridCardsProps['getUseCases'];
  setCurrentItems: (items: CardsProps['items']) => void;
  setSearch: (search: string) => void;
  setTotalPages: (totalPages: number) => void;
  setCurrentPage: (currentPage: number) => void;
  setLoading: (loading: boolean) => void;
}

interface FilterBoxProps {
  getUseCases?: GridCardsProps['getUseCases'];
  setCurrentItems: (items: CardsProps['items']) => void;
  filterCategory: GridCardsProps['filterCategory'];
  setFilter: (filter: { [key: string]: string }) => void;
  setTotalPages: (totalPages: number) => void;
  setCurrentPage: (currentPage: number) => void;
  setLoading: (loading: boolean) => void;
}

// Search Box
const SearchBox = ({
  getUseCases,
  setCurrentItems,
  setSearch,
  setTotalPages,
  setCurrentPage,
  setLoading,
}: SearchBoxProps) => {
  const searchTerm = '';

  const onSearch = async (search: string) => {
    if (!getUseCases) {
      return;
    }
    setLoading(true);
    setSearch(search);

    try {
      const searchResponse = await getUseCases({ page: '1', search });
      if (Array.isArray(searchResponse?.items)) {
        setCurrentItems(searchResponse.items);

        setTotalPages(Number(searchResponse.pagination.totalPages));
        setCurrentPage(Number(searchResponse.pagination.currentPage));
      }
    } catch (error) {
      console.error('Search failed:', error);
      // Handle error appropriately
    } finally {
      setLoading(false);
    }
  };

  const searchProps = {
    id: 'search',
    name: 'search',
    placeholder: 'Search',
    defaultValue: searchTerm,
    onSearch,
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (searchProps.onSearch && e.key === 'Enter') {
        searchProps.onSearch(e.currentTarget.value);
      }
    },
  };

  return (
    <css.SearchBoxWrapper xs={4} large={3} xl={2}>
      <css.SearchInput
        placeholder={searchProps.placeholder}
        id={searchProps.id}
        name={searchProps.name}
        type='search'
        isDark={false}
        defaultValue={searchProps.defaultValue}
        onKeyDown={searchProps.onKeyDown}
        suffix={<Search />}
      />
    </css.SearchBoxWrapper>
  );
};

// Filter Box
const FilterBox = ({
  filterCategory,
  getUseCases,
  setCurrentItems,
  setFilter,
  setTotalPages,
  setCurrentPage,
  setLoading,
}: FilterBoxProps) => {
  const [filterValues, setFilterValues] = useState<string[]>([]);
  if (!getUseCases || !filterCategory) {
    return;
  }

  // This gets top level category names
  // Expected format example: ['Industries', 'Department']
  const categoryTitles = filterCategory
    .map((category) => category?.items && category.name)
    .filter(Boolean);

  const onFilter = async (filter: string[]) => {
    setFilterValues(filter);
    setLoading(true);

    // This consolidates the selected filters into an object with filter categories as keys and selected filters as values
    // Expected format example: {Industries: ['Logistics and transportation', 'Health Care'], Department: ['Marketing', 'Customer support']}
    const selectedCategories = filterCategory.reduce<Record<string, string[]>>(
      (acc, item) => {
        categoryTitles.map((category) => {
          if (item.name === category) {
            filter.forEach((filterItem: string) => {
              if (item.items.find((item) => item.name === filterItem)) {
                acc[category].push(filterItem);
              }
            });
          }
        });

        return acc;
      },
      {
        ...categoryTitles.reduce(
          (acc, category) => ({ ...acc, [category]: [] }),
          {}
        ),
      }
    );

    // This makes the arrays as strings under each category key in selectedCategories
    // Expected format example: {Industries: 'Logistics and transportation,Health Care', Department: 'Marketing,Customer support'}
    const stringCategories = Object.keys(selectedCategories).reduce<
      Record<string, string>
    >((acc, key) => {
      acc[key] = selectedCategories[key].join(',');
      return acc;
    }, {});

    setFilter({ ...(stringCategories as { [key: string]: string }) });

    try {
      // Make the query to public service api
      const searchResponse = await getUseCases({
        page: '1',
        filterQuery: { ...(stringCategories as { [key: string]: string }) },
      });
      console.log(1, searchResponse);
      if (Array.isArray(searchResponse?.items)) {
        setCurrentItems(searchResponse.items);
        console.log('newTotalPages:', searchResponse.pagination.totalPages);
        setTotalPages(Number(searchResponse.pagination.totalPages));
        setCurrentPage(Number(searchResponse.pagination.currentPage));
      }
    } catch (error) {
      console.error('Search failed:', error);
      // Handle error appropriately
    } finally {
      setLoading(false);
    }
  };

  return (
    <MultiSelect
      items={filterCategory}
      placeholder='Filter by'
      value={filterValues}
      onChange={onFilter}
    />
  );
};

// Scrolling Sticky Div Element For Filter and Search Boxes.
const ScrollingStickySelect = ({ onStickyChange }: UseStickyScrollOptions) => {
  const { targetRef } = useStickyScroll({
    onStickyChange,
  });

  return <div ref={targetRef} style={{ height: '1px' }}></div>;
};

const GridCards = ({
  tagline,
  heading,
  items,
  filter,
  resetLinkFilter,
  getUseCases,
  filterCategory, // From Contentful from gridCards section content type
  totalPages,
  ...props
}: GridCardsProps) => {
  // Setting Items
  const [currentItems, setCurrentItems] = useState<CardsProps['items']>(items);

  // If filterCategory does not match the expected format, set a flg to false.
  const isFilterCategoryValid = filterCategory?.every(
    (category) => category?.items && category.name
  );

  const [loading, setLoading] = useState<boolean>(false);
  // Scrolling Pagination
  const [currentSearch, setSearch] = useState<string | undefined>();
  const [currentFilter, setFilter] = useState<{
    [key: string]: string | undefined;
  }>();
  const [currentTotalPages, setTotalPages] = useState<number>(totalPages || 1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // The items change quite frequently, so we need to update the currentItems
  useEffect(() => {
    setCurrentItems(items);
  }, [items]);

  // Scrolling Sticky Select
  const [isSelectSticky, setIsSelectSticky] = useState(false);
  const [scrollUpDirection, setUpProp] = useState(false);

  const handleStickyChange = (isSticky: boolean, isScrollingUp: boolean) => {
    setIsSelectSticky(isSticky);
    setUpProp(isSticky && isScrollingUp);
  };

  return (
    <Section {...props}>
      <css.ContainerExtended>
        {tagline && (
          <GridExtended.FullWidthItem>
            <Heading level={2} category htmlAs='strong'>
              {tagline}
            </Heading>
          </GridExtended.FullWidthItem>
        )}

        {/* Scrolling Sticky Select Element */}
        <ScrollingStickySelect onStickyChange={handleStickyChange} />

        <GridExtended.FullWidthItem htmlAs='header'>
          <css.HeaderContainerExtended>
            <css.HeadingItem xs={4} small={4} medium={8} large={6} xl={6}>
              <Heading level={2}>
                <Markdown options={{ forceBlock: false }} noStyles>
                  {heading}
                </Markdown>
              </Heading>
            </css.HeadingItem>

            <css.SelectSection
              sticky={isSelectSticky}
              up={scrollUpDirection}
              down={!scrollUpDirection}
            >
              <css.SelectWrapper sticky={isSelectSticky}>
                <SearchBox
                  getUseCases={getUseCases}
                  setCurrentItems={setCurrentItems}
                  setSearch={setSearch}
                  setTotalPages={setTotalPages}
                  setCurrentPage={setCurrentPage}
                  setLoading={setLoading}
                />
                <css.FilterItem xs={4} large={1} xl={3}>
                  {isFilterCategoryValid ? (
                    <FilterBox
                      filterCategory={filterCategory}
                      getUseCases={getUseCases}
                      setCurrentItems={setCurrentItems}
                      setFilter={setFilter}
                      setTotalPages={setTotalPages}
                      setCurrentPage={setCurrentPage}
                      setLoading={setLoading}
                    />
                  ) : (
                    <css.FilterError>Error With Filter</css.FilterError>
                  )}
                </css.FilterItem>
              </css.SelectWrapper>
            </css.SelectSection>
          </css.HeaderContainerExtended>
        </GridExtended.FullWidthItem>

        <GridExtended.FullWidthItem>
          <Cards
            items={currentItems}
            withLayout={{ xs: 4, medium: 4, large: 3 }}
            extendedLayout={true}
          />
        </GridExtended.FullWidthItem>

        {/* Pagination Element */}
        <ScrollingPagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          currentTotalPages={currentTotalPages}
          setCurrentItems={setCurrentItems}
          getUseCases={getUseCases}
          currentSearch={currentSearch}
          currentFilter={currentFilter}
          setTotalPages={setTotalPages}
          loading={loading}
          setLoading={setLoading}
        />
        {loading && (
          <css.Loading>
            <Spinner title='Fetching Articles' background='dark' size='big' />
          </css.Loading>
        )}
      </css.ContainerExtended>
    </Section>
  );
};

export default GridCards;
