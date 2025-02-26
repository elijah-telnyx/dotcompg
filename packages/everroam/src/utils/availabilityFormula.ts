export const availabilityFormula = (count: string) => {
  let low, high, digit, countString;
  const actualNumber = count.replace(/\D/g, '');

  switch (actualNumber.length) {
    case 1:
      countString = `250+`;
      break;
    case 2:
      countString = `250+`;
      break;
    case 3:
      countString = `1k+`;
      break;
    case 4:
      low = Math.floor(+actualNumber);
      high = (low + 2000).toString();
      digit = high.length === 5 ? high.substring(0, 2) : high.substring(0, 1);
      countString = `${digit}k+`;
      break;
    case 5:
      high = (Math.ceil(+actualNumber / 10000) * 10000).toString();
      digit = high.length === 6 ? high.substring(0, 3) : high.substring(0, 2);
      countString = `${digit}k+`;
      break;
    case 6:
      high = (Math.ceil(+actualNumber / 100000) * 100000).toString();
      digit = high.length === 7 ? '1' : high.substring(0, 3);
      countString = digit === '1' ? '1M+ ' : `${digit}k+`;
      break;
    case 7:
    case 8:
      high = (Math.ceil(+actualNumber / 1000000) * 1000000).toString();
      digit = high.length === 8 ? high.substring(0, 2) : high.substring(0, 1);
      countString = `${digit}M+`;
      break;
    default:
      countString = `${actualNumber}+`;
  }

  return countString;
};
