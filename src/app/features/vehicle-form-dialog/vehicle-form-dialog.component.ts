import {Component, inject, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepper, MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogActions, MatDialogClose} from '@angular/material/dialog';

@Component({
  selector: 'app-vehicle-form-dialog',
  imports: [MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogActions,
    MatDialogClose
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
