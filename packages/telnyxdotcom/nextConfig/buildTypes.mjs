// packages/telnyxdotcom/nextConfig/buildTypes.mjs
import { Octokit } from '@octokit/rest';
import { ESLint } from 'eslint';
import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_FOLDER_PATH = 'src/constants/generatedAtBuild';
const CONTENT_PREFIX = '/* eslint-disable @typescript-eslint/ban-types */\n';

/**
 * this is due to type inference where the types are inferred due to the module being the same as the imported type from npm
 * @param {string} text
 */
const getNamespace = (text) => text.replace(new RegExp("'@strapi/strapi'", 'g'), `'@strapi/types'`);

const getDataFilesToCheckExistence = async () => {
  const files = await fs.readdir('./' + DATA_FOLDER_PATH);
  return (name) => {
    return files.includes(name);
  };
};

/**
 * We generate types from Strapi from the CMS repo.
 * To do this we need a github token that comes from https://github.com/settings/personal-access-tokens
 *
 * @link https://github.com/settings/personal-access-tokens
 * @ref https://telnyx.slack.com/archives/C0179536KU7/p1736179368179769
 */
export default async function buildTypes() {
  if (!process.env.STRAPI_GITHUB_REPO_TOKEN) {
    console.error('❌ STRAPI_GITHUB_REPO_TOKEN environment variable is required');
    process.exit(1);
  }

  const octokit = new Octokit({
    auth: process.env.STRAPI_GITHUB_REPO_TOKEN,
  });

  try {
    console.info('╭───── Types build started');
    console.info('│');

    const checkIfExists = await getDataFilesToCheckExistence();

    if (checkIfExists('contentTypes.d.ts') && checkIfExists('components.d.ts')) {
      console.info(`│   ▸ contentTypes.d.ts and components.d.ts already exist, skipping generation`);
      console.info('│');
      console.info('╰───── Types build complete\n');
      return;
    }

    console.info(`│   ▸ Generating Strapi contentTypes.d.ts`);

    const { data } = await octokit.repos.getContent({
      owner: 'team-telnyx',
      repo: 'telnyxdotcom-strapi',
      path: 'types/generated/contentTypes.d.ts',
    });

    if (!('content' in data)) {
      throw new Error('contentTypes.d.ts - No content found in response');
    }

    const content = Buffer.from(data.content, 'base64').toString();
    const targetDir = join(__dirname, '..', ...DATA_FOLDER_PATH.split('/'));

    await fs.writeFile(join(targetDir, 'contentTypes.d.ts'), CONTENT_PREFIX + getNamespace(content));

    console.info(`│   ▸ Generating Strapi components.d.ts`);

    const { data: componentData } = await octokit.repos.getContent({
      owner: 'team-telnyx',
      repo: 'telnyxdotcom-strapi',
      path: 'types/generated/components.d.ts',
    });

    if (!('content' in componentData)) {
      throw new Error('components.d.ts - No content found in response');
    }

    const componentContent = Buffer.from(componentData.content, 'base64').toString();
    const componentTargetDir = join(__dirname, '..', ...DATA_FOLDER_PATH.split('/'));

    await fs.writeFile(join(componentTargetDir, 'components.d.ts'), CONTENT_PREFIX + getNamespace(componentContent));

    console.info('│   ▸ Running linter on generated files');
    const eslint = new ESLint({
      fix: true,
    });
    await ESLint.outputFixes(await eslint.lintFiles(`${DATA_FOLDER_PATH}/**.d.ts`));
  } catch (error) {
    console.error('❌ Error generating types:', error.message);
    process.exit(1);
  }

  console.info('│');
  console.info('╰───── Types build complete\n');
}
