import { useState } from 'react';

interface UseDataFetchingProps {
  delay?: number;
  fetchFn: () => Promise<any>;
}

export const useDataFetching = ({ fetchFn, delay = 500 }: UseDataFetchingProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refetchWithDelay = async () => {
    setIsRefreshing(true);
    try {
      await Promise.all([fetchFn(), new Promise(resolve => setTimeout(resolve, delay))]);
    } finally {
      setIsRefreshing(false);
    }
  };

  return {
    isRefreshing,
    refetchWithDelay,
  };
};
