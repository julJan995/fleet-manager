import {Component, inject, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepper, MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogActions, MatDialogClose} from '@angular/material/dialog';
import {MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';
import {YEARS} from '../../shared/utils/years.util';
import {VehicleBodyType} from '../../shared/models/vehicle-body-type.enum';
import {VehicleFuelType} from '../../shared/models/vehicle-fuel-type.enum';

@Component({
  selector: 'app-vehicle-form-dialog',
  imports: [MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogActions,
    MatDialogClose,
    MatSelect,
    MatOption
  ],
  templateUrl: './vehicle-form-dialog.component.html',
  styleUrl: './vehicle-form-dialog.component.scss'
})
export class VehicleFormDialogComponent {
  private _formBuilder = inject(FormBuilder);
  private _dialog = inject(MatDialog);

  @ViewChild('stepper') stepper!: MatStepper;
  @ViewChild('confirmDialog') confirmDialog!: TemplateRef<any>;

  linear = false;
  years: number[] = YEARS;
  vehicleBodyType: string[] = Object.values(VehicleBodyType);
  vehicleFuelType: string[] = Object.values(VehicleFuelType);
  maxVehicleNameLength: number = 30;
  maxLicensePlateLength: number = 10;
  maxVinLength: number = 17;
  maxNotesLength: number = 1000;

  formValidationErrorMessages: { [key: string]: { [key: string]: string } } = {
    owner: {
      required: 'Owner is required',
      pattern: 'Only letters and spaces are allowed'
    },
    make: {
      required: 'Make is required',
      pattern: 'Only letters and spaces are allowed',
      maxlength: `Max ${this.maxVehicleNameLength} characters allowed`
    },
    model: {
      required: 'Model is required',
      maxlength: `Max ${this.maxVehicleNameLength} characters allowed`
    },
    year: {
      required: 'Year is required',
      pattern: 'Year must be a number'
    },
    licensePlate: {
      required: 'License plate is required',
      maxlength: `Max ${this.maxLicensePlateLength} characters allowed`
    },
    fuelType: {
      pattern: 'Fuel type is required'
    },
    vin: {
      maxlength: `Max ${this.maxVinLength} characters allowed`
    },
    currentMileage: {
      pattern: 'Mileage must be a number'
    },
    power: {
      pattern: 'Power must be a number'
    },
    notes: {
      maxlength: `Max ${this.maxNotesLength} characters allowed`
    }
  };

  vehicleDetailsForm = this._formBuilder.group({
    owner: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
    make: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/), Validators.maxLength(this.maxVehicleNameLength)]],
    model: ['', [Validators.required, Validators.maxLength(this.maxVehicleNameLength)]],
    year: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    licensePlate: ['', [Validators.required, Validators.maxLength(this.maxLicensePlateLength)]],
    bodyType: ['', [Validators.pattern(/^[A-Za-z\s]+$/)]],
    fuelType: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
    vin: ['', [Validators.maxLength(this.maxVinLength)]],
    currentMileage: ['', [Validators.pattern(/^\d+$/)]],
    power: ['', [Validators.pattern(/^\d+$/)]],
    notes: ['', [Validators.maxLength(this.maxNotesLength)]]
  });


  usageAndMaintenanceForm = this._formBuilder.group({
    location: [''],
    assignedDriver: [''],
    insuranceProvider: [''],
    insurancePolicyNumber: [''],
    insuranceExpiryDate: [''],
    lastServiceDate: [''],
    nextServiceDue: [''],
    serviceHistory: [''],
    additionalData: ['']
  });

  financialInfoForm = this._formBuilder.group({
    purchaseDate: [''],
    purchaseMileage: [''],
    purchasePrice: [''],
    currentValue: [''],
    imgUrl: ['']
  });

  openResetConfirmDialog() {
    const dialogRef = this._dialog.open(this.confirmDialog, {
      width: '400px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.stepper.reset();
      }
    });
  }

  getErrorMessage(controlName: string): string[] {
    const control = this.vehicleDetailsForm.get(controlName);
    if (!control || !control.errors || !control.touched) return [];

    const messages: string[] = [];
    const errors = control.errors;

    for (const errorKey of Object.keys(errors)) {
      const message = this.formValidationErrorMessages[controlName]?.[errorKey];
      if (message) messages.push(message);
    }

    return messages;
  }


}
