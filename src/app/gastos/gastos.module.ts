import { NgModule } from '@angular/core';
import { GastosListComponent } from './gastos-list/gastos-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { GastosEditComponent } from './gastos-edit/gastos-edit.component';
import { GastosBorrarComponent } from './gastos-borrar/gastos-borrar.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [
    GastosListComponent,
    GastosEditComponent,
    GastosBorrarComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule, 
    MatMenuModule, 
    MatIconModule,
    MatDialogModule,
    FormsModule,
    BrowserModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDatepickerModule, 
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule
  ]
})
export class GastosModule { }
