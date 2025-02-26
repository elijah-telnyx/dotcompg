import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import GridList from 'ui/components/GridList';
import type { ReleaseNotesPage } from 'lib/Contentful/types';
import { getReleaseNoteItems, getReleaseNoteItem, getReleaseNoteTags, constants } from 'lib/Strapi';
import { defaultGetStaticProps } from 'utils/pageGeneration/defaultGetStaticProps';
import OverviewHero from 'ui/components/OverviewHero';
import { generateSchema } from 'utils/schemas';
import { BASE_URL } from 'env';
import { generateReleaseNotesRssFeed } from 'services/rss/generateReleaseNotesRssFeed';
import { submitReleaseNotesForm } from 'services/publicApiService';
type ReleaseNotesPageProps = Awaited<ReturnType<typeof getReleaseNoteItems>> & { preview: boolean };

const pagePath = 'release-notes';

const ReleaseNotesPageComponent: NextPage<ReleaseNotesPage> = ({ releases, tags, pagination }) => {
  const router = useRouter();
  const { tag } = router.query;

  return (
    <>
      <OverviewHero
        heading='Release notes'
        backgroundColor='black'
        hasOverflow={false}
        spacingTop='contrasting'
        spacingBottom='contrasting'
      />
      <GridList
        submitFormFn={submitReleaseNotesForm}
        items={releases}
        hasOverflow={false}
        backgroundColor='cream'
        spacingBottom='none'
        spacingTop='contrasting'
        filter={{
          id: 'product-filter',
          placeholder: 'Filter by product',
          items: tags,
          value: tag as string,
          resetLink: `/${pagePath}`,
          onValueChange: (value) => {
            if (value) {
              router.push(`/${pagePath}/tag/${value}`);
            } else {
              router.push(`/${pagePath}`);
            }
          },
        }}
        pagination={{
          ...pagination,
        }}
      />
    </>
  );
};

export default ReleaseNotesPageComponent;

export const getStaticProps = defaultGetStaticProps<ReleaseNotesPageProps>({
  page: pagePath,
  getData: async ({ preview, params }) => {
    if (Number(params?.page) === 1) {
      return { notFound: true };
    }

    const currentPage = Number(params?.page || 1);

    if (params?.slug) {
      return getReleaseNoteItem({ preview }, params.slug).then((data) => {
        if (!data.data.length) return { notFound: true };
        const { id, documentId, applyNoIndex, seoTitle, seoDescription, ...content } = data.data[0];
        return {
          ...content,
          id: documentId,
          seo: {
            title: seoTitle,
            description: seoDescription,
            robots: applyNoIndex ? 'follow,noindex' : undefined,
            schema: generateSchema({
              type: 'componentReleaseNotesItem',
              payload: {
                name: seoTitle,
                description: seoDescription,
                url: `${BASE_URL}/${pagePath}/${params?.slug}`,
              },
            }),
          },
          preview,
        };
      });
    } else {
      // only generated the rss feed over the index page
      generateReleaseNotesRssFeed();
    }

    const filters = params?.tag ? { tags: { slug: { $eq: params?.tag } } } : undefined;

    return Promise.all([
      getReleaseNoteTags({ preview }),
      getReleaseNoteItems(
        { preview },
        {
          filters,
          pagination: { page: currentPage, pageSize: constants.MAX_RELEASE_NOTES_PER_PAGE },
        }
      ),
    ]).then((data) => {
      const baseUrl = params?.tag ? `/${pagePath}/tag/${params.tag}` : `/${pagePath}`;

      const tagsList = data[0].data;
      const totalPages = data[1].meta.pagination.pageCount;

      return {
        id: 'release-notes',
        tags: tagsList,
        releases: data[1].data,
        pagination: {
          pageCounter: {
            totalPages,
            currentPage,
          },
          previous: {
            href: currentPage > 2 ? `${baseUrl}/page/${currentPage - 1}` : currentPage === 2 ? baseUrl : '',
          },
          next: {
            href: currentPage < totalPages ? `${baseUrl}/page/${currentPage + 1}` : '',
          },
        },
        preview,
      };
    });
  },
});
