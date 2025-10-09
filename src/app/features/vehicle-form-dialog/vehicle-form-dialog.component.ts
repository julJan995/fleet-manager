import {ChangeDetectionStrategy, Component, inject, TemplateRef, ViewChild} from '@angular/core';
import {Validators, FormsModule, ReactiveFormsModule, FormGroup, FormControl} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepper, MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogActions, MatDialogClose} from '@angular/material/dialog';
import {MatSelect} from '@angular/material/select';
import {MatOption, provideNativeDateAdapter} from '@angular/material/core';
import {YEARS} from '../../shared/utils/years.util';
import {VehicleBodyType} from '../../shared/models/vehicle-body-type.enum';
import {VehicleFuelType} from '../../shared/models/vehicle-fuel-type.enum';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {VehiclesService} from '../../core/services/vehicles.service';
import {Vehicle} from '../../shared/models/vehicle.interface';
import {take} from 'rxjs';

@Component({
  selector: 'app-vehicle-form-dialog',
  providers: [provideNativeDateAdapter()],
  imports: [MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogActions,
    MatDialogClose,
    MatSelect,
    MatOption,
    MatDatepickerModule
  ],
  templateUrl: './vehicle-form-dialog.component.html',
  styleUrl: './vehicle-form-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleFormDialogComponent {
  private _dialog = inject(MatDialog);
  private _vehicleService = inject(VehiclesService);

  @ViewChild('stepper') stepper!: MatStepper;
  @ViewChild('confirmDialog') confirmDialog!: TemplateRef<any>;


  linear = false;
  years: number[] = YEARS;
  vehicleBodyType: string[] = Object.values(VehicleBodyType);
  vehicleFuelType: string[] = Object.values(VehicleFuelType);
  maxLicensePlateLength: number = 8;
  maxVinLength: number = 17;
  maxNotesLength: number = 1000;
  maxStringInputLength: number = 30;

  formValidationErrorMessages: {
    [key: string]: { [key: string]: string }
  } = {
    owner: {
      required: 'Owner is required',
      pattern: 'Only letters and spaces are allowed'
    },
    make: {
      required: 'Make is required',
      pattern: 'Only letters and spaces are allowed',
      maxlength: `Max ${this.maxStringInputLength} characters allowed`
    },
    model: {
      required: 'Model is required',
      maxlength: `Max ${this.maxStringInputLength} characters allowed`
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
    },
    location: {
      pattern: 'Only letters and spaces are allowed',
      maxlength: `Max ${this.maxStringInputLength} characters allowed`
    },
    assignedDriver: {
      pattern: 'Only letters and spaces are allowed',
      maxlength: `Max ${this.maxStringInputLength} characters allowed`
    },
    insuranceProvider: {
      maxlength: `Max ${this.maxStringInputLength} characters allowed`
    },
    insurancePolicyNumber: {
      required: 'Insurance policy number is required'
    },
    insuranceExpiryDate: {
      required: 'Insurance expiry date is required'
    },
    serviceHistory: {
      maxlength: `Max ${this.maxNotesLength} characters allowed`
    },
    additionalData: {
      maxlength: `Max ${this.maxNotesLength} characters allowed`
    },
    purchaseMileage: {
      pattern: 'Power must be a number'
    },
    purchasePrice: {
      pattern: 'Price must be a number'
    },
    currentValue: {
      pattern: 'Price must be a number'
    }
  };

  vehicleDetailsForm = new FormGroup({
    owner: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]
    }),
    make: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(/^[A-Za-z\s]+$/),
        Validators.maxLength(this.maxStringInputLength)
      ]
    }),
    model: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(this.maxStringInputLength)]
    }),
    year: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.pattern(/^\d+$/)],
      nonNullable: true
    }),
    licensePlate: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(this.maxLicensePlateLength)]
    }),
    bodyType: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.pattern(/^[A-Za-z\s]+$/)]
    }),
    fuelType: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]
    }),
    vin: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.maxLength(this.maxVinLength)]
    }),
    currentMileage: new FormControl<number | null>(null, {
      validators: [Validators.pattern(/^\d+$/)]
    }),
    power: new FormControl<number | null>(null, {
      validators: [Validators.pattern(/^\d+$/)]
    }),
    notes: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.maxLength(this.maxNotesLength)]
    })
  });

  usageAndMaintenanceForm = new FormGroup({
    location: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.pattern(/^[A-Za-z\s]+$/), Validators.maxLength(this.maxStringInputLength)]
    }),
    assignedDriver: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.pattern(/^[A-Za-z\s]+$/), Validators.maxLength(this.maxStringInputLength)]
    }),
    insuranceProvider: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.maxLength(this.maxStringInputLength)]
    }),
    insurancePolicyNumber: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    insuranceExpiryDate: new FormControl<Date | null>(null, {
      validators: [Validators.required]
    }),
    lastServiceDate: new FormControl<Date | null>(null, {
      nonNullable: true
    }),
    nextServiceDue: new FormControl<Date | null>(null, {
      nonNullable: true
    }),
    serviceHistory: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.maxLength(this.maxNotesLength)]
    }),
    additionalData: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.maxLength(this.maxNotesLength)]
    })
  });

  financialInfoForm = new FormGroup({
    purchaseDate: new FormControl<Date | null>(null),
    purchaseMileage: new FormControl<number | null>(null, {
      validators: [Validators.pattern(/^\d+$/)]
    }),
    purchasePrice: new FormControl<number | null>(null, {
      validators: [Validators.pattern(/^\d+$/)]
    }),
    currentValue: new FormControl<number | null>(null, {
      validators: [Validators.pattern(/^\d+$/)]
    })
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
    const control =
      this.vehicleDetailsForm.get(controlName)
      || this.usageAndMaintenanceForm.get(controlName)
      || this.financialInfoForm.get(controlName);

    if (!control || !control.errors || !control.touched) return [];

    const messages: string[] = [];
    const errors = control.errors;

    for (const errorKey of Object.keys(errors)) {
      const message = this.formValidationErrorMessages[controlName]?.[errorKey];
      if (message) messages.push(message);
    }

    return messages;
  }

  addVehicle() {
    if (
      this.vehicleDetailsForm.invalid ||
      this.usageAndMaintenanceForm.invalid ||
      this.financialInfoForm.invalid
    ) {
      this.vehicleDetailsForm.markAllAsTouched();
      this.usageAndMaintenanceForm.markAllAsTouched();
      this.financialInfoForm.markAllAsTouched();
      return;
    }

    const raw = {
      ...this.vehicleDetailsForm.value,
      ...this.usageAndMaintenanceForm.value,
      ...this.financialInfoForm.value
    };

    const vehiclePayload: Partial<Vehicle> = Object.fromEntries(
      Object.entries(raw).filter(([_, v]) => v !== null)
    );
    this._vehicleService.addVehicle(vehiclePayload)
      .pipe(take(1))
      .subscribe({
        next: (docRef) => {
          console.log('Vehicle added with ID:', docRef.id);
          this.stepper.reset();
        },
        error: (err) => console.error('Error adding vehicle:', err)
      });
  }
}
