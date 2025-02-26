import type { GetStaticPaths, NextPage } from 'next';

import type { CTAButtonProps } from 'ui/components/CtaButton';
import ErrorBoundary from 'components/ErrorBoundary';
import type { GridListItemProps } from 'ui/components/GridList';
import ReleaseNoteArticle from 'ui/components/ReleaseNote';
import { getStaticProps as ReleaseNotesGetStaticProps } from '.';
import env from 'constants/env';

type ReleaseNoteProps = GridListItemProps & { preview: boolean };

const ReleaseNote: NextPage<ReleaseNoteProps> = ({ preview, ...content }) => {
  const breadcrumbLink: CTAButtonProps = {
    href: '/release-notes',
    text: 'Release notes',
    type: 'link',
    linkKind: 'cta',
    linkIcon: {
      src: '',
      svg: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_4646_1199)">
          <path d="M21 9L22 9L22 11L21 11L21 9ZM21 11L9.00002 11L9.00002 9L21 9L21 11Z" fill="currentColor" />
          <path
              d="M2.78886 9.10557C2.05181 9.4741 2.05181 10.5259 2.78885 10.8944L9.55279 14.2764C10.2177 14.6088 11 14.1253 11 13.382L11 6.61803C11 5.87465 10.2177 5.39116 9.55279 5.72361L2.78886 9.10557Z"
              fill="currentColor" />
      </g>
      <defs>
          <clipPath id="clip0_4646_1199">
              <rect width="20" height="20" fill="white" />
          </clipPath>
      </defs>
  </svg>`,
      alt: 'back',
    },
    linkDirection: 'rtl',
  };

  return (
    <ErrorBoundary preview={preview}>
      <ReleaseNoteArticle
        {...content}
        publishDate={content?.publishDate || ''}
        breadcrumbLink={breadcrumbLink}
        heading={content.title}
        copy={content.content}
        backgroundColor={content.backgroundColor}
        hasOverflow={false}
        spacingTop='contrasting'
        spacingBottom='contrasting'
      />
    </ErrorBoundary>
  );
};

export default ReleaseNote;

export const getStaticProps = ReleaseNotesGetStaticProps;

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: env.generatePagesFallback.releaseNotes as 'blocking' | boolean };
};
