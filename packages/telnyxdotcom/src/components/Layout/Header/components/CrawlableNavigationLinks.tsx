import { slugify } from 'ui/utils/slugify';
import type { HeaderProps } from '../Header';

export const CrawlableNavigationLinks = ({ navigation }: Pick<HeaderProps, 'navigation'>) => {
  const links = navigation.reduce<{ href: string; label: string }[]>((acc, item) => {
    if (item.seeMoreLink) {
      acc.push(item.seeMoreLink);
    }
    if ('href' in item) {
      acc.push(item);
    } else if ('items' in item) {
      item.items.forEach((subItem) => {
        if (subItem.seeMoreLink) {
          acc.push(subItem.seeMoreLink);
        }
        if ('href' in subItem) {
          acc.push(subItem);
        } else if ('items' in subItem) {
          subItem.items.forEach((subSubItem) => {
            if (subSubItem.seeMoreLink) {
              acc.push(subSubItem.seeMoreLink);
            }
            if ('href' in subSubItem) {
              acc.push(subSubItem);
            }
          });
        }
      });
    }

    return acc;
  }, []);

  return (
    // hidden visually and for screen readers
    <nav hidden aria-hidden='true'>
      {links.map((link) => {
        return (
          <a href={link.href} key={`hidden-'href_${link.href}-label_${slugify(link.label)}`}>
            {link.label}
          </a>
        );
      })}
    </nav>
  );
};
