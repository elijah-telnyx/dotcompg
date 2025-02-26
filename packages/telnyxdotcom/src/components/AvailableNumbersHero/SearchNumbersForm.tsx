import {
  AVAILABLE_NUMBERS_ERROR_CODES,
  type AvailableNumbers,
  type AvailableNumbersError,
} from 'pages/api/available-numbers';
import { config } from 'ui/styles';
import useMedia from 'ui/utils/hooks/useMedia';
import AvailableNumbersAccordion from './components/AvailableNumbersAccordion';
import AvailableNumbersTable from './components/AvailableNumbersTable';

import { useState, type ChangeEvent } from 'react';

import FieldMessage from 'ui/components/Input/FieldMessage';
import * as css from './AvailableNumbersHero.styled';

import { getAvailableNumbers } from 'services/publicApiService';
import Captcha from 'components/Captcha';
import constants from 'constants/env';
import { CTA_COPY, MAX_SEARCH_TIME } from './utils';
import Paragraph from 'ui/components/Typography/Paragraph';
import Input from 'ui/components/Input/Input';
import { type CountryCode, validatePhoneNumberLength, AsYouType } from 'libphonenumber-js';
import { getNumbersFromString } from 'utils/string';
import Button, { type ButtonProps } from 'ui/components/Button';

export interface SearchNumbersFormProps {
  readonly country_code: CountryCode;
  readonly state_code?: string;
}

export default function SearchNumbersForm({ country_code, state_code }: SearchNumbersFormProps) {
  const [numbersData, setNumbersData] = useState<AvailableNumbers | undefined>();
  const [searchNumber, setSearchNumber] = useState('');
  const [searching, setSearching] = useState(false);
  const [hCaptchaToken, setHCaptchaToken] = useState<string>();
  const [searchTimes, setSearchTimes] = useState(0);
  const [formError, setFormError] = useState<{ error: string; code?: string } | undefined>();

  const isDisabled =
    searchTimes >= MAX_SEARCH_TIME || searching || formError?.code === AVAILABLE_NUMBERS_ERROR_CODES.NO_COVERAGE;

  const availableNumbersLookup = async () => {
    let availableNumbers: AvailableNumbers | undefined;

    // DO NOT SUBMIT IF MAX SEARCH TIMES REACHED
    if (isDisabled) return;

    // IF hCAPTCHA TOKEN IS NOT PRESENT, DO NOT SUBMIT
    if (!hCaptchaToken) {
      setFormError({ error: 'Please complete the captcha' });
      return;
    }

    setSearching(true);

    try {
      setFormError(undefined);
      availableNumbers = await getAvailableNumbers({
        state_code,
        country_code,
        token: hCaptchaToken,
        // for partial numbers, when the format is not valid eg.: (123) 4
        // it will return the number without the formatting eg.: 1234
        phone_number: getNumbersFromString(searchNumber),
      });
    } catch (error) {
      setSearching(false);
      setFormError(error as AvailableNumbersError);

      return;
    }

    if (availableNumbers) {
      setSearching(false);
      setNumbersData(availableNumbers);
      setSearchTimes(searchTimes + 1);
      setHCaptchaToken(undefined);
    }
  };

  const formatPhoneNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const inputEvent = e.nativeEvent as InputEvent;

    if (validatePhoneNumberLength(value, country_code) === 'TOO_LONG') return;

    // If the backspace key is pressed, do not format the number
    if (inputEvent.inputType === 'deleteContentBackward') {
      setSearchNumber(value);
      return;
    }

    // Format the number as the user types it
    const currentInputNumber = new AsYouType(country_code).input(value);
    setSearchNumber(`${currentInputNumber}`);
  };

  return (
    <>
      <css.PhoneFieldWrapper>
        <Input
          id='search-number'
          name='search-number'
          label='Phone number'
          helpText='Enter full or partial phone numbers. Leave it empty to view some of our available numbers.'
          placeholder='+1 (123) 456-7899'
          type='tel'
          isDark
          value={searchNumber}
          onChange={formatPhoneNumber}
          disabled={isDisabled}
        />
      </css.PhoneFieldWrapper>

      <SearchNumbersFormCtaButton
        canSearch={searchTimes < MAX_SEARCH_TIME}
        kind='primary'
        background='dark'
        onClick={availableNumbersLookup}
        loading={searching}
        disabled={isDisabled}
        formError={formError}
      >
        {CTA_COPY}
      </SearchNumbersFormCtaButton>

      {formError && (
        <css.WrapperErrorMessage>
          <FieldMessage type='error'>{`${formError?.error || 'Something Went Wrong. Please Try Again.'}`}</FieldMessage>
        </css.WrapperErrorMessage>
      )}

      {!hCaptchaToken && searchTimes < MAX_SEARCH_TIME && (
        <css.WrapperCaptcha>
          <Captcha
            sitekey={constants.hCaptcha.siteKey.telnyxdotcom}
            onVerify={(token) => {
              setHCaptchaToken(token);
              setFormError(undefined);
            }}
            onExpire={() => setHCaptchaToken(undefined)}
            executeOnLoad={false}
            lockPageScrollOnOpen={false}
          />
        </css.WrapperCaptcha>
      )}
      {numbersData?.data.length && (
        <css.DataWrapper>
          <DataPresentation numbersData={numbersData} />
        </css.DataWrapper>
      )}
      {numbersData && !numbersData?.data.length && (
        <css.DataWrapper>
          <FieldMessage type='error'>
            <Paragraph dark>No numbers found</Paragraph>
          </FieldMessage>
        </css.DataWrapper>
      )}
    </>
  );
}

export interface AvailableNumbersDataPresentationProps {
  readonly numbersData: AvailableNumbers;
}

function DataPresentation({ numbersData }: AvailableNumbersDataPresentationProps) {
  const isDesktop = useMedia(config.media.medium);

  if (isDesktop) {
    return <AvailableNumbersTable {...numbersData} />;
  }
  return <AvailableNumbersAccordion {...numbersData} />;
}

const SearchNumbersFormCtaButton = ({
  formError,
  canSearch,
  onClick,
  children,
  disabled,
  ...props
}: ButtonProps & { canSearch: boolean; formError?: AvailableNumbersError }) => {
  if (formError?.code === AVAILABLE_NUMBERS_ERROR_CODES.NO_COVERAGE) {
    return (
      <Button {...props} href='/contact-us' htmlAs='a'>
        Contact Us
      </Button>
    );
  }

  if (canSearch) {
    return (
      <Button {...props} onClick={onClick} disabled={disabled}>
        {children}
      </Button>
    );
  }

  return (
    <Button {...props} href='/sign-up' htmlAs='a'>
      Sign Up
    </Button>
  );
};
