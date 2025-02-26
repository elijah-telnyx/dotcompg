import { useEffect, useState } from 'react';
import Input from 'ui/components/Input';
import Select from 'ui/components/Select';
import useMountEffect from 'ui/utils/hooks/useMountEffect';
import { getCountryZone, getIOTSIMCardPricing } from 'services/publicApiService';
import useAsync from 'utils/hooks/useAsync';
import type { DeepNullable } from 'utils/types';
import Pricing, { type PricingProps } from './Pricing';
import * as css from './IoTSimCardPricingCalculatorWidget.styled';
import { publicIPOptions, countryOptions } from './constants';
import { ensureNonNullableProperties } from './utils';
import Loading from 'ui/components/Icons/Loading';
import type { IoTSIMCardCalculatorApiResponse } from 'pages/api/pricing/iot-sim-card-calculator';
import { type CTAButtonProps } from 'ui/components/CtaButton';
import NumberInputWithWarning from './NumberInputWithWarning';
import Calculator from '../CalculatorLayout';

type FormValues = DeepNullable<PricingProps['values']>;

const IoTSimCardPricingCalculatorWidget = ({ dark, ctas }: IoTSimCardPricingCalculatorWidgetProps) => {
  const apiData = useAsync<IoTSIMCardCalculatorApiResponse['data']>();
  const countryZone = useAsync<number>();
  const [values, setValues] = useState<FormValues>({
    numberOfSIMCards: null,
    publicIP: null,
    numberOfMBPerMonth: null,
    country: null,
  });

  const setValue = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  useMountEffect(() => {
    apiData.run(getIOTSIMCardPricing().then((res) => res.data));
  });

  useEffect(() => {
    if (values.country) {
      countryZone.run(getCountryZone(values.country).then((res) => Number(res.data.zone)));
    }
    //eslint-disable-next-line
  }, [values.country]);

  const pricingProps = ensureNonNullableProperties({
    countryZone: countryZone.data,
    apiData: apiData.data,
    values: ensureNonNullableProperties(values),
    ctas,
  });

  return (
    <div>
      <Calculator.WidgetRoot firstStepValue={1} lastStepValue={5} isDark={dark}>
        <Calculator.WidgetItem
          value={1}
          heading='How many SIM cards do you need?'
          hideNext={values.numberOfSIMCards === null}
        >
          <NumberInputWithWarning
            id='iot-sim-savings-calculator__number-of-sim-cards'
            name='iot-sim-savings-calculator__number-of-sim-cards'
            placeholder='Number of SIM cards'
            min={1}
            value={values.numberOfSIMCards === null ? '' : String(values.numberOfSIMCards)}
            onChange={(event) => {
              const value = event.currentTarget.value;
              setValue('numberOfSIMCards', value === '' ? null : Number(value));
            }}
          />
        </Calculator.WidgetItem>

        <Calculator.WidgetItem
          value={2}
          heading='How much data (on average) will each SIM use per month?'
          hideNext={values.numberOfMBPerMonth === null}
        >
          <NumberInputWithWarning
            id='iot-sim-savings-calculator__number-of-mb-per-month'
            name='iot-sim-savings-calculator__number-of-mb-per-month'
            placeholder='Number of MB per month'
            min={1}
            value={values.numberOfMBPerMonth === null ? '' : String(values.numberOfMBPerMonth)}
            onChange={(event) => {
              const value = event.currentTarget.value;
              setValue('numberOfMBPerMonth', value === '' ? null : Number(value));
            }}
          />
        </Calculator.WidgetItem>

        <Calculator.WidgetItem
          value={3}
          heading='Where will you use your SIM cards?'
          hideNext={values.country === null}
        >
          <Select
            placeholder='Select country'
            value={values.country || undefined}
            items={countryOptions}
            onValueChange={(value) => setValue('country', value || null)}
          />
        </Calculator.WidgetItem>

        <Calculator.WidgetItem
          value={4}
          heading='Will you use a public IP?'
          infoTooltip='Unlike private IP addresses, public IP addresses can be
          used to communicate with devices outside of a local network and are
          necessary for any publicly-accessible network services.'
          hideNext={values.publicIP === null}
        >
          <css.RadioGroup>
            {publicIPOptions.map(({ label, value }) => {
              const name = 'iot-sim-savings-calculator__public-ip';
              const id = `${name}__-${value}`;
              const checked = (value === 'yes') === values.publicIP;

              return (
                <Input
                  checked={checked}
                  id={id}
                  key={id}
                  label={label}
                  name={name}
                  onChange={(e) => setValue('publicIP', e.currentTarget.checked && value === 'yes')}
                  type='radio'
                  value={value}
                />
              );
            })}
          </css.RadioGroup>
        </Calculator.WidgetItem>

        <Calculator.WidgetItem value={5}>
          {pricingProps ? (
            <Pricing {...pricingProps} />
          ) : (
            <css.LoadingWrapper>
              <Loading spin width={32} height={32} />
            </css.LoadingWrapper>
          )}
        </Calculator.WidgetItem>
      </Calculator.WidgetRoot>
    </div>
  );
};

export default IoTSimCardPricingCalculatorWidget;

export interface IoTSimCardPricingCalculatorWidgetProps {
  ctas?: CTAButtonProps[];
  dark?: boolean;
}
