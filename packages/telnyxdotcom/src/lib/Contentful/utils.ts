import type { Entry } from 'contentful';
import type { CTAButtonProps } from 'ui/components/CtaButton';
import type { MediaFields } from './types';
import type { MarketoFormProps } from 'ui/components/MarketoForm';
import type { MarkdownProps } from 'ui/components/Markdown';
import type { SidebarLinksProps } from 'ui/components/SidebarLinks';
import { slugify } from 'ui/utils/slugify';
import { routes } from 'utils/routes';

function getFallbackMediaField(
  title: string
): Omit<Entry<MediaFields>, 'metadata' | 'sys' | 'toPlainObject' | 'update'> {
  return {
    fields: {
      entryTitle: 'Blog Fallback Image',
      title,
      file: {
        url: 'https://images.ctfassets.net/taysl255dolk/6tPQ8iUsPmKo8I9h3Iw41C/dad50dcc9f2af447f674d66782519f53/fallback-post-image.svg',
        fileName: 'fallback-post-image.svg',
        details: {
          size: 12368,
        },
        contentType: 'image/svg+xml',
      },
    },
  };
}

function getFallbackBlogBreadcrumbLinkProps(): CTAButtonProps {
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

function getFallbackBlogFormProps(): MarketoFormProps {
  return {
    formId: 1470,
    heading: 'Sign up for emails of our latest articles and news',
    smallFieldLayout: true,
    successMessage: 'Great! You’ll now receive emails of our latest articles from Telnyx.',
  };
}

function getFallbackBlogJumpLinks(sections: MarkdownProps[]): SidebarLinksProps {
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

const ACRONYM_SLUGS = ['api', 'sip', 'sim'];
const DIVIDER_SLUGS = ['and'];

/**
 * Needed for forming good URLs
 * @param slug name slugified
 * @returns Readable text, capitalized and divided by spaces
 */
const getNameFromSlug = (slug: string) => {
  return slug
    .split('-')
    .map((word) => {
      if (ACRONYM_SLUGS.includes(word)) return word.toLocaleUpperCase();
      if (DIVIDER_SLUGS.includes(word)) return word.toLocaleLowerCase();

      return word.charAt(0).toLocaleUpperCase() + word.slice(1);
    })
    .join(' ');
};

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

const addPageToCopy = (page?: string | number) => (copy: string, options: Options) => {
  if (!page || Number(page) === 1) return copy;
  const pageText = formatPage(String(page), options);

  return `${copy} ${pageText}`;
};

/**
 * @param date contentful date
 * @returns date in YYYY-MM-DD format
 */
const formatDateISO = (date: string) => {
  return date.split('T')[0];
};

/**
 *
 * @param start index to start
 * @param stop where to stop - inclusive <=
 * @returns list of page numbers
 */
const getRange = (start: number, stop: number) => {
  if (start > stop) return [];

  return Array.from({ length: stop - start + 1 }, (_, i) => start + i);
};

export {
  getFallbackMediaField,
  getFallbackBlogBreadcrumbLinkProps,
  getFallbackBlogFormProps,
  getFallbackBlogJumpLinks,
  getNameFromSlug,
  addPageToCopy,
  formatDateISO,
  getRange,
};
