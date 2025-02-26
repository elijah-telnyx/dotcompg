import { isDarkBackgroundColor } from '../../styles/constants/backgroundColorOptions';
import Grid from '../Grid';
import Paragraph from '../Typography/Paragraph';
import Heading from '../Typography/Heading';
import Statistics from '../Typography/Statistics';
import BaseCtaBanner, { type BaseCtaBannerProps } from '../BaseCtaBanner';
import * as css from './CTABanner.styled';
import CtaButton from '../CtaButton';
import MarketoForm, { type MarketoFormProps } from '../MarketoForm';

export interface CtaBannerProps extends BaseCtaBannerProps {
  pricingCopy?: string;
  pricingValue?: string;
  pricingCaption?: string;
  form?: MarketoFormProps;
  align?: 'left' | 'center';
}

const CTABanner = ({
  tag,
  heading,
  copy,
  pricingCopy,
  pricingValue,
  pricingCaption,
  ctaButtons,
  form,
  align = 'left',
  ...props
}: CtaBannerProps) => {
  const dark = isDarkBackgroundColor(props.backgroundColor);
  const hasPricing = Boolean(pricingCopy && pricingValue);

  if (form) {
    return (
      <Grid.Container>
        <css.CtaWrapper
          xs={4}
          small={8}
          medium={6}
          backgroundColor={props.backgroundColor}
        >
          <css.CtaSection {...props} htmlAs='div'>
            <css.Heading level={2} htmlAs='p' dark={dark}>
              {heading}
            </css.Heading>
            <Paragraph dark={dark}>{copy}</Paragraph>
            <css.ButtonsContainer>
              {ctaButtons.map((cta) => (
                <CtaButton
                  {...cta}
                  key={cta.href}
                  backgroundColor={props.backgroundColor}
                />
              ))}
            </css.ButtonsContainer>
          </css.CtaSection>
        </css.CtaWrapper>
        <Grid.Item xs={4} small={8} medium={6}>
          <css.FormWrapper>
            <MarketoForm {...form} headingLevel={2} align={align} />
          </css.FormWrapper>
        </Grid.Item>
      </Grid.Container>
    );
  }

  return (
    <>
      <BaseCtaBanner
        tag={tag}
        heading={heading}
        copy={copy}
        dark={dark}
        ctaButtons={ctaButtons}
        ctaButtonsWrapperProps={
          hasPricing
            ? {
                css: {
                  marginTop: '$large',

                  '@medium': {
                    marginTop: '$xxl',
                  },

                  '@large': {
                    marginTop: '$large',
                  },
                },
              }
            : {
                css: {
                  '@lessThanSmall': {
                    marginTop: '$large',
                  },
                },
              }
        }
        {...props}
        aside={
          hasPricing && (
            <>
              <Grid.Item xs={0}></Grid.Item>

              <Grid.Item xs={4} small={3} medium={4} large={4} xl={4}>
                <Paragraph
                  dark={dark}
                  css={{
                    marginBottom: '$xs',
                    '@medium': { marginBottom: '$small' },
                  }}
                >
                  {pricingCopy}
                </Paragraph>
                <Statistics dark={dark}>{pricingValue}</Statistics>
                <Heading
                  category
                  level={2}
                  css={{
                    marginTop: '$xs',
                    '@medium': { marginTop: '$small' },
                  }}
                >
                  {pricingCaption}
                </Heading>
              </Grid.Item>
            </>
          )
        }
      />
    </>
  );
};

export default CTABanner;
