import { useContext, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import type { MetaTagsProps } from 'components/MetaTags';
import type {
  SignUpAPIMessage,
  SignUpEmailMessage,
  SignUpRecaptchaValues,
  SignUpFormInitialValues,
  SignUpFormValues,
} from 'ui/components/SignUpForm';
import type { RecaptchaVerifiedProps } from 'components/RecaptchaV3';

import { getSignUpPage } from 'lib/Static';
import { getLegalPagesVersion } from 'lib/Contentful';
import { defaultGetStaticProps } from 'utils/pageGeneration/defaultGetStaticProps';

import FormSection from 'ui/components/FormSection';
import * as css from 'ui/components/FormSection/FormSection.styled';
import SignUpForm from 'ui/components/SignUpForm';
import SocialForm from 'components/SocialForm';
import { validateEmail } from 'services/publicApiService';
import { register } from 'services/telnyxApiService';
import { routes } from 'utils/routes';
import { redirectToPortalSignIn, type PortalLoginUrlParameters } from 'utils/redirects';
import { GlobalContext } from 'pages/_app';
import { errorLogger } from 'utils/errorHandler/errorLogger';
import SegmentService, { SEGMENT_TRACK_EVENT_NAMES } from 'services/Segment';
import { submitSignUpMarketoForm } from 'components/scripts/Marketo';
import segment from 'lib/Segment';
import sift from 'lib/Sift';
import Paragraph from 'ui/components/Typography/Paragraph';
import Link from 'ui/components/Link';
import featureFlippers from 'constants/featureFlippers';

const RecaptchaV3 = dynamic(() => import('components/RecaptchaV3'), {
  ssr: false,
});

type SignUpPageProps = Awaited<ReturnType<typeof getSignUpPage>> & { preview: boolean };

const INITIAL_VALUES = {
  promo_code: '',
  email: '',
  first_name: '',
  last_name: '',
  password: '',
  terms_and_conditions: false,
  subscription_opt_in: false,
  organization_invitation_email: '',
  organization_invitation_id: '',
  organization_invitation_confirmation_token: '',
  campaign: {},
  referrer: '',
  sift_session_id: '',
};

const RECAPTCHA_VERSION = '3';

const FREEMAIL_MESSAGE: SignUpEmailMessage = {
  text: 'It looks like you’re using a free email address! Telnyx requires all users with free email addresses to verify their identities with a government-issued ID and facial recognition prior to using this service. You can bypass the need for identity verification by using a company email address.',
  type: 'info',
  multiline: true,
};

const TERMS_AND_CONDITIONS_URL_TAG = 'terms-and-conditions-of-service';
const PRIVACY_POLICY_URL_TAG = 'privacy-policy';

const SignUp = ({
  heading,
  headingTag,
  copy,
  signInLink,
  media,
  footerCopy,
  termsAndConditionsUrl,
  privacyPolicyUrl,
  ...props
}: SignUpPageProps) => {
  const { query, isReady } = useRouter();
  const [submittingSignUpForm, setSubmittingSignUpForm] = useState<boolean>(false);
  const [apiMessage, setApiMessage] = useState<SignUpAPIMessage | undefined>();
  const [emailMessage, setEmailMessage] = useState<SignUpEmailMessage | undefined>();
  const [recaptchaValues, setRecaptchaValues] = useState<SignUpRecaptchaValues>();
  const globalContext = useContext(GlobalContext);

  const [initialState, setInitialState] = useState<SignUpFormInitialValues>(INITIAL_VALUES);

  useEffect(() => {
    if (isReady) {
      const queryValues: Pick<
        SignUpFormInitialValues,
        | 'promo_code'
        | 'organization_invitation_email'
        | 'organization_invitation_id'
        | 'organization_invitation_confirmation_token'
        | 'email'
      > = {
        promo_code: query.promo_code as string,
        organization_invitation_email: query.organization_invitation_email as string,
        organization_invitation_id: query.organization_invitation_id as string,
        organization_invitation_confirmation_token: query.organization_invitation_confirmation_token as string,
        email: (query.organization_invitation_email || query.email) as string,
      };

      setInitialState((prevState) => ({
        ...prevState,
        ...queryValues,
        campaign: globalContext.campaign,
        referrer: globalContext.referrer,
        sift_session_id: sift.siftSessionId,
      }));
    }
  }, [
    isReady,
    query.organization_invitation_confirmation_token,
    query.organization_invitation_email,
    query.organization_invitation_id,
    query.promo_code,
    query.email,
    globalContext.campaign,
    globalContext.referrer,
  ]);

  const redirectUserOnRegistrationSuccess = async (payload: PortalLoginUrlParameters) => {
    // user, token, portal_redirect_token
    return redirectToPortalSignIn(payload);
  };

  const triggerEmailValidation = async (email: string) => {
    try {
      const validatedEmailResponse = await validateEmail(email);

      if (validatedEmailResponse.data?.isFreemail) {
        setEmailMessage(FREEMAIL_MESSAGE);
      }

      if (validatedEmailResponse.error) {
        setEmailMessage({
          text: validatedEmailResponse.error,
          type: 'error',
        });
      }

      return validatedEmailResponse;
    } catch (error: any) {
      errorLogger({ error });
    }
  };

  const handleEmailBlur = async (email: string) => {
    setEmailMessage(undefined);

    await triggerEmailValidation(email);
  };

  const handleSubmit = async (values: SignUpFormValues) => {
    // DOTCOM-3170 -- clearing API errors is necessary to make sure the user doesn't see the same error message twice and any effects get called
    setApiMessage(undefined);
    setSubmittingSignUpForm(true);

    const validatedEmail = await triggerEmailValidation(values.email);

    // Save the email in Global context to use on VerifyEamilTemplate
    // It will garantee that /verify-email page is only accessed by sign flow
    globalContext.setSignupEmail(values.email);

    let legalParams = {};
    // Add Segment 'ajs_anonymous_id' cookie value
    let ajs_anonymous_id = SegmentService.anonymousId;
    if (!ajs_anonymous_id) {
      errorLogger({
        url: '/sign-up',
        error: new Error('Failed to get ajs_anonymous_id at user registration'),
        data: values,
        severity: 'warning',
      });
      // Add prefix to know it's refreshed
      ajs_anonymous_id = `NEW-${segment.anonymousId}`;
    }

    if (featureFlippers.DOTCOM_2398_VERSIONED_TERMS_AND_CONDITIONS) {
      legalParams = {
        terms_and_conditions_url: termsAndConditionsUrl,
        privacy_policy_url: privacyPolicyUrl,
      };
    }

    await register({
      ...initialState,
      ...values,
      ...(recaptchaValues as SignUpRecaptchaValues), // must be provided, if not, there's an error
      ...legalParams,
      anonymous_id: ajs_anonymous_id,
    })
      .then((response) => {
        if (response.success) {
          SegmentService.track(SEGMENT_TRACK_EVENT_NAMES.SIGN_UP_SUCCESS, {
            body: {
              ...response,
              first_name: values.first_name,
              last_name: values.last_name,
              email: values.email,
            },
            form_type: 'Email Password',
          });

          //Org invitation flow should redirect the user to portal.telnyx.com
          if (
            response.sign_in_user &&
            response.credentials?.api_user &&
            response.credentials?.api_token &&
            response.portal_redirect_token
          ) {
            // Navigating away - last chance to send data to Marketo
            submitSignUpMarketoForm({
              FirstName: values.first_name,
              LastName: values.last_name,
              Email: values.email,
              mcUserId__c: null,
              Subscription_Opt_In__c: values.subscription_opt_in,
            });

            const payload: PortalLoginUrlParameters = {
              provider: '',
              user: response.credentials.api_user,
              token: response.credentials.api_token,
              portal_redirect_token: response.portal_redirect_token,
              created: 'true',
            };

            return redirectUserOnRegistrationSuccess(payload);
          }

          // Delay the call to Marketo to prevent duplicates
          setTimeout(() => {
            submitSignUpMarketoForm({
              FirstName: values.first_name,
              LastName: values.last_name,
              Email: values.email,
              mcUserId__c: null,
              Subscription_Opt_In__c: values.subscription_opt_in,
            });
          }, 5000);

          if (validatedEmail?.data) {
            const emailType = validatedEmail.data.isFreemail ? 'freemail' : 'business';

            const verifyEmailRoute = routes.signUp.verifyEmail[emailType];
            if (verifyEmailRoute) {
              window.location.assign(verifyEmailRoute);
              return;
            }
          }

          window.location.assign(routes.signUp.verifyEmail.default);
          return;
        }

        if (!response.success) {
          throw new Error(response.message);
        }
      })
      .catch((error) => {
        errorLogger({ error });
        setApiMessage({
          message: error.message || 'Unexpected Error',
          success: false,
          reasons: error.reasons || {},
        });
      })
      .finally(() => {
        setSubmittingSignUpForm(false);
      });
  };

  const onRecaptchaVerified = ({ token }: RecaptchaVerifiedProps) => {
    if (token) {
      setRecaptchaValues((prevState) => ({
        ...prevState,
        g_recaptcha_response: token,
        g_recaptcha_version: RECAPTCHA_VERSION,
      }));
    }
  };

  return (
    <FormSection footerCopy={footerCopy} media={media} loading={submittingSignUpForm} {...props}>
      {heading && (
        <css.Heading level={3} htmlAs={headingTag}>
          {heading}
        </css.Heading>
      )}
      {copy && <Paragraph>{copy}</Paragraph>}
      <SignUpForm
        initialValues={initialState}
        apiMessage={apiMessage}
        emailMessage={emailMessage}
        onEmailBlur={handleEmailBlur}
        onSubmit={handleSubmit}
        loading={submittingSignUpForm}
        termsAndConditionsUrl={termsAndConditionsUrl}
        privacyPolicyUrl={privacyPolicyUrl}
      />
      {!initialState.organization_invitation_id && (
        <SocialForm promo_code={initialState.promo_code} sift_session_id={initialState.sift_session_id} />
      )}
      <css.LogInWrapper>
        <Paragraph>
          Already have an account? <Link href={signInLink}>Log in</Link>.
        </Paragraph>
      </css.LogInWrapper>
      <RecaptchaV3
        action='login'
        onRecaptchaVerified={onRecaptchaVerified}
        submitFailed={apiMessage && !apiMessage?.success}
      />
    </FormSection>
  );
};

export const getStaticProps = defaultGetStaticProps<SignUpPageProps>({
  page: 'sign-up',
  getData: ({ preview }) => {
    if (featureFlippers.DOTCOM_2398_VERSIONED_TERMS_AND_CONDITIONS) {
      return Promise.all([
        getSignUpPage(),
        getLegalPagesVersion({ pages: [TERMS_AND_CONDITIONS_URL_TAG, PRIVACY_POLICY_URL_TAG] }, { preview }),
      ]).then(([pageProps, legalProps]) => ({
        ...pageProps,
        // if there's no legal pages version data this should break and prevent page static build and that's expected.
        // We cannot present legal pages other than the versioned ones
        termsAndConditionsUrl: legalProps[TERMS_AND_CONDITIONS_URL_TAG].url,
        privacyPolicyUrl: legalProps[PRIVACY_POLICY_URL_TAG].url,
        seo: {
          title: 'Sign up | Get started with Telnyx',
          description: `Discover the power of Telnyx. Sign up now and start building communication apps that can transform the way we connect.`,
        } as MetaTagsProps,
      }));
    }

    return {
      ...getSignUpPage(),
      seo: {
        title: 'Sign up | Get started with Telnyx',
        description: `Discover the power of Telnyx. Sign up now and start building communication apps that can transform the way we connect.`,
      } as MetaTagsProps,
    };
  },
});

export default SignUp;
