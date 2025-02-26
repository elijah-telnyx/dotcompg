import type { FocusEvent } from 'react';
import type { A11ySVGProps } from '../../Icons/A11ySVG';
import {
  ProductFamilyOptions,
  type ProductFamily,
  type Region,
} from '../utils';
import {
  COMPUTE_PATHS_MAP_PROPS,
  POP_PATHS_MAP_PROPS,
  SPRITE_PATHS_PROPS,
  type SpriteProps,
} from './networkMapSpritePaths';
import { SCROLL_SNAP_ELEMENT_DATA_ATTRIBUTE } from '../../ScrollSnapContainer';
import { config } from '../../../styles';

export interface NetworkMapSpriteProps
  extends React.HTMLAttributes<HTMLDivElement> {
  enabledMap: {
    [country: string]: string[];
  };
  family: ProductFamily;
  service: string;
  region: Region;
}

export interface NetworkMapTooltipProps {
  id: string;
  popId?: string;
  title: string;
  description?: string[];
  family: ProductFamily;
}

export type SpriteElementProps = Omit<
  SpriteProps[string],
  'x' | 'y' | 'width' | 'height' | 'data-region'
> & { id: string };

export const CONTAINER_ID = 'network-map-sprite-listbox';
export const PATH_ID_PREFIX = 'path-';
export const TOOLTIP_ID_PREFIX = 'tooltip-';

export const POP_PIN_SERVICE_PATHS_BY_FAMILY = {
  [ProductFamilyOptions.communications.value]: undefined,
  [ProductFamilyOptions.iot.value]: undefined,
  [ProductFamilyOptions.networking.value]: POP_PATHS_MAP_PROPS,
  [ProductFamilyOptions.compute.value]: COMPUTE_PATHS_MAP_PROPS,
};

export const DEFAULT_SVG_BBOX_PROPS: Pick<
  DOMRect,
  'x' | 'y' | 'width' | 'height'
> = {
  x: 0,
  y: 0,
  width: 1011,
  height: 667,
};

export const SPRITE_PATHS_ENABLE_PROPS: Pick<SpriteProps[string], 'tabIndex'> =
  {
    tabIndex: 0,
  };

export const SPRITE_PATHS_DISABLED_PROPS: Pick<
  SpriteProps[string],
  'aria-disabled' | 'tabIndex'
> = {
  tabIndex: -1,
  'aria-disabled': true,
};

export function getSVGProperties(id: string): A11ySVGProps {
  return {
    title: `${id} Network Map`,
    'aria-describedby': `${TOOLTIP_ID_PREFIX}${id}`,
    viewBox: '0 0 1011 667',
    width: '100%',
    height: '100%',
  };
}

export function getOptionProperties(
  enabledMap: NetworkMapSpriteProps['enabledMap']
): {
  [country: string]: SpriteProps[string];
} {
  const spriteBboxProps = DEFAULT_SVG_BBOX_PROPS;

  return Object.entries(SPRITE_PATHS_PROPS).reduce(
    (acc, [country, { group, ...elementProps }]) => {
      const spriteToggleProps = enabledMap[country]
        ? SPRITE_PATHS_ENABLE_PROPS
        : SPRITE_PATHS_DISABLED_PROPS;

      if (group) {
        return {
          ...acc,
          [country]: {
            ...elementProps,
            ...spriteToggleProps,
            ...spriteBboxProps,
            description: enabledMap[country],
            group: group.map((pathProps) => ({
              ...pathProps,
            })),
          },
        };
      }

      return {
        ...acc,
        [country]: {
          ...elementProps,
          ...spriteToggleProps,
          ...spriteBboxProps,
          description: enabledMap[country],
        },
      };
    },
    {}
  );
}

function onScroll(focusListOptionEvent: FocusEvent<HTMLDivElement>) {
  return function onScrollBlurOption() {
    focusListOptionEvent.target.blur();
    window.removeEventListener('scroll', onScroll(focusListOptionEvent));
  };
}

const onFocusListOptionHandler = (event: FocusEvent<HTMLDivElement>) => {
  // `target` is the nested `option` focused while `currentTarget` is the `CONTAINER_ID` listbox
  const id = event.target.id;

  if (id === CONTAINER_ID) return;

  const path = document.querySelector<SVGPathElement>(
    `#${PATH_ID_PREFIX}${id}, #${PATH_ID_PREFIX}${id}1` // acount for group paths
  );
  const tooltip = document.querySelector<HTMLDivElement>(
    `#${TOOLTIP_ID_PREFIX}${id}`
  );
  const container = document.querySelector<HTMLDivElement>(`#${CONTAINER_ID}`);

  const pathDomRect = path?.getBoundingClientRect();

  if (tooltip && pathDomRect) {
    const tooltipDomRect = tooltip.getBoundingClientRect();
    const relativeContainerDomRect =
      event.currentTarget.getBoundingClientRect();
    const containerComputedStyle = getComputedStyle(event.currentTarget);
    let tooltipTop: string | number = '50%';
    let tooltipLeft: string | number = '50%';

    tooltip.style.transformOrigin = '0% 0%';

    const isLarge = window.matchMedia(config.media.large).matches;
    const containerDomRect = container?.getBoundingClientRect();

    // there's a region zoom, so the container is transformed
    if (containerComputedStyle.transform !== 'none') {
      // will work, but only for some simple transformations
      const inverseMatrix = new DOMMatrix(
        containerComputedStyle.transform
      ).inverse();

      // `transform` sets an implicit `position: relative`, so the `top` and `left` values of the path are not in relation to the viewport
      const topleft = new DOMPoint(
        pathDomRect.x - relativeContainerDomRect.x,
        pathDomRect.y - relativeContainerDomRect.y
      ).matrixTransform(inverseMatrix);

      tooltipTop = topleft.y + pathDomRect.height / 4;
      tooltipLeft = topleft.x;
    } else {
      tooltipTop = pathDomRect.top + pathDomRect.height / 4;
      tooltipLeft = pathDomRect.left + pathDomRect.width / 2;

      // make sure to keep the tooltip within the bounds of the container
      if (
        tooltipTop + tooltipDomRect.height >
        relativeContainerDomRect.bottom
      ) {
        tooltipTop = relativeContainerDomRect.bottom - tooltipDomRect.height;
      }

      if (tooltipLeft + tooltipDomRect.width > relativeContainerDomRect.right) {
        tooltipLeft = relativeContainerDomRect.right - tooltipDomRect.width;
      }

      if (!isLarge) {
        if (!containerDomRect) {
          console.error(
            'Failed to get container DOM rect to set tooltip position'
          );
          return;
        }
        // mobile tooltip when no region filter is set -- position bottom empty space on the container
        tooltipTop = containerDomRect.bottom - tooltipDomRect.height / 2;
        tooltipLeft = containerDomRect.width / 2 - tooltipDomRect.width / 2;
      }
    }

    if (typeof tooltipTop === 'number' || typeof tooltipLeft === 'number') {
      tooltip.style.top = `${tooltipTop}px`;
      tooltip.style.left = `${tooltipLeft}px`;
    } else {
      tooltip.style.top = tooltipTop;
      tooltip.style.left = tooltipLeft;
    }
    // the tooltip is fixed on screen -- if user scrolls away, close tooltip
    window.addEventListener('scroll', onScroll(event));

    // account for any scrol snap container usage
    const scrollContainer = document.querySelector<HTMLDivElement>(
      `[${SCROLL_SNAP_ELEMENT_DATA_ATTRIBUTE}]`
    );

    scrollContainer?.addEventListener('scroll', onScroll(event));
  }
};

export const onFocusListOption = () => (event: FocusEvent<HTMLDivElement>) =>
  onFocusListOptionHandler(event);
