import Router from 'next/router';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import type { PropsWithChildren } from 'react';
import { styled } from '../../../styles';
import ArrowRight from '../../Icons/ArrowRight';
import { External } from '../../Icons';
import Media, { type MediaProps } from '../../Media';

export interface HeaderNavigationMenuItemProps {
  href: string;
  label: string;
  isNew?: boolean;
  iconVisible?: boolean;
  description?: string;
  media?: MediaProps<'media'>;
}

export function HeaderNavigationMenuItem({
  href,
  label,
  description,
  isNew,
  iconVisible,
  media,
  ...props
}: PropsWithChildren<HeaderNavigationMenuItemProps>) {
  const isInternalHref = href.startsWith('/');

  /**
   * This is to handle keyboard select, as with mouse/touch it will trigger the link directly
   */
  const handleSelect = (event: Event) => {
    const href = (event?.target as HTMLDivElement)?.getAttribute('data-href');
    if (!href) return;

    if (isInternalHref) {
      Router.push(href);
    } else {
      window.open(href, '_blank');
    }
  };

  return (
    <DropdownMenuItem
      onSelect={handleSelect}
      data-href={href}
      /**
       * Prevents the default behavior of the pointer events on the Radix DropdownMenu.Item, this is to fix the mobile layout auto-scrolling when the user hovers over the item.
       *
       * @ref https://github.com/radix-ui/primitives/issues/2193#issuecomment-1784039196
       */
      onPointerLeave={(event) => event.preventDefault()}
      onPointerMove={(event) => event.preventDefault()}
    >
      <Link href={href} {...props} withMedia={Boolean(media)}>
        <LabelWrapper>
          <Label>{label}</Label>
          {isNew && <Pill>New</Pill>}
          {isInternalHref ? (
            <LinkIcon visible={iconVisible} />
          ) : (
            <LinkIcon as={External} visible />
          )}
        </LabelWrapper>
        <Description>{description}</Description>
        {media && (
          <MediaContainer>
            <Media {...media} cover fill />
          </MediaContainer>
        )}
      </Link>
    </DropdownMenuItem>
  );
}

const LabelWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$xs',
  flexGrow: 1,
});

const Label = styled('p', {
  translate: '0px 2px', //font bottom spacing
  fontFamily: '$formula',
  fontWeight: '$extrabold',
  fontSize: '$small',
  lineHeight: '$xs',
  letterSpacing: '0.6px', // per DOTCOM-3754, Update character spacing to 2% so consistent
});

const Description = styled('p', {
  flexGrow: 1,
  fontFamily: '$inter',
  fontWeight: '$regular',
  fontSize: '$xs',
  lineHeight: '$xs',
  color: '$grayHoverDarkBackground',
  marginTop: '$xxs',
  transition: 'all 0.2s linear',
  display: 'none',
  '@headerDesktop': {
    display: 'block',
  },
});

export const Pill = styled('span', {
  padding: '$xxs',
  paddingBottom: '$xxxs',
  borderRadius: '$xxxl',
  backgroundColor: '$green',
  color: '$black',
  typography: '$h2.category.mobile',
  fontSize: 10, // Per DOTCOM-3818, Update font size to 10px
  maxWidth: 'max-content',
});

const LinkIcon = styled(ArrowRight, {
  transform: 'translateX(-4px)',
  opacity: 0,
  transition: 'opacity 0.2s linear, transform 0.3s ease-out',
  variants: {
    visible: {
      true: {
        opacity: 1,
      },
    },
  },
});

const Link = styled('a', {
  variants: {
    withMedia: {
      true: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      },
    },
  },
});

const MediaContainer = styled('div', {
  '@headerMobileOnly': {
    display: 'none',
  },
  marginTop: '$medium',
  alignSelf: 'bottom',
  boxShadow: '0px 4px 40px 0px #00000040 inset',

  position: 'relative',
  width: '100%',
  aspectRatio: '16 / 8',
  borderRadius: '$medium',
  '& img, & video, & > div': {
    borderRadius: '$medium',
  },
});

const DropdownMenuItem = styled(DropdownMenu.Item, {
  height: '100%',
  [`&:hover, &:focus`]: {
    outline: 'none',
    [`& ${LinkIcon}`]: {
      opacity: 1,
      transform: 'translateX(0px)',
    },
    [`& ${Description}`]: {
      color: '$cream',
      textDecoration: 'underline',
    },
  },
});
