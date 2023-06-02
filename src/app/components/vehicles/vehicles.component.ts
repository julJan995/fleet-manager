import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { VehicleService } from 'src/app/services/vehicle.service';

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
    private _vehicleService: VehicleService,
    private _snackBarService: SnackbarService,
  ) {}

  ngOnInit(): void {

  }
}
