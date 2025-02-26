import type { ThemedCSS } from '../../styles/config/stitches.config';
import { config } from '../../styles';
import useBrowserLayoutEffect from '../../utils/hooks/useBrowserLayoutEffect';
import useMedia from '../../utils/hooks/useMedia';
import { useRef } from 'react';

const transition = 'opacity 500ms cubic-bezier(0.2, 0, 0, 1)';

const parallaxStyles: Record<string, ThemedCSS> = {
  container: {
    display: 'block',
    position: 'sticky',
    top: 0,
    height: '100vh',
  },
  item: {
    opacity: 0,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    transition,
  },
};

const toggleMediaOpacity =
  (mediaList?: HTMLCollection) => (entry: IntersectionObserverEntry) => {
    if (!mediaList) return;

    const index = entry.target.getAttribute('data-index');
    const target = mediaList[Number(index)];

    if (!target) return;
    const video = target.children && (target.children[0] as HTMLVideoElement);

    if (video) {
      handleVideoController(video, entry.isIntersecting);
    }

    if (entry.isIntersecting) {
      target.setAttribute('style', 'opacity: 1; z-index: 1');
    } else {
      target.removeAttribute('style');
    }
  };

const scrollSnapToEntryDesktop = (entry: IntersectionObserverEntry) => {
  if (entry.isIntersecting) {
    /**
     * The entry element doesn't know of the page scroll context size so we
     * have to select the container parent
     */
    const containerElement = entry.target?.parentElement
      ?.parentElement as HTMLDivElement;
    const index = Number(entry.target.getAttribute('data-index'));
    const entryHeight = entry.target.clientHeight;

    window.scrollTo({
      top: containerElement.offsetTop + entryHeight * Number(index),
      behavior: 'smooth',
    });
  }
};

const handleScrollMedium =
  (mediaList?: HTMLCollection) => (entry: IntersectionObserverEntry) => {
    toggleMediaOpacity(mediaList)(entry);
    scrollSnapToEntryDesktop(entry);
  };

const scrollToIntersectingElement = (entry: IntersectionObserverEntry) => {
  if (entry.isIntersecting) {
    window.scrollTo({
      top: (entry.target as HTMLDivElement).offsetTop,
      behavior: 'smooth',
    });
  }
  const video = entry.target?.querySelector('video');
  if (video) handleVideoController(video, entry.isIntersecting);
};

const handleVideoController = (video: HTMLVideoElement, isVisible: boolean) => {
  if (
    !video ||
    typeof video.play !== 'function' ||
    typeof video.pause !== 'function'
  ) {
    return;
  }
  if (isVisible) {
    video.play();
  } else {
    video.pause();
  }
};

const useTwoColumnsParallax = () => {
  const visibilityContainerRef = useRef<HTMLDivElement>(null);
  const visibilityContainerControllerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver>();
  const isMedium = useMedia(config.media.medium);
  useBrowserLayoutEffect(() => {
    const controller = visibilityContainerControllerRef.current;
    if (!controller?.children) return;

    const setVisibilityObserver = (entries: IntersectionObserverEntry[]) => {
      const visibilityContainer = visibilityContainerRef.current;

      entries.forEach(
        isMedium
          ? handleScrollMedium(visibilityContainer?.children)
          : scrollToIntersectingElement
      );
    };

    const observer = new IntersectionObserver(setVisibilityObserver, {
      root: null,
      rootMargin: '0px',
      threshold: 0.4,
    });
    Array.from(controller.children).forEach((el) => {
      observer.observe(el);
    });
    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMedium]);

  return {
    parallaxStyles,
    visibilityContainerRef,
    visibilityContainerControllerRef,
  };
};

export default useTwoColumnsParallax;
