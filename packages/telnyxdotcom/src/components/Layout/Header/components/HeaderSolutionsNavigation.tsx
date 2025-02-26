import type { HeaderNavigationItemGroup, HeaderNavigationItemLink } from '../Header';
import * as Header from 'ui/components/HeaderNew';
import * as css from './HeaderNavigation.styled';

export function HeaderSolutionsNavigation({ label, seeMoreLink, items }: HeaderNavigationItemGroup) {
  const [forIndustries, _forDepartments] = items as HeaderNavigationItemGroup[];
  return (
    <Header.NavigationMenu label={label} seeMoreLink={seeMoreLink}>
      <css.TwoColumnGrid>
        <css.Box css={{ gridColumn: 'span 2' }}>
          <Header.GroupLabel>{forIndustries.label}</Header.GroupLabel>
          <css.TwoColumnGrid
            as={css.GroupItemWrapper}
            // css={{
            //   gridTemplateRows: 'repeat(5, 1fr)',
            // }}
          >
            {forIndustries.items.map((item) => (
              <css.GroupItem key={item.id}>
                <Header.NavigationMenuItem {...(item as HeaderNavigationItemLink)} />
              </css.GroupItem>
            ))}
          </css.TwoColumnGrid>
        </css.Box>

        {/* <div>
          <Header.GroupLabel>{forDepartments.label}</Header.GroupLabel>
          <HeaderNavigationGroup items={forDepartments.items as HeaderNavigationItemLink[]} />
        </div> */}
      </css.TwoColumnGrid>
    </Header.NavigationMenu>
  );
}
