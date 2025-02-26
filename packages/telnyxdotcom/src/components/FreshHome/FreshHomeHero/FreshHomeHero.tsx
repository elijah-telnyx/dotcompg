import { type MouseEvent } from 'react';
import Grid from 'ui/components/Grid';
import type { CTAButtonProps } from 'ui/components/CtaButton';
import CtaButton from 'ui/components/CtaButton';
import Markdown from 'ui/components/Markdown';
import type { SectionProps } from 'ui/components/Section';
import Paragraph from 'ui/components/Typography/Paragraph';
import * as css from './FreshHomeHero.styled';
import Media from 'ui/components/Media';

export interface FreshHomeHeroProps extends SectionProps {
  heading: string;
  copy: string;
  ctaButtons: CTAButtonProps[];
  highlightSupMedia: {
    src: string;
    alt: string;
  };
}

const FreshHomeHero = ({ heading, copy, ctaButtons, highlightSupMedia, ...props }: FreshHomeHeroProps) => {
  const mouseMove = (e: MouseEvent<HTMLHeadingElement>) => {
    const target = e.currentTarget,
      { clientX, clientY } = e,
      { left, top } = target.getBoundingClientRect(),
      xPos = clientX - left,
      yPos = clientY - top;
    target.style.backgroundImage = `radial-gradient(circle at ${xPos}px ${yPos}px, #00E3AA, #fff, #fff, #fff)`;
  };

  const mouseEnter = (e: MouseEvent<HTMLHeadingElement>) => {
    const target = e.currentTarget;
    target.style.animation = 'none';
  };

  const mouseLeave = (e: MouseEvent<HTMLHeadingElement>) => {
    const target = e.currentTarget;
    target.style.backgroundImage = 'linear-gradient(90deg, #00E3AA, #fff, #00E3AA';
    target.style.animation = `${css.gradientLoop} 5s linear infinite`;
  };

  return (
    <css.Section {...props}>
      <css.HeaderWrapper>
        <css.HeadingItem>
          <css.HeaderHighlightSup>
            <css.HeaderHighlightSupMediaWrapper>
              <Media {...highlightSupMedia} />
            </css.HeaderHighlightSupMediaWrapper>
          </css.HeaderHighlightSup>
          <css.Heading level={1} dark>
            <Markdown
              options={{
                forceBlock: false,
                overrides: {
                  strong: {
                    component: ({ children, ...props }) => {
                      return (
                        <css.HeaderHighlight>
                          <css.HeaderHighlightMark
                            {...props}
                            animate
                            onMouseMove={mouseMove}
                            onMouseEnter={mouseEnter}
                            onMouseLeave={mouseLeave}
                          >
                            {children}
                          </css.HeaderHighlightMark>
                        </css.HeaderHighlight>
                      );
                    },
                  },
                },
              }}
              dark
              noStyles
            >
              {heading}
            </Markdown>
          </css.Heading>
        </css.HeadingItem>

        <css.ParagraphItem>
          <Paragraph dark lead>
            {copy}
          </Paragraph>
        </css.ParagraphItem>

        <Grid.FullWidthItem>
          <css.CtasWrapper>
            {ctaButtons.map((cta) => (
              <CtaButton {...cta} key={cta.href} />
            ))}
          </css.CtasWrapper>
        </Grid.FullWidthItem>
      </css.HeaderWrapper>
    </css.Section>
  );
};

export default FreshHomeHero;
