export interface Vehicle {
  id: string;
  owner: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  bodyType?: string;
  fuelType: string;
  vin?: string;
  currentMileage?: number;
  power?: string;
  notes?: string;
  location?: string;
  assignedDriver?: string;
  insuranceProvider?: string;
  insurancePolicyNumber?: string;
  insuranceExpiryDate: Date;
  lastServiceDate?: Date;
  nextServiceDue: Date;
  serviceHistory?: any;
  additionalData?: any;
  purchaseDate?: Date;
  purchaseMileage?: number;
  purchasePrice?: number;
  currentValue?: number;
  // imgUrl?: string;
}
