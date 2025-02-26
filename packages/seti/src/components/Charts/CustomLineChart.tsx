import { useState } from "react";
import { LineChart, Line, type LineProps } from "recharts";
import { renderCustomControls, type ChartProps } from "./Chart";
import { getUniqDataKeys, getColor, OPACITY_DEFAULT } from "utils/dashboards";

export type ShapeLine = {
  shape: "line";
  shapeProps?: LineProps[];
};

const CustomLineChart = ({
  debounce,
  isAnimationActive,
  xAxis,
  yAxis,
  shape,
  shapeNames,
  shapeProps,
  timeRange,
  tooltip,
  tooltipSuffix,
  tooltipLabelPrefix,
  ...props
}: ChartProps & { shape: "line" }) => {
  const dataKeys = getUniqDataKeys(props.data);
  const [opacity, setOpacity] = useState<Record<string, number>>({});

  return (
    <LineChart {...props}>
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
        <Line
          type="monotone"
          dataKey={dataKey}
          key={dataKey}
          stroke={getColor(index)}
          dot={false}
          name={shapeNames ? shapeNames[index] : undefined}
          animationBegin={debounce}
          isAnimationActive={isAnimationActive}
          strokeOpacity={opacity[dataKey] || OPACITY_DEFAULT}
        />
      ))}
    </LineChart>
  );
};

export default CustomLineChart;
