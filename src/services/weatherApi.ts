import { City, HourlyForecast } from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY = import.meta.env.VITE_OPEN_WEATHER_APP_ID || '';

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.openweathermap.org/data/2.5',
  }),
  endpoints: builder => ({
    getCityWeather: builder.query<City, string>({
      query: cityName => ({
        url: 'weather',
        params: {
          q: cityName,
          appid: API_KEY,
          units: 'metric',
        },
      }),
      transformResponse: (response: any): City => ({
        id: `${response.name}-${response.sys.country}`,
        name: response.name,
        country: response.sys.country,
        temp: Math.round(response.main.temp),
        feelsLike: Math.round(response.main.feels_like),
        humidity: response.main.humidity,
        windSpeed: response.wind.speed,
        description: response.weather[0].description,
        icon: response.weather[0].icon,
        lastUpdated: Date.now(),
      }),
    }),
    getHourlyForecast: builder.query<HourlyForecast[], string>({
      query: cityName => ({
        url: 'forecast',
        params: {
          q: cityName,
          appid: API_KEY,
          units: 'metric',
        },
      }),
      transformResponse: (response: any): HourlyForecast[] =>
        response.list
          .filter((_: any, index: number) => index % 3 === 0)
          .slice(0, 8)
          .map((item: any) => ({
            time: new Date(item.dt * 1000).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
            temperature: Math.round(item.main.temp),
            icon: item.weather[0].icon,
          })),
    }),
  }),
});

export const { useGetCityWeatherQuery, useGetHourlyForecastQuery, useLazyGetCityWeatherQuery } =
  weatherApi;
