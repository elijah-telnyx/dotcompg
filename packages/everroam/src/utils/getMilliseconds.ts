export const getMilliseconds = ({
  minutes,
  hours,
  days,
}: Partial<{ minutes: number; hours: number; days: number }>) => {
  const milliseconds = 1000;
  const seconds = 60;
  const min = (minutes || 1) * 60;
  const h = (hours || 1) * 24;

  if (minutes) {
    return milliseconds * min;
  }
  if (hours) {
    return milliseconds * seconds * min * hours;
  }
  if (days) {
    return milliseconds * seconds * min * h * days;
  }

  throw new Error('You need to pass minutes, hours or days');
};
