import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, inject } from '@angular/core';
import { Vehicle } from '../../models/vehicle.interface';

@Component({
  selector: 'app-vehicles-table',
  imports: [],
  templateUrl: './vehicles-table.component.html',
  styleUrl: './vehicles-table.component.scss'
})
export class VehiclesTableComponent implements AfterViewInit {
  http = inject(HttpClient);

  ngAfterViewInit() {
    this.http.get<Vehicle[]>('mock/vehicles.json')
      .subscribe(data => console.log('data', data));
  }
}
