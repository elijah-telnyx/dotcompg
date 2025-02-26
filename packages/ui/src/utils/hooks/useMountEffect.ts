import { useEffect } from 'react';

const useMountEffect = (effect: () => void | (() => void)) => {
  //eslint-disable-next-line
  useEffect(effect, []);
};

export default useMountEffect;
