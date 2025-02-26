import { useEffect, useState, type PropsWithChildren } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { keyframes, styled } from '../../../styles';
import ChevronDown from '../../Icons/ChevronDown';
import { HeaderNavigationMenuItem } from './HeaderNavigationMenuItem';
import { HeaderMenuLabel, HeaderMenuLabelContainer } from './HeaderLabels';

export interface HeaderNavigationMenuProps {
  label: string;
  seeMoreLink?: {
    href: string;
    label: string;
  };
}

const MAX_WIDTH = 1240;
export const MAIN_MENU_ID = 'main-menu';

export function HeaderNavigationMenu({
  children,
  label,
  seeMoreLink,
}: PropsWithChildren<HeaderNavigationMenuProps>) {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const scrollSnapContainer = document.querySelector(
      '[data-scroll-snap="true"]'
    );
    const element = scrollSnapContainer || window;

    if (isOpen) {
      element.addEventListener('scroll', closeMenu);
    } else {
      element.removeEventListener('scroll', closeMenu);
    }
    return () => {
      element.removeEventListener('scroll', closeMenu);
    };
  }, [isOpen]);

  return (
    <DropdownMenu.Root modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <DropdownTrigger>
        <HeaderMenuLabel>{label}</HeaderMenuLabel>
        <DropdownIcon width={13} height={13} />
      </DropdownTrigger>
      <DropdownContent
        onAnimationStart={() => {
          // element that controls the scroll on mobile
          const mainMenu = document.getElementById(MAIN_MENU_ID);
          if (mainMenu) mainMenu.scrollTop = 0;
        }}
      >
        <nav>
          <DropdownContentContainer>{children}</DropdownContentContainer>
          {seeMoreLink && (
            <SeeMoreLinkWrapper>
              <HeaderNavigationMenuItem {...seeMoreLink} iconVisible />
            </SeeMoreLinkWrapper>
          )}
        </nav>
      </DropdownContent>
    </DropdownMenu.Root>
  );
}

export const SeeMoreLinkWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$xs',
  color: '$cream',
  padding: '$medium',
  borderTop: '1px solid $black',

  '@headerDesktop': {
    paddingBlock: '$medium',
    paddingInline: '$xl',
  },
});

export const DropdownIcon = styled(ChevronDown, {
  transition: 'rotate 0.25s ease-in-out',
  '[data-state="open"] > &': {
    rotate: '180deg',
  },
});

const DropdownTrigger = styled(DropdownMenu.Trigger, HeaderMenuLabelContainer, {
  [`& ${DropdownMenu.Item}:hover`]: {
    outline: 'none',
  },

  '@headerMobileOnly': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    svg: {
      width: 24,
      height: 24,
    },
    color: '$black',
    '&[data-state="open"]': {
      marginBottom: '-$xs',
    },
    '& + div[data-radix-popper-content-wrapper]': {
      transform: `translate(0px, 0px) !important`,
      position: 'static !important',
    },
  },
  '@headerDesktop': {
    '& + [data-radix-popper-content-wrapper]': {
      maxWidth: MAX_WIDTH,
      width: '100%',
    },
    '&[data-state="open"]': {
      color: '$green',
    },

    '&:hover': {
      color: '$grayHoverDarkBackground',
    },

    '& + div[data-radix-popper-content-wrapper]': {
      $centerPosition: `calc((100vw - ${MAX_WIDTH}px)/ 2)`,
      transform: `translate($centerPosition, 90px) !important`,
    },
  },
});

const slideDown = keyframes({
  '0%': { transform: 'scaleY(0)', opacity: 0 },
  '100%': { transform: 'scaleY(1)', opacity: 1 },
});

const ANIMATION_DURATION = '.5s';
const ANIMATION_TRANSITION = 'cubic-bezier(0.87, 0, 0.13, 1)';

const DropdownContent = styled(DropdownMenu.Content, {
  backgroundColor: '$black',
  // screen width - sides padding
  maxWidth: 'calc(100vw - 48px)',
  borderRadius: '$medium',
  '@headerDesktop': {
    backgroundColor: '$grayEmbed',
    borderRadius: '$large',
    boxShadow: '0px 0px 20px 20px rgba(0,0,0, 0.1)',
    maxWidth: MAX_WIDTH,
  },
  transformOrigin: 'var(--radix-dropdown-menu-content-transform-origin)',

  '@headerMobileOnly': {
    '&[data-state="open"]': {
      animation: `${slideDown} ${ANIMATION_DURATION} ${ANIMATION_TRANSITION}`,
    },
  },
});

const DropdownContentContainer = styled('div', {
  padding: '$medium',
  '@headerDesktop': {
    padding: '$xl',
  },
});
