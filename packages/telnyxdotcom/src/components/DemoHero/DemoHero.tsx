import { isDarkBackgroundColor } from 'ui/styles/constants/backgroundColorOptions';
import CtaButton, { type CTAButtonProps } from 'ui/components/CtaButton';
import Grid from 'ui/components/Grid';
import Markdown from 'ui/components/Markdown';
import type { DemoSectionProps } from 'components/DemoSection';
import Tagline from 'ui/components/Tagline';
import * as css from './DemoHero.styled';
import dynamic from 'next/dynamic';
const DemoSection = dynamic(() => import('components/DemoSection'));

export interface DemoHeroProps extends DemoSectionProps {
  ctaButtons?: CTAButtonProps[];
  ctaCopy?: string;
}

const DemoHero = ({
  heading,
  tagline,
  copy,
  ctaButtons,
  ctaCopy,
  spacingBottom,
  spacingTop,
  backgroundColor,
  ...props
}: DemoHeroProps) => {
  const dark = isDarkBackgroundColor(backgroundColor);

  return (
    <css.SectionWrapper
      backgroundColor={backgroundColor}
      spacingBottom={spacingBottom}
      spacingTop={spacingTop}
      {...props}
    >
      <css.Container>
        <Grid.Item xs={4} small={6} medium={8}>
          {tagline && (
            <css.TaglineWrapper>
              <Tagline isDark={dark}>{tagline}</Tagline>
            </css.TaglineWrapper>
          )}
          <css.HeadingOne level={1} dark={dark}>
            {heading}
          </css.HeadingOne>
          {copy && (
            <css.WrapperCopy>
              <Markdown dark={dark} lead>
                {copy}
              </Markdown>
            </css.WrapperCopy>
          )}
          {ctaCopy && (
            <css.CtaCopyWrapper>
              <Markdown dark={dark}>{ctaCopy}</Markdown>
            </css.CtaCopyWrapper>
          )}
          <css.CtaWrapper>
            {ctaButtons &&
              ctaButtons.map((cta) => <CtaButton {...cta} key={cta.href} backgroundColor={backgroundColor} />)}
          </css.CtaWrapper>
        </Grid.Item>

        <css.InteractiveItem>
          <css.InteractiveWrapper>
            <DemoSection {...props} spacingTop='none' spacingBottom='none' dynamicBackgroundColor='none' htmlAs='div' />
          </css.InteractiveWrapper>
        </css.InteractiveItem>
      </css.Container>
    </css.SectionWrapper>
  );
};

export default DemoHero;
