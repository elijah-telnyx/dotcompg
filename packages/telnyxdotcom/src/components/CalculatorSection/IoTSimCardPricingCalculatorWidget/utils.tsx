import type { NonNullableProperties } from 'utils/types';

const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

/*
 * The data we get from the api is in bytes
 * but the support page for this calculation
 * uses MB and also assumes that 1GB is 1000MB,
 * so in order to give a result more inline with
 * the support page, we need to normalize the
 * data amounts.
 *
 * https://support.telnyx.com/en/articles/3296669-programmable-wireless-pricing
 */
function parseDataAmount(bytes: number | null) {
  if (bytes === null) {
    return null;
  }

  const mb = bytes / 1024 / 1024;

  if (mb <= 1000) {
    return mb;
  }

  return (mb / 1024) * 1000;
}

export const formatCurrency = currencyFormatter.format.bind(currencyFormatter);

export const formatNumber = (value: number) => value.toLocaleString('en-US');

export const normalizePriceTiers = (
  tiers: {
    amount: string;
    max: number | null;
    min: number | null;
  }[]
) => {
  return tiers.map(({ amount, max, min }) => ({
    amount: parseFloat(amount),
    max: parseDataAmount(max),
    min: parseDataAmount(min),
  }));
};

export const calculateDataUsagePrice = (
  usageInMB: number,
  priceTiers: { amount: number; min: number | null; max: number | null }[]
) => {
  let totalPrice = 0;
  let remaining = usageInMB;

  for (const tier of priceTiers) {
    if (tier.max !== null && usageInMB > tier.max) {
      const tierUsage = tier.max - (tier.min || 0);
      remaining -= tierUsage;
      totalPrice += tierUsage * tier.amount;
    } else {
      totalPrice += remaining * tier.amount;
      break;
    }
  }

  return totalPrice;
};

export function ensureNonNullableProperties<T>(obj: T) {
  for (const key in obj) {
    if (obj[key] === null || typeof obj[key] === 'undefined') {
      return undefined;
    }
  }

  return obj as NonNullableProperties<T>;
}
