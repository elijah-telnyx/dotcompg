import type { IoTSIMCardCalculatorApiResponse } from 'pages/api/pricing/iot-sim-card-calculator';
import Heading from 'ui/components/Typography/Heading';
import Paragraph from 'ui/components/Typography/Paragraph';
import CtaButton, { type CTAButtonProps } from 'ui/components/CtaButton';
import { getCountryByAlpha2 } from 'utils/countries.data';
import * as css from './Pricing.styled';
import { calculateDataUsagePrice, formatCurrency, formatNumber, normalizePriceTiers } from './utils';

export interface PricingProps {
  ctas: CTAButtonProps[];
  apiData: IoTSIMCardCalculatorApiResponse['data'];
  countryZone: number;
  values: {
    numberOfSIMCards: number;
    publicIP: boolean;
    numberOfMBPerMonth: number;
    country: string;
  };
}

const hasCustomPricing = ({ numberOfSIMCards, numberOfMBPerMonth }: Partial<PricingProps['values']>) => {
  const MIN_FOR_CUSTOM_PRICING = {
    numberOfSIMCards: 500,
    numberOfMBPerMonth: 5000,
  };

  if (!numberOfSIMCards || !numberOfMBPerMonth) return false;

  if (numberOfSIMCards > MIN_FOR_CUSTOM_PRICING.numberOfSIMCards) {
    return true;
  }
  if (numberOfMBPerMonth * numberOfSIMCards > MIN_FOR_CUSTOM_PRICING.numberOfMBPerMonth) {
    return true;
  }

  return false;
};

const Pricing = ({
  values: { numberOfSIMCards, publicIP, numberOfMBPerMonth, country },
  countryZone,
  apiData,
  ctas,
}: PricingProps) => {
  const simCardMonthlyFee = numberOfSIMCards * Number(apiData['WIRELESS-SIM-MRC'].amount);
  const publicIPMonthlyFee = publicIP ? numberOfSIMCards * Number(apiData['WIRELESS-IP-MRC'].amount) : 0;
  const priceTiers = apiData[`WIRELESS-ZONE-${countryZone}-USAGE`].tiers;
  const normalizedPriceTiers = normalizePriceTiers(priceTiers);
  const dataUsagePrice = numberOfSIMCards * calculateDataUsagePrice(numberOfMBPerMonth, normalizedPriceTiers);
  const countryName = getCountryByAlpha2(country)?.name || country;

  if (hasCustomPricing({ numberOfSIMCards, numberOfMBPerMonth })) {
    return (
      <css.Root>
        <Heading level={2} htmlAs='p'>
          You qualify for custom pricing!
        </Heading>
        <Paragraph>Please contact our sales team who will be happy to discuss discounted rates.</Paragraph>
        {ctas && (
          <css.ButtonRow>
            {ctas.map((cta) => (
              <CtaButton {...cta} key={cta.href} />
            ))}
          </css.ButtonRow>
        )}
      </css.Root>
    );
  }

  return (
    <css.Root>
      <div>
        <Heading level={1} htmlAs='p'>
          {formatCurrency(simCardMonthlyFee + publicIPMonthlyFee + dataUsagePrice)}
        </Heading>

        <Heading level={2} htmlAs='strong' category>
          Monthly estimated costs
        </Heading>
      </div>
      <Paragraph>
        For {formatNumber(numberOfSIMCards)} SIM cards, {formatNumber(numberOfMBPerMonth)}MB per month in {countryName}.
        This cost includes the monthly SIM card activation fee and monthly data usage.
      </Paragraph>
      <Paragraph>
        There&apos;s also a small one-off fee for the physical SIM card and shipping if you&apos;re outside the US
        mainland.
      </Paragraph>
      {ctas && (
        <css.ButtonRow>
          {ctas.map((cta) => (
            <CtaButton {...cta} key={cta.href} />
          ))}
        </css.ButtonRow>
      )}
    </css.Root>
  );
};

export default Pricing;
