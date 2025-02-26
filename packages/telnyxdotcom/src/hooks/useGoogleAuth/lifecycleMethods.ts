/**
 * Google Auth API handlers
 */
import constants from 'constants/env';

type DefaultCallbackFunction = () => void;
type ErrorCallbackFunction = (error: string) => void;
interface GoogleAuth {
  currentUser: {
    get: () => GoogleAuthUser;
    listen: (cb: (user: GoogleAuthUser) => void) => void;
  };
  grantOfflineAccess: (options: { redirect_uri: string; prompt: string }) => Promise<GoogleAuthResponse>;
}

interface GoogleAuthResponse {
  code: string;
}

interface GoogleAuthUser {
  getBasicProfile: () => GoogleAuthUserProfile;
}

interface GoogleAuthUserProfile {
  getGivenName: () => string;
  getFamilyName: () => string;
  getEmail: () => string;
}

const GOOGLE = constants.GOOGLE;

declare global {
  interface Window {
    gapi: {
      load: (target: string, callback: DefaultCallbackFunction) => void;
      auth2: {
        init: (options: { client_id: string; fetch_basic_profile: boolean }) => Promise<void>;
        getAuthInstance: () => GoogleAuth;
      };
    };
  }
}

/**
 * Load Google OAuth2 client library
 *
 * @param  {function} successCallback - Action creator to dispatch on success
 * @param  {function} errorCallback   - Action creator to dispatch on error
 * @return {void}
 */
export async function loadGapiClient(successCallback: DefaultCallbackFunction, errorCallback: ErrorCallbackFunction) {
  try {
    const timeoutPromise = new Promise((res) => {
      setTimeout(() => {
        res(false);
      }, 5000);
    });
    const loadPromise = new Promise((res) => {
      window.gapi.load('client:auth2', function onClientLoad() {
        window.gapi.auth2.init({
          client_id: GOOGLE.CLIENT_ID,
          fetch_basic_profile: true,
        });

        res(true);
      });
    });
    const success = await Promise.race([loadPromise, timeoutPromise]);
    if (success) {
      successCallback();
    } else {
      throw new Error('timout reached loading client');
    }
  } catch (err) {
    errorCallback(err as string);
  }
}
