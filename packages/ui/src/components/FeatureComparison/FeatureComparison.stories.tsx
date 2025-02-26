import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import Comparison, { type FeatureComparisonProps } from './FeatureComparison';

const mockItem: FeatureComparisonProps['comparisonList'][0] = {
  label: 'Private network',
  competitorHeading: 'Public',
  competitorCopy:
    'Twilio uses the public internet. Unfortunately, the internet wasn’t built for real-time communications, and it shows—high latency, packet loss, and poor security cause endless quality issues.',
  telnyxHeading: 'private',
  telnyxCopy:
    'Our private global IP network was designed from the ground up for real-time voice and data communications, so your calls are crystal-clear and secure, with super low latency.',
};

const secondMockItemLabel = 'Numbers';

const componentMeta: Meta<FeatureComparisonProps> = {
  title: 'Layout/Feature Comparison',
  component: Comparison,
  args: {
    tagline: 'Feature comparison',
    heading: 'Compare our features against Twilio',
    copy: 'Discover the Telnyx advantage: superior network, competitive pricing, and unmatched support.',
    competitorIconMobile: {
      src: 'https://images.ctfassets.net/2vm221913gep/1JZwcq3UM5BK7JfNjfz3JO/827e435f2d58e42646096627f44c3515/Twilio_logo_xs.svg',
      alt: 'competitor logo',
    },
    competitorIconDesktop: {
      src: 'https://images.ctfassets.net/2vm221913gep/2Vej7wLCb4PUx04rcQlse6/8ff74a013ac7c5e52429d1b795a28fa3/Twilio_logo_small.svg',
      alt: 'competitor logo',
    },
    comparisonList: [mockItem, { ...mockItem, label: secondMockItemLabel }],
    backgroundColor: 'black',
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default componentMeta;

type story = StoryObj<FeatureComparisonProps>;

export const WithContent: story = {
  play: async ({ canvasElement }) => {
    const { getByLabelText, getByRole } = within(canvasElement);
    const firstItem = await getByLabelText(mockItem.label);
    await expect(firstItem).toBeInTheDocument();
    await expect(firstItem).toHaveAttribute('data-state', 'open');
    /**
     * Close element
     */
    const firstItemButton = await getByRole('button', { name: mockItem.label });
    await userEvent.click(firstItemButton);
    await expect(firstItem).toHaveAttribute('data-state', 'closed');
    await userEvent.click(firstItemButton);
  },
};

export const WithTwoElementsOpen: story = {
  play: async ({ canvasElement }) => {
    const { getByLabelText, getByRole } = within(canvasElement);
    const firstItem = await getByLabelText(mockItem.label);
    const secondItem = await getByLabelText(secondMockItemLabel);
    const secondItemButton = await getByRole('button', {
      name: secondMockItemLabel,
    });

    /**
     * Have two elements open at the same time
     */
    await userEvent.click(secondItemButton);
    await expect(firstItem).toHaveAttribute('data-state', 'open');
    await expect(secondItem).toHaveAttribute('data-state', 'open');
  },
};

export const WithMaxCharacterCount: story = {
  args: {
    tagline: 'Feature comparison',
    heading: 'Compare our features against Twilio',
    copy: 'Discover the Telnyx advantage: superior network, competitive pricing, and unmatched support.',
    competitorIconMobile: {
      src: 'https://images.ctfassets.net/2vm221913gep/1JZwcq3UM5BK7JfNjfz3JO/827e435f2d58e42646096627f44c3515/Twilio_logo_xs.svg',
      alt: 'competitor logo',
    },
    competitorIconDesktop: {
      src: 'https://images.ctfassets.net/2vm221913gep/2Vej7wLCb4PUx04rcQlse6/8ff74a013ac7c5e52429d1b795a28fa3/Twilio_logo_small.svg',
      alt: 'competitor logo',
    },
    comparisonList: [
      {
        label: 'Lorem ipsum dolor sit amet, consectetuer',
        competitorHeading: 'Lorem ipsum dolor sit amet, consectetuer',
        competitorCopy:
          'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu',
        telnyxHeading: 'private',
        telnyxCopy:
          'Our private global IP network was designed from the ground up for real-time voice and data communications, so your calls are crystal-clear and secure, with super low latency.',
      },
    ],
    backgroundColor: 'black',
  },
};

export const ItemWithoutHeading: story = {
  args: {
    comparisonList: [
      { ...mockItem, telnyxHeading: undefined, competitorHeading: undefined },
    ],
  },
};
