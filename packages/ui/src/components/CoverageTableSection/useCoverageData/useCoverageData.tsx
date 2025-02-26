import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import Link from '../../Link';
import MultiSelect, { type MultiSelectProps } from '../../MultiSelect';
import type { CoverageAccordionProps } from '../CoverageAccordion';
import * as css from '../CoverageTableSection.styled';
import {
  generateCountryOptions,
  getFilterBodyData,
  handleCountryAndRegionFilter,
} from './utils';

export interface BodyData {
  country: { alpha2: string; name: string; region: number | string | null };
  url?: string;
  types: {
    [key: string]: {
      [key: string]: boolean | string;
    };
  };
}

export interface CoverageData {
  header: string[];
  body: BodyData[];
  typeColumn?: {
    width?: number;
    label?: string;
  };
}

export interface GlobalCoverageProviderProps {
  children: ReactNode;
  coverageData: CoverageData;
  singleTab?: boolean;
  fullWidth?: boolean;
  customFilters?: React.ReactNode[];
  customFilterFn?: (data: BodyData[]) => BodyData[];
  onFilterReset?: () => void;
  isServices: boolean;
  accordionProps?: CoverageAccordionProps;
}

interface GlobalCoverageContextProps {
  data: (BodyData & {
    selectedTypeIndex?: number;
  })[];
  typeColumn: CoverageData['typeColumn'];
  header: CoverageData['header'];
  isServices: boolean;
  fullWidth?: boolean;
  accordionProps?: CoverageAccordionProps;
}

const GlobalCoverageContext = createContext<GlobalCoverageContextProps>({
  data: [],
  header: [],
  accordionProps: undefined,
  isServices: true,
  typeColumn: undefined,
  fullWidth: undefined,
});

GlobalCoverageContext.displayName = 'GlobalCoverageContext';

export const GlobalCoverageProvider = ({
  coverageData,
  children,
  isServices,
  fullWidth,
  singleTab,
  customFilters,
  customFilterFn,
  onFilterReset,
  accordionProps,
  ...props
}: GlobalCoverageProviderProps) => {
  const [countryFilter, setCountryFilter] = useState<string[]>([]);
  const [filterBy, setFilterBy] = useState<string[]>([]);

  const countryOptions = useMemo(() => {
    return generateCountryOptions(coverageData.body);
  }, [coverageData.body]);

  const numberTypesItems = coverageData.body
    .reduce((items, body) => {
      const availableTypes = Object.keys(body.types);
      return Array.from(new Set([...items, ...availableTypes]));
    }, [] as string[])
    .map((type) => ({ name: type, value: 'number-types__' + type }));

  const filterByOptions: MultiSelectProps['items'] = isServices
    ? [
        {
          name: 'Number types',
          value: 'number-types',
          items: numberTypesItems,
        },
        {
          name: 'Services',
          value: 'services',
          items: coverageData.header.map((type) => ({
            name: type,
            value: 'services__' + type,
          })),
        },
      ]
    : coverageData.header.map((type) => ({
        name: type,
        value: 'number-types__' + type,
      }));

  const resetFilters = () => {
    setCountryFilter([]);
    setFilterBy([]);
    onFilterReset?.();
  };

  const filterElements = customFilters || [
    <MultiSelect
      key='country'
      onChange={(selectedOptions) => {
        const newState = handleCountryAndRegionFilter({
          selectedOptions,
          countryFilter,
          data: coverageData.body,
        });

        setCountryFilter(newState);
      }}
      items={countryOptions}
      value={countryFilter}
      placeholder='Search country'
    />,
    <MultiSelect
      key='filter-by'
      items={filterByOptions}
      value={filterBy}
      onChange={setFilterBy}
      placeholder='Filter by'
    />,
  ];

  return (
    <GlobalCoverageContext.Provider
      {...props}
      value={{
        data: customFilterFn
          ? customFilterFn(coverageData.body)
          : getFilterBodyData(coverageData.body, {
              country: countryFilter,
              typeAndService: filterBy,
            }),
        fullWidth,
        typeColumn: coverageData.typeColumn,
        header: coverageData.header,
        isServices: Boolean(isServices),
        accordionProps,
      }}
    >
      <css.Form singleTab={singleTab}>
        {filterElements.map((el, index) => (
          <css.FormFieldWrapper key={index}>{el}</css.FormFieldWrapper>
        ))}

        {/* Using a Link component so it matches the design */}
        <Link htmlAs='button' type='button' onClick={resetFilters}>
          Reset filters
        </Link>
      </css.Form>
      {children}
    </GlobalCoverageContext.Provider>
  );
};

export const useCoverageData = () => {
  return useContext(GlobalCoverageContext);
};

export const NotFoundMessage = () => (
  <css.NotFoundMessage>
    Sorry, that search returned no results.
  </css.NotFoundMessage>
);
