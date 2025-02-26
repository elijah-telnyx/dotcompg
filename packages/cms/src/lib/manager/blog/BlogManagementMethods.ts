import { DEFAULT_LANGUAGE } from "../../../constants/languages";
import { Category, Topic } from "../../types";
import { BlogManagementClient } from "./BlogManagementClient";

interface Options {
  contentTypeId: string;
  fields: Record<string, string>;
  language?: string;
}
export const createEntry = ({
  contentTypeId,
  fields,
  language = DEFAULT_LANGUAGE,
}: Options) =>
  BlogManagementClient.entry.create(
    {
      contentTypeId,
    },
    {
      fields: {
        ...Object.entries(fields).reduce((acc, [key, value]) => {
          acc[key] = { [language]: value };

          return acc;
        }, {} as Record<string, Record<typeof language, string>>),
      },
    }
  );

export const getCategories = () => {
  return BlogManagementClient.entry
    .getMany<Category>({
      query: { content_type: "rcCategory" },
    })
    .then((entries) => {
      return {
        total: entries.total,
        items: entries.items.map((entry) => {
          return {
            sys: {
              linkType: entry.sys.type,
              contentType: entry.sys.contentType.sys.id,
              id: entry.sys.id,
            },
            ...Object.entries(entry.fields).reduce((acc, [key, value]) => {
              acc[key as keyof Category] = value[DEFAULT_LANGUAGE];
              return acc;
            }, {} as Record<keyof Category, Category[keyof Category]>),
          };
        }),
      };
    });
};

export const getTopics = () => {
  return BlogManagementClient.entry
    .getMany<Topic>({
      query: { content_type: "rcTopic" },
    })
    .then((entries) => {
      return {
        total: entries.total,
        items: entries.items.map((entry) => {
          return {
            sys: {
              linkType: entry.sys.type,
              contentType: entry.sys.contentType.sys.id,
              id: entry.sys.id,
            },
            ...Object.entries(entry.fields).reduce((acc, [key, value]) => {
              acc[key as keyof Topic] = value[DEFAULT_LANGUAGE];
              return acc;
            }, {} as Record<keyof Topic, Topic[keyof Topic]>),
          };
        }),
      };
    });
};
