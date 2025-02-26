/**
 * Higher-order provider component that handles loading the Google Auth client library
 */

import { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import { GlobalContext } from 'pages/_app';
import { errorLogger } from 'utils/errorHandler/errorLogger';
import { authenticateTelnyxWithGoogle, type AuthResponse } from 'services/telnyxApiService';
import { loadGapiClient } from './lifecycleMethods';
import SegmentService, { SEGMENT_TRACK_EVENT_NAMES } from 'services/Segment';

const DEFAULT_ERROR_MESSAGE =
  'There was an issue with signing in with Google. Please try again with another identity partner.';

// From https://developers.google.com/identity/sign-in/web/reference#googleauthsigninoptions
const GOOGLE_ERROR_MESSAGES = {
  // The user closed the popup before finishing the sign in flow:
  popup_closed_by_user: '',
  // The user denied the permission to the scopes required:
  access_denied: 'You must give permission to sign in with Google.',
  // No user could be automatically selected without prompting the consent flow:
  immediate_failed: DEFAULT_ERROR_MESSAGE,
};
interface GoogleAuthError {
  error: keyof typeof GOOGLE_ERROR_MESSAGES;
}

const authenticateWithGoogle = async () => {
  try {
    const googleAuth = window.gapi.auth2.getAuthInstance();
    const googleUser = {
      FirstName: '',
      LastName: '',
      Email: '',
    };
    const authPromise = new Promise((resolve) => {
      googleAuth.currentUser.listen((currentUser) => {
        try {
          const basicProfile = currentUser.getBasicProfile();
          googleUser.FirstName = basicProfile.getGivenName();
          googleUser.LastName = basicProfile.getFamilyName();
          googleUser.Email = basicProfile.getEmail();
          resolve(Boolean(googleUser.Email));
        } catch (err) {
          errorLogger({
            error: new Error(`Failed to get basic profile from Google: ${currentUser}`),
          });
          resolve(false);
        }
      });
    });

    // Prompt user for Google Account (opens new tab)
    let googleCode;
    try {
      const googleResponse = await googleAuth.grantOfflineAccess({
        redirect_uri: 'postmessage',
        prompt: 'select_account',
      });
      if (!googleResponse.code) {
        throw googleResponse;
      }
      googleCode = googleResponse.code;
    } catch (googleError) {
      const message = GOOGLE_ERROR_MESSAGES[(googleError as GoogleAuthError).error];
      return { success: false, message };
    }

    // Fallback attempt to grab the user's basic profile
    const fallback = new Promise((res) =>
      setTimeout(() => {
        try {
          const currentUser = googleAuth.currentUser.get();
          const basicProfile = currentUser.getBasicProfile();
          googleUser.FirstName = basicProfile.getGivenName();
          googleUser.LastName = basicProfile.getFamilyName();
          googleUser.Email = basicProfile.getEmail();
          res(Boolean(googleUser.Email));
        } catch (err) {
          errorLogger({
            error: new Error(`Unable to get Google OAuth currentUser`),
          });
          res(false);
        }
      }, 3000)
    );
    const foundCurrentUser = await Promise.race([authPromise, fallback]);

    if (!foundCurrentUser) {
      return {
        success: false,
        message: 'Failed to authenticate with Google. Please try again.',
      };
    }

    return { success: true, code: googleCode, googleUser };
  } catch (err) {
    errorLogger({
      error: new Error(JSON.stringify(err)),
    });
    return { success: false, message: DEFAULT_ERROR_MESSAGE };
  }
};

const useGoogleAuth = ({
  promo_code,
  sift_session_id,
  hasLoadedScript,
}: {
  promo_code?: string;
  sift_session_id?: string;
  hasLoadedScript: boolean;
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { campaign, referrer } = useContext(GlobalContext);

  // Load the Google API Client
  useEffect(() => {
    if (hasLoadedScript) {
      loadGapiClient(
        () => {
          /* do nothing. */
        },
        (err) => {
          const loadError = new Error(`Error loading Google API Client: ${err}`);
          errorLogger({ error: loadError });
          setError(loadError.message);
        }
      );
    }
  }, [hasLoadedScript]);

  const prompt: () => Promise<AuthResponse | { success: false }> = async () => {
    setError('');
    setSubmitting(true);

    const googleResponse = await authenticateWithGoogle();
    if (!googleResponse || !googleResponse.success) {
      errorLogger({
        error: new Error(`Failed to authenticate with Google: ${JSON.stringify(googleResponse)}`),
      });
      setError(googleResponse?.message || 'Failed to authenticate with Google. Please try again.');
      setSubmitting(false);
      return { success: false };
    }

    if (!SegmentService.anonymousId) {
      errorLogger({
        error: new Error('Failed to get ajs_anonymous_id at user registration (google Oauth)'),
        severity: 'warning',
      });
    }

    const telnyxResponse = await authenticateTelnyxWithGoogle({
      code: googleResponse.code as string,
      ga_client_id: Cookies.get('_ga'),
      promo_code,
      campaign_content: campaign.content,
      campaign_medium: campaign.medium,
      campaign_name: campaign.name,
      campaign_source: campaign.source,
      referrer,
      sift_session_id,
      anonymous_id: SegmentService.anonymousId,
    });

    if (!telnyxResponse || !telnyxResponse.success) {
      errorLogger({
        error: new Error(`Failed to authenticate with Telnyx: ${JSON.stringify(telnyxResponse)}`),
      });

      setError(telnyxResponse?.message || 'Failed to authenticate with Telnyx. Please try again.');
      setSubmitting(false);
      return { success: false };
    }

    if (telnyxResponse.credentials) {
      SegmentService.userId = telnyxResponse.credentials.user_id;
    }

    SegmentService.track(SEGMENT_TRACK_EVENT_NAMES.SIGN_UP_SUCCESS, {
      body: { ...telnyxResponse, ...googleResponse },
      form_type: 'Google',
    });

    setSubmitting(false);
    return {
      ...telnyxResponse,
      credentials: {
        ...telnyxResponse.credentials,
        ...googleResponse.googleUser,
      },
    };
  };

  return {
    error,
    submitting,
    prompt,
  };
};

export default useGoogleAuth;
