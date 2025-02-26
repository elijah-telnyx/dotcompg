import type { ReactNode, MouseEvent } from 'react';
import Grid from '../Grid';
import * as css from './Tabs.styled';
import type { ThemedCSS } from '../../styles/config/stitches.config';
import { slugify } from '../../utils/slugify';

export interface Tab {
  trigger: {
    label: ReactNode;
    value: string;
  };
  content: ReactNode;
}

export interface TabsProps {
  tabs: Tab[];
  heading?: string;
  defaultValue?: Tab['trigger']['value'];
  dark?: boolean;
  triggersContainerProps?: {
    css: ThemedCSS;
  };
}

const parseValue = (value: string) => slugify(value);

const Tabs = ({
  tabs,
  heading,
  defaultValue,
  dark,
  triggersContainerProps,
}: TabsProps) => {
  const triggers = tabs.map(({ trigger }) => trigger);
  const scrollIntoView = (event: MouseEvent<HTMLButtonElement>) => {
    (event.target as HTMLElement)?.scrollIntoView({
      inline: 'end',
      block: 'start',
      behavior: 'smooth',
    });
  };

  if (triggers.length === 1) {
    return (
      <css.Container>
        <Grid.FullWidthItem>
          {heading && (
            <css.Heading level={2} category htmlAs='p' dark={dark}>
              {heading}
            </css.Heading>
          )}
          {tabs.map(({ trigger, content }) => {
            return <div key={trigger.value + 'content'}>{content}</div>;
          })}
        </Grid.FullWidthItem>
      </css.Container>
    );
  }

  return (
    <css.Container>
      <Grid.FullWidthItem>
        {heading && (
          <css.Heading level={2} category htmlAs='p' dark={dark}>
            {heading}
          </css.Heading>
        )}
        <css.TabsContainer
          defaultValue={parseValue(defaultValue || tabs[0].trigger.value)}
          key={tabs[0].trigger.value}
        >
          {triggers.length > 1 && (
            <css.TriggersContainer
              {...triggersContainerProps}
              css={{
                $$numberOfItems: tabs.length,
                ...triggersContainerProps?.css,
              }}
            >
              {triggers.map(({ value, label }) => (
                <css.Trigger
                  key={value + 'trigger'}
                  value={parseValue(value)}
                  dark={dark}
                  onClick={scrollIntoView}
                >
                  {label}
                </css.Trigger>
              ))}
            </css.TriggersContainer>
          )}
          {tabs.map(({ trigger, content }) => {
            return (
              <css.Content
                key={trigger.value + 'content'}
                value={parseValue(trigger.value)}
              >
                {content}
              </css.Content>
            );
          })}
        </css.TabsContainer>
      </Grid.FullWidthItem>
    </css.Container>
  );
};

export default Tabs;
