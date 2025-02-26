import { useRouter } from 'next/router';
import SearchSection, { type SearchSectionProps } from 'ui/components/SearchSection';
import { routes } from 'utils/routes';

export type ResourcesSearchSectionProps = Omit<SearchSectionProps, 'searchProps'>;

const ResourcesSearchSection = (props: ResourcesSearchSectionProps) => {
  const router = useRouter();
  const searchTerm = String(router.query?.s || '');

  const onSearch = (value: string) => {
    if (value === searchTerm) {
      return;
    }

    if (value === '') {
      router.push(routes.resources.root);
      return;
    }

    router.push(`${routes.resources.search}?s=${value}`);
  };

  return (
    <SearchSection
      {...props}
      searchProps={{
        id: 'search',
        name: 'search',
        placeholder: 'Search',
        defaultValue: searchTerm,
        onSearch,
      }}
    />
  );
};

export default ResourcesSearchSection;
