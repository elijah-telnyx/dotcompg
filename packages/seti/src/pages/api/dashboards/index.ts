// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PANELS } from "data/panels";
import type { NextApiHandler } from "next";
import {
  type DashboardsRangeData,
  type DashboardsResponse,
  type TimeRange,
} from "utils/dashboards";
import {
  DEFAULT_FETCH_RANGE_PARAMS,
  formatData,
  formatRatioData,
  formatCombinedData,
  rangeDateISOToUnixTimestamp,
  validateTimeRange,
  calculateStep,
  TIME,
} from "utils/dashboards";

type FetchRangeParams = {
  dedup?: string;
  partial_response?: string;
  max_source_resolution?: string;
  step?: string;
  start?: string;
  end?: string;
  percentage?: boolean;
  stat?: "avg" | "last";
  code: string;
  query: string | undefined;
  id: string;
};

const FETCH_OPTIONS = {
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

function getSearch({
  query,
  dedup = DEFAULT_FETCH_RANGE_PARAMS.dedup,
  partial_response = DEFAULT_FETCH_RANGE_PARAMS.partial_response,
  step = DEFAULT_FETCH_RANGE_PARAMS.step,
  max_source_resolution = DEFAULT_FETCH_RANGE_PARAMS.max_source_resolution,
  start,
  end,
}: FetchRangeParams) {
  if (!query) {
    throw new Error("Invalid query");
  }

  const startTime = rangeDateISOToUnixTimestamp("start", start);
  const endTime = rangeDateISOToUnixTimestamp("end", end);
  const timeDiff = endTime - startTime;
  const adjustedStep =
    timeDiff <= TIME.ONE_HOUR
      ? step
      : calculateStep({ start, end } as TimeRange);

  validateTimeRange(startTime, endTime);

  const params = {
    dedup,
    partial_response,
    step: String(adjustedStep),
    max_source_resolution,
    start: String(startTime),
    end: String(endTime),
  };

  return new URLSearchParams({
    query,
    ...params,
  });
}

async function fetchRange({
  percentage,
  stat,
  query,
  code,
  id,
  ...queryParams
}: FetchRangeParams) {
  return fetch(
    `https://thanos.internal.telnyx.com/api/v1/query_range?${getSearch({
      code,
      id,
      query,
      ...queryParams,
    })}`,
    FETCH_OPTIONS
  ).then<DashboardsRangeData>((res) =>
    res.json().then((data) => ({
      ...data,
      id,
      code,
      percentage,
      stat,
    }))
  );
}

/**
 * Transforms API response data into dashboard data structure
 * @param results - Array of API responses containing dashboard metrics
 * @param panels - Panel configuration object containing layout and chart settings
 * @returns Organized dashboard data with merged panel configs and API data
 */
function transformResultsToDashboardData(
  results: PromiseSettledResult<DashboardsRangeData>[],
  panels: typeof PANELS
): DashboardsResponse["data"] {
  return results.reduce((acc, response) => {
    // Skip failed API responses
    if (response.status === "rejected") {
      console.error(response.reason);
      return acc;
    }

    if (!response.value) {
      console.error(response);
      return acc;
    }

    // Build dashboard structure:
    // 1. Group by response code (e.g., 'networking', 'messaging')
    // 2. Merge existing panel configuration with new items
    // 3. Filter items to match the current response ID
    // 4. Format and inject API data into chart controls
    return {
      ...acc,
      [response.value.code]: {
        ...panels[response.value.code as keyof typeof panels],
        items: [
          // Preserve existing items for this code
          ...(acc[response.value.code as keyof typeof acc]?.items || []),
          // Add new items with formatted chart data
          ...panels[response.value.code as keyof typeof panels].items
            .filter((item) => item.id === response.value.id)
            .map(({ query, ...item }) => ({
              ...item,
              chart: item.chart && {
                ...item.chart,
                controls: {
                  ...item.chart.controls,
                  data: formatData(response.value),
                },
              },
            })),
        ],
      },
    };
  }, {} as DashboardsResponse["data"]);
}

async function fetchPanels(
  panels: typeof PANELS = PANELS,
  start?: string,
  end?: string,
  partial_response?: string
) {
  return await Promise.allSettled(
    Object.keys(panels).flatMap((code) =>
      panels[code as keyof typeof PANELS].items.map(
        ({ query, timeRange, ...item }) =>
          fetchRange({
            query,
            code,
            start: start || timeRange?.start,
            end: end || timeRange?.end,
            partial_response,
            ...item,
          })
      )
    )
  ).then((results) => transformResultsToDashboardData(results, panels));
}

async function fetchRatioPanels(
  panels: typeof PANELS = PANELS,
  start?: string,
  end?: string,
  partial_response?: string
) {
  return await Promise.allSettled(
    Object.keys(panels).flatMap((code) =>
      panels[code as keyof typeof PANELS].items.map(
        ({ query, timeRange, ...item }) =>
          fetchRange({
            query,
            code,
            start: start || timeRange?.start,
            end: end || timeRange?.end,
            partial_response,
            ...item,
          })
      )
    )
  ).then((results) => {
    return results.reduce((acc, response, index) => {
      const successResult = response;
      const failResult = results[index + 1];

      // only aggregate pairs
      if (
        index % 2 === 1 ||
        successResult.status === "rejected" ||
        failResult.status === "rejected"
      ) {
        if (successResult?.status === "rejected") {
          console.error(successResult.reason);
        }

        if (failResult?.status === "rejected") {
          console.error(failResult.reason);
        }

        return acc;
      }

      return {
        ...acc,
        [successResult.value.code]: {
          ...panels[successResult.value.code as keyof typeof panels],
          items: [
            ...(acc[successResult.value.code as keyof typeof acc]?.items || []),
            ...panels[successResult.value.code as keyof typeof panels].items
              .filter((item) => item.id === successResult.value.id)
              .map(({ query, ...item }) => ({
                ...item,
                // for type safety
                chart: item.chart && {
                  ...item.chart,
                  controls: {
                    ...item.chart.controls,
                    data: formatRatioData({
                      success: successResult.value,
                      fail: failResult.value,
                    }),
                  },
                },
              })),
          ],
        },
      };
    }, {} as DashboardsResponse["data"]);
  });
}

async function fetchCombinedPanels(
  panels: typeof PANELS = PANELS,
  start?: string,
  end?: string,
  partial_response?: string
) {
  return await Promise.allSettled(
    Object.keys(panels).flatMap((code) =>
      panels[code as keyof typeof PANELS].items.map(
        ({ query, timeRange, ...item }) =>
          fetchRange({
            query,
            code,
            start: start || timeRange?.start,
            end: end || timeRange?.end,
            partial_response,
            ...item,
          })
      )
    )
  ).then((results) => {
    const firstResult = results[0];

    if (firstResult?.status === "rejected") {
      console.error(firstResult.reason);
      return {} as DashboardsResponse["data"];
    }

    return {
      [firstResult.value.code]: {
        ...panels[firstResult.value.code as keyof typeof panels],
        items: [
          ...panels[firstResult.value.code as keyof typeof panels].items
            .filter(
              (item, index) => item.id === firstResult.value.id && index === 0
            )
            .map(({ query, ...item }) => ({
              ...item,
              // for type safety
              chart: item.chart && {
                ...item.chart,
                controls: {
                  ...item.chart.controls,
                  data: formatCombinedData(
                    results.reduce((acc, response, index) => {
                      if (response.status === "rejected") {
                        console.error(response.reason);
                        return acc;
                      }

                      return {
                        ...acc,
                        [String(index + 1)]: response.value,
                      };
                    }, {})
                  ),
                },
              },
            })),
        ],
      },
    };
  });
}

const handler: NextApiHandler<DashboardsResponse> = async (req, res) => {
  const code = req.query.code as keyof typeof PANELS;
  const start = req.query.start?.toString();
  const end = req.query.end?.toString();
  const partial_response = req.query.partial_response?.toString();

  try {
    if (!PANELS[code]) {
      throw new Error("Invalid code");
    }

    const panels = { [code]: PANELS[code] };

    res.status(200).json({
      status: "success",
      // return data for a single type
      data: PANELS[code].combined
        ? await fetchCombinedPanels(
            panels as typeof PANELS,
            start,
            end,
            partial_response
          )
        : PANELS[code].ratio
        ? await fetchRatioPanels(
            panels as typeof PANELS,
            start,
            end,
            partial_response
          )
        : await fetchPanels(
            panels as typeof PANELS,
            start,
            end,
            partial_response
          ),
    });
  } catch (e) {
    console.error(e);
    return res.status(400).json({
      status: "error",
      message: "Bad Request",
      data: { [code]: { heading: "", code, items: [] } },
    });
  }
};
export default handler;
