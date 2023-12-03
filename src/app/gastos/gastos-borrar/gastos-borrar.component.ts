import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-gastos-borrar',
  templateUrl: './gastos-borrar.component.html',
})

export class GastosBorrarComponent implements OnInit{
  constructor (
    public dialogRef: MatDialogRef<GastosBorrarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private appservice: AppService
  ){}

  ngOnInit() {
    console.log(this.data)
  }

  confirmarBorrado() {
    this.appservice.deleteGasto(this.data.gastoID).subscribe(result => this.dialogRef.close(true));
  }

  cancelarBorrado() {
    this.dialogRef.close(false); 
  }
}
