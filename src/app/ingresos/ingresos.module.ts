import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngresosEditComponent } from './ingresos-edit/ingresos-edit.component';
import { IngresosListComponent } from './ingresos-list/ingresos-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { IngresosBorrarComponent } from './ingresos-borrar/ingresos-borrar.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    IngresosEditComponent,
    IngresosListComponent,
    IngresosBorrarComponent
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
    MatNativeDateModule
  ]
})

export class IngresosModule { }
