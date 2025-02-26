import type { HeadingProps } from '../Typography/Heading';
import Script from 'next/script';
import { useEffect, useState, useRef } from 'react';
import {
  MARKETO_ERRORS,
  MARKETO_MUNCHKIN_ID,
  MARKETO_SCRIPT_BASE,
  MARKETO_SCRIPT_ID,
  MARKETO_SCRIPT_PATH,
  MARKETO_EMAIL_ID,
  MARKETO_EMAIL_REGEX,
  MARKETO_DEFAULT_REDIRECT_ON_SUCCESS,
} from './constants';
import Spinner from '../Spinner';
import {
  updateValueBasedOnUrl,
  type MarketoNativeForm,
  validate,
  fillHiddenFields,
} from './utils';
import Markdown from '../Markdown';
import FieldMessage from '../Input/FieldMessage';
import type { HeadingTag } from '../Typography/Heading';
import { generateURLWithSearchParams } from '../../utils/route/generateURLWithSearchParams';
import * as css from './MarketoForm.styled';
import Paragraph from '../Typography/Paragraph';

declare global {
  const MktoForms2: {
    loadForm: (
      base: string,
      munchkinId: string,
      formId: number,
      cb?: (form: MarketoNativeForm) => void
    ) => void;
    whenReady: (readyFn: (form: MarketoNativeForm) => void) => void;
  };
}

type MarketoOnReady = () => void;

export interface MarketoFormProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSubmit' | 'onLoad'> {
  formId: number;
  heading?: string;
  copy?: string;
  semanticHeading?: boolean;
  headingTag?: HeadingTag;
  isDark?: boolean;
  singleFieldLayout?: boolean;
  smallFieldLayout?: boolean;
  successMessage?: string;
  onSubmit?: (form: MarketoNativeForm) => void;
  onSuccessRedirectsTo?:
    | string
    | ((form: MarketoNativeForm, formid: number) => void);
  /**
   * not controlled by the CMS,
   * this is used on component basis to set heading style
   */
  headingLevel?: HeadingProps['level'];
  align?: 'left' | 'center';
  useMarketoRedirect?: boolean;
  onLoad?: (form: MarketoNativeForm) => void;
  checkDomain?: boolean;
}

const MarketoForm = ({
  formId,
  onSubmit,
  heading,
  semanticHeading = false,
  successMessage,
  onSuccessRedirectsTo = MARKETO_DEFAULT_REDIRECT_ON_SUCCESS,
  headingLevel = 3,
  headingTag = 'h2',
  isDark,
  singleFieldLayout,
  smallFieldLayout,
  copy,
  useMarketoRedirect,
  onLoad,
  checkDomain = false,
  ...props
}: MarketoFormProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [showSuccessMessage, setShowSuccessMessage] = useState('');

  const onError = () => {
    const message = 'Could not load Marketo form from script.';
    console.error(message);
    setError(MARKETO_ERRORS.FAIL_TO_LOAD);
    setLoading(false);
  };

  const loadForm: MarketoOnReady = () => {
    setLoading(true);
    if (!MktoForms2) {
      onError();
      return false;
    }

    MktoForms2.loadForm(MARKETO_SCRIPT_BASE, MARKETO_MUNCHKIN_ID, formId);

    MktoForms2.whenReady((form: MarketoNativeForm) => {
      if (onLoad) {
        onLoad(form);
      }
      setError('');
      const emailElement = form.getFormElem().find(`#${MARKETO_EMAIL_ID}`);
      const emailInput = emailElement[0];
      // add native attrs to email field
      if (emailInput) {
        emailInput.setAttribute('pattern', MARKETO_EMAIL_REGEX.source);
        emailInput.setAttribute('required', 'true');
      }

      if (window?.location.search) {
        updateValueBasedOnUrl(form);
      }

      form.onValidate((nativeValid: boolean) => {
        if (!nativeValid) return false;
        const formValidate = validate(form);
        const isValidForm = [
          formValidate.email({ checkDomain }),
          formValidate.phoneNumber(),
        ].every(Boolean);

        form.submittable(isValidForm);
      });

      form.onSubmit(() => {
        fillHiddenFields(form);

        if (onSubmit) {
          onSubmit(form);
        }
      });

      if (!useMarketoRedirect && successMessage) {
        form.onSuccess(() => {
          setShowSuccessMessage(successMessage);
          return false;
        });
      } else if (
        !useMarketoRedirect &&
        typeof onSuccessRedirectsTo === 'string'
      ) {
        form.onSuccess(() => {
          const { Email = '' } = form.getValues();
          const redirectURL = generateURLWithSearchParams({
            url: onSuccessRedirectsTo,
            params: { formId, email: Email },
          });

          window.location.assign(redirectURL);
          return false;
        });
      } else if (
        !useMarketoRedirect &&
        typeof onSuccessRedirectsTo === 'function'
      ) {
        form.onSuccess(() => {
          onSuccessRedirectsTo(form, formId);
          return false;
        });
      }

      setLoading(false);
    });
  };

  const preventDefaultSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const formElementId = `mktoForm_${formId}`;

  css.globalStyles();

  // Intersection observer to load form when in view
  const TOPOFFSET = '100px';
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if already above fold on mount
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      if (rect.top < 700) {
        setIsVisible(true);
        return;
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Once visible, keep it visible
        }
      },
      {
        root: null,
        rootMargin: TOPOFFSET, // Trigger 100px before element comes into view
        threshold: 0,
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <css.FormWrapper {...props} ref={elementRef}>
      {isVisible && (
        <Script
          src={`${MARKETO_SCRIPT_BASE}/${MARKETO_SCRIPT_PATH}`}
          id={MARKETO_SCRIPT_ID}
          onReady={loadForm}
          onError={onError}
        />
      )}

      {heading && (
        <css.Heading
          level={headingLevel}
          htmlAs={semanticHeading ? headingTag : 'p'}
        >
          {heading}
        </css.Heading>
      )}

      {copy && <Markdown blog>{copy}</Markdown>}

      {loading && (
        <css.Label htmlFor={formElementId}>
          <Spinner size='big' background='dark' />
        </css.Label>
      )}

      {error && (
        <FieldMessage type='error' multiline>
          {error}
        </FieldMessage>
      )}

      {showSuccessMessage ? (
        <Paragraph dark={isDark}>{showSuccessMessage}</Paragraph>
      ) : (
        <css.Form
          isDark={isDark}
          singleFieldLayout={singleFieldLayout}
          smallFieldLayout={smallFieldLayout}
          id={formElementId}
          onSubmit={preventDefaultSubmit}
          hasTopMargin={Boolean(heading || copy)}
        />
      )}
    </css.FormWrapper>
  );
};

export default MarketoForm;
