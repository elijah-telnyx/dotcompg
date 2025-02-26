/* eslint-disable @typescript-eslint/no-var-requires */
const http = require("http");
const fs = require("fs");
const { CronJob } = require("cron");

// every */x minutes every day -- account for time to match cache status by server status and to update (purge) cache
const MONITOR_CRON_INTERVAL = "*/3 0-23 * * *"; // https://crontab.guru/#*/2_0-23_*_*_*

const URLS = {
  health: "/health",
  metrics: "/metrics",
  index: "/public/index.html",
  cacheStatus:
    "https://us-east-1.telnyxcloudstorage.com/telnyx-dotcom-cache-monitor/status.json",
  cloudflareCachePurge: (zoneId) =>
    `https://api.cloudflare.com/client/v4/zones/${zoneId}/purge_cache`,
  serverStatus: "https://telnyx.com/api/ready",
};

const STATUS_MAP = {
  pending: "pending",
  purged: "purged",
};

const STATUS_SLACK_CHANNEL_ID = "C04S2BEBDL2";
const ERROR_SLACK_CHANNEL_ID = "C017NHPS2NR";

function getHeaders(token) {
  return {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  };
}

const PORT = process.env.PORT || 4029;

const requestListener = function (req, res) {
  req.on("error", (err) => {
    console.error(err);
    res.writeHead(400);
    res.end("Bad Request");
    return;
  });

  res.on("error", (err) => {
    console.error(err);
    console.log(err.stack);
    res.end("");
    return;
  });

  function setAccessHeaders() {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type"
    );
  }

  if (req.method === "OPTIONS") {
    setAccessHeaders();
    res.setHeader("Access-Control-Max-Age", 1728000);
    res.setHeader("Content-Type", "text/plain charset=UTF-8");
    res.setHeader("Content-Length", 0);
    res.writeHead(204);
    res.end("");
    return;
  }

  if (req.url === URLS.health && req.method === "GET") {
    setAccessHeaders();
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "no-cache");
    res.writeHead(200);
    res.end("");
    return;
  }

  fs.readFile(`./${URLS.index}`, (err, data) => {
    if (!err && req.url === "/" && req.method === "GET") {
      setAccessHeaders();
      res.setHeader("Content-Type", "text/html; charset=UTF-8");
      res.writeHead(200);
      res.end(data);
    } else {
      res.writeHead(404);
      res.end("Not Found");
    }
  });
};

async function purgeCache() {
  try {
    console.log("purging cache...");
    const response = await fetch(
      URLS.cloudflareCachePurge(process.env.CLOUDFLARE_ZONE_ID),
      {
        method: "POST",
        headers: getHeaders(process.env.CLOUDFLARE_API_KEY),
        body: JSON.stringify({ purge_everything: true }),
      }
    ).then((res) => res.json());

    console.log(response);
    console.log("cache purged");
  } catch (error) {
    console.error("Error purging cache");
    console.error(error);
  }
}

async function getCacheStatus() {
  try {
    /** @type { { version: string; status: "purged" | "pending"; } } */
    const data = await fetch(URLS.cacheStatus, {
      method: "GET",
      headers: getHeaders(process.env.PORTAL_API_V2_KEY),
    }).then((res) => res.json());

    return data;
  } catch (error) {
    console.error("Error fetching cache status");
    console.error(error);
  }
}

async function getServerStatus() {
  try {
    /** @type { { version: string; environment: "production" | "staging"; } } */
    const data = await fetch(URLS.serverStatus, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    return data;
  } catch (error) {
    console.error("Error fetching server status");
    console.error(error);
  }
}

/**
 * @param {string} version string
 * @param {"pending" | "purged"} status "pending" | "purged"
 * */
async function updateStatus(version, status) {
  try {
    console.log("Updating status...");
    await fetch(URLS.cacheStatus, {
      method: "PUT",
      headers: getHeaders(process.env.PORTAL_API_V2_KEY),
      body: JSON.stringify({
        version,
        status,
      }),
    });
    console.log("Cache status updated");
  } catch (error) {
    console.error("Error updating cache status");
    console.error(error);
  }
}

/**
 * @param {{ text: string; channel: string }} details { text: string; channel: string }
 * */
async function postMessageToSlack(details) {
  try {
    console.log("Posting message to slack...");
    await fetch("https://slack.com/api/chat.postMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SLACK_OAUTH_TOKEN}`,
      },
      body: JSON.stringify(details),
    });
    console.log("Slack message posted");
  } catch (error) {
    console.error("Error posting message to slack");
    console.error(error);
  }
}

async function check() {
  try {
    const cacheData = await getCacheStatus();
    const serverData = await getServerStatus();

    if (!cacheData || !serverData) {
      throw new Error("No data returned from status checks");
    }

    console.log("cache data: " + JSON.stringify(cacheData));
    console.log("server data: " + JSON.stringify(serverData));

    if (cacheData.version && serverData.version) {
      if (
        cacheData.status === STATUS_MAP.pending &&
        cacheData.version === serverData.version
      ) {
        console.log("Latest server version cache not purged");

        await purgeCache();
        await updateStatus(serverData.version, STATUS_MAP.purged);
        await postMessageToSlack({
          token: process.env.SLACK_OAUTH_TOKEN,
          channel: STATUS_SLACK_CHANNEL_ID,
          text: `:white_check_mark: Cloudflare Cache cleared for version ${serverData.version}`,
        });
      } else if (cacheData.version !== serverData.version) {
        console.log("cache version outdated");

        await updateStatus(serverData.version, STATUS_MAP.pending); // always update to `pending` on new version
      }
    } else {
      throw new Error("No version returned from status checks");
    }
  } catch (error) {
    console.error("Error on cache monitor check");
    console.error(error);
    await postMessageToSlack({
      token: process.env.SLACK_OAUTH_TOKEN,
      channel: ERROR_SLACK_CHANNEL_ID,
      text: `:no_entry: Error on telnyxdotcom Cache monitor check for version ${serverData.version}`,
    });
  }
}

const server = http.createServer(requestListener);
/** @type { CronJob } */
let cronJob;

const teardown = function () {
  console.log("Shutting down");
  cronJob?.stop();
  server.close();
};

server.listen(PORT, () => {
  console.log(`Running at ${PORT}: ${process.env.RUNTIME_ENV}`);

  if (cronJob) {
    console.log("Stopping existing cron job");
    cronJob.stop();
  }

  console.log("No checks running");
  // DOTCOM-3405: Disable cron job
  // cronJob = CronJob.from({
  //   cronTime: MONITOR_CRON_INTERVAL,
  //   onTick: check,
  //   start: true,
  // });

  // check();
  // console.log("---");
  // console.log(`CronJob started: ${cronJob.running}`);
  // console.log(`CronJob cronTime: ${cronJob.cronTime.source}`);
});

process.on("exit", function () {
  console.log("Received exit");
  teardown();
});
process.on("SIGINT", function () {
  console.log("Received SIGINT. Press Control-D to exit.");
  teardown();
});
process.on("SIGTERM", teardown);
