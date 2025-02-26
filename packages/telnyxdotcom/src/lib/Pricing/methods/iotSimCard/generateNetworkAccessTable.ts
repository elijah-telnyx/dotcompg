import type * as T from 'lib/Pricing/@types';
import type { MobileNetworkOperator } from 'lib/Pricing/api';
import { generateBody, generateHead } from 'lib/Pricing/utils';

export const generateNetworkAccessTable = ({
  countryName,
  networkOperators: mobileNetworkOperators,
}: {
  countryName: string;
  networkOperators: Pick<MobileNetworkOperator, 'name' | 'mcc' | 'mnc'>[];
}): T.TablesSectionTableProps<3> => {
  return {
    columns: 3,
    caption: `Network access in ${countryName}`,
    head: generateHead([{ label: 'CARRIER' }, { label: 'MCC' }, { label: 'MNC' }]),
    body: generateBody<3>(
      mobileNetworkOperators
        .map(({ name, mcc, mnc }) => ({
          label: name,
          value: [mcc, mnc],
        }))
        .sort((a, b) => a.label.localeCompare(b.label))
    ),
  };
};
