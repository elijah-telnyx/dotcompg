import type { Meta, StoryObj } from '@storybook/react';
import CtaButton from '../CtaButton';
import CarouselSection, { type CarouselSectionProps } from './CarouselSection';
import Carousel, { CarouselCard } from '../Carousel';

const generateItems = (numberOfItems: number) =>
  Array(numberOfItems)
    .fill(undefined)
    .map((_, index) => {
      return {
        media: {
          src: 'https://images.ctfassets.net/taysl255dolk/XX6KAfZiBmLXq7G7ZWIKw/b178a80c0207d7f0d8c38292d8f97fd3/TelnyxDotCom_Hero_BG_2.jpg',
          alt: 'hero',
        },
        copy: 'Colectivo empowers delivery drivers to manage customer billing on the go',
        linkText: 'learn more',
        linkHref: `#${index + 1}`,
        heading: String(index + 1),
      };
    });

const componentMeta: Meta<CarouselSectionProps> = {
  title: 'Layout/Carousel Section',
  component: CarouselSection,
  // https://github.com/storybookjs/storybook/issues/20782#issuecomment-1892178858
  subcomponents: {
    CarouselCard,
    CtaButton,
    Carousel,
  } as Record<string, React.ComponentType<unknown>>,
  args: {
    tagline: 'Use cases',
    heading: 'What will you build with global IoT connectivity?',
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default componentMeta;

type Story = StoryObj<CarouselSectionProps>;

export const Default: Story = {
  args: {
    items: generateItems(3),
  },
};

export const WithCta: Story = {
  args: {
    items: generateItems(3),
    backgroundColor: 'cream',
    ctas: [
      {
        backgroundColor: 'cream',
        linkKind: 'cta',
        href: '#1',
        text: 'See all use cases',
        type: 'link',
      },
    ],
  },
};

export const With4Items: Story = {
  args: {
    items: generateItems(4),
  },
};

export const With5Items: Story = {
  args: {
    items: generateItems(5),
  },
};

export const WithIconVariant: Story = {
  args: {
    items: generateItems(5).map((it) => ({
      ...it,
      media: undefined,
      icon: {
        src: '',
        alt: 'icon',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <g clip-path="url(#clip0_702_3511)">
                    <path d="M3.02944 13.9706L11.5147 22.4558L28.4853 5.48528" stroke="#000000" stroke-width="8"/>
                </g>
                <defs>
                    <clipPath id="clip0_702_3511">
                        <rect width="32" height="32" fill="currentColor"/>
                    </clipPath>
                </defs>
              </svg>`,
      },
    })),
  },
};

export const WithCTAIcon: Story = {
  args: {
    items: WithIconVariant.args?.items?.map((it) => ({
      ...it,
      linkIcon: {
        src: '',
        alt: 'icon',
        svg: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="c-hFGGuH">
                <g clip-path="url(#:rd:)">
                  <path d="M3.29289 15.2929L2.58579 16L4 17.4142L4.70711 16.7071L3.29289 15.2929ZM4.70711 16.7071L12.8671 8.54709L11.4529 7.13288L3.29289 15.2929L4.70711 16.7071Z" fill="currentColor"></path><path d="M15.7026 3.03247C16.4844 2.77188 17.2281 3.51562 16.9675 4.29738L14.7116 11.065C14.4765 11.7703 13.5815 11.9816 13.0558 11.4559L8.54405 6.94415C8.0184 6.4185 8.2297 5.52343 8.93493 5.28835L15.7026 3.03247Z" fill="currentColor"></path>
                </g>
              <defs>
                <clipPath id=":rd:">
                  <rect width="20" height="20" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>`,
      },
    })),
  },
};
