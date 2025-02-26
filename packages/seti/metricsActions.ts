import type { MetricsData, MetricsResponse } from "pages/api/metrics";

const getMetrics = async (): Promise<MetricsResponse> =>
  fetch("https://seti.telnyx.com/api/metrics?page=overview", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

const postMessageToSlack = async (textMetrics: string) =>
  fetch("https://slack.com/api/chat.postMessage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.SLACK_OAUTH_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      channel: "C08DRD7GR60", // #seti-metrics
      token: process.env.SLACK_OAUTH_ACCESS_TOKEN,
      text: `*Week Metrics*

${textMetrics}`,
    }),
  }).then((res) => res.json());

const formatDataToText = (data: MetricsData) =>
  Object.entries(data)
    .reduce(
      (acc, [heading, item]) => `
${acc ? `${acc}\n` : ""}*${heading}*
${Object.entries(item).reduce(
  (acc, [chartHeading, value]) =>
    `${acc ? `${acc}\n` : ""}${chartHeading}: ${value}`,
  ""
)}
`,
      ""
    )
    .trim();

(async function reportMetrics() {
  try {
    const response = await getMetrics();

    if (response.status !== "success") {
      throw new Error("failed to fetch SETI metrics", {
        cause: JSON.stringify(response, null, 2),
      });
    }

    postMessageToSlack(formatDataToText(response.data));
  } catch (error) {
    console.log(error);
  }
})();
