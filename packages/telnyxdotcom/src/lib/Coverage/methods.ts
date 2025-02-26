import constants from 'constants/env';
import Api from 'lib/Api';
import { entries, getClient } from 'lib/Contentful';
import type { ApiV2Response } from 'services/telnyxApiService';
import type { CoverageTableSectionProps } from 'ui/components/CoverageTableSection';
import { getCountryByName } from 'utils/countries.data';
import type * as GlobalCoverage from './types';
import { COVERAGE_TABLE_ID } from 'lib/Static/data';

const getRequirementsCoverage = () => {
  const url = `${constants.api.BASE_URL}/v2/requirements`;
  const filter = { action: 'porting' };

  return Api.get<ApiV2Response<GlobalCoverage.RequirementsCoverage[]>>(url, {
    includeV2AuthHeader: true,
    queryParams: {
      filter,
      page: {
        size: 1,
      },
    },
  }).then((res) => {
    if (res.meta?.total_results) {
      return Api.get<ApiV2Response<GlobalCoverage.RequirementsCoverage[]>>(url, {
        includeV2AuthHeader: true,
        queryParams: {
          filter,
          page: {
            size: res.meta.total_results,
          },
        },
      });
    }
    return res;
  });
};

const getCountryCoverage = () => {
  return Api.get<ApiV2Response<GlobalCoverage.CountryCoverage>>(`${constants.api.BASE_URL}/v2/country_coverage`, {
    includeV2AuthHeader: true,
  });
};

const getPSTNCoverage = () => {
  const client = getClient();
  return client
    .getAsset(entries.assets.pstnCoverage)
    .then((asset) => Api.get<GlobalCoverage.PSTNCoverage[]>('https:' + asset.fields.file.url));
};

enum TYPES {
  Local = 'Local',
  'Toll-Free' = 'Toll-Free',
  'Shared Cost' = 'Shared Cost',
  Mobile = 'Mobile',
  National = 'National',
  'Full PSTN Replacement' = 'Full PSTN Replacement',
}

enum SERVICES {
  'Inbound Calling' = 'Inbound Calling',
  'Local Calling' = 'Local Calling',
  'Emergency Calling' = 'Emergency Calling',
  'Fax support' = 'Fax support',
  'Number Portability' = 'Number Portability',
  'Full PSTN Replacement' = 'Full PSTN Replacement',
  '2 Way Sms' = '2 Way Sms',
}

const getGlobalCoverageRawData = async () => {
  return Promise.all([getCountryCoverage(), getRequirementsCoverage(), getPSTNCoverage()]).then(
    ([countryCoverageData, requirementsCoverageData, pstnCoverageData]) => {
      return {
        countryCoverageData,
        requirementsCoverageData,
        pstnCoverageData,
      };
    }
  );
};

const parseRawData = (data: Awaited<ReturnType<typeof getGlobalCoverageRawData>>) => {
  const { countryCoverageData, requirementsCoverageData, pstnCoverageData } = data;

  const countries = Object.entries(countryCoverageData.data).filter(([countryName]) => getCountryByName(countryName));

  const normalizedCountryName = (name: string) => name.toLowerCase().replace(/\s+/g, '_');

  return (
    countries
      .map(([countryName, countryData]) => {
        const hasNumberPortability = (type?: string) =>
          requirementsCoverageData.data.some((requirement) => {
            const isCountry = requirement.country_code === countryData.code;
            if (!isCountry) return false;
            return requirement.phone_number_type === type;
          });

        const hasPSTNReplacement = (type?: string) =>
          pstnCoverageData.some((coverage) => {
            const isSameCountry = normalizedCountryName(coverage.country) === normalizedCountryName(countryName);
            if (!isSameCountry) return false;
            const isSameType = coverage.number_type === type;
            if (!isSameType) return false;
            // Ensures complete PSTN replacement capability based on the coverage data
            return coverage.full_pstn_replacement;
          });

        const getServicesCoverageFromNumberType = (numberType: GlobalCoverage.NumberType) => {
          const numberTypeData = countryData[numberType];

          return {
            [SERVICES['Inbound Calling']]: numberTypeData?.features?.includes('voice') ?? false,
            [SERVICES['Local Calling']]: numberTypeData?.features?.includes('local_calling') ?? false,
            [SERVICES['Emergency Calling']]: numberTypeData?.features?.includes('emergency') ?? false,
            [SERVICES['Fax support']]: numberTypeData?.features?.includes('fax') ?? false,
            [SERVICES['Number Portability']]: hasNumberPortability(numberType),
            [SERVICES['Full PSTN Replacement']]: hasPSTNReplacement(numberType),
            [SERVICES['2 Way Sms']]: numberTypeData?.features?.includes('sms') ?? false,
          };
        };

        return {
          country: {
            alpha2: countryData.code,
            name: countryName,
            region: getCountryByName(countryName)?.region || null,
          },
          types: {
            [TYPES.Local]: getServicesCoverageFromNumberType('local'),
            [TYPES['Toll-Free']]: getServicesCoverageFromNumberType('toll_free'),
            [TYPES.Mobile]: getServicesCoverageFromNumberType('mobile'),
            [TYPES.National]: getServicesCoverageFromNumberType('national'),
            [TYPES['Shared Cost']]: getServicesCoverageFromNumberType('shared_cost'),
          },
        };
      })
      // Filter out countries that don't have any services enabled
      .filter(({ types }) => Object.values(types).some((type) => Object.values(type).some(Boolean)))
  );
};

const convertToSectionData = (
  data: CoverageTableSectionProps['tabs'][number]['data']['body']
): CoverageTableSectionProps => {
  return {
    id: COVERAGE_TABLE_ID,
    heading: 'Take a closer look at our global number coverage',
    copy: 'Search by country or filter results by number type and/or service.',
    spacingTop: 'continuous',
    spacingBottom: 'continuous',
    tabs: [
      {
        label: 'Services',
        isServices: true,
        data: {
          header: Object.values(SERVICES),
          body: data,
        },
      },
      {
        label: 'Number types',
        isServices: false,
        data: {
          header: Object.values(TYPES),
          body: data.map((item) => {
            return {
              ...item,
              types: Object.entries(item.types).reduce((acc, [type, services]) => {
                if (Object.values(services).some((service) => service)) {
                  acc[type] = services;
                }

                // If the number type has the Full PSTN Replacement service, add it to the object
                // as a type, so it shows up in the number types table
                if (services[TYPES['Full PSTN Replacement']]) {
                  acc[TYPES['Full PSTN Replacement']] = { [TYPES['Full PSTN Replacement']]: true };
                }

                return acc;
              }, {} as Record<string, Record<string, string | boolean>>),
            };
          }),
        },
      },
    ],
  };
};

export const getGlobalCoverageTable = async () => {
  return getGlobalCoverageRawData().then(parseRawData).then(convertToSectionData);
};
