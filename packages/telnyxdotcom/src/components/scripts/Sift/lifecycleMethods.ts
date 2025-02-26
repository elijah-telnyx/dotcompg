import constants from 'constants/env';
import { errorLogger } from 'utils/errorHandler/errorLogger';
import SegmentService from 'services/Segment';
import sift from 'lib/Sift';
/**
 * https://sift.com/developers/docs/curl/javascript-api/overview
 */
export function initSift() {
  const _sift = (window._sift = window._sift || []);
  _sift.push(['_setAccount', constants.SIFT_JS_KEY]); // needs to be on a constant due to client script
  _sift.push(['_setUserId', SegmentService.userId || '']);
  _sift.push(['_setSessionId', sift.siftSessionId]);
  _sift.push(['_trackPageview']);
  console.log('Sift Script initiated');
}

export function onSiftError(e: unknown) {
  errorLogger({ error: new Error('Sift JS library failed to load'), data: JSON.stringify(e) });
}
