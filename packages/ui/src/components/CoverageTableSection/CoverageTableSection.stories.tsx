import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import CoverageTableSection, { type CoverageTableSectionProps } from '.';

const componentMeta: Meta<CoverageTableSectionProps> = {
  title: 'Components/CoverageTableSection',
  component: CoverageTableSection,
  args: {
    heading: 'Heading',
    copy: 'Copy',
    spacingTop: 'continuous',
    spacingBottom: 'continuous',
    backgroundColor: 'cream',
    tabs: [
      {
        label: 'Tab 1',
        isServices: false,
        data: {
          header: ['first', 'second', 'third'],
          body: [
            {
              country: { alpha2: 'Test1', name: 'Test 1', region: null },
              types: {
                'Type 1': {
                  first: true,
                  second: false,
                  third: 'coming soon',
                },
                'Type 2': {
                  first: true,
                  second: 'coming soon',
                  third: 'coming soon',
                },
              },
            },
            {
              country: { alpha2: 'Test2', name: 'Test 2', region: null },
              types: {
                'Type 1': {
                  first: false,
                  second: true,
                  third: false,
                },
              },
            },
          ],
        },
      },
    ],
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default componentMeta;

type story = StoryObj<CoverageTableSectionProps>;

export const WithContent: story = {
  play: async ({ canvasElement }) => {
    const { getByText, getAllByRole } = within(canvasElement);
    await userEvent.click(await getAllByRole('button', { name: 'Type 1' })[0]);
    await expect(getByText('Type 2')).toBeTruthy();
  },
};
