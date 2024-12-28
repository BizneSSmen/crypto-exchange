import { useState } from "react";
import { VehicleType } from "../../enums/VehicleType.enum";
import { VehicleTypeList } from "../VehicleType/VehicleTypeList";
import { CarCardList } from "../CarCard/CarCardList";
import { SearchBar } from "./SearchBar";

export const Search = () => {
  const [vehicleType, setVehicleType] = useState<VehicleType>(
    VehicleType.NEW_CARS
  );

  return (
    <div className="search p-1">
      <VehicleTypeList
        onVehicleTypeChange={setVehicleType}
        activeVehicleType={vehicleType}
      />
      <SearchBar />
      <CarCardList />
    </div>
  );
};
