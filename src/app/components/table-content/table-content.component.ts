import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditElementComponent } from '../../components/mat-dialogs/add-edit-element/add-edit-element.component';
import { AllDataService } from '../../services/all-data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from 'src/app/services/snackbar.service';
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
    `phoneNumber`,
    `Email`,
    `action`
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private _dialog: MatDialog,
    private _allDataService: AllDataService,
    private _snackBarService: SnackbarService,
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
    this._allDataService.getVehicleList().subscribe({
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
    this._allDataService.deleteVehicle(id).subscribe({
      next: (response) => {
        this._snackBarService.openSnackBar('Vehicle deleted', 'done')
        this.getVehicleList();
      },
      error: console.log,
    })
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(AddEditElementComponent, {
      data,
    })
    dialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.getVehicleList();
        }
      }
    })
  }

}
