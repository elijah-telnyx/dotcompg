import * as css from './CoverageTableSection.styled';
import Section, { type SectionProps } from '../Section/Section';
import CoverageTable from './CoverageTable/CoverageTable';
import Tabs from '../Tabs';
import useMedia from '../../utils/hooks/useMedia';
import media from '../../styles/config/media';
import CoverageAccordion from './CoverageAccordion/CoverageAccordion';
import {
  GlobalCoverageProvider,
  type GlobalCoverageProviderProps,
  type CoverageData,
} from './useCoverageData';

export interface CoverageTableSectionProps
  extends SectionProps,
    Pick<
      GlobalCoverageProviderProps,
      'customFilters' | 'customFilterFn' | 'onFilterReset' | 'accordionProps'
    > {
  heading?: string;
  copy?: string;
  fullWidth?: boolean;
  tabs: { label: string; isServices: boolean; data: CoverageData }[];
}

const CoverageTableSection = ({
  heading,
  copy,
  tabs,
  customFilters,
  customFilterFn,
  fullWidth,
  onFilterReset,
  accordionProps,
  ...props
}: CoverageTableSectionProps) => {
  const isMobile = useMedia(media.lessThanMedium, true);

  return (
    <Section {...props}>
      <css.GridContainer>
        <css.TextWrapper xs={4} small={8}>
          <css.MaxWidthXs>
            {heading && <css.Heading level={2}>{heading}</css.Heading>}
            {copy && <css.Paragraph>{copy}</css.Paragraph>}
          </css.MaxWidthXs>
        </css.TextWrapper>
      </css.GridContainer>

      <css.TableWrapper>
        <Tabs
          triggersContainerProps={{ css: css.STICKY.TABS }}
          tabs={tabs.map(({ label, isServices, ...props }) => {
            const singleTab = tabs.length === 1;

            return {
              trigger: {
                label,
                value: label,
              },
              content: (
                <GlobalCoverageProvider
                  fullWidth={fullWidth}
                  singleTab={singleTab}
                  customFilters={customFilters}
                  customFilterFn={customFilterFn}
                  onFilterReset={onFilterReset}
                  coverageData={props.data}
                  isServices={isServices}
                  accordionProps={accordionProps}
                >
                  {isMobile ? (
                    <css.MaxWidthXs>
                      <CoverageAccordion />
                    </css.MaxWidthXs>
                  ) : (
                    <CoverageTable singleTab={singleTab} />
                  )}
                </GlobalCoverageProvider>
              ),
            };
          })}
        />
      </css.TableWrapper>
    </Section>
  );
};

export default CoverageTableSection;
