import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DriverService } from '../../../services/driver.service';
import { Driver } from '../../../models';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-add-edit-driver',
  templateUrl: './add-edit-driver.component.html',
  styleUrls: ['./add-edit-driver.component.scss']
})

//[formGroup]="driverForm" (ngSubmit)="onDriverFormSubmit()">
export class AddEditDriverComponent implements OnInit{
  driverForm: FormGroup;

  constructor(
    private _form: FormBuilder,
    private _dialogRef: MatDialogRef<AddEditDriverComponent>,
    private _driverService: DriverService

  ) {
    this.driverForm = this._form.group({
      name: '',
      surname: '',
      phone: '',
      email: ''
    })
  }

  readonly driverUrl = 'http://localhost:3000/drivers';
  readonly data = {};
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
/*
  addDriver() {
    this.apiService.post(this.driverUrl, this.data).subscribe(
      response => {

      },
      error => {

      }
    )
  }
  getDriver() {
    this.apiService.get(this.driverUrl).subscribe(
      response => {

      },
      error => {

      }
    )
  }
  deleteDriver(id: number) {
    this.apiService.delete(`${this.driverUrl}/${id}`).subscribe(
      response => {

      },
      error => {

      }
    )
  }
  */
  get newDriverPayload(): Driver {
    return {
      ...this.driverForm.value,
      // id?
    }
  }

  ngOnInit(): void {
    this.getDriversList()
  }

  onDriverFormSubmit() {
    if (this.driverForm.valid) {
      this._driverService.addDriver(this.newDriverPayload).subscribe({
        next: (value: any) => {
          alert('driver added');
          this._dialogRef.close(true);
        },
        error: (err: any) => {
          console.log(err);
        }
      })
    }
  }

  getDriversList() {
    this._driverService.getDriversList().subscribe({
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
}
