export interface Vehicle {
  id: string; // uuid() / uuidv4()
  truckPlate: string;
  truckService: string;
  truckInsurance: string;
}

export enum SemitrailerType {
  FlatBed = "FlatBed",
  Dump = "Dump"
}

export interface Semitrailer {
  id: string;
  plate: string;
  type: SemitrailerType;
  nextService: string;
}

export interface Driver {
  id: number;
  name: string;
  surname: string;
  phoneNumber: string;
  email: string
}

export interface SemitrailerVehicleSet {
  id: string;
  semitrailerId: string;
  vehicleId: string;
  driverId: string;
}

export interface SemitrailerVehicleSetDetails {
  vehicle: Vehicle;
  semitrailer: Semitrailer;
  id: string;
  driver: Driver;
}
