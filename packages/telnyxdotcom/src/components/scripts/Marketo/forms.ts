import constants from 'constants/env';
import { createMarketoForm } from './lifecycleMethods';

// Marketo Forms
const forms = {
  signUp: {
    formId: constants.Marketo.forms.signup.formId,
    munchkinId: constants.Marketo.forms.signup.munchkinId,
  },
};

/**
 * @typedef {Object} SignUpForm
 * @property {string} FirstName - First name of user
 * @property {string} LastName - Last name of user
 * @property {string} Email - Email of user
 * @property {null} mcUserId__c - null (left null on purpose)
 * @property {string} formSignupType__c -
 * @property {boolean} Subscription_Opt_In__c - Whether the user opted into email notifications
 */

export const submitSignUpMarketoForm = createMarketoForm({
  munchkinId: forms.signUp.munchkinId,
  formId: forms.signUp.formId,
});
