import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api-service/api.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private readonly apiService: ApiService) { }

  readonly vehicleUrl = 'http://localhost:3000/vehicles'

  addVehicle(data: any): Observable<any> {
    return this.apiService.post(this.vehicleUrl, data);
  }

  updateVehiclesList(id: number, data: any) {
    return this.apiService.update(`${this.vehicleUrl}/${id}`, data)
  }

  getVehiclesList(): Observable<any[]> {
    return this.apiService.get(this.vehicleUrl);
  }

  deleteVehicle(id: number): Observable<any> {
    return this.apiService.delete(`${this.vehicleUrl}/${id}`);
  }
}
