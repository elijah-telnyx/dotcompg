import { useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import type { core, TweenTarget, TweenVars } from 'gsap';

interface GsapWrapper {
  to: (targets: TweenTarget, vars: TweenVars) => core.Tween;
}

export const useGsap = () => {
  const [gsapWrapper, setGsapWrapper] = useState<GsapWrapper | null>(null);

  useEffect(
    function loadGsap() {
      // https://gsap.com/resources/React
      if (!gsapWrapper) {
        import('gsap').then((gsap) => {
          gsap.default.registerPlugin(useGSAP);
          setGsapWrapper(gsap.default);
        });
      }
    },
    [gsapWrapper]
  );

  return gsapWrapper;
};
