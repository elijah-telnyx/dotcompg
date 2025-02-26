import dynamic from 'next/dynamic';
import Grid from 'ui/components/Grid';
import { type InferenceDemoFormProps } from 'components/InferenceDemo';
import { type SectionProps } from 'ui/components/Section';
import SectionHeader from 'ui/components/Section/SectionHeader';
import { isDarkBackgroundColor } from 'ui/styles/constants/backgroundColorOptions';
import * as css from './InferenceSection.styled';
import { useEffect } from 'react';
import useAsync from 'utils/hooks/useAsync';
import { getAIModels } from 'services/publicApiService';
import Spinner from 'ui/components/Spinner';
import CtaButton, { type CTAButtonProps } from 'ui/components/CtaButton';
import Caption from 'ui/components/Typography/Caption';
import IconStars from 'ui/components/Icons/Stars';
import IconGpu from 'ui/components/Icons/Gpu';
import IconApi from 'ui/components/Icons/Api';
import IconDashedConcave from 'ui/components/Icons/DashedConcave';
import IconDashedConvex from 'ui/components/Icons/DashedConvex';

import featureFlippers from 'constants/featureFlippers';
import type { InferenceDemoValues } from './InferenceDemo/InferenceDemo';

const InferenceDemoForm = dynamic(() => import('components/InferenceDemo').then((module) => module.InferenceDemoForm), {
  ssr: false,
  loading: () => (
    <css.Loading>
      <Spinner title='Loading Inference...' background='light' size='big' />
    </css.Loading>
  ),
});
const InferenceDemo = dynamic(() => import('./InferenceDemo').then((module) => module.default), {
  ssr: false,
  loading: () => (
    <css.Loading>
      <Spinner title='Loading Inference...' background='light' size='big' />
    </css.Loading>
  ),
});

export interface InferenceSectionProps extends SectionProps {
  tagline?: string;
  heading?: string;
  copy?: string;
  caption?: string;
  cta?: CTAButtonProps;
  defaultValues?: InferenceDemoValues;
}

export const InferenceSection = ({
  tagline,
  heading,
  copy,
  caption,
  cta,
  defaultValues,
  ...props
}: InferenceSectionProps) => {
  const { data: form, run, status, error } = useAsync<InferenceDemoFormProps>();

  useEffect(
    function onVisibleLoading() {
      async function init() {
        run(
          getAIModels().then((modelOptions) => ({
            modelOptions,
            defaultValues,
          }))
        );
      }

      // once visible, always loaded. Do not run async data load twice
      if (status === 'idle' || status === 'rejected') {
        init();
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [status] // run is a useCallback
  );

  const isDark = isDarkBackgroundColor(props.backgroundColor);

  return (
    <css.Section {...props}>
      <Grid.Container>
        <css.HeaderItem>
          <css.SectionHeader>
            <SectionHeader tagline={tagline} heading={heading} copy={copy} isDark={isDark} variant='center' />
          </css.SectionHeader>
        </css.HeaderItem>
      </Grid.Container>

      {caption && (
        <css.CaptionWrapper increasedWidth={featureFlippers.DOTCOM_3768_NEW_INFERENCE_DEMO}>
          <css.CaptionItem>
            <IconStars animate />
            <Caption>{caption}</Caption>
          </css.CaptionItem>
        </css.CaptionWrapper>
      )}
      <css.FormWrapper increasedWidth={featureFlippers.DOTCOM_3768_NEW_INFERENCE_DEMO}>
        {status === 'resolved' && !featureFlippers.DOTCOM_3768_NEW_INFERENCE_DEMO && (
          <css.BackgroundGraphic dark={isDark} start>
            <IconGpu />
            <css.BackgroundCta>From GPU...</css.BackgroundCta>
            <css.BackgroundDashed start>
              <IconDashedConcave />
            </css.BackgroundDashed>
          </css.BackgroundGraphic>
        )}

        {(status == 'idle' || status == 'pending') && (
          <css.FormItem xs={4} small={8} medium={12}>
            <css.Loading>
              <Spinner title='Loading Inference' background={isDark ? 'light' : 'dark'} size='big' />
            </css.Loading>
          </css.FormItem>
        )}
        {status === 'resolved' &&
          form &&
          (featureFlippers.DOTCOM_3768_NEW_INFERENCE_DEMO ? (
            <css.InferenceDemoWrapper>
              <InferenceDemo {...form} />
            </css.InferenceDemoWrapper>
          ) : (
            <css.FormItem xs={4} small={8} medium={12}>
              <InferenceDemoForm {...form} embed backgroundColor='white' />
            </css.FormItem>
          ))}
        {status === 'rejected' && (
          <Grid.FullWidthItem xs={4} small={8} medium={12}>
            <css.Error>{error ? JSON.stringify(error) : 'Unexpected error ocurred. Please try again later'}</css.Error>
          </Grid.FullWidthItem>
        )}

        {status === 'resolved' && !featureFlippers.DOTCOM_3768_NEW_INFERENCE_DEMO && (
          <css.BackgroundGraphic dark={isDark} end>
            <css.BackgroundDashed end>
              <IconDashedConvex />
            </css.BackgroundDashed>
            <css.BackgroundCta>...to API</css.BackgroundCta>
            <IconApi />
          </css.BackgroundGraphic>
        )}
      </css.FormWrapper>
      {cta && (
        <css.CtaWrapper>
          <CtaButton {...cta} />
        </css.CtaWrapper>
      )}
    </css.Section>
  );
};

export default InferenceSection;
