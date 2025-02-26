import type { CSSProperties, Dispatch, SetStateAction } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  type TooltipProps,
} from "recharts";

import CustomAreaChart, { type ShapeArea } from "./CustomAreaChart";
import CustomBarChart, { type ShapeBar } from "./CustomBarChart";
import CustomLineChart, { type ShapeLine } from "./CustomLineChart";
import AbsoluteChart, { type ShapeAbsolute } from "./AbsoluteChart";

import type { CategoricalChartProps } from "recharts/types/chart/generateCategoricalChart";
import type {
  Formatter as LegendFormatter,
  Payload,
} from "recharts/types/component/DefaultLegendContent";
import type { Formatter as TooltipFormatter } from "recharts/types/component/DefaultTooltipContent";
import {
  OPACITY_HIGHLIGHT,
  OPACITY_DEFAULT,
  OPACITY_HIDDEN,
  GRID_COLOR,
  TIME,
  checkIsLegendActive,
  calculateDateISOTimeDelta,
  type TimeRange,
} from "utils/dashboards";
import * as css from "./Chart.styled";
import type { TickFormatter } from "recharts/types/cartesian/CartesianAxis";

type ChartData = { [key: string]: string | number }[];

type ShapeLabel = {
  value: string;
  style?: CSSProperties;
  angle?: number;
  position?: "left" | "top" | "right" | "bottom";
  offset?: number;
};

type ShapeAxis = {
  dataKey?: string;
  label?: ShapeLabel;
  name?: string;
  unit?: string | number;
  domain?: number[];
};

type ShapeDirectionalAxis<D = "x" | "y"> = D extends "x"
  ? ShapeAxis & { direction?: "x"; timeRange?: TimeRange }
  : ShapeAxis & { direction?: "y" };

export type ChartProps = CategoricalChartProps &
  (ShapeArea | ShapeBar | ShapeLine | ShapeAbsolute) & {
    size?: "medium" | "large" | "small" | "xs";
    debounce?: number;
    isAnimationActive?: boolean;
    xAxis?: ShapeDirectionalAxis<"x">;
    yAxis?: ShapeDirectionalAxis<"y">;
    tooltip?: TooltipProps<number, string>;
    tooltipSuffix?: string;
    tooltipLabelPrefix?: string;
    shapeNames?: string[];
    data?: ChartData;
    heading?: string;
    dataKeys?: string[];
    timeRange?: TimeRange;
    opacity?: Record<string | number, number>;
    setOpacity?: Dispatch<SetStateAction<Record<string, number>>>;
  };

const renderCustomAxis = <D extends "x" | "y">(
  axis: ShapeDirectionalAxis<D>
) => {
  if (axis.direction === "x") {
    /**
     * @param value `02/12/2025, 12:51`
     */
    const handleTickFormatTime: TickFormatter = (value: string) => {
      const dateParts = value.split(",");
      const dayAndMonthParts = dateParts[0].split("/");
      const hourAndMinute = value.split(",")[1].trim();

      if (axis.timeRange) {
        if (
          calculateDateISOTimeDelta(axis.timeRange.start, axis.timeRange.end) >
          TIME.ONE_DAY
        ) {
          // month and day + time
          return `${dayAndMonthParts[0]}/${dayAndMonthParts[1]}, ${hourAndMinute}`;
        }
      }

      // hour and minute
      return hourAndMinute;
    };

    const { direction, timeRange, ...xAxis } = axis;
    return (
      <XAxis
        {...xAxis}
        dataKey="time"
        name="time"
        tickFormatter={handleTickFormatTime}
      />
    );
  }

  const { direction, ...yAxis } = axis;
  return <YAxis {...yAxis} allowDataOverflow />;
};

const renderCustomTooltip = ({
  dataKeys,
  opacity,
  tooltipSuffix,
  tooltipLabelPrefix,
  tooltip,
}: Pick<
  ChartProps,
  "dataKeys" | "opacity" | "tooltip" | "tooltipSuffix" | "tooltipLabelPrefix"
>) => {
  const formatValue = (value: number) =>
    tooltipSuffix ? `${value} ${tooltipSuffix}` : value;

  const handleTooltipFormat: TooltipFormatter<number, string> = (
    value,
    name,
    item
  ) => {
    if (dataKeys && opacity && checkIsLegendActive(dataKeys, opacity)) {
      if (
        item.dataKey &&
        opacity[item.dataKey satisfies keyof typeof opacity] ===
          OPACITY_HIGHLIGHT
      ) {
        return [formatValue(value), name];
      }

      return [null, null];
    }

    return [formatValue(value), name];
  };

  return (
    <Tooltip
      {...tooltip}
      {...(tooltipSuffix
        ? { formatter: (value) => `${value} ${tooltipSuffix}` }
        : {})}
      {...(tooltipLabelPrefix
        ? {
            labelFormatter: (value) => `${tooltipLabelPrefix} : ${value}`,
          }
        : {})}
      formatter={handleTooltipFormat}
    />
  );
};

export const renderCustomControls = ({
  xAxis = { direction: "x" },
  yAxis = { direction: "y" },
  timeRange,
  tooltip = {
    labelStyle: { color: "#FEFDF5" },
    wrapperStyle: { background: "#222227" },
    contentStyle: { background: "#222227" },
  },
  tooltipSuffix,
  tooltipLabelPrefix,
  dataKeys,
  opacity,
  setOpacity,
}: ChartProps) => {
  const handleMouseEnterLeave =
    (state: "enter" | "leave") =>
    ({ dataKey }: Payload) => {
      if (dataKeys && setOpacity) {
        setOpacity((op) => {
          const isLegendActive = checkIsLegendActive(dataKeys, op);

          if (isLegendActive) return op;

          return dataKeys.reduce(
            (acc, key) => ({
              ...acc,
              [key]:
                key === dataKey && state === "enter"
                  ? OPACITY_HIGHLIGHT
                  : OPACITY_DEFAULT,
            }),
            {}
          );
        });
      }
    };

  const handleClick = ({ dataKey }: Payload) => {
    if (dataKeys && setOpacity) {
      setOpacity((op) => {
        const isLegendDataKeyActive = op[String(dataKey)] === OPACITY_HIGHLIGHT;
        const isLegendActive = checkIsLegendActive(dataKeys, op);

        if (isLegendDataKeyActive && isLegendActive) {
          return dataKeys.reduce(
            (acc, key) => ({ ...acc, [key]: OPACITY_DEFAULT }),
            {}
          );
        }

        return dataKeys.reduce(
          (acc, key) => ({
            ...acc,
            [key]: key === dataKey ? OPACITY_HIGHLIGHT : OPACITY_HIDDEN,
          }),
          {}
        );
      });
    }
  };

  const handleLegendFormat: LegendFormatter = (value, entry) => {
    return (
      <css.ChartLegendItem
        className="recharts-legend-item-copy"
        active={
          opacity && entry.dataKey
            ? opacity[String(entry.dataKey) satisfies keyof typeof opacity] ===
              OPACITY_HIGHLIGHT
            : false
        }
      >
        {value}
      </css.ChartLegendItem>
    );
  };

  return (
    <>
      <CartesianGrid strokeDasharray="3" stroke={GRID_COLOR} />
      {renderCustomAxis<"x">({ ...xAxis, timeRange })}
      {renderCustomAxis<"y">(yAxis)}
      {renderCustomTooltip({
        dataKeys,
        opacity,
        tooltip,
        tooltipSuffix,
        tooltipLabelPrefix,
      })}

      <Legend
        onMouseEnter={handleMouseEnterLeave("enter")}
        onMouseLeave={handleMouseEnterLeave("leave")}
        onClick={handleClick}
        formatter={handleLegendFormat}
      />
    </>
  );
};

const Chart = ({
  debounce,
  isAnimationActive = true,
  shape,
  shapeProps,
  ...props
}: ChartProps) => {
  switch (shape) {
    case "area": {
      return (
        <CustomAreaChart
          debounce={debounce}
          isAnimationActive={isAnimationActive}
          shape={shape}
          {...props}
        />
      );
    }
    case "bar": {
      return (
        <CustomBarChart
          debounce={debounce}
          isAnimationActive={isAnimationActive}
          shape={shape}
          {...props}
        />
      );
    }
    case "line": {
      return (
        <CustomLineChart
          debounce={debounce}
          isAnimationActive={isAnimationActive}
          shape={shape}
          {...props}
        />
      );
    }

    case "absolute": {
      return <AbsoluteChart shape={shape} {...props} />;
    }

    default:
      return null;
  }
};

export default Chart;
