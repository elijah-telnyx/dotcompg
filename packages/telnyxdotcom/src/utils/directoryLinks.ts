import type { CountryType } from 'lib/Static/data/countryNumberData';
import type { DirectoryLink, DirectoryLinkTabs } from 'ui/components/LinksDirectorySection/LinksDirectorySection';
import { getFirstCharacter } from './string';

interface StateType {
  // Define the properties of the state type here
  readonly slug: string;
  readonly name: string;
  // Add other properties as needed
}

export const directoryLinks = (
  directoryLinks: (CountryType | StateType)[],
  parentName: string
): DirectoryLinkTabs[] => {
  const links = directoryLinks
    .reduce((acc: DirectoryLink[], { name, slug }) => {
      if (name && slug) {
        acc.push({
          text: name,
          altText: name,
          href: `/phone-numbers/${slug}`,
          disabled: parentName === name,
        });
      }
      return acc;
    }, [])
    .sort((a, b) => (a.text > b.text ? 1 : -1));

  // Create a new objects with the first letter of the text as the key
  // and the rest of the object as the links
  // {"a": [Link1, Link2], "b": [Link3, Link4]}...
  const linkTabs = links.reduce((acc, link) => {
    const firstLetter = getFirstCharacter(link.text);
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(link);
    return acc;
  }, {} as Record<string, typeof links>);

  // Convert the tabs to an array and sort them by the letter
  const sortedTabs = Object.entries(linkTabs)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([letter, links]) => ({
      value: letter,
      label: letter.toUpperCase(),
      links,
    }));

  return sortedTabs;
};

export default directoryLinks;
