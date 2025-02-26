import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';

import NavigationBubbles, {
  type NavigationBubbleItemProps,
  type NavigationBubblesProps,
} from './NavigationBubbles';

const componentMeta: Meta<NavigationBubblesProps> = {
  title: 'Components/Navigation Bubles',
  component: NavigationBubbles,
};

export default componentMeta;

type story = StoryObj<NavigationBubblesProps>;

export const Default: story = {
  args: {
    items: [
      {
        heading: 'Communications',
        id: 'communications',
        itemTheme: 'green',
        navItems: [
          {
            label: 'Messaging',
            items: [
              {
                text: 'SMS API',
                href: '#sms-api',
                type: 'button',
                buttonKind: 'list',
              },
              {
                text: 'MMS API',
                href: '#mms-api',
                type: 'button',
                buttonKind: 'list',
              },
              {
                text: 'Short Code',
                href: '#short-code',
                type: 'button',
                buttonKind: 'list',
              },
              {
                text: '10DLC',
                href: '#10dlc',
                type: 'button',
                buttonKind: 'list',
              },
              {
                text: 'Alphanumeric Sender ID',
                href: '#alphanumeric-sender-id',
                type: 'button',
                buttonKind: 'list',
              },
            ],
          },
          {
            label: 'Voice',
            items: [
              {
                text: 'SIP Trunking',
                href: '#sip-trunks',
                type: 'button',
                buttonKind: 'list',
              },
              {
                text: 'Voice API',
                href: '#call-control',
                type: 'button',
                buttonKind: 'list',
              },
            ],
          },
          {
            label: 'Numbers',
            items: [
              {
                text: 'Global Numbers',
                href: '#global-numbers',
                type: 'button',
                buttonKind: 'list',
              },
              {
                text: 'Toll-free Numbers',
                href: '#toll-free-numbers',
                type: 'button',
                buttonKind: 'list',
              },
            ],
          },
          {
            label: 'Video',
            items: [
              {
                text: 'Video API',
                href: '#video-api',
                type: 'button',
                buttonKind: 'list',
              },
            ],
          },
        ],
      },
      {
        heading: 'Wireless',
        id: 'wireless',
        itemTheme: 'citron',
        navItems: [
          {
            label: '',
            items: [
              {
                text: 'IoT SIM Card',
                href: '#iot-sim-card',
                type: 'button',
                buttonKind: 'list',
              },
            ],
          },
        ],
      },
      {
        heading: 'Networking',
        id: 'networking',
        itemTheme: 'blue',
        navItems: [
          {
            label: '',
            items: [
              {
                text: 'Programmable Networking',
                href: '#networking',
                type: 'button',
                buttonKind: 'list',
              },
            ],
          },
        ],
      },
      {
        heading: 'Storage',
        id: 'storage',
        itemTheme: 'tan',
        navItems: [
          {
            label: '',
            items: [
              {
                text: 'Storage',
                href: '#storage',
                type: 'button',
                buttonKind: 'list',
              },
            ],
          },
        ],
      },
    ] as NavigationBubbleItemProps[],
  },
  decorators: [
    (Story) => (
      // add scroll to story
      <div style={{ height: '100vh' }}>
        <Story />
      </div>
    ),
  ],
};

export const Open: story = {
  args: Default.args,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const items = (Default.args?.items as NavigationBubbleItemProps[]).map(
      (item) => item.heading
    );
    const first = await canvas.getByText(items[0], {
      selector: '[type=button]',
    });

    // it should start closed
    Promise.all(
      items.map(
        async (item) =>
          await expect(
            await canvas.getByText(item, { selector: '[type=button]' }).dataset
              .state
          ).toBe('closed')
      )
    );

    // it shouldn't collapse once it gets open
    await expect(first.dataset.state).toBe('closed');
    await userEvent.click(first);
    await expect(first.dataset.state).toBe('open');
    await userEvent.click(first);
    await expect(first.dataset.state).toBe('open');

    // it should open all of the items when one opens
    Promise.all(
      items.map(
        async (item) =>
          await expect(
            await canvas.getByText(item, { selector: '[type=button]' }).dataset
              .state
          ).toBe('open')
      )
    );
  },
};
