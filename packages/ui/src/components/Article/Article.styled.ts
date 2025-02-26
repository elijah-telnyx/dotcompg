import { styled } from '../../styles';
import H from '../Typography/Heading';
import Grid from '../Grid';
import MediaComponent from '../Media';
import { Name as AuthorName } from '../Author/Author.styled';

export const Container = styled(Grid.Container, {
  rowGap: '$medium',

  '@medium': {
    rowGap: '$large',
  },
});

export const BreadcrumbItem = styled(Grid.Item, {
  marginBottom: '$xl',

  '@medium': {
    marginBottom: '$xxl',
  },
});

export const TagItem = styled(Grid.Item, {
  marginBottom: '$xs',
});

export const AuthorWrapper = styled('div', {
  [`& ${AuthorName}`]: {
    textDecoration: 'underline',
  },
});

export const MediaItem = styled(Grid.Item, {
  marginTop: '$xl',

  '@medium': {
    marginTop: '$xxl',
  },
});

export const HeroMediaWrapper = styled('div', {
  alignItems: 'center',
  aspectRatio: '16/9',
  display: 'flex',
  height: '100%',
  width: '100%',
  position: 'relative',
});

export const Media = styled(MediaComponent, {
  borderRadius: '$medium',
  '@medium': {
    borderRadius: '$large',
  },
});

export const SocialShareWrapper = styled(Grid.Item, {
  marginTop: '$xl',

  '@medium': {
    marginTop: '$xxl',
  },
});

export const FormWrapper = styled(Grid.Item, {
  '@medium': {
    position: 'sticky',
    marginTop: '$xxl',
    top: '116px',
  },
});

export const FormHeading = styled(H, {
  marginBottom: '$xs',
  '@medium': {
    marginBottom: '$medium',
  },
});
