import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditElementComponent } from './add-edit-element/add-edit-element.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fleet-manager';

  constructor(public _dialog: MatDialog) {}

  openAddEditElementForm() {
    this._dialog.open(AddEditElementComponent);
  }
}
