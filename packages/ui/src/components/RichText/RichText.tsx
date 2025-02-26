import * as css from '../Markdown/Markdown.styled';

import {
  documentToReactComponents,
  type NodeRenderer,
  type Options,
} from '@contentful/rich-text-react-renderer';
import {
  BLOCKS,
  INLINES,
  MARKS,
  type Document,
} from '@contentful/rich-text-types';
import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
} from 'react';
import { MARKDOWN_IMAGE_MAX_WIDTH } from '../Markdown';
import { MediaImage, MediaVideo } from '../Media';
import Table from '../Table';
import Code from '../Typography/Code';
import Heading from '../Typography/Heading';
import HorizontalRule from '../Typography/HorizontalRule';
import List from '../Typography/List';
import ListItem from '../Typography/ListItem';
import Paragraph from '../Typography/Paragraph';
import Quote from '../Typography/Quote';
export {
  BLOCKS,
  CONTAINERS,
  INLINES,
  MARKS,
} from '@contentful/rich-text-types';

export interface RichTextProps {
  data: Document;
  options?: Options;
}

const DEFAULT_OPTIONS: Options = {
  preserveWhitespace: true, // not compatible with renderText
  renderMark: {
    [MARKS.CODE]: (text) => <Code>{text}</Code>,
  },
  renderNode: {
    [BLOCKS.HEADING_1]: (_node, children) => (
      <Heading level={1}>{children}</Heading>
    ),
    [BLOCKS.HEADING_2]: (_node, children) => (
      <Heading level={2}>{children}</Heading>
    ),
    [BLOCKS.HEADING_3]: (_node, children) => (
      <Heading level={3}>{children}</Heading>
    ),
    [BLOCKS.PARAGRAPH]: (_node, children) => <Paragraph>{children}</Paragraph>,
    [BLOCKS.UL_LIST]: (_node, children) => <List>{children}</List>,
    [BLOCKS.OL_LIST]: (_node, children) => <List as='ol'>{children}</List>,
    [BLOCKS.LIST_ITEM]: (_node, children) => <ListItem>{children}</ListItem>,
    [BLOCKS.HR]: () => <HorizontalRule />,
    [INLINES.HYPERLINK]: (_node, children) => {
      if (children?.toString() === '*') return children;

      return (
        <css.Link href={_node.data.uri} className='mchNoDecorate'>
          {children}
        </css.Link>
      );
    },
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { title, description, file } = node.data.target.fields;
      const src = file.url;

      if (src.endsWith('.mp4')) {
        return (
          <MediaVideo
            src={src}
            alt={description || title}
            width={MARKDOWN_IMAGE_MAX_WIDTH}
            autoPlay
            loop
          />
        );
      }
      return (
        <MediaImage
          src={src}
          alt={description || title}
          width={MARKDOWN_IMAGE_MAX_WIDTH}
        />
      );
    },
    [BLOCKS.QUOTE]: (node, _children) => {
      const quoteValue = node.content.map((content) =>
        documentToReactComponents(content as Document, {
          preserveWhitespace: true,
          renderNode: {
            [BLOCKS.PARAGRAPH]: (_node, children) => children,
          },
        })
      );

      return (
        <Quote>
          {quoteValue.map((value, i) => (
            <css.QuotePart key={i}>{value}</css.QuotePart>
          ))}
        </Quote>
      );
    },
    [BLOCKS.TABLE]: (node, _children) => {
      const [head, ...body] = node.content;

      return (
        <Table.Root>
          <Table.THead>
            {documentToReactComponents(head as unknown as Document, {
              renderNode: {
                [BLOCKS.TABLE_ROW]: TableRow,
                [BLOCKS.PARAGRAPH]: (_node, children) => children,
                [BLOCKS.TABLE_HEADER_CELL]: (_node, children) => (
                  <Table.HeaderCell data-table='header cell'>
                    {children}
                  </Table.HeaderCell>
                ),
              },
            })}
          </Table.THead>
          <Table.TBody>
            {body.map((item) => {
              return documentToReactComponents(item as unknown as Document, {
                renderNode: {
                  [BLOCKS.PARAGRAPH]: (_node, children) => children,
                  [BLOCKS.TABLE_ROW]: TableRow,
                  [BLOCKS.TABLE_CELL]: (_node, children) => {
                    return <Table.DataCell>{children}</Table.DataCell>;
                  },
                },
              });
            })}
          </Table.TBody>
        </Table.Root>
      );
    },
  },
};

const TableRow: NodeRenderer = (_node, children) => {
  if (!children) {
    return <Table.Row></Table.Row>; // padding row
  }

  const items: ReactElement[] =
    Children.toArray(children).filter(isValidElement);

  if (!items?.length) return null;

  return (
    <Table.Row>
      {items.map((element, index) =>
        cloneElement(element, {
          xs: css.getTableRowColumns(items.length, 'xs')[index],
          small: css.getTableRowColumns(items.length, 'small')[index],
          medium: css.getTableRowColumns(items.length, 'medium')[index],
        })
      )}
    </Table.Row>
  );
};

/**
 * @link https://www.npmjs.com/package/@contentful/rich-text-react-renderer
 */
const RichText = ({ data, options }: RichTextProps) => {
  return documentToReactComponents(data, {
    ...DEFAULT_OPTIONS,
    ...options,
  });
};

export default RichText;
