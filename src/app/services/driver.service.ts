import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Driver } from '../models';
import { ApiService } from './api-service/api.service';

@Injectable({
  providedIn: 'root'
})

export class DriverService {
  readonly driverUrl = 'http://localhost:3000/drivers';

  constructor(private readonly apiService: ApiService) { }

  addDriver(data: Driver): Observable<Driver> {
    return this.apiService.post(this.driverUrl, data);
  }

  getDriversList(): Observable<Driver[]> {
    return this.apiService.get(this.driverUrl);
  }

  deleteDriver(id: number): Observable<any> {
    return this.apiService.delete(`${this.driverUrl}/${id}`);
  }
}
