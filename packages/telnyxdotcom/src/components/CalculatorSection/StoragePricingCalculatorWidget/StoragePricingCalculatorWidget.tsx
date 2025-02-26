import { useState } from 'react';
import Calculator from '../CalculatorLayout';
import Pricing from './Pricing';
import Input from 'ui/components/Input';
import { type CTAButtonProps } from 'ui/components/CtaButton';

const StoragePricingCalculatorWidget = ({ dark, ctas }: StoragePricingCalculatorWidgetProps) => {
  const [values, setValues] = useState({
    storageAmount: 0,
    egressAmount: 0,
  });

  const setValue = (key: string, value: string | number) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div>
      <Calculator.WidgetRoot firstStepValue={1} lastStepValue={3} isDark={dark}>
        <Calculator.WidgetItem
          value={1}
          heading='How much storage will you use?'
          hideNext={values.storageAmount === null}
        >
          <Input
            type='range'
            id='storageAmount'
            name='storageAmount'
            min={1}
            max={1000}
            minLabel='TiB'
            maxLabel='TiB'
            onChange={(e) => setValue('storageAmount', +e.target.value)}
            required
          />
        </Calculator.WidgetItem>
        <Calculator.WidgetItem
          value={2}
          heading='How much data will you download per month?'
          hideNext={values.egressAmount === null}
        >
          <Input
            type='range'
            id='egressAmount'
            name='egressAmount'
            min={1}
            max={1000}
            minLabel='TiB'
            maxLabel='TiB'
            onChange={(e) => setValue('egressAmount', +e.target.value)}
            required
          />
        </Calculator.WidgetItem>

        <Calculator.WidgetItem value={3} heading={'Compare costs per month'}>
          <Pricing storage={+values.storageAmount} egress={+values.egressAmount} ctas={ctas} />
        </Calculator.WidgetItem>
      </Calculator.WidgetRoot>
    </div>
  );
};

export default StoragePricingCalculatorWidget;

export interface StoragePricingCalculatorWidgetProps {
  ctas?: CTAButtonProps[];
  dark?: boolean;
}
