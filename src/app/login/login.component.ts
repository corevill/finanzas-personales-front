import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLogin: boolean = true;
  registroExitoso: boolean = false;
  usuarioExistente: boolean = false;
  formGroup: FormGroup;

  constructor(
    private appService: AppService,
    private router: Router,
    // private fb: FormBuilder
  ) { 
    this.formGroup = this.inicializarFormulario();
  }

  ngOnInit(): void {
    this.appService.isLogin().subscribe(isLogin => {
      if (isLogin)
        this.router.navigate(['/dashboard']);
      if (this.router.url.indexOf('registro') != -1) {
        this.alterLoginRegister();
      }
    });
  }

  inicializarFormulario() {
    return new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      email: new FormControl(0, [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  loginRegister() {
    if (this.formGroup.invalid) {
      return;
    }
    
    if (this.isLogin) {
      this.appService.login(this.formGroup.value.email, this.formGroup.value.password).subscribe((result: any) => {
        if (result && result.data && result.data.length) {
          this.appService.setUsuarioEnSession(result.data[0] as Usuario);
          this.router.navigate(['/dashboard']).then(r => location.reload());
        }
      });
    } else {
      const nuevoUsuario: Usuario = {
        id: null,
        nombre: this.formGroup.value.nombre,
        apellido: this.formGroup.value.apellido,
        password: this.formGroup.value.password,
        saldo: 0,
        email: this.formGroup.value.email || ''
      };
      if (nuevoUsuario.email !== null) {
        this.appService.existeUsuario(nuevoUsuario.email).subscribe((existe: any) => {
          if (existe) {
            this.usuarioExistente = true;
            this.registroExitoso = false;
          } else {
            this.appService.registrarUsuario(nuevoUsuario).subscribe(
              (result: any) => {
                this.registroExitoso = true;
                this.usuarioExistente = false;
              },
              (error) => {
                if (error && error.error && error.error.message === 'Usuario ya existente') {
                  this.usuarioExistente = true;
                  this.registroExitoso = false;
                } else {
                  console.error('Error al registrar usuario:', error);
                }
              }
            );
          }
        });
      }
    }
  }

  alterLoginRegister() {
    this.isLogin = !this.isLogin;
  }

  irRegister() {
    this.router.navigate(['/registro']);
  }

  irLogin() {
    this.router.navigate(['/login']);
  }
}
