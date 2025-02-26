import { useEffect } from 'react';
import { useRouter } from 'next/router';
import NextScript, { type ScriptProps } from 'next/script';
import { onSiftError } from './lifecycleMethods';

const SIFT_URL = 'https://cdn.sift.com/s.js';
export const SIFT_SCRIPT_ID = 'sift-script';

export interface SiftProps {
  strategy?: ScriptProps['strategy'];
}

declare global {
  interface Window {
    _sift: {
      push: (entry: [string, string] | [string]) => void;
    };
  }
}

export const Sift = ({ strategy }: SiftProps) => {
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeComplete', onRouteChangeSiftPageView);
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeSiftPageView);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // register event listener just once

  /**
   * https://sift.com/developers/docs/curl/javascript-api/overview
   */
  function onRouteChangeSiftPageView() {
    const _sift = (window._sift = window._sift || []);
    _sift.push(['_trackPageview']);
  }

  return <NextScript id={SIFT_SCRIPT_ID} onError={onSiftError} src={SIFT_URL} strategy={strategy} />;
};

export default Sift;
