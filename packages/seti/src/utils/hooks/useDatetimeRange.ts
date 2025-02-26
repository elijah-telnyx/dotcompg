import { useState, useMemo } from "react";
import {
  CONSTRAINT_RANGE_DAYS,
  type DisplayTimeRange,
  type TimeRange,
} from "utils/dashboards";
import { LocalStorage } from "data/storage";
import { getItem } from "./useLocalStorage";

// Constants for date calculations
const DEFAULT_DISPLAY_TIME_RANGE = { hours: 1 };
export const MILLISECONDS_PER_MINUTE = 60000;

export const getDefaultStartAndEndDate = (
  displayTimeRange: DisplayTimeRange = DEFAULT_DISPLAY_TIME_RANGE
) => {
  const endDate = new Date();
  const startDate = new Date(endDate);

  // this code only gets actual data from storage if this method is called in client-side too
  const timeIntervalFromStorage = Number(
    String(getItem(LocalStorage.TIME_INTERVAL))
  );

  const hoursToSubtract = displayTimeRange.hours || 0;
  const minutesToSubtract =
    timeIntervalFromStorage || displayTimeRange.minutes || 0;

  startDate.setHours(endDate.getHours() - hoursToSubtract);
  startDate.setMinutes(endDate.getMinutes() - minutesToSubtract);

  // make sure dates are normalize and avoid rerenderings due to seconds and ms mismatch
  startDate.setSeconds(0);
  startDate.setMilliseconds(0);
  endDate.setSeconds(0);
  endDate.setMilliseconds(0);

  return {
    start: startDate.toISOString(),
    end: endDate.toISOString(),
  };
};

export const formatForDatetimeLocal = (date: Date): string => {
  // Get local timezone offset in minutes
  const timezoneOffset = date.getTimezoneOffset();

  // Create new date adjusted for local timezone
  const localDate = new Date(
    date.getTime() - timezoneOffset * MILLISECONDS_PER_MINUTE
  );

  // Return in datetime-local format (YYYY-MM-DDThh:mm)
  return localDate.toISOString().slice(0, 16);
};

export const formatForISOString = (datetimeLocal: string): string => {
  // Create initial date object from input
  const date = new Date(datetimeLocal);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format");
  }

  // Adjust date by considering the timezone offset
  const utcDate = new Date(date.getTime());

  return utcDate.toISOString();
};

const useDatetimeRange = (
  timeRange?: TimeRange,
  displayTimeRange: DisplayTimeRange = DEFAULT_DISPLAY_TIME_RANGE
) => {
  const [endDate, setEndDate] = useState<Date>(
    timeRange ? new Date(timeRange.end) : new Date()
  );
  const [startDate, setStartDate] = useState<Date>(() => {
    if (timeRange) {
      return new Date(timeRange.start);
    }

    const date = new Date();
    const hoursToSubtract = displayTimeRange.hours || 0;
    const minutesToSubtract = displayTimeRange.minutes || 0;

    date.setHours(endDate.getHours() - hoursToSubtract);
    date.setMinutes(endDate.getMinutes() - minutesToSubtract);

    return date;
  });

  const constraints = useMemo(() => {
    const startDateMin = new Date(endDate);
    startDateMin.setDate(endDate.getDate() - CONSTRAINT_RANGE_DAYS);

    const startDateMax = new Date(endDate);

    const endDateMin = new Date(startDate);
    endDateMin.setDate(startDate.getDate());

    const endDateMax = new Date();

    return {
      start: {
        min: formatForDatetimeLocal(startDateMin),
        max: formatForDatetimeLocal(startDateMax),
      },
      end: {
        min: formatForDatetimeLocal(endDateMin),
        max: formatForDatetimeLocal(endDateMax),
      },
    };
  }, [startDate, endDate]);

  return {
    start: {
      value: formatForDatetimeLocal(startDate),
      setValue: setStartDate,
      ...constraints.start,
    },
    end: {
      value: formatForDatetimeLocal(endDate),
      setValue: setEndDate,
      ...constraints.end,
    },
  };
};

export default useDatetimeRange;
