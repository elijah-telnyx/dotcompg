import type { Meta, StoryObj } from '@storybook/react';

import SignUpForm from '../SignUpForm';
import type { SignUpFormValues } from '../SignUpForm';
import {
  HorizontalFormSection,
  type HorizontalFormSectionProps,
} from './HorizontalFormSection';

const mock: HorizontalFormSectionProps = {
  tagline: 'Try it out',
  heading: 'Voice AI',
  headingTag: 'h1',
  headingLevel: 1,
  copy: 'Complete the form, receive a call, and experience our high-quality, low-latency voice AI.',
  smallCopy:
    '*For unlimited calls, sign up for a free account on our Mission Control Portal [here](/sign-up).*',
  ctaButtons: [
    {
      type: 'button',
      text: 'Get started',
      href: 'https://portal.telnyx.com/#/login/sign-in',
      buttonKind: 'primary',
    },
    {
      type: 'button',
      text: 'Talk to an expert',
      href: '/contact-us',
      buttonKind: 'secondary',
    },
  ],
  background: {
    backgroundImage:
      'url(https://images.ctfassets.net/2vm221913gep/6z4Y3Yl47iyxPBm5isck2o/609bbbc6f4e12da5c606485ed4a7ab04/VoiceAIForm_LogoCrop_Background.svg)',
    backgroundAttachment: 'fixed',
    backgroundBlendMode: 'hard-light',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right center',
  },
  backgroundColor: 'green',
};

const signupMock = {
  signInLink: '#sign-in',
  initialValues: {
    promo_code: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    terms_and_conditions: false,
    subscription_opt_in: false,
    organization_invitation_email: 'lucas@telnyx.com',
    organization_invitation_id: 'asdasdas',
    organization_invitation_confirmation_token: 'dasdasdasd',
    campaign: {},
    referrer: '',
    sift_session_id: '',
  },
};

const componentMeta: Meta<HorizontalFormSectionProps> = {
  title: 'Layout/Horizontal Form Section',
  component: HorizontalFormSection,
  args: mock,
  parameters: {
    layout: 'fullscreen',
  },
};

export default componentMeta;

type Story = StoryObj<HorizontalFormSectionProps>;

export const Default: Story = {
  args: {
    ...mock,
  },
  render: (args) => (
    <HorizontalFormSection {...args}>
      <SignUpForm
        initialValues={signupMock.initialValues}
        signInLink={signupMock.signInLink}
        onEmailBlur={(value) => {
          console.log('triggered email validation', value);
        }}
        onSubmit={(values: SignUpFormValues | undefined) =>
          console.log('send to API', values)
        }
        termsAndConditionsUrl='/terms-and-conditions-of-service'
        privacyPolicyUrl='/privacy-policy'
      />
    </HorizontalFormSection>
  ),
};
