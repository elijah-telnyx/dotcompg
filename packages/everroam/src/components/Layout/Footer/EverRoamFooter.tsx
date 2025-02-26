import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import LinkedInIcon from "ui/components/Icons/LinkedIn";
import TwitterIcon from "ui/components/Icons/Twitter";
import FacebookIcon from "ui/components/Icons/Facebook";
import * as css from "./Footer.styled";
import Grid from "ui/components/Grid";
import { type SectionProps } from "ui/components/Section";

interface Link {
  label: string;
  href?: string;
}

interface NavigationItem {
  label: string;
  items: Link[];
}

const navItems: NavigationItem[] = [
  {
    label: "Company",
    items: [
      {
        href: "/data-privacy",
        label: "Data and Privacy",
      },
      {
        href: "/cookie-policy",
        label: "Cookie Policy",
      },
    ],
  },
  {
    label: "Legal",
    items: [
      {
        href: "/acceptable-use-policy",
        label: "Acceptable Use",
      },
      {
        href: "/terms-and-conditions",
        label: "Terms and Conditions",
      },
    ],
  },
];

const EverRoamFooter = ({ ...props }: SectionProps) => {
  return (
    <css.Footer
      htmlAs="footer"
      spacingTop="continuous"
      spacingBottom="continuous"
      {...props}
    >
      <css.Container>
        <css.LogoItem>
          <css.NavigationLink href="/">
            <css.Logo variant="blue" aria-hidden="true" />
            <VisuallyHidden.Root>Home</VisuallyHidden.Root>
          </css.NavigationLink>
        </css.LogoItem>

        {navItems.map(({ label, items }) => (
          <css.NavigationList key={label}>
            {items
              .filter(({ href }) => href)
              .map(({ href, label }) => (
                <css.NavigationListItem key={label}>
                  <css.NavigationLink href={href}>{label}</css.NavigationLink>
                </css.NavigationListItem>
              ))}
          </css.NavigationList>
        ))}
      </css.Container>

      <Grid.Container>
        <Grid.FullWidthItem>
          <css.TileContainer>
            <css.CopyrightText>
              &copy; EverRoam {new Date().getFullYear()}
            </css.CopyrightText>
            <css.SocialNavigationList>
              <css.SocialNavigationItem>
                <css.SocialIconLink
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://www.linkedin.com/company/telnyx/"
                >
                  <LinkedInIcon title="LinkedIn" />
                </css.SocialIconLink>
              </css.SocialNavigationItem>
              <css.SocialNavigationItem>
                <css.SocialIconLink
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://x.com/everroam_eSIM"
                >
                  <TwitterIcon title="Twitter" />
                </css.SocialIconLink>
              </css.SocialNavigationItem>
              <css.SocialNavigationItem>
                <css.SocialIconLink
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://www.facebook.com/profile.php?id=61561177798406"
                >
                  <FacebookIcon title="Facebook" />
                </css.SocialIconLink>
              </css.SocialNavigationItem>
            </css.SocialNavigationList>
          </css.TileContainer>
        </Grid.FullWidthItem>
      </Grid.Container>
    </css.Footer>
  );
};

export default EverRoamFooter;
