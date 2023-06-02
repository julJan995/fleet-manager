import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { AddEditVehicleComponent } from '../mat-dialogs/add-edit-vehicle/add-edit-vehicle.component';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {
  displayedColumns = [
    'truckPlate',
    'truckService',
    'truckInsurance',
    'action',
  ];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _vehicleService: VehicleService,
    private _snackBarService: SnackbarService,
  ) {}

  ngOnInit(): void {
    this.getVehiclesList();
  }

  openAddVehicleForm() {
    const dialogRef = this._dialog.open(AddEditVehicleComponent);
    dialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.getVehiclesList();
        }
      }
    })
  }

  getVehiclesList() {
    this._vehicleService.getVehiclesList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log('error occured', err);
      }
    })
  }

  deleteVehicle(id: number) {
    this._vehicleService.deleteVehicle(id).subscribe({
      next: (response) => {
        this._snackBarService.openSnackBar('Vehicle deleted', 'done')
        this.getVehiclesList();
      },
      error: console.log,
    })
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(AddEditVehicleComponent, {
      data,
    })
    dialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.getVehiclesList();
        }
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
