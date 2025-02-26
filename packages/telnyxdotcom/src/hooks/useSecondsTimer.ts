import { useEffect, useState } from 'react';

const useSecondsTimer = (seconds: number, paceInMs = 1000) => {
  const [counter, setCounter] = useState(seconds);

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), paceInMs);
  }, [counter, paceInMs]);

  return counter;
};

export default useSecondsTimer;
