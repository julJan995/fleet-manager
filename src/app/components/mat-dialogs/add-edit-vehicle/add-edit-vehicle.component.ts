import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Vehicle } from 'src/app/models';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-add-edit-vehicle',
  templateUrl: './add-edit-vehicle.component.html',
  styleUrls: ['./add-edit-vehicle.component.scss']
})
export class AddEditVehicleComponent implements OnInit {
  vehicleForm: FormGroup;

  constructor(
    private _form: FormBuilder,
    private _vehicleService: VehicleService,
    private _snackBarService: SnackbarService,
    private _dialogRef: MatDialogRef<AddEditVehicleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.vehicleForm = this._form.group({
      truckPlate: '',
      truckService: '',
      truckInsurance: ''
    })
  }
  ngOnInit(): void {
      this.vehicleForm.patchValue(this.data);
  }

  get newVehiclePayload(): Vehicle {
    return {
      ...this.vehicleForm.value
    }
  }

  onVehicleFormSubmit() {
    if (this.vehicleForm.valid) {
      if (this.data) {
        this._vehicleService
          .updateVehiclesList(this.data.id, this.vehicleForm.value)
          .subscribe({
            next: (value: any) => {
              this._snackBarService.openSnackBar('Vehicle added successfully', 'done')
              this._dialogRef.close(true)
            },
            error: (err: any) => {
              console.log(err);
            }
          })
      } else {
        this._vehicleService
          .addVehicle(this.newVehiclePayload)
          .subscribe({
            next: (value: any) => {
              this._snackBarService.openSnackBar('Vehicle added successfully', 'done')
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.log(err);
            }
          })
      }
    }
  }
}
