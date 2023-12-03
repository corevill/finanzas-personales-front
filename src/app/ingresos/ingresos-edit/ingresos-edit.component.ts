import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';
import { Ingreso } from 'src/app/models/ingreso';

@Component({
  selector: 'app-ingresos-edit',
  templateUrl: './ingresos-edit.component.html',
  styleUrls: ['./ingresos-edit.component.css']
})

export class IngresosEditComponent implements OnInit{
  ingreso!: Ingreso | undefined;
  modoEditar = false;
  ingresosForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<IngresosEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private appService: AppService
  ){
    this.modoEditar = data.ingresoID !== null;
    this.ingresosForm = this.inicializarFormulario();
  }

  ngOnInit(): void {
    if (this.modoEditar){
      this.inicializar();
    } 
  }
  
  inicializarFormulario(): FormGroup {
    return new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      cantidad: new FormControl(0, [Validators.required, Validators.min(0)]),
      fecha: new FormControl(new Date(), [Validators.required])
    });
  }

  inicializar(){
    this.appService.getIngreso(this.data.ingresoID).subscribe((result:any)=> {
      this.ingreso = result[0] as Ingreso;
      this.ingresosForm.patchValue({
        nombre: this.ingreso["descripcion"] || '',
        cantidad: this.ingreso["cantidad"] || 0,
        fecha: this.appService.stringToDate(this.ingreso["fecha_ingreso"]) || new Date()
      });
    });
  }

  editarIngreso(){
    if(this.ingreso){
      let {fecha, nombre, cantidad} = this.ingresosForm.value;
      this.ingreso.fecha_ingreso = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear();
      this.ingreso.descripcion = nombre;
      this.ingreso.cantidad = cantidad;

      this.appService.modificarIngreso(this.ingreso).subscribe(result => this.dialogRef.close(true));
    }
  }
  
  nuevoIngreso(){
    let {fecha, nombre, cantidad} = this.ingresosForm.value;
    let nuevoIngreso: Ingreso = {
      id: null,
      descripcion: nombre,
      cantidad: cantidad,
      fecha_ingreso: fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear(),
      usuario_id: this.appService.getUsuarioId()
    };

    this.appService.crearIngreso(nuevoIngreso).subscribe(result => this.dialogRef.close(true));
  }

  confirmarEditar() {
    if(!this.ingresosForm.valid){
      Object.values(this.ingresosForm.controls).forEach(control => control.markAllAsTouched());
      return;
    }
    
    this.modoEditar ? this.editarIngreso() : this.nuevoIngreso();
  }

  cancelarEditar() {
    this.dialogRef.close(false);
  }
}
