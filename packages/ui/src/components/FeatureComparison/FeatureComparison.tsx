import { isDarkColor } from '../../styles/utils';
import Grid from '../Grid';
import type { MediaProps } from '../Media';
import Section, { type SectionProps } from '../Section';

import * as css from './FeatureComparison.styled';

interface ComparisonItemProps {
  label: string;
  /**
   * competitor copy
   */
  competitorHeading?: string;
  competitorCopy: string;
  /**
   * 1. doesn't have desktop because it is outside of the Item scope
   * 2. this one is only being used on mobile
   */
  competitorIconMobile: MediaProps<'media'>;
  /**
   * Telnyx copy
   */
  telnyxHeading?: string;
  telnyxCopy: string;
  /**
   * used to defined if accordion is open or closed
   */
  value: string;
  id?: string;
}

export interface FeatureComparisonProps extends SectionProps {
  tagline?: string;
  heading?: string;
  copy?: string;
  competitorIconDesktop: MediaProps<'media'>;
  competitorIconMobile: MediaProps<'media'>;
  comparisonList: Omit<
    ComparisonItemProps,
    'value' | 'competitorIconDesktop' | 'competitorIconMobile'
  >[];
}

const TELNYX_ICONS = {
  mobile: {
    src: 'https://images.ctfassets.net/2vm221913gep/4Ly3c83ftTGPwiRNvdWfV1/69cc8c735c1d8140b4b10a3c2d6975a3/telnyx_logo_xs.svg',
    alt: 'Telnyx logo',
  },
  desktop: {
    src: 'https://images.ctfassets.net/2vm221913gep/3u0ZKhosderZ6YmbnW8Doz/d470e00f2aa90779c20063b122f26082/Telnyx_Logo_Lockup_Small.svg',
    alt: 'Telnyx logo',
  },
};

const ComparisonItem = ({
  label,
  competitorIconMobile,
  competitorHeading,
  competitorCopy,
  telnyxHeading,
  telnyxCopy,
  value,
  id,
}: ComparisonItemProps) => {
  const comparisonList = [
    {
      heading: competitorHeading,
      copy: competitorCopy,
      icon: competitorIconMobile,
    },
    {
      heading: telnyxHeading,
      copy: telnyxCopy,
      icon: TELNYX_ICONS.mobile,
    },
  ];

  return (
    <css.AccordionItem value={value} asChild>
      <css.Card>
        <css.ComparisonWrapper>
          <css.FillGapTrigger lessThanMedium />
          <css.AccordionTrigger>
            <css.Label level={3} id={id}>
              {label}
            </css.Label>
            <css.PlusIcon />
          </css.AccordionTrigger>
          <css.AccordionContent>
            {comparisonList.map(({ heading, copy, icon }, index) => (
              <css.ComparisonContent.Wrapper
                key={heading?.replace(/ /gi, '_') || index}
                hasHeading={Boolean(heading)}
              >
                <css.ComparisonContent.Icon {...icon} width={24} height={24} />
                {heading && (
                  <>
                    <css.ComparisonContent.Heading level={2} category>
                      {heading}
                    </css.ComparisonContent.Heading>
                    <css.HiddenOn medium />
                  </>
                )}

                <css.ComparisonContent.Copy>{copy}</css.ComparisonContent.Copy>
              </css.ComparisonContent.Wrapper>
            ))}
          </css.AccordionContent>
        </css.ComparisonWrapper>
      </css.Card>
    </css.AccordionItem>
  );
};

const getIdFromItem = (item: FeatureComparisonProps['comparisonList'][0]) =>
  item?.id || item.label;

const FeatureComparison = ({
  tagline,
  heading,
  copy,
  comparisonList,
  competitorIconMobile,
  competitorIconDesktop,
  ...sectionProps
}: FeatureComparisonProps) => {
  const firstItemId = getIdFromItem(comparisonList[0]);
  const dark = isDarkColor(sectionProps.backgroundColor);

  const desktopLogos = [competitorIconDesktop, TELNYX_ICONS.desktop];
  return (
    <Section {...sectionProps}>
      <Grid.Container>
        <css.ContentWrapper xs={4} small={8} medium={9} large={8}>
          {tagline && (
            <css.Tagline level={2} category dark={dark}>
              {tagline}
            </css.Tagline>
          )}
          {heading && (
            <css.Heading level={2} htmlAs='h2' dark={dark}>
              {heading}
            </css.Heading>
          )}
          {copy && <css.Copy dark={dark}>{copy}</css.Copy>}
        </css.ContentWrapper>
        <Grid.FullWidthItem>
          <css.HiddenOn lessThanMedium>
            <css.LogosWrapper>
              <css.HiddenOn />
              {desktopLogos.map((logo) => (
                <css.DesktopMedia key={logo.src} {...logo} />
              ))}
            </css.LogosWrapper>
          </css.HiddenOn>
          <css.Accordion type='multiple' defaultValue={[firstItemId]}>
            {comparisonList.map((item) => {
              return (
                <ComparisonItem
                  {...item}
                  key={item.label}
                  value={getIdFromItem(item)}
                  competitorIconMobile={competitorIconMobile}
                />
              );
            })}
          </css.Accordion>
        </Grid.FullWidthItem>
      </Grid.Container>
    </Section>
  );
};

export default FeatureComparison;
