import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SemitrailerType, Vehicle } from '../../../models/vehicle';
import { VehicleService } from '../../../services/vehicle.service';

@Component({
  selector: 'app-add-edit-element',
  templateUrl: './add-edit-element.component.html',
  styleUrls: ['./add-edit-element.component.scss']
})
export class AddEditElementComponent implements OnInit {
  truckForm: FormGroup;
  trailerTypes: string[] = [
    SemitrailerType.FlatBed,
    "lowboy",
    "reefer",
    "dump",
    "dry-van",
    "tanker",
    "tipper"
  ]

  constructor(
    private _form: FormBuilder,
    private _vehicleService: VehicleService,
    private _dialogRef: MatDialogRef<AddEditElementComponent>) {

    this.truckForm = this._form.group({
      truckPlate:'',
      semitrailerPlate: '',
      semitrailerType: '',
      truckService: '',
      trailerService: '',
      truckInsurance: '',
      trailerInsurance: '',
      driversName: '',
      driversSurname: '',
      phoneNumber: '',
      Email: ''
    })
  }

  ngOnInit(): void {
  }

  get newVehiclePayload(): Vehicle {
    return {
      ...this.truckForm.value,
      // id: uuid()
    }
  }

  onFormSubmit() {
    if (this.truckForm.valid) {
      this._vehicleService.addVehicle(this.newVehiclePayload).subscribe({
        next: (value: any) => {
          alert('vehicle added successfully');
          this._dialogRef.close(true);
          // refresh the list
        },
        error: (err: any) => {
          console.log(err);
        }
      })
    }
  }
}
