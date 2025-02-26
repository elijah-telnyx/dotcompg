import { useMemo } from 'react';
import type { ReactNode } from 'react';
import Markdown from '../Markdown';
import Tabs from './Tabs';
import Section from '../Section';
import type { SectionProps } from '../Section';
import Media, { type MediaProps } from '../Media';
import * as css from './Tabs.styled';

export interface TabsWithMarkdown {
  label: ReactNode;
  id: string;
  copy: string;
  featuredMedia?: MediaProps<'media'>;
}

export interface TabsWithMarkdownProps extends SectionProps {
  tabList: TabsWithMarkdown[];
  defaultValue?: string;
  dark?: boolean;
  heading?: string;
}

const TabsWithMarkdown = ({
  tabList,
  heading,
  defaultValue,
  dark,
  ...props
}: TabsWithMarkdownProps) => {
  const tabsContent = useMemo(() => {
    return tabList.map(({ label, id, copy, featuredMedia }) => ({
      trigger: {
        label,
        value: id,
      },
      content: (
        <css.TabsWithMarkdownContentWrapper>
          <Markdown blog>{copy}</Markdown>
          {featuredMedia && <Media {...featuredMedia} />}
        </css.TabsWithMarkdownContentWrapper>
      ),
    }));
  }, [tabList]);

  return (
    <Section {...props} backgroundColor={'cream'} hasOverflow={false}>
      <Tabs
        {...props}
        tabs={tabsContent}
        heading={heading}
        defaultValue={defaultValue}
        dark={dark}
      />
    </Section>
  );
};

export default TabsWithMarkdown;
