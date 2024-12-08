import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

import type { City, WeatherState } from '../../types';

const loadCities = (): City[] => {
  const saved = localStorage.getItem('weatherCities');
  return saved ? JSON.parse(saved) : [];
};

const initialState: WeatherState = {
  cities: loadCities(),
  status: 'idle',
  error: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    addCity: (state, action: PayloadAction<City>) => {
      const exists = state.cities.some(city => city.id === action.payload.id);
      if (!exists) {
        state.cities.push(action.payload);
        localStorage.setItem('weatherCities', JSON.stringify(state.cities));
      }
    },
    removeCity: (state, action: PayloadAction<string>) => {
      state.cities = state.cities.filter(city => city.id !== action.payload);
      localStorage.setItem('weatherCities', JSON.stringify(state.cities));
    },
    updateCity: (state, action: PayloadAction<City>) => {
      const index = state.cities.findIndex(city => city.id === action.payload.id);
      if (index !== -1) {
        state.cities[index] = action.payload;
        localStorage.setItem('weatherCities', JSON.stringify(state.cities));
      }
    },
  },
});

export const { addCity, removeCity, updateCity } = weatherSlice.actions;
export default weatherSlice;
