export const getTimestamp = () => {
  return (
    new Date()
      .toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hourCycle: 'h12',
      })
      // format to the same way of moment().format('MMMM Do YYYY, h:mm a')
      .replace(/(\d+),/, '$1th')
      .replace(' at', ',')
  );
};

export const getTimeFromTimestamp = (timestamp: string) => {
  return timestamp.match(/(\d+:\d+ \w{2})/)?.[0];
};
