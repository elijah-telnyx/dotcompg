/* eslint-disable @typescript-eslint/no-var-requires */
// https://prometheus.io/docs/practices/naming/

const SERVICE_NAME = "telnyxdotcom_e2e";

const prometheusClient = require("prom-client");

const pagesTotal = new prometheusClient.Gauge({
  name: `${SERVICE_NAME}_http_request_pages_total`,
  help: "the amount of pages covered",
});

const browsersTotal = new prometheusClient.Gauge({
  name: `${SERVICE_NAME}_http_request_browsers_total`,
  help: "the amount of browsers covered",
});

const pageSectionsTotal = new prometheusClient.Gauge({
  name: `${SERVICE_NAME}_http_request_page_sections_total`,
  help: "the amount of page sections covered",
  labelNames: ["page", "browser", "state"],
});

const pageDurationSeconds = new prometheusClient.Gauge({
  name: `${SERVICE_NAME}_http_request_page_duration_seconds`,
  help: "the amount of time to finish page coverage in seconds",
  labelNames: ["page", "browser", "section"],
});

function registerMetrics(report) {
  pagesTotal.set(report.suites.length);
  browsersTotal.set(report.config.projects.length);

  report.suites.forEach(({ suites }) => {
    suites.forEach((suite) => {
      suite.specs.forEach((spec) => {
        spec.tests.forEach((test) => {
          pageDurationSeconds.set(
            {
              page: suite.title,
              browser: test.projectName,
              section: spec.title,
            },
            Number(test.results[0].duration / 1000)
          );
          pageSectionsTotal.inc(
            {
              page: suite.title,
              browser: test.projectName,
              state: "UP",
            },
            Number(test.status === "expected")
          );
          pageSectionsTotal.inc(
            {
              page: suite.title,
              browser: test.projectName,
              state: "FLAKY",
            },
            Number(test.status === "flaky")
          );
          pageSectionsTotal.inc(
            {
              page: suite.title,
              browser: test.projectName,
              state: "DOWN",
            },
            Number(
              test.status === "unexpected" &&
                test.results[0].status === "failed"
            )
          );

          pageSectionsTotal.inc(
            {
              page: suite.title,
              browser: test.projectName,
              state: "TIMEOUT",
            },
            Number(
              test.status === "unexpected" &&
                test.results[0].status === "timedOut"
            )
          );
        });
      });
    });
  });

  return prometheusClient.register;
}

module.exports = registerMetrics;
