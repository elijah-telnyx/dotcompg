import { addOpacityToHex } from './styles';

const black = '#000000';

describe('addOpacityToHex', () => {
  it('should return FF for opacity 1', () => {
    const result = addOpacityToHex(1)(black);
    expect(result).toBe(black + 'FF');
  });
  it('should return 66 for opacity 0.4', () => {
    const result = addOpacityToHex(0.4)(black);
    expect(result).toBe(black + '66');
  });
  it('should return 3B for opacity 0.23', () => {
    const result = addOpacityToHex(0.23)(black);
    expect(result).toBe(black + '3B');
  });
  it('should return 00 for opacity 0', () => {
    const result = addOpacityToHex(0.0)(black);
    expect(result).toBe(black + '00');
  });
});
