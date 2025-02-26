import { styled } from '../../../../styles';
import CopyButton from '../../../CopyButton';
import Markdown from '../../../Markdown';
import TypographyCode from '../../../Typography/Code';

const MarkdownWrapper = styled('div', {
  userSelect: 'none',
  width: '100%',
  overflow: 'auto',
  whiteSpace: 'pre-wrap',
  ul: {
    paddingLeft: '$small',
  },
  blockquote: {
    marginInline: '$small',
    fontStyle: 'italic',
  },
  a: {
    color: '$blue',
    textDecoration: 'underline',
    '&:hover': {
      color: '$blueAlt',
    },
  },
});

export const CodeBlockContent = styled('div', {
  backgroundColor: '$black',
  color: '$cream',
  borderRadius: '$medium',
  padding: '$small',
});

export const CodeWrapper = styled('div', {
  overflowY: 'scroll',
  code: {
    textWrap: 'nowrap',
  },
});

export const CopyButtonWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'end',
  marginBottom: '$xxs',
});

export const Code = styled(TypographyCode, {
  fontSize: 'inherit',
});

export type InferenceChatBubbleContentProps = {
  children: string;
};

export function InferenceChatBubbleContent({
  children,
}: InferenceChatBubbleContentProps) {
  return (
    <MarkdownWrapper>
      <Markdown
        noStyles
        options={{
          forceInline: true,
          disableParsingRawHTML: true,
          overrides: {
            code: {
              component: ({ children, ...props }) => {
                const isCodeBlock = children.trim().split('\n').length > 1;
                if (isCodeBlock) {
                  return (
                    <CodeBlockContent>
                      <CopyButtonWrapper>
                        <CopyButton copy={children} isDark />
                      </CopyButtonWrapper>
                      <CodeWrapper>
                        <Code {...props}>{children}</Code>
                      </CodeWrapper>
                    </CodeBlockContent>
                  );
                }
                return <Code {...props}>{children}</Code>;
              },
            },
          },
        }}
      >
        {children}
      </Markdown>
    </MarkdownWrapper>
  );
}
