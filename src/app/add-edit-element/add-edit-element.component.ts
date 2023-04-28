import { Component } from '@angular/core';

@Component({
  selector: 'app-add-edit-element',
  templateUrl: './add-edit-element.component.html',
  styleUrls: ['./add-edit-element.component.scss']
})
export class AddEditElementComponent {
  trailerTypes: string[] = [
    "flatbed",
    "lowboy",
    "reefer",
    "dump",
    "dry-van",
    "tanker",
    "tipper"
  ]
}
