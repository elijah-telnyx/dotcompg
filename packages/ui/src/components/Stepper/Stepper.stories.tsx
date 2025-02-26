import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import Stepper from './Stepper';
import type { StepperProps } from './@types';

const componentMeta: Meta<StepperProps> = {
  title: 'Components/Stepper',
  component: Stepper.Root,
};

export default componentMeta;

type story = StoryObj<StepperProps>;

export const WithContent: story = {
  render: (args) => (
    <Stepper.Root {...args} firstStepValue={1} lastStepValue={3}>
      <Stepper.Item value={1}>Step 1</Stepper.Item>
      <Stepper.Item value={2}>Step 2</Stepper.Item>
      <Stepper.Item value={3}>Step 3</Stepper.Item>
      <Stepper.Back>Back</Stepper.Back>
      <Stepper.Next>Next</Stepper.Next>
    </Stepper.Root>
  ),
  play: async ({ canvasElement }) => {
    const { getByText, queryByText, getByRole } = within(canvasElement);
    const nextButton = getByRole('button', { name: 'Next' });
    await expect(getByText('Step 1')).toBeInTheDocument();
    await expect(queryByText('Step 2')).not.toBeInTheDocument();

    await expect(nextButton).toBeInTheDocument();
    await expect(queryByText('Back')).not.toBeInTheDocument();

    await userEvent.click(nextButton);
    await expect(getByText('Step 2')).toBeInTheDocument();

    const backButton = getByRole('button', { name: 'Back' });
    await userEvent.click(backButton);

    await expect(getByText('Step 1')).toBeInTheDocument();
  },
};
