import type { Meta, StoryObj } from '@storybook/react';
import CustomerLogosHomePage, {
  type CustomerLogosHomePageProps,
} from './CustomerLogosHomePage';

const logos = [
  {
    src: 'https://images.ctfassets.net/2vm221913gep/7HdhIr7w0Fm0FT3eJYqVIi/72297fd2c2ce46e5223ddfed35030da7/Customer_Logo_Philips.svg',
    alt: 'logo',
  },
  {
    src: 'https://images.ctfassets.net/2vm221913gep/XHhMgbcrZbrNHtB5esWF7/7642b74b076957848f62da65a20c62fb/Customer_Logo_Colectivo.svg',
    alt: 'logo',
  },
  {
    src: 'https://images.ctfassets.net/2vm221913gep/QMThcrS2nOfepNTV6X6p7/7ecc6bcf9f5050c8b73cd4e57c35f66f/Customer_Logo_Valor_Paytech.svg',
    alt: 'logo',
  },
  {
    src: 'https://images.ctfassets.net/2vm221913gep/6sGJc03DtCyspp4cenoCgl/030a3f92364ff1e365a9414f48daf8e6/Customer_Logo_Cisco.svg',
    alt: 'logo',
  },
  {
    src: 'https://images.ctfassets.net/2vm221913gep/4I9Be0W1lZMTLznGgwTB8d/a107859103aa1864252c004c5819c138/Customer_Logo_Outform.svg',
    alt: 'logo',
  },
  {
    src: 'https://images.ctfassets.net/2vm221913gep/4CWtLnYaMctq8GB1yHgXfF/7616302dfa4c54aaafb01378be3412f2/COSMO.svg',
    alt: 'logo',
  },
];

const Main: Meta<CustomerLogosHomePageProps> = {
  title: 'Layout/Customer Logos/Home',
  component: CustomerLogosHomePage,
  args: {
    logos: [...logos, ...logos],
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default Main;

type story = StoryObj<CustomerLogosHomePageProps>;

export const Default: story = {};

export const WithContent: story = {};
