import type { AvailableNumbers } from 'pages/api/available-numbers';
import { getFormattedNumber, formatCurrency, formatNumType, getLocationFromRegion } from '../utils';
import AvailableNumbersIcons from './AvailableNumbersIcons';
import Button from 'ui/components/Button';
import { External } from 'ui/components/Icons';
import * as css from './AvailableNumbersTable.styled';

export default function AvailableNumbersTable({ data }: Readonly<AvailableNumbers>) {
  return (
    <css.Table>
      <css.TableTHead>
        <css.TableRow>
          <css.TableHeaderCell scope='col'>Phone Number</css.TableHeaderCell>
          <css.TableHeaderCell scope='col'>Region</css.TableHeaderCell>
          <css.TableHeaderCell scope='col'>Type</css.TableHeaderCell>
          <css.TableHeaderCell scope='col'>Features</css.TableHeaderCell>
          <css.TableHeaderCell scope='col'>Upfront Cost</css.TableHeaderCell>
          <css.TableHeaderCell scope='col'>Monthly Cost</css.TableHeaderCell>
          <css.TableHeaderCell scope='col' />
        </css.TableRow>
      </css.TableTHead>
      <css.TableTBody>
        {data?.map((number) => {
          const formattedNumber =
            number.phone_number && number.region_information[0].region_name
              ? getFormattedNumber(number.phone_number, number.region_information[0].region_name)
              : '';

          return (
            <css.TableRow key={number.phone_number}>
              <css.TableDataCell>{formattedNumber}</css.TableDataCell>

              <css.TableDataCell>{getLocationFromRegion(number.region_information)}</css.TableDataCell>

              <css.TableDataCell>{formatNumType(number.phone_number_type)}</css.TableDataCell>

              <css.TableDataCell>
                {number.features.map((feature) => (
                  <AvailableNumbersIcons key={feature.name} name={feature.name} />
                ))}
              </css.TableDataCell>

              <css.TableDataCell>${formatCurrency(number.cost_information.upfront_cost)}</css.TableDataCell>

              <css.TableDataCell>${formatCurrency(number.cost_information.monthly_cost)}</css.TableDataCell>

              <css.TableButtonCell>
                <Button<'a'>
                  htmlAs='a'
                  kind='text'
                  href='https://portal.telnyx.com/#/numbers/search-numbers'
                  rel='nofollow'
                  target='_blank'
                  Icon={<External width={20} height={20} />}
                >
                  Purchase
                </Button>
              </css.TableButtonCell>
            </css.TableRow>
          );
        })}
      </css.TableTBody>
    </css.Table>
  );
}
