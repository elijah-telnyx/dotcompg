import type { CollapsibleDashboardProps } from "components/CollapsibleDashboard";
import {
  rangeDateISOToUnixTimestamp,
  validateTimeRange,
  calculateStep,
  TIME,
  getDefaultPanelsWebNotification,
  getStoragePanelsWebNotification,
} from ".";
import { getItem } from "utils/hooks/useLocalStorage";

describe("validateTimeRange", () => {
  const mockCurrentTime = 1704067200; // 2024-01-01 00:00:00 UTC

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(mockCurrentTime * 1000));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("should accept valid time range", () => {
    const start = mockCurrentTime - 3600; // 1 hour ago
    const end = mockCurrentTime;

    expect(() => {
      validateTimeRange(start, end);
    }).not.toThrow();
  });

  test("should throw error when start equals end", () => {
    const time = mockCurrentTime;

    expect(() => {
      validateTimeRange(time, time);
    }).toThrow("Start time must be before end time");
  });

  test("should throw error when start is after end", () => {
    const start = mockCurrentTime;
    const end = mockCurrentTime - 3600;

    expect(() => {
      validateTimeRange(start, end);
    }).toThrow("Start time must be before end time");
  });

  test("should throw error when end is in future", () => {
    const start = mockCurrentTime - 3600;
    const end = mockCurrentTime + 3600;

    expect(() => {
      validateTimeRange(start, end);
    }).toThrow("End time cannot be in the future");
  });

  test("should accept time range exactly at current time", () => {
    const start = mockCurrentTime - 3600;
    const end = mockCurrentTime;

    expect(() => {
      validateTimeRange(start, end);
    }).not.toThrow();
  });
});

describe("calculateStep", () => {
  test("should return 5 minute step for 1-3hr time diff", () => {
    const timeRange = {
      start: "2025-02-13T12:00:00.000Z",
      end: "2025-02-13T14:00:00.000Z",
    };
    const result = calculateStep(timeRange);
    expect(result).toEqual(TIME.ONE_MINUTE * 5);
  });
  test("should return 10 minute step for 3:01-6 hour time diff", () => {
    const timeRange = {
      start: "2025-02-13T09:00:00.000Z",
      end: "2025-02-13T14:00:00.000Z",
    };
    const result = calculateStep(timeRange);
    expect(result).toEqual(TIME.ONE_MINUTE * 10);
  });
  test("should return 30 minute step for 6:01-24hr hour time diff", () => {
    const timeRange = {
      start: "2025-02-13T06:00:00.000Z",
      end: "2025-02-13T14:00:00.000Z",
    };
    const result = calculateStep(timeRange);
    expect(result).toEqual(TIME.ONE_MINUTE * 30);
  });
});

describe("rangeDateISOToUnixTimestamp", () => {
  const mockCurrentTime = 1704067200; // 2024-01-01 00:00:00 UTC

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(mockCurrentTime * 1000));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("should return default start time when no date provided", () => {
    const result = rangeDateISOToUnixTimestamp("start");
    expect(result).toBe(mockCurrentTime - 3600); // 1 hour ago
  });

  test("should return default end time when no date provided", () => {
    const result = rangeDateISOToUnixTimestamp("end");
    expect(result).toBe(mockCurrentTime);
  });

  test("should convert valid ISO date string to unix timestamp", () => {
    const isoDate = "2023-12-31T23:00:00Z";
    const expected = 1704063600; // 2023-12-31 23:00:00 UTC
    const result = rangeDateISOToUnixTimestamp("start", isoDate);
    expect(result).toBe(expected);
  });

  test("should throw error for invalid date format", () => {
    const invalidDate = "not-a-date";
    expect(() => {
      rangeDateISOToUnixTimestamp("start", invalidDate);
    }).toThrow(`Invalid date format: ${invalidDate}`);
  });

  test("should handle timezone offset correctly", () => {
    const isoDate = "2024-01-01T02:00:00+02:00";
    const expected = 1704067200; // 2024-01-01 00:00:00 UTC
    const result = rangeDateISOToUnixTimestamp("start", isoDate);
    expect(result).toBe(expected);
  });

  test("should throw error for invalid type parameter", () => {
    expect(() => {
      // @ts-expect-error testing invalid type
      rangeDateISOToUnixTimestamp("invalid", "2024-01-01T00:00:00Z");
    }).toThrow('position must be either "start" or "end"');
  });

  test("should handle future dates for start time", () => {
    const futureDate = "2024-01-02T00:00:00Z";
    const result = rangeDateISOToUnixTimestamp("start", futureDate);
    expect(result).toBe(1704153600); // 2024-01-02 00:00:00 UTC
  });

  test("should handle dates with milliseconds", () => {
    const dateWithMS = "2024-01-01T00:00:00.123Z";
    const result = rangeDateISOToUnixTimestamp("start", dateWithMS);
    expect(result).toBe(1704067200); // Should truncate milliseconds
  });
});
// Mock the useLocalStorage hook
jest.mock("utils/hooks/useLocalStorage", () => ({
  getItem: jest.fn(),
}));

describe("getStoragePanelsWebNotification", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return empty object when storage is empty", () => {
    (getItem as jest.Mock).mockReturnValue(null);
    expect(getStoragePanelsWebNotification()).toEqual({});
  });

  test("should return parsed panels when storage has valid data", () => {
    const mockPanels = { "Panel 1": true, "Panel 2": false };
    (getItem as jest.Mock).mockReturnValue(JSON.stringify(mockPanels));
    expect(getStoragePanelsWebNotification()).toEqual(mockPanels);
  });

  test("should handle invalid JSON in storage", () => {
    (getItem as jest.Mock).mockReturnValue("invalid-json");
    expect(getStoragePanelsWebNotification()).toEqual({});
  });

  test("should return empty object when storage value is empty object", () => {
    (getItem as jest.Mock).mockReturnValue("{}");
    expect(getStoragePanelsWebNotification()).toEqual({});
  });
});

describe("getDefaultPanelsWebNotification", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return empty object for empty sections", () => {
    const sections: CollapsibleDashboardProps[] = [];
    expect(getDefaultPanelsWebNotification(sections)).toEqual({});
  });

  test("should return panels with default state false", () => {
    const sections = [
      {
        items: [
          { id: "test1", chart: { heading: "Panel 1" } },
          { id: "test", chart: { heading: "Panel 2" } },
        ],
      },
    ] as CollapsibleDashboardProps[];
    const expected = {
      "Panel 1": false,
      "Panel 2": false,
    };
    expect(getDefaultPanelsWebNotification(sections)).toEqual(expected);
  });

  test("should return panels with custom default state", () => {
    const sections: CollapsibleDashboardProps[] = [
      {
        items: [
          { chart: { heading: "Panel 1" } },
          { chart: { heading: "Panel 2" } },
        ],
      },
    ] as CollapsibleDashboardProps[];
    const expected = {
      "Panel 1": true,
      "Panel 2": true,
    };
    expect(getDefaultPanelsWebNotification(sections, true)).toEqual(expected);
  });

  test("should skip items without chart heading", () => {
    const sections: CollapsibleDashboardProps[] = [
      {
        items: [
          { chart: { heading: "Panel 1" } },
          { chart: {} },
          { other: "data" },
        ],
      },
    ] as CollapsibleDashboardProps[];
    const expected = {
      "Panel 1": false,
    };
    expect(getDefaultPanelsWebNotification(sections)).toEqual(expected);
  });

  test("should use storage panels when available", () => {
    const storagePanels = { "Panel 1": false, "Panel 2": true };
    (getItem as jest.Mock).mockReturnValue(JSON.stringify(storagePanels));
    const sections = [
      {
        items: [
          { chart: { heading: "Panel 1" } },
          { chart: { heading: "Panel 2" } },
        ],
      },
    ] as CollapsibleDashboardProps[];
    expect(getDefaultPanelsWebNotification(sections)).toEqual(storagePanels);
  });
});
