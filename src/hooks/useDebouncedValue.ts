import { debounce } from 'lodash';
import { useCallback, useState } from 'react';

export const useDebouncedValue = (delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState('');

  const handleChange = useCallback(
    debounce((value: string) => setDebouncedValue(value), delay),
    [delay]
  );

  return {
    debouncedValue,
    handleChange,
  };
};
