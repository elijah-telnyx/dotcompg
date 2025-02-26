import Section, { type SectionProps } from '../Section';
import Grid from '../Grid';
import { Card } from '../Cards/Cards';
import * as css from './GridList.styled';
import Select, { type SelectProps } from '../Select';
import Pagination, {
  type PaginationPageCounterProps,
  type PaginationButtonProps,
} from '../Pagination';
import type { CTAButtonProps } from '../CtaButton';
import { formatDate } from '../../utils/formatDate';
import Link from 'next/link';
import type { BackgroundColor } from '../../styles/constants/backgroundColorOptions';
import ReleaseNotesForm from './ReleaseNotesForm';
import { type SendGridSubscribeResponse } from './ReleaseNotesForm';

export interface GridListItemProps {
  title: string;
  copy: string;
  link: CTAButtonProps;
  publishDate?: string;
  slug: string;
  text: string;
  content: string;
  backgroundColor?: BackgroundColor;
}

export interface GridListProps extends SectionProps {
  items: GridListItemProps[];
  pagination?: {
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
  filter?: SelectProps;
  resetLinkFilter?: string;
  submitFormFn?: (email: string) => Promise<SendGridSubscribeResponse>;
}

const GridList = ({ items, pagination, filter, ...props }: GridListProps) => {
  const { submitFormFn } = props;
  return (
    <Section {...props}>
      <css.Container>
        <Grid.Item xs={12} medium={8}>
          <ul>
            {items.map((item) => {
              return (
                <css.CardWrapper key={item.slug}>
                  <Card
                    tagline={formatDate(item?.publishDate || '')}
                    copy={item.copy}
                    heading={item.title}
                    link={item.link}
                  />
                  <css.CardDivider />
                </css.CardWrapper>
              );
            })}
          </ul>
        </Grid.Item>
        <css.FilterItem xs={12} medium={4}>
          {filter && (
            <css.FilterSelect>
              <Select
                {...filter}
                useRouterPush
                onValueChange={filter.onValueChange}
              />
            </css.FilterSelect>
          )}
          {submitFormFn && <ReleaseNotesForm onSubmit={submitFormFn} />}
          <css.StyledLink href={'/rss.xml'}>Subscribe to RSS</css.StyledLink>
          <css.StyledLink href='https://portal.productboard.com/telnyx/1-telnyx-product-portal/tabs/3-launched'>
            Feature Request
          </css.StyledLink>
          <css.StyledLink href='https://twitter.com/telnyx'>
            Follow us on Twitter
          </css.StyledLink>
        </css.FilterItem>
        {pagination && (
          <css.PaginationItem
            css={{
              justifySelf: 'center',
            }}
          >
            <Pagination.Root>
              <Pagination.PreviousButton
                htmlAs={Link}
                disabled={Number(pagination.pageCounter.currentPage) === 1}
                {...pagination.previous}
              />
              <Pagination.PageCounter {...pagination.pageCounter} />
              <Pagination.NextButton
                htmlAs={Link}
                disabled={
                  Number(pagination.pageCounter.currentPage) ===
                  Number(pagination.pageCounter.totalPages)
                }
                {...pagination.next}
              />
            </Pagination.Root>
          </css.PaginationItem>
        )}
      </css.Container>
    </Section>
  );
};

export default GridList;
