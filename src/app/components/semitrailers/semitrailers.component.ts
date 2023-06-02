import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { AddEditSemitrailerComponent } from '../mat-dialogs/add-edit-semitrailer/add-edit-semitrailer.component';

@Component({
  selector: 'app-semitrailers',
  templateUrl: './semitrailers.component.html',
  styleUrls: ['./semitrailers.component.scss']
})
export class SemitrailersComponent implements OnInit {
  displayedColumns = [
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

  }

}
