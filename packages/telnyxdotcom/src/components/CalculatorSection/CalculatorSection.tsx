import dynamic from 'next/dynamic';
import { isDarkColor } from 'ui/styles/utils';
import CalculatorLayout, {
  type CalculatorSectionProps as CalculatorLayoutProps,
  type CalculatorTypes,
} from './CalculatorLayout';
import type { CTAButtonProps } from 'ui/components/CtaButton';

export interface CalculatorSectionProps extends CalculatorLayoutProps {
  calculatorType: CalculatorTypes;
  calculatorWidgetCta?: CTAButtonProps[];
}

const DynamicStoragePricingCalculatorWidget = dynamic(() => import('./StoragePricingCalculatorWidget'), {
  ssr: false,
});

const DynamicIoTSimCardPricingCalculatorWidget = dynamic(() => import('./IoTSimCardPricingCalculatorWidget'), {
  ssr: false,
});

const DynamicSavingsSMSCalculatorWidget = dynamic(() => import('./SavingsSMSCalculatorWidget'), {
  ssr: false,
});

const CalculatorSection = ({ calculatorType, calculatorWidgetCta, ...props }: CalculatorSectionProps) => {
  const isDark = isDarkColor(props.backgroundColor);

  return (
    <CalculatorLayout.Section {...props} type={calculatorType}>
      <CalculatorWidget type={calculatorType} isDark={isDark} ctas={calculatorWidgetCta} />
    </CalculatorLayout.Section>
  );
};

export default CalculatorSection;

export interface CalculatorWidgetProps {
  type: CalculatorTypes;
  isDark: boolean;
  ctas?: CTAButtonProps[];
}

const CalculatorWidget = ({ type, isDark, ctas }: CalculatorWidgetProps) => {
  switch (type) {
    case 'storage':
      return <DynamicStoragePricingCalculatorWidget dark={isDark} ctas={ctas} />;
    case 'iot-sim-card':
      return <DynamicIoTSimCardPricingCalculatorWidget dark={isDark} ctas={ctas} />;
    case 'sms':
      return <DynamicSavingsSMSCalculatorWidget dark={isDark} ctas={ctas} />;

    default:
      return null;
  }
};
