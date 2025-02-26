import { addPageToCopy } from 'lib/Contentful/utils';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getArticles } from 'services/publicApiService';
import { ArticlesList, type ArticlesListProps } from 'ui/components/ArticlesListSection';
import Chip from 'ui/components/Chip';
import LoadingIcon from 'ui/components/Icons/Loading';
import Section, { type SectionProps } from 'ui/components/Section';
import Select from 'ui/components/Select';
import Heading from 'ui/components/Typography/Heading';
import Paragraph from 'ui/components/Typography/Paragraph';
import VisibleChildren from 'ui/components/VisibleChildrenLimiter';
import { generateResourcesPagination } from 'utils/calculateResourcesPagination';
import useAsync from 'utils/hooks/useAsync';
import { routes } from 'utils/routes';
import * as css from './ControlledArticlesListSectionProps.styled';
import type { ArticleClassification } from 'lib/Contentful/types';

const Loading = () => {
  return (
    <css.LoadingWrapper>
      <LoadingIcon spin />
    </css.LoadingWrapper>
  );
};

export interface ControlledArticlesListSectionProps extends SectionProps {
  heading: string;
  copy: string;
  topicFilter: ArticleClassification[];
  categoryFilter: ArticleClassification[];
  topicValue?: string;
  categoryValue: string | undefined;
  setCategoryValue: (value: string | undefined) => void;
  articles: ArticlesListProps;
}

const CATEGORY = 'content type' as const;
const TOPIC = 'product' as const;
const MAX_VISIBLE_ITEMS = 20;

const buildPathName = ({ topic }: { topic?: string | string[] }) => {
  const topicPath = topic ? `/topic/${topic}` : '';

  return `${routes.resources.root}${topicPath}`;
};

const ControlledArticlesListSectionProps = ({
  topicFilter,
  categoryFilter,
  heading,
  copy,
  topicValue,
  categoryValue,
  setCategoryValue,
  articles,
  ...props
}: ControlledArticlesListSectionProps) => {
  const router = useRouter();
  const { data, run, status } = useAsync<any>();
  const [isFilterOpen, setIsFilterOpen] = useState({ [CATEGORY]: false, [TOPIC]: false });
  const pageValue = router?.query.page?.toString();

  const articlesValue = categoryValue && data ? data : articles;

  const filters = [
    {
      name: TOPIC,
      items: topicFilter,
      value: topicValue,
      showChildren:
        // if the topic is selected but hidden, show it
        topicFilter.findIndex((topic) => topic.filterSlug === topicValue) >= MAX_VISIBLE_ITEMS,
      selectProps: {
        resetLink: buildPathName({}),
      },
    },
    {
      name: CATEGORY,
      items: categoryFilter,
      value: categoryValue,
      selectProps: {
        resetLink: buildPathName({
          topic: topicValue,
        }),
      },
    },
  ];

  const appendPage = addPageToCopy(articles.pagination.pageCounter.currentPage);

  const updateCategory = (value: string | undefined) => {
    setCategoryValue(categoryValue === value ? undefined : value);
  };

  const getItemProps = (
    item: ArticleClassification,
    filter: { name: string; items: ArticleClassification[]; value?: string }
  ) => {
    const value = item.filterSlug;
    const isChecked = value === filter.value;

    // page doesn't go into the filter href because it belongs to the pagination
    const href = buildPathName({ topic: isChecked ? undefined : value });

    return { ...item, href, value, isChecked: isChecked ? 'checked' : 'unchecked' };
  };

  const toggleFilter = (filterName: typeof TOPIC | typeof CATEGORY) => (isOpen: boolean) => {
    if (!isOpen) {
      // hack to prevent the click event from clicking the element below the select
      // this delays the button to close, so the option can be selected then it closes
      setTimeout(() => {
        setIsFilterOpen({ ...isFilterOpen, [filterName]: isOpen });
      }, 10);
      return;
    }
    setIsFilterOpen({ ...isFilterOpen, [filterName]: isOpen });
  };

  useEffect(() => {
    if (router.isReady && categoryValue) {
      const query = {
        topic: topicValue,
        category: categoryValue,
        page: pageValue,
      };

      run(
        getArticles(query).then((res) => {
          return {
            ...res,
            pagination: generateResourcesPagination({
              totalArticles: res.items.length,
              currentPage: res.pagination.currentPage,
              topic: query.topic,
              category: query.category,
            }),
          };
        })
      );
    }
  }, [pageValue, router.isReady, run, topicValue, categoryValue]);

  return (
    <Section {...props}>
      <css.Container id='articles'>
        {heading && (
          <css.TextWrapper xs={4} small={6}>
            {heading && <Heading level={2}>{appendPage(heading, { format: 'parenteses' })}</Heading>}
            {copy && <Paragraph lead>{copy}</Paragraph>}
          </css.TextWrapper>
        )}
        <css.FiltersContainer>
          <css.FiltersWrapper>
            {filters.map((filter, index) => {
              return (
                <div key={index}>
                  <css.FilterLabel>Filter by {filter.name}:</css.FilterLabel>
                  <css.AboveMedium>
                    <css.FilterItemsWrapper>
                      <VisibleChildren.Limiter
                        showItemsButtonText='View all'
                        maxVisibleItems={MAX_VISIBLE_ITEMS}
                        showChildren={filter?.showChildren}
                      >
                        {filter.items.map((item, index) => {
                          const { name, id, href, isChecked, value } = getItemProps(item, filter);
                          return (
                            <VisibleChildren.Animate key={id} animateOnVisible={index > MAX_VISIBLE_ITEMS}>
                              {filter.name === CATEGORY ? (
                                <Chip
                                  htmlAs='button'
                                  onClick={() => {
                                    updateCategory(value);
                                  }}
                                  data-state={isChecked}
                                >
                                  {name}
                                </Chip>
                              ) : (
                                <Link href={href} scroll={false}>
                                  <Chip data-state={isChecked}>{name}</Chip>
                                </Link>
                              )}
                            </VisibleChildren.Animate>
                          );
                        })}
                      </VisibleChildren.Limiter>
                    </css.FilterItemsWrapper>
                  </css.AboveMedium>
                  <css.BelowMedium>
                    {filter.name === CATEGORY ? (
                      <Select
                        triggerLabel={`Filter by ${filter.name}`}
                        placeholder={`Select an option`}
                        items={filter.items.map((item) => getItemProps(item, filter))}
                        value={filter.value}
                        open={isFilterOpen[filter.name]}
                        onOpenChange={toggleFilter(filter.name)}
                        onValueChange={(value) => updateCategory(value)}
                        {...filter.selectProps}
                      />
                    ) : (
                      <Select
                        triggerLabel={`Filter by ${filter.name}`}
                        placeholder={`Select an option`}
                        items={filter.items.map((item) => getItemProps(item, filter))}
                        value={filter.value}
                        useRouterPush
                        open={isFilterOpen[filter.name]}
                        onOpenChange={toggleFilter(filter.name)}
                        {...filter.selectProps}
                      />
                    )}
                  </css.BelowMedium>
                </div>
              );
            })}
          </css.FiltersWrapper>
        </css.FiltersContainer>

        {status === 'pending' ? <Loading /> : <ArticlesList {...articlesValue} />}
      </css.Container>
    </Section>
  );
};

export default ControlledArticlesListSectionProps;
