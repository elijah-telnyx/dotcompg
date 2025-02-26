import Api from 'lib/Api';

import * as CC from 'lib/Pricing/cost_codes';
import type * as T from 'lib/Pricing/@types';
import type { TablesSectionTableProps } from 'lib/Pricing/@types';

import {
  addCountryToCostCode,
  currencyFormatTo,
  generateBody,
  generateHead,
  getTablesDataByCurrency,
} from 'lib/Pricing/utils';
import {
  fetchMessagingCarriers,
  fetchPrice,
  fetchMessagingAlphanumericPrices,
  fetchExchangeRates,
  type ApiCostCode,
} from 'lib/Pricing/api';
import type { TableWithTabsProps } from 'ui/components/TablesSection/Tables/TableWithTabs';
import { isEmptyObject } from 'utils/isEmptyObject';
import { countriesWithAlphanumericAndLocalNumbers } from 'utils/countries.data';
import { compactNumber } from 'utils/number';
import { DEFAULT_COUNTRY_ALPHA2 } from 'utils/countries/constants';
import { DEFAULT_CURRENCY_CODE } from 'utils/currencies/constants';
import { PRICING_CURRENCIES } from '../currencies';

const isCountryCodeLocal = (countryCode: string) => countryCode === DEFAULT_COUNTRY_ALPHA2 || countryCode === 'CA';

type CC_MAP = Record<'TERMINATION' | 'ORIGINATION', Record<'SMS' | 'MMS', T.CostCodes>>;
type ProductType = 'local' | 'tollFree' | 'shortCode' | 'longCode' | 'alphanumeric';

export const fetchMessagingPricing = async (
  params: T.PricePageFetchParams = {}
): Promise<T.TablesSectionProps['data']> => {
  const { currency = DEFAULT_CURRENCY_CODE, countryCode = DEFAULT_COUNTRY_ALPHA2 } = params;
  const prefix = addCountryToCostCode(countryCode);

  const isLocalCountry = isCountryCodeLocal(countryCode);
  const useAlphanumericAndLocal = Boolean(
    countriesWithAlphanumericAndLocalNumbers.find(
      (country) => country?.alpha2.toUpperCase() === countryCode.toUpperCase()
    )
  );

  const LOCAL_CC: CC_MAP = {
    TERMINATION: {
      SMS: countryCode === 'CA' ? CC.SMS_RATE0_TERMINATION : prefix(CC.SMS_RATE0_TERMINATION, true),
      MMS: countryCode === 'CA' ? CC.MMS_RATE0_TERMINATION : prefix(CC.MMS_RATE0_TERMINATION),
    },
    ORIGINATION: {
      SMS: prefix(CC.SMS_RATE0_ORIGINATION, true),
      MMS: countryCode === 'CA' ? CC.MMS_RATE0_ORIGINATION : prefix(CC.MMS_RATE0_ORIGINATION),
    },
  };

  const TOLL_FREE_CC: CC_MAP = {
    TERMINATION: {
      SMS: countryCode === 'CA' ? CC.TF_SMS_RATE0_TERMINATION : prefix(CC.TF_SMS_RATE0_TERMINATION),
      MMS: countryCode === 'CA' ? CC.TF_MMS_RATE0_TERMINATION : prefix(CC.TF_MMS_RATE0_TERMINATION),
    },
    ORIGINATION: {
      SMS: countryCode === 'CA' ? CC.TF_SMS_RATE0_ORIGINATION : prefix(CC.TF_SMS_RATE0_ORIGINATION),
      MMS: countryCode === 'CA' ? CC.TF_MMS_RATE0_ORIGINATION : prefix(CC.TF_MMS_RATE0_ORIGINATION),
    },
  };

  const SHORT_CODE_CC: CC_MAP = {
    TERMINATION: { SMS: prefix(CC.SHORT_CODE_SMS_TERMINATION), MMS: prefix(CC.SHORT_CODE_MMS_TERMINATION) },
    ORIGINATION: { SMS: prefix(CC.SHORT_CODE_SMS_ORIGINATION), MMS: prefix(CC.SHORT_CODE_MMS_ORIGINATION) },
  };

  const LONG_CODE_CC: CC_MAP = {
    TERMINATION: { SMS: prefix(CC.LC_SMS_RATE0_TERMINATION), MMS: prefix(CC.LC_MMS_RATE0_TERMINATION) },
    ORIGINATION: { SMS: prefix(CC.LC_SMS_RATE0_ORIGINATION), MMS: prefix(CC.LC_MMS_RATE0_ORIGINATION) },
  };

  const cost_codes: Record<string, T.CostCodes[]> = {
    usOrCa: [
      LOCAL_CC.ORIGINATION.SMS,
      LOCAL_CC.TERMINATION.SMS,
      LOCAL_CC.TERMINATION.MMS,
      LOCAL_CC.ORIGINATION.MMS,

      TOLL_FREE_CC.TERMINATION.SMS,
      TOLL_FREE_CC.ORIGINATION.SMS,
      TOLL_FREE_CC.ORIGINATION.MMS,
      TOLL_FREE_CC.TERMINATION.MMS,

      SHORT_CODE_CC.TERMINATION.SMS,
      SHORT_CODE_CC.ORIGINATION.SMS,
      SHORT_CODE_CC.ORIGINATION.MMS,
      SHORT_CODE_CC.TERMINATION.MMS,
    ],
    other: [
      LOCAL_CC.ORIGINATION.SMS,
      LOCAL_CC.TERMINATION.SMS,

      TOLL_FREE_CC.TERMINATION.SMS,
      TOLL_FREE_CC.ORIGINATION.SMS,

      LONG_CODE_CC.TERMINATION.SMS,
      LONG_CODE_CC.ORIGINATION.SMS,
      LONG_CODE_CC.TERMINATION.MMS,
      LONG_CODE_CC.ORIGINATION.MMS,
    ],
  };

  return Api.all([
    fetchPrice({
      cost_codes: isLocalCountry ? cost_codes.usOrCa : cost_codes.other,
      currency,
    }),
    isLocalCountry ? fetchMessagingCarriers({ currency, countryCode }) : undefined,
    !isLocalCountry ? fetchMessagingAlphanumericPrices({ currency, countryCode }) : undefined,
    fetchExchangeRates({ currency, targetCurrencies: PRICING_CURRENCIES.messaging }),
  ]).then(([pricingData, carriers, alphanumericData, exchangeRateData]) => {
    function generateTables(targetCurrency: T.SupportedCurrency): T.TableWithTabsProps[] {
      const formatToCurrency = currencyFormatTo(targetCurrency, exchangeRateData.rates[targetCurrency]);

      const termination = {
        local: {
          sms: pricingData[LOCAL_CC.TERMINATION.SMS],
          mms: pricingData[LOCAL_CC.TERMINATION.MMS],
        },
        tollFree: { sms: pricingData[TOLL_FREE_CC.TERMINATION.SMS], mms: pricingData[TOLL_FREE_CC.TERMINATION.MMS] },
        shortCode: { sms: pricingData[CC.SHORT_CODE_SMS_TERMINATION], mms: pricingData[CC.SHORT_CODE_MMS_TERMINATION] },
        longCode: { sms: pricingData[LONG_CODE_CC.TERMINATION.SMS], mms: pricingData[LONG_CODE_CC.TERMINATION.MMS] },
        alphanumeric: { sms: getLowestValueFromList(alphanumericData), mms: null },
      };

      const origination = {
        local: { sms: pricingData[LOCAL_CC.ORIGINATION.SMS], mms: pricingData[LOCAL_CC.ORIGINATION.MMS] },
        tollFree: { sms: pricingData[TOLL_FREE_CC.ORIGINATION.SMS], mms: pricingData[TOLL_FREE_CC.ORIGINATION.MMS] },
        shortCode: { sms: pricingData[SHORT_CODE_CC.ORIGINATION.SMS], mms: pricingData[SHORT_CODE_CC.ORIGINATION.MMS] },
        longCode: { sms: pricingData[LONG_CODE_CC.ORIGINATION.SMS], mms: pricingData[LONG_CODE_CC.ORIGINATION.MMS] },
        alphanumeric: { sms: null, mms: null },
      };

      const formatCarrierValue = ({ sms, mms }: Record<'sms' | 'mms', { carrier_fee: string }>) => {
        return [sms?.carrier_fee, mms?.carrier_fee].map((amount) => {
          if (!Number(amount)) return 'No carrier fee';
          return `${formatToCurrency(amount)} per message part`;
        });
      };
      const formatToCurrencyWith4Decimals = (amount: string) =>
        formatToCurrency(amount, {
          minimumFractionDigits: 4,
          maximumSignificantDigits: undefined,
        });

      const validateCarriers = () => {
        if (!carriers) return false;
        return Object.values(carriers).some((values) => {
          return Object.values(values).some((carrier) => isEmptyObject(carrier));
        });
      };

      const generate = {
        tableBodyByType: (value: ProductType) => {
          const hasCarriers = value === 'alphanumeric' || !validateCarriers();

          const terminationCarrierFeeText = hasCarriers ? '' : ` + [carrier fee](#${value}-outbound-carriers)`;
          const originationCarrierFeeText = hasCarriers ? '' : ` + [carrier fee](#${value}-inbound-carriers)`;
          const isLongCodeTab = value === 'longCode';

          if (isLongCodeTab) {
            return generateBody<3>([
              {
                label: 'Send outbound messages',
                value: Object.entries(termination[value]).map(([type, value]) => {
                  if (type === 'mms') return 'N/A';
                  return `${formatToCurrency(value.amount)} per message part${terminationCarrierFeeText}`;
                }),
              },
              {
                label: 'Receive inbound messages',
                value: Object.entries(origination[value]).map(([type, value]) => {
                  if (type === 'mms') return 'N/A';
                  return `${formatToCurrency(value.amount)} per message part${originationCarrierFeeText}`;
                }),
              },
            ]);
          }
          return generateBody<3>([
            {
              label: 'Send outbound messages',
              value: Object.entries(termination[value]).map(([type, value]) => {
                if (!value?.amount) return 'N/A';
                return `${formatToCurrency(value.amount)} per message part${terminationCarrierFeeText}`;
              }),
            },
            {
              label: 'Receive inbound messages',
              value: Object.entries(origination[value]).map(([type, value]) => {
                if (!value?.amount) return 'N/A';
                return `${formatToCurrency(value.amount)} per message part${originationCarrierFeeText}`;
              }),
            },
          ]);
        },
        footer: (product: 'tollFree' | 'local' | 'shortCode' | 'longCode') => {
          const showInnerTables =
            (countryCode === DEFAULT_COUNTRY_ALPHA2 || countryCode === 'CA') && product !== 'tollFree';
          const servicesData: Required<TablesSectionTableProps>['footer']['data'] = [
            {
              value: `Prices are applied per message part. [Learn more](#faq-messaging) about character limits and message parts.`,
            },
          ];
          const innerTables: { data?: T.TablesSectionTableProps['innerTables'] } = {};
          if (showInnerTables) {
            servicesData.push({
              value: `Send or receive more than ${compactNumber(
                Number(termination[product].sms.tiers[0].max)
              )} messages per month and automatically receive a discount.`,
              toggleButton: {
                label: {
                  close: 'View details',
                  open: 'Hide details',
                },
                innerTableId: 'discounted-messaging-pricing',
              },
            });

            innerTables.data = {
              containerId: 'discounted-messaging-pricing',
              tables: [
                {
                  id: 'discounted-outbound-messaging-pricing-table',
                  columns: 3,
                  caption: 'Discounted outbound messaging pricing',
                  head: generateHead([{ label: 'Quantity per month' }, { label: 'SMS' }, { label: 'MMS' }]),
                  body: generateBody<3>(generate.tiers(termination[product])),
                },
                {
                  id: 'discounted-inbound-messaging-pricing-table',
                  columns: 3,
                  caption: 'Discounted inbound messaging pricing',
                  head: generateHead([{ label: 'Quantity per month' }, { label: 'SMS' }, { label: 'MMS' }]),
                  body: generateBody<3>(generate.tiers(origination[product])),
                },
              ],
            };
          }

          return {
            footer: {
              id: 'services-footer',
              data: servicesData,
            },
            ...(showInnerTables && { innerTables: innerTables.data }),
          };
        },
        tiers: (product: Record<'sms' | 'mms', ApiCostCode>) => {
          /**
           * sms and mms have different starting minimum values for discounts
           * here we order by the starting point from one tier to the order and
           * use that as the key to map these values
           */
          const orderValues = () => {
            return [1, 2, 3, 4].reduce((final, index) => {
              const { sms, mms } = product;
              const smsTier = sms?.tiers[index];
              const mmsTier = mms?.tiers[index];

              const smsMinMaxDiff = smsTier && Math.abs(Number(smsTier?.max) - Number(smsTier?.min));
              const mmsMinMaxDiff = mmsTier && Math.abs(Number(mmsTier?.max) - Number(mmsTier?.min));
              if (smsMinMaxDiff) {
                if (!final[smsMinMaxDiff]) final[smsMinMaxDiff] = [undefined, undefined];
                final[smsMinMaxDiff][0] = sms.tiers[index];
              }
              if (mmsMinMaxDiff) {
                if (!final[mmsMinMaxDiff]) final[mmsMinMaxDiff] = [undefined, undefined];
                final[mmsMinMaxDiff][1] = mms.tiers[index];
              }

              return final;
            }, {} as Record<string, (ApiCostCode['tiers'][0] | undefined)[]>);
          };

          const orderedValues = Object.entries(orderValues()).map(([difference, value]) => {
            return {
              label: `Next ${compactNumber(Number(difference))} messages per month`,
              value: value.map((v) => (v ? `${formatToCurrencyWith4Decimals(v?.amount)} per message part` : '-')),
            };
          });

          return orderedValues;
        },
        carrierFeeTablesByProduct: (product: ProductType): TablesSectionTableProps[] => {
          if (!carriers || !validateCarriers()) {
            return [];
          }
          const otherLabel = 'All other carriers';

          const generateCarrierBody = (type: 'origination' | 'termination') => {
            //@ts-ignore
            const productMap: Record<ProductType, T.MessagingCarrierTable['product']> = {
              local: 'long_code',
              shortCode: 'short_code',
              tollFree: 'toll_free',
            };

            const body = generateBody<3>([
              ...Object.entries(carriers[productMap[product]][type])
                .filter(([label]) => label !== 'other')
                .map(([label, value]) => {
                  return {
                    label: label,
                    value: formatCarrierValue(value),
                  };
                })
                .sort((carrier1, carrier2) => {
                  const carrier1Name = carrier1.label.toUpperCase();
                  const carrier2Name = carrier2.label.toUpperCase();
                  if (carrier1Name < carrier2Name) return -1;
                  if (carrier1Name > carrier2Name) return 1;
                  return 0;
                }),
              // make sure "other" go at the bottom row
              { label: otherLabel, value: formatCarrierValue({ ...carriers[productMap[product]][type].other }) },
            ]);
            return body.length
              ? body
              : generateBody([{ label: otherLabel, value: ['No carrier fee', 'No carrier fee'] }]);
          };

          const outboundBody = generateCarrierBody('termination');
          const inboundBody = generateCarrierBody('origination');

          return [
            {
              columns: 3,
              caption: 'Carrier fees for outbound messages',
              id: `${product}-outbound-carriers`,
              head: generateHead([{ label: 'Carrier' }, { label: 'SMS' }, { label: 'MMS' }]),
              body: outboundBody,
            },
            {
              columns: 3,
              caption: 'Carrier fees for inbound messages',
              id: `${product}-inbound-carriers`,
              head: generateHead([{ label: 'Carrier' }, { label: 'SMS' }, { label: 'MMS' }]),
              body: inboundBody,
            },
          ];
        },
      };

      const GENERATE_LOCAL_TAB = (): TableWithTabsProps['tabs'][number] => {
        return {
          label: `Local ${isLocalCountry ? ' inc. 10DLC' : ''}`,
          tables: [
            {
              columns: 3,
              caption: 'Services',
              head: generateHead([{ label: 'Direction' }, { label: 'SMS' }, { label: 'MMS' }]),
              body: generate.tableBodyByType('local'),
              ...generate.footer('local'),
            },
            ...generate.carrierFeeTablesByProduct('local'),
          ],
        };
      };

      const GENERATE_TOLL_FREE_TAB = (): TableWithTabsProps['tabs'][number] => {
        return {
          label: 'Toll-Free',
          tables: [
            {
              columns: 3,
              caption: 'Services',
              head: generateHead([{ label: 'Direction' }, { label: 'SMS' }, { label: 'MMS' }]),
              body: generate.tableBodyByType('tollFree'),
              ...generate.footer('tollFree'),
            },
            ...generate.carrierFeeTablesByProduct('tollFree'),
          ],
        };
      };

      const GENERATE_SHORT_CODE_TAB = (): TableWithTabsProps['tabs'][number] => {
        return {
          label: 'Short Code',
          tables: [
            {
              columns: 3,
              caption: 'Services',
              head: generateHead([{ label: 'Direction' }, { label: 'SMS' }, { label: 'MMS' }]),
              body: generate.tableBodyByType('shortCode'),
              ...generate.footer('shortCode'),
            },
            ...generate.carrierFeeTablesByProduct('shortCode'),
          ],
        };
      };

      const GENERATE_LONG_CODE_TAB = (): TableWithTabsProps['tabs'][number] => {
        return {
          label: 'Long Code',
          tables: [
            {
              columns: 3,
              caption: 'Services',
              head: generateHead([{ label: 'Direction' }, { label: 'SMS' }, { label: 'MMS' }]),
              body: generate.tableBodyByType('longCode'),
              ...generate.footer('longCode'),
            },
            ...generate.carrierFeeTablesByProduct('longCode'),
          ],
        };
      };

      const GENERATE_ALPHANUMERIC_TAB = (): TableWithTabsProps['tabs'][number] => {
        return {
          label: 'Alphanumeric Sender ID',
          tables: [
            {
              columns: 3,
              caption: 'Alphanumeric Sender ID',
              head: generateHead([{ label: 'Direction' }, { label: 'SMS' }, { label: 'MMS' }]),
              body: generate.tableBodyByType('alphanumeric'),
            },
          ],
        };
      };

      const longCodeCountryCodes = ['IE', 'MX', 'ZA'];

      const tabs = [];
      if (isLocalCountry || useAlphanumericAndLocal) {
        tabs.push(GENERATE_LOCAL_TAB());
      }
      if (longCodeCountryCodes.includes(countryCode)) tabs.push(GENERATE_LONG_CODE_TAB());
      if (checkCostCodesData(termination.tollFree) && checkCostCodesData(origination.tollFree)) {
        tabs.push(GENERATE_TOLL_FREE_TAB());
      }
      if (countryCode === DEFAULT_COUNTRY_ALPHA2) {
        tabs.push(GENERATE_SHORT_CODE_TAB());
      }
      if (alphanumericData) {
        tabs.push(GENERATE_ALPHANUMERIC_TAB());
      }

      return [
        {
          caption: 'SENDER types',
          tabs,
        },
      ];
    }

    return getTablesDataByCurrency(PRICING_CURRENCIES.messaging, generateTables);
  });
};

const checkCostCodesData = (type: Record<string, ApiCostCode>, condition = Boolean) => {
  const arr = Object.values(type);
  return arr.some(condition);
};

const getLowestValueFromList = (values?: { amount: number }[]) => {
  return values && values.sort((a, b) => a.amount - b.amount)[0];
};
