import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  vehicleUrl = 'http://localhost:3000/vehicles';
  constructor(private _http: HttpClient) { }

  addVehicle(data: any): Observable<any> {
    return this._http.post(this.vehicleUrl, data);
  }
  getVehicleList(): Observable<any> {
    return this._http.get(this.vehicleUrl);
  }

  deleteVehicle(id: number): Observable<any> {
    return this._http.delete(`${this.vehicleUrl}/${id}`);
  }
}
