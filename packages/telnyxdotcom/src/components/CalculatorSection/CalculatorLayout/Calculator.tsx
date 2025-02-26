import { CalculatorSection } from './CalculatorSection';
import { CalculatorWidgetRoot, CalculatorWidgetItem } from './CalculatorWidget';

const calculator = {
  Section: CalculatorSection,
  WidgetItem: CalculatorWidgetItem,
  WidgetRoot: CalculatorWidgetRoot,
};

export default calculator;

export type { CalculatorSectionProps } from './CalculatorSection';

export type { CalculatorWidgetRootProps, CalculatorWidgetItemProps } from './CalculatorWidget';

export type CalculatorTypes = 'storage' | 'iot-sim-card' | 'sms';
