import { styled } from '../../../styles';
import * as Tabs from '@radix-ui/react-tabs';
import {
  useRef,
  useState,
  type MouseEvent,
  Children,
  isValidElement,
  cloneElement,
  type ReactElement,
} from 'react';

import { ChevronLeft, ChevronRight } from '../../Icons';
import useBrowserLayoutEffect from '../../../utils/hooks/useBrowserLayoutEffect';

const DEFAULT_DELAY = 350;

const asyncScrollTo = <T extends HTMLElement | Element>(
  element: T,
  options: ScrollToOptions & {
    delay?: number;
  }
): Promise<T> => {
  const delay = options?.delay ?? DEFAULT_DELAY;

  return new Promise((resolve) => {
    element.scrollTo(options);

    setTimeout(() => {
      resolve(element);
    }, delay);
  });
};

interface TabsTriggersContainerProps {
  children: React.ReactNode;
}

// Add this interface to define the child props
interface TabTriggerProps {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const TabsTriggersContainer = ({
  children,
}: TabsTriggersContainerProps) => {
  const triggersContainerRef = useRef<HTMLDivElement>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState<{
    left: boolean;
    right: boolean;
  }>({
    left: true,
    right: false,
  });
  const [hasScroll, setHasScroll] = useState(false);

  const scrollNavigation =
    (direction: 'left' | 'right') =>
    (_event: MouseEvent<HTMLButtonElement>) => {
      const triggerContainer = triggersContainerRef.current;
      if (!triggerContainer || isButtonDisabled[direction]) return;

      const scrollPosition =
        direction === 'left'
          ? triggerContainer.scrollLeft - triggerContainer.offsetWidth / 2
          : triggerContainer.scrollLeft + triggerContainer.offsetWidth / 2;

      asyncScrollTo(triggerContainer, {
        left: scrollPosition,
        behavior: 'smooth',
      }).then(checkButtonDisabled);
    };

  const checkScrollable = () => {
    const triggerContainer = triggersContainerRef.current;
    if (!triggerContainer) return;

    const hasScrollableContent =
      triggerContainer.scrollWidth > triggerContainer.clientWidth;
    setHasScroll(hasScrollableContent);
  };

  const checkButtonDisabled = (
    element: Awaited<ReturnType<typeof asyncScrollTo>>
  ) => {
    const { scrollLeft, clientWidth, scrollWidth } = element;

    setIsButtonDisabled({
      left: scrollLeft <= 0,
      right: scrollLeft >= scrollWidth - clientWidth,
    });
  };

  // Add useEffect to check initial scroll state
  useBrowserLayoutEffect(() => {
    checkScrollable();
    window.addEventListener('resize', checkScrollable);

    return () => {
      window.removeEventListener('resize', checkScrollable);
    };
  }, []);

  const onTriggersContainerScroll = (_event: React.UIEvent<HTMLDivElement>) => {
    const triggerContainer = triggersContainerRef.current;
    if (!triggerContainer) return;
    checkButtonDisabled(triggerContainer);
  };

  function scrollIntoView(event: MouseEvent<HTMLButtonElement>) {
    const target = event.currentTarget as HTMLElement;
    const triggerContainer = triggersContainerRef.current;

    if (triggerContainer) {
      // Add offset to account for box-shadow/visual elements that might get cut off
      const boxShadowOffset = 20;
      // Get the precise position and dimensions of both the clicked tab and its container
      const targetRect = target.getBoundingClientRect();
      const containerRect = triggerContainer.getBoundingClientRect();
      const elementWidth = targetRect.width;

      // Check if the tab is partially hidden on either side of the container
      // - On the left: if tab's left edge (minus offset) is less than container's left edge
      // - On the right: if tab's right edge extends beyond container's right edge
      // - Both take into account the width of the tab
      const isPartiallyVisible =
        targetRect.left - boxShadowOffset - elementWidth < containerRect.left ||
        targetRect.right + elementWidth > containerRect.right;

      if (isPartiallyVisible) {
        // Calculate the scroll position that will center the tab in the container:
        // 1. Start with the tab's left offset
        // 2. Subtract half the container width to center the container
        // 3. Add half the tab width to center the tab itself
        const scrollPosition =
          target.offsetLeft - containerRect.width / 2 + target.offsetWidth / 2;
        // Smoothly scroll the container to the calculated position
        triggerContainer.scrollTo({ left: scrollPosition, behavior: 'smooth' });
      }
    }
  }

  // Update the child type in your component
  const triggers = Children.map(children, (child) => {
    if (!isValidElement(child)) return child;

    return cloneElement(child as ReactElement<TabTriggerProps>, {
      onClick: (event: MouseEvent<HTMLButtonElement>) => {
        if (child.props.onClick) {
          child.props.onClick(event);
        }
        scrollIntoView(event);
      },
    });
  });

  return (
    <>
      {hasScroll && (
        <MobileButtons>
          <ScrollButton
            direction='left'
            onClick={scrollNavigation('left')}
            disabled={isButtonDisabled.left}
          >
            <ChevronLeft />
          </ScrollButton>
          <ScrollButton
            direction='right'
            onClick={scrollNavigation('right')}
            disabled={isButtonDisabled.right}
          >
            <ChevronRight />
          </ScrollButton>
        </MobileButtons>
      )}

      <TriggersContainer
        ref={triggersContainerRef}
        onScroll={onTriggersContainerScroll}
      >
        {hasScroll && (
          <ScrollButton
            direction='left'
            onClick={scrollNavigation('left')}
            disabled={isButtonDisabled.left}
          >
            <ChevronLeft />
          </ScrollButton>
        )}
        {triggers}
        {hasScroll && (
          <ScrollButton
            direction='right'
            onClick={scrollNavigation('right')}
            disabled={isButtonDisabled.right}
          >
            <ChevronRight />
          </ScrollButton>
        )}
      </TriggersContainer>
    </>
  );
};

const TriggersContainer = styled(Tabs.List, {
  display: 'flex',
  alignItems: 'center',
  overflow: 'auto',

  '@lessThanSmall': {
    gap: '$xs',
  },
  '@small': {
    paddingInline: '$large',
  },

  '&::-webkit-scrollbar': {
    display: 'none',
  },
  '-ms-overflow-style': 'none' /* IE and Edge */,
  scrollbarWidth: 'none',
});

const MobileButtons = styled('div', {
  display: 'none',
  '@lessThanSmall': {
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
    pointerEvents: 'none',
  },
  '&:hover': {
    color: '$grayHoverLightBackground',
  },

  '@small': {
    position: 'absolute',
    height: '48px',
  },
  '@lessThanSmall': {
    [`&:not(${MobileButtons} &)`]: {
      display: 'none',
    },
    padding: '$small',
  },
  $$defaultInlinePadding: '$space$xxh',
  variants: {
    direction: {
      left: {
        left: 'calc(var(---containerInlinePadding, $$defaultInlinePadding) * -1)',
        zIndex: 1,

        '@small': {
          paddingLeft: 'var(---containerInlinePadding, $$defaultInlinePadding)',
          // add a shadow to the left of the button
          '&:not([disabled])': {
            boxShadow: '10px 0px 20px 10px $colors$cream',
            clipPath: 'inset(0px -40px 0px 0px)',
          },
        },
      },
      right: {
        right:
          'calc(var(---containerInlinePadding, $$defaultInlinePadding) * -1)',
        zIndex: 1,
        '@small': {
          paddingRight:
            'var(---containerInlinePadding, $$defaultInlinePadding)',
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
