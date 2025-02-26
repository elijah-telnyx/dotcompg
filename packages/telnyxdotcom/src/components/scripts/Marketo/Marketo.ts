import { RESPONSES } from './constants';

// Constants
const marketoScript = 'https://app-ab20.marketo.com/js/forms2/js/forms2.min.js';
const marketoScriptId = 'telnyx-marketo';

export interface MarketoInitializeResponse {
  success: boolean;
  error?: string;
}

// Script handler
const MarketoScript = {
  initialize(): Promise<MarketoInitializeResponse> {
    // Cannot initialize on the server
    if (typeof window === 'undefined') {
      return new Promise((res) => res(RESPONSES.ERR_SSR));
    }

    // If Marketo is already loaded, return early
    if (window.MktoForms2) {
      return new Promise((res) => res(RESPONSES.OK));
    }

    // Create script and append to head
    const script = document.createElement('script');
    script.id = marketoScriptId;
    script.src = marketoScript;
    document.head.appendChild(script);

    // Return when the script loads/fails
    return new Promise((res) => {
      script.onload = () => res(RESPONSES.OK);
      script.onerror = () => res(RESPONSES.ERR_FAILED);
    });
  },
  get() {
    return document.getElementById(marketoScriptId);
  },
  remove() {
    const script = this.get();
    if (script) {
      document.head.removeChild(script);
    }
  },
};

export default MarketoScript;
