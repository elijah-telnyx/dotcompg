import type { Meta, StoryObj } from '@storybook/react';
import Progress, { type ProgressProps } from '.';
import StepperProgress from './StepperProgress/StepperProgress';
import CompareProgress, {
  type CompareProgressProps,
} from './CompareProgress/CompareProgress';
import { disablePropList } from '../../utils/storybook';

const componentMeta: Meta<ProgressProps> = {
  title: 'Components/Progress',
  component: () => <Progress.Bar />,
  argTypes: {
    ...disablePropList(['asChild', 'as', 'css']),
  },
};

export default componentMeta;

type story = StoryObj<ProgressProps>;

export const Stepper: story = {
  render: StepperProgress,
  args: {
    value: 1,
    max: 4,
  },
};

export const Compare: StoryObj<CompareProgressProps> = {
  render: (args) => (
    <div style={{ maxWidth: 700 }}>
      <CompareProgress {...args} />
    </div>
  ),
  args: {
    valuePrefix: '$',
    value: 4_678,
    max: 10_000,
    color: '#00E3AA',
    label: 'Telnyx',
  },
};
