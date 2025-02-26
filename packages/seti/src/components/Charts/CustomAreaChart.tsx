import { useState } from "react";
import { AreaChart, Area, type AreaProps } from "recharts";
import { renderCustomControls, type ChartProps } from "./Chart";
import { getUniqDataKeys, getColor, OPACITY_DEFAULT } from "utils/dashboards";

export type ShapeArea = {
  shape: "area";
  shapeProps?: AreaProps[];
  stacked?: boolean;
};

const CustomAreaChart = ({
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
}: ChartProps & { shape: "area" }) => {
  const dataKeys = getUniqDataKeys(props.data);
  const [opacity, setOpacity] = useState<Record<string, number>>({});
  return (
    <AreaChart {...props}>
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

      {dataKeys.map((dataKey, index) => {
        const fillColor = getColor(index, 0.1);
        const strokeColor = getColor(index);

        return (
          <Area
            type="monotone"
            dataKey={dataKey}
            key={dataKey}
            stackId={stacked ? "telnyx" : undefined}
            fill={fillColor}
            stroke={strokeColor}
            name={shapeNames ? shapeNames[index] : undefined}
            animationBegin={debounce}
            isAnimationActive={isAnimationActive}
            fillOpacity={opacity[dataKey] || OPACITY_DEFAULT}
            strokeOpacity={opacity[dataKey] || OPACITY_DEFAULT}
          />
        );
      })}
    </AreaChart>
  );
};

export default CustomAreaChart;
