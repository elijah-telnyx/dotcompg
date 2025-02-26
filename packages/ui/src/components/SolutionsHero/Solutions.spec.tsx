import { render } from '@testing-library/react';

import SolutionsHero from '.';

const setup = () => {
  return render(
    <SolutionsHero
      backgroundColor='cream'
      tagline='Use case'
      heading='Two-Factor Authentication'
      media={{
        src: 'https://via.placeholder.com/1032x430.webpg',
        alt: 'placeholder',
      }}
      hasOverflow={false}
      spacingBottom='contrasting'
      spacingTop='contrasting'
    />
  );
};

describe('<SolutionsHero />', () => {
  it('should render the component', () => {
    const { container } = setup();
    expect(container).toBeInTheDocument();
  });
});
