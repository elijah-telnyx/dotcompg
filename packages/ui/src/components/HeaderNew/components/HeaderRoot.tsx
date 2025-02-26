import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import NextLink from 'next/link';
import type { AnchorHTMLAttributes, PropsWithChildren } from 'react';
import { styled, theme } from '../../../styles';
import { TelnyxLogoWithText } from '../../Icons';

const Header = styled('header', {
  $$inlinePadding: theme.space.large.value,
  backgroundColor: '$black',
  paddingBlock: '$small',
  color: '$cream',
  paddingInline: '$$inlinePadding',
  '@headerDesktop': {
    $$inlinePadding: '40px',
  },
});

const HeaderContent = styled('div', {
  display: 'flex',
  alignItems: 'center',
});

const Banner = styled('div', {
  display: 'none',

  '@headerDesktop': {
    display: 'flex',
    gap: '$medium',
    justifyContent: 'flex-end',
    height: 22,
  },
});

const BannerLink = styled('div', {
  display: 'inline-block',
  fontFamily: '$formula',
  fontWeight: '$extrabold',
  fontSize: '$xxs',
  textTransform: 'uppercase',
});

export interface HeaderRootProps {
  bannerLinks?: (Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> & {
    copy: string;
    href: string;
  })[];
}

export function HeaderRoot({
  children,
  bannerLinks,
}: PropsWithChildren<HeaderRootProps>) {
  return (
    <Header>
      <Banner>
        {bannerLinks?.map(({ copy, href, ...linkProps }) => {
          const isExternal = href?.startsWith('http');
          return (
            <BannerLink
              as={isExternal ? 'a' : NextLink}
              {...linkProps}
              key={href}
              href={href}
            >
              {copy}
            </BannerLink>
          );
        })}
      </Banner>
      <HeaderContent>
        <NextLink href='/'>
          <TelnyxLogoWithText
            width={144}
            aria-hidden='true'
            color={theme.colors.cream.value}
          />
          <VisuallyHidden.Root>Home</VisuallyHidden.Root>
        </NextLink>
        {children}
      </HeaderContent>
    </Header>
  );
}
