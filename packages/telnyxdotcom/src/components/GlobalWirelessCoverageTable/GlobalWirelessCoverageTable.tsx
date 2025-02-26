import { useMemo, useState } from 'react';
import CoverageTableSection, { type CoverageTableSectionProps } from 'ui/components/CoverageTableSection';
import MultiSelect from 'ui/components/MultiSelect';
import * as css from './GlobalWirelessCoverageTable.styled';
import { createBodyFilter, filterByOptions, type Filter } from './utils';
import {
  generateCountryOptions,
  handleCountryAndRegionFilter,
} from 'ui/components/CoverageTableSection/useCoverageData/utils';

const GlobalWirelessCoverageTable = (props: CoverageTableSectionProps) => {
  const [filters, setFilters] = useState<Filter>({ country: [], filterBy: [] });

  const countryOptions = useMemo(() => {
    return generateCountryOptions(props.tabs[0].data.body);
  }, [props.tabs]);

  return (
    <CoverageTableSection
      {...props}
      fullWidth
      customFilters={[
        <MultiSelect
          key='country'
          placeholder='Search country'
          items={countryOptions}
          value={filters.country}
          onChange={(selectedOptions) => {
            const newState = handleCountryAndRegionFilter({
              selectedOptions,
              countryFilter: filters.country,
              data: props.tabs[0].data.body,
            });

            setFilters({ ...filters, country: newState });
          }}
        />,
        <MultiSelect
          key='filter-by'
          placeholder='Filter by'
          items={filterByOptions}
          value={filters.filterBy}
          onChange={(value) => setFilters({ ...filters, filterBy: value })}
        />,
      ]}
      customFilterFn={createBodyFilter(filters)}
      onFilterReset={() => setFilters({ country: [], filterBy: [] })}
      accordionProps={{
        renderCountryDescription: (body) => {
          return <css.PricingZone>Pricing Zone {Object.values(body.types)[0]['Pricing Zone']}</css.PricingZone>;
        },
        renderTypeHeading: (type) => `Services for ${type}:`,
        excludedKeys: ['Pricing Zone'],
      }}
    />
  );
};

export default GlobalWirelessCoverageTable;
