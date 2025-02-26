import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import dynamic from 'next/dynamic';
import Grid from 'ui/components/Grid';
import SectionHeader from 'ui/components/Section/SectionHeader';
import type { SectionHeaderProps } from 'ui/components/Section/SectionHeader';
import type { SectionProps } from 'ui/components/Section';
import { isDarkBackgroundColor } from 'ui/styles/constants/backgroundColorOptions';
import CtaButton, { type CTAButtonProps } from 'ui/components/CtaButton';
import Heading from 'ui/components/Typography/Heading';
import Paragraph from 'ui/components/Typography/Paragraph';
import Spinner, { type SpinnerProps } from 'ui/components/Spinner';
import VisuallyHidden from 'ui/components/VisuallyHidden';
import { useIntersectionObserver } from 'ui/utils/hooks/useIntersectionObserver';
import type { ThemedCSS } from 'ui/styles/config/stitches.config';
import type { Spacing } from 'ui/styles/constants/spacing';
import { INTERACTIVE_LOAD_DATA_MAP, type InteractiveType } from './api';
import { SCROLL_SNAP_ELEMENT_DATA_ATTRIBUTE } from 'ui/components/ScrollSnapContainer';
import * as css from './InteractiveDeveloperFocus.styled';

interface ItemTextProps {
  heading: string;
  copy?: string;
  cta?: Pick<CTAButtonProps, 'text' | 'href'>;
  backgroundColor: CTAButtonProps['backgroundColor'];
  isDark?: boolean;
  intersectionObserverThreshold?: IntersectionObserverInit['threshold'];
}

const ItemText = ({ heading, copy, cta, isDark, backgroundColor }: ItemTextProps) => {
  return (
    <css.TextBlock>
      <Grid.Item xs={4} small={8} medium={8}>
        <Heading
          level={3}
          alt={{
            '@medium': true,
          }}
          dark={isDark}
        >
          {heading}
        </Heading>
        {copy && <Paragraph dark={isDark}>{copy}</Paragraph>}
      </Grid.Item>
      {cta && (
        <Grid.Item xs={4} small={8} medium={4} large={12}>
          <CtaButton {...cta} type='button' text={cta.text} buttonKind='primary' backgroundColor={backgroundColor} />
        </Grid.Item>
      )}
    </css.TextBlock>
  );
};

interface Item extends ItemTextProps {
  id: string;
  center?: boolean;
  parallax?: boolean;
  relative?: boolean;
}

const ItemLoading = (props: SpinnerProps) => (
  <css.Loading>
    <Spinner background='dark' size='big' {...props} />
  </css.Loading>
);

interface InteractivePaginationProps {
  page: string;
  items: Item[];
  setParallax: Dispatch<SetStateAction<boolean>>;
}

/**
 * this means that the user has to scroll at least to the first sub section of the developer focus section to trigger the pagination
 */
const INTERACTIVE_PAGINATION_INTERSECTION_THRESHOLD = 0.15;

const InteractivePagination = ({ page, items, setParallax }: InteractivePaginationProps) => {
  const activeItem = items.find(({ id }) => id === page);

  if (!activeItem) return null;

  return (
    <css.Pagination>
      {items.map(({ id }) => (
        <css.PaginationItem
          key={id}
          backgroundColor={activeItem.backgroundColor}
          active={id === activeItem.id}
          type='button'
          onClick={() => {
            // once user tries to paginate, disable parallax. This is a limitation on scroll snap + parallax when scrolling up
            setParallax(false);
            // account for any scrol snap container usage
            const scrollContainer = document.querySelector<HTMLDivElement>(`[${SCROLL_SNAP_ELEMENT_DATA_ATTRIBUTE}]`);
            const hashElement = document.querySelector<HTMLDivElement>(`#${id}`);

            if (scrollContainer && hashElement) {
              // timeouts to make sure to put this above main thread
              setTimeout(function () {
                hashElement.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }
          }}
        >
          <VisuallyHidden>Go to {id}</VisuallyHidden>
        </css.PaginationItem>
      ))}
    </css.Pagination>
  );
};

const InteractiveCode = dynamic(() => import('./InteractiveCode'), {
  ssr: false,
  loading: () => <ItemLoading title='Loading code...' background='light' />,
});
const InteractiveInference = dynamic(() => import('./InteractiveInference'), {
  ssr: false,
  loading: () => <ItemLoading title='Loading inference...' />,
});
const InteractiveVoiceAI = dynamic(() => import('./InteractiveVoiceAI'), {
  ssr: false,
  loading: () => <ItemLoading title='Loading voice ai...' />,
});
const InteractiveOurNetwork = dynamic(() => import('./InteractiveOurNetwork'), {
  ssr: false,
  loading: () => (
    <css.InteractiveItem xs={4} small={8} medium={12} center transparent>
      <ItemLoading title='Loading our network...' background='light' />
    </css.InteractiveItem>
  ),
});

interface InteractiveSectionProps extends Omit<Item, 'isDark'> {
  loadData?: () => Promise<InteractiveType>;
  visible?: boolean;
  hasFilters?: boolean;
  initialBackgroundColor: Item['backgroundColor'];
  setPage: Dispatch<SetStateAction<string>>;
}

const InteractiveSection = ({
  loadData,
  setPage,
  initialBackgroundColor,
  hasFilters,
  ...item
}: InteractiveSectionProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [transparent, setTransparent] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<InteractiveType>({});
  const { observerRef, entry } = useIntersectionObserver<HTMLDivElement>({
    root: null,
    rootMargin: '0px',
    threshold: item.intersectionObserverThreshold,
  });

  useEffect(
    function onVisibleLoading() {
      async function init() {
        if (loadData) {
          const response = await loadData();
          setData(response);
          setLoading(false);
        }
      }

      // once visible, always loaded. Do not run async data load twice
      if (visible && loading) {
        init();
      }

      if (visible) {
        setPage(item.id);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [visible, loading, loadData] // `setPage` is a useState setter
  );

  useEffect(
    function onObserverSectionEntry() {
      const isIntersecting = !!entry?.isIntersecting;
      setVisible(isIntersecting);
      // once display, always display. Do not hide elements once they're displayed
      setTransparent((currentVisible) => currentVisible || isIntersecting);
    },
    [entry?.isIntersecting]
  );

  const backgroundColor = visible ? item.backgroundColor : loading ? initialBackgroundColor : item.backgroundColor;
  const isDark = isDarkBackgroundColor(backgroundColor);

  if (hasFilters) {
    return (
      <css.ScrollSnapSection
        id={item.id}
        parallax={item.parallax}
        relative={item.relative}
        backgroundColor={backgroundColor}
        htmlAs='div'
        scrollSnap
      >
        <css.Container ref={observerRef}>
          {loading && (
            <css.InteractiveContainer>
              <css.ContentItem xs={4} small={6} medium={10} large={10} xl={8}>
                <Heading
                  level={3}
                  alt={{
                    '@medium': true,
                  }}
                  dark={isDark}
                >
                  {item.heading}
                </Heading>
              </css.ContentItem>

              <css.InteractiveItem xs={4} small={8} medium={12} center={item.center} transparent>
                <ItemLoading title={`Loading ${item.id}`} background={isDark ? 'light' : 'dark'} />
              </css.InteractiveItem>
            </css.InteractiveContainer>
          )}
          {!loading && (
            <>
              {data.error && <css.Error>{data.error}</css.Error>}
              {data['our-network'] && (
                <InteractiveOurNetwork isDark={isDark} {...data['our-network']} heading={item.heading} />
              )}
            </>
          )}
        </css.Container>
      </css.ScrollSnapSection>
    );
  }

  return (
    <css.ScrollSnapSection
      id={item.id}
      parallax={item.parallax}
      backgroundColor={backgroundColor}
      htmlAs='div'
      scrollSnap
      pattern={item.id as keyof InteractiveType}
    >
      <css.Container ref={observerRef}>
        <css.InteractiveContainer>
          <ItemText
            heading={item.heading}
            copy={item.copy}
            cta={item.cta}
            backgroundColor={backgroundColor}
            isDark={isDark}
          />

          {loading && (
            <css.InteractiveItem xs={4} small={8} medium={12} center={item.center} transparent>
              <ItemLoading title={`Loading ${item.id}`} background={isDark ? 'light' : 'dark'} />
            </css.InteractiveItem>
          )}

          {!loading && (
            <css.InteractiveItem xs={4} small={8} medium={12} center={item.center} transparent={transparent} data>
              {data.error && <css.Error>{data.error}</css.Error>}
              {data.code && <InteractiveCode {...data.code} />}
              {data.inference && <InteractiveInference {...data.inference} />}
              {data['voice-ai'] && <InteractiveVoiceAI {...data['voice-ai']} />}
            </css.InteractiveItem>
          )}
        </css.InteractiveContainer>
      </css.Container>
    </css.ScrollSnapSection>
  );
};

export interface InteractiveDeveloperFocusProps extends SectionProps, SectionHeaderProps {
  items: Item[];
  initialBackgroundColor?: SectionProps['backgroundColor'];
  css?: ThemedCSS;
}

const shouldChangeBackground = (entry?: IntersectionObserverEntry) => {
  if (!entry) return false;
  // if the element is visible based on the threshold passed to the observer
  const isVisible = entry.isIntersecting;
  // when the user are below the section so it maintain the transitioned color
  const isBelowSection = entry.boundingClientRect?.top > 0;
  return !isVisible && isBelowSection;
};

const INTERACTIVE_DEVELOPER_FOCUS_INTERSECTION_THRESHOLD: IntersectionObserverInit['threshold'] = [0.1, 0.15, 0.2];

const InteractiveDeveloperFocus = ({
  heading,
  tagline,
  copy,
  items,
  initialBackgroundColor,
  ...props
}: InteractiveDeveloperFocusProps) => {
  const mainItem = items[0];
  const lastItem = items[items.length - 1];
  const relatedItems = items.slice(1);
  const [page, setPage] = useState<string>(mainItem.id);
  const [parallax, setParallax] = useState<boolean>(true);
  const { entry, observerRef } = useIntersectionObserver<HTMLDivElement>({
    threshold: INTERACTIVE_DEVELOPER_FOCUS_INTERSECTION_THRESHOLD,
  });
  const mainItemBackgroundColor = shouldChangeBackground(entry) ? initialBackgroundColor : props.backgroundColor;
  const mainItemIsDark = isDarkBackgroundColor(mainItemBackgroundColor);

  useEffect(
    // once user reaches the end of parallax items, disable parallax. This is a limitation on scroll snap + parallax when scrolling up
    function onOutOfSectionScope() {
      if (page === mainItem.id && !entry?.isIntersecting) {
        setParallax(true);
      }

      if (page === lastItem.id) {
        setParallax(false);
      }
    },
    [entry?.isIntersecting, page, mainItem.id, lastItem.id]
  );

  return (
    <>
      <css.Section
        {...props}
        backgroundColor={mainItemBackgroundColor}
        spacingBottom={
          {
            '@lessThanMedium': 'none',
          } as unknown as Spacing
        }
        htmlAs='div'
      >
        <Grid.Container>
          <Grid.FullWidthItem>
            <SectionHeader
              heading={heading}
              tagline={tagline}
              copy={copy}
              isDark={mainItemIsDark}
              variant='large'
              css={{ marginBottom: 0 }}
            />
          </Grid.FullWidthItem>
        </Grid.Container>
      </css.Section>

      <div ref={observerRef}>
        {entry?.intersectionRatio && entry?.intersectionRatio > INTERACTIVE_PAGINATION_INTERSECTION_THRESHOLD && (
          <InteractivePagination page={page} items={items} setParallax={setParallax} />
        )}

        <InteractiveSection
          {...mainItem}
          backgroundColor={mainItemBackgroundColor}
          initialBackgroundColor={mainItemBackgroundColor}
          parallax={parallax}
          loadData={INTERACTIVE_LOAD_DATA_MAP[mainItem.id as keyof typeof INTERACTIVE_LOAD_DATA_MAP]}
          setPage={setPage}
        />

        {relatedItems.map(({ id, backgroundColor, isDark, ...item }, index) => (
          <InteractiveSection
            {...item}
            key={id}
            id={id}
            backgroundColor={backgroundColor}
            initialBackgroundColor={index === 0 ? mainItemBackgroundColor : relatedItems[index - 1].backgroundColor}
            parallax={parallax}
            loadData={INTERACTIVE_LOAD_DATA_MAP[id as keyof typeof INTERACTIVE_LOAD_DATA_MAP]}
            setPage={setPage}
          />
        ))}
      </div>
    </>
  );
};

export default InteractiveDeveloperFocus;
