import { convertSizeToNumber } from './utils';

describe('convertSizeToNumber', () => {
  it('should return a number when passed a valid size string', () => {
    expect(convertSizeToNumber('10px')).toEqual(10);
    expect(convertSizeToNumber('100px')).toEqual(100);
    expect(convertSizeToNumber('0px')).toEqual(0);
  });

  it('should throw an error if the size is not in px format', () => {
    expect(() => convertSizeToNumber('10em')).toThrow('Size must be in px');
    expect(() => convertSizeToNumber('100%')).toThrow('Size must be in px');
    expect(() => convertSizeToNumber('10')).toThrow('Size must be in px');
  });

  it('should throw an error if the size is not a number', () => {
    expect(() => convertSizeToNumber('abc')).toThrow('Size must be in px');
    expect(() => convertSizeToNumber('aapx')).toThrow('Size must be in px');
    expect(() => convertSizeToNumber('a12px')).toThrow('Size must be in px');
  });
});
