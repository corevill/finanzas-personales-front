import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'ingresos-borrar.component',
  templateUrl: './ingresos-borrar.component.html',
})

export class IngresosBorrarComponent implements OnInit{
  constructor(
    public dialogRef: MatDialogRef<IngresosBorrarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private appservice: AppService
  ){}

  ngOnInit(): void {
  }

  confirmarBorrado() {
    this.appservice.deleteIngreso(this.data.ingresoID).subscribe(result => this.dialogRef.close(true));
  }

  cancelarBorrado() {
    this.dialogRef.close(false);
  }
}
