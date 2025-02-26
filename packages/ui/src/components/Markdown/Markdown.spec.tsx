import { render } from '@testing-library/react';

import Markdown from '.';

describe('<Markdown />', () => {
  it('should render the component', () => {
    const { container } = render(<Markdown>{'# Heading1'}</Markdown>);
    expect(container).toBeInTheDocument();
  });
});
