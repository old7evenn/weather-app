import { debounce } from 'lodash';
import { useCallback, useState } from 'react';

export const useCitySearch = (existingCities: any[]) => {
  const [cityName, setCityName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [debouncedCity, setDebouncedCity] = useState('');

  const debouncedSetCity = useCallback(
    debounce((value: string) => setDebouncedCity(value), 500),
    []
  );

  const handleInputChange = (value: string) => {
    setCityName(value);
    debouncedSetCity(value);
    setErrorMessage('');

    if (existingCities.some(city => city.name.toLowerCase() === value.toLowerCase())) {
      setErrorMessage('This city is already added.');
    }
  };

  const resetCityName = () => {
    setCityName('');
    setDebouncedCity('');
  };

  return {
    cityName,
    errorMessage,
    debouncedCity,
    handleInputChange,
    resetCityName,
    setErrorMessage,
  };
};
