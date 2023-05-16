import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditElementComponent } from '../add-edit-element/add-edit-element.component';
import { VehicleService } from '../../services/vehicle.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table-content',
  templateUrl: './table-content.component.html',
  styleUrls: ['./table-content.component.scss']
})
export class TableContentComponent implements OnInit {
  displayedColumns: string[] = [
    `id`,
    `truckPlate`,
    `semitrailerPlate`,
    `semitrailerType`,
    `truckService`,
    `trailerService`,
    `truckInsurance`,
    `trailerInsurance`,
    `driversName`,
    `driversSurname`,
    `action`
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private _dialog: MatDialog,
    private _vehicleService: VehicleService
  ) {}
  ngOnInit(): void {
    this.getVehicleList();
  }
  openAddEditElementForm() {
    const dialogRef = this._dialog.open(AddEditElementComponent);
    dialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.getVehicleList();
        }
      }
    })
  }
  getVehicleList() {
    this._vehicleService.getVehicleList().subscribe({
      next: (response) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log('error occured', err);
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
  deleteVehicle(id: number) {
    this._vehicleService.deleteVehicle(id).subscribe({
      next: (response) => {
        alert('Vehicle deleted.');
        this.getVehicleList();
      },
      error: console.log,
    })
  }
}
