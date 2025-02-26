import type { MarketoNativeForm } from 'ui/components/MarketoForm';

export const RESPONSES = {
  // generic
  OK: { success: true },
  // MarketoScript
  ERR_SSR: { success: false, error: 'Cannot load Marketo on the server' },
  ERR_FAILED: { success: false, error: 'Failed to load Marketo script' },
  // LoadMarketoForm
  OK_LOADED: (form: MarketoNativeForm) => ({ success: true, form }),
  ERR_NOT_LOADED: { success: false, error: 'Marketo not loaded' },
  ERR_FORM: { success: false, error: 'Failed to load form' },
};
