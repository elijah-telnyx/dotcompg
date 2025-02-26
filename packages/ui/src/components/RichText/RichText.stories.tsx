import type { Meta, StoryObj } from '@storybook/react';
import RichText, { BLOCKS, INLINES, type RichTextProps } from './RichText';

const Main: Meta<RichTextProps> = {
  title: 'Components/RichText',
  component: RichText,
  parameters: {
    layout: 'fullscreen',
  },
};

export default Main;

type story = StoryObj<RichTextProps>;

export const Basic: story = {
  args: {
    data: {
      nodeType: BLOCKS.DOCUMENT,
      data: {},
      content: [
        {
          nodeType: BLOCKS.PARAGRAPH,
          data: {},
          content: [
            {
              nodeType: 'text',
              value: 'Hello world!',
              marks: [],
              data: {},
            },
          ],
        },
      ],
    },
  },
};

export const WithMarks: story = {
  args: {
    data: {
      nodeType: BLOCKS.DOCUMENT,
      data: {},
      content: [
        {
          nodeType: BLOCKS.PARAGRAPH,
          data: {},
          content: [
            {
              nodeType: 'text',
              value: 'Hello',
              marks: [{ type: 'bold' }],
              data: {},
            },
            {
              nodeType: 'text',
              value: ' world!',
              marks: [{ type: 'italic' }],
              data: {},
            },
          ],
        },
      ],
    },
  },
};

export const AllElement: story = {
  args: {
    data: {
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
          nodeType: BLOCKS.HEADING_4,
          data: {},
          content: [
            {
              nodeType: 'text',
              value: 'Heading 4',
              marks: [],
              data: {},
            },
          ],
        },
        {
          nodeType: BLOCKS.HEADING_5,
          data: {},
          content: [
            {
              nodeType: 'text',
              value: 'Heading 5',
              marks: [],
              data: {},
            },
          ],
        },
        {
          nodeType: BLOCKS.HEADING_6,
          data: {},
          content: [
            {
              nodeType: 'text',
              value: 'Heading 6',
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
          nodeType: BLOCKS.PARAGRAPH,
          data: {},
          content: [
            {
              nodeType: 'text',
              value: 'Bold',
              marks: [
                {
                  type: 'bold',
                },
              ],
              data: {},
            },
          ],
        },
        {
          nodeType: BLOCKS.OL_LIST,
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
          nodeType: BLOCKS.OL_LIST,
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
                      value: 'OL 1',
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
                      value: 'Ol 2',
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
              value: 'Underline',
              marks: [
                {
                  type: 'underline',
                },
              ],
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
              value: 'Code',
              marks: [
                {
                  type: 'code',
                },
              ],
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
              value: 'Superscript',
              marks: [
                {
                  type: 'superscript',
                },
              ],
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
              value: 'Subscript',
              marks: [
                {
                  type: 'subscript',
                },
              ],
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

        {
          nodeType: BLOCKS.QUOTE,
          data: {},
          content: [
            {
              nodeType: BLOCKS.PARAGRAPH,
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value:
                    'Dorothy followed her through many of the beautiful rooms in her castle.',
                  marks: [],
                  data: {},
                },
              ],
            },
          ],
        },
        {
          nodeType: BLOCKS.HR,
          data: {},
          content: [],
        },
      ],
    },
  },
};
