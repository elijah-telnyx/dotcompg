import * as css from './SidebarLinks.styled';
import CTAButton, { type CTAButtonProps } from '../CtaButton';
import Heading from '../Typography/Heading';

export interface SidebarLinksProps {
  items: Omit<CTAButtonProps, 'type'>[];
}

const SidebarLinks = ({ items }: SidebarLinksProps) => {
  return (
    <css.LinksWrapper>
      <Heading level={2} category>
        Jump to:
      </Heading>
      {items.map((link) => (
        <CTAButton {...link} key={link.href} type='link' linkNoIcon />
      ))}
    </css.LinksWrapper>
  );
};

export default SidebarLinks;
