import { Component } from '@angular/core';
import { VehiclesTableComponent } from '../../shared/components/vehicles-table/vehicles-table.component';

@Component({
  selector: 'app-dashboard',
  imports: [VehiclesTableComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
