import Section, { type SectionProps } from '../Section';
import Grid from '../Grid';
import Heading from '../Typography/Heading';
import Link from '../Link';
import { Container } from './BlogSearchHeader.styled';
import { BackArrow } from '../Icons';

export interface BlogSearchHeaderProps extends SectionProps {
  backToHref: string;
  searchTerm: string;
  page?: string;
}

const BlogSearchHeader = ({
  backToHref,
  searchTerm,
  page,
  ...props
}: BlogSearchHeaderProps) => {
  return (
    <Section {...props} htmlAs='header'>
      <Container>
        <Grid.FullWidthItem>
          <Link
            href={backToHref}
            kind='cta'
            direction='rtl'
            Icon={<BackArrow height={20} width={20} />}
          >
            Back to blog
          </Link>
        </Grid.FullWidthItem>
        <Grid.FullWidthItem>
          <Heading level={3} category htmlAs='h2'>
            {`Search results for “${searchTerm}” ${
              page && page !== '1' ? ` - page ${page}` : ''
            }`}
          </Heading>
        </Grid.FullWidthItem>
      </Container>
    </Section>
  );
};

export default BlogSearchHeader;
