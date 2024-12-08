import { act, renderHook } from '@testing-library/react';

import { useCitySearch } from '@/hooks/useCitySearch';

jest.useFakeTimers();

describe('useCitySearch', () => {
  const mockCities = [{ name: 'Kyiv' }, { name: 'Lviv' }, { name: 'Odessa' }];

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useCitySearch(mockCities));

    expect(result.current.cityName).toBe('');
    expect(result.current.errorMessage).toBe('');
    expect(result.current.debouncedCity).toBe('');
  });

  it('should update cityName and debouncedCity correctly', () => {
    const { result } = renderHook(() => useCitySearch(mockCities));

    act(() => {
      result.current.handleInputChange('Kharkiv');
    });

    expect(result.current.cityName).toBe('Kharkiv');
    expect(result.current.errorMessage).toBe('');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current.debouncedCity).toBe('Kharkiv');
  });

  it('should set an error if the city already exists', () => {
    const { result } = renderHook(() => useCitySearch(mockCities));

    act(() => {
      result.current.handleInputChange('Kyiv');
    });

    expect(result.current.errorMessage).toBe('This city is already added.');
  });

  it('should clear error when a new city is typed', () => {
    const { result } = renderHook(() => useCitySearch(mockCities));

    act(() => {
      result.current.handleInputChange('Kyiv');
    });

    expect(result.current.errorMessage).toBe('This city is already added.');

    act(() => {
      result.current.handleInputChange('Kharkiv');
    });

    expect(result.current.errorMessage).toBe('');
  });

  it('should reset cityName and debouncedCity', () => {
    const { result } = renderHook(() => useCitySearch(mockCities));

    act(() => {
      result.current.handleInputChange('Kharkiv');
    });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    act(() => {
      result.current.resetCityName();
    });

    expect(result.current.cityName).toBe('');
    expect(result.current.debouncedCity).toBe('');
    expect(result.current.errorMessage).toBe('');
  });

  it('should allow manually setting an error message', () => {
    const { result } = renderHook(() => useCitySearch(mockCities));

    act(() => {
      result.current.setErrorMessage('Custom error message');
    });

    expect(result.current.errorMessage).toBe('Custom error message');
  });
});
