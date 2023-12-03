import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';
import { CategoriaGasto } from 'src/app/models/categoria-gasto';
import { CategoriasBorrarComponent } from '../categorias-borrar/categorias-borrar.component';
import { Router } from '@angular/router';
import { CategoriasEditComponent } from '../categorias-edit/categorias-edit.component';

@Component({
  selector: 'app-categorias-list',
  templateUrl: './categorias-list.component.html',
  styleUrls: ['./categorias-list.component.css']
})

export class CategoriasListComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'acciones'];
  dataSource: CategoriaGasto[] = [];
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
    this.appService.getCategorias().subscribe(result=>{
      this.dataSource = result as CategoriaGasto[];
      this.categorias = result as CategoriaGasto[];
    });
  }

  onCrearClick(){
    this.onEditarClick(null);
  }

  onEditarClick(categoriaID: number | null) {
    const dialogRef = this.dialog.open(CategoriasEditComponent, {
      width: '400px',
      data: {
        categoriaID: categoriaID
      }
    });
    dialogRef.afterClosed().subscribe(rersult => this.inicializar());
  }

  onEliminarClick(categoriaID: CategoriaGasto) {
    const dialogRef = this.dialog.open(CategoriasBorrarComponent, {
      width: '400px',
      data: {
        categoriaID: categoriaID,
        titulo: 'Borrar Categoría',
        mensaje: '¿Estás seguro de que deseas borrar este elemento?'
      }
    });
    dialogRef.afterClosed().subscribe(result => this.inicializar());
  }
}