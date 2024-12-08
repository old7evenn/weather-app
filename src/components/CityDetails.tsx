import { ChevronLeft, RefreshCw } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useDataFetching } from '@/hooks/useDataFetching';
import { useGetCityWeatherQuery, useGetHourlyForecastQuery } from '@/services/weatherApi';

import { ErrorMessage } from './ErrorMessage';
import { LoadingSpinner } from './LoadingSpinner';
import { Button, Card, CardContent, CardHeader, CardTitle } from './ui';

const CityDetails = () => {
  const { cityName } = useParams<{ cityName: string }>();

  const {
    data: weatherData,
    isLoading: isWeatherLoading,
    error: weatherError,
    refetch: refetchWeather,
  } = useGetCityWeatherQuery(cityName || '');

  const {
    data: hourlyForecast,
    isLoading: isForecastLoading,
    error: forecastError,
  } = useGetHourlyForecastQuery(cityName || '');

  const { isRefreshing, refetchWithDelay } = useDataFetching({
    fetchFn: refetchWeather,
  });

  if (isWeatherLoading || isForecastLoading) {
    return <LoadingSpinner message="Loading weather details..." size="large" />;
  }

  if (weatherError || forecastError) {
    return <ErrorMessage />;
  }

  if (!weatherData || !hourlyForecast) {
    return <ErrorMessage message="No weather data available" />;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <Link to="/">
          <Button className="sm:text-md text-sm p-2" variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Cities
          </Button>
        </Link>
        <Button
          className="p-2"
          disabled={isRefreshing}
          variant={isRefreshing ? 'ghost' : 'default'}
          onClick={refetchWithDelay}
        >
          {isRefreshing ? (
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="mr-2 h-4 w-4" />
          )}
          {isRefreshing ? 'Updating...' : 'Refresh Weather'}
        </Button>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="sm:text-2xl text-sm flex justify-between items-center">
              {weatherData.name}, {weatherData.country}
              <img
                alt="Weather icon"
                className="w-16 h-16"
                src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="sm:text-4xl text-md font-bold">{weatherData.temp}°C</p>
              <p className="sm:text-lg text-sm text-gray-600 capitalize">
                {weatherData.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="font-semibold">Feels Like</p>
                  <p>{weatherData.feelsLike}°C</p>
                </div>
                <div>
                  <p className="font-semibold">Humidity</p>
                  <p>{weatherData.humidity}%</p>
                </div>
                <div>
                  <p className="font-semibold">Wind Speed</p>
                  <p>{weatherData.windSpeed} m/s</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hourly Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer height={300} width="100%">
              <LineChart data={hourlyForecast}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis
                  label={{
                    value: 'Temperature (°C)',
                    angle: -90,
                    position: 'insideLeft',
                  }}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-4 border rounded shadow">
                          <p className="font-bold">{data.time}</p>
                          <p>Temperature: {data.temperature}°C</p>
                          <img
                            alt="Hourly weather icon"
                            className="w-12 h-12"
                            src={`http://openweathermap.org/img/wn/${data.icon}@2x.png`}
                          />
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  dataKey="temperature"
                  type="monotone"
                  dot={{ r: 6 }}
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CityDetails;
