import type { PricingPage, SupportedCurrency } from './@types';

export const PRICING_CURRENCIES = {
  'elastic-sip': ['USD', 'EUR'],
  'call-control': ['USD', 'EUR'],
  messaging: ['USD', 'EUR'],
  numbers: ['USD', 'EUR'],
  'iot-data-plans': ['USD', 'EUR'],
  fax: ['USD', 'EUR'],
  networking: ['USD', 'EUR'],
  'number-lookup': ['USD', 'EUR'],
  storage: ['USD', 'EUR'],
  'verify-api': ['USD', 'EUR'],
  'video-api': ['USD', 'EUR'],
  'global-edge-router': ['USD', 'EUR'],
  'inference-api': ['USD', 'EUR'],
} as Record<PricingPage, SupportedCurrency[]>;
