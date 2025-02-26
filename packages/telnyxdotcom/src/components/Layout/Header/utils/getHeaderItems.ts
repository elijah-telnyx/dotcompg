import type { HeaderNavigationItem } from '../Header';
import { headerItemsId } from './constants';

export function getHeaderItems(navigation: HeaderNavigationItem[]) {
  return navigation.reduce(
    (headerItems, item) => {
      switch (item.id) {
        case headerItemsId.production:
          headerItems.production = item;
          break;
        case headerItemsId.solutions:
          headerItems.solutions = item;
          break;
        case headerItemsId.pricing:
          headerItems.pricing = item;
          break;
        case headerItemsId.whyTelnyx:
          headerItems.whyTelnyx = item;
          break;
        case headerItemsId.resources:
          headerItems.resources = item;
          break;
        case headerItemsId.developers:
          headerItems.developers = item;
          break;
      }
      return headerItems;
    },
    {
      production: null,
      solutions: null,
      pricing: null,
      whyTelnyx: null,
      resources: null,
      developers: null,
    } as Record<keyof typeof headerItemsId, HeaderNavigationItem | null>
  );
}
