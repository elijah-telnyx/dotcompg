import type { MobileNetworkOperator } from './../lib/Pricing/api';
import { getCountryByAlpha2 } from 'utils/countries.data';
import type { Country } from 'utils/countries/types';
import type { BodyData } from 'ui/components/CoverageTableSection/useCoverageData';
import { toTitleCase } from 'utils/string';
import type { CoverageTableSectionProps } from 'ui/components/@types';
import { fetchMobileNetworkOperators, WIRELESS_MAX_PAGE_SIZE } from 'lib/Pricing/api';
import { customCountries } from 'utils/countries/customCountries';

export interface ParsedMobileNetworkOperator {
  readonly country: Country;
  readonly data: {
    readonly 'Pricing Zone': number | string;
    readonly Network: string;
    readonly ['3G']: boolean;
    readonly ['4G (LTE)']: boolean;
    readonly ['LTE-M']: boolean;
    readonly ['NB-IoT']: boolean;
  };
}

const fetchData = async () =>
  fetchMobileNetworkOperators({
    page_size: WIRELESS_MAX_PAGE_SIZE,
    filter: { blocked: false },
  }).then((res) => res.entries);

const addCustomNetwork = (networkData: MobileNetworkOperator) => {
  const { name, services, zone } = networkData;

  // satellite coverage
  if (networkData.mcc === '901') {
    return {
      country: customCountries['satellite-coverage'],
      data: {
        'Pricing Zone': zone,
        Network: name,
        '3G': services.service_3g,
        '4G (LTE)': services.service_4g_lte,
        'LTE-M': services.service_lte_m,
        'NB-IoT': services.service_nb_iot,
      },
    };
  }
  return null;
};

const fetchAndParseNetworkData = async () => {
  return (await fetchData()).reduce(
    (networkList: ParsedMobileNetworkOperator[], currentNetwork: MobileNetworkOperator) => {
      const customNetwork = addCustomNetwork(currentNetwork);

      if (customNetwork) {
        return [...networkList, customNetwork];
      }

      const country = getCountryByAlpha2(currentNetwork.country_code);

      if (!country) {
        console.error(`Country ${currentNetwork.country_code} not found`);
        return networkList;
      }

      const { name, services, zone } = currentNetwork;

      return [
        ...networkList,
        {
          country,
          data: {
            Network: name,
            '5G': services.service_5g,
            '4G (LTE)': services.service_4g_lte,
            '3G': services.service_3g,
            'LTE-M': services.service_lte_m,
            'NB-IoT': services.service_nb_iot,
            'Pricing Zone': zone,
          },
        },
      ];
    },
    []
  );
};

const generateTableData = () =>
  fetchAndParseNetworkData().then((res) => {
    const sorted = res.sort((a, b) => a.country.name.localeCompare(b.country.name));
    return {
      sections: {
        globalCoverageTable: {
          tabs: [
            {
              label: 'label',
              isServices: true,
              data: {
                header: Object.keys(res[0].data).filter((it) => it !== 'Network'),
                typeColumn: {
                  // Value from design
                  width: 450,
                  label: 'Network',
                },
                body: Object.values(
                  sorted.reduce((acc, { country, data: { Network, 'Pricing Zone': Zone, ...data } }) => {
                    const type = toTitleCase(Network);

                    return {
                      ...acc,
                      [country.alpha2]: {
                        country,
                        types: {
                          ...(acc[country.alpha2]?.types || {}),
                          [type]: { ...data, 'Pricing Zone': String(Zone) },
                        },
                      },
                    };
                  }, {} as Record<string, BodyData>)
                ),
              },
            },
          ],
        } as CoverageTableSectionProps,
      },
    };
  });

export default generateTableData;
