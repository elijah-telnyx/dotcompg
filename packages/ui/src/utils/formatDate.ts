const monthsAbbreviated: { [key: number]: string } = {
  1: 'Jan',
  2: 'Feb',
  3: 'Mar',
  4: 'Apr',
  5: 'May',
  6: 'Jun',
  7: 'Jul',
  8: 'Aug',
  9: 'Sep',
  10: 'Oct',
  11: 'Nov',
  12: 'Dec',
};

export const formatDate = (date: string) => {
  try {
    const dateObj = new Date(date);
    const month = monthsAbbreviated[dateObj.getMonth() + 1];
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    return `${day}, ${month} ${year}`;
  } catch (error) {
    console.error(error);
    return '';
  }
};
