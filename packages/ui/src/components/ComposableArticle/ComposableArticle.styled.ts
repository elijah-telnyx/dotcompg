import { styled } from '../../styles';
import H from '../Typography/Heading';
import Grid from '../Grid';
import GridExtended from '../GridExtended';
import MediaComponent from '../Media';

export const Container = styled(Grid.Container, {
  rowGap: '$medium',

  '@medium': {
    marginTop: '$xxl',
    rowGap: '$large',
  },
});

export const ContainerExtended = styled(GridExtended.Container, {
  rowGap: '$medium',

  '@medium': {
    marginTop: '$xxl',
    rowGap: '$large',
  },
});

export const ContentItem = styled(Grid.Item, {
  display: 'flex !important',
  flexDirection: 'column',
  order: 1,
  gap: '$xxl',
  '@medium': {
    gap: '$xxxl',
    order: 2,
  },

  // for every first `p` or first `h2`, ignore the margin top as the top section already has margin that needs to be the same for the two column content
  '& div:first-child p:first-child, & div:first-child h2:first-child': {
    marginTop: 0,
  },
  // for use cases where the first p is over the middle of the content
  '& p:first-of-type': {
    marginTop: 0,
  },

  variants: {
    extendedLayout: {
      true: {
        '@small': {
          gridColumn: 'span 8',
        },
        '@medium': {
          gridColumn: '6 / 13 !important',
        },
      },
    },
  },
});

export const SidebarItem = styled(Grid.Item, {
  marginTop: '$large',
  order: 2,

  '@medium': {
    marginTop: 0,
    order: 1,
  },
});

export const AuthorCardWrapper = styled('div', {
  '@medium': {
    marginTop: '$xl',
  },
});

export const SocialShareWrapper = styled('div', {
  '@medium': {
    marginTop: '$xl',
  },
});

export const SidebarWrapper = styled('div', {
  '@medium': {
    paddingTop: '$xs', // account for Content line height spacing
    position: 'sticky',
    top: 'calc(48px + var(--headerPaddingY))',
    transition: 'top 0.5s ease-in-out',
  },
});

export const SidebarLinksWrapper = styled('div', {
  '@medium': {
    marginBottom: '$xxl',
  },
});

export const FormHeading = styled(H, {
  marginBottom: '$xs',
  '@medium': {
    marginBottom: '$medium',
  },
});

export const Media = styled(MediaComponent, {
  borderRadius: '$medium',
  '@medium': {
    borderRadius: '$large',
  },
});
