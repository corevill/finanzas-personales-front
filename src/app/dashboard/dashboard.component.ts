import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { GastosEditComponent } from '../gastos/gastos-edit/gastos-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { IngresosEditComponent } from '../ingresos/ingresos-edit/ingresos-edit.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  resumenForm: FormGroup = this.fb.group({});

  constructor(
    private appService: AppService,
    private router: Router,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.inicializarFormulario();
  }

  ngOnInit(): void {
    this.appService.isLogin().subscribe(isLogin => {
      if (!isLogin)
        this.router.navigate(['/login']);
      this.inicializar();
    });
  }

  inicializar(){
    this.appService.getResumenCuenta().subscribe((res: any) => {
      this.resumenForm.patchValue(res);
    });
  }

  inicializarFormulario() {
    this.resumenForm = this.fb.group({
      necesidadBasicaPorcentaje: new FormControl(0),
      necesidadBasica: new FormControl(0),
      caprichosPorcentaje: new FormControl(0),
      caprichos: new FormControl(0),
      ahorrosPorcentaje: new FormControl(0),
      ahorros: new FormControl(0),
      ingresosTotales: new FormControl(0),
      gastosTotales: new FormControl(0),
      saldo: new FormControl(0)
    });
  }

  onCrearGastoClick() {
    const dialogRef = this.dialog.open(GastosEditComponent, {
      width: '400px',
      data: {
        gastoID: null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      location.reload();
    });
  }

  onCrearIngresoClick() {
    const dialogRef = this.dialog.open(IngresosEditComponent, {
      width: '400px',
      data: {
        ingresoID: null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      location.reload();
    });
  }

  getPorcentajeValue(): number | null {
    const porcentajeControl = this.resumenForm?.get('necesidadBasicaGroup.porcentaje');
    return porcentajeControl ? porcentajeControl.value : null;
  }
  
}
