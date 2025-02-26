import type { TabsWithMarkdownProps } from 'ui/components/@types';
import Grid from 'ui/components/Grid';
import Section from 'ui/components/Section';
import SectionHeader from 'ui/components/Section/SectionHeader';
import { keyframes, styled, theme } from 'ui/styles';
import { isDarkBackgroundColor } from 'ui/styles/constants/backgroundColorOptions';
import * as Tabs from '@radix-ui/react-tabs';
import { useRef, useState, type MouseEvent } from 'react';
import Media from 'ui/components/Media';
import Markdown from 'ui/components/Markdown';
import { ChevronLeft, ChevronRight, Checkmark } from 'ui/components/Icons';
import { asyncScrollTo } from 'utils/asyncScrollTo';
import { CONTENT_TRANSITION_TIMING, INITIAL_GRADIENT_ANGLE, parseValue, gradientAnimationPropertyStyle } from './utils';
import Heading, { type HeadingProps } from 'ui/components/Typography/Heading';
import { isMediaVideo } from 'ui/components/Media/utils';

export interface FeaturesSectionProps extends TabsWithMarkdownProps {
  readonly tagline?: string;
  readonly heading?: string;
  readonly copy?: string;
}

export default function FeaturesSection({
  tagline,
  heading,
  copy,
  spacingTop,
  spacingBottom,
  backgroundColor,
  tabList,
  defaultValue,
}: Readonly<FeaturesSectionProps>) {
  const isDark = isDarkBackgroundColor(backgroundColor);
  const triggersContainerRef = useRef<HTMLDivElement>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState<{
    left: boolean;
    right: boolean;
  }>({
    left: true,
    right: false,
  });

  const [bgForTransition, setBgForTransition] = useState<string | undefined>(() => {
    const tab = tabList.find(({ id }) => parseValue(id) === defaultValue);
    if (tab) return tab.featuredMedia?.src;
    return tabList[0].featuredMedia?.src;
  });

  const triggers = tabList.map(({ label, id }) => ({
    value: parseValue(id),
    label,
  }));

  const loadMediaOnHover = (tabId: string) => {
    const tab = tabList.find((tab) => parseValue(tab.id) === tabId);
    if (!tab) return;

    const media = tab.featuredMedia?.src;
    if (media) fetch(media); // This will be cached by the browser
  };

  const scrollIntoView = (event: MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLElement;
    const triggerContainer = target.closest('[role="tablist"]');

    if (triggerContainer) {
      // to avoid having selected tab being covered by the box shadow
      const boxShadowOffset = 20;
      const targetRect = target.getBoundingClientRect();
      const containerRect = triggerContainer.getBoundingClientRect();

      // Calculate if the target is partially or fully outside the container
      const isPartiallyVisible =
        targetRect.left - boxShadowOffset < containerRect.left || targetRect.right > containerRect.right;

      const scrollPosition = target.offsetLeft - containerRect.width / 2 + target.offsetWidth / 2;

      if (isPartiallyVisible) {
        asyncScrollTo(triggerContainer, { left: scrollPosition, behavior: 'smooth' }).then(checkButtonDisabled);
      }
    }
  };

  const scrollNavigation = (direction: 'left' | 'right') => (_event: MouseEvent<HTMLButtonElement>) => {
    const triggerContainer = triggersContainerRef.current;
    if (!triggerContainer) return;

    const scrollPosition =
      direction === 'left'
        ? triggerContainer.scrollLeft - triggerContainer.offsetWidth / 2
        : triggerContainer.scrollLeft + triggerContainer.offsetWidth / 2;

    asyncScrollTo(triggerContainer, { left: scrollPosition, behavior: 'smooth' }).then(checkButtonDisabled);
  };

  const checkButtonDisabled = (element: Awaited<ReturnType<typeof asyncScrollTo>>) => {
    const { scrollLeft, clientWidth, scrollWidth } = element;

    setIsButtonDisabled({
      left: scrollLeft <= 0,
      right: scrollLeft >= scrollWidth - clientWidth,
    });
  };

  const onValueChange = (value: string) => {
    const selected = tabList.find(({ id }) => parseValue(id) === value);
    if (!selected) return;
    setTimeout(() => {
      const image = isMediaVideo(selected.featuredMedia?.src ?? '')
        ? selected.featuredMedia?.poster?.src ?? selected.featuredMedia?.src
        : selected.featuredMedia?.src;

      setBgForTransition(image);
    }, CONTENT_TRANSITION_TIMING.number);
  };

  const onTriggersContainerScroll = (_event: React.UIEvent<HTMLDivElement>) => {
    const triggerContainer = triggersContainerRef.current;
    if (!triggerContainer) return;
    checkButtonDisabled(triggerContainer);
  };

  return (
    <Section spacingTop={spacingTop} spacingBottom={spacingBottom} backgroundColor={backgroundColor}>
      {gradientAnimationPropertyStyle}
      <Grid.Container>
        <Grid.FullWidthItem>
          <SectionHeader
            isDark={isDark}
            tagline={tagline}
            heading={heading}
            copy={copy}
            css={{ textAlign: 'center', textWrap: 'pretty', maxWidth: '768px', marginInline: 'auto' }}
          />
        </Grid.FullWidthItem>
        <TabsWrapper>
          <TabsContainer defaultValue={parseValue(defaultValue ?? tabList[0].id)} onValueChange={onValueChange}>
            <MobileButtons>
              <ScrollButton direction='left' onClick={scrollNavigation('left')} disabled={isButtonDisabled.left}>
                <ChevronLeft />
              </ScrollButton>
              <ScrollButton direction='right' onClick={scrollNavigation('right')} disabled={isButtonDisabled.right}>
                <ChevronRight />
              </ScrollButton>
            </MobileButtons>

            <TriggersContainer ref={triggersContainerRef} onScroll={onTriggersContainerScroll}>
              <ScrollButton direction='left' onClick={scrollNavigation('left')} disabled={isButtonDisabled.left}>
                <ChevronLeft />
              </ScrollButton>
              {triggers.map(({ value, label }) => (
                <Trigger
                  key={value + 'trigger'}
                  value={value}
                  onClick={scrollIntoView}
                  onMouseEnter={() => {
                    loadMediaOnHover(value);
                  }}
                >
                  {label}
                </Trigger>
              ))}
              <ScrollButton direction='right' onClick={scrollNavigation('right')} disabled={isButtonDisabled.right}>
                <ChevronRight />
              </ScrollButton>
            </TriggersContainer>

            {tabList.map(({ label, id, copy, featuredMedia }) => {
              const isMediaImage = !isMediaVideo(featuredMedia?.src ?? '');
              // this only works for images,
              // videos are out of this behavior because they don't fill the whole container width
              // adding some blank space to the sides of the video, making the background image appear together with the video
              const shouldDoTransitionEffect = bgForTransition && isMediaImage;

              return (
                <Content key={label + 'content'} value={parseValue(id)}>
                  <Grid.Container>
                    {featuredMedia && (
                      <ContentMediaWrapper
                        xs={4}
                        small={5}
                        medium={7}
                        css={{
                          ...(shouldDoTransitionEffect && {
                            backgroundImage: `url(${bgForTransition})`,
                          }),
                        }}
                      >
                        <Media {...featuredMedia} fill />
                      </ContentMediaWrapper>
                    )}
                    <ContentCopy xs={4} small={3} medium={5}>
                      <CheckmarkIcon />
                      <Markdown
                        options={{
                          overrides: {
                            h1: {
                              component: TabContentHeading,
                            },
                            h2: {
                              component: TabContentHeading,
                            },
                          },
                        }}
                      >
                        {copy}
                      </Markdown>
                    </ContentCopy>
                  </Grid.Container>
                </Content>
              );
            })}
          </TabsContainer>
        </TabsWrapper>
      </Grid.Container>
    </Section>
  );
}

const TabContentHeading = (props: HeadingProps) => {
  return <Heading {...props} htmlAs='p' level={3} css={{ marginBottom: '$xs' }} />;
};

const rotateGradient = keyframes({
  '0%': {
    '--gradient-angle': INITIAL_GRADIENT_ANGLE.string,
  },
  '100%': {
    '--gradient-angle': `${INITIAL_GRADIENT_ANGLE.number + 360}deg`,
  },
});

const TabsWrapper = styled(Grid.FullWidthItem, {
  $$containerInlinePadding: theme.space.large,
  boxShadow: '0px 12px 24px 0px #9D9D9D3D',
  // Add a gradient "border" to the container while keeping the background color
  '--gradient-angle': INITIAL_GRADIENT_ANGLE,
  background: `
      linear-gradient($cream, $cream) padding-box,
      linear-gradient(var(--gradient-angle), #00E3AA 7.3%, #3333FF 83.5%) border-box
    `,
  animation: `${rotateGradient} 7s linear infinite`,
  borderRadius: '$medium',
  border: '1px solid transparent',
  // less padding on top because of the scroll buttons
  paddingTop: '$small',
  paddingBottom: '$$containerInlinePadding',
  paddingInline: '$$containerInlinePadding',
  '@lessThanSmall': {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRight: 'none',
    // to go over the grid container width limitation
    width: 'calc(100% + (100vw - 100%)/2)',
    paddingRight: 'calc($$containerInlinePadding + $small)',
  },
  '@medium': {
    paddingBlock: '$xl',
    $$containerInlinePadding: theme.space.xxl,
  },
});

const TabsContainer = styled(Tabs.Root, {
  position: 'relative',
});

const TriggersContainer = styled(Tabs.List, {
  display: 'flex',
  alignItems: 'center',
  overflow: 'auto',
  marginBottom: '$$containerInlinePadding',

  '@lessThanSmall': {
    gap: '$xs',
  },
  '@small': {
    marginBottom: '$xxl',
    paddingInline: '36px',
  },
  '@medium': {
    marginBottom: '$huge',
  },

  '&::-webkit-scrollbar': {
    display: 'none',
  },
  '-ms-overflow-style': 'none' /* IE and Edge */,
  scrollbarWidth: 'none',
});

const Trigger = styled(Tabs.Trigger, {
  fontFamily: '$formula',
  fontSize: '$xs',
  lineHeight: '$xs',
  fontWeight: '$extrabold',
  whiteSpace: 'nowrap',

  textAlign: 'center',
  color: '$grayHoverDarkBackground',
  border: '1px solid',
  borderColor: 'transparent',
  borderRadius: '$semilarge',

  '&[data-state="active"]': {
    color: '$black',
    borderColor: '$black',
    transition: 'border-color 0.3s ease-in-out',
  },
  '&:hover:not([data-state="active"])': {
    color: '$grayHoverLightBackground',
  },

  paddingTop: '$xxs',
  paddingBottom: '$xxxs',
  paddingInline: '$small',

  '@medium': {
    paddingTop: '$medium',
    paddingBottom: '$small',
    paddingInline: '$large',
  },
});

const fade = keyframes({
  to: {
    opacity: 1,
  },
});

const Content = styled(Tabs.Content, {
  height: '385px',
  '@small': {
    height: '346px',
  },
  '@medium': {
    height: '346px',
  },
  '@large': {
    height: '363px',
  },
  '@xl': {
    height: '395px',
  },
  [`& ${Grid.Container}`]: {
    alignItems: 'center',
    height: '100%',
    '@lessThanSmall': {
      gridTemplateRows: '1fr 1fr',
      rowGap: '$large',
    },
  },
});

const fadeInUp = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translateY(10%)',
  },
  '50%': {
    transform: 'translateY(0)',
  },
  '100%': {
    opacity: 1,
  },
});

const ContentCopy = styled(Grid.Item, {
  opacity: 0,
  animation: `${fadeInUp} ${CONTENT_TRANSITION_TIMING.string} ease-in forwards`,
});

const ContentMediaWrapper = styled(Grid.Item, {
  position: 'relative',
  height: 'inherit',
  borderRadius: '$medium',
  backgroundSize: '100% 100%',
  backgroundPosition: 'center',
  '@small': {
    height: '346px',
  },
  '& video, & img': {
    opacity: 0,
    animation: `${fade} ${CONTENT_TRANSITION_TIMING.string} ease-in forwards`,
    borderRadius: '$medium',
  },
});

const MobileButtons = styled('div', {
  display: 'none',
  '@lessThanSmall': {
    // flexBasis: '100%',
    display: 'flex',
    marginBottom: '$small',
    position: 'relative',
    left: '-$small',
  },
});

const ScrollButton = styled('button', {
  display: 'grid',
  placeItems: 'center',
  backgroundColor: '$cream',
  svg: {
    width: '20px',
    height: '20px',
  },
  '&[disabled]': {
    cursor: 'not-allowed',
    color: '$grayHoverDarkBackground',
  },

  '@small': {
    position: 'absolute',
    height: '36px',
  },
  '@lessThanSmall': {
    [`&:not(${MobileButtons} &)`]: {
      display: 'none',
    },
    padding: '$small',
  },

  variants: {
    direction: {
      left: {
        left: '-$$containerInlinePadding',
        zIndex: 1,

        '@small': {
          paddingLeft: '$$containerInlinePadding',
          // add a shadow to the left of the button
          '&:not([disabled])': {
            boxShadow: '10px 0px 20px 10px $colors$cream',
            clipPath: 'inset(0px -40px 0px 0px)',
          },
        },
      },
      right: {
        right: '-$$containerInlinePadding',
        zIndex: 1,
        '@small': {
          paddingRight: '$$containerInlinePadding',
          // add a shadow to the right of the button
          '&:not([disabled])': {
            boxShadow: '-10px 0px 20px 10px $colors$cream',
            clipPath: 'inset(0px 0px 0px -40px)',
          },
        },
      },
    },
  },
});

const CheckmarkIcon = styled(Checkmark, {
  color: '$green',
  height: 32,
  width: 32,
  marginBottom: '$small',
});
