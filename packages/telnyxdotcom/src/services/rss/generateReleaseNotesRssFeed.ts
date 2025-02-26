import fs from 'fs';
import { getClient } from 'lib/Contentful';
import type { ReleaseNoteItem } from 'lib/Contentful/types';
import { BASE_URL } from 'env';
import RSS from 'rss';
import type { EntryCollection } from 'contentful';

async function getAllReleaseNotesItems({ preview = false }) {
  const response = await getClient({ blog: true, preview })
    .getEntries<ReleaseNoteItem>({
      content_type: 'componentReleaseNotesItem',
      order: '-fields.publishDate',
      limit: 1000,
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });

  return response.items;
}

/**
 * Generates an rss.xml file from the given entries
 * @param {Array<Entry>} items Array of Contentful Entries (release notes items)
 */
function writeReleaseNotesRSS(items: EntryCollection<ReleaseNoteItem>['items']) {
  const currentYear = new Date().getFullYear();

  const feed = new RSS({
    title: 'Telnyx release notes',
    description: 'Release notes from Telnyx services',
    feed_url: `${BASE_URL}/rss.xml`,
    site_url: BASE_URL,
    language: 'en',
    copyright: `All rights reserved ${currentYear}, Telnyx LLC`,
  });

  items.forEach(({ fields }) => {
    const imageUrl = fields?.image?.fields?.file.url;
    const imagePath = imageUrl && `https:${imageUrl}`;
    const url = `${BASE_URL}/release-notes/${fields.slug}`;

    const item = {
      title: fields.title,
      guid: url,
      url: url,
      description: fields.text,
      author: fields.authors?.map(({ fields }) => fields.name.trim()).join(', '), // package doesn't support multiple authors
      date: new Date(fields.publishDate),
    };

    feed.item(imagePath ? { ...item, enclosure: { url: imagePath } } : item);
  });

  return feed.xml();
}

export async function generateReleaseNotesRssFeed() {
  const releaseNotes = await getAllReleaseNotesItems({ preview: false });
  const rss = writeReleaseNotesRSS(releaseNotes);

  fs.writeFileSync('public/rss.xml', rss);
}
