import airtableService, { type GlossaryEntryQuery, type AirtableGlossaryEntry } from 'services/airtableService';
import { getFallbackBlogJumpLinks } from 'lib/Contentful/utils';
import { NotFoundError } from 'utils/pageGeneration/CustomError';
import { type CTAButtonProps } from 'ui/components/CtaButton';

export const getGlossaryOverViewData = async (query: GlossaryEntryQuery) => {
  const entries = await airtableService.getGlossaryEntries(query.options);
  if (!entries) {
    throw new NotFoundError(JSON.stringify({ Glossary: true, slug: query.page }));
  }

  const items: AirtableGlossaryEntry[] = entries.reduce((acc: AirtableGlossaryEntry[], record) => {
      const fields = record.fields;
      acc.push(fields as AirtableGlossaryEntry);
      return acc;
    }, []),
    totalPages = Math.ceil(entries.length / query.limitPerPage),
    itemsThisPage = items.splice(query.limitPerPage * (query.page - 1), query.limitPerPage);

  const pagination = {
    pageCounter: { currentPage: query.page, totalPages: totalPages },
    previous: {
      page: query.page > 2 ? query.page - 1 : null,
      href: `/learn-ai${query.page > 2 ? `/page/${query.page - 1}` : ''}`,
    },
    next: { page: query.page + 1, href: `/learn-ai/page/${query.page + 1}` },
    htmlAs: 'a',
  };

  return {
    seo: {
      title: 'Telnyx AI Glossary',
      description: 'Description of glossary.',
      ogType: 'webpage',
    },
    heading: 'Learn AI with Telnyx AI Glossary',
    articles: {
      pagination: { ...pagination, htmlAs: 'a' as keyof JSX.IntrinsicElements },
      items: itemsThisPage.map((entry) => parseGlossaryEntry(entry)),
    },
  };
};

export const getGlossaryPageData = async (slug: string) => {
  const entry = await airtableService.getGlossaryEntry(slug);
  if (!entry) {
    throw new NotFoundError(JSON.stringify({ Glossary: true, slug }));
  }

  return {
    seo: {
      title: entry.title,
      description: entry.metaDescription,
      heading: entry.title,
      featuredImage: {
        src: entry?.featuredImage || '',
      },
      date: entry['Last Mod'],
      author: {
        copy: entry?.authorName || '',
      },
      ogImage: {
        src: entry.socialUrl,
      },
      twitterImage: {
        src: entry.socialUrl,
      },
    },
    sections: [
      {
        __component: 'blog.markdown-section' as const,
        children: entry.article,
      },
    ],
    breadcrumb: {
      href: '/learn-ai',
      text: 'Back to Glossary',
      type: 'link',
      linkKind: 'cta',
      linkIcon: {
        src: '',
        svg:
          '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
          '      <g clip-path="url(#clip0_4646_1199)">\n' +
          '          <path d="M21 9L22 9L22 11L21 11L21 9ZM21 11L9.00002 11L9.00002 9L21 9L21 11Z" fill="currentColor" />\n' +
          '          <path\n' +
          '              d="M2.78886 9.10557C2.05181 9.4741 2.05181 10.5259 2.78885 10.8944L9.55279 14.2764C10.2177 14.6088 11 14.1253 11 13.382L11 6.61803C11 5.87465 10.2177 5.39116 9.55279 5.72361L2.78886 9.10557Z"\n' +
          '              fill="currentColor" />\n' +
          '      </g>\n' +
          '      <defs>\n' +
          '          <clipPath id="clip0_4646_1199">\n' +
          '              <rect width="20" height="20" fill="white" />\n' +
          '          </clipPath>\n' +
          '      </defs>\n' +
          '  </svg>',
        alt: 'back',
      },
      linkDirection: 'rtl',
    } as CTAButtonProps,
    form: {
      formId: 1470,
      heading: 'Sign up for emails of our latest articles and news',
      smallFieldLayout: true,
      successMessage: 'Great! You’ll now receive emails of our latest articles from Telnyx.',
    },
    socialShareTitle: entry.title,
    socialShareDescription: entry.metaDescription,
    socialShareUrl: `https://telnyx.com/learn-ai/${entry.slug}`,
    jumpLinks: getFallbackBlogJumpLinks([{ children: entry.article }]),
    author: {
      copy: entry.authorName,
      icon: {
        src: entry.authorImage,
        alt: entry.authorName,
      },
    },
    authorLinkHref: entry.authorUrl as string,
    media: entry.featuredImage
      ? {
          src: entry.featuredImage,
          alt: entry.title,
        }
      : undefined,
    ctaButtons: [
      { href: '/sign-up', text: 'Sign Up', type: 'button' },
      { href: '/contact-us', text: 'Contact Us', type: 'button', buttonKind: 'secondary' },
    ] as CTAButtonProps[],
    ...entry,
  };
};

function parseGlossaryEntry(entry: AirtableGlossaryEntry) {
  return {
    id: entry.slug,
    tagline: {
      name: entry.tag,
      color: entry.tagColor,
    },
    heading: entry.title,
    href: `/learn-ai/${entry.slug}`,
    author: {
      media: {
        src: entry.authorImage,
        alt: entry.authorName,
      },
      name: entry.authorName,
    },
    isEditor: true,
  };
}

export const constants = {
  MAX_GLOSSARY_POSTS_PER_PAGE: 30,
};
