# e2e: End-to-end testing for telnyxdotcom

## Intro

This package uses `playwright` for the testing. You'll need to create a `.env` file for the tests using the setup script:

```shell
npm run env:local
```

use [Mailgun API](https://documentation.mailgun.com/en/latest/api-events.html#viewing-stored-messages) to check test account email inbox in automated tests. If you want to use a free email instead, `protonmail.com` has been added to the domains whitelist for `dev.telnyx.com` and `dotcom.squad@telnyx.company` email account creds are available in 1password.

You can run the tests by `npm run start`.

If you are not familiar with Playwright please take a moment to read the [docs](https://playwright.dev/docs/intro). This package makes use of its runner `matchers` and `expect` to help with writing the tests.

## Development

To run this project locally, first install all dependencies. Open a terminal in the monorepo root and run:

```shell
npm install
```

Now open `packages/e2e` directory and run:

```shell
npm run setup:local
```

This will define the `process.env` with local development Environment Variables, and install Playwright with it's dependencies. After it, run

```shell
npm run build
```

This will run all test suites and build `inline` (terminal stdout), `JSON` and `HTML` file reports. See [playwright config](playwright.config.ts)

After result HTML and reports are done, run:

```shell
npm run start
```

To start a node HTTP server running at http://localhost:4029 by default.

### Watch mode

If you want to run tests on watch mode, add the following ENV to dotenv file:

```shell
PWTEST_WATCH=1
```

This will prevent test run from closing and will present interative options. Reports won't be generated on watch mode.

## Test Snapshots

To update snapshots you need to run a docker build. Snapshots have subtle difference on fonts and spacing based on the Target OS running. See [related issues](#related-issues):

### Related issues

- https://github.com/microsoft/playwright/issues/7548
- https://github.com/microsoft/playwright/issues/12683
- https://github.com/microsoft/playwright/issues/13466
- https://github.com/microsoft/playwright/issues/14218

To update snapshots, first [setup envs](#development) then build a docker image with:

```shell
make build
```

If you receive docker errors on env missing, make sure your envs are exported by running each:

```shell
export E2E_PLAYWRIGHT_WORKERS=3
export E2E_AJS_USER_ID=1
export PORT=4029
...
```

After the image is built, run a docker container passing the runtime envs with:

```shell
docker run -e NODE_ENV=production -e RUNTIME_ENV=production -e PORT=4029 --name telnyxdotcom-e2e  -p 4029:4029 -d registry.internal.telnyx.com/jenkins/telnyxdotcom-e2e:red
```

Now copy generated snapshots from the docker build files with the command:

```shell
make update-snapshots
```

## Test suites

Tests suites are available inside `src/` folder. Each file is a page tested

## Metrics and Reporting

For CI this project outputs test reports in HTML. the HTML assets are then deploying along and exposed in a private URL under Telnyx VPN.

This project uses a [Prometheus client](https://prometheus.io/docs/instrumenting/clientlibs/) to expose metrics under a /metrics endpoint using a custom playwrite reporter using [Node.js Prom Client](https://github.com/siimon/prom-client)

## What next?

The focus of the project right now is to be able to run the tests on you localhost. In-order for us to run the tests on CI/CD we have to tackle the following roadblocks.

- ~~Frequency and the time of tests~~
- ~~How to ignore e2e page visits in Analytics~~
- What are the additional a11y tags we need for telnyx.com pages
- How to rerun tests failed at any time through `server.js` running at Consul URL and Port
