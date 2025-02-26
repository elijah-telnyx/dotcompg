import { useEffect, useRef, useState, type HTMLAttributes } from 'react';
import { styled } from '../../../../styles';
import ScrollToTheTopIcon from '../../../Icons/ScrollToTheTopIcon';

const gradientStart = 'rgba(255, 255, 255, 0) 0%';
const gradientEnd = '#FFFFFF 100%';

export const ChatContainer = styled('section', {
  position: 'relative',
  borderLeft: '1px solid $tan',
  display: 'grid',
  gridTemplateRows: '48px 1fr',
});

export const ScrollToTopButton = styled('button', {
  marginLeft: '$medium',
  borderRadius: '$xs',
  display: 'grid',
  placeItems: 'center',
  height: 34,
  width: 34,
  transition: 'background-color 0.2s ease',
  marginBlock: '$xs',
  '&:hover': {
    backgroundColor: '$tan',
  },
});

export const ChatWrapper = styled('div', {
  maxHeight: 'inherit',
  overflow: 'auto',
  paddingRight: '$medium',

  '&:after': {
    content: '',
    position: 'absolute',
    width: '100%',
    top: 48, // button height + marginBlock
    height: 0,
    transition: 'height 0.3s ease-out',
  },
  variants: {
    showGradient: {
      true: {
        '&:after': {
          height: 48,
          background: `linear-gradient(0deg, ${gradientStart}, ${gradientEnd})`,
        },
      },
    },
  },

  '&::-webkit-scrollbar': {
    width: '4px',
  },

  /* Track */
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },

  /* Handle */
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'transparent',
  },
  '&:hover::-webkit-scrollbar-thumb': {
    backgroundColor: '$grayHoverDarkBackground',
    borderRadius: '$xxxl',
  },

  /* Handle on hover */
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: '$grayHoverLightBackground',
  },
});

export interface InferenceChatContainerProps
  extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function InferenceChatContainer({
  children,
  ...props
}: InferenceChatContainerProps) {
  const [hasGradient, setHasGradient] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const computeClientContainer = () => {
    const container = containerRef.current;
    if (!container) return;
    const isOnTop = container.scrollTop === 0;
    if (isOnTop) return setHasGradient(false);

    // give some space for the scroll behavior to kick in
    const scrollPadding = 20;
    setHasGradient(
      container.scrollHeight - scrollPadding > container.clientHeight
    );
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container?.addEventListener('scroll', computeClientContainer);
    return () => {
      container?.removeEventListener('scroll', computeClientContainer);
    };
  }, []);

  const handleScrollToTop = () => {
    const container = containerRef.current;
    if (!container) return;
    container.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.scrollTop = container.scrollHeight; // go to the bottom of the container when the chat is opened
    let prevScrollHeight = container.scrollHeight;

    const observer = new MutationObserver(function ScrollToBottomOfContainer() {
      const hasScrollHeightChanged =
        container.scrollHeight !== prevScrollHeight;

      if (hasScrollHeightChanged) {
        prevScrollHeight = container.scrollHeight;
        container.scrollTo({ top: prevScrollHeight, behavior: 'smooth' });
      }
    });

    // Observe changes to the container and its descendants
    observer.observe(container, {
      childList: true, // observe direct children changes
      subtree: true, // observe all descendants
      characterData: true, // observe text content changes
      attributes: true, // observe attribute changes
    });

    // Cleanup observer when component unmounts
    return () => observer.disconnect();
  }, []);

  return (
    <ChatContainer {...props}>
      <ScrollToTopButton onClick={handleScrollToTop}>
        <ScrollToTheTopIcon />
      </ScrollToTopButton>
      <ChatWrapper ref={containerRef} showGradient={hasGradient}>
        {children}
      </ChatWrapper>
    </ChatContainer>
  );
}
