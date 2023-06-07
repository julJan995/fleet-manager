import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Semitrailer, SemitrailerType } from 'src/app/models';
import { SemitrailerService } from 'src/app/services/semitrailer.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-add-edit-semitrailer',
  templateUrl: './add-edit-semitrailer.component.html',
  styleUrls: ['./add-edit-semitrailer.component.scss']
})
export class AddEditSemitrailerComponent implements OnInit {
  semitrailerForm: FormGroup;
  semitrailerTypes: string[] = [
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
    private _semitrailerService: SemitrailerService,
    private _snackBarService: SnackbarService,
    private _dialogRef: MatDialogRef<AddEditSemitrailerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.semitrailerForm = this._form.group({
      semitrailerPlate: '',
      semitrailerType: '',
      semitrailerService: '',
      semitrailerInsurance: ''
    })

  }

  ngOnInit(): void {
    this.semitrailerForm.patchValue(this.data)
  }

  get newSemitrailerPayload(): Semitrailer {
    return {
      ...this.semitrailerForm.value,
    }
  }

  onFormSubmit() {
    if (this.semitrailerForm.valid) {
      if (this.data) {
        this._semitrailerService
          .updateSemitrailer(this.data.id, this.semitrailerForm.value)
          .subscribe({
            next: (val: any) => {
              this._snackBarService.openSnackBar('Senutrailer updated successfully', 'done')
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.log(err)
            }
        })
      } else {
        this._semitrailerService
          .addSemitrailer(this.newSemitrailerPayload)
          .subscribe({
            next: (value: any) => {
              this._snackBarService.openSnackBar('Semitrailer added successfully', 'done')
              this._dialogRef.close(true);
              // refresh the list
            },
            error: (err: any) => {
              console.log(err);
            },
        });
      }
       }
  }

}
