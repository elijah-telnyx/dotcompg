# Seti (Customer Facing Observability Dashboards)

This is a Next-bootstrapped project using Recharts for charting. Recharts configuration is based on the [Recharts documentation](https://recharts.org/en-US/api).

## Getting Started

First, load tokens need to build website:

```bash
npm run setup-env:local
```

> remember to setup vault integration and to update your `.env` file accordingly if you need to adjust target environment or any token

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Hierarchy

`Pages` can contain multiple collapsible containers, i.e. `Panels`, that can contain multiple chart `Items`. Each `Item` represents a graph/chart/absolute value with their own relevant properties.

## Simple Panel Configuration

Panels are managed in their respective JSON file within the [src/data/sections](./src/data/sections/) directory. Panels have both required and optional fields:

### Required fields

- `heading`: Display name of the panel
- `code`: Unique identifier for the panel
- `items`: Array of chart configurations

### Optional fields

- `copy`: Description of the panel
- `collapsed`: Whether panel starts collapsed (`true` by default)
- `ratio`: Whether panel shows success/failure ratios (`false` by default)
- `combined`: Whether panel (entire section) should represent a single combined panel (`false` by default)
- `start`: Start date and time for the panel, ISO 8601 format
- `end`: End date and time for the panel, ISO 8601 format

#### `start` and `end` parameters

- Accept ISO 8601 timestamp strings
- Are optional - if omitted, the dashboard will use the default time range (start and end) which is the **last hour**, i.e., `start: "now-1h"` and `end: "now"`
- Apply to individual chart items within a panel

Example:

```json
{
  "start": "2024-01-01T00:00:00Z",
  "end": "2024-01-02T00:00:00Z"
}
```

## Combined Panel Configuration

The `combined` property allows multiple queries to be combined into a single chart view. When `combined: true`, all the queries in the panel's `items` array will be merged into the first chart item.

Example:

```json
{
  "sip_trunking_asr": {
    "collapsed": false,
    "heading": "Sip Trunking Traffic Statistics",
    "code": "sip_trunking_asr",
    "combined": true,
    "items": [
      {
        "query": "sum(rate(sofia_connected_calls{...}[3m])) * 100 / (sum(rate(sofia_new_incoming_invite{...}[3m])) - sum(rate(sofia_dialplan_rejected_calls{...}[3m])))",
        "id": "sip_trunking_asr",
        "step": "15",
        "chart": {
          "heading": "ASR",
          "copy": "Answer Seizure Ratio",
          "controls": {
            "shape": "area",
            "shapeNames": [
              "Chicago, IL",
              "Ashburn, VA",
              "San Jose, CA"
              // Additional region names...
            ],
            "stacked": false,
            "tooltipSuffix": "%"
          }
        }
      },
      {
        // Additional queries that will be combined into first chart
        "query": "...",
        "id": "sip_trunking_asr",
        "step": "15"
      }
    ]
  }
}
```

> In this example, the SIP Trunking ASR panel combines metrics from multiple regions into one chart, with each region's data shown as a separate line/area series.

Key points about combined panels:

- Set `"combined": true` at the panel level
- Only the first item in items array needs full chart configuration
- Subsequent items only need `query`, `id` and `step` properties (or any additional query-related params)
- All queries will be merged into a single chart using the first item's configuration
- Use shapeNames array to label each query's data series (if necessary)
- Combined data will share the same x-axis (time) but can show different metrics
- Useful for comparing related metrics across different regions or services

## Chart Item Configuration

Each item in the `items` array represents a chart with the following structure:

```json
{
  "query": "promQL_query",
  "id": "unique_chart_id",
  "step": "60",
  "percentage": false,
  "stat": "avg|last",
  "chart": {
    "heading": "Chart Title",
    "copy": "Chart Description",
    "controls": {
      "yAxis": {
        "domain": [0, 100],
        "unit": "%"
      },
      "shape": "area|bar|line|percentage",
      "stacked": false,
      "shapeNames": ["Success", "Failure"],
      "tooltipLabelPrefix": "time",
      "tooltipSuffix": "msg/s"
    }
  }
}
```

### Required fields

- `query`: PromQL query to fetch data
- `id`: Unique identifier for the chart
- `chart.controls`: Chart configuration object
- `chart.controls.shape`: Chart type ("area" | "bar" | "line" | "absolute")

### Optional fields

- `step`: Query resolution in seconds
- `percentage`: Whether to show values in an "area", "bar", or "line" chart shape as percentages
- `stat`: Statistic to show ("avg" | "last"). Use this to show the average ("avg") of values or the last value ("last") as a single value display chart. This is color-based, used this in combination with `chart.controls.shape: "absolute"` and `chart.controls.mappings` to show different colors based on thresholds.
- `grid`: Each chart item can specify a `grid` property that controls its layout across different breakpoints. The grid uses a 12-column system that adapts to different screen sizes.
- `chart.heading`: Chart title
- `chart.copy`: Chart description
- `chart.size`: Chart size ("xs" | "small" | "medium" | "large")

### Chart Grid Configuration

Charts can be positioned using the Grid system. Each chart item can specify a `grid` property that controls its layout across different breakpoints. The grid uses a 12-column system that adapts to different screen sizes:

`xs`: `4` columns total
`small`: `8` columns total
`medium`,`large` and `xl`: `12` columns total

Example usage:

```json
{
  "query": "...",
  "id": "my-chart",
  "grid": {
    "xs": 4, // Full width on mobile
    "small": 4, // Half width on tablet
    "medium": 6 // Half width on desktop
  },
  "chart": {
    // ...chart configuration
  }
}
```

To make a chart span the full width at all breakpoints, you can omit the grid property - it will use these defaults:

```json
{
  "xs": 4,
  "small": 8,
  "medium": 12,
  "large": 12,
  "xl": 12
}
```

### Chart Controls Configuration

The controls object accepts the following properties:

- `shape` (required): Chart type to render
  - `area`: Area chart with fill
  - `bar`: Bar chart
  - `line`: Line chart
  - `absolute`: Single value display
- `stacked` (optional): Whether to stack multiple series (default: `true`)
- `isAnimationActive` (optional): Enable chart animations (default: `true`)
- `debounce` (optional): Delay in ms before animation starts
- `xAxis` (optional): X-axis configuration
  - `dataKey`: Data field to use for x-axis values
  - `name`: Axis label text
  - `label`: Custom label styling
    - `value`: Label text
    - `style`: Label text styles
    - `angle`: Rotation angle in degrees
    - `position`: Label position ("left"|"top"|"right"|"bottom")
    - `offset`: Pixel offset from axis
  - `unit`: Unit to display after values
  - `domain`: Value range as [min, max]
- `yAxis` (optional): Y-axis configuration. Same options as xAxis
- `tooltip` (optional): Tooltip styling
  - `labelStyle`: Label text styles
  - `wrapperStyle`: Tooltip container styles
  - `contentStyle`: Content area styles
- `tooltipLabelPrefix` (optional): Text to show before tooltip labels
- `tooltipSuffix` (optional): Text to append to tooltip values. If passed combined with `chart.controls.shape: "absolute"`, it'll show the suffix
- `shapeNames` (optional): Array of labels for the chart legend
- `mappings` (optional): Custom mappings and thresholds for dynamic percentage panels colors
  - `range`: [min, max]
  - `color`: ("green"|"citron"|"orange"|"red")
- `prefix` (optional): Text to append to single value displayed. Only applicable when `shape` is `absolute`
- `suffix` (optional): Text to append to single value displayed. Only applicable when `shape` is `absolute`. If `suffix` is `%`, chart will display `value` as "0-100%"
- `precision` (optional): Precision for single value displayed. Only applicable when `shape` is `absolute`

## Chart Troubleshooting

### Common Issues

- **Chart not rendering**: Ensure the `query` field contains a valid PromQL query
- **Missing or mismatched data**: Verify the `step` value matches your data resolution
- **Legend issues**: Check that `shapeNames` array matches your data series
