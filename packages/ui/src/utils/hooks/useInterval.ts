import { useRef, useEffect } from 'react';

interface UseIntervalProps {
  timeSeconds: number;
  callback: () => void;
}

const useInterval = ({ timeSeconds, callback }: UseIntervalProps) => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const run = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (timeSeconds === 0) return;

    intervalRef.current = setInterval(callback, timeSeconds * 1000);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return {
    run,
  };
};

export default useInterval;
