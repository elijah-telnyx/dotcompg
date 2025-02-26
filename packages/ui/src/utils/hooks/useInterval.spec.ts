import { renderHook } from '@testing-library/react';
import useInterval from './useInterval';

describe('useInterval', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('should return run function', () => {
    const callback = jest.fn();
    const { result } = renderHook(() =>
      useInterval({ timeSeconds: 1, callback })
    );

    expect(result.current.run).toBeDefined();
    expect(typeof result.current.run).toBe('function');
  });

  it('should call callback after specified interval', () => {
    const callback = jest.fn();
    const { result } = renderHook(() =>
      useInterval({ timeSeconds: 2, callback })
    );

    result.current.run();
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(2000);
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(2000);
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('should clear previous interval when run is called multiple times', () => {
    const callback = jest.fn();
    const { result } = renderHook(() =>
      useInterval({ timeSeconds: 1, callback })
    );

    result.current.run();
    jest.advanceTimersByTime(500);

    result.current.run(); // Reset timer
    jest.advanceTimersByTime(500);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(500);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should not set interval if timeSeconds is 0', () => {
    const callback = jest.fn();
    const { result } = renderHook(() =>
      useInterval({ timeSeconds: 0, callback })
    );

    result.current.run();
    jest.advanceTimersByTime(1000);

    expect(callback).not.toHaveBeenCalled();
  });

  it('should clear interval on unmount', () => {
    const callback = jest.fn();
    const { result, unmount } = renderHook(() =>
      useInterval({ timeSeconds: 1, callback })
    );

    result.current.run();
    unmount();
    jest.advanceTimersByTime(1000);

    expect(callback).not.toHaveBeenCalled();
  });
});
