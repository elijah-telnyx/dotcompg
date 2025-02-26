import { render } from '@testing-library/react';

import TextCallout from '.';

const defaultProps = {
  copy: `hey did you uhh know that um, this text stands out? it's supposed to catch your eye, idk i'm just a prompt ♡⸜(˶˃ ᵕ ˂˶)⸝♡`,
};

describe('<TextCallout />', () => {
  it('should render the component', () => {
    const { container } = render(
      <TextCallout
        backgroundColor='citron'
        hasOverflow={false}
        spacingBottom='contrasting'
        spacingTop='contrasting'
        {...defaultProps}
      />
    );
    expect(container).toBeInTheDocument();
  });

  it('should render the component with correct text', () => {
    const { getByText } = render(
      <TextCallout
        backgroundColor='citron'
        hasOverflow={false}
        spacingBottom='contrasting'
        spacingTop='contrasting'
        {...defaultProps}
      />
    );
    expect(getByText(defaultProps.copy)).toBeInTheDocument();
  });
});
