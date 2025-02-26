import type { NetworkMapSectionProps } from 'ui/components/NetworkMapSection';
import type { ProductFamily } from 'ui/components/NetworkMapSection/utils';

export type { NetworkMapSectionProps };

export type Communication = 'Local' | 'Toll-free' | 'National' | 'VoIP';
export type IoT = string; // carriers like AT&T, Verizon, etc, so many, we can't list them all
export type Networking = 'Storage' | 'Cloud VPN' | 'VXCs' | 'Telephony' | 'AI';
export type Compute = 'Telnyx Bare Metal';

export type GetNetworkMapDataResponse = {
  id: string;
  name: string;
  region: string;
  services: {
    communications?: {
      [key in Communication]: {
        'Inbound Calling': boolean;
        'Local Calling': boolean;
        'Emergency Calling': boolean;
        'Fax support': boolean;
        'Number Portability': boolean;
        'Full PSTN Replacement': boolean;
        '2 Way Sms': boolean;
      };
    };
    iot?: {
      [key in IoT]: {
        // @TODO: make these keys an enum
        '5G': boolean;
        '4G (LTE)': boolean;
        '3G': boolean;
        'LTE-M': boolean;
        'NB-IoT': boolean;
        'Pricing Zone': string;
      };
    };
    networking?: {
      [key in Networking]: {
        'Core PoP': boolean;
        'Edge PoP': boolean;
      };
    };
    compute?: {
      [key in Compute]: {
        'Cloud storage': boolean;
      };
    };
  };
}[];

export type NetworkMapService = keyof NetworkMapSectionProps['filters']['services'];
export type NetworkMapEnableMap = NetworkMapSectionProps['filters']['services'][ProductFamily]['enabledMap'];

type CountryCode = string;
type PhoneNumberType = 'local' | 'toll_free' | 'mobile' | 'national' | 'shared_cost';

interface RequirementsType {
  id: string;
  name: string;
  type: string;
  description: string;
  record_type: string;
  updated_at: string;
  created_at: string;
  acceptance_criteria: {
    max_length: null;
    regex: null;
    case_sensitive: true;
    acceptable_characters: null;
    acceptable_values: [];
    min_length: null;
    time_limit: string;
    locality_limit: null;
  };
  example: string;
}

export interface RequirementsCoverage {
  id: string;
  record_type: string;
  action: string;
  updated_at: string;
  created_at: string;
  country_code: CountryCode;
  locality: null;
  phone_number_type: PhoneNumberType;
  provider: null;
  requirement_types: RequirementsType[];
}

export type PhoneFeature = 'emergency' | 'sms' | 'mms' | 'local_calling' | 'voice' | 'fax';

export type PhoneServiceConfig = {
  features: PhoneFeature[];
  reservable: boolean;
  quickship: boolean;
  international_sms: boolean;
  p2p: boolean;
};

export type CountryPhoneConfig = {
  code: string;
  numbers: boolean;
  features: PhoneFeature[];
  phone_number_type: PhoneNumberType[];
  reservable: boolean;
  quickship: boolean;
  international_sms: boolean;
  p2p: boolean;
  local: Partial<PhoneServiceConfig>;
  toll_free: Partial<PhoneServiceConfig>;
  mobile: Partial<PhoneServiceConfig>;
  national: Partial<PhoneServiceConfig>;
  shared_cost?: Partial<PhoneServiceConfig>;
  inventory_coverage: boolean;
};

type CountryName = string;
export type CountryCoverage = Record<CountryName, CountryPhoneConfig>;

export type NumberType = keyof Pick<CountryPhoneConfig, 'local' | 'toll_free' | 'mobile' | 'national' | 'shared_cost'>;

export type PSTNCoverage = {
  country: string;
  number_type: NumberType;
  full_pstn_replacement: boolean;
};
