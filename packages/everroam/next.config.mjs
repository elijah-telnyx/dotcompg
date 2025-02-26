//#region Build Configuration
const OUTPUT_STATIC = String(process.env.NEXT_PUBLIC_OUTPUT_STATIC || "false");
const DISABLE_IN_MEMORY_CACHE =
  String(process.env.DISABLE_IN_MEMORY_CACHE) === "true";

// necessary cause `import { PHASE_PRODUCTION_BUILD, ... } from 'next/constants' fails for this .mjs file
const PHASE_PRODUCTION_BUILD = "phase-production-build";
const PHASE_DEVELOPMENT_SERVER = "phase-development-server";
const locales = ["en-US"];
const defaultLocale = "en-US";
// end necessary -------------------------------->

let hasBuildData = false;

/** @type {import('next').NextConfig} */
const EXPORT_ENVIROMENT_NEXT_CONFIG = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  output: "export",
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
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "same-origin" },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'none'",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/.well-known/apple-app-site-association",
        destination: "/api/apple-app-site-association",
      },
      {
        // Taskforce GPT Plugins
        source: "/.well-known/ai-plugin.json",
        destination:
          "https://portal.telnyx.com/downloads/openai_manifests/telnyx-plugin-manifest.json",
      },
      {
        // Marketo Proxy
        source: "/marketo/:slug*",
        destination: "https://app-ab20.marketo.com/:slug*",
      },
      {
        // Marketo Submit Proxy
        source: "/index.php/leadCapture/save2",
        destination: "https://app-ab20.marketo.com/index.php/leadCapture/save2",
      },
      {
        // Munchkin Proxy
        source: "/munchkin.js",
        destination: "https://munchkin.marketo.net/munchkin.js",
      },
    ];
  },
};

export default OUTPUT_STATIC === "true"
  ? async () => EXPORT_ENVIROMENT_NEXT_CONFIG
  : async () => nextConfig;
//#endregion
