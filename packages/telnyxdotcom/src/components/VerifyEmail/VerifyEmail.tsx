import OverviewHero from 'ui/components/OverviewHero';
import * as css from './VerifyEmail.styled';
import Paragraph from 'ui/components/Typography/Paragraph';
import CtaButton from 'ui/components/CtaButton';
import useSecondsTimer from 'hooks/useSecondsTimer';
import { errorLogger } from 'utils/errorHandler/errorLogger';

const EMAIL_DELAY_SECONDS = 30;

const hero = {
  heading: 'One last step',
  copy: `In order to finish creating your account, please confirm your email address. A confirmation link will be available in your inbox shortly.`,
  backgroundColor: 'green',
  hasOverflow: false,
  centered: true,
  spacingTop: 'contrasting',
  spacingBottom: 'contrasting',
} as const;

function openIntercomLauncher() {
  try {
    if (window.Intercom) {
      window.Intercom('showNewMessage');
    } else {
      throw new Error('window.Intercom undefined');
    }
  } catch (e) {
    errorLogger({
      error: new Error('Failed to open Intercom Launcher'),
      data: JSON.stringify(e),
      url: window.location.pathname,
    });
    window.location.assign('/contact-us');
  }
}

const VerifyEmail = () => {
  const secondsLeft = useSecondsTimer(EMAIL_DELAY_SECONDS);

  return (
    <OverviewHero {...hero}>
      <css.Footer>
        <Paragraph>
          Didn&apos;t receive an email?{' '}
          {secondsLeft ? (
            `Wait ${secondsLeft} seconds`
          ) : (
            <CtaButton
              /*
               * type="link" (required to use the link styling)
               * need htmlAs="button" to force it to render a button tag
               */
              htmlAs='button'
              type='link'
              text='Get Support'
              linkSize='small'
              onClick={openIntercomLauncher}
            />
          )}
        </Paragraph>
      </css.Footer>
    </OverviewHero>
  );
};
export default VerifyEmail;
