import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import CityList from '@/components/CityLists';

import '@testing-library/jest-dom';

jest.mock('lucide-react', () => ({
  PlusIcon: () => <div data-testid="plus-icon" />,
}));

jest.mock('@/components/AddCityDialog', () => () => <div data-testid="add-city-dialog" />);
jest.mock('@/components/CityCard', () => ({ city }: { city: any }) => (
  <div data-testid="city-card">{city.name}</div>
));

jest.mock('@/store/hooks', () => ({
  useAppSelector: jest.fn(),
}));

const mockStore = configureStore([]);

describe('CityList Component', () => {
  let useAppSelectorMock: jest.Mock;

  beforeEach(() => {
    useAppSelectorMock = require('@/store/hooks').useAppSelector as jest.Mock;
  });

  it('renders the main heading', () => {
    useAppSelectorMock.mockReturnValue([]);

    const store = mockStore({
      weather: { cities: [] },
    });

    render(
      <Provider store={store}>
        <CityList />
      </Provider>
    );

    expect(screen.getByText('Weather')).toBeInTheDocument();
  });

  it('renders "Add City" button', () => {
    useAppSelectorMock.mockReturnValue([]);

    const store = mockStore({
      weather: { cities: [] },
    });

    render(
      <Provider store={store}>
        <CityList />
      </Provider>
    );

    const addCityButton = screen.getByRole('button', { name: /add city/i });
    expect(addCityButton).toBeInTheDocument();
  });

  it('displays no cities message when city list is empty', () => {
    useAppSelectorMock.mockReturnValue([]);

    const store = mockStore({
      weather: { cities: [] },
    });

    render(
      <Provider store={store}>
        <CityList />
      </Provider>
    );

    expect(
      screen.getByText(/No cities added\. Click "Add City" to start tracking\./i)
    ).toBeInTheDocument();
  });

  it('renders city cards when cities exist', () => {
    const mockCities = [
      { id: '1', name: 'New York' },
      { id: '2', name: 'London' },
    ];

    useAppSelectorMock.mockReturnValue(mockCities);

    const store = mockStore({
      weather: { cities: mockCities },
    });

    render(
      <Provider store={store}>
        <CityList />
      </Provider>
    );

    const cityCards = screen.getAllByTestId('city-card');
    expect(cityCards).toHaveLength(2);
    expect(cityCards[0]).toHaveTextContent('New York');
    expect(cityCards[1]).toHaveTextContent('London');
  });

  it('renders grid layout for cities', () => {
    const mockCities = [
      { id: '1', name: 'New York' },
      { id: '2', name: 'London' },
    ];

    useAppSelectorMock.mockReturnValue(mockCities);

    const store = mockStore({
      weather: { cities: mockCities },
    });

    const { container } = render(
      <Provider store={store}>
        <CityList />
      </Provider>
    );

    const gridContainer = container.querySelector('.grid');
    expect(gridContainer).toBeInTheDocument();
    expect(gridContainer).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3');
  });
});
