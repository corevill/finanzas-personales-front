import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from '../../app.service';
import { Gasto } from 'src/app/models/gasto';
import { CategoriaGasto } from 'src/app/models/categoria-gasto';
import { GastosEditComponent } from '../gastos-edit/gastos-edit.component';
import { GastosBorrarComponent } from '../gastos-borrar/gastos-borrar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gastos-list',
  templateUrl: './gastos-list.component.html',
  styleUrls: ['./gastos-list.component.css']
})

export class GastosListComponent implements OnInit {
  displayedColumns: string[] = ['descripcion', 'cantidad', 'fecha_gasto', 'categoria_id', 'tipo_gasto', 'acciones'];
  dataSource: Gasto[] = [];
  categorias: CategoriaGasto[] = [];

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
    this.appService.getCategorias().subscribe(result=> {
      this.categorias = result as CategoriaGasto[];
    })

    this.appService.getGastos().subscribe(result=> {
      this.dataSource = result as Gasto[];
    })
  }

  getCategoria(id: number){
    return this.categorias.find(categoria => categoria.id == id)?.nombre
  }

  getTipoGasto(tipoGasto: boolean){
    return tipoGasto?'Capricho':'Necesidad Básica'
  }

  onCrearClick() {
    this.onEditarClick(null);
  }

  onEditarClick(gastoID: number | null) {
    const dialogRef = this.dialog.open(GastosEditComponent, {
      width: '400px',
      data: {
        gastoID: gastoID
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.inicializar();
    });
  }

  onEliminarClick(gastoID: number) {
    const dialogRef = this.dialog.open(GastosBorrarComponent, {
      width: '400px',
      data: {
        gastoID: gastoID,
        titulo: 'Borrar Gasto',
        mensaje: '¿Estás seguro de que deseas borrar este elemento?'
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.inicializar();
    });
  }
}
