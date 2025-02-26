import { generateURLWithSearchParams } from './generateURLWithSearchParams';

describe('generateURLWithSearchParams', () => {
  test('it should generate url with search params', () => {
    const url = 'https://telnyx.com';
    const params = {
      foo: 'bar',
      bar: 'foo',
    };

    expect(generateURLWithSearchParams({ url, params })).toEqual(
      'https://telnyx.com?foo=bar&bar=foo'
    );
  });
  test('it should generate url with search params, without indices, receiving an array as a param', () => {
    const url =
      'http://billing.query.prod.telnyx.io:8080/v2/public/unprotected/cost-codes';
    const params = {
      'filter[country_code]': 'US',
      currency: 'USD',
      cost_codes: [
        'DID-RATE0-USAGE',
        'TF-RATE0-USAGE',
        'CHANNEL-MRC',
        'CALL-RECORDING-TERMINATION-USAGE',
        'CALL-RECORDING-STORAGE',
        'E911-MRC',
      ],
    };

    expect(
      generateURLWithSearchParams({ url, params, options: { indices: false } })
    ).toEqual(
      `${url}?filter[country_code]=US&currency=USD&cost_codes=${params.cost_codes[0]}&cost_codes=${params.cost_codes[1]}&cost_codes=${params.cost_codes[2]}&cost_codes=${params.cost_codes[3]}&cost_codes=${params.cost_codes[4]}&cost_codes=${params.cost_codes[5]}`
    );
  });
});
