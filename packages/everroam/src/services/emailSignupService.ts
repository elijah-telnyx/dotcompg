import api from "lib/Api";

export interface FormProps {
  reference_id: string;
  email: string;
}

/**
 * POST submit form to next api
 */
export const submitEmailSignup = async (email: string) => {
  return api
    .post<any>(`/api/email-signup`, { email })
    .then((response) => ({ status: "200", data: response }))
    .catch((error) => error);
};

const service = {
  submitEmailSignup,
};

export default service;
