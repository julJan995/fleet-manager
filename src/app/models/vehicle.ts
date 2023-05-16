export interface Vehicle {
  id: string; // uuid() / uuidv4()
  plate: string;
  nextService: string;
  insurance: string;
  name: string;
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
  id: string;
  name: string;
  surname: string;
  phoneNumber: string;
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
