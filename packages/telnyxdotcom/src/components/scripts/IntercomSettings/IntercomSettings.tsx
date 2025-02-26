import Script from 'next/script';

const INTERCOM_SETTINGS_URL = '/assets/intercomSettings.js';

/**
 * https://developers.intercom.com/installing-intercom/web/installation/
 * https://developers.intercom.com/installing-intercom/web/attributes-objects/
 */
export const IntercomSettings = () => {
  return (
    <Script
      id='intercom-settings-script'
      src={INTERCOM_SETTINGS_URL}
      strategy='afterInteractive'
      data-hide_default_launcher={true}
    />
  );
};

export default IntercomSettings;
