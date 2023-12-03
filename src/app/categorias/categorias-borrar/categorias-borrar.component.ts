import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-categorias-borrar',
  templateUrl: './categorias-borrar.component.html',
})

export class CategoriasBorrarComponent implements OnInit{
  constructor(
    public dialogRef: MatDialogRef<CategoriasBorrarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private appService: AppService
  ){}

  ngOnInit(): void {
  }

  confirmarBorrado() {
    this.appService.deleteCategoria(this.data.categoriaID).subscribe(result => this.dialogRef.close(true));
  }

  cancelarBorrado() {
    this.dialogRef.close(false);
  }
}
