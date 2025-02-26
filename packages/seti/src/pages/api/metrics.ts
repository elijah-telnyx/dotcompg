// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PAGES } from "data/pages";
import type { NextApiHandler } from "next";
import {
  CONSTRAINT_RANGE_DAYS,
  getDashboardPanels,
  PRECISION,
} from "utils/dashboards";

export type MetricsData = {
  [heading: string]: { [chartHeading: string]: string };
};

export type MetricsResponse =
  | {
      status: "success";
      start?: string;
      end?: string;
      data: MetricsData;
    }
  | {
      status: "error";
      message: string;
    };

const handler: NextApiHandler<MetricsResponse> = async (req, res) => {
  const page = req.query.page?.toString() as keyof typeof PAGES;

  try {
    if (!page || !PAGES[page]) {
      throw new Error(`Failed to load metrics for page ${page}`);
    }

    const endDate = new Date();
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - CONSTRAINT_RANGE_DAYS);
    const data: MetricsData = {};

    for (const section of PAGES[page].sections) {
      const panels = await getDashboardPanels({
        code: section.code,
        start: startDate.toISOString(),
        end: endDate.toISOString(),
      }).then((panels) =>
        panels.reduce(
          (acc, { chart }) =>
            chart?.heading && chart.controls.data?.length
              ? {
                  ...acc,
                  [chart.heading]:
                    chart.controls.data[0].time === "now"
                      ? // @ts-expect-error `suffix` property is not being recognized here
                        chart.controls.suffix === "%"
                        ? `${Number(chart.controls.data[0].value * 100).toFixed(
                            PRECISION
                          )}%`
                        : `${Number(chart.controls.data[0].value).toFixed(
                            PRECISION
                          )}`
                      : chart.controls.data,
                }
              : acc,
          {}
        )
      );

      data[section.heading] = panels;
    }

    res.status(200).json({
      status: "success",
      start: startDate.toISOString(),
      end: endDate.toISOString(),
      data,
    });
  } catch (e) {
    console.error(e);
    return res.status(400).json({
      status: "error",
      message: "Bad Request",
    });
  }
};
export default handler;
