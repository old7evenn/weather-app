import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import configureStore from 'redux-mock-store';

import CityDetails from '@/components/CityDetails';
import * as useDataFetchingHook from '@/hooks/useDataFetching';
import * as weatherApiHooks from '@/services/weatherApi';

import '@testing-library/jest-dom';

jest.mock('lucide-react', () => ({
  ChevronLeft: () => <div data-testid="chevron-left-icon" />,
  RefreshCw: () => <div data-testid="refresh-icon" />,
}));

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }: any) => (
    <button data-testid="mock-button" {...props}>
      {children}
    </button>
  ),
}));

jest.mock('@/components/LoadingSpinner', () => ({
  LoadingSpinner: ({ message }: { message?: string }) => (
    <div data-testid="loading-spinner">{message}</div>
  ),
}));

jest.mock('@/components/ErrorMessage', () => ({
  ErrorMessage: ({ message }: { message?: string }) => (
    <div data-testid="error-message">{message || 'An error occurred'}</div>
  ),
}));

const mockStore = configureStore([]);

const mockWeatherData = {
  name: 'New York',
  country: 'US',
  icon: '01d',
  temp: 25,
  description: 'Sunny',
  feelsLike: 27,
  humidity: 60,
  windSpeed: 5,
};

const mockHourlyForecast = [
  { time: '12:00', temperature: 25, icon: '01d' },
  { time: '13:00', temperature: 26, icon: '02d' },
];

describe('CityDetails Component', () => {
  let useGetCityWeatherQueryMock: jest.Mock;
  let useGetHourlyForecastQueryMock: jest.Mock;
  let useDataFetchingMock: jest.Mock;

  beforeEach(() => {
    useGetCityWeatherQueryMock = jest.fn();
    useGetHourlyForecastQueryMock = jest.fn();
    useDataFetchingMock = jest.fn();

    jest
      .spyOn(weatherApiHooks, 'useGetCityWeatherQuery')
      .mockImplementation(useGetCityWeatherQueryMock);
    jest
      .spyOn(weatherApiHooks, 'useGetHourlyForecastQuery')
      .mockImplementation(useGetHourlyForecastQueryMock);
    jest.spyOn(useDataFetchingHook, 'useDataFetching').mockImplementation(useDataFetchingMock);
  });

  const renderComponent = (cityName = 'New York') => {
    const store = mockStore({});

    return render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/city/${cityName}`]}>
          <Routes>
            <Route element={<CityDetails />} path="/city/:cityName" />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  };

  it('shows loading spinner when data is loading', () => {
    useGetCityWeatherQueryMock.mockReturnValue({
      isLoading: true,
      data: null,
      error: null,
    });
    useGetHourlyForecastQueryMock.mockReturnValue({
      isLoading: true,
      data: null,
      error: null,
    });
    useDataFetchingMock.mockReturnValue({ isRefreshing: false, refetchWithDelay: jest.fn() });

    renderComponent();

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    expect(screen.getByText('Loading weather details...')).toBeInTheDocument();
  });

  it('shows error message when data fetching fails', () => {
    useGetCityWeatherQueryMock.mockReturnValue({
      isLoading: false,
      data: null,
      error: new Error('Weather fetch error'),
    });
    useGetHourlyForecastQueryMock.mockReturnValue({
      isLoading: false,
      data: null,
      error: new Error('Forecast fetch error'),
    });
    useDataFetchingMock.mockReturnValue({ isRefreshing: false, refetchWithDelay: jest.fn() });

    renderComponent();

    expect(screen.getByTestId('error-message')).toBeInTheDocument();
  });

  it('renders city details when data is available', () => {
    useGetCityWeatherQueryMock.mockReturnValue({
      isLoading: false,
      data: mockWeatherData,
      error: null,
      refetch: jest.fn(),
    });
    useGetHourlyForecastQueryMock.mockReturnValue({
      isLoading: false,
      data: mockHourlyForecast,
      error: null,
    });
    useDataFetchingMock.mockReturnValue({
      isRefreshing: false,
      refetchWithDelay: jest.fn(),
    });

    renderComponent();

    expect(screen.getByText('New York, US')).toBeInTheDocument();

    expect(screen.getByText('25°C')).toBeInTheDocument();
    expect(screen.getByText('Sunny')).toBeInTheDocument();

    expect(screen.getByText('Feels Like')).toBeInTheDocument();
    expect(screen.getByText('27°C')).toBeInTheDocument();
    expect(screen.getByText('Humidity')).toBeInTheDocument();
    expect(screen.getByText('60%')).toBeInTheDocument();
  });

  it('handles refresh functionality', () => {
    const mockRefetchWithDelay = jest.fn();

    useGetCityWeatherQueryMock.mockReturnValue({
      isLoading: false,
      data: mockWeatherData,
      error: null,
      refetch: jest.fn(),
    });
    useGetHourlyForecastQueryMock.mockReturnValue({
      isLoading: false,
      data: mockHourlyForecast,
      error: null,
    });
    useDataFetchingMock.mockReturnValue({
      isRefreshing: false,
      refetchWithDelay: mockRefetchWithDelay,
    });

    renderComponent();

    const refreshButtons = screen.getAllByTestId('mock-button');
    const refreshButton = refreshButtons.find(button =>
      button.textContent?.includes('Refresh Weather')
    );

    if (refreshButton) {
      fireEvent.click(refreshButton);
    }

    expect(mockRefetchWithDelay).toHaveBeenCalledTimes(1);
  });

  it('renders back to cities link', () => {
    useGetCityWeatherQueryMock.mockReturnValue({
      isLoading: false,
      data: mockWeatherData,
      error: null,
      refetch: jest.fn(),
    });
    useGetHourlyForecastQueryMock.mockReturnValue({
      isLoading: false,
      data: mockHourlyForecast,
      error: null,
    });
    useDataFetchingMock.mockReturnValue({
      isRefreshing: false,
      refetchWithDelay: jest.fn(),
    });

    renderComponent();

    const backButton = screen.getByText('Back to Cities');
    expect(backButton).toBeInTheDocument();
  });
});
