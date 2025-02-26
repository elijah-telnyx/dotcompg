import { render, screen } from '@testing-library/react';

import NavigationCards from '.';
import * as response from './mock.json';
import type { NavigationCardItem } from './NavigationCards';

describe('<NavigationCards />', () => {
  it('should render the component', () => {
    const { container } = render(
      <NavigationCards items={response.data as NavigationCardItem[]} />
    );
    expect(container).toBeInTheDocument();
  });

  it('should render the component with headings', () => {
    const data: NavigationCardItem[] = [
      {
        heading: 'Communications',
        id: 'communications',
        itemTheme: 'green',
        dark: false,
        navItems: [
          {
            label: 'Messaging', //Messaging
            items: [
              {
                label: 'SMS API',
                copy: 'Starting at $0.004 to send and receive a message.',
                href: 'https://#1',
              },
            ],
          },
        ],
      },
    ];
    const { container } = render(<NavigationCards items={data} />);
    expect(container).toBeInTheDocument();
    expect(screen.getByText(/Communications/i)).toBeInTheDocument();
    expect(screen.getByText(/Messaging/i)).toBeInTheDocument();
    expect(screen.getByText(/SMS API/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Starting at \$0.004 to send and receive a message./i)
    ).toBeInTheDocument();
  });

  it('should render the component without the label', () => {
    const data: NavigationCardItem[] = [
      {
        heading: 'Communications',
        id: 'communications',
        itemTheme: 'green',
        dark: false,
        navItems: [
          {
            label: '', //Messaging
            items: [
              {
                label: 'SMS API',
                copy: 'Starting at $0.004 to send and receive a message.',
                href: 'https://#1',
              },
            ],
          },
        ],
      },
    ];
    const { container } = render(<NavigationCards items={data} />);
    expect(container).toBeInTheDocument();
    expect(screen.queryByText(/Messaging/i)).not.toBeInTheDocument();
  });

  it('should render the component card with a specfific green background color', () => {
    const data: NavigationCardItem[] = [
      {
        heading: 'Communications',
        id: 'communications',
        itemTheme: 'green',
        dark: false,
        navItems: [
          {
            label: '', //Messaging
            items: [
              {
                label: 'SMS API',
                copy: 'Starting at $0.004 to send and receive a message.',
                href: 'https://#1',
              },
            ],
          },
        ],
      },
    ];
    const { container } = render(<NavigationCards items={data} />);
    expect(container).toBeInTheDocument();

    expect(screen.getByRole('link')).toHaveAttribute('href', 'https://#1');

    const linkBox = screen.getByRole('link').firstChild;
    expect(linkBox).toHaveAttribute('class', expect.stringContaining('green'));
  });

  it('should render the component card with a specfific citron background color', () => {
    const data: NavigationCardItem[] = [
      {
        heading: 'Wireless',
        id: 'wireless',
        itemTheme: 'citron',
        dark: false,
        navItems: [
          {
            label: '',
            items: [
              {
                label: 'IoT SIM Card',
                copy: 'Starting at $0.01 per MB.',
                href: 'https://#5',
              },
            ],
          },
        ],
      },
    ];
    const { container } = render(<NavigationCards items={data} />);
    expect(container).toBeInTheDocument();

    expect(screen.getByRole('link')).toHaveAttribute('href', 'https://#5');

    const linkBox = screen.getByRole('link').firstChild;
    expect(linkBox).toHaveAttribute('class', expect.stringContaining('citron'));
  });
});
