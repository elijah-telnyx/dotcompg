import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import LinkedInIcon from '../Icons/LinkedIn';
import TwitterIcon from '../Icons/Twitter';
import FacebookIcon from '../Icons/Facebook';
import * as css from './Footer.styled';
import { type SectionProps } from '../Section';
import Grid from '../GridExtended';

interface Link {
  label: string;
  href?: string;
}

interface NavigationItem {
  label: string;
  items: Link[];
}

export interface FooterProps extends SectionProps {
  navigation: NavigationItem[];
  simpleHeaderfooter?: boolean;
}

const HomeNavigationLink = () => (
  <css.NavigationLink href='/'>
    <css.Logo aria-hidden='true' />
    <VisuallyHidden.Root>Home</VisuallyHidden.Root>
  </css.NavigationLink>
);

const SocialNavigationLinks = () => {
  return (
    <css.NavigationList>
      <css.NavigationLabel>Social</css.NavigationLabel>
      <css.SocialNavigationList>
        <li>
          <css.SocialIconLink
            rel='noopener noreferrer'
            target='_blank'
            href='https://www.linkedin.com/company/telnyx/'
          >
            <LinkedInIcon title='LinkedIn' />
          </css.SocialIconLink>
        </li>
        <li>
          <css.SocialIconLink
            rel='noopener noreferrer'
            target='_blank'
            href='https://twitter.com/telnyx'
          >
            <TwitterIcon title='Twitter' />
          </css.SocialIconLink>
        </li>
        <li>
          <css.SocialIconLink
            rel='noopener noreferrer'
            target='_blank'
            href='https://www.facebook.com/Telnyx/'
          >
            <FacebookIcon title='Facebook' />
          </css.SocialIconLink>
        </li>
      </css.SocialNavigationList>
    </css.NavigationList>
  );
};

const Footer = ({ navigation, simpleHeaderfooter, ...props }: FooterProps) => {
  if (simpleHeaderfooter) {
    return (
      <css.Footer htmlAs='footer' {...props}>
        <Grid.Container css={{ alignItems: 'end' }}>
          <Grid.Item xs={2} small={4} medium={6}>
            <css.CopyrightText>
              © Telnyx LLC {new Date().getFullYear()}
            </css.CopyrightText>
          </Grid.Item>

          <Grid.Item xs={2} small={4} medium={6} css={{ justifySelf: 'end' }}>
            <SocialNavigationLinks />
          </Grid.Item>
        </Grid.Container>
      </css.Footer>
    );
  }
  return (
    <css.Footer htmlAs='footer' {...props}>
      <Grid.Container css={{ rowGap: '$xxl' }}>
        <Grid.Item htmlAs={css.VisibleOnLarge} xs={0} large={2}>
          <HomeNavigationLink />
        </Grid.Item>

        <Grid.Item htmlAs={css.VisibleOnLarge} xs={0} large={2} />

        <Grid.Item xs={4} small={2} medium={3} large={2}>
          <SocialNavigationLinks />
        </Grid.Item>

        {navigation.map(({ label, items }) => (
          <Grid.Item key={label} xs={4} small={2} medium={3} large={2}>
            <css.NavigationList>
              {label && <css.NavigationLabel>{label}</css.NavigationLabel>}
              {items
                .filter(({ href }) => href)
                .map(({ href, label }) => (
                  <li key={label}>
                    <css.NavigationLink href={href}>{label}</css.NavigationLink>
                  </li>
                ))}
            </css.NavigationList>
          </Grid.Item>
        ))}

        <Grid.Item
          xs={1}
          small={2}
          medium={2}
          large={0}
          css={{
            '@large': {
              display: 'none !important',
            },
          }}
        >
          <HomeNavigationLink />
        </Grid.Item>
      </Grid.Container>

      <Grid.Container>
        <Grid.Item xs={4} small={2} medium={2} large={2}>
          <css.CopyrightText>
            © Telnyx LLC {new Date().getFullYear()}
          </css.CopyrightText>
        </Grid.Item>
      </Grid.Container>
    </css.Footer>
  );
};

export default Footer;
