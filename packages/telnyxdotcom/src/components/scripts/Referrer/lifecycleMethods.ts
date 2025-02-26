/**
 * Fetches the current document referrer
 * Priority:
 * - query string `?referrer=`
 * - document.referrer
 * - cached referrer
 */
export async function loadReferrer() {
  if (typeof window === 'undefined') return;
  const cachedReferrer = getStoredReferrer();
  const queryReferrer = await getQueryReferrer();
  const currentReferrer = queryReferrer || document.referrer;

  if (currentReferrer && isValidReferrer(currentReferrer)) {
    setStoredReferrer(currentReferrer);
    return currentReferrer;
  }

  return cachedReferrer;
}

function isValidReferrer(referrer: string) {
  return !referrer.includes('localhost') && !referrer.includes('telnyx.com');
}

function getQueryReferrer() {
  // If no query string - return early
  const { search } = window.location;
  if (!search.includes('?')) {
    return null;
  }

  const params = new URLSearchParams(search);
  return params.get('referrer');
}

function getStoredReferrer() {
  try {
    const referrer = window.localStorage.getItem('referrer');
    return referrer || undefined;
  } catch (err) {
    return undefined;
  }
}
function setStoredReferrer(referrer: string) {
  try {
    window.localStorage.setItem('referrer', referrer);
  } catch (err) {
    /** ignore */
  }
}
