import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api-service/api.service';
import { Vehicle } from '../models';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private readonly apiService: ApiService) { }

  readonly vehicleUrl = 'http://localhost:3000/vehicles'

  addVehicle(data: Vehicle): Observable<Vehicle> {
    return this.apiService.post(this.vehicleUrl, data);
  }

  updateVehiclesList(id: number, data: any) {
    return this.apiService.update(`${this.vehicleUrl}/${id}`, data)
  }

  getVehiclesList(): Observable<Vehicle[]> {
    return this.apiService.get(this.vehicleUrl);
  }

  deleteVehicle(id: number): Observable<any> {
    return this.apiService.delete(`${this.vehicleUrl}/${id}`);
  }
}
