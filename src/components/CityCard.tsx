import { Info, RefreshCw, Trash2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import type { City } from '@/types';

import { useDataFetching } from '@/hooks/useDataFetching';
import { useGetCityWeatherQuery } from '@/services/weatherApi';
import { removeCity } from '@/store/slices/openWeatherApiSlice';

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui';

interface CityCardProps {
  city: City;
}

const CityCard = ({ city }: CityCardProps) => {
  const dispatch = useDispatch();
  const { refetch, isFetching } = useGetCityWeatherQuery(city.name);

  const { isRefreshing, refetchWithDelay } = useDataFetching({
    fetchFn: refetch,
  });

  const handleRefresh = () => {
    refetchWithDelay();
  };

  const isLoading = isFetching || isRefreshing;

  const handleRemoveCity = () => {
    dispatch(removeCity(city.id));
  };

  return (
    <Card className="w-full max-w-sm shadow-lg mx-auto">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {city.name}, {city.country}
          <img
            alt="Weather icon"
            className="w-12 h-12"
            src={`http://openweathermap.org/img/wn/${city.icon}@2x.png`}
          />
        </CardTitle>
        <CardDescription className="capitalize">{city.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-4xl font-bold">{city.temp}°C</p>
            <p className="text-sm text-gray-500">Feels like {city.feelsLike}°C</p>
          </div>
          <div className="text-right">
            <p>Humidity: {city.humidity}%</p>
            <p>Wind: {city.windSpeed} m/s</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button disabled={isFetching} size="icon" variant="outline" onClick={handleRefresh}>
                {isLoading ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isLoading ? 'Updating...' : 'Refresh Weather'}</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="destructive" onClick={handleRemoveCity}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Remove City</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link to={`/city/${city.name}`}>
                <Button size="icon" variant="secondary">
                  <Info className="h-4 w-4" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>City Details</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
};

export default CityCard;
