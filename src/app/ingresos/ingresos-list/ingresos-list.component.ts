import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from '../../app.service';
import { Ingreso } from 'src/app/models/ingreso';
import { IngresosEditComponent } from '../ingresos-edit/ingresos-edit.component';
import { IngresosBorrarComponent } from '../ingresos-borrar/ingresos-borrar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingresos-list',
  templateUrl: './ingresos-list.component.html',
  styleUrls: ['./ingresos-list.component.css']
})

export class IngresosListComponent implements OnInit {
  displayedColumns: string[] = ['descripcion', 'cantidad', 'fecha_ingreso', 'acciones'];
  dataSource: Ingreso[] = [];
  ingresos: Ingreso[] = [];

  constructor (
    private dialog: MatDialog,
    private appService: AppService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.appService.isLogin().subscribe(isLogin => {
      if(!isLogin)
        this.router.navigate(['/login']);
    this.inicializar();
    });
  }

  inicializar(){
    this.appService.getIngresos().subscribe(result => {
      this.dataSource = result as Ingreso[];
      this.ingresos = result as Ingreso[];
    })
  }

  onCrearClick(){
    this.onEditarClick(null);
  }

  onEditarClick(ingresoID: number | null) {
    const dialogRef = this.dialog.open(IngresosEditComponent, {
      width: '400px',
      data: {
        ingresoID: ingresoID
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.inicializar();
    });
  }

  onEliminarClick(ingresoID: number) {
    const dialogRef = this.dialog.open(IngresosBorrarComponent, {
      width: '400px',
      data: {
        ingresoID: ingresoID,
        titulo: 'Borrar Ingreso',
        mensaje: '¿Estás seguro de que deseas borrar este elemento?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.inicializar();
    });
  }
}
