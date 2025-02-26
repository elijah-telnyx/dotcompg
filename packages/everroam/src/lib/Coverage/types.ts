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
