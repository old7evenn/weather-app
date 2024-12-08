import { act, renderHook, waitFor } from '@testing-library/react';

import { useDataFetching } from '@/hooks/useDataFetching';

describe('useDataFetching', () => {
  let mockFetchFn: jest.Mock;

  beforeEach(() => {
    mockFetchFn = jest.fn().mockResolvedValue(null);
  });

  it('should initialize with isRefreshing as false', () => {
    const { result } = renderHook(() => useDataFetching({ fetchFn: mockFetchFn }));

    expect(result.current.isRefreshing).toBe(false);
  });

  it('should call fetchFn and set isRefreshing during fetch', async () => {
    const { result } = renderHook(() => useDataFetching({ fetchFn: mockFetchFn }));

    act(() => {
      result.current.refetchWithDelay();
    });

    await waitFor(() => expect(result.current.isRefreshing).toBe(true));

    await waitFor(() => expect(result.current.isRefreshing).toBe(false));

    expect(mockFetchFn).toHaveBeenCalledTimes(1);
  });

  it('should wait for the specified delay before finishing', async () => {
    jest.useFakeTimers();
    const delay = 1000;

    const { result } = renderHook(() => useDataFetching({ fetchFn: mockFetchFn, delay }));

    act(() => {
      result.current.refetchWithDelay();
    });

    jest.advanceTimersByTime(500);
    await waitFor(() => expect(result.current.isRefreshing).toBe(true));

    jest.advanceTimersByTime(500);
    await waitFor(() => expect(result.current.isRefreshing).toBe(false));

    expect(mockFetchFn).toHaveBeenCalledTimes(1);
    jest.useRealTimers();
  });
});
