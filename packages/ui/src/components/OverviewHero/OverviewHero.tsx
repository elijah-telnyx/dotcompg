import type { ReactNode } from 'react';
import type { SectionProps } from '../Section';
import Grid, { type GridItemProps } from '../Grid';
import Markdown from '../Markdown';
import CtaButton, { type CTAButtonProps } from '../CtaButton';
import Heading from '../Typography/Heading';
import { isDarkBackgroundColor } from '../../styles/constants/backgroundColorOptions';
import MarketoForm, { type MarketoFormProps } from '../MarketoForm';
import * as css from './OverviewHero.styled';
import Card from '../Card';
import Media, { type MediaProps } from '../Media';

export interface OverviewHeroProps extends SectionProps {
  children?: ReactNode;
  heading: string;
  copy?: string;
  ctaButtons?: CTAButtonProps[];
  hasPattern?: boolean;
  form?: MarketoFormProps;
  centered?: boolean;
  ctaButtonsOrientation?: 'vertical' | 'horizontal';
  footerCopy?: string;
  media?: MediaProps<'media'>;
}

type CopyProps = {
  grid: GridItemProps;
};

const DEFAULT_COPY_PROPS: CopyProps = {
  grid: { xs: 4, small: 6, medium: 8, large: 7 },
};

const CENTERED_COPY_PROPS: CopyProps = {
  grid: {},
};

const columns: GridItemProps = {
  xs: 4,
  small: 8,
  medium: 6,
  large: 6,
  xl: 6,
};

const OverviewHero = ({
  heading,
  copy,
  footerCopy,
  ctaButtons,
  centered,
  hasPattern,
  ctaButtonsOrientation,
  form,
  media,
  children,
  ...props
}: OverviewHeroProps) => {
  const dark = isDarkBackgroundColor(props.backgroundColor);

  const hasForm = !!form;

  if (hasForm) {
    return (
      <css.SectionWrapper {...props} hasForm centered={hasForm}>
        <css.GridContainer alignLeft={hasForm}>
          <css.GridItemContainer {...columns} hasForm={hasForm}>
            <css.Heading level={2} dark={dark} htmlAs='h1'>
              <Markdown
                options={{
                  forceBlock: false,
                }}
                noStyles
              >
                {heading}
              </Markdown>
            </css.Heading>

            {copy && (
              <Markdown dark={dark} lead>
                {copy}
              </Markdown>
            )}
            {footerCopy && (
              <css.Footer>
                <Markdown dark={dark} lead>
                  {footerCopy}
                </Markdown>
              </css.Footer>
            )}
            {ctaButtons && (
              <css.ButtonsWrapper orientation={ctaButtonsOrientation}>
                {ctaButtons.map((cta) => (
                  <CtaButton
                    {...cta}
                    key={cta.href}
                    backgroundColor={props.backgroundColor}
                  />
                ))}
              </css.ButtonsWrapper>
            )}
            {media && (
              <css.MediaWrapper>
                <Media {...media} />
              </css.MediaWrapper>
            )}
            {Boolean(children) && children}
          </css.GridItemContainer>

          <css.FormWrapper {...columns}>
            <Card form sectionOnMobile>
              <MarketoForm {...form} headingLevel={3} />
            </Card>
          </css.FormWrapper>
        </css.GridContainer>
      </css.SectionWrapper>
    );
  }

  return (
    <css.SectionWrapper {...props} centered={centered} hasPattern={hasPattern}>
      <Grid.Container
        css={{
          rowGap: '$small',

          '@medium': {
            rowGap: '$large',
          },
        }}
      >
        <OverviewHeroContent
          heading={heading}
          copy={copy}
          footerCopy={footerCopy}
          ctaButtons={ctaButtons}
          centered={centered}
          hasPattern={hasPattern}
          ctaButtonsOrientation={ctaButtonsOrientation}
          media={media}
          isDark={dark}
          {...props}
        />
        {Boolean(children) && (
          <Grid.FullWidthItem>{children}</Grid.FullWidthItem>
        )}
      </Grid.Container>
    </css.SectionWrapper>
  );
};

export const OverviewHeroContent = ({
  isDark,
  heading,
  copy,
  centered,
  hasPattern,
  footerCopy,
  ctaButtons,
  ctaButtonsOrientation,
  backgroundColor,
}: Omit<OverviewHeroProps, 'form' | 'children'> & { isDark: boolean }) => {
  const copyProps =
    centered || hasPattern ? CENTERED_COPY_PROPS : DEFAULT_COPY_PROPS;

  return (
    <>
      <Grid.FullWidthItem>
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
      </Grid.FullWidthItem>
      {copy && (
        <css.CopyItem {...copyProps.grid} centered={centered || hasPattern}>
          <Markdown dark={isDark} lead>
            {copy}
          </Markdown>
        </css.CopyItem>
      )}
      {footerCopy && (
        <Grid.FullWidthItem>
          <Markdown dark={isDark}>{footerCopy}</Markdown>
        </Grid.FullWidthItem>
      )}
      {ctaButtons && (
        <Grid.FullWidthItem>
          <css.ButtonsWrapper orientation={ctaButtonsOrientation}>
            {ctaButtons.map((cta) => (
              <CtaButton
                {...cta}
                key={cta.href}
                backgroundColor={backgroundColor}
              />
            ))}
          </css.ButtonsWrapper>
        </Grid.FullWidthItem>
      )}
    </>
  );
};

export default OverviewHero;
