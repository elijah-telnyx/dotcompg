/**
 * Converts string of numbers to E.164 formatted string
 *
 * @param  {string} value Number or list of numbers separated by comma, semicolon, or newline
 * @return {string}
 */

const convertToE164 = (value: string) => {
  if (!value || !/\d/.test(value)) return '';
  const numbers = value.split(/[;,\n]/);
  return numbers
    .map((number) => {
      const cleanNumber = number.match(/(\+)?\d+/g)?.join('') ?? '';
      if (/^\+/.test(cleanNumber)) {
        return cleanNumber;
      }
      return cleanNumber.length === 10 ? `+1${cleanNumber}` : `+${cleanNumber}`;
    })
    .join(',');
};

export default convertToE164;
