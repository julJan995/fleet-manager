import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Driver } from 'src/app/models';
import { AddEditDriverComponent } from '../add-edit-driver/add-edit-driver.component';

@Component({
  selector: 'app-option-tabs',
  templateUrl: './option-tabs.component.html',
  styleUrls: ['./option-tabs.component.scss']
})
export class OptionTabsComponent {
  displayedColumns = [
    'surname',
    'name',
    'phoneNumber',
    'email',
    'id',
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
  id: number;
}

const ELEMENT_DATA: DriverElement[] = [
  {
    surname: "Kowalski",
    name: "Adam",
    phoneNumber: "+48 222-222-111",
    email: "ak@gmail.com",
    id: 1
  },
  {
    surname: "Kowalski",
    name: "Piotr",
    phoneNumber: "+48 222-222-111",
    email: "ak@gmail.com",
    id: 2
  },
  {
    surname: "Test",
    name: "Test",
    phoneNumber: "+48 222-222-111",
    email: "test@gmail.com",
    id: 3
  }
]
