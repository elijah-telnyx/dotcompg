import { styled } from 'ui/styles';
import Heading from 'ui/components/Typography/Heading';
import Section from 'ui/components/Section';
import T from 'ui/components/Table';
import Grid from 'ui/components/Grid';
import { default as L } from 'ui/components/Typography/List';
import { default as LI } from 'ui/components/Typography/ListItem';
import CompareProgress from 'ui/components/Progress/CompareProgress';

export const SectionWrapper = styled(Section);

export const Container = styled(Grid.Container);

export const Row = styled(Grid.Item, {
  marginBottom: '$xxl',
});

export const Table = styled(T.Root, {
  marginBottom: '$xxl',
});

export const Alt = styled('div', {
  background: '$black',
  color: '$cream',
  borderRadius: '$medium',
  padding: '$large',
});

export const Units = styled('span', {
  display: 'block',
  fontSize: '$xs',
});

export const Header = styled(Heading, {
  marginBottom: '$large',
});

export const HeaderAlt = styled(Header, {
  '@medium': {
    fontSize: '$xl',
  },
});

export const TwitterWrapper = styled('div', {
  display: 'grid',
  gridTemplateColumns: '24px 1fr',
  gap: '$medium',
  marginBottom: '$large',
});

export const ListItem = styled(LI, { marginBottom: '$large' });
export const List = styled(L, { listStyleType: 'none', padding: 0 });

export const CompareProgressWrapper = styled('div', {
  display: 'flex',
  gap: '$medium',
  flexDirection: 'column',
});

export const CompareProgressRow = styled(CompareProgress, {
  label: {
    display: 'block',
  },
});
export const FaqQuestion = styled('h3', {
  paddingTop: '$medium',
  paddingBottom: '$xxs',
  borderTop: '2px solid $black',
});
export const FaqAnswer = styled('p', { fontSize: '$medium', marginBottom: '$large' });
