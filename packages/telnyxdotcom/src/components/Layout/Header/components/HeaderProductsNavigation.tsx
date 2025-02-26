import type { HeaderNavigationItemGroup, HeaderNavigationItemLink } from '../Header';
import * as Header from 'ui/components/HeaderNew';
import * as css from './HeaderNavigation.styled';
import { HeaderNavigationGroup } from './HeaderNavigationGroup';

export function HeaderProductsNavigation({ label, seeMoreLink, items, ctaBanner }: HeaderNavigationItemGroup) {
  const [communication, compute, ...otherItems] = items as HeaderNavigationItemGroup[];

  return (
    <Header.NavigationMenu label={label} seeMoreLink={seeMoreLink}>
      <css.TwoColumnGrid>
        <div>
          <NestedItemsGroup {...(communication as NestedItemsGroup)} />
        </div>
        <css.Flex direction='column'>
          <Header.GroupLabel>{compute.label}</Header.GroupLabel>
          <css.GroupItemWrapper css={{ '@headerDesktop': { gridTemplateColumns: '1fr 1fr' } }}>
            {compute.items.map((item) => (
              <css.GroupItem key={item.id}>
                <Header.NavigationMenuItem {...(item as HeaderNavigationItemLink)} />
              </css.GroupItem>
            ))}
          </css.GroupItemWrapper>

          <css.TwoColumnGrid css={{ marginTop: '$xl', '@headerDesktop': { marginTop: '$xxxl' } }}>
            {otherItems.map(({ label, id, items }) => {
              return (
                <div key={id}>
                  <Header.GroupLabel>{label}</Header.GroupLabel>
                  <HeaderNavigationGroup items={items as HeaderNavigationItemLink[]} />
                </div>
              );
            })}
          </css.TwoColumnGrid>

          {ctaBanner && (
            <css.CTABannerWrapper>
              <Header.NavigationMenuCTABanner {...ctaBanner} />
            </css.CTABannerWrapper>
          )}
        </css.Flex>
      </css.TwoColumnGrid>
    </Header.NavigationMenu>
  );
}

type LinksGroup = Omit<HeaderNavigationItemGroup, 'items'> & {
  items: HeaderNavigationItemLink[];
};

type NestedItemsGroup = Omit<HeaderNavigationItemGroup, 'items'> & {
  items: LinksGroup[];
};
const NestedItemsGroup = ({ label, items }: NestedItemsGroup) => {
  return (
    <>
      <Header.GroupLabel>{label}</Header.GroupLabel>
      <css.TwoColumnGrid>
        {items.map(({ label, id, items }) => {
          return (
            <div key={id}>
              <Header.InnerGroupLabel>{label}</Header.InnerGroupLabel>

              <HeaderNavigationGroup items={items} />
            </div>
          );
        })}
      </css.TwoColumnGrid>
    </>
  );
};
