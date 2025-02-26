import { useState, useEffect, type MouseEventHandler } from "react";
import { ResponsiveContainer } from "recharts";
import useSWR from "swr";
import Grid, { type GridItemProps } from "ui/components/Grid";
import type { SectionProps } from "ui/components/Section";
import Heading from "ui/components/Typography/Heading";
import Spinner from "ui/components/Spinner";

import {
  DASHBOARDS_API_SWR_KEY,
  DASHBOARDS_API_SWR_CONFIG,
  getDashboardPanels,
  type TimeRange,
} from "utils/dashboards";
import RefreshIcon from "ui/components/Icons/Refresh";
import TimeIcon from "ui/components/Icons/Time";
import { default as loaders } from "components/Loaders";
import TimeRangeInput from "components/TimeRangeInput";
import useLocalStorage from "utils/hooks/useLocalStorage";
import { LocalStorage } from "data/storage";
import featureFlippers from "constants/featureFlippers";

// cannot be dynamically imported. See https://github.com/recharts/recharts/issues/2566#issuecomment-1806068429
import Chart, { type ChartProps } from "../Charts";
import * as css from "./CollapsibleDashboard.styled";

export interface CollapsibleDashboardPanelProps {
  grid?: GridItemProps;
  id: string;
  query?: string;
  dedup?: string;
  partial_response?: string;
  step?: string;
  max_source_resolution?: string;
  percentage?: boolean;
  timeRange?: TimeRange;
  stat?: "avg" | "last";
  chart?: {
    heading?: string;
    copy?: string;
    size?: "medium" | "large" | "small" | "xs";
    controls: ChartProps;
  };
  loading?: boolean;
  error?: boolean;
  debounce?: number;
  isAnimationActive?: boolean;
}
export interface CollapsibleDashboardProps extends SectionProps {
  code: string;
  heading: string;
  copy?: string;
  collapsed?: boolean;
  timeRange?: TimeRange;
  items: CollapsibleDashboardPanelProps[];
}

/**
 * these consts make sure UI doesn't flicker when loading data and stuck while loading multiple panels
 */
const ANIMATION_DEBOUNCE = 1500;
const MAX_ANIMATION_ITEMS = 20;

const CollapsibleDashboardPanel = ({
  id,
  chart,
  grid = Grid.fullWidthColumns,
  loading,
  error,
  debounce = 0,
  isAnimationActive = true,
  timeRange,
}: CollapsibleDashboardPanelProps) => {
  if (chart) {
    const { heading, copy, size, controls } = chart;

    return (
      <css.Item {...grid} chart>
        <css.TextContainer>
          {heading && (
            <css.Heading level={3} dark dashboard size={size}>
              {heading}
            </css.Heading>
          )}
          {copy && <css.Copy>{copy}</css.Copy>}
        </css.TextContainer>
        <css.ChartContainer size={size}>
          <ResponsiveContainer width="100%" height="100%" debounce={debounce}>
            <Chart
              key={id}
              id={id}
              {...controls}
              size={size}
              debounce={debounce}
              isAnimationActive={isAnimationActive}
              heading={heading}
              timeRange={timeRange}
            />
          </ResponsiveContainer>
        </css.ChartContainer>

        {!controls.data?.length && (
          <css.FeedbackContainer>
            {loading ? (
              <css.Copy>Loading {heading}...</css.Copy>
            ) : error ? (
              <css.Copy error>
                Error loading {heading}. Please try again later.
              </css.Copy>
            ) : (
              <css.Copy>{heading} is empty.</css.Copy>
            )}
          </css.FeedbackContainer>
        )}
      </css.Item>
    );
  }

  return null;
};

const CollapsibleDashboard = ({
  backgroundColor = "black",
  spacingTop = "none",
  spacingBottom = "continuous",
  collapsed = false,
  heading,
  copy,
  items,
  code,
  timeRange,
  ...props
}: CollapsibleDashboardProps) => {
  const { getItem } = useLocalStorage();
  const [isClient, setIsClient] = useState(false);
  const [open, setOpen] = useState(!collapsed);
  const [timeToggle, setTimeToggle] = useState(false);
  const [sectionTimeRange, setSectionTimeRange] = useState<
    TimeRange | undefined
  >(undefined);

  const fetchDashboardPanels = (): Promise<CollapsibleDashboardPanelProps[]> =>
    getDashboardPanels({
      code,
      start: sectionTimeRange?.start || timeRange?.start,
      end: sectionTimeRange?.end || timeRange?.end,
      // if for some reason data was not loaded once, try best effort to load partial data
      ...(error ? { partial_response: "true" } : {}),
    });

  const {
    data: asyncItems,
    error,
    isValidating,
    mutate,
  } = useSWR(
    open ? [DASHBOARDS_API_SWR_KEY, code] : null,
    fetchDashboardPanels,
    DASHBOARDS_API_SWR_CONFIG
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(
    function onTimeRangeUpdate() {
      if (asyncItems?.length === undefined) return;

      // once loaded and time range changed run async data
      if (sectionTimeRange?.start && sectionTimeRange?.end) {
        mutate();
      }
      if (timeRange?.start && timeRange?.end) {
        mutate();
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [code, asyncItems?.length, sectionTimeRange, timeRange] // mutate is a useCallback
  );

  const alienModeEnabled =
    featureFlippers.DOTCOM_3869_FACEHUGGER &&
    isClient && // https://nextjs.org/docs/messages/react-hydration-error#solution-1-using-useeffect-to-run-on-the-client-only
    getItem(LocalStorage.ALIEN_MODE);

  const Loader = alienModeEnabled
    ? loaders[Math.floor(Math.random() * loaders.length)]
    : () => <css.Copy>Loading {heading}...</css.Copy>;

  const onClickRefresh: MouseEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    mutate();
  };

  const onClickTime: MouseEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setTimeToggle((prev) => !prev);
  };

  const onOpenChange = (isOpen: boolean) => {
    // do not allow to open/close section if time toggle is active
    if (timeToggle) return;

    setOpen(isOpen);
  };

  const panels = asyncItems || items;

  return (
    <css.Section
      id={code}
      backgroundColor={backgroundColor}
      spacingTop={spacingTop}
      spacingBottom={spacingBottom}
      {...props}
    >
      <css.Container open={open} onOpenChange={onOpenChange}>
        <css.TriggerContainer>
          <Heading level={2} dark dashboard>
            {heading}
          </Heading>

          <css.TriggerActionsContainer>
            {open && timeToggle && (
              <TimeRangeInput
                onBlurTimeRange={({ start, end }) => {
                  // start and end are section-specific here
                  setSectionTimeRange({ start, end });
                }}
              />
            )}
            {open && (
              <css.DatetimeButton
                onClick={onClickTime}
                aria-pressed={timeToggle}
                aria-disabled={isValidating}
                tabIndex={0}
                role="button"
              >
                <TimeIcon width={16} height={16} title={`${heading} time`} />
              </css.DatetimeButton>
            )}
            {open && (
              <css.RefreshButton
                onClick={onClickRefresh}
                aria-disabled={isValidating}
                tabIndex={0}
                role="button"
              >
                {isValidating ? (
                  <Spinner
                    background="light"
                    size="xs"
                    outline
                    title={`Loading ${heading}`}
                  />
                ) : (
                  <RefreshIcon
                    width={16}
                    height={16}
                    title={`Refresh ${heading}`}
                  />
                )}
              </css.RefreshButton>
            )}
            <css.HeadingIcon width={16} height={16} />
          </css.TriggerActionsContainer>
        </css.TriggerContainer>
        <css.ContentContainer>
          {copy && (
            <css.CopyContainer>
              <css.Copy>{copy}</css.Copy>
            </css.CopyContainer>
          )}
          <css.PanelsContainer>
            {panels
              // unique
              .filter(
                ({ id }, index) =>
                  panels.findIndex(({ id: panelId }) => panelId === id) ===
                  index
              )
              .map(({ id, ...props }, index) => (
                <CollapsibleDashboardPanel
                  key={id}
                  id={id}
                  loading={!alienModeEnabled && isValidating}
                  error={!!error}
                  debounce={index * ANIMATION_DEBOUNCE}
                  isAnimationActive={panels.length <= MAX_ANIMATION_ITEMS}
                  timeRange={sectionTimeRange || timeRange} // section or page time range
                  {...props}
                />
              ))}
          </css.PanelsContainer>
          {isValidating && alienModeEnabled && (
            <css.LoaderOverlay>
              <Loader />
            </css.LoaderOverlay>
          )}
        </css.ContentContainer>
      </css.Container>
    </css.Section>
  );
};

export default CollapsibleDashboard;
