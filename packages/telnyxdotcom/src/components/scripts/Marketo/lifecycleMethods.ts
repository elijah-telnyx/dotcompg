import constants from 'constants/env';
import Bugsnag from 'lib/Bugsnag';
import MarketoScript from './Marketo';
import { RESPONSES } from './constants';
import type { MarketoNativeForm } from 'ui/components/MarketoForm';

declare global {
  interface Window {
    MktoForms2: {
      loadForm: (base: string, munchkinId: string, formId: number, cb?: (form: MarketoNativeForm) => void) => void;
      whenReady: (readyFn: (form: MarketoNativeForm) => void) => void;
    };
    mkto_signup_data: object | undefined;
  }
}

// Constants
const defaultMunchkinId = constants.Marketo.defaultMunchkinId;
const defaultMarketoDomain = 'https://app-ab20.marketo.com';
const fn = () => {
  // do nothing.
};

export interface MarketoConfig {
  munchkinId: string;
  formId: number;
}

export interface MarketoConfigResponse {
  success: boolean;
  error?: string;
  form?: MarketoNativeForm;
}

export function createMarketoForm(formConfig: MarketoConfig) {
  return async (formData: object, onSuccess = fn) => {
    // Load Marketo script
    const scriptResult = await MarketoScript.initialize();
    if (!scriptResult.success) {
      Bugsnag.notify(scriptResult.error as string);
      return scriptResult;
    }

    // Load Marketo form
    const formResult = await loadMarketoForm(formConfig);
    if (!formResult.success || !formResult.form) {
      Bugsnag.notify(formResult.error as string);
      return formResult;
    }

    // Setup callback and submit form
    const { form } = formResult;

    form.onSuccess(() => {
      onSuccess();
      MarketoScript.remove();
      return false; // Prevent form submit from refreshing page
    });
    form.vals(formData);
    form.submit();

    return RESPONSES.OK;
  };
}

function loadMarketoForm({ munchkinId = defaultMunchkinId, formId }: MarketoConfig): Promise<MarketoConfigResponse> {
  return new Promise((resolve) => {
    const MktoForms2 = window.MktoForms2;
    if (!MktoForms2) {
      return resolve(RESPONSES.ERR_NOT_LOADED);
    }

    // Load form and resolve when ready
    MktoForms2.loadForm(defaultMarketoDomain, munchkinId, formId, (form) => {
      if (!form) {
        return resolve(RESPONSES.ERR_FORM);
      }
      resolve(RESPONSES.OK_LOADED(form));
    });
  });
}
