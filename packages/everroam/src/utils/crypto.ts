/**
 * from https://github.com/danharper/hmac-examples#javascript-es6
 */

const getUtf8Bytes = (text: string) =>
  new Uint8Array([...decodeURIComponent(encodeURIComponent(text))].map((c) => c.charCodeAt(0)));

const importCryptoKey = (args: Parameters<SubtleCrypto['importKey']>) => crypto.subtle.importKey(...args);

const sign = (args: Parameters<SubtleCrypto['sign']>) => crypto.subtle.sign(...args);

export const encryptText = async (
  key: string,
  text: string,
  algorithm: Parameters<SubtleCrypto['importKey']>[2],
  digest: 'hex' | 'base64' = 'hex'
) => {
  const keyBytes = getUtf8Bytes(key);
  const textBytes = getUtf8Bytes(text);

  const cryptoKey = await importCryptoKey(['raw', keyBytes, algorithm, true, ['sign']]);

  const signedArrayBytes = await sign(['HMAC', cryptoKey, textBytes]);

  switch (digest) {
    case 'base64':
      return btoa(String.fromCharCode(...new Uint8Array(signedArrayBytes)));
    case 'hex':
    default:
      // to lowercase hexits
      return [...new Uint8Array(signedArrayBytes)].map((b) => b.toString(16).padStart(2, '0')).join('');
  }
};
