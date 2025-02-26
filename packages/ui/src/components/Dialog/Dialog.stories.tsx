import type { Meta, StoryObj } from '@storybook/react';
import Dialog, { type DialogContentProps, type DialogProps } from './Dialog';

const Main: Meta = {
  title: 'Components/Dialog',
  component: Dialog.Root,
  parameters: {
    layout: 'fullscreen',
  },
};

export default Main;

export const DialogMain: StoryObj<DialogProps> = {
  name: 'Dialog',
  render(args) {
    return (
      <div style={{ height: '300vh', backgroundColor: 'var(--colors-citron)' }}>
        <Dialog.Root {...args}>
          <Dialog.Trigger>Open</Dialog.Trigger>
          <Dialog.Content>
            <div
              style={{
                backgroundColor: 'var(--colors-green)',
                color: 'var(--colors-black)',
                height: '200vh',
              }}
            >
              {args.children}
            </div>
          </Dialog.Content>
        </Dialog.Root>
      </div>
    );
  },
  args: {
    children: 'This is the content',
  },
};

export const DialogContent: StoryObj<DialogContentProps> = {
  name: 'Dialog.Content',
  render(args) {
    return (
      <Dialog.Root open>
        <Dialog.Content {...args}>{args.children}</Dialog.Content>
      </Dialog.Root>
    );
  },
  args: {
    children: 'This is the content',
  },
};
