import { useEffect } from "react";
import {
  getStoragePanelsWebNotification,
  hasNotificationBrowserSupport,
  MAPPINGS,
  PRECISION,
} from "utils/dashboards";
import * as css from "./Chart.styled";
import { type ChartProps } from "./Chart";
import { type ShapeMappings } from "utils/dashboards";

export type ShapeAbsolute = {
  prefix?: string;
  suffix?: string;
  precision?: number;
  mappings?: ShapeMappings;
  shape: "absolute";
  shapeProps?: Record<string, never>;
};

const AbsoluteChart = ({
  data,
  mappings = MAPPINGS,
  prefix,
  suffix,
  precision = PRECISION,
  size,
  heading,
}: ChartProps & { shape: "absolute" }) => {
  const value: number = data?.length ? data[0].value : null;

  const backgroundColor = mappings.find(({ range }) => {
    return value >= range[0] && value <= range[1];
  })?.color;

  const computeValue = () => {
    return suffix === "%"
      ? (value * 100).toFixed(precision)
      : value.toFixed(precision);
  };

  useEffect(
    function onChartRed() {
      if (backgroundColor === "red" && value !== null) {
        if (!hasNotificationBrowserSupport()) {
          return;
        }

        const panelsWebNotification = getStoragePanelsWebNotification();

        if (heading && panelsWebNotification[heading]) {
          new Notification(heading || "Chart Alert", {
            body: `${prefix || ""}${computeValue()}${suffix || ""}`,
            icon: "/logo.png",
          });

          // this is an important console log to make sure we record what's been notified
          console.info(`Chart Alert - ${heading}, ${value}`);
        }
      }
    },
    // we don't need to run this on every render, we only care about the background color changes
    [backgroundColor, value] // eslint-disable-line react-hooks/exhaustive-deps
  );

  if (value === null) {
    return null;
  }

  if (value === 0 && (!backgroundColor || backgroundColor === "red")) {
    return (
      <css.AbsoluteChart backgroundColor="black" size={size}>
        No Data
      </css.AbsoluteChart>
    );
  }

  return (
    <css.AbsoluteChart backgroundColor={backgroundColor} size={size}>
      {prefix}
      {computeValue()}
      {suffix}
    </css.AbsoluteChart>
  );
};

export default AbsoluteChart;
