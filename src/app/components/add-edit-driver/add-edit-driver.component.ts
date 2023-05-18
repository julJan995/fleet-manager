import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

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
    private _dialogRef: MatDialogRef<AddEditDriverComponent>
  ) {
    this.driverForm = this._form.group({
      name: '',
      surname: '',
      phone: '',
      email: ''
    })
  }
  ngOnInit(): void { }

  onDriverFormSubmit() {
    if (this.driverForm.valid) {

    }
  }
}
