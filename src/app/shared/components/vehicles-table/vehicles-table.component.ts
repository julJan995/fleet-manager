import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, inject } from '@angular/core';
import { Vehicle } from '../../models/vehicle.interface';
import { MatTableModule } from '@angular/material/table';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-vehicles-table',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatButton
  ],
  templateUrl: './vehicles-table.component.html',
  styleUrl: './vehicles-table.component.scss'
})
export class VehiclesTableComponent implements AfterViewInit {
  http = inject(HttpClient);
  mockData: Vehicle[] = [];

  columnsToDisplay = [
    'make',
    'model',
    'year',
    'licensePlate'
  ];
  columnLabels: Record<string, string> = {
    make: 'Make',
    model: 'Model',
    year: 'Year',
    licensePlate: 'License Plate',
  };
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Vehicle | null = null;

  isExpanded(element: Vehicle) {
    return this.expandedElement === element;
  }

  toggle(element: Vehicle) {
    this.expandedElement = this.isExpanded(element) ? null : element;
  }

  ngAfterViewInit() {
    this.http.get<Vehicle[]>('mock/vehicles.json')
      .subscribe(data => {
        console.log('data', data)
        this.mockData = data;
      });
  }

  addVehicle() {
    console.log('Add vehicle');
  }
}
