import constants from 'constants/env';
import { errorLogger } from 'utils/errorHandler/errorLogger';

const INTERCOM_INSTALL_URL = '/assets/intercomInstall.js';

export function initialize(show?: boolean) {
  // Create script and append to body
  const script = document.createElement('script');
  script.id = 'intercom-script';
  script.src = INTERCOM_INSTALL_URL;
  script.dataset.app_id = constants.Intercom.appId;
  script.dataset.show = show?.toString();
  document.body.appendChild(script);

  script.onerror = (e: unknown) =>
    errorLogger({ error: new Error('Intercom failed to initialize'), data: JSON.stringify(e) });
}
