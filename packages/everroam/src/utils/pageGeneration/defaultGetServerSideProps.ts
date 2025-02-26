import type { GetServerSidePropsContext } from "next";

import * as utils from "./utils";
import type { ContextProps } from "./defaultGetStaticProps";
import { CustomErrorHandler } from "./CustomError";
import { PREVIEW_MODE_DEFAULT } from "env";

export interface Params {
  page: string;
  getData: (
    context: GetServerSidePropsContext<ContextProps>
  ) => Promise<unknown> | unknown;
  scripts?: {
    pipedata?: boolean;
  };
}

export const defaultGetServerSideProps = <
  PageEntryProps extends { [key: string]: any }
>({
  page,
  getData,
  scripts = {},
}: Params) => {
  const nextJSGetServerSideProps = async (
    context: GetServerSidePropsContext<PageEntryProps, ContextProps>
  ) => {
    if (!getData) {
      throw new Error(
        `Page ${utils.formatPageNameWithParams(
          page,
          context?.params as ContextProps
        )} is missing getData`
      );
    }

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
          ...scripts,
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
  return nextJSGetServerSideProps;
};
