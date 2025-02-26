import OAuth from 'components/OAuth';
import VerifyEmailTemplate from 'components/VerifyEmail';

import type { GetServerSidePropsContext } from 'next';
import { defaultGetServerSideProps } from 'utils/pageGeneration/defaultGetServerSideProps';

export type VerifyEmailProps = {
  provider: string;
};
const VerifyEmail = ({ provider }: VerifyEmailProps) => {
  const isOAuth = provider?.length > 0;

  if (isOAuth) {
    return <OAuth />;
  }
  return <VerifyEmailTemplate />;
};

function getProvider({ query }: { query: GetServerSidePropsContext['query'] }) {
  const { provider = '' } = query;
  return {
    provider,
    page: 'sign-up/verify-email',
    seo: {
      title: 'Telnyx - Global solutions for Communications, IOT, AI, Compute and Networking',
      description:
        'Your one-stop shop for infrastructure at the edge. The Telnyx Connectivity Cloud helps your business connect people, devices and applications everywhere.',
      // don't show this page over search engines
      robots: 'nofollow,noindex',
    },
  };
}

export const getServerSideProps = defaultGetServerSideProps<VerifyEmailProps>({
  page: 'sign-up/verify-email',
  getData: ({ query }) => getProvider({ query }),
  scripts: {
    pipedata: true,
  },
});

export default VerifyEmail;
