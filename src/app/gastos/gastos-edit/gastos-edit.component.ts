import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppService } from '../../app.service';
import { Gasto } from '../../models/gasto';
import { CategoriaGasto } from 'src/app/models/categoria-gasto';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-gastos-edit',
  templateUrl: './gastos-edit.component.html',
})

export class GastosEditComponent implements OnInit{
  categorias: CategoriaGasto[] = [];
  gasto!: Gasto | undefined;
  categoriaSeleccionada: CategoriaGasto | undefined;
  modoEditar = false;
  formGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<GastosEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private appService: AppService
  ){
    this.modoEditar = data.gastoID !== null;
    this.formGroup = this.inicializarFormulario();
  }

  ngOnInit(): void {
    this.appService.getCategorias().subscribe(result => {
      this.categorias = result as CategoriaGasto[];
      this.formGroup.controls['categoria'].setValue(this.categorias[0]?.id);
    });

    if(this.modoEditar){
      this.inicializar();
    }
  }

  inicializarFormulario(): FormGroup{
    return new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      cantidad: new FormControl(0, [Validators.required, Validators.min(0)]),
      fecha: new FormControl(new Date(), [Validators.required]),
      categoria: new FormControl('', [Validators.required]),
      esUnCapricho: new FormControl(false, [Validators.required]),
    });
  }

  inicializar(){
    this.appService.getGasto(this.data.gastoID).subscribe((result:any) => {
      this.gasto = result[0] as Gasto;
      this.formGroup.patchValue({
        nombre: this.gasto?.descripcion || '',
        cantidad: this.gasto?.cantidad || 0,
        fecha: this.appService.stringToDate(this.gasto?.fecha_gasto) || new Date(),
        categoria: this.gasto?.categoria_id || this.categorias[0]?.id,
        esUnCapricho: this.gasto?.tipo_gasto || false,
      });
    })
  }
  
  editarGasto(){
    if(this.gasto){
      let {fecha, nombre, cantidad, categoria, esUnCapricho} = this.formGroup.value;
      this.gasto.fecha_gasto = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear();
      this.gasto.descripcion = nombre;
      this.gasto.cantidad = cantidad;
      this.gasto.categoria_id = categoria;
      this.gasto.tipo_gasto = esUnCapricho;

      this.appService.modificarGasto(this.gasto).subscribe(result => this.dialogRef.close(true));
    }
  }

  nuevoGasto(){
    let {fecha, nombre, cantidad, categoria, esUnCapricho} = this.formGroup.value;
    let gasto: Gasto = {
      id: null,
      descripcion: nombre,
      cantidad: cantidad,
      fecha_gasto: fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear(),
      categoria_id: categoria,
      tipo_gasto: esUnCapricho,
      usuario_id: this.appService.getUsuarioId()
    };

    this.gasto = gasto;
    this.appService.crearGasto(gasto).subscribe(result => this.dialogRef.close(true));
  }

  confirmarEditar() {
    if (!this.formGroup?.valid) {
      Object.values(this.formGroup.controls).forEach(control => control.markAllAsTouched());
      return;
    }
    this.modoEditar ? this.editarGasto() : this.nuevoGasto();
  }
  
  cancelarEditar() {
    this.dialogRef.close(false);
  }

  getError(a: any){
    console.log(a);
  }
}
