import { configureStore } from '@reduxjs/toolkit';

import { weatherApi } from '@/services/weatherApi';

import weatherSlice from './slices/openWeatherApiSlice';

export const store = configureStore({
  reducer: {
    [weatherSlice.reducerPath]: weatherSlice.reducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(weatherApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
