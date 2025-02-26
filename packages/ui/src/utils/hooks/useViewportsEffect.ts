import { useEffect, useRef } from 'react';
import { theme } from '../../styles';

export type ViewportKey = keyof typeof theme.viewports;

const viewportsList = Object.keys(theme.viewports) as ViewportKey[];

/**
 * We can't use our current media queries because they are based on the minimum value
 * of a viewport, but we need to use the minimum and the maximum value to avoid overlapping
 * and not triggering the match media query event
 */

/**
 * Media queries based on theme breakpoints
 */
const viewportsMedia = viewportsList
  /**
   * Order array by viewport size
   */
  .sort((a, b) => {
    const aNum = Number(theme.viewports[a].value.replace('px', ''));
    const bNum = Number(theme.viewports[b].value.replace('px', ''));
    return aNum - bNum;
  })
  /**
   * Create media queries with min and max values
   */
  .reduce((media, name, index, viewports) => {
    const maxValueHandler = (bp: string) => {
      return Number(bp.replace('px', '')) - 0.5 + 'px';
    };

    const current = name;
    const next = viewports[index + 1];

    const isFirst = index === 0;
    const isLast = index === viewports.length - 1;

    if (isFirst) {
      return {
        ...media,
        [name]: `screen and (max-width: ${maxValueHandler(
          theme.viewports[next].value
        )})`,
      };
    }
    if (isLast) {
      return {
        ...media,
        [name]: `screen and (min-width: ${theme.viewports[current].value})`,
      };
    }

    if (!next) return media;

    const value = {
      min: theme.viewports[current].value,
      max: theme.viewports[next].value,
    };

    return {
      ...media,
      [name]: `screen and (min-width:${
        value.min
      }) and (max-width: ${maxValueHandler(value.max)})`,
    };
  }, {} as Record<ViewportKey, string>);

function useViewportsEffect({
  onViewportChange,
}: {
  onViewportChange: (media: ViewportKey) => void;
}) {
  const onViewportChangeRef = useRef(onViewportChange);

  useEffect(() => {
    onViewportChangeRef.current = onViewportChange;
  }, [onViewportChange]);

  useEffect(() => {
    let mounted = true;

    const mediaQueries = viewportsList.reduce(
      (mediaQueryListObject, mediaKey) => {
        const mediaQueryList = window.matchMedia(viewportsMedia[mediaKey]);
        const event = function onChange() {
          if (!mounted) {
            return;
          }
          if (mediaQueryList.matches) {
            onViewportChangeRef.current(mediaKey);
          }
        };

        mediaQueryList.addListener(event);
        return {
          ...mediaQueryListObject,
          [mediaKey]: { event, mediaQueryList },
        };
      },
      {} as Record<
        ViewportKey,
        { event: () => void; mediaQueryList: MediaQueryList }
      >
    );

    const mediaQueriesList = Object.keys(mediaQueries) as ViewportKey[];

    // set initial value
    mediaQueriesList.forEach((key) => {
      mediaQueries[key].event();
    });

    return () => {
      mounted = false;
      mediaQueriesList.forEach((mqlMedia) => {
        const mql = mediaQueries[mqlMedia];
        mql.mediaQueryList.removeListener(mql.event);
      });
    };
  }, []);
}

export default useViewportsEffect;
