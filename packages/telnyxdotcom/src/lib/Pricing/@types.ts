import type * as CC from './cost_codes';
import type { fetchPrice, FetchPriceParams } from './api';
import type { SUPPORTED_COUNTRIES } from 'utils/countries/constants';
import type { SUPPORTED_CURRENCIES } from 'utils/currencies/constants';
import type { TablesSectionProps, TablesSectionTableProps, TableWithTabsProps } from 'ui/components/TablesSection';

export type { TablesSectionProps, TablesSectionTableProps, TableWithTabsProps };
export type { MessagingCarrierTable } from './api';

export type CostCodes = (typeof CC)[keyof typeof CC];
export type SupportedCountry = (typeof SUPPORTED_COUNTRIES)[number];
export type SupportedCurrency = (typeof SUPPORTED_CURRENCIES)[number];
export type Tiers = {
  max: number | null;
  amount: string;
  min: number;
};

export type PricePageFetchParams = FetchPriceParams & { countryName?: string };

export type GetTablesDataByCurrencyResponse = Record<SupportedCurrency, TablesSectionProps['data'][number]>;

export type PricingPage =
  | 'elastic-sip'
  | 'call-control'
  | 'messaging'
  | 'numbers'
  | 'iot-data-plans'
  | 'fax'
  | 'networking'
  | 'number-lookup'
  | 'storage'
  | 'verify-api'
  | 'video-api';

export type PricingData = Awaited<ReturnType<typeof fetchPrice>>;
