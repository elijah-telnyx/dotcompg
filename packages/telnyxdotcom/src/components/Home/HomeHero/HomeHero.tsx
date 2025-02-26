import * as css from './HomeHero.styled';

import { useEffect, useState, type PropsWithChildren, useRef, type MouseEvent } from 'react';

import type { CTAButtonProps } from 'ui/components/CtaButton';
import type { SectionProps } from 'ui/components/Section';
import CtaButton from 'ui/components/CtaButton';
import Heading from 'ui/components/Typography/Heading';
import Paragraph from 'ui/components/Typography/Paragraph';
import Tagline from 'ui/components/Tagline';
import * as data from './constants';
import VideoWithNavigation from './VideoWithNavigation';
import { useSwipe } from 'ui/utils/hooks/useSwipe';
import { isDarkBackgroundColor } from 'ui/styles/constants/backgroundColorOptions';
import { theme, config } from 'ui/styles';
import useMedia from 'ui/utils/hooks/useMedia';
import { blockHeaderBehavior } from 'ui/components/Header/HeaderContainer/HeaderContainer';
import { useIntersectionObserver } from 'ui/utils/hooks/useIntersectionObserver';

export interface HomeHeroProps {
  tagline: string;
  heading: string;
  copy: string;
  ctaButtons: CTAButtonProps[];
  scrollSnap?: SectionProps['scrollSnap'];
}

const HomeHero = ({ tagline, heading, copy, ctaButtons, scrollSnap }: HomeHeroProps) => {
  const [animate, setAnimate] = useState(Boolean(scrollSnap));
  const [activeTab, setActiveTab] = useState(0);

  const isOverSmall = useMedia(config.media.small);
  const tabContainerRef = useRef<HTMLDivElement | null>(null);

  const currentTab = data.tabs[activeTab];
  const shouldUseBackground = Boolean(isOverSmall) && !animate;
  const isDark = shouldUseBackground && isDarkBackgroundColor(currentTab.backgroundColor);

  const selectTab = (key: number) => (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    const target = event.currentTarget;
    setActiveTab(key);
    setActiveTabBackgroundStyle({ width: target.clientWidth, offsetLeft: target.offsetLeft });
  };

  const swipeEvents = useSwipe({
    onSwipeLeft() {
      const newTab = activeTab + 1;
      if (newTab < data.tabs.length) {
        setActiveTab(newTab);
      }
    },
    onSwipeRight() {
      const newTab = activeTab - 1;
      if (newTab >= 0) {
        setActiveTab(newTab);
      }
    },
  });

  /**
   * @TODO: account for any scroll snap container scroll event
   * When using scroll snap layout, scroll is done for `SCROLL_SNAP_ELEMENT_DATA_ATTRIBUTE` element and not the `body` element
   */
  const setAnimateOnScroll = () => {
    /**
     * Ignore if on mobile
     */
    if (window.innerWidth < Number(theme.viewports.small.value.replace('px', ''))) return;
    /**
     * Check if the scroll is at top with 10% of viewport height to set back to initial state
     */
    if (window.scrollY < window.innerHeight * 0.1) setAnimate(false);
    else setAnimate(true);
  };
  useEffect(() => {
    window.addEventListener('scroll', setAnimateOnScroll);
    return () => {
      window.removeEventListener('scroll', setAnimateOnScroll);
    };
  }, []);

  const setActiveTabBackgroundStyle = ({ width, offsetLeft }: { width: number; offsetLeft: number }) => {
    const container = tabContainerRef.current;
    if (!container) return;
    container.setAttribute('style', `--tab-width: ${width + 2}px; --offset-left: ${offsetLeft}px`);
  };

  return (
    <css.Section scrollSnap={scrollSnap} data-animate={animate} {...swipeEvents}>
      <css.ContentWrapper>
        <css.HeaderWrapper>
          <Tagline
            isDark={isDark}
            css={{
              ...data.transitionProps,
            }}
          >
            {tagline}
          </Tagline>
          <Heading
            level={1}
            alt={{ '@lessThanSmall': true }}
            dark={isDark}
            css={{
              ...data.transitionProps,
              '@medium': {
                typography: '$h2.alt',
              },
            }}
          >
            {heading}
          </Heading>
          <Paragraph
            dark={isDark}
            lead
            css={{
              textWrap: 'balance',
              ...data.transitionProps,
            }}
          >
            {copy}
          </Paragraph>
          <css.CtasWrapper>
            {ctaButtons.map((cta) => (
              <CtaButton
                {...cta}
                key={cta.href}
                backgroundColor={shouldUseBackground ? currentTab.backgroundColor : undefined}
                css={{
                  ...data.transitionProps,
                }}
              />
            ))}
          </css.CtasWrapper>
        </css.HeaderWrapper>
        <BackgroundVideo color={currentTab.backgroundColor}>
          <css.MediaContainer>
            <css.TabContainer ref={tabContainerRef}>
              {data.tabs.map((tab, index) => {
                return (
                  <css.Tab key={tab.id} onClick={selectTab(index)} data-active={currentTab === tab}>
                    {tab.label}
                  </css.Tab>
                );
              })}
            </css.TabContainer>
            <css.MediaLabel dark={isDarkBackgroundColor(currentTab.backgroundColor)}>{currentTab.label}</css.MediaLabel>
            {data.tabs.map((tab, index) => {
              return (
                <VideoWithNavigation
                  {...tab.data}
                  isActive={currentTab === tab}
                  // workaround for mobile to start the video over when the tab is selected -- mobile doesn't allow us to programmatically control the video
                  key={'data' + tab.id + String(Boolean(currentTab === tab))}
                  preload={index === 0}
                />
              );
            })}
          </css.MediaContainer>
        </BackgroundVideo>
      </css.ContentWrapper>
    </css.Section>
  );
};

interface BackgroundProps {
  color: data.Tab['backgroundColor'];
}

const BackgroundVideo = ({ children, color }: PropsWithChildren<BackgroundProps>) => {
  const videoSrc = data.assets.background.video;
  const posterSrc = data.assets.background.poster;
  const videoRef = useRef<HTMLVideoElement>(null);
  const { observerRef, entry } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.2 });

  useEffect(() => {
    blockHeaderBehavior.value = Boolean(entry?.isIntersecting);
  }, [entry?.isIntersecting]);

  // prevent the video from loading if the display is set to none
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const videoStyle = window.getComputedStyle(video);
    if (videoStyle.display !== 'none') {
      video.src = videoSrc;
      video.load();
    }
  }, []);

  return (
    <css.Background
      ref={observerRef}
      css={{
        '@lessThanSmall': {
          backgroundColor: '$' + color,
        },
      }}
    >
      <css.BackgroundVideo
        ref={videoRef}
        playsInline
        autoPlay
        muted
        loop
        preload='metadata'
        poster={posterSrc}
        css={{
          display: 'none',
          '@small': {
            backgroundImage: posterSrc,
            display: 'block',
          },
        }}
      >
        <source type='video/webm' />
      </css.BackgroundVideo>
      <css.BackgroundColorMask css={{ backgroundColor: '$' + color }}></css.BackgroundColorMask>

      {children}
    </css.Background>
  );
};

export default HomeHero;
