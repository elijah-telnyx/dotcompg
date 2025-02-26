import fs from 'fs/promises';
import { ContentfulClient, ContentfulPreviewClient } from './contentfulClient.mjs';
import flattenEntry from './flattenEntry.mjs';

const COST_CODES_URL = 'http://billing.query.prod.telnyx.io:8080/v2/public/unprotected/cost-codes?currency=USD'; // nosemgrep: typescript.react.security.react-insecure-request.react-insecure-request

const DATA_FOLDER_PATH = 'src/constants/generatedAtBuild';

const generateCostCodesData = async () => {
  try {
    console.info('\nSetting up USD Cost Codes\n');

    // nosemgrep: typescript.react.security.react-insecure-request.react-insecure-request
    const data = await fetch(COST_CODES_URL, {
      headers: {
        accept: 'application/json',
      },
    }).then((response) => response.text());

    await fs.writeFile(`${DATA_FOLDER_PATH}/${GENERATED_DATA_FILES.cost_codes.name}`, data);
  } catch (e) {
    console.error('\nThere was an error setting up Cost Codes.\n');
    console.error(JSON.stringify(e));
  }
};

const getDataFilesToCheckExistence = async () => {
  const files = await fs.readdir('./' + DATA_FOLDER_PATH);
  return (name) => {
    return files.includes(name);
  };
};

function getFields({ fields, sys }) {
  return { ...fields, id: sys.id };
}

const headerEntryId = '2I488xRlJCneEl2esvpJJ6';
/**
 * @link https://app.contentful.com/spaces/2vm221913gep/entries/dVFz3ip5q9gHYDrXgMsCC?focusedField=entryTitle
 */
const newHeaderEntryId = 'dVFz3ip5q9gHYDrXgMsCC';

const getHeaderUsedFields = (item) => {
  const { href, id, label, rel, target, referrerPolicy, seeMoreLink } = item;

  return {
    href,
    id,
    label,
    rel,
    target,
    referrerPolicy,
    ...(seeMoreLink && {
      seeMoreLink: {
        id: seeMoreLink.fields.id,
        label: seeMoreLink.fields.label,
        href: seeMoreLink.fields.href,
      },
    }),
  };
};
const formatHeaderResponse = (cmsResponse) => {
  const header = cmsResponse?.fields;

  if (!header?.items) throw new Error(`Error fetching Header ${headerEntryId}`);
  return header.items.map((item) => {
    const navigationItem = getFields(item);
    // dropdown
    if (navigationItem.items?.length) {
      return {
        ...getHeaderUsedFields(navigationItem),
        items: navigationItem.items?.map((item) => getHeaderUsedFields(getFields(item))),
      };
    }
    // link
    return getHeaderUsedFields(navigationItem);
  });
};
const generateHeaderData = async () => {
  try {
    await ContentfulClient.getEntry(headerEntryId, { include: 3 }).then(async (data) => {
      await fs.writeFile(
        `${DATA_FOLDER_PATH}/${GENERATED_DATA_FILES.header.name}`,
        JSON.stringify(formatHeaderResponse(data))
      );
    });
  } catch (error) {
    console.error('\nThere was an error setting up Header Data.\n');
    console.error(JSON.stringify(error));
  }
};

const generateNewHeaderData = async ({ isPreview }) => {
  try {
    const client = isPreview ? ContentfulPreviewClient : ContentfulClient;
    await client.getEntry(newHeaderEntryId, { include: 4 }).then(async (data) => {
      const headerData = await flattenEntry(data);
      await fs.writeFile(
        `${DATA_FOLDER_PATH}/${GENERATED_DATA_FILES.newHeader.name}`,
        JSON.stringify(headerData.items)
      );
    });
  } catch (error) {
    console.error('\nThere was an error setting up the new Header Data.\n');
    console.error(JSON.stringify(error));
  }
};

const footerEntryId = '1VObzQqILMXeCnYR2QbIY8';

export const formatFooterResponse = (data) => {
  if (!data.fields.items) throw new Error(`Error fetching Footer ${footerEntryId}`);

  const navigationItems = data.fields.items.map(getFields).map((data) => {
    return {
      label: data.label,
      items: data.items
        ? data.items.map(getFields).map(({ label, href }) => ({
            label,
            href,
          }))
        : [],
    };
  });

  return navigationItems;
};

export const generateFooterData = async () => {
  try {
    await ContentfulClient.getEntry(footerEntryId, { include: 3 }).then(async (data) => {
      await fs.writeFile(
        `${DATA_FOLDER_PATH}/${GENERATED_DATA_FILES.footer.name}`,
        JSON.stringify(formatHeaderResponse(data))
      );
    });
  } catch (error) {
    console.error('\nThere was an error setting up Header Data.\n');
    console.error(JSON.stringify(error));
  }
};

const GENERATED_DATA_FILES = {
  header: { name: 'header.json', fetchMethod: generateHeaderData },
  newHeader: { name: 'new_header.json', fetchMethod: generateNewHeaderData },
  footer: { name: 'footer.json', fetchMethod: generateFooterData },
  cost_codes: { name: 'cost_codes.json', fetchMethod: generateCostCodesData },
};

export default async function buildData({ isPreview = false } = {}) {
  const checkIfExists = await getDataFilesToCheckExistence();
  console.info('╭───── Data build started');
  console.info('│');
  await Promise.all(
    Object.values(GENERATED_DATA_FILES).map((file) => {
      if (checkIfExists(file.name)) {
        console.info(`│   ▸ ${file.name} already exists, skipping generation`);
      } else {
        console.info(`│   ▸ Generating ${file.name}`);
        return file.fetchMethod({ isPreview });
      }
    })
  ).then(() => {
    console.info('│');
    console.info('╰───── Data build complete\n');
  });
}
