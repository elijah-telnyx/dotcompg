import { userEvent, within } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import CopyButton, { type CopyButtonProps } from './CopyButton';
import { useDark } from '../../utils/storybook';

const componentMeta: Meta<CopyButtonProps> = {
  title: 'Components/CopyButton',
  component: CopyButton,
  args: {
    copy: 'This will be copied to your clipboard.',
    isDark: false,
    buttonTextPosition: 'left',
  },
  argTypes: {
    buttonTextPosition: {
      control: 'inline-radio',
      options: ['left', 'right'],
    },
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useDark({ dark: Boolean(args.isDark) });

    return (
      <div
        style={{
          width: 500,
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <CopyButton {...args} />
      </div>
    );
  },
};

export default componentMeta;

type story = StoryObj<CopyButtonProps>;

export const Default: story = {
  play: async ({ canvasElement }) => {
    jest.spyOn(navigator.clipboard, 'writeText').mockImplementation(jest.fn());

    const { getByRole } = within(canvasElement);
    await expect(getByRole('button', { name: 'Copy' })).toBeInTheDocument();
    await userEvent.click(getByRole('button', { name: 'Copy' }));
    await expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      'This will be copied to your clipboard.'
    );
    await expect(getByRole('button', { name: 'Copied!' })).toBeInTheDocument();
    setTimeout(async () => {
      await expect(getByRole('button', { name: 'Copy' })).toBeInTheDocument();
    }, 1300);
  },
};

export const Right: story = {
  args: {
    buttonTextPosition: 'right',
  },
};
