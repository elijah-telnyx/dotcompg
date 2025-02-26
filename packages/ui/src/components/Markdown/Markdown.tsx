import React, { cloneElement, useMemo, type HTMLAttributes } from 'react';
import type { MarkdownToJSX } from 'markdown-to-jsx';
import type { GridItemProps } from '../Grid';
import {
  highlightBackgroundColor,
  type BackgroundColor,
} from '../../styles/constants/backgroundColorOptions';
import { MediaImage, MediaVideo } from '../Media';
import Table from '../Table';
import Heading from '../Typography/Heading';
import Paragraph from '../Typography/Paragraph';
import Code from '../Typography/Code';
import List from '../Typography/List';
import ListItem from '../Typography/ListItem';
import HorizontalRule from '../Typography/HorizontalRule';
import Quote from '../Typography/Quote';
import * as css from './Markdown.styled';
import Caption from '../Typography/Caption';
import type { BaseProps } from '../Typography/utils';

const MARKDOWN_OPTIONS: MarkdownProps['options'] = {
  forceBlock: true,
};

export const MARKDOWN_IMAGE_MAX_WIDTH = 1120;

type MarkdownTableRowProps = {
  children: React.ReactElement<HTMLAttributes<'th' | 'td'> & GridItemProps>[];
};

type MarkdownNestedParagraphProps = {
  children: React.ReactElement<{ children: string }>[];
};

export interface MarkdownProps {
  id?: string;
  children: string;
  options?: MarkdownToJSX.Options;
  blog?: boolean;
  dark?: BaseProps['dark'];
  lead?: boolean;
  caption?: boolean;
  inHeader?: boolean;
  noStyles?: boolean;
  hideOverflow?: boolean;
  backgroundColor?: BackgroundColor;
}

const Markdown = ({
  children,
  options = MARKDOWN_OPTIONS,
  blog,
  dark,
  lead,
  caption,
  inHeader,
  hideOverflow = false,
  noStyles,
  backgroundColor,
}: MarkdownProps) => {
  const markdownOptions = useMemo(() => {
    const { overrides, ...otherOptions } = options;
    const newOptions: MarkdownToJSX.Options = {
      forceBlock: true,
      overrides: noStyles
        ? { ...overrides }
        : {
            iframe: {
              component: (props) => {
                return <css.Iframe {...props} />;
              },
            },
            img: {
              component: ({ src, alt, ...props }) => {
                if (src.endsWith('.mp4')) {
                  return (
                    <MediaVideo
                      {...props}
                      src={src}
                      alt={alt}
                      width={MARKDOWN_IMAGE_MAX_WIDTH}
                      autoPlay
                      loop
                      css={{ maxWidth: '100%' }}
                    />
                  );
                }
                return (
                  <MediaImage
                    {...props}
                    src={src}
                    alt={alt}
                    width={MARKDOWN_IMAGE_MAX_WIDTH}
                  />
                );
              },
            },
            h1: {
              component: ({ children, id, ...props }) => (
                <Heading level={1} dark={dark} blog={blog} id={id} {...props}>
                  {children}
                </Heading>
              ),
            },
            h2: {
              component: ({ children, id, ...props }) => (
                <Heading
                  level={2}
                  dark={dark}
                  blog={blog}
                  id={id}
                  inHeader={inHeader}
                  {...props}
                >
                  {children}
                </Heading>
              ),
            },
            h3: {
              component: ({ children, id, ...props }) => (
                <Heading
                  level={3}
                  dark={dark}
                  blog={blog}
                  id={id}
                  inHeader={inHeader}
                  {...props}
                >
                  {children}
                </Heading>
              ),
            },
            p: {
              component: ({ children, ...props }) =>
                caption ? (
                  <Caption dark={dark} {...props}>
                    {children}
                  </Caption>
                ) : (
                  <Paragraph
                    dark={dark}
                    lead={lead}
                    blog={blog}
                    inHeader={inHeader}
                    {...props}
                  >
                    {children}
                  </Paragraph>
                ),
            },
            span: {
              component: ({ children, ...props }) =>
                caption ? (
                  <Caption dark={dark} {...props}>
                    {children}
                  </Caption>
                ) : (
                  <Paragraph
                    as='span'
                    dark={dark}
                    lead={lead}
                    inHeader={inHeader}
                    {...props}
                  >
                    {children}
                  </Paragraph>
                ),
            },
            code: {
              component: ({ children, ...props }) => (
                <Code dark={dark} {...props}>
                  {children}
                </Code>
              ),
            },
            a: {
              component: ({ children, href, ...props }) => {
                if (children?.toString() === '*') return children;

                return (
                  <css.Link
                    href={href}
                    dark={dark}
                    lead={lead}
                    blog={blog}
                    caption={caption}
                    {...props}
                    className='mchNoDecorate' // can be dynamically generated
                  >
                    {children}
                  </css.Link>
                );
              },
            },
            ul: {
              component: ({ children, ...props }) => (
                <List dark={dark} blog={blog} {...props}>
                  {children}
                </List>
              ),
            },
            ol: {
              component: ({ children, ...props }) => (
                <List dark={dark} blog={blog} as='ol' {...props}>
                  {children}
                </List>
              ),
            },
            li: {
              component: ({ children, ...props }) => (
                <ListItem dark={dark} blog={blog} {...props}>
                  {children}
                </ListItem>
              ),
            },
            table: {
              component: ({
                children,
                className,
                class: externalClassName,
                ...props
              }) => {
                const tableTheme =
                  (externalClassName || className)?.match(
                    /bg-(?<tableTheme>\w+)/
                  )?.groups.tableTheme || backgroundColor;

                return (
                  <Table.Root blog={blog} {...props} tableTheme={tableTheme}>
                    {children}
                  </Table.Root>
                );
              },
            },
            thead: {
              component: ({ children, ...props }) => (
                <Table.THead {...props}>{children}</Table.THead>
              ),
            },
            tbody: {
              component: ({ children, ...props }) => (
                <Table.TBody {...props}>{children}</Table.TBody>
              ),
            },
            caption: {
              component: ({ children, ...props }) => (
                <Table.Caption blog={blog} {...props}>
                  {children}
                </Table.Caption>
              ),
            },
            tr: {
              component: ({ children, ...props }: MarkdownTableRowProps) => {
                if (!children) {
                  return <Table.Row {...props}></Table.Row>; // padding row
                }

                const items = children.filter((element) => element.props);

                if (!items?.length) return null;

                return (
                  <Table.Row {...props}>
                    {items.map((element, index) =>
                      cloneElement(element, {
                        xs: css.getTableRowColumns(items.length, 'xs')[index],
                        small: css.getTableRowColumns(items.length, 'small')[
                          index
                        ],
                        medium: css.getTableRowColumns(items.length, 'medium')[
                          index
                        ],
                      })
                    )}
                  </Table.Row>
                );
              },
            },
            th: {
              component: ({ children, ...props }) => (
                <Table.HeaderCell {...props}>{children}</Table.HeaderCell>
              ),
            },
            td: {
              component: ({ children, ...props }) => (
                <Table.DataCell {...props}>{children}</Table.DataCell>
              ),
            },
            hr: {
              component: ({ children, ...props }) => (
                <HorizontalRule dark={dark} blog={blog} {...props}>
                  {children}
                </HorizontalRule>
              ),
            },
            strong: {
              component: ({ children, ...props }) => {
                const containsEmAndCode = React.Children.toArray(children).some(
                  (child) => {
                    // checking to see if the correct format is used.
                    if (React.isValidElement(child) && child.type === 'em') {
                      return React.Children.toArray(child.props.children).some(
                        (nestedChild) => {
                          return (
                            React.isValidElement(nestedChild) &&
                            nestedChild.type === 'em'
                          );
                        }
                      );
                    }
                    return false;
                  }
                );

                if (containsEmAndCode) {
                  // This is if in Markdown the syntax is ***text_tool tip content_***
                  return (
                    <>
                      <css.ToolTip {...props}>{children}</css.ToolTip>
                      <css.ToolTipBlur />
                    </>
                  );
                }

                // Default rendering for other <strong> elements
                return <strong {...props}>{children}</strong>;
              },
            },
            blockquote: {
              component: ({
                children,
                ...props
              }: MarkdownNestedParagraphProps) => {
                if (!children?.length) return null;

                const items = children
                  .map((element) => element?.props?.children)
                  .filter(Boolean);

                return (
                  <Quote dark={dark} blog={blog} {...props}>
                    {items.map((quotePart, index) => (
                      <css.QuotePart key={index}>{quotePart}</css.QuotePart>
                    ))}
                  </Quote>
                );
              },
            },
            div: {
              component: ({ children, className = '', ...props }) => {
                const highlight = className.includes(
                  css.HIGHLIGHT_GLOBAL_CLASS
                );
                const backgroundColor = className
                  .split(css.HIGHLIGHT_GLOBAL_CLASS)
                  .filter(Boolean)
                  .toString()
                  .trim();

                return (
                  <css.Div
                    highlight={highlight}
                    backgroundColor={backgroundColor}
                    {...props}
                  >
                    {children}
                  </css.Div>
                );
              },
            },
            ...overrides,
          },
      ...otherOptions,
    };

    return newOptions;
  }, [blog, dark, lead, options, inHeader, noStyles]);

  return (
    <css.MarkdownWrapper
      hideOverflow={hideOverflow}
      options={markdownOptions}
      backgroundColor={backgroundColor}
      highlight={highlightBackgroundColor(
        backgroundColor,
        typeof dark === 'boolean' ? dark : undefined
      )}
    >
      {children}
    </css.MarkdownWrapper>
  );
};

export default Markdown;
