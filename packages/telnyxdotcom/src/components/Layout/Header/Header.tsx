import * as Header from 'ui/components/HeaderNew';
import { useState, type HTMLAttributeAnchorTarget, type HTMLAttributeReferrerPolicy } from 'react';
import { getHeaderItems } from './utils/getHeaderItems';
import { HeaderProductsNavigation } from './components/HeaderProductsNavigation';
import { HeaderSolutionsNavigation } from './components/HeaderSolutionsNavigation';
import { HeaderPricingNavigation } from './components/HeaderPricingNavigation';
import { HeaderWhyTelnyxNavigation } from './components/HeaderWhyTelnyxNavigation';
import { HeaderResourcesNavigation } from './components/HeaderResourcesNavigation';
import { HeaderDevelopersNavigation } from './components/HeaderDevelopersNavigation';
import { MAIN_MENU_ID } from 'ui/components/HeaderNew/components/HeaderNavigationMenu';
import { useLockScroll } from 'ui/utils/hooks/useLockScroll';
import MenuIcon from 'ui/components/Icons/Menu';
import * as AccessibleIcon from '@radix-ui/react-accessible-icon';
import { BANNER_LINKS, MobileBannerLink } from './components/BannerLinks';
import { CrawlableNavigationLinks } from './components/CrawlableNavigationLinks';
import * as css from './Header.styled';

export type HeaderNavigationText = {
  id: string;
  label: string;
  seeMoreLink?: HeaderNavigationItemLink;
  description?: string;
  isNew?: boolean;
  ctaBanner?: Header.HeaderNavigationMenuCTABannerProps;
};

export type HeaderNavigationItemLink = HeaderNavigationText & {
  href: string;
  rel?: string;
  target?: HTMLAttributeAnchorTarget;
  referrerPolicy?: HTMLAttributeReferrerPolicy;
};

export type HeaderNavigationItemGroup = HeaderNavigationText & {
  items: HeaderNavigationItem[];
};

export type HeaderNavigationItem = HeaderNavigationText | HeaderNavigationItemLink | HeaderNavigationItemGroup;

export interface HeaderProps {
  simpleHeaderFooter: boolean;
  navigation: HeaderNavigationItem[];
}

export default function HeaderComponent({ simpleHeaderFooter, navigation }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerItems = getHeaderItems(navigation);

  useLockScroll({ lock: isMenuOpen });

  return (
    <Header.Root bannerLinks={simpleHeaderFooter ? [] : BANNER_LINKS}>
      {!simpleHeaderFooter && (
        <>
          <css.HeaderContainer>
            <css.MobileHeaderButtonsWrapper>
              <css.MobileHeaderSignUpButton>
                <Header.Button href='/sign-up'>Sign up</Header.Button>
              </css.MobileHeaderSignUpButton>
              <css.MenuButtonOpen
                aria-expanded={isMenuOpen}
                aria-controls='main-menu-content'
                onClick={() => setIsMenuOpen(true)}
              >
                <AccessibleIcon.Root label='Open main menu'>
                  <MenuIcon />
                </AccessibleIcon.Root>
              </css.MenuButtonOpen>
            </css.MobileHeaderButtonsWrapper>
            <css.Content id={MAIN_MENU_ID} data-state={isMenuOpen ? 'open' : 'close'}>
              <css.MenuButtonClose onClick={() => setIsMenuOpen(false)} aria-controls='main-menu-content'>
                <AccessibleIcon.Root label='Close main menu'>
                  <MenuIcon open />
                </AccessibleIcon.Root>
              </css.MenuButtonClose>

              <css.NavigationContent id='main-menu-content'>
                {headerItems.production && (
                  <HeaderProductsNavigation {...(headerItems.production as HeaderNavigationItemGroup)} />
                )}
                {headerItems.solutions && (
                  <HeaderSolutionsNavigation {...(headerItems.solutions as HeaderNavigationItemGroup)} />
                )}
                {headerItems.pricing && (
                  <HeaderPricingNavigation {...(headerItems.pricing as HeaderNavigationItemLink)} />
                )}
                {headerItems.whyTelnyx && (
                  <HeaderWhyTelnyxNavigation {...(headerItems.whyTelnyx as HeaderNavigationItemGroup)} />
                )}
                {headerItems.resources && (
                  <HeaderResourcesNavigation {...(headerItems.resources as HeaderNavigationItemGroup)} />
                )}
                {headerItems.developers && (
                  <HeaderDevelopersNavigation {...(headerItems.developers as HeaderNavigationItemGroup)} />
                )}
              </css.NavigationContent>
              {BANNER_LINKS.map((link) => (
                <MobileBannerLink key={link.href} href={link.href} target={link.target} rel={link.rel}>
                  {link.copy}
                </MobileBannerLink>
              ))}
              <Header.Button href='/sign-up' growOnMobile>
                Sign up
              </Header.Button>
            </css.Content>
          </css.HeaderContainer>
          <CrawlableNavigationLinks navigation={navigation} />
        </>
      )}
    </Header.Root>
  );
}
