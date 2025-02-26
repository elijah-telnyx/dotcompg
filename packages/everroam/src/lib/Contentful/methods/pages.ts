import { withAsyncData } from "./../utils/withAsyncData";
import { NotFoundError } from "utils/pageGeneration/CustomError";
import { getClient, entries, type GetClientOptions } from "lib/Contentful";
import type {
  RootPage,
  BlogPage,
  HomePage,
  GenericPage,
} from "lib/Contentful/types";
import heroData from "lib/Static/data/homepageHero.json";

import { flattenAuthor, flattenMedia, flattenEntry } from "../utils/flatten";
import type { BlogPageHeroProps } from "components/BlogPage/BlogPageHero";
import { getFallbackBlogJumpLinks } from "../utils";
import type { MarkdownProps } from "ui/components/Markdown";
interface Query {
  slug: string;
  locale?: string;
  content_type?: string;
  "metadata.tags.sys.id[in]"?: string;
  "metadata.tags[exists]"?: boolean;
}

const getPageEntryFromEntries = <T>(
  { content_type, slug, locale = "en-US", ...query }: Query,
  opts?: GetClientOptions
) => {
  /**
   * This is for us to be sure the page exists and have content
   */
  const requiredParamsForPages: Record<string, boolean> = {
    "fields.seo[exists]": true,
    "fields.sections[exists]": true,
  };

  return getClient(opts)
    .getEntries<T>({
      content_type,
      include: 3,
      locale,
      "fields.slug": slug,
      ...(!opts?.preview && requiredParamsForPages),
      ...query,
    })
    .then((entries) => {
      const entry = entries.items[0];
      if (!entry) {
        throw new NotFoundError(
          JSON.stringify({ content_type, slug, ...query })
        );
      }
      return entry;
    });
};

export const getHomepage = (opts?: GetClientOptions) => {
  return getClient(opts)
    .getEntry<HomePage>(entries.homepage, { include: 4 })
    .then((pageData) =>
      Promise.all([
        // @TODO: move this flatten + promise logic to a separate method with a generic Page type (call getEntryFields<ProductPage>)
        pageData.fields.seo &&
          flattenEntry<typeof pageData.fields.seo>(pageData.fields.seo),
        ...pageData.fields.sections.map((section) =>
          flattenEntry<typeof section>(section)
        ),
      ]).then(([seo, ...sections]) => {
        return {
          id: pageData.sys.id,
          ...pageData.fields,
          hero: heroData,
          seo,
          sections,
        };
      })
    );
};

export const getRootPage = (
  { slug, locale }: Query,
  opts?: GetClientOptions
) => {
  return getPageEntryFromEntries<RootPage>(
    { content_type: "pageRoot", slug, locale },
    opts
  ).then((pageData) => {
    return Promise.all([
      // @TODO: move this flatten + promise logic to a separate method with a generic Page type (call getEntryFields<ProductPage>)
      withAsyncData<typeof pageData.fields.hero>(
        flattenEntry<typeof pageData.fields.hero>(pageData.fields.hero)
      ),
      pageData.fields.seo &&
        flattenEntry<typeof pageData.fields.seo>(pageData.fields.seo),
      ...pageData.fields.sections.map((section) =>
        withAsyncData<typeof section>(flattenEntry<typeof section>(section))
      ),
    ]).then(async ([hero, seo, ...sections]) => {
      return {
        id: pageData.sys.id,
        ...pageData.fields,
        locale,
        seo,
        hero,
        sections,
      };
    });
  });
};

export const getRootPages = (opts?: GetClientOptions) => {
  return getClient(opts).getEntries<RootPage>({
    content_type: "pageRoot",
  });
};

const getBlogPageFromEntries = <T>(
  { slug, locale = "en-US", ...query }: Query,
  opts?: GetClientOptions
) => {
  const content_type = "pageBlog";

  return getClient(opts)
    .getEntries<T>({
      content_type,
      include: 3,
      locale,
      "fields.slug": slug,
      ...query,
    })
    .then((entries) => {
      const entry = entries.items[0];
      if (!entry) {
        throw new NotFoundError(
          JSON.stringify({ content_type, slug, ...query })
        );
      }
      return entry;
    });
};

export const getBlogPage = async (
  { slug, locale }: Query,
  opts?: GetClientOptions
) => {
  const pageData = await getBlogPageFromEntries<BlogPage>(
    { content_type: "pageBlog", slug, locale },
    opts
  );

  const author = await flattenAuthor(pageData.fields.author);

  const seo = {
    contentType: "seo",
    title: pageData.fields.title,
    description: pageData.fields.excerpt,
  };
  let hero = {
    createdAt: pageData.sys.createdAt,
    updatedAt: pageData.sys.updatedAt,
    title: pageData.fields.title,
    readTime: pageData.fields.readTime,
    excerpt: pageData.fields.excerpt,
    author,
    featureImageAltText: pageData.fields.featureImageAltText,
  } as BlogPageHeroProps;

  if (pageData.fields.featureImage) {
    hero = {
      ...hero,
      featureImage: await flattenMedia(pageData.fields.featureImage),
    };
  }

  const content = pageData.fields.content;
  const jumpLinks = getFallbackBlogJumpLinks([
    { children: pageData.fields.content } as MarkdownProps,
  ]);

  return {
    id: pageData.sys.id,
    seo,
    hero,
    content,
    jumpLinks,
  };
};

export const getBlogPages = (opts?: GetClientOptions) => {
  return getClient(opts).getEntries<BlogPage>({
    content_type: "pageBlog",
  });
};

export const getGenericPage = ({ slug }: Query, opts?: GetClientOptions) => {
  return getPageEntryFromEntries<GenericPage>(
    { content_type: "pageWhyTelnyx", slug },
    opts
  ).then((pageData) => {
    return Promise.all([
      // @TODO: move this flatten + promise logic to a separate method with a generic Page type (call getEntryFields<ProductPage>)
      pageData.fields.hero
        ? flattenEntry<typeof pageData.fields.hero>(pageData.fields.hero)
        : Promise.resolve(undefined),
      pageData.fields.seo &&
        flattenEntry<typeof pageData.fields.seo>(pageData.fields.seo),
      ...(pageData.fields.sections?.map((section) =>
        flattenEntry<typeof section>(section)
      ) || []),
    ]).then(([hero, seo, ...sections]) => {
      return {
        id: pageData.sys.id,
        ...pageData.fields,
        seo,
        hero,
        sections,
      };
    });
  });
};

export const getGenericPages = (opts?: GetClientOptions) => {
  return getClient(opts).getEntries<GenericPage>();
};
