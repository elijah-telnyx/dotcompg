import Tabs from '../../Tabs';
import { Container as TabsContainer } from '../../Tabs/Tabs.styled';
import Markdown from '../../Markdown';
import Media from '../../Media';
import type { MediaProps } from '../../Media/Media';
import { styled } from '../../../styles';

interface TabItem {
  id: string;
  label: string;
  content: string;
  media?: MediaProps<'media'>;
}

export interface TabsGroupProps {
  id: string;
  tabs: TabItem[];
  dark?: boolean;
  defaultValue?: string;
}

const TabWrapper = styled('div', {
  paddingTop: '$medium',
  '@medium': {
    paddingTop: '$xl',
  },
  '& img': {
    borderRadius: '$medium',
    maxWidth: '100%',
    aspectRatio: '16/9',
  },
});

const TabsWrapper = styled('div', {
  [`& ${TabsContainer}`]: {
    display: 'block',
  },
});

const TabsGroup = ({ tabs, dark, defaultValue }: TabsGroupProps) => {
  const formattedTabs = tabs.map((tab) => ({
    trigger: {
      label: tab.label,
      value: String(tab.id),
    },
    content: (
      <TabWrapper>
        {tab.media && <Media {...tab.media} />}
        {tab.content && <Markdown dark={dark}>{tab.content}</Markdown>}
      </TabWrapper>
    ),
  }));

  return (
    <TabsWrapper>
      <Tabs tabs={formattedTabs} dark={dark} defaultValue={defaultValue} />
    </TabsWrapper>
  );
};

export default TabsGroup;
