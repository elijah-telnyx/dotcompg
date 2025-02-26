import { render, screen, act } from '@testing-library/react';
import HowItWorks from './HowItWorks';
import { IntersectionObserver } from '../../test/mocks/IntersectionObserverMock';
jest.useFakeTimers();

const mockData = {
  tagline: 'How It Works',
  items: [
    {
      heading: 'Order your IoT SIM Cards',
      copy: 'Get SIM cards delivered to your doorstep, with global shipping and no minimum order quantity.',
      media: {
        src: 'https://images.ctfassets.net/2vm221913gep/5Ig6k7ICLq6sPTHKZ2kOEZ/0a095368f1e0ecee5a9341c570b2aec5/Telnyx_Product_IoTSIM_HIW_1.svg',
        alt: 'office',
      },
      onClick: () => {
        /* */
      },
    },
    {
      heading: 'Activate your IoT SIM Cards',
      copy: 'Activate your IoT SIM Cards. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.',
      media: {
        src: 'https://images.ctfassets.net/2vm221913gep/3HmfWT5uVObQ1hb1xaJpXZ/fd1706bd2577ac13dd42933d29226225/pietro-de-grandi-T7K4aEPoGGk-unsplash.jpg.png',
        alt: 'office',
      },
      onClick: () => {
        /* */
      },
    },
    {
      heading: 'Set up reporting & management',
      copy: 'Set up reporting & management. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.',
      media: {
        src: 'https://images.ctfassets.net/2vm221913gep/2eb2NkRpSCdnZIhndwwDET/42dbef9c7516b64eafa64582d827e7c3/DeveloperDocs_Hero_Wireless__1__1__5___1_.svg',
        alt: 'office',
      },
      onClick: () => {
        /* */
      },
    },
    {
      heading: 'Launch your IoT application',
      copy: 'Launch your IoT application. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.',
      media: {
        src: 'https://images.ctfassets.net/2vm221913gep/7iMOnCIbTpiqHLYjU1hzHW/b2e40998b7de42d53ad45a231d9a04b6/bench-accounting-MGaFENpDCsw-unsplash.png',
        alt: 'office',
      },
      onClick: () => {
        /* */
      },
    },
  ],
  backgroundColor: 'black',
};

describe('HowItWorks component', () => {
  beforeAll(() => {
    window.IntersectionObserver =
      IntersectionObserver as unknown as typeof window.IntersectionObserver;
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: true,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });
  });

  it('auto play should not start if viewport is less thant 1024px', async () => {
    render(
      <HowItWorks
        {...mockData}
        ctaButtons={[
          {
            text: 'Sign Up',
            href: '#',
            type: 'button',
            backgroundColor: 'black',
          },
        ]}
        backgroundColor='black'
        hasOverflow={true}
        spacingBottom='none'
        spacingTop='none'
      />
    );

    const firstItem = screen.getAllByRole('tab')[0];
    const secondStep = screen.getAllByRole('tab')[1];

    expect(firstItem).toHaveAttribute('data-state', 'active');
    expect(secondStep).toHaveAttribute('data-state', 'inactive');

    // Wait for the default interval (5000ms)
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    // Check if the active step has changed
    expect(firstItem).toHaveAttribute('data-state', 'inactive');
    expect(secondStep).toHaveAttribute('data-state', 'active');
  });

  it('auto play should start in viewport greater than 1024px', async () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => {
        return {
          matches: false,
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
        };
      }),
    });

    render(
      <HowItWorks
        {...mockData}
        ctaButtons={[
          {
            text: 'Sign Up',
            href: '#',
            type: 'button',
            backgroundColor: 'black',
          },
        ]}
        backgroundColor='black'
        hasOverflow={true}
        spacingBottom='none'
        spacingTop='none'
      />
    );

    const firstItem = screen.getAllByRole('tab')[0];
    expect(firstItem).toHaveAttribute('data-state', 'active');

    // Wait for the default interval (5000ms)
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    // Check if the active step has changed
    expect(firstItem).toHaveAttribute('data-state', 'active');
  });

  it('auto play should stop when click in a arrow', async () => {
    // Set the viewport size to less than 1024px
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 1023,
    });

    render(
      <HowItWorks
        {...mockData}
        ctaButtons={[
          {
            text: 'Sign Up',
            href: '#',
            type: 'button',
            backgroundColor: 'black',
          },
        ]}
        backgroundColor='black'
        hasOverflow={true}
        spacingBottom='none'
        spacingTop='none'
      />
    );

    const firstStep = screen.getAllByRole('tab')[0];
    const secondStep = screen.getAllByRole('tab')[1];
    expect(firstStep).toHaveAttribute('data-state', 'active');

    // Click in the next arrow
    const nextArrow = screen.getAllByRole('tab')[1];

    act(() => {
      nextArrow.click();
    });

    // Wait to check if the step will change
    act(() => {
      jest.advanceTimersByTime(15000);
    });

    // Check if the active step was changed only once
    expect(secondStep).toHaveAttribute('data-state', 'active');

    // Click in the previous arrow
    const prevArrow = screen.getAllByRole('tab')[0];
    act(() => {
      prevArrow.click();
    });

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(firstStep).toHaveAttribute('data-state', 'active');
  });

  it('Should change the step when click in a arrow', async () => {
    // Set the viewport size to less than 1024px
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 1023,
    });

    render(
      <HowItWorks
        {...mockData}
        ctaButtons={[
          {
            text: 'Sign Up',
            href: '#',
            type: 'button',
            backgroundColor: 'black',
          },
        ]}
        backgroundColor='black'
        hasOverflow={true}
        spacingBottom='none'
        spacingTop='none'
      />
    );
    const firstStep = screen.getByTestId('1');
    const secondStep = screen.getByTestId('2');

    expect(firstStep).not.toHaveAttribute('hidden');
    expect(secondStep).toHaveAttribute('hidden');

    // Click in the next arrow
    const nextArrow = screen.getAllByRole('tab')[1];
    act(() => {
      nextArrow.click();
    });

    expect(firstStep).toHaveAttribute('hidden');
    expect(secondStep).not.toHaveAttribute('hidden');

    // Click in the next arrow
    const prevArrow = screen.getAllByRole('tab')[0];
    act(() => {
      prevArrow.click();
    });

    expect(firstStep).not.toHaveAttribute('hidden');
    expect(secondStep).toHaveAttribute('hidden');
  });
});
