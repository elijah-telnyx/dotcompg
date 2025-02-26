import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import MultiSelect, { type MultiSelectProps } from './MultiSelect';

const groupedOptions = [
  {
    name: 'Fruits',
    items: [
      { name: 'Apple 🍎', value: 'apple' },
      { name: 'Banana 🍌', value: 'banana' },
      { name: 'Orange 🍊', value: 'orange' },
    ],
  },
  {
    name: 'Vegetables',
    items: [
      { name: 'Brocoli 🥦', value: 'brocoli' },
      { name: 'Carrot 🥕', value: 'carrot' },
    ],
  },
];

const componentMeta: Meta<MultiSelectProps> = {
  title: 'Components/MultiSelect',
  component: MultiSelect,
  args: {
    placeholder: 'Filter By',
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default componentMeta;

type story = StoryObj<MultiSelectProps>;

export const WithOptions: story = {
  args: {
    items: groupedOptions[0].items,
  },
  play: async ({ canvasElement }) => {
    const getItem = (i: number) => groupedOptions[0].items[i];

    const canvas = within(canvasElement);
    const getMenuItemByIndex = async (i: number) =>
      await canvas.getByRole('menuitemcheckbox', {
        name: getItem(i).name,
      });

    const selectTrigger = await canvas.getByRole('button', {
      name: 'Filter By',
    });
    expect(selectTrigger.dataset.state).toBe('closed');

    await userEvent.tab();
    await userEvent.keyboard('{space}');
    expect(selectTrigger.dataset.state).toBe('open');

    expect(await getMenuItemByIndex(0)).toHaveAttribute(
      'aria-checked',
      'false'
    );
    await userEvent.keyboard('{arrowdown}');

    await userEvent.keyboard('{space}');
    expect(await canvas.getByText('1 filter selected')).toBeInTheDocument();
    expect(await getMenuItemByIndex(0)).toHaveAttribute('aria-checked', 'true');
    // keep menu open when you select an option with keyboard
    expect(selectTrigger.dataset.state).toBe('open');

    await userEvent.click(await getMenuItemByIndex(1), undefined, {
      skipPointerEventsCheck: true,
    });

    expect(await canvas.getByText('2 filters selected')).toBeInTheDocument();

    // keep menu open when you select an option with mouse
    expect(selectTrigger.dataset.state).toBe('open');

    // keep menu open when you unselect an option with mouse
    await userEvent.click(await getMenuItemByIndex(1), undefined, {
      skipPointerEventsCheck: true,
    });

    expect(await canvas.getByText('1 filter selected')).toBeInTheDocument();
    await userEvent.click(selectTrigger);
  },
};

export const WithGroupedOptions: story = {
  args: {
    items: groupedOptions,
  },
  play: WithOptions.play,
};
