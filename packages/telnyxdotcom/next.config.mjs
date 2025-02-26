import {
  OUTPUT_STATIC,
  DISABLE_IN_MEMORY_CACHE,
  REDIRECTS_ENTRY,
  PHASE_PRODUCTION_BUILD,
  PHASE_DEVELOPMENT_SERVER,
  locales,
  defaultLocale,
} from './nextConfig/constants.mjs';
import { ContentfulClient } from './nextConfig/contentfulClient.mjs';
import buildData from './nextConfig/buildData.mjs';
import buildTypes from './nextConfig/buildTypes.mjs';

let hasBuildData = false;
let hasBuildTypes = false;

/** @type {import('next').NextConfig} */
const EXPORT_ENVIRONMENT_NEXT_CONFIG = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  output: 'export',
  reactStrictMode: true,
  staticPageGenerationTimeout: 300,
  experimental: {
    externalDir: true,
  },
  images: {
    unoptimized: true,
  },
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales,
    defaultLocale,
  },
  experimental: {
    externalDir: true,
    // https://telnyx.atlassian.net/browse/DOTCOM-3209
    ...(DISABLE_IN_MEMORY_CACHE ? { isrMemoryCacheSize: 0 } : {}),
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'same-origin' },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'none'",
          },
        ],
      },
    ];
  },
  async redirects() {
    try {
      console.info('\nSetting up Contentful redirects\n');
      const contentfulRedirects = (await ContentfulClient.getEntry(REDIRECTS_ENTRY)).fields.redirects;

      console.info('\nSuccessfully set Contentful Redirects\n');
      return contentfulRedirects;
    } catch (e) {
      console.error('\nThere was an error setting up Contentful redirects.\n');
      throw e;
    }
  },
  async rewrites() {
    return [
      {
        source: '/.well-known/apple-app-site-association',
        destination: '/api/apple-app-site-association',
      },
      {
        // Taskforce GPT Plugins
        source: '/.well-known/ai-plugin.json',
        destination: 'https://portal.telnyx.com/downloads/openai_manifests/telnyx-plugin-manifest.json',
      },
      {
        // Marketo Proxy
        source: '/marketo/:slug*',
        destination: 'https://app-ab20.marketo.com/:slug*',
      },
      {
        // Marketo Submit Proxy
        source: '/index.php/leadCapture/save2',
        destination: 'https://app-ab20.marketo.com/index.php/leadCapture/save2',
      },
      {
        // Munchkin Proxy
        source: '/munchkin.js',
        destination: 'https://munchkin.marketo.net/munchkin.js',
      },
      {
        // LLMs Proxy
        source: '/llms.txt',
        destination: 'https://us-central-1.telnyxstorage.com/media-assets/llms.txt',
      },
    ];
  },
};

export default OUTPUT_STATIC === 'true'
  ? async () => {
      await buildData({ isPreview: true });
      await buildTypes();
      return EXPORT_ENVIRONMENT_NEXT_CONFIG;
    }
  : async (phase) => {
      if (!hasBuildData && (phase === PHASE_PRODUCTION_BUILD || phase === PHASE_DEVELOPMENT_SERVER)) {
        await buildData({ isPreview: process.env.NEXT_PUBLIC_RUNTIME_ENV !== 'production' });
        hasBuildData = true;
      }

      if (!hasBuildTypes && (phase === PHASE_PRODUCTION_BUILD || phase === PHASE_DEVELOPMENT_SERVER)) {
        await buildTypes();
        hasBuildTypes = true;
      }

      return nextConfig;
    };
