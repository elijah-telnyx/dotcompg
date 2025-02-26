import { useState } from "react";
import { BarChart, Bar, type BarProps } from "recharts";
import { renderCustomControls, type ChartProps } from "./Chart";
import { getUniqDataKeys, getColor, OPACITY_DEFAULT } from "utils/dashboards";

export type ShapeBar = {
  shape: "bar";
  shapeProps?: BarProps[];
  stacked?: boolean;
};

const CustomBarChart = ({
  debounce,
  isAnimationActive,
  xAxis,
  yAxis,
  shape,
  shapeNames,
  shapeProps,
  stacked = true,
  timeRange,
  tooltip,
  tooltipSuffix,
  tooltipLabelPrefix,
  ...props
}: ChartProps & { shape: "bar" }) => {
  const dataKeys = getUniqDataKeys(props.data);
  const [opacity, setOpacity] = useState<Record<string, number>>({});
  return (
    <BarChart {...props}>
      {renderCustomControls({
        xAxis,
        yAxis,
        timeRange,
        tooltip,
        tooltipSuffix,
        tooltipLabelPrefix,
        shape,
        dataKeys,
        opacity,
        setOpacity,
      })}

      {dataKeys.map((dataKey, index) => (
        <Bar
          type="monotone"
          dataKey={dataKey}
          key={dataKey}
          stackId={stacked ? "telnyx" : undefined}
          fill={getColor(index)}
          name={shapeNames ? shapeNames[index] : undefined}
          animationBegin={debounce}
          isAnimationActive={isAnimationActive}
          fillOpacity={opacity[dataKey] || OPACITY_DEFAULT}
        />
      ))}
    </BarChart>
  );
};

export default CustomBarChart;
