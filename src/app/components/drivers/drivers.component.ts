import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Driver } from 'src/app/models';
import { AddEditDriverComponent } from '../../components/mat-dialogs/add-edit-driver/add-edit-driver.component';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss']
})
export class DriversComponent {
  displayedColumns = [
    'surname',
    'name',
    'phoneNumber',
    'email',
    'star'
  ];
  dataSource = ELEMENT_DATA;

  constructor(
    private _dialog: MatDialog
  ) {}
  openAddDriverForm () {
    const dialogRef = this._dialog.open(AddEditDriverComponent)
  }
}

export interface DriverElement {
  surname: string;
  name: string;
  phoneNumber: string;
  email: string;
}

const ELEMENT_DATA: DriverElement[] = [
  {
    surname: "Kowalski",
    name: "Adam",
    phoneNumber: "+48 222-222-111",
    email: "ak@gmail.com"
  },
  {
    surname: "Kowalski",
    name: "Piotr",
    phoneNumber: "+48 222-222-111",
    email: "ak@gmail.com"
  },
  {
    surname: "Test",
    name: "Test",
    phoneNumber: "+48 222-222-111",
    email: "test@gmail.com"
  }
]


