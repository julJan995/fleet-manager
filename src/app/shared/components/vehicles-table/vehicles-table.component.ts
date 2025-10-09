import { Component, inject } from '@angular/core';
import { Vehicle } from '../../models/vehicle.interface';
import { MatTableModule } from '@angular/material/table';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { VehiclesService } from '../../../core/services/vehicles.service';
import { VehicleFormDialogComponent } from '../../../features/vehicle-form-dialog/vehicle-form-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
export class VehiclesTableComponent {
  vehiclesService = inject(VehiclesService);
  dialog = inject(MatDialog);

  vehicles = this.vehiclesService.vehicles;

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

  addVehicle() {
    const dialogRef = this.dialog.open(VehicleFormDialogComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

}
