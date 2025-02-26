import { theme } from "ui/styles";
import { getDashboards } from "services/publicApiService";
import type {
  CollapsibleDashboardPanelProps,
  CollapsibleDashboardProps,
} from "components/CollapsibleDashboard";
import type { SWRConfiguration } from "swr";
import { getItem } from "utils/hooks/useLocalStorage";
import { LocalStorage } from "data/storage";

export interface TimeRange {
  start: string; // ISO date string
  end: string; // ISO date string
}

export interface PanelsWebNotification {
  [heading: string]: boolean;
}

export interface DisplayTimeRange {
  hours?: number;
  minutes?: number;
}

export enum TIME {
  MS_TO_SEC = 1000,
  ONE_MINUTE = 60,
  ONE_HOUR = ONE_MINUTE * 60,
  ONE_DAY = ONE_HOUR * 24,
  ONE_WEEK = ONE_DAY * 7,
}

const STEP_MAP = [
  {
    maxValue: TIME.ONE_HOUR * 3,
    step: TIME.ONE_MINUTE * 5,
  },
  {
    maxValue: TIME.ONE_HOUR * 6,
    step: TIME.ONE_MINUTE * 10,
  },
  {
    maxValue: TIME.ONE_DAY,
    step: TIME.ONE_MINUTE * 30,
  },
  {
    maxValue: TIME.ONE_DAY * 4,
    step: TIME.ONE_HOUR * 2,
  },
  {
    maxValue: TIME.ONE_WEEK,
    step: TIME.ONE_HOUR * 4,
  },
];

export enum TIME_RANGE_INTERVAL_VALUES_MINUTES {
  FIFTEEN_MINUTES = "15",
  SIXTY_MINUTES = "60",
  ONE_DAY = "1440",
  SEVEN_DAYS = "10080",
}

export enum AUTO_REFRESH_INTERVAL_VALUES_SECONDS {
  ZERO = "0",
  FIVE = "5",
  THIRTY = "30",
  SIXTY = "60",
  THREE_HUNDRED = "300",
  NINE_HUNDRED = "900",
  EIGHTEEN_HUNDRED = "1800",
  THIRTY_SIX_HUNDRED = "3600",
}

export enum NOTIFICATION_PERMISSION_TYPES {
  Granted = "granted",
  Denied = "denied",
  Default = "default",
}

export const DASHBOARDS_API_SWR_KEY = "/api/dashboards";
export const DASHBOARDS_API_SWR_CONFIG: SWRConfiguration = {
  errorRetryInterval: 0, // when a request fails, do not show intermediate error values on screen until retry is complete
  errorRetryCount: 1,
  keepPreviousData: true,
  refreshInterval: 3600000, // 1 hour
};

export const DEFAULT_FETCH_RANGE_PARAMS = {
  dedup: "false",
  partial_response: "false",
  step: "15",
  max_source_resolution: "0s",
};

export const CONSTRAINT_RANGE_DAYS = 7;

export const OPACITY_HIGHLIGHT = 1;
export const OPACITY_DEFAULT = 0.5;
export const OPACITY_HIDDEN = 0.01;

export const TIME_RANGE_OPTIONS = [
  {
    label: "Last 15 minutes",
    value: TIME_RANGE_INTERVAL_VALUES_MINUTES.FIFTEEN_MINUTES,
  },
  {
    label: "Last 1 hour",
    value: TIME_RANGE_INTERVAL_VALUES_MINUTES.SIXTY_MINUTES,
  },
  {
    label: "Last 24 hours",
    value: TIME_RANGE_INTERVAL_VALUES_MINUTES.ONE_DAY,
  },
  {
    label: "Last 7 days",
    value: TIME_RANGE_INTERVAL_VALUES_MINUTES.SEVEN_DAYS,
  },
];

export const TiME_REFRESH_OPTIONS = [
  {
    label: "Off",
    value: AUTO_REFRESH_INTERVAL_VALUES_SECONDS.ZERO,
  },
  {
    label: "5s",
    value: AUTO_REFRESH_INTERVAL_VALUES_SECONDS.FIVE,
  },
  {
    label: "30s",
    value: AUTO_REFRESH_INTERVAL_VALUES_SECONDS.THIRTY,
  },
  {
    label: "1m",
    value: AUTO_REFRESH_INTERVAL_VALUES_SECONDS.SIXTY,
  },
  {
    label: "5m",
    value: AUTO_REFRESH_INTERVAL_VALUES_SECONDS.THREE_HUNDRED,
  },
  {
    label: "15m",
    value: AUTO_REFRESH_INTERVAL_VALUES_SECONDS.NINE_HUNDRED,
  },
  {
    label: "30m",
    value: AUTO_REFRESH_INTERVAL_VALUES_SECONDS.EIGHTEEN_HUNDRED,
  },
  {
    label: "1h",
    value: AUTO_REFRESH_INTERVAL_VALUES_SECONDS.THIRTY_SIX_HUNDRED,
  },
];

/**
 * This methods takes a response in a format that result is a list of values, having each item associated with a metrics object
 * Creates a key-value object with the key being a timestamp to make sure we aggregate metrics at the same timestamp together
 * Maps key-value object to an array, storing the raw time in unix time (number)
 * Sorts the array by raw time
 * Returns the array of object with keys as the metric values and `time` to be used in the x-axis of a graph
 */
export function formatData(response: DashboardsRangeData) {
  if (response.stat) {
    return response.data.result.map(({ values }) => {
      // Filter out any NaN values
      const filteredValues = values.filter(([_, v]) => !Number.isNaN(+v));

      if (!filteredValues.length) return { time: "now", value: 0 };

      return {
        time: "now",
        value:
          response.stat === "last"
            ? +filteredValues[filteredValues.length - 1][1]
            : response.stat === "avg"
            ? filteredValues.reduce((acc, [_, v]) => acc + +v, 0) /
              filteredValues.length
            : 0,
      };
    });
  }

  return Object.entries(
    response.data.result.reduce<{
      [key: string]: {
        [code: string]: number;
      };
    }>(
      (acc, { metric, values }) => ({
        ...acc,
        ...values.reduce<{
          [key: string]: {
            [code: string]: number;
          };
        }>((accCode, [time, value]) => {
          const timeFormatted = timestampFormat24hUtc({
            time,
          });
          const numberValue = Number(value);
          return {
            ...acc,
            ...accCode,
            [timeFormatted]: {
              ...(acc[timeFormatted] || {}),
              ...accCode[timeFormatted],
              ...Object.entries(
                Object.keys(metric).length ? metric : { value: "value" }
              ).reduce<{
                [key: string]: number;
              }>(
                (accValues, [_, metricValue]) => ({
                  ...accValues,
                  ...(numberValue
                    ? {
                        [metricValue]: response.percentage
                          ? Math.trunc(numberValue)
                          : Number(numberValue.toFixed(PRECISION)),
                      }
                    : {}),
                }),
                {}
              ),
              rawTime: time,
            },
          };
        }, {}),
      }),
      {}
    )
  )
    .map(([key, value]) => ({
      time: key,
      rawTime: value.rawTime as number,
      ...value,
    }))
    .sort((a, b) => a.rawTime - b.rawTime)
    .map(({ rawTime, ...data }) => data);
}

export function formatRatioData({
  success,
  fail,
}: {
  success: DashboardsRangeData;
  fail: DashboardsRangeData;
}) {
  const failResponseMap = fail.data.result.length
    ? fail.data.result[0].values.reduce<{
        [key: string]: {
          fail: number;
        };
      }>(
        (acc, [time, value]) => ({
          ...acc,
          [timestampFormat24hUtc({ time })]: {
            fail: Number(Number(value).toFixed(PRECISION)),
          },
        }),
        {}
      )
    : {};

  return Object.entries(
    success.data.result.length
      ? success.data.result[0].values.reduce<{
          [key: string]: {
            success: number;
            fail: number;
          };
        }>(
          (acc, [time, value]) => ({
            ...acc,
            [timestampFormat24hUtc({ time })]: {
              success: Number(Number(value).toFixed(PRECISION)),
              fail: failResponseMap[timestampFormat24hUtc({ time })]?.fail || 0,
            },
          }),
          {}
        )
      : {}
  ).map(([key, value]) => ({
    time: key,
    ...value,
  }));
}

export function formatCombinedData(combinedData: {
  [key: string]: DashboardsRangeData;
}) {
  const formattedEntries: {
    [key: string]: {
      [name: string]: number;
    };
  } = {};

  Object.entries(combinedData).forEach(([key, item]) => {
    if (item.data.result.length) {
      item.data.result[0].values.reduce((acc, [time, value]) => {
        const timeString = timestampFormat24hUtc({ time });

        formattedEntries[timeString] = {
          ...(formattedEntries[timeString] || {}),
          [key]: Number(Number(value).toFixed(PRECISION)),
        };

        return acc;
      }, {});
    }
  });

  return Object.entries(formattedEntries).map(([key, value]) => ({
    time: key,
    ...value,
  }));
}

export type DashboardsRangeData = {
  id: string;
  code: string;
  percentage?: boolean;
  stat?: "avg" | "last";
  data: {
    result: {
      metric: {
        [metricKey: string]: string;
      };
      values: [number, string][];
    }[];
  };
};

export interface DashboardsParams {
  code: string;
  start?: string;
  end?: string;
  partial_response?: string;
}

export type DashboardsResponse = {
  status: "success" | "error";
  data: { [id: string]: CollapsibleDashboardProps };
  message?: string;
};

export const timestampFormat24hUtc = ({
  time,
  seconds,
}: {
  time: number;
  seconds?: boolean;
}) => {
  const fullDateFormat: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const dateTimeFormat = new Intl.DateTimeFormat("en-US", {
    ...fullDateFormat,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: "UTC",
    ...(seconds ? { second: "2-digit" } : {}),
  });

  return dateTimeFormat.format(new Date(time * 1000));
};

export const getUniqDataKeys = (
  data?: { [key: string]: string | number }[]
) => [
  ...new Set((data || []).flatMap(({ time, ...item }) => Object.keys(item))),
];

export const COLORS = [
  [0, 227, 170],
  [255, 116, 66],
  [211, 255, 166],
  [255, 120, 10],
  [242, 73, 92],
  [87, 148, 242],
  [184, 119, 217],
  [112, 93, 160],
  [55, 135, 45],
  [250, 222, 42],
  [68, 126, 188],
  [193, 92, 23],
  [137, 15, 2],
];

export const GRID_COLOR = theme.colors.grayHoverDarkBackground.value;

export type ShapeMappings = {
  range: number[];
  color: "green" | "citron" | "orange" | "red";
}[];

export const MAPPINGS = [
  {
    range: [1, 1],
    color: "green",
  },
  {
    range: [0.96, 0.9999],
    color: "citron",
  },
  {
    range: [0.91, 0.9599],
    color: "orange",
  },
  {
    range: [0, 0.9099],
    color: "red",
  },
] as ShapeMappings;

export const PRECISION = 2;

export const SIDEBAR_WIDTH = 254;

export const getDashboardPanels = (
  params: DashboardsParams
): Promise<CollapsibleDashboardPanelProps[]> =>
  getDashboards(params).then((response) => response.data[params.code].items);

export function getCurrentUnixTimestamp(): number {
  return new Date().getTime() / TIME.MS_TO_SEC;
}

export function rangeDateISOToUnixTimestamp(
  position: "start" | "end",
  dateStr?: string
): number {
  if (position !== "start" && position !== "end") {
    throw new Error(`position must be either "start" or "end"`);
  }
  const now = getCurrentUnixTimestamp();
  const defaultValue = position === "start" ? now - TIME.ONE_HOUR : now;

  if (!dateStr) {
    return defaultValue ?? getCurrentUnixTimestamp();
  }

  const timestamp = Date.parse(dateStr);
  if (isNaN(timestamp)) {
    throw new Error(`Invalid date format: ${dateStr}`);
  }

  return Number((timestamp / TIME.MS_TO_SEC).toFixed(0));
}

export function validateTimeRange(start: number, end: number) {
  const now = getCurrentUnixTimestamp() + TIME.ONE_MINUTE; // avoid false positives like 1 sec differences

  if (start >= end) {
    console.error("Start:", start, "End:", end);
    throw new Error("Start time must be before end time");
  }
  if (end > now) {
    console.error("Now:", now, "End:", end);
    throw new Error("End time cannot be in the future");
  }
}

export function calculateDateISOTimeDelta(start: string, end: string) {
  return new Date(end).getTime() - new Date(start).getTime();
}

export function checkIsLegendActive(
  dataKeys: string[],
  dataKeyMap: Record<string, number>
) {
  return dataKeys.find((key) => dataKeyMap[key] === OPACITY_HIDDEN);
}

export const getColor = (index: number, opacity = 1) =>
  `rgba(${COLORS[index % COLORS.length].join(",")}, ${opacity})`;

export const getDefaultPanelsWebNotification = (
  sections: CollapsibleDashboardProps[],
  defaultPanelsWebNotificationState = false
): PanelsWebNotification => {
  const storagePanels = getStoragePanelsWebNotification();

  return Object.keys(storagePanels).length
    ? storagePanels
    : sections.reduce(
        (acc, { items }) => ({
          ...acc,
          ...items.reduce(
            (accItem, item) =>
              item.chart?.heading
                ? {
                    ...accItem,
                    [item.chart.heading]: defaultPanelsWebNotificationState,
                  }
                : accItem,
            {}
          ),
        }),
        {}
      );
};

export const getStoragePanelsWebNotification = (): PanelsWebNotification => {
  try {
    const storagePanels = JSON.parse(
      String(getItem(LocalStorage.NOTIFICATIONS_PANELS)) || "{}"
    ) as PanelsWebNotification;

    if (Object.keys(storagePanels).length) {
      return storagePanels;
    }
  } catch (e) {
    console.error(
      new Error("Failed to parse Web Notification Panels from storage", {
        cause: JSON.stringify(e, undefined, 2),
      })
    );
  }

  return {};
};

export const hasSomeStoragePanelsWebNotificationEnabled = (): boolean =>
  !!Object.values(getStoragePanelsWebNotification()).find((item) => item);

/**
 * Check if the browser supports notifications.
 * https://caniuse.com/notifications, https://developer.mozilla.org/en-US/docs/Web/API/Notification
 */
export const hasNotificationBrowserSupport = () => {
  if (!("Notification" in window)) {
    console.error("This browser does not support desktop notification");
    return false;
  }

  return true;
};

export const calculateStep = ({ start, end }: TimeRange) => {
  const diff = (new Date(end).getTime() - new Date(start).getTime()) / 1000; // unix time calculation
  const MAP_LENGTH = STEP_MAP.length;
  if (diff > STEP_MAP[MAP_LENGTH - 1].maxValue) return TIME.ONE_HOUR * 8; // return 8-hour step if diff is greater than 1 week
  return STEP_MAP.find(({ maxValue }) => diff <= maxValue)?.step;
};
