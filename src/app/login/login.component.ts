import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLogin: boolean = true;
  formGroup: FormGroup = this.fb.group({});

  constructor(
    private appService: AppService,
    private router: Router,
    private fb: FormBuilder
  ) { 
    this.inicializarFormulario();
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
    this.formGroup = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  loginRegister() {
    if (this.isLogin) {
      this.appService.login(this.formGroup.value.email, this.formGroup.value.password).subscribe((result: any) => {
        if (result && result.data && result.data.length) {
          this.appService.setUsuarioEnSession(result.data[0] as Usuario);
          this.router.navigate(['/dashboard']).then(r => location.reload());
        }
      });
    } else {
      // Registrar
      // 1 - crear objeto con datos del Usuario
      const nuevoUsuario: Usuario = {
        id: null,
        nombre: this.formGroup.value.nombre,
        apellido: this.formGroup.value.apellido,
        password: this.formGroup.value.password,
        saldo: 0,
        email: this.formGroup.value.email
      };
      // 2 - llamar a la funcion para crear un usuario nuevo (si no existe crearla en el appService)
      // 3 - llamar a la funcion del login con los datos del usuairo creado
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
