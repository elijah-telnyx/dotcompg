const fs = require("fs");

fs.readFile(".lighthouseci/report.json", "utf8", (err, data) => {
  if (err) throw err;

  /** @type {import('./.lighthouseci/report.json')} */
  const jsonFile = JSON.parse(data);

  // The id from channel #dotcom-lighthouse-reports
  const channelID = "C04UT4KCV08";
  // it's localhost because this implies target site is built locally

  const hasPassed = (score) =>
    score > 0.5 ? (score > 0.89 ? "✅" : "🟡") : "❌";

  const testResults = `
URL: ${jsonFile.finalDisplayedUrl}

Categories:
${hasPassed(jsonFile.categories.performance.score)} | Performance: ${
    jsonFile.categories.performance.score
  }
${hasPassed(jsonFile.categories.accessibility.score)} | Accessibility: ${
    jsonFile.categories.accessibility.score
  }
${hasPassed(jsonFile.categories["best-practices"].score)} | Best Practices: ${
    jsonFile.categories["best-practices"].score
  }
${hasPassed(jsonFile.categories.seo.score)} | SEO: ${
    jsonFile.categories.seo.score
  }

Audits:
${hasPassed(jsonFile.audits["first-contentful-paint"].score)} | ${
    jsonFile.audits["first-contentful-paint"].title
  }: ${jsonFile.audits["first-contentful-paint"].displayValue}
${hasPassed(jsonFile.audits["largest-contentful-paint"].score)} | ${
    jsonFile.audits["largest-contentful-paint"].title
  }: ${jsonFile.audits["largest-contentful-paint"].displayValue}
${hasPassed(jsonFile.audits["total-blocking-time"].score)} | ${
    jsonFile.audits["total-blocking-time"].title
  }: ${jsonFile.audits["total-blocking-time"].displayValue}
${hasPassed(jsonFile.audits["cumulative-layout-shift"].score)} | ${
    jsonFile.audits["cumulative-layout-shift"].title
  }: ${jsonFile.audits["cumulative-layout-shift"].displayValue}
${hasPassed(jsonFile.audits["speed-index"].score)} | ${
    jsonFile.audits["speed-index"].title
  }: ${jsonFile.audits["speed-index"].displayValue}
`;

  fs.writeFileSync("lighthouse_results.md", testResults, "utf8");

  const details = {
    channel: channelID,
    token: process.env.SLACK_OAUTH_TOKEN,
    text: `Lighthouse — <https://review.telnyx.com/lighthouse/${process.env.VERSION}/report.json|${process.env.VERSION}>

${testResults}`,
  };

  const postMessageToSlack = async () => {
    await fetch("https://slack.com/api/chat.postMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${details.token}`,
      },
      body: JSON.stringify(details),
    });
  };

  try {
    postMessageToSlack();
    console.log(testResults);
  } catch (error) {
    console.log(error);
  }
});
