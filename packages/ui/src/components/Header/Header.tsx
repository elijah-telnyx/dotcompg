import * as AccessibleIcon from '@radix-ui/react-accessible-icon';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import type { Optional } from '../../utils/types';
import Button from '../Button';
import TelnyxLogoWithText from '../Icons/TelnyxLogoWithText';
import * as css from './Header.styled';
import HeaderDropdown from './HeaderDropdown';
import {
  useState,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
} from 'react';
import MenuIcon from '../../components/Icons/Menu';
import ExternalIcon from '../../components/Icons/External';
import Grid from '../../components/Grid';
import { lockScroll } from '../../utils/lockScroll';
import { AnchorElement } from '../Link';
import useMedia from '../../utils/hooks/useMedia';
import { config } from '../../styles';

export interface HeaderLinkProps
  extends Pick<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    'rel' | 'target' | 'referrerPolicy'
  > {
  href: string;
  /**
   * The content of the button that will open the dropdown
   */
  label: string;
  id: string;
}

export interface NavigationItem extends Optional<HeaderLinkProps, 'href'> {
  /**
   * The content of the dropdown
   */
  items?: HeaderLinkProps[];
  /**
   * The see more link of the end of dropdown list
   */
  seeMoreLink?: HeaderLinkProps;
}
export interface HeaderProps {
  navigation: NavigationItem[];
  simpleHeaderFooter?: boolean;
}

interface HamburgerMenuProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Defines the state of the button
   */
  isActive: boolean;
  /**
   * What will appear inside the container
   */
  children: React.ReactNode;
}

export const Menu = ({
  isActive,
  children,
  ...buttonProps
}: HamburgerMenuProps) => (
  <>
    <css.MenuButton aria-expanded={isActive} {...buttonProps}>
      <AccessibleIcon.Root label='Main menu'>
        <MenuIcon />
      </AccessibleIcon.Root>
    </css.MenuButton>
    <css.MenuNavigationContainer>{children}</css.MenuNavigationContainer>
  </>
);

const Navigation = ({
  navigation,
  ...props
}: HeaderProps & HTMLAttributes<HTMLDivElement>) => {
  return (
    <css.Navigation {...props}>
      {navigation.map(({ label, href, id, items, seeMoreLink }) => {
        if (href) {
          return (
            <css.MainItem
              kind='cta'
              underlineColor='cream'
              key={id}
              href={href}
            >
              {label}
            </css.MainItem>
          );
        }
        if (items?.length) {
          return (
            <HeaderDropdown
              items={items}
              label={label}
              key={id}
              seeMoreLink={seeMoreLink}
            />
          );
        }
        return null;
      })}
    </css.Navigation>
  );
};

const Header = ({ navigation, simpleHeaderFooter }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMedium = useMedia(config.media.large, false);

  const toggleMenu = () => {
    const newIsMenuOpen = !isMenuOpen;
    lockScroll(newIsMenuOpen);
    setIsMenuOpen(newIsMenuOpen);
  };

  if (simpleHeaderFooter) {
    return (
      <css.Wrapper>
        <css.LogoOnlyHeader>
          <Grid.Item xs={2}>
            <css.LogoLink href='/'>
              <TelnyxLogoWithText width={144} aria-hidden='true' />
              <VisuallyHidden.Root>Home</VisuallyHidden.Root>
            </css.LogoLink>
          </Grid.Item>
        </css.LogoOnlyHeader>
      </css.Wrapper>
    );
  }

  return (
    <css.Wrapper>
      <css.Header>
        {isMedium && (
          <Grid.Item
            xs={0}
            small={0}
            medium={0}
            large={12}
            xl={12}
            css={{
              display: 'none',
              '@medium': {
                display: 'grid',
              },
            }}
          >
            <css.HeaderBanner>
              <css.BannerLink
                href='https://seti.telnyx.com'
                target='_blank'
                rel='noopener'
              >
                SETI
              </css.BannerLink>
              <css.BannerLink
                href='https://shop.telnyx.com'
                target='_blank'
                rel='noopener noreferrer'
              >
                Shop
              </css.BannerLink>
              <css.BannerLink href='/contact-us'>Contact us</css.BannerLink>
              <css.BannerLink
                href='https://portal.telnyx.com/'
                target='_blank'
                rel='noopener noreferrer'
              >
                Log in <ExternalIcon />
              </css.BannerLink>
            </css.HeaderBanner>
          </Grid.Item>
        )}

        <Grid.Item xs={2}>
          <css.LogoLink href='/'>
            <TelnyxLogoWithText width={144} aria-hidden='true' />
            <VisuallyHidden.Root>Home</VisuallyHidden.Root>
          </css.LogoLink>
        </Grid.Item>

        {isMedium && (
          <>
            <css.NavigationWrapper xs={0} small={0} medium={0} large={8} xl={8}>
              <Navigation navigation={navigation} />
            </css.NavigationWrapper>
            <css.ButtonWrapper xs={1} small={2} large={1}>
              <Button
                htmlAs={AnchorElement}
                variant='header'
                kind='primary'
                background='dark'
                href='/sign-up'
                id='header-sign-up'
              >
                Sign Up
              </Button>
            </css.ButtonWrapper>
          </>
        )}

        {!isMedium && (
          <css.ButtonWrapper xs={1} small={2} large={1}>
            <Button
              htmlAs={AnchorElement}
              variant='header'
              kind='primary'
              background='dark'
              href='/sign-up'
              id='header-sign-up'
            >
              Sign Up
            </Button>

            <css.HiddenOnLarge>
              <Menu
                isActive={isMenuOpen}
                onClick={toggleMenu}
                aria-controls='navigation'
              >
                <css.MobileNavigationWrapper>
                  <Grid.Item xs={4} small={8} medium={12} large={12}>
                    <Navigation navigation={navigation} id='navigation' />
                  </Grid.Item>
                  <Grid.Item xs={4} small={8} medium={12}>
                    <css.HeaderBanner>
                      <css.BannerLink
                        href='https://seti.telnyx.com'
                        target='_blank'
                        rel='noopener'
                      >
                        SETI
                      </css.BannerLink>
                      <css.BannerLink
                        href='https://shop.telnyx.com'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        Shop
                      </css.BannerLink>
                      <css.BannerLink href='/contact-us'>
                        Contact us
                      </css.BannerLink>
                      <css.BannerLink
                        href='https://portal.telnyx.com/'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        Log in <ExternalIcon />
                      </css.BannerLink>
                    </css.HeaderBanner>
                    <Button
                      htmlAs={AnchorElement}
                      variant='header'
                      kind='primary'
                      background='dark'
                      href='/sign-up'
                      id='mobile-navigation-sign-up'
                    >
                      Sign Up
                    </Button>
                  </Grid.Item>
                </css.MobileNavigationWrapper>
              </Menu>
            </css.HiddenOnLarge>
          </css.ButtonWrapper>
        )}
      </css.Header>
    </css.Wrapper>
  );
};

export default Header;
