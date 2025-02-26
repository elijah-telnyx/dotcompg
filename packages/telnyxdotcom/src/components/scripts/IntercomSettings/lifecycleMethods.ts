import constants from 'constants/env';
import { getIntercomVerification } from 'services/publicApiService';

export function updateIntercomSettings({ user_id, user_hash }: { user_id: string; user_hash: string }) {
  if (window.Intercom) {
    window.Intercom('update', {
      app_id: constants.Intercom.appId,
      user_id,
      user_hash,
    });
  }
}

export async function generateUserHash(userId: string) {
  try {
    const response = await getIntercomVerification({ user_id: userId });

    return response.user_hash;
  } catch (e) {
    console.error(e);
  }
}
