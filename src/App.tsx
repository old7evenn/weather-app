import { BrowserRouter, Route, Routes } from 'react-router-dom';

import CityDetails from './components/CityDetails.tsx';
import CityList from './components/CityLists.tsx';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<CityList />} path="/" />
        <Route element={<CityDetails />} path="/city/:cityName" />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
