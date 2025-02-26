import * as css from './SavingsSMSCalculatorWidget.styled';
import CtaButton, { type CTAButtonProps } from 'ui/components/CtaButton';
import Card from 'ui/components/Card';
import CompareProgress from 'ui/components/Progress/CompareProgress/CompareProgress';
import Heading from 'ui/components/Typography/Heading';
import { theme } from 'ui/styles';
import { useState } from 'react';
import Grid from 'ui/components/Grid';
import { useEffect } from 'react';
import { calculateSavings } from './utils';
import { twilioBrand, type NumberType, type QuantityType } from './constants';
import { getSMSCalculatorPricing } from 'services/publicApiService';
import useAsync, { STATUS } from 'utils/hooks/useAsync';
import { Paragraph } from 'components/ReportAbuseForm/ReportAbuseForm.styled';
import Link from 'ui/components/Link/Link';
import Loading from 'ui/components/Icons/Loading';

const Savings = ({ priceData, numberType, numberOfSendMessages, numberOfReceiveMessages, ctas }: SavingsProps) => {
  const { data, run, status, error } = useAsync<SavingsProps['priceData']>({ data: priceData });

  const [retry, setRetry] = useState(0);

  useEffect(() => {
    if (retry > 0 || !priceData) {
      run(getSMSCalculatorPricing().then(({ data }) => data));
    }
  }, [run, retry, priceData]);

  if (!numberType || !numberOfReceiveMessages || !numberOfSendMessages) {
    return null;
  }

  if (status === STATUS.pending) {
    return (
      <Card stepper>
        <Grid.Container style={{ placeItems: 'center' }}>
          <Grid.FullWidthItem>
            <Heading level={3}>
              Getting savings <Loading spin />
            </Heading>
          </Grid.FullWidthItem>
        </Grid.Container>
      </Card>
    );
  }
  if (error || !data) {
    return (
      <Card stepper>
        <Grid.Container>
          <Grid.FullWidthItem>
            <css.CardHeading level={3}>There was an error loading the data</css.CardHeading>
          </Grid.FullWidthItem>
          <Grid.Item xs={0} medium={7}>
            <Paragraph>
              Please{' '}
              <Link htmlAs='button' onClick={() => setRetry(retry + 1)}>
                try again
              </Link>{' '}
              or <Link href='/contact-us'>contact us</Link> for help.
            </Paragraph>
          </Grid.Item>
        </Grid.Container>
      </Card>
    );
  }

  const { telnyx, twilio, total } = calculateSavings({
    priceData: data,
    numberType,
    numberOfReceiveMessages,
    numberOfSendMessages,
  });

  return (
    <Card stepper>
      <Grid.Container>
        <Grid.Item xs={4} medium={5}>
          <css.CardHeading level={3}>Compare costs per month</css.CardHeading>
        </Grid.Item>
        <Grid.Item xs={0} medium={7}></Grid.Item>

        <Grid.Item xs={4} medium={6}>
          <css.ComparisonBlock>
            <CompareProgress value={twilio} max={total} valuePrefix='$' {...twilioBrand} />

            <CompareProgress
              value={telnyx}
              max={total}
              label='Telnyx'
              valuePrefix='$'
              color={theme.colors.green.value}
            />
          </css.ComparisonBlock>
          <css.SavingsBlock>
            <Heading level={2} category>
              SAVINGS per month
            </Heading>
            <Heading level={2} htmlAs='strong'>
              ${twilio - telnyx}
            </Heading>
          </css.SavingsBlock>
        </Grid.Item>

        {ctas && (
          <Grid.FullWidthItem>
            {ctas.map((cta) => (
              <CtaButton {...cta} key={cta.href} />
            ))}
          </Grid.FullWidthItem>
        )}
      </Grid.Container>
    </Card>
  );
};

export default Savings;

type SMSCalculatorApiResponse = Awaited<ReturnType<typeof getSMSCalculatorPricing>>;

export interface SavingsProps {
  ctas?: CTAButtonProps[];
  priceData?: SMSCalculatorApiResponse['data'];
  numberType?: NumberType;
  numberOfSendMessages?: QuantityType;
  numberOfReceiveMessages?: QuantityType;
}
