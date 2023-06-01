import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DriverService } from '../../../services/driver.service';
import { Driver } from '../../../models';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SnackbarService } from 'src/app/services/snackbar.service';
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
    private _driverService: DriverService,
    private _snackBarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {
    this.driverForm = this._form.group({
      name: '',
      surname: '',
      phone: '',
      email: ''
    })
  }


  ngOnInit(): void {
    this.driverForm.patchValue(this.data);
  }

  get newDriverPayload(): Driver {
    return {
      ...this.driverForm.value,
      // id?
    }
  }

  onDriverFormSubmit() {
    if (this.driverForm.valid) {
      if (this.data) {
        this._driverService
          .updateDriversList(this.data.id, this.driverForm.value)
          .subscribe({
            next: (value: any) => {
              this._snackBarService.openSnackBar('Driver updated successfully', 'done')
              this._dialogRef.close(true);
            },
            error: (err) => {
              console.log(err);
            }
          })
        } else {
          this._driverService
            .addDriver(this.newDriverPayload)
            .subscribe({
              next: (value: any) => {
                this._snackBarService.openSnackBar('Driver added successfully', 'done')
                this._dialogRef.close(true)
        },
          error: (err: any) => {
            console.log(err);
        }
      })
    }
  }
}
}
