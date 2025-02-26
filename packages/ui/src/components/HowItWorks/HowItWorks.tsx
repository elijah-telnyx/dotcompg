import * as css from './HowItWorks.styled';

import { ArrowLeft, ChevronRight } from '../Icons';
import { useEffect, useRef, useState } from 'react';

import type { CTAButtonProps } from '../CtaButton';
import CtaButton from '../CtaButton';
import Grid from '../Grid';
import type { GridItemProps } from '../Grid';
import Heading from '../Typography/Heading';
import Media from '../Media';
import type { MediaProps } from '../Media';
import type { SectionProps } from '../Section';
import { config } from '../../styles';
import { useIsInViewport } from '../../utils/hooks/useIsInViewport';
import useMedia from '../../utils/hooks/useMedia';

const gridColumns: GridItemProps = {
  xs: 4,
  small: 8,
  medium: 12,
  large: 12,
  xl: 12,
};

interface StepProps {
  heading: string;
  copy: string;
  media: MediaProps<'media'>;
  order: number;
  onClick: () => void;
  headingElement?: keyof JSX.IntrinsicElements;
}

const INITIAL_STEP = 1;
const TIME_INTERVAL = 5000;

const Step = ({ heading, copy, order, onClick, headingElement }: StepProps) => {
  return (
    <css.Step value={String(order)} onClick={onClick}>
      <css.StepHeader>
        <css.StepHeading
          level={headingElement && headingElement == 'h2' ? 2 : 3}
          dark
        >
          <css.StepOrder>{order}.</css.StepOrder>
          <css.StepHeadingIcon />
          {heading}
        </css.StepHeading>
      </css.StepHeader>
      <css.StepCopy dark>{copy}</css.StepCopy>
    </css.Step>
  );
};

export interface HowItWorksProps extends SectionProps {
  tagline: string;
  headingElement?: keyof JSX.IntrinsicElements;
  items: Omit<StepProps, 'order'>[];
  ctaButtons: [CTAButtonProps];
  defaultActive?: number;
  defaultInterval?: number;
}

const HowItWorks = ({
  tagline,
  headingElement,
  items,
  ctaButtons,
  defaultActive = INITIAL_STEP,
  defaultInterval = TIME_INTERVAL,
  ...props
}: HowItWorksProps) => {
  const [active, setActive] = useState<number>(defaultActive);
  // const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const intervalRef = useRef(0);
  const isMediumViewport = useMedia(config.media.medium);

  const startAutoplay = () => {
    const id = window.setInterval(() => {
      setActive((prevState) => {
        if (prevState >= items.length) {
          return prevState;
        }
        return prevState + 1;
      });
    }, defaultInterval);
    intervalRef.current = id;
  };

  const stopAutoplay = () => {
    if (intervalRef !== null) {
      clearInterval(intervalRef.current);
    }
  };

  const ref: any = useRef<HTMLDivElement>();

  const { isIntersecting: onScreen } = useIsInViewport<HTMLDivElement>(ref);

  useEffect(() => {
    if (isMediumViewport && onScreen && !intervalRef.current) {
      startAutoplay();
      return;
    }

    stopAutoplay();

    return () => stopAutoplay();
  }, [onScreen, isMediumViewport]);

  const nextTab = () => {
    stopAutoplay();

    if (active >= items.length) {
      return;
    }
    setActive((prevState) => prevState + 1);
  };

  const prevTab = () => {
    stopAutoplay();

    if (active === INITIAL_STEP) {
      return;
    }
    setActive((prevState) => prevState - 1);
  };

  const goToTab = (tab: number) => {
    stopAutoplay();
    setActive(tab);
  };

  return (
    <css.SectionWrapper {...props} backgroundColor='black' hasOverflow>
      <css.SectionContainer ref={ref}>
        <Grid.Item {...gridColumns} htmlAs='header'>
          {headingElement == 'h2' ? (
            <css.PurchaseHeading level={2} dark>
              {tagline}
            </css.PurchaseHeading>
          ) : (
            <Heading level={2} dark category>
              {tagline}
            </Heading>
          )}
        </Grid.Item>

        <Grid.Item {...gridColumns}>
          <css.Steps
            defaultValue={String(active)}
            orientation='vertical'
            onValueChange={() => null}
            value={String(active)}
          >
            <css.StepsList aria-label={tagline} loop={false}>
              {items.map((step, index) => (
                <Step
                  {...step}
                  key={step.heading}
                  order={index + 1}
                  onClick={() => goToTab(index + 1)}
                />
              ))}
            </css.StepsList>

            {items.map((step, index) => (
              <css.StepsContent
                key={step.heading}
                value={String(index + 1)}
                data-testid={index + 1}
              >
                {step.media && (
                  <css.AnimatedMedia>
                    <Media
                      {...step.media}
                      height={undefined}
                      width={undefined}
                      autoPlay
                      loop
                      fill
                      contain
                    />
                  </css.AnimatedMedia>
                )}
              </css.StepsContent>
            ))}

            <css.StepsPagination dark as='div'>
              <css.StepsList loop={false}>
                <css.StepsPaginationButton
                  value={String(active - 1)}
                  disabled={active <= INITIAL_STEP}
                  onClick={() => prevTab()}
                >
                  <ArrowLeft title='Previous' />
                </css.StepsPaginationButton>
                <css.StepsIndicator>
                  {active}/{items.length}
                </css.StepsIndicator>
                <css.StepsPaginationButton
                  value={String(active + 1)}
                  disabled={active >= items.length}
                  onClick={() => nextTab()}
                >
                  <ChevronRight title='Next' />
                </css.StepsPaginationButton>
              </css.StepsList>
            </css.StepsPagination>
          </css.Steps>
        </Grid.Item>

        <css.CTAWrapper {...gridColumns}>
          <CtaButton {...ctaButtons[0]} backgroundColor='black' />
        </css.CTAWrapper>
      </css.SectionContainer>
    </css.SectionWrapper>
  );
};

export default HowItWorks;
