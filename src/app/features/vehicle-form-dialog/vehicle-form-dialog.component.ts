import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-vehicle-form-dialog',
  imports: [MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './vehicle-form-dialog.component.html',
  styleUrl: './vehicle-form-dialog.component.scss'
})
export class VehicleFormDialogComponent {
  private _formBuilder = inject(FormBuilder);
  linear = false;

  vehicleDetailsForm = this._formBuilder.group({
    owner: ['', Validators.required],
    make: ['', Validators.required],
    model: ['', Validators.required],
    year: ['', Validators.required],
    licensePlate: ['', Validators.required],
    bodyType: [''],
    fuelType: ['', Validators.required],
    vin: [''],
    currentMileage: [''],
    power: [''],
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
}
