import { useEffect, useState } from 'react';
import Link from '../Typography/Link';
import * as css from './GreenhouseJobBoard.styled';
import Section from '../Section';
import Heading from '../Typography/Heading';
import Grid from '../Grid';
import Paragraph from '../Typography/Paragraph';

type Job = {
  absolute_url: string;
  data_compliance: {
    type: string;
    requires_consent: boolean;
    retention_period: null;
  }[];
  internal_job_id: number;
  location: {
    name: string;
  };
  metadata: null;
  id: number;
  updated_at: string;
  requisition_id: string;
  title: string;
};

export type Department = {
  id: number;
  name: string;
  parent_id: number | null;
  child_ids: number[];
  jobs: Job[];
};

const ByName = (a: Job, b: Job) => {
  if (a.title < b.title) return -1;
  if (a.title > b.title) return 1;
  return 0;
};

const ByLocation = (a: Job, b: Job) => {
  if (a.location.name < b.location.name) return -1;
  if (a.location.name > b.location.name) return 1;
  return 0;
};

export interface GreenhouseJobBoardProps {
  departments: Department[];
}

const GreenhouseJobBoard = ({ departments }: GreenhouseJobBoardProps) => {
  const [sortedDepartmentList, setSortedDepartmentList] = useState<
    Department[]
  >([]);

  const loadDepartments = (departamentsList: Department[]) => {
    const departmentList = departamentsList
      .filter((d: Department) => {
        return d.jobs.length > 0;
      })
      .map((depart: Department) => {
        // sort jobs by name and location
        depart.jobs.sort(ByName);
        depart.jobs.sort(ByLocation);

        return depart;
      });
    setSortedDepartmentList(departmentList);
  };

  useEffect(() => {
    loadDepartments(departments);
  }, [departments]);

  return (
    <Section
      spacingTop='contrasting'
      spacingBottom='contrasting'
      hasOverflow={false}
      backgroundColor='cream'
    >
      <Grid.Container>
        <Grid.FullWidthItem>
          <Heading level={2}>Come and work with us!</Heading>
          <Paragraph>
            We&lsquo;re always looking for talented people to join the Telnyx
            team.
          </Paragraph>
        </Grid.FullWidthItem>
        <Grid.FullWidthItem>
          {sortedDepartmentList.map((departmentItem: Department) => (
            <div key={departmentItem.id}>
              <css.Title level={3}>{departmentItem.name}</css.Title>
              {departmentItem.jobs.map((job) => (
                <css.JobWrapper key={job.id}>
                  <Link
                    as='a'
                    href={job.absolute_url}
                    target='_blank'
                    rel='noopener noreferrer'
                    data-testid='job-link'
                  >
                    <Paragraph data-testid='job-title'>{job.title}</Paragraph>
                  </Link>
                  <Paragraph data-testid='job-location'>
                    {job.location.name}
                  </Paragraph>
                </css.JobWrapper>
              ))}
            </div>
          ))}
        </Grid.FullWidthItem>
      </Grid.Container>
    </Section>
  );
};

export default GreenhouseJobBoard;
