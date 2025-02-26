import { render, screen } from '@testing-library/react';

import Heading from '.';
import type { HeadingProps } from './Heading';

const levels = [1, 2, 3] as HeadingProps['level'][];

describe('<Heading />', () => {
  describe('should render the correct heading', () => {
    test.each(levels)('h%s', async (level) => {
      render(<Heading level={level}>Heading</Heading>);
      expect(await screen.getByRole('heading', { level })).toBeInTheDocument();
    });
    test('h2 - category', async () => {
      render(
        <Heading level={2} category>
          Heading
        </Heading>
      );
      const headingCategory = await screen.getByText(/Heading/i);

      expect(headingCategory).toBeInTheDocument();
      expect(headingCategory.tagName).toBe('STRONG');
    });
  });
  it('should not use category variant for h1 and h3', () => {
    const H2WithCategory = render(
      <Heading level={2} category>
        Heading
      </Heading>
    );

    ([1, 3] as HeadingProps['level'][]).forEach((level) => {
      const heading = render(<Heading level={level}>Heading ${level}</Heading>);
      const headingWithCategory = render(
        <Heading level={level} category>
          Heading ${level}
        </Heading>
      );

      expect(heading.container).toStrictEqual(headingWithCategory.container);
      expect(heading.container).not.toStrictEqual(H2WithCategory.container);
    });
  });
});
