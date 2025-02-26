import { getContactUsPage, getContactUsChallengerPage } from 'lib/Contentful';
import MarketoFormSection from 'ui/components/FormSection/MarketoFormSection';
import Resources from 'ui/components/Resources';
import TextCards from 'ui/components/TextCards';
import ErrorBoundary from 'components/ErrorBoundary';
import SegmentService, { SEGMENT_TRACK_EVENT_NAMES } from 'services/Segment';
import { getMarketoRedirectByDomain, type RedirectObj } from 'services/domoApiService';
import type { MarketoNativeForm } from 'ui/components/MarketoForm';
import { generateURLWithSearchParams } from 'ui/utils/route/generateURLWithSearchParams';
import { EMEA_ext_with_overrides } from 'utils/phone/EMEA';
import { APAC_ext_with_overrides } from 'utils/phone/APAC';
import { errorLogger } from 'utils/errorHandler/errorLogger';
import { defaultGetServerSideProps } from 'utils/pageGeneration/defaultGetServerSideProps';
import { FEATURES } from 'utils/growthbook';

type ContactUsPageProps = Awaited<ReturnType<typeof getContactUsPage>> & {
  domainRedirects: RedirectObj[];
  preview: boolean;
};

const sectionsComponents = {
  sectionForm: MarketoFormSection,
  sectionResources: Resources,
  sectionTextCards: TextCards,
};

const ContactUs = ({ sections, domainRedirects, preview }: ContactUsPageProps) => {
  const onSubmit = (form: MarketoNativeForm) => {
    SegmentService.track(
      SEGMENT_TRACK_EVENT_NAMES.FORM_SUBMIT,
      { form_data: form.getValues(), form_type: 'Contact Sales' },
      {
        integrations: {
          All: true,
          'Marketo V2': false,
        },
      }
    );
  };

  const onSuccessRedirectsTo = (form: MarketoNativeForm, formId: number) => {
    const values = form.getValues();
    const email = values[fields.Email.id];

    /**
     * Early returns
     * These shouldn't open a new tab and the redirect should be kept over the same page
     *  */
    const params = { formId, email };
    const reasonField = fields.Reason_for_Contact__c;

    if (values[reasonField.id] === reasonField.options.support) {
      return redirectTo('/thank-you-support', params);
    }

    // redirect all gmail traffic regardless of budget to thank-you page
    if (email.includes('@gmail')) {
      return redirectTo('/thank-you', params);
    }

    /**
     * Below here the submit will have 2 behaviors
     * 1. Open a new tab for scheduling a meeting
     * 2. Redirect within the same page context
     */

    // Constants
    const APAC_URL = 'https://meetings.salesloft.com/telnyx/domenichanuman';
    const EMEA_URL = 'https://calendly.com/telnyx-quinn/emea';
    const AMER_URL = 'https://calendly.com/telnyx-quinn/amer';

    const domain = email.split('@')[1];
    const domainRedirect = domainRedirects.find((i) => i.domain === domain);
    const phoneExt = Number(values[fields.Phone_Number_Extension__c.id].split('+')[1]);

    /**
     * 1. Schedule a meeting checks
     * If email matches redirect list from domo open specific scheduler link
     * Else if budget is over 5k open region based scheduler link
     */
    const budgetField = fields.Form_Budget__c;

    if (domainRedirect) {
      openInNewTab(domainRedirect.url);
    } else if (values[budgetField.id] === budgetField.options.over5000) {
      if (APAC_ext_with_overrides.includes(phoneExt)) {
        openInNewTab(APAC_URL);
      } else if (EMEA_ext_with_overrides.includes(phoneExt)) {
        openInNewTab(EMEA_URL);
      } else {
        openInNewTab(AMER_URL);
      }
    }

    /**
     * 2. Same page redirect checks
     */
    const productInterestField = fields.Form_Product__c;
    if (values[productInterestField.id] === productInterestField.options.wireless) {
      return redirectTo('/thank-you-sim-order', params);
    } else {
      return redirectTo('/thank-you', params);
    }
  };

  return (
    <>
      {sections?.map(({ contentType, ...section }) => {
        const sectionType = contentType as keyof typeof sectionsComponents;

        if (sectionType === 'sectionForm') {
          const { form, ...sectionProps } = section;

          return (
            <ErrorBoundary key={section?.id} preview={preview}>
              <MarketoFormSection {...sectionProps} form={{ ...form, onSubmit, onSuccessRedirectsTo }} />
            </ErrorBoundary>
          );
        }

        const PageSection = sectionsComponents[sectionType];
        if (!PageSection) return null;

        return (
          <ErrorBoundary key={section?.id} preview={preview}>
            <PageSection {...section} />
          </ErrorBoundary>
        );
      })}
    </>
  );
};

export const getServerSideProps = defaultGetServerSideProps<ContactUsPageProps>({
  page: '/contact-us',
  getData: async ({ preview }, trackingData) => {
    let page, domainRedirects: RedirectObj[];
    let loadChallenger = false;
    try {
      loadChallenger = !!trackingData.find(
        ({ result }) => result.featureId === FEATURES['contact-us-dotcom-3553'] && result.value
      );

      if (loadChallenger) {
        page = await getContactUsChallengerPage({ preview });
      } else {
        page = await getContactUsPage({ preview });
      }
    } catch (e) {
      errorLogger({ error: new Error(`Error loading contact us page: ${e}`) });
    }
    try {
      domainRedirects = await getMarketoRedirectByDomain();
    } catch (e) {
      errorLogger({ error: new Error('Error loading marketo redirect data'), data: JSON.stringify(e, undefined, 2) });
      domainRedirects = [];
    }
    return { ...page, domainRedirects };
  },
});

export default ContactUs;

// Utils
const redirectTo = (url: string, params: Record<string, unknown>) => {
  window.location.assign(
    generateURLWithSearchParams({
      url,
      params,
    })
  );
};

const openInNewTab = (url: string) => {
  window.open(url, '_blank');
};

/**
 * @property {id} -- html field id attribute
 * @property {options} -- available if field is of a select type
 */
const fields = {
  Reason_for_Contact__c: { id: 'Reason_for_Contact__c', options: { sales: 'Sales-Inquiry', support: 'Support' } },
  FirstName: { id: 'FirstName' },
  LastName: { id: 'LastName' },
  Email: { id: 'Email' },
  Phone_Number_Extension__c: { id: 'Phone_Number_Extension__c' }, // list of countries dial code as options
  Phone_Number_Base__c: { id: 'Phone_Number_Base__c' },
  Website: { id: 'Website' },
  How_did_you_hear_about_Telnyx_Open__c: { id: 'How_did_you_hear_about_Telnyx_Open__c' },
  Form_Additional_Information__c: { id: 'Form_Additional_Information__c' },
  // these only appears when reason for contact is Sales-Inquiry
  Form_Product__c: {
    id: 'Form_Product__c',
    options: {
      ai: 'AI / Inference',
      voice: 'Voice',
      messaging: 'Messaging',
      wireless: 'IoT SIM / eSIM',
      numbers: 'Numbers',
      networking: 'Networking',
      fax: 'Fax / Fax API',
      storage: 'Storage',
      verification: 'Identity / Verify / 2FA',
      video: 'Video',
      other: 'Other',
    },
  },
  Form_Budget__c: {
    id: 'Form_Budget__c',
    options: {
      lessThan500: 'Less than $500',
      from500To1000: '$500 - $1000',
      from1000To5000: '$1000 - $5000',
      over5000: '$5000+',
    },
  },
} as const;
