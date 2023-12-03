import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-cuenta-usuario',
  templateUrl: './cuenta-usuario.component.html',
  styleUrls: ['./cuenta-usuario.component.css']
})
export class CuentaUsuarioComponent implements OnInit {
  formGroup: FormGroup | undefined;
  usuario: Usuario | null = null;
  saldo: number = 0;
  verContrasena: boolean = false;

  constructor(private appService: AppService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.appService.isLogin().subscribe(isLogin => {
      if (isLogin) {
        this.appService.getResumenCuenta().subscribe(res => {
          this.saldo = res.saldo;
          this.formGroup?.get('saldo')?.setValue(this.saldo);
        })
        this.appService.getUsuarioId();
        this.appService.getUsuario(this.appService.getUsuarioId()!).subscribe((result: any) => {
          this.usuario = result[0] as Usuario;
          this.inicializarFormulario();
        });
      }
    });
  }

  inicializarFormulario() {
    this.formGroup = this.fb.group({
      nombre: [this.usuario?.nombre || '', Validators.required],
      apellido: [this.usuario?.apellido || '', Validators.required],
      email: [this.usuario?.email || '', [Validators.required, Validators.email]],
      saldo: [this.usuario?.saldo || 0, Validators.required],
      password: [this.usuario?.password || 0, Validators.required],
    });
  }

  mostrarContrasena() {
    this.verContrasena = !this.verContrasena;
    const passwordControl = this.formGroup?.get('password');
    if (passwordControl) {
      const currentType = this.verContrasena ? 'text' : 'password';
      passwordControl.get('type')?.setValue(currentType);
    }
  }
  
  guardarCambios() {
    if (this.formGroup && this.formGroup.valid) {
      const nuevosDatosUsuario = this.formGroup.value as Usuario;
      nuevosDatosUsuario.id = this.appService.getUsuarioId();
      this.appService.actualizarUsuario(nuevosDatosUsuario).subscribe(()=> location.reload());
    }
  }

  deshacerCambios() {
    if (this.usuario) {
      this.formGroup?.reset({
        nombre: this.usuario.nombre,
        apellido: this.usuario.apellido,
        email: this.usuario.email,
        saldo: this.usuario.saldo || 0,
        password: this.usuario.password
      });
    }
  }
}

