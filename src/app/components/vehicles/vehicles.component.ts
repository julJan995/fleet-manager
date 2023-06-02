import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {
  displayedColumns = [
    'truckPlate',
    'truckService',
    'truckInsurance',
    'action',
  ];

  constructor(
    private _dialog: MatDialog,

  ) {}

  ngOnInit(): void {

  }
}
