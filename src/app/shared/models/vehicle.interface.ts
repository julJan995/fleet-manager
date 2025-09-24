export interface Vehicle {
  id: string;
  bodyType?: string;
  make: string;
  model: string;
  year: number;
  vin?: string;
  licensePlate: string;
  mileage: number;
  fuelType: string;
  firstRegistrationDate?: Date;
  purchaseDate?: Date;
  purchasePrice?: number;
  currentValue?: number;
  location?: string;
  assignedDriver?: string;
  insuranceProvider?: string;
  insurancePolicyNumber?: string;
  insuranceExpiryDate: Date;
  notes?: string;
  lastServiceDate?: Date;
  nextServiceDue: Date;
  power?: string;
  imgUrl?: string;
  serviceHistory?: any;
  additionalData?: any;
}
