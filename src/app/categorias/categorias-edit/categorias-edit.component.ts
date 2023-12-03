import { Component, Inject, OnInit } from '@angular/core';
import { CategoriaGasto } from 'src/app/models/categoria-gasto';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-categorias-edit',
  templateUrl: './categorias-edit.component.html',
  styleUrls: ['./categorias-edit.component.css']
})
export class CategoriasEditComponent implements OnInit{
  categoria!: CategoriaGasto | undefined;
  modoEditar = false;
  formGroup: FormGroup;
  
  constructor(
    public dialogRef: MatDialogRef<CategoriasEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private appService: AppService
    ){
      this.modoEditar = data.categoriaID !== null;
      this.formGroup = this.inicializarFormulario();
    }
    
    ngOnInit(): void {
      if(this.modoEditar){
        this.inicializar();
      }
    }

    inicializarFormulario(): FormGroup {
      return new FormGroup({
        nombre: new FormControl('', [Validators.required]),
      });
    }

    inicializar(){
      this.appService.getCategoria(this.data.categoriaID).subscribe((result:any) =>{
        this.categoria = result[0] as CategoriaGasto;
        this.formGroup.patchValue({
          nombre: this.categoria?.nombre || '',
        });
      });
    }

    editarCategoria(){
      if(this.categoria){
        let nombre = this.formGroup.get('nombre')?.value;
        this.categoria.nombre = nombre;
        this.appService.modificarCategoria(this.categoria).subscribe(result => this.dialogRef.close(true));
      }
    }

    nuevaCategoria(){
      let nombre = this.formGroup.get('nombre')?.value;
      let nuevaCategoria: CategoriaGasto = {
        id: null,
        nombre: nombre,
        usuario_id: this.appService.getUsuarioId()
      };
      this.appService.crearCategoria(nuevaCategoria).subscribe(result => this.dialogRef.close(true));
    }

    confirmarEditar() {
      if(!this.formGroup.valid){
        Object.values(this.formGroup.controls).forEach(control => control.markAllAsTouched());
        return;
      }
      this.modoEditar ? this.editarCategoria() : this.nuevaCategoria();
    }
    
    cancelarEditar() {
      this.dialogRef.close(false);
    }
}
