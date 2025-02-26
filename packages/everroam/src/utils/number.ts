import {
  DEFAULT_CURRENCY_CODE,
  DEFAULT_CURRENCY_RATE,
} from "./currencies/constants";

export const currencyFormatter = ({
  currency = DEFAULT_CURRENCY_CODE,
  amount,
  rate = DEFAULT_CURRENCY_RATE,
  ...options
}: {
  amount: string | number;
  rate?: string;
} & Intl.NumberFormatOptions) => {
  const { format } = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    // Override default localized currency format,
    // which would take care of digit precision,
    // and allow for fractional amounts like "0.00012"
    // instead of "0.00".
    maximumSignificantDigits: 2,
    // Override default options:
    ...options,
  });

  if (rate) {
    return format(Number(amount) * Number(rate));
  }

  return format(Number(amount));
};

export const compactNumber = (number: number) => {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  }).format(number);
};
