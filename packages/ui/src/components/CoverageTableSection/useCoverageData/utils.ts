import type { GroupedOption } from '../../MultiSelect/MultiSelect';
import type { BodyData } from '../useCoverageData';
import regionsMap from './regionsMap.json';
import customRegions from './customRegions.json';

interface Filter {
  country?: string[];
  typeAndService?: string[];
}

const findTypeIndexBy = {
  Service(row: BodyData, servicesFilter: string[]) {
    const selectedServiceIndex = Object.keys(row.types).findIndex((type) =>
      servicesFilter.every((serviceFilter) => row.types[type][serviceFilter])
    );

    return { ...row, selectedTypeIndex: selectedServiceIndex };
  },
  NumberType(row: BodyData, numberTypeFilter: string) {
    const availableTypes = Object.keys(row.types);
    const selectedServiceIndex = availableTypes.findIndex(
      (service) => numberTypeFilter === service
    );

    return { ...row, selectedTypeIndex: selectedServiceIndex };
  },
  NumberTypeAndService(
    row: BodyData,
    filter: { numberType: string; service: string }
  ) {
    const selectedTypeIndex = Object.keys(row.types).findIndex((type) => {
      if (type === filter.numberType) {
        return row.types[filter.numberType][filter.service];
      }
      return false;
    });
    return { ...row, selectedTypeIndex };
  },
};

const getFilterValues = (filter: Filter) => {
  if (!filter.typeAndService?.length) {
    return { servicesFilter: [], numberTypesFilter: [] };
  }
  return filter.typeAndService.reduce(
    (splitFilter, current) => {
      const [filterType, filterValue] = current.split('__');
      switch (filterType) {
        case 'number-types':
          splitFilter.numberTypesFilter.push(filterValue);
          break;
        case 'services':
          splitFilter.servicesFilter.push(filterValue);
          break;
      }
      return splitFilter;
    },
    {
      servicesFilter: [] as string[],
      numberTypesFilter: [] as string[],
    }
  );
};

const generateFilterData = (filter: Filter) => {
  const { servicesFilter, numberTypesFilter } = getFilterValues(filter);

  const hasServiceFilter = Boolean(servicesFilter.length);
  const hasNumberTypesFilter = Boolean(numberTypesFilter.length);

  const Country = (data: BodyData) => {
    if (!filter.country?.length) return true;
    return filter.country.includes(data.country.name);
  };

  const NumberTypeOnly = (data: BodyData) => {
    return numberTypesFilter.every((filterValue) => {
      if (!data.types[filterValue]) return false;
      return Object.values(data.types[filterValue]).some(Boolean);
    });
  };

  const ServiceOnly = (data: BodyData) => {
    return Object.keys(data.types).some((type) =>
      servicesFilter.every((serviceFilter) => data.types[type][serviceFilter])
    );
  };

  const ServiceAndNumberType = (data: BodyData) => {
    return numberTypesFilter.every((typeFilter) => {
      return servicesFilter.every((serviceFilter) => {
        return data.types[typeFilter][serviceFilter];
      });
    });
  };

  return {
    filterBy: {
      NumberTypeOnly,
      ServiceOnly,
      ServiceAndNumberType,
      Country,
    },
    hasServiceFilter,
    hasNumberTypesFilter,
    servicesFilter,
    numberTypesFilter,
  };
};

export const getFilterBodyData = (data: BodyData[], filter: Filter) => {
  const {
    hasServiceFilter,
    hasNumberTypesFilter,
    filterBy,
    numberTypesFilter,
    servicesFilter,
  } = generateFilterData(filter);

  return data
    .filter(function applyFilter(row) {
      const isValidCountry = filterBy.Country(row);
      if (!isValidCountry) return false;

      if (!hasNumberTypesFilter && !hasServiceFilter) return true;

      if (hasNumberTypesFilter && hasServiceFilter)
        return filterBy.ServiceAndNumberType(row);
      if (hasNumberTypesFilter && !hasServiceFilter)
        return filterBy.NumberTypeOnly(row);
      if (!hasNumberTypesFilter && hasServiceFilter)
        return filterBy.ServiceOnly(row);
    })
    .map(function updateRowType(row) {
      const latestPickedNumberType = numberTypesFilter.at(-1) as string;
      const latestPickedService = servicesFilter.at(-1) as string;

      if (hasNumberTypesFilter && hasServiceFilter) {
        return findTypeIndexBy.NumberTypeAndService(row, {
          service: latestPickedService,
          numberType: latestPickedNumberType,
        });
      }

      if (hasNumberTypesFilter && !hasServiceFilter) {
        return findTypeIndexBy.NumberType(row, latestPickedNumberType);
      }
      if (!hasNumberTypesFilter && hasServiceFilter) {
        return findTypeIndexBy.Service(row, servicesFilter);
      }

      return { ...row, selectedTypeIndex: 0 };
    });
};

export const handleRegions = (
  region: BodyData['country']['region'],
  regionsList: GroupedOption['items']
) => {
  if (!region) return regionsList;

  const strRegion = String(region);

  const regionOption = {
    name: regionsMap[strRegion as keyof typeof regionsMap],
    value: strRegion,
  };

  const hasOptionRegion = regionsList.some(
    (item) => item.name === regionOption.name
  );

  if (hasOptionRegion) {
    return regionsList.map((item) => {
      if (item.name === regionOption.name) {
        const hasRegion = item.value.includes(regionOption.value);
        if (hasRegion) {
          return item;
        }

        return {
          ...item,
          value: item.value.concat(',', strRegion),
        };
      }
      return item;
    });
  }

  return regionsList
    .concat(regionOption)
    .sort((a, b) => (a.name <= b.name ? -1 : 1));
};

const handleGlobalCoverage = (
  region: BodyData['country']['region'],
  regionsList: GroupedOption['items']
) => {
  if (!region) return regionsList;

  const strRegion = String(region);

  const regionName = customRegions[strRegion as keyof typeof customRegions];

  if (!regionName) return regionsList;

  const regionOption = {
    name: regionName,
    value: strRegion,
  };

  const hasOptionRegion = regionsList.some(
    (item) => item.name === regionOption.name
  );

  if (hasOptionRegion) {
    return regionsList.map((item) => {
      if (item.name === regionOption.name) {
        const hasRegion = item.value.includes(regionOption.value);
        if (hasRegion) {
          return item;
        }

        return {
          ...item,
          value: item.value.concat(',', strRegion),
        };
      }
      return item;
    });
  }

  return regionsList
    .concat(regionOption)
    .sort((a, b) => (a.name <= b.name ? -1 : 1));
};

export const generateCountryOptions = (data: BodyData[]) => {
  return data
    .reduce(
      ([global, regions, countries], { country }) => {
        const countryOption = { name: country.name, value: country.name };
        const isCustomRegion =
          customRegions[String(country.region) as keyof typeof customRegions];

        if (isCustomRegion) {
          const globalItems = handleGlobalCoverage(
            country.region,
            global.items
          );

          return [
            { name: 'Global Coverage', items: globalItems },
            {
              name: 'Regions',
              items: regions.items,
            },
            { name: 'Countries', items: countries.items },
          ];
        }

        const regionItems = handleRegions(country.region, regions.items);

        return [
          { name: 'Global Coverage', items: global.items },
          {
            name: 'Regions',
            items: regionItems,
          },
          { name: 'Countries', items: countries.items.concat(countryOption) },
        ];
      },
      [
        { name: 'Global Coverage', items: [] },
        { name: 'Regions', items: [] },
        { name: 'Countries', items: [] },
      ] as GroupedOption[]
    )
    .filter(({ items }) => items.length);
};

const isRegion = (option?: string) => {
  return (
    customRegions[option as keyof typeof customRegions] ||
    Number.isInteger(Number(option)) ||
    option?.split(',').every((item) => Number.isInteger(Number(item)))
  );
};

const getRegions = (state: string[]) => state.filter(isRegion);

export const handleCountryAndRegionFilter = ({
  selectedOptions,
  countryFilter,
  data,
}: {
  selectedOptions: string[];
  countryFilter: string[];
  data: BodyData[];
}) => {
  let filteredState = selectedOptions;
  const currentRegions = getRegions(selectedOptions);
  const previousRegions = getRegions(countryFilter);
  const removedRegions = previousRegions.filter(
    (r) => !currentRegions.includes(r)
  );

  const removedCountry = countryFilter
    .filter((c) => !selectedOptions.includes(c))
    .at(0);

  // remove countries from removed regions
  if (removedRegions.length) {
    filteredState = selectedOptions.filter((item) => {
      const isCountry = isNaN(Number(item));
      if (removedRegions.length && isCountry) {
        const country = data.find(({ country }) => country.name === item);
        if (country) {
          return removedRegions.some(
            (removedRegion) =>
              !removedRegion.split(',').includes(String(country.country.region))
          );
        }
      }

      return true;
    });
  }

  // unselect region from removed country
  if (removedCountry) {
    const country = data.find(({ country }) => country.name === removedCountry);
    if (country) {
      const removedCountryRegion = country.country.region;
      filteredState = filteredState.filter((option) => {
        if (isRegion(option)) {
          return !option.split(',').includes(String(removedCountryRegion));
        }
        return true;
      });
    }
  }

  // add countries from selected regions but don't include removed countries
  const selectedRegionCountries = data
    .filter(
      ({ country }) =>
        currentRegions.some((currentRegion) =>
          currentRegion.split(',').includes(String(country.region))
        ) && removedCountry !== country.name
    )
    .map(({ country }) => country.name);

  return Array.from(new Set([...filteredState, ...selectedRegionCountries]));
};
