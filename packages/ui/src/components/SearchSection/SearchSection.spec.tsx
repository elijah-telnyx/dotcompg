import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchSection from '.';

const user = userEvent.setup();

const baseSearchProps = { id: 'search', name: 'search', placeholder: 'Search' };

describe('<SearchSection />', () => {
  it('should render the component', () => {
    const { container } = render(
      <SearchSection
        heading='Blog'
        backgroundColor='cream'
        searchProps={baseSearchProps}
      />
    );

    expect(container).toBeInTheDocument();
  });

  it('should render the component with the correct text', () => {
    const { container } = render(
      <SearchSection
        heading='Blog'
        backgroundColor='cream'
        searchProps={baseSearchProps}
      />
    );

    expect(container.querySelector('h1')?.textContent).toBe('Blog');
  });

  it('should respect the initialSearch props', () => {
    const { container } = render(
      <SearchSection
        heading='Blog'
        backgroundColor='cream'
        searchProps={{ ...baseSearchProps, defaultValue: 'some query' }}
      />
    );

    expect(container.querySelector('input')?.value).toBe('some query');
  });

  it('should call the onSearch callback', async () => {
    const onSearch = jest.fn();

    const { container } = render(
      <SearchSection
        heading='Blog'
        backgroundColor='cream'
        searchProps={{ ...baseSearchProps, onSearch }}
      />
    );

    const searchInput = container.querySelector('input');

    if (!searchInput) {
      throw new Error('searchInput not found');
    }

    await act(async () => {
      await user.type(searchInput, 'some other query');
      await user.keyboard('[Enter]');
    });

    expect(onSearch).toHaveBeenCalledWith('some other query');
  });
});
