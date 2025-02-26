import type { CTAButtonProps } from 'ui/components/CtaButton';
import type { MarketoFormProps } from 'ui/components/MarketoForm';
import type { MarkdownProps } from 'ui/components/Markdown';
import type { SidebarLinksProps } from 'ui/components/SidebarLinks';
import type { APIResponseByDocumentID } from '../types';
import { routes } from 'utils/routes';
import { slugify } from 'ui/utils/slugify';
import { DEFAULT_TOPIC_CATEGORY } from '../constants';

export function getFallbackBlogMediaField(
  title: string
): APIResponseByDocumentID<'api::rc-post.rc-post', string>['data']['featureImage'] {
  return {
    id: 0,
    documentId: '0',
    title,
    file: {
      id: 364,
      documentId: 'i82o98whwh1yvw51q70kzy4e',
      url: 'https://pleasant-sunrise-e14682326c.media.strapiapp.com/fallback_post_image_abae6c9f4b.svg',
      name: 'fallback-post-image.svg',
      ext: '.svg',
      mime: 'image/svg+xml',
      hash: 'fallback_post_image_abae6c9f4b',
      size: 12.37,
      provider: 'local',
    },
  };
}

export function getFallbackBlogBreadcrumbLinkProps(): CTAButtonProps {
  return {
    href: routes.resources.root,
    text: 'Back to blog',
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
}

export function getFallbackBlogFormProps(): MarketoFormProps {
  return {
    formId: 1470,
    heading: 'Sign up for emails of our latest articles and news',
    smallFieldLayout: true,
    successMessage: 'Great! You’ll now receive emails of our latest articles from Telnyx.',
  };
}

export function getFallbackBlogJumpLinks(sections: MarkdownProps[]): SidebarLinksProps {
  const heading2Regex = /^## .*/gim;

  const articleContent = sections.reduce((acc, section) => acc + '\n' + section.children, '');

  return {
    items: [...articleContent.matchAll(heading2Regex)].map((regexMatchList) => {
      const text = regexMatchList[0].replace('##', '').trim();
      const href = `#${slugify(text)}`;

      return {
        text,
        href,
      };
    }),
  };
}

interface Options {
  format: 'parenteses' | 'after';
  hiddenPage?: boolean;
}
const formatPage = (page: string, { format, hiddenPage }: Options) => {
  let text = '';
  switch (format) {
    case 'parenteses':
      text = `(${page})`;
      break;
    case 'after':
      text = `Page ${page}`;
  }
  if (hiddenPage) {
    return `<span hidden="true">${text}</span>`;
  }

  return text;
};

export const addPageToCopy = (page?: string | number) => (copy: string, options: Options) => {
  if (!page || Number(page) === 1) return copy;
  const pageText = formatPage(String(page), options);

  return `${copy} ${pageText}`;
};

export const getFilter = (
  tag:
    | APIResponseByDocumentID<'api::rc-topic.rc-topic', string>['data']
    | APIResponseByDocumentID<'api::rc-category.rc-category', string>['data']
) => ({
  id: tag.documentId,
  name: tag.name,
  color: tag.color || DEFAULT_TOPIC_CATEGORY.color,
  filterSlug: tag.slug,
});
