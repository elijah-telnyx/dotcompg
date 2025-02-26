import type { StoryObj, Meta } from '@storybook/react';
import RichTextSection, { type RichTextSectionProps } from './RichTextSection';
import { BLOCKS, INLINES } from '../RichText/RichText';

const componentMeta: Meta<RichTextSectionProps> = {
  title: 'Layout/RichTextSection',
  component: RichTextSection,
  parameters: {
    layout: 'fullscreen',
  },
};

export default componentMeta;

type Story = StoryObj<RichTextSectionProps>;

export const Default: Story = {
  args: {
    copy: {
      nodeType: BLOCKS.DOCUMENT,
      data: {},
      content: [
        {
          nodeType: BLOCKS.HEADING_1,
          data: {},
          content: [
            {
              nodeType: 'text',
              value: 'Heading 1',
              marks: [],
              data: {},
            },
          ],
        },
        {
          nodeType: BLOCKS.HEADING_2,
          data: {},
          content: [
            {
              nodeType: 'text',
              value: 'Heading 2',
              marks: [],
              data: {},
            },
          ],
        },
        {
          nodeType: BLOCKS.HEADING_3,
          data: {},
          content: [
            {
              nodeType: 'text',
              value: 'Heading 3',
              marks: [],
              data: {},
            },
          ],
        },
        {
          nodeType: BLOCKS.PARAGRAPH,
          data: {},
          content: [
            {
              nodeType: 'text',
              value: BLOCKS.PARAGRAPH,
              marks: [],
              data: {},
            },
          ],
        },
        {
          nodeType: BLOCKS.PARAGRAPH,
          data: {},
          content: [
            {
              nodeType: 'text',
              value: 'Italic',
              marks: [
                {
                  type: 'italic',
                },
              ],
              data: {},
            },
          ],
        },
        {
          nodeType: BLOCKS.UL_LIST,
          data: {},
          content: [
            {
              nodeType: BLOCKS.LIST_ITEM,
              data: {},
              content: [
                {
                  nodeType: BLOCKS.PARAGRAPH,
                  data: {},
                  content: [
                    {
                      nodeType: 'text',
                      value: 'Ul1',
                      marks: [],
                      data: {},
                    },
                  ],
                },
              ],
            },
            {
              nodeType: BLOCKS.LIST_ITEM,
              data: {},
              content: [
                {
                  nodeType: BLOCKS.PARAGRAPH,
                  data: {},
                  content: [
                    {
                      nodeType: 'text',
                      value: 'Ul2',
                      marks: [],
                      data: {},
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          nodeType: BLOCKS.TABLE,
          data: {},
          content: [
            {
              nodeType: BLOCKS.TABLE_ROW,
              data: {},
              content: [
                {
                  nodeType: BLOCKS.TABLE_HEADER_CELL,
                  data: {},
                  content: [
                    {
                      nodeType: BLOCKS.PARAGRAPH,
                      data: {},
                      content: [
                        {
                          nodeType: 'text',
                          value: 'Header',
                          marks: [],
                          data: {},
                        },
                      ],
                    },
                  ],
                },
                {
                  nodeType: BLOCKS.TABLE_HEADER_CELL,
                  data: {},
                  content: [
                    {
                      nodeType: BLOCKS.PARAGRAPH,
                      data: {},
                      content: [
                        {
                          nodeType: 'text',
                          value: 'Row',
                          marks: [],
                          data: {},
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              nodeType: BLOCKS.TABLE_ROW,
              data: {},
              content: [
                {
                  nodeType: BLOCKS.TABLE_CELL,
                  data: {},
                  content: [
                    {
                      nodeType: BLOCKS.PARAGRAPH,
                      data: {},
                      content: [
                        {
                          nodeType: 'text',
                          value: 'Table',
                          marks: [],
                          data: {},
                        },
                      ],
                    },
                  ],
                },
                {
                  nodeType: BLOCKS.TABLE_CELL,
                  data: {},
                  content: [
                    {
                      nodeType: BLOCKS.PARAGRAPH,
                      data: {},
                      content: [
                        {
                          nodeType: 'text',
                          value: 'Row 1',
                          marks: [],
                          data: {},
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          nodeType: BLOCKS.PARAGRAPH,
          data: {},
          content: [
            {
              nodeType: 'text',
              value: '',
              marks: [],
              data: {},
            },
            {
              nodeType: INLINES.HYPERLINK,
              data: {
                uri: 'https://telnyx.com',
              },
              content: [
                {
                  nodeType: 'text',
                  value: 'Link',
                  marks: [],
                  data: {},
                },
              ],
            },
            {
              nodeType: 'text',
              value: '',
              marks: [],
              data: {},
            },
          ],
        },
      ],
    },
  },
};
