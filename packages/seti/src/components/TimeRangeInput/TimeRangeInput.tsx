import {
  useEffect,
  useMemo,
  useState,
  type MouseEventHandler,
  type FocusEventHandler,
} from "react";
import { v4 as uuidv4 } from "uuid";
import {
  TIME_RANGE_OPTIONS,
  TiME_REFRESH_OPTIONS,
  TIME_RANGE_INTERVAL_VALUES_MINUTES,
  AUTO_REFRESH_INTERVAL_VALUES_SECONDS,
  type TimeRange,
} from "utils/dashboards";
import useDatetimeRange, {
  formatForISOString,
  formatForDatetimeLocal,
  MILLISECONDS_PER_MINUTE,
} from "utils/hooks/useDatetimeRange";
import useLocalStorage from "utils/hooks/useLocalStorage";
import { LocalStorage } from "data/storage";
import { Select, Option } from "ui/components/Select/Basic";
import useInterval from "ui/utils/hooks/useInterval";
import RefreshIcon from "ui/components/Icons/Refresh";

import * as css from "./TimeRangeInput.styled";

export interface TimeRangeInputProps {
  orientation?: "horizontal" | "vertical";
  onBlurTimeRange: (timeRange: TimeRange) => void;
  onChangeAutoRefreshTimeInterval?: (
    autoRefreshTimeInterval: AUTO_REFRESH_INTERVAL_VALUES_SECONDS
  ) => void;
  timeRange?: TimeRange;
  timeRangeSelectOnly?: boolean;
  timeRangeIntervalMinutes?: TIME_RANGE_INTERVAL_VALUES_MINUTES;
  autoRefreshTimeIntervalSeconds?: AUTO_REFRESH_INTERVAL_VALUES_SECONDS;
}

/**
 * This component must be CSR-only
 */
const TimeRangeInput = ({
  orientation,
  onBlurTimeRange,
  onChangeAutoRefreshTimeInterval,
  timeRange,
  timeRangeSelectOnly,
  timeRangeIntervalMinutes = TIME_RANGE_INTERVAL_VALUES_MINUTES.SIXTY_MINUTES,
  autoRefreshTimeIntervalSeconds = AUTO_REFRESH_INTERVAL_VALUES_SECONDS.ZERO,
}: TimeRangeInputProps) => {
  const { getItem, setItem } = useLocalStorage();

  /**
   * this is to force this component to re-render when the datetime input interval changes
   * Select component does not have a way to reset the value to the placeholder and we need to keep the Select and the datetime inputs in sync
   */
  const [selectKey, setSelectKey] = useState<string>(uuidv4());
  /**
   * this is to keep track of the selected time interval. When a time interval is selected, the datetime inputs are updated with the new time range
   * and the time interval is set to undefined to prevent the datetime inputs from being updated again
   * this is acceptable (copy props to state) because `timeRangeIntervalMinutes` is just the initial value for this state
   */
  const [timeInterval, setTimeInterval] = useState<string | undefined>(() => {
    const timeIntervalFromStorage = getItem(LocalStorage.TIME_INTERVAL);

    // vertical component is the only one that cares about the time interval in storage
    if (orientation === "vertical" && timeIntervalFromStorage) {
      return String(timeIntervalFromStorage);
    }

    return timeRangeIntervalMinutes;
  });

  const autoRefreshTimeInterval = useMemo(() => {
    const autoRefreshTimeIntervalFromStorage = getItem(
      LocalStorage.AUTO_REFRESH_TIME_INTERVAL
    );

    // vertical component is the only one that cares about the auto refresh
    if (orientation === "vertical" && autoRefreshTimeIntervalFromStorage) {
      return String(autoRefreshTimeIntervalFromStorage);
    }

    return autoRefreshTimeIntervalSeconds;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoRefreshTimeIntervalSeconds, orientation]); // getItem is a callback

  const updateTimeRange = () => {
    if (!timeInterval) {
      return;
    }

    const endDate = new Date();
    const startDate = new Date(
      endDate.getTime() - Number(timeInterval) * MILLISECONDS_PER_MINUTE
    );

    start.setValue(startDate);
    end.setValue(endDate);

    onBlurTimeRange({
      start: formatForISOString(formatForDatetimeLocal(startDate)),
      end: formatForISOString(formatForDatetimeLocal(endDate)),
    });

    // save preference
    setItem(LocalStorage.TIME_INTERVAL, timeInterval);
  };

  const { start, end } = useDatetimeRange(timeRange);
  const { run: runAutoRefresh } = useInterval({
    timeSeconds: Number(autoRefreshTimeInterval),
    callback: updateTimeRange,
  });

  useEffect(() => {
    updateTimeRange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeInterval]); // we only want to trigger this if time interval changes

  useEffect(() => {
    runAutoRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoRefreshTimeInterval]); // we only want to trigger this if auto refresh time interval changes

  const onChangeTime =
    (position: "start" | "end") =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const date = new Date(event.target.value);

      // this is case is because sometimes time is returned as empty string from the input, causing the hook to fail on date parsing
      if (isNaN(date.getTime())) {
        console.error("invalid date format", event.target.value);
        return;
      }

      if (position === "start") {
        start.setValue(date);
      }

      if (position === "end") {
        end.setValue(date);
      }
    };

  const onClickTimeInput: MouseEventHandler<HTMLInputElement> = (event) => {
    event.stopPropagation();
  };

  const onBlurTimeInput: FocusEventHandler<HTMLInputElement> = (event) => {
    if (event.target.validity.valid) {
      onBlurTimeRange({
        start: formatForISOString(start.value),
        end: formatForISOString(end.value),
      });

      setTimeInterval(undefined);
      setSelectKey(uuidv4());
    }
  };

  const onClickRefresh: MouseEventHandler<HTMLDivElement> = () => {
    updateTimeRange();
  };

  if (orientation === "vertical") {
    return (
      <>
        <css.DatetimeInputContainer
          orientation="vertical"
          hidden={timeRangeSelectOnly}
        >
          <css.FieldContainer>
            <css.Label as="label" htmlFor="start" dashboard>
              From:
            </css.Label>
            <css.InputField
              id="start"
              name="start"
              type="datetime-local"
              onChange={onChangeTime("start")}
              onClick={onClickTimeInput}
              onBlur={onBlurTimeInput}
              value={start.value}
              min={start.min}
              max={start.max}
            />
          </css.FieldContainer>
          <css.FieldContainer>
            <css.Label as="label" htmlFor="start" dashboard>
              To:
            </css.Label>
            <css.InputField
              id="end"
              name="end"
              type="datetime-local"
              onChange={onChangeTime("end")}
              onClick={onClickTimeInput}
              onBlur={onBlurTimeInput}
              value={end.value}
              min={end.min}
              max={end.max}
            />
          </css.FieldContainer>
        </css.DatetimeInputContainer>

        <css.SelectContainer>
          <css.Label as="div" dashboard center>
            Auto refresh
          </css.Label>
        </css.SelectContainer>

        <css.SelectContainer>
          <Select
            placeholder="Custom time"
            theme="darkSeti"
            value={timeInterval}
            onValueChange={setTimeInterval}
            key={selectKey}
          >
            {TIME_RANGE_OPTIONS.map(({ label, value }) => (
              <Option key={value} value={value}>
                {label}
              </Option>
            ))}
          </Select>

          <css.RefreshButton
            onClick={onClickRefresh}
            tabIndex={0}
            role="button"
          >
            <RefreshIcon width={16} height={16} title="Refresh" />
          </css.RefreshButton>

          <Select
            placeholder="Off"
            theme="darkSeti"
            value={autoRefreshTimeInterval}
            onValueChange={onChangeAutoRefreshTimeInterval}
          >
            {TiME_REFRESH_OPTIONS.map(({ label, value }) => (
              <Option key={value} value={value}>
                {label}
              </Option>
            ))}
          </Select>
        </css.SelectContainer>
      </>
    );
  }

  return (
    <css.DatetimeInputContainer>
      <css.FieldContainer>
        <css.InputField
          id="start"
          name="start"
          type="datetime-local"
          onChange={onChangeTime("start")}
          onClick={onClickTimeInput}
          onBlur={onBlurTimeInput}
          value={start.value}
          min={start.min}
          max={start.max}
        />
      </css.FieldContainer>
      <css.FieldContainer>
        <css.InputField
          id="end"
          name="end"
          type="datetime-local"
          onChange={onChangeTime("end")}
          onClick={onClickTimeInput}
          onBlur={onBlurTimeInput}
          value={end.value}
          min={end.min}
          max={end.max}
        />
      </css.FieldContainer>
    </css.DatetimeInputContainer>
  );
};

export default TimeRangeInput;
