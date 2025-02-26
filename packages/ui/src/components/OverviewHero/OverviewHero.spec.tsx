import { render } from '@testing-library/react';

import OverviewHero from '.';

describe('<OverviewHero />', () => {
  it('should render the component', () => {
    const { container } = render(
      <OverviewHero
        heading='Blog'
        backgroundColor='cream'
        hasOverflow={false}
        spacingBottom='contrasting'
        spacingTop='contrasting'
      />
    );
    expect(container).toBeInTheDocument();
  });

  it('should render the component with the correct text', () => {
    const { container } = render(
      <OverviewHero
        heading='Blog'
        copy='Copy'
        backgroundColor='cream'
        hasOverflow={false}
        spacingBottom='contrasting'
        spacingTop='contrasting'
        centered
      />
    );
    expect(container.querySelector('p')?.textContent).toBe('Copy');
    expect(container.querySelector('h1')?.textContent).toBe('Blog');
  });
});
