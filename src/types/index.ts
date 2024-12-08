export interface City {
  country: string;
  description: string;
  feelsLike: number;
  humidity: number;
  icon: string;
  id: string;
  lastUpdated: number;
  name: string;
  temp: number;
  windSpeed: number;
}

export interface HourlyForecast {
  icon: string;
  temperature: number;
  time: string;
}

export interface WeatherState {
  cities: City[];
  error: string | null;
  status: 'failed' | 'idle' | 'loading' | 'succeeded';
}
