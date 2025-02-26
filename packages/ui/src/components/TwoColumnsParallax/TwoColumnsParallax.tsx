import * as css from './TwoColumnsParallax.styled';

import CurlElement from './CurlElement';
import type { ReactNode } from 'react-markdown';
import useTwoColumnsParallax from './useTwoColumnsParallax';

interface Item {
  right: ReactNode;
  left: ReactNode;
  id: number | string;
}
export interface TwoColumnsParallaxProps {
  items: Item[];
  breakpoint?: string;
  hasCurlElement?: boolean;
}

const TwoColumnsParallax = ({
  items,
  breakpoint = '@medium',
  hasCurlElement,
}: TwoColumnsParallaxProps) => {
  const {
    parallaxStyles,
    visibilityContainerControllerRef,
    visibilityContainerRef,
  } = useTwoColumnsParallax();

  return (
    <css.Wrapper data-type={hasCurlElement ? 'curl' : undefined}>
      {hasCurlElement && <CurlElement />}
      <css.ItemsContainer>
        <css.LeftColumn ref={visibilityContainerControllerRef}>
          {items.map(({ left, right, id }, index) => {
            return (
              <css.Row key={(id || index) + 'items-mobile'} data-index={index}>
                <css.LeftColumnContent>{left}</css.LeftColumnContent>
                <css.RightColumnContent
                  css={{
                    [breakpoint]: {
                      display: 'none',
                    },
                  }}
                >
                  {right}
                </css.RightColumnContent>
              </css.Row>
            );
          })}
        </css.LeftColumn>
        <css.RightColumn
          ref={visibilityContainerRef}
          css={{
            display: 'none',
            [breakpoint]: {
              ...parallaxStyles.container,
            },
          }}
        >
          {items.map((item, index) => {
            return (
              <css.Row
                key={(item?.id || index) + 'items-desktop'}
                css={{
                  [breakpoint]: {
                    ...parallaxStyles.item,
                  },
                }}
              >
                {item.right}
              </css.Row>
            );
          })}
        </css.RightColumn>
      </css.ItemsContainer>
      {hasCurlElement && <CurlElement reverse />}
    </css.Wrapper>
  );
};

export default TwoColumnsParallax;
