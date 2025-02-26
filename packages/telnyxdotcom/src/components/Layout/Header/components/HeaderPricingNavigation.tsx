import { HeaderMenuLabel, HeaderMenuLabelContainer } from 'ui/components/HeaderNew/components/HeaderLabels';
import type { HeaderNavigationItemLink } from '../Header';

export function HeaderPricingNavigation(item: HeaderNavigationItemLink) {
  return (
    <a href={item.href}>
      <HeaderMenuLabelContainer
        css={{
          '@headerMobileOnly': {
            color: '$black',
          },
        }}
      >
        <HeaderMenuLabel>{item.label}</HeaderMenuLabel>
      </HeaderMenuLabelContainer>
    </a>
  );
}
