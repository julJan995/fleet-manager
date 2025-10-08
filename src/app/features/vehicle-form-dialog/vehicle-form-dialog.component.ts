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
  maxLicensePlateLength: number = 10;
  maxVinLength: number = 17;

  vehicleDetailsForm = this._formBuilder.group({
    owner: ['', Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)],
    make: ['', Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)],
    model: ['', Validators.required],
    year: ['', Validators.required, Validators.pattern(/^\d+$/)],
    licensePlate: ['', Validators.required, Validators.maxLength(this.maxLicensePlateLength)],
    bodyType: ['', Validators.pattern(/^[A-Za-z\s]+$/)],
    fuelType: ['', Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)],
    vin: ['', Validators.maxLength(this.maxVinLength)],
    currentMileage: ['', Validators.pattern(/^\d+$/)],
    power: ['', Validators.pattern(/^\d+$/)],
    notes: ['']
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

}
