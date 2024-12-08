import { act, renderHook } from '@testing-library/react';

import { useDebouncedValue } from '@/hooks/useDebouncedValue';

describe('useDebouncedValue', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should initialize with an empty string', () => {
    const { result } = renderHook(() => useDebouncedValue(500));
    expect(result.current.debouncedValue).toBe('');
  });

  it('should update debouncedValue after the specified delay', () => {
    const { result } = renderHook(() => useDebouncedValue(500));

    act(() => {
      result.current.handleChange('test');
      jest.advanceTimersByTime(500);
    });

    expect(result.current.debouncedValue).toBe('test');
  });
});
