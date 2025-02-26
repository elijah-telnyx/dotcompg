import { useState } from 'react';
import type { Optional } from '../../../utils/types';
import ChevronDownIcon from '../../../components/Icons/ChevronDown';
import type { HeaderLinkProps, NavigationItem } from '../Header';
import * as Dropdown from './HeaderDropdown.styled';
import VisuallyHidden from '../../VisuallyHidden';
import { isTelnyxHref } from '../../Link/Link';
type HeaderDropdownProps = Optional<
  Required<NavigationItem>,
  'id' | 'href' | 'rel' | 'target' | 'referrerPolicy' | 'seeMoreLink'
>;

interface HeaderDropdownLinkProps extends HeaderLinkProps {
  isExternal?: boolean;
}

const HiddenLinks = ({ items }: { items: HeaderLinkProps[] }) => {
  const Link = ({ href, label }: HeaderLinkProps) =>
    href ? <a href={href}>{label}</a> : null;

  return (
    <VisuallyHidden>
      {items.map((item) => (
        <Link {...item} key={'visually-hidden-' + item.id} />
      ))}
    </VisuallyHidden>
  );
};

const HeaderDropdownLink = ({
  label,
  href,
  ...props
}: HeaderDropdownLinkProps) => (
  <Dropdown.ItemLink
    kind='cta'
    href={href}
    underlineColor='cream'
    className='mchNoDecorate' // dynamically generated
    isExternal={!isTelnyxHref(href)}
    {...props}
  >
    {label}
  </Dropdown.ItemLink>
);

const HeaderDropdown = ({ label, items, seeMoreLink }: HeaderDropdownProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Dropdown.Menu open={open} onOpenChange={setOpen} modal={false}>
        <Dropdown.Trigger onClick={() => setOpen(open)}>
          <Dropdown.TriggerContent
            kind='cta'
            underlineColor='cream'
            htmlAs='span'
          >
            {label}
          </Dropdown.TriggerContent>
          <ChevronDownIcon />
        </Dropdown.Trigger>
        <Dropdown.Container>
          <Dropdown.Content>
            <Dropdown.ContentWrapper>
              <Dropdown.ItemsWrapper>
                {items.map((item) => (
                  <Dropdown.ItemContainer key={item.label}>
                    <HeaderDropdownLink {...item} />
                  </Dropdown.ItemContainer>
                ))}
              </Dropdown.ItemsWrapper>
              {seeMoreLink && (
                <Dropdown.SeeMoreLinkWrapper>
                  <HeaderDropdownLink {...seeMoreLink} />
                </Dropdown.SeeMoreLinkWrapper>
              )}
            </Dropdown.ContentWrapper>
          </Dropdown.Content>
        </Dropdown.Container>
      </Dropdown.Menu>
      {seeMoreLink && <HiddenLinks items={[seeMoreLink]} />}
      <HiddenLinks items={items} />
    </>
  );
};

export default HeaderDropdown;
