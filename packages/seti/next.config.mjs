//#region Build Configuration
const OUTPUT_STATIC = String(process.env.NEXT_PUBLIC_OUTPUT_STATIC || "false");

const locales = ["en-US"];
const defaultLocale = "en-US";
// end necessary -------------------------------->

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
};

export default OUTPUT_STATIC === "true"
  ? async () => EXPORT_ENVIROMENT_NEXT_CONFIG
  : async () => nextConfig;
//#endregion
