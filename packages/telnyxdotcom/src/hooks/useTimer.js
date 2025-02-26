import { useRef, useEffect, useCallback } from 'react';

const clearTimer = (timer, repeat) => (repeat ? clearInterval(timer) : clearTimeout(timer));

const setTimer = (callback, time, repeat) => (repeat ? setInterval(callback, time) : setTimeout(callback, time));

const useTimer = ({ secondsToTrigger, repeat = false }) => {
  const timerRef = useRef();

  const call = (cb, ...args) => {
    if (timerRef.current) {
      clearTimer(timerRef.current);
    }
    timerRef.current = setTimer(() => cb(...args), secondsToTrigger * 1000, repeat);
  };

  // * fn to return in cleanup
  const cleanup = useCallback(() => {
    clearTimer(timerRef.current, repeat);
  }, [repeat]);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return [call, cleanup];
};

export default useTimer;
