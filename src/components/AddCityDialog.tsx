import { useDispatch, useSelector } from 'react-redux';

import type { RootState } from '@/store/store';

import { useCitySearch } from '@/hooks';
import { useGetCityWeatherQuery } from '@/services/weatherApi';
import { addCity } from '@/store/slices/openWeatherApiSlice';

import { Button, DialogContent, DialogDescription, DialogHeader, DialogTitle, Input } from './ui';

const AddCityDialog = () => {
  const dispatch = useDispatch();
  const existingCities = useSelector((state: RootState) => state.weather.cities);

  const { cityName, errorMessage, handleInputChange, resetCityName, setErrorMessage } =
    useCitySearch(existingCities);

  const { data: cityData, error } = useGetCityWeatherQuery(cityName, {
    skip: !cityName,
  });

  const handleAddCity = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    if (cityData) {
      dispatch(addCity(cityData));
      resetCityName();
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add New City</DialogTitle>
        <DialogDescription>Enter the name of the city you want to track</DialogDescription>
      </DialogHeader>
      <form className="grid gap-4 py-4" onSubmit={handleAddCity}>
        <Input
          value={cityName}
          onChange={e => handleInputChange(e.target.value)}
          placeholder="Enter city name"
        />
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <Button disabled={!cityName || !!error} type="submit">
          Add City
        </Button>
      </form>
    </DialogContent>
  );
};

export default AddCityDialog;
