import React, { useState, useId, useRef, useEffect } from 'react';
import type { GliderMethods } from 'react-glider/dist/types';

import * as css from './DocSection.styled';
import Section, { type SectionProps } from '../Section';
import SectionHeader from '../Section/SectionHeader';
import Grid from '../Grid';
import CtaButton, { type CTAButtonProps } from '../CtaButton';
import CopyButton from '../CopyButton';
import { ArrowLeft, ChevronRight } from '../Icons';

export interface CodeProps {
  id: string;
  label: string;
  code: string;
}

export interface DocSectionProps extends SectionProps {
  tagline: string;
  heading: string;
  copy: string;
  ctaButtons: CTAButtonProps[];
  codes: CodeProps[];
}

const INTERVAL = 5000;
const navBtn = {
  prev: { id: `go-to-previous-item` },
  next: { id: `go-to-next-item` },
};

const DocSection = ({
  tagline,
  heading,
  copy,
  ctaButtons,
  codes,
  ...props
}: DocSectionProps) => {
  const ids = codes.reduce((acc, { id }) => [...acc, id], [] as string[]);
  const [currentId, setCurrentId] = useState(ids[0]);
  const gliderRef = React.useRef<GliderMethods>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const currentIdRef = useRef(currentId);
  const componentId = useId().replace(/:/g, '-');
  const nextCycleTriggerRef = useRef<HTMLButtonElement | null>(null);

  const cycle = (direction: 'next' | 'prev') => {
    const currentIndex = ids.indexOf(currentIdRef.current);
    let nextIndex;
    if (direction === 'next') {
      nextIndex = currentIndex + 1;
      if (nextIndex >= ids.length) {
        nextIndex = currentIndex;
      }
    } else {
      nextIndex = currentIndex - 1;
      if (nextIndex < 0) {
        nextIndex = currentIndex;
      }
    }

    setCurrentId(ids[nextIndex]);
    currentIdRef.current = ids[nextIndex];
  };

  useEffect(() => {
    // Start the interval when the component mounts
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        if (nextCycleTriggerRef.current) {
          const currentIndex = ids.indexOf(currentIdRef.current);
          if (currentIndex === ids.length - 1) {
            setCurrentId(ids[0]);
            gliderRef.current?.scrollItem(0);
          } else {
            nextCycleTriggerRef.current.click(); // Simulate click on the forward button
          }
        }
      }, INTERVAL);
    }

    // Clear the interval when the component unmounts
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current); // This only runs on actual unmount
        intervalRef.current = null; // Reset the interval reference
      }
    };
  }, []); // Empty dependency array means this effect runs only once on mount

  useEffect(() => {
    currentIdRef.current = currentId; // Sync the ref with the current state
  }, [currentId]);

  return (
    <Section {...props}>
      <css.DocSectionWrapper>
        <Grid.Item xs={4} small={8} medium={6} xl={5}>
          <SectionHeader
            tagline={tagline}
            heading={heading}
            copy={copy}
            variant='center'
          />
          <css.ButtonsContainer desktop>
            {ctaButtons.map((cta) => (
              <CtaButton
                {...cta}
                key={cta.href}
                backgroundColor={props.backgroundColor}
              />
            ))}
          </css.ButtonsContainer>
        </Grid.Item>
        <Grid.Item
          xs={4}
          small={8}
          medium={6}
          css={{
            '@xl': {
              gridColumn: '7 / 13 !important',
            },
          }}
        >
          <css.Codes
            defaultValue={currentId}
            value={currentId}
            onValueChange={setCurrentId}
          >
            {codes.map(({ id, label, code }) => (
              <css.CodesContent key={id} value={id}>
                <css.CopyButtonWrapper>
                  <css.Label>{label}</css.Label>
                  <CopyButton copy={code} isDark />
                </css.CopyButtonWrapper>
                <css.CodeMarkdown dark>{code}</css.CodeMarkdown>
              </css.CodesContent>
            ))}
            <css.TabsContainer>
              <css.LeftCycleTrigger
                aria-label='Go to previous item'
                id={`${navBtn.prev.id + componentId}`}
                onClick={() => cycle('prev')}
              >
                <ArrowLeft />
              </css.LeftCycleTrigger>

              <css.CodesList aria-label={tagline} loop={false}>
                <css.GliderWrapper
                  slidesToShow='auto'
                  itemWidth={275}
                  exactWidth={true}
                  slidesToScroll={1}
                  hasArrows={true}
                  arrows={{
                    prev: `#${navBtn.prev.id + componentId}`,
                    next: `#${navBtn.next.id + componentId}`,
                  }}
                  ref={gliderRef}
                  scrollToSlide={1}
                  scrollLock={true}
                >
                  {codes.map(({ id, label }) => (
                    <css.CodeTab key={id} value={id}>
                      {label}
                    </css.CodeTab>
                  ))}
                </css.GliderWrapper>
              </css.CodesList>

              <css.RightCycleTrigger
                aria-label='Go to next item'
                id={`${navBtn.next.id + componentId}`}
                ref={nextCycleTriggerRef}
                onClick={() => cycle('next')}
              >
                <ChevronRight />
              </css.RightCycleTrigger>
            </css.TabsContainer>
            <css.ArrowContainer>
              <css.BaseButton
                aria-label='Go to previous item'
                id={`${navBtn.prev.id + componentId}`}
                onClick={() => cycle('prev')}
              >
                <ArrowLeft />
              </css.BaseButton>
              <css.BaseButton
                aria-label='Go to next item'
                id={`${navBtn.next.id + componentId}`}
                ref={nextCycleTriggerRef}
                onClick={() => cycle('next')}
              >
                <ChevronRight />
              </css.BaseButton>
            </css.ArrowContainer>
          </css.Codes>
        </Grid.Item>
      </css.DocSectionWrapper>
      <css.ButtonsContainer mobile>
        <CtaButton
          {...ctaButtons[0]}
          key={ctaButtons[0].href}
          backgroundColor={ctaButtons[0].backgroundColor}
        />
      </css.ButtonsContainer>
    </Section>
  );
};

export default DocSection;
