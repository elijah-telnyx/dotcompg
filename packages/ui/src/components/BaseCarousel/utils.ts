// Converts a size string to a number.
// The string must be in 'px' format, e.g. '20px'.
export const convertSizeToNumber = (size: string): number => {
  if (!/^[0-9]+px$/.test(size)) {
    throw new Error('Size must be in px');
  }

  const sizeNumber = Number(size.replace('px', ''));

  if (Number.isNaN(sizeNumber)) {
    throw new Error('Size must be a number');
  }

  return sizeNumber;
};
