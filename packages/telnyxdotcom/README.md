# telnyxdotcom

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, load tokens need to build website

```bash
npm run setup-env:local
```

> remember to setup vault integration and to update your `.env` file accordingly if you need to adjust target environment or any token

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Review

We use Github Actions to review our changes. On every PR creation, a static (`next export`) version of the website is built

## Deploy

Deploy is done through Jenkins, under Telnyx Infra. See [how to deploy telnyx.com to production](https://app.getguru.com/card/qiEnnqBi/How-to-deploy-telnyxcom-telnyxdotcom-to-production)
