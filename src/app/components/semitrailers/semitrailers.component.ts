import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SemitrailerService } from 'src/app/services/semitrailer.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { AddEditSemitrailerComponent } from '../mat-dialogs/add-edit-semitrailer/add-edit-semitrailer.component';

@Component({
  selector: 'app-semitrailers',
  templateUrl: './semitrailers.component.html',
  styleUrls: ['./semitrailers.component.scss']
})
export class SemitrailersComponent implements OnInit {
  displayedColumns: string[] = [
    'semitrailerPlate',
    'semitrailerType',
    'semitrailerService',
    'semitrailerInsurance',
    'action'
  ];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _semitrailerService: SemitrailerService,
    private _snackBarService: SnackbarService,
  ) {}

  ngOnInit(): void {
    this.getSemitrailersList();
  }

  openAddSemitrailerForm() {
    const dialogRef = this._dialog.open(AddEditSemitrailerComponent);
    dialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.getSemitrailersList();
        }
      }
    })
  }

  getSemitrailersList() {
    this._semitrailerService.getSemitrailersList().subscribe({
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

  deleteSemitrailer(id: number) {
    this._semitrailerService.deleteSemitrailer(id).subscribe({
      next: (response) => {
        this._snackBarService.openSnackBar('Semitrailer deleted', 'done')
        this.getSemitrailersList();
      },
      error: console.log,
    })
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(AddEditSemitrailerComponent, {
      data,
    })
    dialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.getSemitrailersList();
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
