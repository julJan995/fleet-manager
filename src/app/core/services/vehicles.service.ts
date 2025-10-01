import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vehicle } from '../../shared/models/vehicle.interface';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {
  private http = inject(HttpClient);
  private readonly vehiclesUrl = 'mock/vehicles.json';

  private readonly _vehicles = signal<Vehicle[]>([]);
  readonly vehicles = this._vehicles.asReadonly();

  constructor() {
    this.loadVehicles();
  }

  loadVehicles() {
    this.http.get<Vehicle[]>(this.vehiclesUrl).pipe(
      catchError(err => {
        console.error('Error loading vehicles', err);
        return of([] as Vehicle[]);
      })
    ).subscribe(data => this._vehicles.set(data));
  }

  addVehicle(vehicle: Vehicle) {
    this._vehicles.update(list => [...list, vehicle]);
  }

  removeVehicle(id: string) {
    this._vehicles.update(list => list.filter(v => v.id !== id));
  }

  updateVehicle(updated: Vehicle) {
    this._vehicles.update(list =>
      list.map(v => v.id === updated.id ? { ...v, ...updated } : v)
    );
  }
}
