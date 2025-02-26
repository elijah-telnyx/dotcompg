import ReactMarkdown from 'react-markdown';
import { styled } from 'ui/styles';

/** Wrapper for react-markdown custom styles */
import React from 'react';
import remarkGfm from 'remark-gfm';
import dynamic from 'next/dynamic';

const SyntaxHighlighter = dynamic(() => import('react-syntax-highlighter').then((module) => module.Prism), {
  ssr: false,
});

const theme: { [key: string]: React.CSSProperties } = {
  'code[class*="language-"]': {
    background: 'black',
    color: 'hsl(220, 14%, 71%)',
    textShadow: '0 1px rgba(0, 0, 0, 0.3)',
    fontFamily: '"Fira Code", "Fira Mono", Menlo, Consolas, "DejaVu Sans Mono", monospace',
    direction: 'ltr',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    lineHeight: '1.5',
    MozTabSize: '2',
    OTabSize: '2',
    tabSize: '2',
    WebkitHyphens: 'none',
    MozHyphens: 'none',
    msHyphens: 'none',
    hyphens: 'none',
  },
  'pre[class*="language-"]': {
    background: 'black',
    color: 'hsl(220, 14%, 71%)',
    textShadow: '0 1px rgba(0, 0, 0, 0.3)',
    fontFamily: '"Fira Code", "Fira Mono", Menlo, Consolas, "DejaVu Sans Mono", monospace',
    direction: 'ltr',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    lineHeight: '1.5',
    MozTabSize: '2',
    OTabSize: '2',
    tabSize: '2',
    WebkitHyphens: 'none',
    MozHyphens: 'none',
    msHyphens: 'none',
    hyphens: 'none',
    padding: '1rem 1.25rem',
    overflow: 'auto',
    borderRadius: '0 0 8px 8px',
  },
  'code[class*="language-"]::-moz-selection': {
    background: 'hsl(220, 13%, 28%)',
    color: 'inherit',
    textShadow: 'none',
  },
  'code[class*="language-"] *::-moz-selection': {
    background: 'hsl(220, 13%, 28%)',
    color: 'inherit',
    textShadow: 'none',
  },
  'pre[class*="language-"] *::-moz-selection': {
    background: 'hsl(220, 13%, 28%)',
    color: 'inherit',
    textShadow: 'none',
  },
  'code[class*="language-"]::selection': {
    background: 'hsl(220, 13%, 28%)',
    color: 'inherit',
    textShadow: 'none',
  },
  'code[class*="language-"] *::selection': {
    background: 'hsl(220, 13%, 28%)',
    color: 'inherit',
    textShadow: 'none',
  },
  'pre[class*="language-"] *::selection': {
    background: 'hsl(220, 13%, 28%)',
    color: 'inherit',
    textShadow: 'none',
  },
  ':not(pre) > code[class*="language-"]': {
    padding: '0.2em 0.3em',
    borderRadius: '0.3em',
    whiteSpace: 'normal',
  },
  comment: {
    color: 'hsl(220, 10%, 40%)',
    fontStyle: 'italic',
  },
  prolog: {
    color: 'hsl(220, 10%, 40%)',
  },
  cdata: {
    color: 'hsl(220, 10%, 40%)',
  },
  doctype: {
    color: 'hsl(220, 14%, 71%)',
  },
  punctuation: {
    color: 'hsl(220, 14%, 71%)',
  },
  entity: {
    color: 'hsl(220, 14%, 71%)',
    cursor: 'help',
  },
  'attr-name': {
    color: 'hsl(29, 54%, 61%)',
  },
  'class-name': {
    color: 'hsl(29, 54%, 61%)',
  },
  boolean: {
    color: 'hsl(29, 54%, 61%)',
  },
  constant: {
    color: 'hsl(29, 54%, 61%)',
  },
  number: {
    color: 'hsl(29, 54%, 61%)',
  },
  atrule: {
    color: 'hsl(29, 54%, 61%)',
  },
  keyword: {
    color: 'hsl(286, 60%, 67%)',
  },
  property: {
    color: 'hsl(355, 65%, 65%)',
  },
  tag: {
    color: 'hsl(355, 65%, 65%)',
  },
  symbol: {
    color: 'hsl(355, 65%, 65%)',
  },
  deleted: {
    color: 'hsl(355, 65%, 65%)',
  },
  important: {
    color: 'hsl(355, 65%, 65%)',
  },
  selector: {
    color: '#00c08b',
  },
  string: {
    color: '#00c08b',
  },
  char: {
    color: '#00c08b',
  },
  builtin: {
    color: '#00c08b',
  },
  inserted: {
    color: '#00c08b',
  },
  regex: {
    color: '#00c08b',
  },
  'attr-value': {
    color: '#00c08b',
  },
  'attr-value > .token.punctuation': {
    color: '#00c08b',
  },
  variable: {
    color: '#58A6FF',
  },
  operator: {
    color: '#58A6FF',
  },
  function: {
    color: '#58A6FF',
  },
  url: {
    color: 'hsl(187, 47%, 55%)',
  },
  'attr-value > .token.punctuation.attr-equals': {
    color: 'hsl(220, 14%, 71%)',
  },
  'special-attr > .token.attr-value > .token.value.css': {
    color: 'hsl(220, 14%, 71%)',
  },
  '.language-css .token.selector': {
    color: 'hsl(355, 65%, 65%)',
  },
  '.language-css .token.property': {
    color: 'hsl(220, 14%, 71%)',
  },
  '.language-css .token.function': {
    color: 'hsl(187, 47%, 55%)',
  },
  '.language-css .token.url > .token.function': {
    color: 'hsl(187, 47%, 55%)',
  },
  '.language-css .token.url > .token.string.url': {
    color: '#00c08b',
  },
  '.language-css .token.important': {
    color: 'hsl(286, 60%, 67%)',
  },
  '.language-css .token.atrule .token.rule': {
    color: 'hsl(286, 60%, 67%)',
  },
  '.language-javascript .token.operator': {
    color: 'hsl(286, 60%, 67%)',
  },
  '.language-javascript .token.template-string > .token.interpolation > .token.interpolation-punctuation.punctuation': {
    color: 'hsl(5, 48%, 51%)',
  },
  '.language-json .token.operator': {
    color: 'hsl(220, 14%, 71%)',
  },
  '.language-json .token.null.keyword': {
    color: 'hsl(29, 54%, 61%)',
  },
  '.language-markdown .token.url': {
    color: 'hsl(220, 14%, 71%)',
  },
  '.language-markdown .token.url > .token.operator': {
    color: 'hsl(220, 14%, 71%)',
  },
  '.language-markdown .token.url-reference.url > .token.string': {
    color: 'hsl(220, 14%, 71%)',
  },
  '.language-markdown .token.url > .token.content': {
    color: '#58A6FF',
  },
  '.language-markdown .token.url > .token.url': {
    color: 'hsl(187, 47%, 55%)',
  },
  '.language-markdown .token.url-reference.url': {
    color: 'hsl(187, 47%, 55%)',
  },
  '.language-markdown .token.blockquote.punctuation': {
    color: 'hsl(220, 10%, 40%)',
    fontStyle: 'italic',
  },
  '.language-markdown .token.hr.punctuation': {
    color: 'hsl(220, 10%, 40%)',
    fontStyle: 'italic',
  },
  '.language-markdown .token.code-snippet': {
    color: '#00c08b',
  },
  '.language-markdown .token.bold .token.content': {
    color: 'hsl(29, 54%, 61%)',
  },
  '.language-markdown .token.italic .token.content': {
    color: 'hsl(286, 60%, 67%)',
  },
  '.language-markdown .token.strike .token.content': {
    color: 'hsl(355, 65%, 65%)',
  },
  '.language-markdown .token.strike .token.punctuation': {
    color: 'hsl(355, 65%, 65%)',
  },
  '.language-markdown .token.list.punctuation': {
    color: 'hsl(355, 65%, 65%)',
  },
  '.language-markdown .token.title.important > .token.punctuation': {
    color: 'hsl(355, 65%, 65%)',
  },
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
  'token.tab:not(:empty):before': {
    color: 'hsla(220, 14%, 71%, 0.15)',
    textShadow: 'none',
  },
  'token.cr:before': {
    color: 'hsla(220, 14%, 71%, 0.15)',
    textShadow: 'none',
  },
  'token.lf:before': {
    color: 'hsla(220, 14%, 71%, 0.15)',
    textShadow: 'none',
  },
  'token.space:before': {
    color: 'hsla(220, 14%, 71%, 0.15)',
    textShadow: 'none',
  },
  'div.code-toolbar > .toolbar.toolbar > .toolbar-item': {
    marginRight: '0.4em',
  },
  'div.code-toolbar > .toolbar.toolbar > .toolbar-item > button': {
    background: 'hsl(220, 13%, 26%)',
    color: 'hsl(220, 9%, 55%)',
    padding: '0.1em 0.4em',
    borderRadius: '0.3em',
  },
  'div.code-toolbar > .toolbar.toolbar > .toolbar-item > a': {
    background: 'hsl(220, 13%, 26%)',
    color: 'hsl(220, 9%, 55%)',
    padding: '0.1em 0.4em',
    borderRadius: '0.3em',
  },
  'div.code-toolbar > .toolbar.toolbar > .toolbar-item > span': {
    background: 'hsl(220, 13%, 26%)',
    color: 'hsl(220, 9%, 55%)',
    padding: '0.1em 0.4em',
    borderRadius: '0.3em',
  },
  'div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:hover': {
    background: 'hsl(220, 13%, 28%)',
    color: 'hsl(220, 14%, 71%)',
  },
  'div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:focus': {
    background: 'hsl(220, 13%, 28%)',
    color: 'hsl(220, 14%, 71%)',
  },
  'div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:hover': {
    background: 'hsl(220, 13%, 28%)',
    color: 'hsl(220, 14%, 71%)',
  },
  'div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:focus': {
    background: 'hsl(220, 13%, 28%)',
    color: 'hsl(220, 14%, 71%)',
  },
  'div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:hover': {
    background: 'hsl(220, 13%, 28%)',
    color: 'hsl(220, 14%, 71%)',
  },
  'div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:focus': {
    background: 'hsl(220, 13%, 28%)',
    color: 'hsl(220, 14%, 71%)',
  },
  '.line-highlight.line-highlight': {
    background: 'hsla(220, 100%, 80%, 0.04)',
  },
  '.line-highlight.line-highlight:before': {
    background: 'hsl(220, 13%, 26%)',
    color: 'hsl(220, 14%, 71%)',
    padding: '0.1em 0.6em',
    borderRadius: '0.3em',
    boxShadow: '0 2px 0 0 rgba(0, 0, 0, 0.2)',
  },
  '.line-highlight.line-highlight[data-end]:after': {
    background: 'hsl(220, 13%, 26%)',
    color: 'hsl(220, 14%, 71%)',
    padding: '0.1em 0.6em',
    borderRadius: '0.3em',
    boxShadow: '0 2px 0 0 rgba(0, 0, 0, 0.2)',
  },
  'pre[id].linkable-line-numbers.linkable-line-numbers span.line-numbers-rows > span:hover:before': {
    backgroundColor: 'hsla(220, 100%, 80%, 0.04)',
  },
  '.line-numbers.line-numbers .line-numbers-rows': {
    borderRightColor: 'hsla(220, 14%, 71%, 0.15)',
  },
  '.command-line .command-line-prompt': {
    borderRightColor: 'hsla(220, 14%, 71%, 0.15)',
  },
  '.line-numbers .line-numbers-rows > span:before': {
    color: 'hsl(220, 14%, 45%)',
  },
  '.command-line .command-line-prompt > span:before': {
    color: 'hsl(220, 14%, 45%)',
  },
  '.rainbow-braces .token.token.punctuation.brace-level-1': {
    color: 'hsl(355, 65%, 65%)',
  },
  '.rainbow-braces .token.token.punctuation.brace-level-5': {
    color: 'hsl(355, 65%, 65%)',
  },
  '.rainbow-braces .token.token.punctuation.brace-level-9': {
    color: 'hsl(355, 65%, 65%)',
  },
  '.rainbow-braces .token.token.punctuation.brace-level-2': {
    color: '#00c08b',
  },
  '.rainbow-braces .token.token.punctuation.brace-level-6': {
    color: '#00c08b',
  },
  '.rainbow-braces .token.token.punctuation.brace-level-10': {
    color: '#00c08b',
  },
  '.rainbow-braces .token.token.punctuation.brace-level-3': {
    color: '#58A6FF',
  },
  '.rainbow-braces .token.token.punctuation.brace-level-7': {
    color: '#58A6FF',
  },
  '.rainbow-braces .token.token.punctuation.brace-level-11': {
    color: '#58A6FF',
  },
  '.rainbow-braces .token.token.punctuation.brace-level-4': {
    color: 'hsl(286, 60%, 67%)',
  },
  '.rainbow-braces .token.token.punctuation.brace-level-8': {
    color: 'hsl(286, 60%, 67%)',
  },
  '.rainbow-braces .token.token.punctuation.brace-level-12': {
    color: 'hsl(286, 60%, 67%)',
  },
  'pre.diff-highlight > code .token.token.deleted:not(.prefix)': {
    backgroundColor: 'hsla(353, 100%, 66%, 0.15)',
  },
  'pre > code.diff-highlight .token.token.deleted:not(.prefix)': {
    backgroundColor: 'hsla(353, 100%, 66%, 0.15)',
  },
  'pre.diff-highlight > code .token.token.deleted:not(.prefix)::-moz-selection': {
    backgroundColor: 'hsla(353, 95%, 66%, 0.25)',
  },
  'pre.diff-highlight > code .token.token.deleted:not(.prefix) *::-moz-selection': {
    backgroundColor: 'hsla(353, 95%, 66%, 0.25)',
  },
  'pre > code.diff-highlight .token.token.deleted:not(.prefix)::-moz-selection': {
    backgroundColor: 'hsla(353, 95%, 66%, 0.25)',
  },
  'pre > code.diff-highlight .token.token.deleted:not(.prefix) *::-moz-selection': {
    backgroundColor: 'hsla(353, 95%, 66%, 0.25)',
  },
  'pre.diff-highlight > code .token.token.deleted:not(.prefix)::selection': {
    backgroundColor: 'hsla(353, 95%, 66%, 0.25)',
  },
  'pre.diff-highlight > code .token.token.deleted:not(.prefix) *::selection': {
    backgroundColor: 'hsla(353, 95%, 66%, 0.25)',
  },
  'pre > code.diff-highlight .token.token.deleted:not(.prefix)::selection': {
    backgroundColor: 'hsla(353, 95%, 66%, 0.25)',
  },
  'pre > code.diff-highlight .token.token.deleted:not(.prefix) *::selection': {
    backgroundColor: 'hsla(353, 95%, 66%, 0.25)',
  },
  'pre.diff-highlight > code .token.token.inserted:not(.prefix)': {
    backgroundColor: 'hsla(137, 100%, 55%, 0.15)',
  },
  'pre > code.diff-highlight .token.token.inserted:not(.prefix)': {
    backgroundColor: 'hsla(137, 100%, 55%, 0.15)',
  },
  'pre.diff-highlight > code .token.token.inserted:not(.prefix)::-moz-selection': {
    backgroundColor: 'hsla(135, 73%, 55%, 0.25)',
  },
  'pre.diff-highlight > code .token.token.inserted:not(.prefix) *::-moz-selection': {
    backgroundColor: 'hsla(135, 73%, 55%, 0.25)',
  },
  'pre > code.diff-highlight .token.token.inserted:not(.prefix)::-moz-selection': {
    backgroundColor: 'hsla(135, 73%, 55%, 0.25)',
  },
  'pre > code.diff-highlight .token.token.inserted:not(.prefix) *::-moz-selection': {
    backgroundColor: 'hsla(135, 73%, 55%, 0.25)',
  },
  'pre.diff-highlight > code .token.token.inserted:not(.prefix)::selection': {
    backgroundColor: 'hsla(135, 73%, 55%, 0.25)',
  },
  'pre.diff-highlight > code .token.token.inserted:not(.prefix) *::selection': {
    backgroundColor: 'hsla(135, 73%, 55%, 0.25)',
  },
  'pre > code.diff-highlight .token.token.inserted:not(.prefix)::selection': {
    backgroundColor: 'hsla(135, 73%, 55%, 0.25)',
  },
  'pre > code.diff-highlight .token.token.inserted:not(.prefix) *::selection': {
    backgroundColor: 'hsla(135, 73%, 55%, 0.25)',
  },
  '.prism-previewer.prism-previewer:before': {
    borderColor: 'hsl(224, 13%, 17%)',
  },
  '.prism-previewer-gradient.prism-previewer-gradient div': {
    borderColor: 'hsl(224, 13%, 17%)',
    borderRadius: '0.3em',
  },
  '.prism-previewer-color.prism-previewer-color:before': {
    borderRadius: '0.3em',
  },
  '.prism-previewer-easing.prism-previewer-easing:before': {
    borderRadius: '0.3em',
  },
  '.prism-previewer.prism-previewer:after': {
    borderTopColor: 'hsl(224, 13%, 17%)',
  },
  '.prism-previewer-flipped.prism-previewer-flipped.after': {
    borderBottomColor: 'hsl(224, 13%, 17%)',
  },
  '.prism-previewer-angle.prism-previewer-angle:before': {
    background: 'hsl(219, 13%, 22%)',
  },
  '.prism-previewer-time.prism-previewer-time:before': {
    background: 'hsl(219, 13%, 22%)',
  },
  '.prism-previewer-easing.prism-previewer-easing': {
    background: 'hsl(219, 13%, 22%)',
  },
  '.prism-previewer-angle.prism-previewer-angle circle': {
    stroke: 'hsl(220, 14%, 71%)',
    strokeOpacity: '1',
  },
  '.prism-previewer-time.prism-previewer-time circle': {
    stroke: 'hsl(220, 14%, 71%)',
    strokeOpacity: '1',
  },
  '.prism-previewer-easing.prism-previewer-easing circle': {
    stroke: 'hsl(220, 14%, 71%)',
    fill: 'transparent',
  },
  '.prism-previewer-easing.prism-previewer-easing path': {
    stroke: 'hsl(220, 14%, 71%)',
  },
  '.prism-previewer-easing.prism-previewer-easing line': {
    stroke: 'hsl(220, 14%, 71%)',
  },
};

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  fontSize: '1.5ch',
  borderRadius: '8px',
  div: {
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '$grayHoverLightBackground',
    },
  },
});

const Header = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: '$grayHoverLightBackground',
  borderRadius: '8px 8px 0 0',
  padding: '0.35rem 1rem',
  button: {
    color: '$citron',
    textDecoration: 'underline',
    backgroundColor: 'transparent',
    border: '0',
    padding: '0.25rem 0.35rem',
    '&:hover': {
      background: '#444555ae',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  },
  code: {
    color: '$cream',
    fontSize: '1.6ch',
    display: 'flex',
    alignItems: 'center',
  },
});

const Code = styled('code', {
  backgroundColor: 'transparent',
  padding: '0.2rem',
});

const Image = styled('img', {
  width: '100%',
  margin: '8px 0',
});

const HeaderText = styled('p', {
  color: '$black',
  paddingTop: '8px',
  fontWeight: 'bold',
});

export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    return false;
  }
  return true;
};

const MarkdownImage = (props: any) => {
  return (
    <a href={props.src} target='_blank' rel='noopener'>
      <Image alt={props.alt} src={props.src} />
    </a>
  );
};

const MarkdownComponents = {
  img: MarkdownImage,
  h1: HeaderText,
  h2: HeaderText,
  code({ inline, className, children, ...props }: any) {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <Container>
        <Header>
          <code>{(match && match[1]) || 'Unknown'}</code>
          <button onClick={() => copyToClipboard(String(children).replace(/\n$/, ''))}>Copy code</button>
        </Header>
        <SyntaxHighlighter
          {...props}
          // eslint-disable-next-line react/no-children-prop
          children={String(children).replace(/\n$/, '')}
          style={theme}
          language={match[1]}
          PreTag='div'
        />
      </Container>
    ) : (
      <Code {...props} className={className}>
        {children}
      </Code>
    );
  },
};

export interface ChatbotMarkdownProps {
  children: string;
}

const ChatbotMarkdown = ({ children }: ChatbotMarkdownProps) => {
  return (
    <ReactMarkdown components={MarkdownComponents} linkTarget='_blank' remarkPlugins={[remarkGfm]}>
      {children}
    </ReactMarkdown>
  );
};

export default ChatbotMarkdown;
