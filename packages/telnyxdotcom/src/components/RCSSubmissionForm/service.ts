import api from 'lib/Api/Api';
import type { ZapierResponse } from 'services/subpoenaService';

export const RCSSubmissionFormService = {
  submitForm: async (formData: FormData) => {
    return api
      .post<ZapierResponse>('/api/rcs-submission-form', formData)
      .then((res) => {
        return { message: 'Form submitted', ...res };
      })
      .catch((e) => {
        console.error(e);
        return { message: 'Failed to submit request', ...e };
      });
  },
  sendToZapier: async (formData: FormData) => {
    return api.post<ZapierResponse>('https://hooks.zapier.com/hooks/catch/11133073/2i2me1m/', formData);
  },
};
