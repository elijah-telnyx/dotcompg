import Link from 'next/link';
import Section, { type SectionProps } from '../Section';
import Grid from '../Grid';
import * as css from './ArticlesListSection.styled';
import Pagination, {
  type PaginationPageCounterProps,
  type PaginationButtonProps,
} from '../Pagination';
import CarouselCard, { type CarouselCardProps } from '../CarouselCard';
import Paragraph from '../Typography/Paragraph';

export interface ArticlesListProps {
  items: (Omit<CarouselCardProps, 'media'> & { id: string })[];
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
    htmlAs?: keyof JSX.IntrinsicElements;
  };
  enableScroll?: boolean;
}

export const ArticlesList = ({
  pagination,
  items,
  enableScroll = false,
}: ArticlesListProps) => {
  const isEmpty = !Array.isArray(items) || items.length === 0;
  const isFirstPage = Number(pagination.pageCounter.currentPage) === 1;
  const isLastPage =
    Number(pagination.pageCounter.currentPage) ===
    Number(pagination.pageCounter.totalPages);

  return (
    <>
      <Grid.FullWidthItem>
        {isEmpty ? (
          <Paragraph>No results for this filter</Paragraph>
        ) : (
          <css.CardsContainer as='ul'>
            {items.map(({ id, ...props }) => (
              <css.CardWrapper key={id} htmlAs='li' xs={8} small={4}>
                <CarouselCard {...props} />
              </css.CardWrapper>
            ))}
          </css.CardsContainer>
        )}
      </Grid.FullWidthItem>
      {pagination && pagination.pageCounter.totalPages > 1 && (
        <css.PaginationItem>
          <Pagination.Root>
            <Pagination.PreviousButton
              htmlAs={isFirstPage ? undefined : pagination.htmlAs || Link}
              scroll={enableScroll}
              disabled={isFirstPage}
              href={isFirstPage ? undefined : pagination.previous.href}
            />
            <Pagination.PageCounter {...pagination.pageCounter} />
            <Pagination.NextButton
              htmlAs={isLastPage ? undefined : pagination.htmlAs || Link}
              scroll={enableScroll}
              disabled={isLastPage}
              href={isLastPage ? undefined : pagination.next.href}
            />
          </Pagination.Root>
        </css.PaginationItem>
      )}
    </>
  );
};

export interface ArticlesListSectionProps
  extends SectionProps,
    ArticlesListProps {}

const ArticlesListSection = ({
  items,
  pagination,
  enableScroll,
  ...props
}: ArticlesListSectionProps) => {
  return (
    <Section {...props}>
      <css.Container>
        <ArticlesList
          items={items}
          pagination={pagination}
          enableScroll={enableScroll}
        />
      </css.Container>
    </Section>
  );
};

export default ArticlesListSection;
