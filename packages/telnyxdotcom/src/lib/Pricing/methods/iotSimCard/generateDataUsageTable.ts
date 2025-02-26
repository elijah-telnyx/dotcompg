import type * as T from 'lib/Pricing/@types';
import { currencyFormatTo, formatDataRange, generateBody } from 'lib/Pricing/utils';

const currencyConfig = {
  minimumFractionDigits: 4,
  maximumSignificantDigits: undefined,
};

const orderByMinimumTierValue = (t1: T.Tiers, t2: T.Tiers) => (t1.min < t2.min ? -1 : 1);

const generateDataUsageTable = ({
  formatToCurrency,
  pricingData,
  countryZone,
  countryName,
}: {
  formatToCurrency: ReturnType<typeof currencyFormatTo>;
  pricingData: T.PricingData;
  countryZone: string;
  countryName: string;
}): T.TablesSectionTableProps => {
  const wirelessZoneList = (zone: string) => {
    const tier: T.Tiers[] = pricingData[`WIRELESS-ZONE-${zone}-USAGE` as keyof typeof pricingData].tiers;
    return tier.sort(orderByMinimumTierValue).map((tier, index) => {
      return {
        label: {
          value: `Tier ${index + 1}`,
          typographyType: 'Heading' as const,
        },
        value: [formatDataRange(tier.min, tier.max), `${formatToCurrency(tier.amount, currencyConfig)} per MB`],
      };
    });
  };

  return {
    columns: 3,
    id: 'data-usage',
    caption: `Data Usage in ${countryName} - Zone ${countryZone}`,
    copy: "Data usage is an additional cost to the charges above. The data usage charge is based on the amount of data used and the location (zone) in which the SIM is in use. The more data you use, the less you'll pay.",
    body: generateBody<3>(wirelessZoneList(countryZone)),
    footer: {
      data: [
        {
          value:
            '[View a full cost breakdown](https://support.telnyx.com/en/articles/3296669-programmable-wireless-pricing) of data usage, mapping of each country to their relevant zone.',
        },
      ],
    },
  };
};

export default generateDataUsageTable;
