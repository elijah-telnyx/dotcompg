import { isDarkBackgroundColor } from '../../styles/constants/backgroundColorOptions';
import Grid, { type GridExtendedItemProps } from '../GridExtended';
import type { MediaProps } from '../Media';
import type { OverviewHeroProps } from '../OverviewHero';
import Section from '../Section';
import { getSectionProps } from '../Section/Section';
import * as css from './CategoryHero.styled';
import Heading from '../Typography/Heading';
import Markdown from '../Markdown';
import CtaButton from '../CtaButton';

type CopyProps = {
  grid: GridExtendedItemProps;
};

const DEFAULT_COPY_PROPS: CopyProps = {
  grid: { xs: 4, small: 6, medium: 8, large: 7 },
};

const CENTERED_COPY_PROPS: CopyProps = {
  grid: {},
};

export interface CategoryHeroProps extends OverviewHeroProps {
  mediaList: {
    media: MediaProps<'media'>;
    id: string;
    fm: MediaProps<'media'>['fm'];
  }[];
}

const CategoryHero = ({
  mediaList,
  heading,
  copy,
  footerCopy,
  ctaButtons,
  ctaButtonsOrientation,
  centered,
  hasPattern,
  ...props
}: CategoryHeroProps) => {
  const isDark = isDarkBackgroundColor(props.backgroundColor);
  const sectionProps = getSectionProps(props);
  const copyProps =
    centered || hasPattern ? CENTERED_COPY_PROPS : DEFAULT_COPY_PROPS;
  const useCaseButton = ctaButtons?.find(
    (button) => button.href === '#use-cases'
  );

  //remove useCaseButton from ctaButtons
  if (ctaButtons && useCaseButton) {
    ctaButtons = ctaButtons.filter((button) => button.href !== '#use-cases');
  }
  return (
    <Section {...sectionProps} spacingBottom='none'>
      <css.WrapperGrid
        css={{
          rowGap: '$small',

          '@medium': {
            rowGap: '$large',
          },
        }}
      >
        <>
          <Grid.Item xl={10} large={10} medium={12} small={8} xs={4}>
            <Heading level={1} dark={isDark}>
              <Markdown
                options={{
                  forceBlock: false,
                }}
                noStyles
              >
                {heading}
              </Markdown>
            </Heading>
          </Grid.Item>
          {copy && (
            <>
              <css.CopyItem
                {...copyProps.grid}
                centered={centered || hasPattern}
                medium={6}
                small={8}
              >
                <Markdown dark={isDark} lead>
                  {copy}
                </Markdown>
              </css.CopyItem>

              {useCaseButton && (
                <css.ButtonWrapper xl={5} large={5} medium={6} small={8}>
                  <CtaButton
                    {...useCaseButton}
                    backgroundColor={props.backgroundColor}
                  />
                </css.ButtonWrapper>
              )}
            </>
          )}
          {footerCopy && (
            <Grid.FullWidthItem>
              <Markdown dark={isDark}>{footerCopy}</Markdown>
            </Grid.FullWidthItem>
          )}
          {ctaButtons && ctaButtons.length > 0 && (
            <Grid.FullWidthItem>
              <css.ButtonsWrapper orientation={ctaButtonsOrientation}>
                {ctaButtons.map((cta) => (
                  <CtaButton
                    {...cta}
                    key={cta.href}
                    backgroundColor={props.backgroundColor}
                  />
                ))}
              </css.ButtonsWrapper>
            </Grid.FullWidthItem>
          )}
        </>
      </css.WrapperGrid>
    </Section>
  );
};

export default CategoryHero;
