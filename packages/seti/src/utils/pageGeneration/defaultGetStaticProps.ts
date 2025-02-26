import { CustomErrorHandler } from "./CustomError";
import * as utils from "./utils";

import type { GetStaticPropsContext } from "next";
import { PREVIEW_MODE_DEFAULT } from "env";

export type ContextProps = {
  slug?: string;
  locale?: string;
  page?: string;
  topic?: string;
  category?: string;
  tag?: string;
  product?: string; // resource center filter - equivalent to category
};

export interface Params {
  page: string;
  getData: (
    context: GetStaticPropsContext<ContextProps>
  ) => Promise<unknown> | unknown;
}

export const defaultGetStaticProps = <
  PageEntryProps extends { [key: string]: any }
>({
  page,
  getData,
}: Params) => {
  const nextJSGetStaticProps = async (
    context: GetStaticPropsContext<PageEntryProps, ContextProps>
  ) => {
    if (!getData)
      throw new Error(
        `Page ${utils.formatPageNameWithParams(
          page,
          context?.params as ContextProps
        )} is missing getData`
      );

    const preview = PREVIEW_MODE_DEFAULT || Boolean(context.preview);
    try {
      const pageEntry = (await getData({
        ...context,
        preview,
      })) as PageEntryProps;

      if (pageEntry.notFound) {
        return {
          notFound: true,
        };
      }
      return {
        // convertUndefinedToNull is required for SSG
        // SSG can't serialize undefined to JSON
        props: {
          ...(utils.convertUndefinedToNull(pageEntry) as PageEntryProps),
          preview,
        },
      };
    } catch (error) {
      if (error instanceof Error) {
        const handled = CustomErrorHandler(error);
        if (handled) {
          return handled;
        }
      }
      throw error;
    }
  };

  return nextJSGetStaticProps;
};
