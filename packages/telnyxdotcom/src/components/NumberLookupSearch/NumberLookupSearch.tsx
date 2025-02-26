import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as css from './NumberLookupSearch.styled';
import { getPhoneNumberLookup } from 'services/publicApiService';
import { isValidPhoneNumber, validatePhoneNumberLength, AsYouType } from 'libphonenumber-js';
import constants from 'constants/env';
import countryNumberData from 'lib/Static/data/countryNumberData';
import Captcha from 'components/Captcha';
import Select from 'ui/components/Select';
import Input from 'ui/components/Input';
import { DEFAULT_COUNTRY_ALPHA2, SECONDARY_COUNTRY_ALPHA2 } from 'utils/countries/constants';

import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import type { NumberLookup } from 'pages/api/number-lookup';

import type { CountryCode } from 'libphonenumber-js';

export interface NumberLookupSearchProps {
  ctaCopy?: string;
  updateData: Dispatch<SetStateAction<NumberLookup | undefined>>;
}

const maxSearchError = 'Max number of searches reached. Please sign up to continue.',
  enterValidNumber = 'Please enter a valid phone number.';

// REMOVE CANADA FROM COUNTRY LIST, THE DIALING CODE IS THE SAME AS US AND CONFLICTING WITH THE SELECT INPUT
const countryData = countryNumberData.filter((country) => country.alpha2 !== SECONDARY_COUNTRY_ALPHA2);

const setLookupCount = (count: number) => {
  localStorage.setItem('lookupCount', count.toString());
};

const NumberLookupSearch = ({ ctaCopy, updateData }: NumberLookupSearchProps) => {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm({
    criteriaMode: 'all',
    mode: 'onSubmit',
    defaultValues: {
      searched_number: '',
      dialing_code: '+1',
    },
  });
  const maxSearchedTimes = 3,
    [searchTimes, updateTimes] = useState(0),
    [searching, updateSearching] = useState(false),
    [searchedNumber, updateSearchNumber] = useState(''),
    [hCaptchaToken, setHCaptchaToken] = useState<string>(),
    [countryCode, updateCountryCode] = useState<CountryCode>(DEFAULT_COUNTRY_ALPHA2);

  useEffect(() => {
    const count = localStorage.getItem('lookupCount');
    if (count) {
      const countNumber = parseInt(count, 10);
      updateTimes(countNumber);

      if (countNumber >= maxSearchedTimes) {
        setError('searched_number', {
          type: 'manual',
          message: maxSearchError,
        });
      }
    }
  }, [setError]);

  const searchNumberFromApi = async (data: { searched_number: string; dialing_code: string }) => {
    let numbersData: NumberLookup | undefined;
    const { searched_number, dialing_code } = data;

    // DO NOT SUBMIT IF MAX SEARCH TIMES REACHED
    if (searchTimes >= maxSearchedTimes) return;

    // IF hCAPTCHA TOKEN IS NOT PRESENT, DO NOT SUBMIT
    if (!hCaptchaToken) {
      setError('searched_number', {
        type: 'manual',
        message: 'Please complete the captcha',
      });
      return;
    }

    // ENABLE LOADING STATE
    updateSearching(true);
    updateData(undefined);

    // MAKE API CALL
    try {
      numbersData = await getPhoneNumberLookup({
        searched_number,
        dialing_code,
        token: hCaptchaToken,
        country_code: countryCode,
      });
    } catch (error) {
      console.error('Error fetching phone number info', error);
      updateSearching(false);
      setHCaptchaToken(undefined);
      setError('searched_number', {
        type: 'manual',
        message: 'Something Went Wrong. Please Try Again.',
      });
      return;
    }

    // SET RETURN DATA AND SET VALUES TO UPDATED STATE
    if (numbersData) {
      const newCount = searchTimes + 1;
      setLookupCount(newCount);
      updateData(numbersData);
      updateTimes(newCount);
      updateSearching(false);
      setHCaptchaToken(undefined);

      // TRIGGER MAX SEARCH TIMES ERROR
      if (newCount >= maxSearchedTimes) {
        setError('searched_number', {
          type: 'manual',
          message: maxSearchError,
        });
        return;
      }

      return;
    }
  };

  const formatPhoneNumber = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    const inputEvent = e.nativeEvent as InputEvent;

    if (validatePhoneNumberLength(value, countryCode) === 'TOO_LONG') return;

    // If the backspace key is pressed, do not format the number
    if (inputEvent.inputType === 'deleteContentBackward') {
      updateSearchNumber(value);
      return;
    }

    // Remove a unwanted 1 at the beginning of us phone numbers
    if (countryCode === DEFAULT_COUNTRY_ALPHA2 && value[0] === '1') {
      value = value.slice(1);
    }

    // Format the number as the user types it
    const currentInputNumber = new AsYouType(countryCode).input(value);

    updateSearchNumber(`${currentInputNumber}`);
  };

  const changeCountryCode = (dialingCode: string) => {
    const country = countryData.find((c) => c.dialingCode === dialingCode);
    if (country) {
      updateCountryCode(country.alpha2);
      setValue('dialing_code', country.dialingCode);
    }
  };

  const validateNumber = (value: string) => {
    return isValidPhoneNumber(value, countryCode) || enterValidNumber;
  };

  const countryItems = countryData
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((country) => ({ name: `${country.name} ${country.dialingCode}`, value: country.dialingCode }));

  return (
    <css.Form onSubmit={handleSubmit(searchNumberFromApi)}>
      <div>
        <css.Label htmlFor='country_code'>Select Country</css.Label>
        <Select
          id='country_code'
          placeholder='Select Country'
          items={countryItems}
          onValueChange={changeCountryCode}
          {...register('dialing_code')}
        />
      </div>
      <Input
        id='searched_number'
        placeholder={'1 (123) 456-7890'}
        {...register('searched_number', {
          onChange: formatPhoneNumber,
          validate: validateNumber,
        })}
        label={'Phone Number'}
        value={searchedNumber}
        message={{
          text: errors.searched_number?.message,
          type: 'error',
        }}
      />

      {searchTimes < maxSearchedTimes ? (
        <css.ButtonSubmit loading={searching} type='submit' kind='primary'>
          {ctaCopy || 'Search Number'}
        </css.ButtonSubmit>
      ) : (
        <css.ButtonSignUp text='Sign Up' buttonKind='primary' href='/sign-up' type='button' />
      )}

      {!hCaptchaToken && searchTimes < maxSearchedTimes && (
        <Captcha
          sitekey={constants.hCaptcha.siteKey.telnyxdotcom}
          onVerify={(token) => setHCaptchaToken(token)}
          onExpire={() => setHCaptchaToken(undefined)}
          executeOnLoad={false}
          lockPageScrollOnOpen={false}
        />
      )}
    </css.Form>
  );
};

export default NumberLookupSearch;
