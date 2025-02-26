# telnyx.com cache monitor

Goal is to monitor the telnyx.com cache clearance and status (HIT, Miss, Stale)

### Installation

```
$ npm install
```

### Local Development

1. Load tokens need to build website

```
$ cp .env.local .env
```

> remember to update your `.env` file according to 1Password (github organization token)

2. Inject token into local environment variables (terminal) for builds

```
$ source setup-env.sh
```

4. This command starts a local development server

```
$ npm run start
```
