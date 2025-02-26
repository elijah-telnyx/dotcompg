import { render } from '@testing-library/react';

import Link from '.';

describe('<Link />', () => {
  it('should render the component', () => {
    const { container } = render(<Link href='#'>Link</Link>);
    expect(container).toBeInTheDocument();
  });
});
