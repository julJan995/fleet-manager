import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';

import { AppComponent } from './app.component';
import { AddEditElementComponent } from './components/mat-dialogs/add-edit-element/add-edit-element.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ConfigPageComponent } from './components/config-page/config-page.component';
import { HeaderComponent } from './components/header/header.component';
import { TableContentComponent } from './components/table-content/table-content.component';
import { OptionTabsComponent } from './components/option-tabs/option-tabs.component';
import { AddEditDriverComponent } from './components/mat-dialogs/add-edit-driver/add-edit-driver.component';
import { DriversComponent } from './components/drivers/drivers.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { AddEditVehicleComponent } from './components/mat-dialogs/add-edit-vehicle/add-edit-vehicle.component';
import { SemitrailersComponent } from './components/semitrailers/semitrailers.component';
import { AddEditSemitrailerComponent } from './components/mat-dialogs/add-edit-semitrailer/add-edit-semitrailer.component';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    AddEditElementComponent,
    ConfigPageComponent,
    HeaderComponent,
    TableContentComponent,
    OptionTabsComponent,
    AddEditDriverComponent,
    DriversComponent,
    VehiclesComponent,
    AddEditVehicleComponent,
    SemitrailersComponent,
    AddEditSemitrailerComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
    MatSnackBarModule,
    MatMenuModule,
    CommonModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
