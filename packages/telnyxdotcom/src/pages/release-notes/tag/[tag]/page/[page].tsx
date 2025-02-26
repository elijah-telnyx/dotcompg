import ReleaseNotesPageComponent, { getStaticProps as ReleaseNotesGetStaticProps } from '../../[tag]';

import type { GetStaticPaths } from 'next';
import env from 'constants/env';

export default ReleaseNotesPageComponent;

export const getStaticProps = ReleaseNotesGetStaticProps;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: env.generatePagesFallback.releaseNotes as 'blocking' | boolean,
    paths: [],
  };
};
