import React from 'react';
import type { config } from '../../styles';

type mediaKeys = keyof typeof config.media;

/**
 *
 * @param query media query to look for. Ex: `screen and (max-width:`
 * @param initialState what value to use as initial when no media query is found. When not provided, default value is `false`
 * @returns state piece
 */
function useMedia(
  query: (typeof config.media)[mediaKeys],
  initialState: boolean | null = false
) {
  const [state, setState] = React.useState(initialState);
  React.useDebugValue(`\`${query}\` => ${state}`);

  React.useEffect(() => {
    let mounted = true;
    const mql = window.matchMedia(query);
    function onChange() {
      if (!mounted) {
        return;
      }
      setState(Boolean(mql.matches));
    }

    mql.addListener(onChange);
    setState(mql.matches);

    return () => {
      mounted = false;
      mql.removeListener(onChange);
    };
  }, [query]);

  return state;
}

export default useMedia;
