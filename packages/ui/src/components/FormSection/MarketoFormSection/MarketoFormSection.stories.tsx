import type { Meta, StoryObj } from '@storybook/react';
import MarketoFormSection, {
  type MarketoFormSectionProps,
} from './MarketoFormSection';

const componentMeta: Meta<MarketoFormSectionProps> = {
  title: 'Layout/Marketo Form Section',
  component: MarketoFormSection,
  args: {
    backgroundColor: 'black',
    media: undefined,
    heading: 'Become a beta tester',
    copy: `As we continue to build out our Integration Marketplace, we'd love to get input from you on the following:

* Are we missing an integration you need for your business?
* Would you like to build an integration with us?
* Are you interested in exploring partnership opportunities with Telnyx?

After you submit the form, someone from our integrations team will get in touch with you to discuss your request.`,
    form: {
      formId: 1987,
      singleFieldLayout: false,
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default componentMeta;

type story = StoryObj<MarketoFormSectionProps>;

export const Default: story = {};

export const MarketoWithFormText: story = {
  args: {
    form: {
      formId: 1987,
      heading: 'Talk to an expert',
    },
  },
};

export const MarketoSingleFieldLayout: story = {
  args: {
    form: {
      formId: 1470,
      singleFieldLayout: true,
    },
  },
};

export const MarketoSmallFieldLayout: story = {
  args: {
    heading: 'Sign up for emails of our latest articles and news',
    form: {
      formId: 1470,
      smallFieldLayout: true,
    },
  },
};
