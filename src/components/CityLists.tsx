import { PlusIcon } from 'lucide-react';
import { useMemo } from 'react';

import { useAppSelector } from '@/store/hooks';

import AddCityDialog from './AddCityDialog';
import CityCard from './CityCard';
import { Button, Dialog, DialogTrigger } from './ui';

const CityList = () => {
  const cities = useAppSelector(state => state.weather.cities);

  const hasCities = useMemo(() => cities.length > 0, [cities]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Weather</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <PlusIcon className="mr-2 h-4 w-4" /> Add City
            </Button>
          </DialogTrigger>
          <AddCityDialog />
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {!hasCities ? (
          <div className="col-span-full text-center text-gray-500">
            No cities added. Click "Add City" to start tracking.
          </div>
        ) : (
          cities.map(city => <CityCard key={city.id} city={city} />)
        )}
      </div>
    </div>
  );
};

export default CityList;
