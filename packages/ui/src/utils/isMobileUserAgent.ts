const appleIpad = /iPad/i;
const appleIphone = /iPhone/i;
const appleIpod = /iPod/i;
const appleUniversal = /\biOS-universal(?:.+)Mac\b/i;
const androidPhone = /\bAndroid(?:.+)Mobile\b/i; // Match 'Android' AND 'Mobile'
const androidTablet = /Android/i;
const amazonPhone = /(?:SD4930UR|\bSilk(?:.+)Mobile\b)/i; // Match 'Silk' AND 'Mobile'
const amazonTablet = /Silk/i;
const windowsPhone = /Windows Phone/i;
const windowsTablet = /\bWindows(?:.+)ARM\b/i; // Match 'Windows' AND 'ARM'
const otherBlackBerry = /BlackBerry/i;
const otherBlackBerry10 = /BB10/i;
const otherOpera = /Opera Mini/i;
const otherChrome = /\b(CriOS|Chrome)(?:.+)Mobile/i;
const otherFirefox = /Mobile(?:.+)Firefox\b/i; // Match 'Mobile' AND 'Firefox'

const iosUserAgents = [appleIpad, appleIphone, appleIpod, appleUniversal];

const mobileUserAgents = [
  ...iosUserAgents,
  androidPhone,
  androidTablet,
  amazonPhone,
  amazonTablet,
  windowsPhone,
  windowsTablet,
  otherBlackBerry,
  otherBlackBerry10,
  otherOpera,
  otherChrome,
  otherFirefox,
];

/**
 * Check through navigator and user agent if the user is in a mobile device (smartphones, tablets)
 */
export default function isMobileUserAgent(userAgent: string): boolean {
  return mobileUserAgents.some((userAgentRegex) =>
    userAgentRegex.test(userAgent)
  );
}

export const isMobileIOSUserAgent = (userAgent: string) => {
  return iosUserAgents.some((userAgentRegex) => userAgentRegex.test(userAgent));
};
