import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Driver } from 'src/app/models';
import { DriverService } from 'src/app/services/driver.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { AddEditDriverComponent } from '../../components/mat-dialogs/add-edit-driver/add-edit-driver.component';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss']
})
export class DriversComponent implements OnInit {
  displayedColumns = [
    'surname',
    'name',
    'phone',
    'email',
    'action'
  ];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _driverService: DriverService,
    private _snackBarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.getDriversList();
  }

  openAddDriverForm () {
    const dialogRef = this._dialog.open(AddEditDriverComponent);
    dialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.getDriversList();
        }
      }
    })
  }

  getDriversList() {
    this._driverService.getDriversList().subscribe({
      next: (response) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {
        console.log('error occured', error);
      }
    })
  }

  deleteDriver(id: number) {
    this._driverService.deleteDriver(id).subscribe({
      next: (response) => {
        this._snackBarService.openSnackBar('Driver deleted', 'done')
        this.getDriversList();
      },
      error: console.log,
    })
  }
}

export interface DriverElement {
  surname: string;
  name: string;
  phoneNumber: string;
  email: string;
}



