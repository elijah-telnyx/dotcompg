import type { Meta, StoryObj } from '@storybook/react';

import GreenhouseJobBoard, {
  type GreenhouseJobBoardProps,
} from './GreenhouseJobBoard';

const greenhouseMock: GreenhouseJobBoardProps = {
  departments: [
    {
      id: 32,
      name: 'Product',
      parent_id: null,
      child_ids: [],
      jobs: [],
    },
    {
      id: 1233,
      name: 'Sales',
      parent_id: null,
      child_ids: [],
      jobs: [
        {
          absolute_url: 'https://boards.greenhouse.io/TOKEN/jobs/123',
          data_compliance: [
            { type: 'gdpr', requires_consent: false, retention_period: null },
          ],
          internal_job_id: 4097776003,
          location: { name: 'United States: Remote' },
          metadata: null,
          id: 22223444,
          updated_at: '2023-01-19T04:15:00-05:00',
          requisition_id: '4',
          title: 'Business Executive - US',
        },
        {
          absolute_url: 'https://boards.greenhouse.io/TOKEN/jobs/123',
          data_compliance: [
            { type: 'gdpr', requires_consent: false, retention_period: null },
          ],
          internal_job_id: 4097776003,
          location: { name: 'United States: Remote' },
          metadata: null,
          id: 23332312312454444,
          updated_at: '2023-01-19T04:15:00-05:00',
          requisition_id: '4',
          title: 'Account Executive - US',
        },
        {
          absolute_url: 'https://boards.greenhouse.io/TOKEN/jobs/123',
          data_compliance: [
            { type: 'gdpr', requires_consent: false, retention_period: null },
          ],
          internal_job_id: 4271596003,
          location: { name: 'Austin, TX; Chicago, IL; United States: Remote' },
          metadata: null,
          id: 4412113334003,
          updated_at: '2023-01-19T04:15:00-05:00',
          requisition_id: '174',
          title: 'Sales Development Representative',
        },
      ],
    },
    {
      id: 3213123,
      name: 'Design',
      parent_id: null,
      child_ids: [],
      jobs: [],
    },
    {
      id: 234234,
      name: 'Engineering',
      parent_id: null,
      child_ids: [],
      jobs: [
        {
          absolute_url: 'https://boards.greenhouse.io/TOKEN/jobs/123',
          data_compliance: [
            { type: 'gdpr', requires_consent: false, retention_period: null },
          ],
          internal_job_id: 4097776003,
          location: { name: 'EU: Remote' },
          metadata: null,
          id: 123,
          updated_at: '2023-01-19T04:15:00-05:00',
          requisition_id: '4',
          title: 'Frontend Developer',
        },
        {
          absolute_url: 'https://boards.greenhouse.io/TOKEN/jobs/123',
          data_compliance: [
            { type: 'gdpr', requires_consent: false, retention_period: null },
          ],
          internal_job_id: 4097776003,
          location: { name: 'EU: Remote' },
          metadata: null,
          id: 5345345,
          updated_at: '2023-01-19T04:15:00-05:00',
          requisition_id: '4',
          title: 'Backend Developer',
        },
        {
          absolute_url: 'https://boards.greenhouse.io/TOKEN/jobs/123',
          data_compliance: [
            { type: 'gdpr', requires_consent: false, retention_period: null },
          ],
          internal_job_id: 4097776003,
          location: { name: 'Zürich' },
          metadata: null,
          id: 4136325003,
          updated_at: '2023-01-19T04:15:00-05:00',
          requisition_id: '4',
          title: 'Frontend Developer',
        },
        {
          absolute_url: 'https://boards.greenhouse.io/TOKEN/jobs/123',
          data_compliance: [
            { type: 'gdpr', requires_consent: false, retention_period: null },
          ],
          internal_job_id: 4097776003,
          location: { name: 'Brazil' },
          metadata: null,
          id: 515123,
          updated_at: '2023-01-19T04:15:00-05:00',
          requisition_id: '4',
          title: 'Backend Developer',
        },
      ],
    },
  ],
};

const componentMeta: Meta<GreenhouseJobBoardProps> = {
  title: 'Layout/Greenhouse Job Board',
  component: GreenhouseJobBoard,
  parameters: {
    layout: 'fullscreen',
  },
};

export default componentMeta;

type Story = StoryObj<GreenhouseJobBoardProps>;

export const Default: Story = {
  args: {},
};

export { greenhouseMock };
