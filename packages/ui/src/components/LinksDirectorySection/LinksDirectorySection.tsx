import Section from '../Section';

import Heading from '../Typography/Heading';

import { isDarkBackgroundColor } from '../../styles/constants/backgroundColorOptions';
import Grid from '../Grid';
import { TabsTriggersContainer } from '../Tabs/Variant/TabsTriggersContainer';
import { styles } from './LinksDirectorySection.styled';

export type DirectoryLink = {
  text: string;
  altText: string;
  href: string;
  disabled: boolean;
};
export type DirectoryLinkTabs = {
  value: string;
  label: string;
  links: DirectoryLink[];
};

export interface LinksDirectorySectionProps {
  title: string;
  directoryLinksTabs: DirectoryLinkTabs[];
  currentDirectory?: string;
}

const LinksDirectorySection = ({
  title,
  directoryLinksTabs,
  currentDirectory,
}: LinksDirectorySectionProps) => {
  const backgroundColor = 'cream';
  const isDark = isDarkBackgroundColor(backgroundColor);

  return (
    <Section
      backgroundColor={backgroundColor}
      spacingBottom='contrasting'
      spacingTop='contrasting'
    >
      <Grid.Container>
        <Grid.FullWidthItem>
          <Heading level={2} dark={isDark} htmlAs='p'>
            {title}
          </Heading>
          <styles.TabsWrapper>
            <styles.TabsContainer
              defaultValue={currentDirectory || directoryLinksTabs[0]?.value}
            >
              <TabsTriggersContainer>
                {directoryLinksTabs.map(({ value, label }) => (
                  <styles.Trigger key={value + 'trigger'} value={value}>
                    <span>{label}</span>
                  </styles.Trigger>
                ))}
              </TabsTriggersContainer>

              {directoryLinksTabs.map(({ value, links: tabLinks }) => (
                <styles.Content key={value + 'content'} value={value}>
                  <styles.LinksContainer>
                    {tabLinks.map((link) => (
                      <styles.LinkCopy
                        href={link.href}
                        key={link.text}
                        dark={isDark}
                        htmlAs={link.disabled ? 'span' : 'a'}
                        kind='cta'
                        aria-disabled={Boolean(link.disabled)}
                        noUnderlineOnCta={link.disabled}
                      >
                        {link.text}
                      </styles.LinkCopy>
                    ))}
                  </styles.LinksContainer>
                </styles.Content>
              ))}
            </styles.TabsContainer>
          </styles.TabsWrapper>
        </Grid.FullWidthItem>
      </Grid.Container>
    </Section>
  );
};

export default LinksDirectorySection;
