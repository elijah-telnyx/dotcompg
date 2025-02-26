import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import SocialAuthButton, {
  type SocialAuthButtonProps,
} from './SocialAuthButton';

const componentMeta: Meta<SocialAuthButtonProps> = {
  title: 'Components/SocialAuthButton',
  component: SocialAuthButton,
  args: {
    children: 'This will be used in all stories, unless overwritten',
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default componentMeta;

type story = StoryObj<SocialAuthButtonProps>;

export const Microsoft: story = {
  args: {
    children: 'Sign up with Microsoft',
    endpoint: 'https://api.telnyx.com/users/auth',
    campaign: 'microsoft_graph',
    label: 'sign up with microsoft',
  },
  play: async ({ canvasElement }) => {
    const { getByText } = within(canvasElement);
    await expect(getByText('Sign up with Microsoft')).toBeInTheDocument();
  },
};

export const Google: story = {
  args: {
    children: 'Sign up with Google',
    campaign: 'google',
    label: 'sign up with google',
    onClick: () => {
      console.log('sign up');
    },
  },
  play: async ({ canvasElement }) => {
    const { getByText } = within(canvasElement);
    await expect(getByText('Sign up with Google')).toBeInTheDocument();
  },
};
