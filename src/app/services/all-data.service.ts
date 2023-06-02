import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Vehicle } from '../models';

import { ApiService } from './api-service/api.service';

@Injectable({
  providedIn: 'root'
})
export class AllDataService {
  readonly vehicleUrl = 'http://localhost:3000/vehicles';

  constructor(private readonly apiService: ApiService) { }

  addVehicle(data: Vehicle): Observable<Vehicle> {
    return this.apiService.post(this.vehicleUrl, data);
  }

  updateVehicleList(id: number, data: any) {
    return this.apiService.update(`${this.vehicleUrl}/${id}`, data)
  }

  getVehicleList(): Observable<Vehicle[]> {
    return this.apiService.get(this.vehicleUrl);
  }

  deleteVehicle(id: number): Observable<any> {
    return this.apiService.delete(`${this.vehicleUrl}/${id}`);
  }
}
