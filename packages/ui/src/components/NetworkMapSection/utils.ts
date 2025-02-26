import { slugify } from '../../utils/slugify';
import { type CTAButtonProps } from '../CtaButton';
import { type SelectProps } from '../Select';

export const HERO_NETWORK_MAP_SECTION_ID = 'network-map-section';

export const ProductFamilyOptions = {
  communications: {
    name: 'Communications',
    value: 'communications',
  },
  iot: {
    name: 'IoT',
    value: 'iot',
  },
  networking: {
    name: 'Networking',
    value: 'networking',
  },
  compute: {
    name: 'Compute',
    value: 'compute',
  },
} as const;

export type ProductFamily = keyof typeof ProductFamilyOptions;

export const RegionOptions = {
  all: {
    name: 'All',
    value: 'all',
  },
  na: {
    name: 'North America',
    value: 'na',
  },
  eu: {
    name: 'Europe',
    value: 'eu',
  },
  as: {
    name: 'Asia',
    value: 'as',
  },
  sa: {
    name: 'South America',
    value: 'sa',
  },
  af: {
    name: 'Africa',
    value: 'af',
  },
  oc: {
    name: 'Oceania',
    value: 'oc',
  },
} as const;

export type Region = keyof typeof RegionOptions;

export const FILTER_FAMILY_OPTIONS: SelectProps = {
  triggerLabel: 'Filter by product family',
  placeholder: 'Product Family',
  items: [
    ProductFamilyOptions.communications,
    ProductFamilyOptions.iot,
    ProductFamilyOptions.networking,
    ProductFamilyOptions.compute,
  ],
};

export const FILTER_REGION_OPTIONS: SelectProps = {
  triggerLabel: 'Filter by region',
  placeholder: 'Region',
  items: [
    RegionOptions.all,
    RegionOptions.na,
    RegionOptions.eu,
    RegionOptions.as,
    RegionOptions.sa,
    RegionOptions.af,
    RegionOptions.oc,
  ],
};

export const FILTER_CTA_LINK_ICON: CTAButtonProps['linkIcon'] = {
  src: '',
  svg: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">\n        <g clip-path="url(#clip0_2558_1236)">\n            <path d="M1 9L-4.37114e-08 9L4.37114e-08 11L1 11L1 9ZM1 11L13 11L13 9L1 9L1 11Z" fill="currentColor"/>\n            <path d="M19.2111 9.10557C19.9482 9.4741 19.9482 10.5259 19.2111 10.8944L12.4472 14.2764C11.7823 14.6088 11 14.1253 11 13.382L11 6.61803C11 5.87465 11.7823 5.39116 12.4472 5.72361L19.2111 9.10557Z" fill="currentColor"/>\n        </g>\n        <defs>\n            <clipPath id="clip0_2558_1236">\n                <rect width="20" height="20" fill="white"/>\n            </clipPath>\n        </defs>\n    </svg>',
  alt: 'check',
};

export function getFamilyOptionFromQuery(
  familyQuery: string | string[] | undefined
): ProductFamily {
  const familyOption = FILTER_FAMILY_OPTIONS['items'][0][
    'value'
  ] as ProductFamily;

  const family = familyQuery?.toString() as ProductFamily;

  if (ProductFamilyOptions[family]) {
    return ProductFamilyOptions[family]['value'];
  }

  return familyOption;
}

export function getServiceOptionFromQuery(
  serviceQuery: string | string[] | undefined,
  filter: SelectProps & { value: string }
): string {
  const service = serviceQuery?.toString();

  const selectedItem = filter.items.find(
    (item) => slugify(item.value) === service
  );

  if (selectedItem) {
    return selectedItem.value;
  }

  return filter.value;
}
