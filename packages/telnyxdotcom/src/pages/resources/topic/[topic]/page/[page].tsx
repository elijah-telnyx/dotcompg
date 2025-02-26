import type { GetStaticPaths } from 'next';
import env from 'constants/env';

export { default, getStaticProps } from '../../../index';

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: env.generatePagesFallback.resources as boolean | 'blocking' };
};
