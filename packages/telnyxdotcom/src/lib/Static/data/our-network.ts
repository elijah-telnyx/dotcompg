import type { GetNetworkMapDataResponse, NetworkMapService } from 'lib/Coverage/types';
import type { NetworkMapData } from 'lib/Pricing/api';
import type { NetworkMapSectionProps } from 'ui/components/@types';

const sections = {
  networkMap: {
    id: 'global-coverage',
    heading: 'Explore our global coverage',
    copy: 'Filter by product families, services, and regions.',
    filters: {
      services: {
        communications: {
          select: {
            placeholder: 'Services',
            value: 'Inbound Calling',
            items: [
              {
                name: 'Inbound Calling',
                value: 'Inbound Calling',
              },
              {
                name: 'Local Calling',
                value: 'Local Calling',
              },
              {
                name: 'Emergency Calling',
                value: 'Emergency Calling',
              },
              {
                name: 'Fax support',
                value: 'Fax support',
              },
              {
                name: 'Number Portability',
                value: 'Number Portability',
              },
              {
                name: 'Two-way SMS',
                value: '2 Way Sms',
              },
              {
                name: 'Outbound SMS',
                value: 'Outbound Sms',
              },
              {
                name: 'Full PSTN Replacement',
                value: 'Full PSTN Replacement',
              },
              {
                name: 'Operator Connect',
                value: 'Operator Connect',
              },
            ],
          },
          enabledMap: {
            'Inbound Calling': {},
            'Local Calling': {},
            'Emergency Calling': {},
            'Fax support': {},
            'Number Portability': {},
            '2 Way Sms': {},
            'Full PSTN Replacement': {},
            'Operator Connect': {},
          },
        },
        iot: {
          select: {
            placeholder: 'Services',
            value: '5G',
            items: [
              {
                name: '5G',
                value: '5G',
              },
              {
                name: '4G (LTE)',
                value: '4G (LTE)',
              },
              {
                name: '3G',
                value: '3G',
              },
              {
                name: 'LTE-M',
                value: 'LTE-M',
              },
              {
                name: 'NB-IoT',
                value: 'NB-IoT',
              },
            ],
          },
          enabledMap: {
            '5G': {},
            '4G (LTE)': {},
            '3G': {},
            'LTE-M': {},
            'NB-IoT': {},
          },
        },
        networking: {
          select: {
            placeholder: 'Services',
            value: 'Telephony',
            items: [
              {
                name: 'Telephony',
                value: 'Telephony',
              },
              {
                name: 'Storage',
                value: 'Storage',
              },
              {
                name: 'VXC',
                value: 'VXC',
              },
              {
                name: 'Cloud VPN',
                value: 'Cloud VPN',
              },
              {
                name: 'Global Edge Router',
                value: 'Global Edge Router',
              },
            ],
          },
          enabledMap: {
            Telephony: {},
            Storage: {},
            VXC: {},
            'Cloud VPN': {},
            'Global Edge Router': {},
          },
        },
        compute: {
          select: {
            placeholder: 'Services',
            value: 'Cloud storage',
            items: [
              {
                name: 'AI',
                value: 'AI',
              },
              {
                name: 'Cloud storage',
                value: 'Cloud storage',
              },
            ],
          },
          enabledMap: {
            'Cloud storage': {},
            AI: {},
          },
        },
      },
      cta: {
        communications: {
          href: '/global-coverage',
          text: 'View full coverage',
          type: 'link',
          linkKind: 'cta',
        },
        iot: {
          href: '/iot-global-coverage',
          text: 'View full coverage',
          type: 'link',
          linkKind: 'cta',
        },
      },
    },
    regionSelect: {},
  } as NetworkMapSectionProps,
};

const pageData = {
  sections,
};

export function getEnabledNetworkMap(networkMapCoverageData: GetNetworkMapDataResponse, { iot }: NetworkMapData) {
  const networkMap = { ...sections.networkMap };
  const servicesList = Object.keys(networkMap.filters.services);

  servicesList.forEach((key) => {
    const service = key as NetworkMapService;

    networkMap.filters.services[service].enabledMap = networkMapCoverageData.reduce((acc, { id, services }) => {
      let coverage = services[service];

      if (service === 'iot' && iot && coverage) {
        // if iot is empty for id, it will be undefined. That means no coverage and that's intended
        (coverage as GetNetworkMapDataResponse[number]['services']['iot']) = iot[id];
      }

      for (const feature in coverage) {
        const typeSet = coverage[feature as keyof typeof coverage];

        for (const support in typeSet as object) {
          if (typeSet[support]) {
            const featureList = [...(acc[support]?.[id] || [])];

            acc[support] = {
              ...acc[support],
              [id]: featureList.includes(feature) ? featureList : [...featureList, feature],
            };
          }
        }
      }

      return acc;
    }, networkMap.filters.services[service].enabledMap);
  });

  return networkMap;
}

export default pageData;
