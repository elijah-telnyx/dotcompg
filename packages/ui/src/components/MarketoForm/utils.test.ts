import { formatToE164, validatePhoneForE164 } from './utils';

describe('formatToE164', () => {
  const countryCode = '+1';
  it('should return only numbers with the + at the start', () => {
    expect(formatToE164({ countryCode, phoneNumber: '212-555-1212' })).toBe(
      `${countryCode}2125551212`
    );
    expect(formatToE164({ countryCode, phoneNumber: '(212) 555-1212' })).toBe(
      `${countryCode}2125551212`
    );
    expect(formatToE164({ countryCode, phoneNumber: '2125551212' })).toBe(
      `${countryCode}2125551212`
    );
  });
  it('should remove the 0 from the start of the phone number', () => {
    expect(formatToE164({ countryCode, phoneNumber: '0212-555-1212' })).toBe(
      `${countryCode}2125551212`
    );
  });
});

describe('validatePhoneForE164', () => {
  it('should return true if the phone number is valid', () => {
    const countryCode = '+1';
    const valid = [`${countryCode}2125551212`];
    const invalid = [
      `${countryCode}-212-555-1212`,
      `${countryCode} 212 555 1212`,
      `${countryCode} (212) 555-1212`,
      `${countryCode} (0212) 555-1212`,
      `${countryCode} (574) 326 9202`,
      `${countryCode} 574-326-9202`,
      `${countryCode} 05743269202`,
    ];
    valid.forEach((phoneNumber) =>
      expect(validatePhoneForE164(phoneNumber)).toBe(true)
    );
    invalid.forEach((phoneNumber) => {
      expect(validatePhoneForE164(phoneNumber)).toBe(false);

      const valid = formatToE164({
        countryCode,
        phoneNumber: phoneNumber.replace(countryCode, ''),
      });
      expect(validatePhoneForE164(valid)).toBe(true);
    });
  });
});
