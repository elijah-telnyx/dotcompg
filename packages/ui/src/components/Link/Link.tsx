import { Fragment, type AnchorHTMLAttributes, type ReactNode } from 'react';
import type { MediaProps } from '../Media';
import { MediaSVG } from '../Media';
import { Kind, UnderlineColor, Direction } from './constants';
import * as css from './Link.styled';
export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Define how the button will look
   */
  kind?: keyof typeof Kind;
  /**
   * Add an icon to the right side of the link text
   */
  icon?: MediaProps<'svg'>;
  Icon?: ReactNode;
  /**
   * define the color of the CTA underline
   */
  underlineColor?: keyof typeof UnderlineColor;
  noUnderlineOnCta?: boolean;
  noIconEffect?: boolean;
  noIcon?: boolean;
  dark?: boolean;
  lead?: boolean;
  blog?: boolean;
  direction?: 'ltr' | 'rtl';
  size?: 'small';
  htmlAs?: keyof JSX.IntrinsicElements;
  underlineAlwaysVisible?: boolean;
}

const KindsMap = {
  [Kind.cta]: css.CTA,
  [Kind.default]: css.Link,
};

export const isTelnyxHref = (href: string | undefined) => {
  return (
    href?.startsWith('https://telnyx.com') ||
    href?.startsWith('https://www.telnyx.com') ||
    href?.startsWith('http://localhost') ||
    href?.startsWith('tel:') ||
    // check if is relative path
    href?.startsWith('/') ||
    // check if is anchor
    href?.startsWith('#')
  );
};

const isAnchorLink = (href: string | undefined) => {
  return href?.startsWith('#');
};

type IconHandlerProps = Pick<LinkProps, 'Icon' | 'icon' | 'href' | 'dark'> & {
  noIcon: boolean;
};

const IconHandler = ({ Icon, icon, href, dark, noIcon }: IconHandlerProps) => {
  if (Icon) {
    return <css.Icon>{Icon}</css.Icon>;
  }
  if (icon) {
    return (
      <css.Icon>
        <MediaSVG {...icon} dark={dark} />
      </css.Icon>
    );
  }

  if (noIcon) {
    return null;
  }

  const isExternalLink = !isTelnyxHref(href);

  if (isExternalLink) {
    return <css.ExternalIcon />;
  }
  if (isAnchorLink(href)) {
    return <css.ArrowDownIcon />;
  }
  return null;
};

const Link = ({
  children,
  icon,
  Icon,
  kind = Kind.default,
  underlineColor,
  dark,
  lead,
  blog,
  direction = Direction.ltr,
  size,
  htmlAs,
  noUnderlineOnCta,
  noIconEffect,
  noIcon,
  underlineAlwaysVisible,
  ...props
}: LinkProps) => {
  const Content = KindsMap[kind];
  const isLink = Boolean(!htmlAs);
  const isExternalLink = !isTelnyxHref(props.href);

  // if the element ins't an anchor, we don't need to add rel and target
  const linkProps = isLink && {
    rel: isExternalLink ? 'noopener' : props.rel,
    target: isExternalLink ? '_blank' : props.target,
  };

  return (
    <css.Anchor as={htmlAs} {...props} {...linkProps}>
      <Content
        dark={dark}
        lead={lead}
        blog={blog}
        direction={direction}
        size={size}
        noIconEffect={noIconEffect}
      >
        {kind === Kind.default || noUnderlineOnCta ? (
          <>{children}</>
        ) : (
          <css.UnderlineElement
            underlineColor={underlineColor}
            noUnderline={Boolean(noUnderlineOnCta)}
            underlineAlwaysVisible={underlineAlwaysVisible}
          >
            {children}
          </css.UnderlineElement>
        )}

        <IconHandler
          Icon={Icon}
          icon={icon}
          href={props.href}
          dark={dark}
          noIcon={noIcon || !isLink}
        />
      </Content>
    </css.Anchor>
  );
};

export default Link;
