import type { NextApiHandler } from "next";
import { STATUS_SUCCESSFUL } from "../../../constants/ApiStatus";
import { DEFAULT_LANGUAGE } from "../../../constants/languages";
import cmsData from "../../../contentful-upload-test.json";
import { BlogManagementClient } from "../../../lib/manager/blog/BlogManagementClient";
import {
  getCategories,
  getTopics,
} from "../../../lib/manager/blog/BlogManagementMethods";
interface SuccessfulResponse {
  status: string;
  data: any;
}

interface ErrorResponse {
  status: string;
  message: string;
}

export type EntryResponse = SuccessfulResponse | ErrorResponse;

const findValue = (fieldList: any[]) => (fieldValue: string) => {
  const newFieldValue = fieldList.find((field) => {
    const fieldName = field.name.toLowerCase();
    const toUpdateFieldName = fieldValue.toLowerCase();
    const toUpdateFieldNameWithAnd = toUpdateFieldName.replace("&", "and");

    return (
      fieldName === toUpdateFieldName || fieldName === toUpdateFieldNameWithAnd
    );
  });

  if (!newFieldValue) {
    return;
  }

  return {
    [DEFAULT_LANGUAGE]: {
      sys: {
        id: newFieldValue.sys.id,
        type: newFieldValue.sys.contentType,
        linkType: newFieldValue.sys.linkType,
      },
    },
  };
};

const updateBlogEntry = (
  { Slug, Category, Topic }: (typeof cmsData)[number],
  { findCategory, findTopic }: Record<string, ReturnType<typeof findValue>>,
  { publish = false }: { publish: boolean }
) => {
  return BlogManagementClient.entry
    .getMany({
      query: { content_type: "rcPost", "fields.slug": Slug },
    })
    .then(async (entries) => {
      if (entries.total === 0) {
        console.log(`No entries for slug: ${Slug}`);
        return;
      }

      const entry = entries.items[0];
      const entryCategory =
        entry.fields?.category && entry.fields.category[DEFAULT_LANGUAGE].sys;
      const entryTopic =
        entry.fields?.topic2 && entry.fields.topic2[DEFAULT_LANGUAGE].sys;

      let skip = 0;

      const category = findCategory(Category);

      if (!category) {
        console.log(`No category found for slug: ${Slug}`);
      } else if (entryCategory.id === category[DEFAULT_LANGUAGE].sys.id) {
        skip++;
      } else {
        entry.fields.category = category;
      }

      const topic = findTopic(Topic);

      if (!topic) {
        console.log(`No topic found for slug: ${Slug}`);
      } else if (entryTopic?.id === topic[DEFAULT_LANGUAGE].sys.id) {
        skip++;
      } else {
        entry.fields.topic2 = topic;
      }

      if (skip === 2) {
        let published;
        if (publish) {
          published = await BlogManagementClient.entry.publish(
            { entryId: entry.sys.id },
            entry
          );
        }
        return {
          slug: Slug,
          skipped: "Entry skipped",
          published: Boolean(published),
        };
      }

      try {
        let published;
        await BlogManagementClient.entry
          .update({ entryId: entry.sys.id }, entry)
          .then(async (updatedEntry) => {
            if (publish) {
              // to be able to publish an entry, it must be in the same version
              published = await BlogManagementClient.entry.publish(
                { entryId: updatedEntry.sys.id },
                updatedEntry
              );
            }
          });

        return {
          slug: Slug,
          success: "Entry updated",
          hasCategory: !category ? false : true,
          hasTopic: !topic ? false : true,
          published: Boolean(published),
        };
      } catch (error) {
        return {
          slug: Slug,
          message: "Error updating entry",
          error,
        };
      }
    });
};

const handler: NextApiHandler<EntryResponse> = async (req, res) => {
  const [topics, categories] = await Promise.all([
    getTopics(),
    getCategories(),
  ]);

  const findTopic = findValue(topics.items);
  const findCategory = findValue(categories.items);

  // Filter out entries that don't have a category or topic
  const filteredCMSData = cmsData.filter(
    ({ Category, Topic }) => Category || Topic
  );

  const MAX_AT_TIME = 5;
  let counter = 0;
  let start = 0;
  let end = 1;

  const numberOfRuns = filteredCMSData.length / MAX_AT_TIME;

  let data: any[] = [];

  // Update entries in batches to avoid rate limit blocking
  while (counter <= numberOfRuns) {
    const batchData = await Promise.all(
      filteredCMSData.slice(start, end).map((blogEntry) =>
        updateBlogEntry(
          blogEntry,
          { findCategory, findTopic },
          {
            publish:
              (Boolean(blogEntry.Category) || Boolean(blogEntry.Topic)) &&
              blogEntry.status === "published",
          }
        )
      )
    );
    start = end + 1;
    end += MAX_AT_TIME;

    data = [...data, ...batchData];

    counter++;
  }

  return res.status(STATUS_SUCCESSFUL.code).json({
    status: STATUS_SUCCESSFUL.status,
    data,
  });
};
export default handler;
