import { render, screen } from '@testing-library/react';
import GreenhouseJobBoard from './GreenhouseJobBoard';
import { greenhouseMock } from './GreenhouseJobBoard.stories';

describe('GreenhouseJobBoard', () => {
  it('Should render with a list of jobs', () => {
    const { container } = render(
      <GreenhouseJobBoard departments={greenhouseMock.departments} />
    );

    expect(container).toHaveTextContent(greenhouseMock.departments[1].name);
    expect(container).toHaveTextContent(
      greenhouseMock.departments[1].jobs[0].title
    );
  });

  it('The title should be a link to the job', () => {
    render(<GreenhouseJobBoard departments={greenhouseMock.departments} />);

    const link = screen.getAllByTestId('job-link');

    expect(link[0]).toHaveAttribute(
      'href',
      greenhouseMock.departments[1].jobs[0].absolute_url
    );
  });

  it('Should render a list of jobs sorted by location name', () => {
    render(<GreenhouseJobBoard departments={greenhouseMock.departments} />);

    const jobList = screen.getAllByTestId('job-location');

    expect(jobList[0]).toHaveTextContent(
      greenhouseMock.departments[1].jobs[2].location.name
    );
    expect(jobList[1]).toHaveTextContent(
      greenhouseMock.departments[1].jobs[1].location.name
    );
  });
});
