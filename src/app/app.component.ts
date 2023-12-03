import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  isLogged = true;
  mostrarMenu = false;

  ITEMS_MENU = [
    {nombre: 'Panel de Control', url:'dashboard'},
    {nombre: 'Gastos', url:'gastos'},
    {nombre: 'Ingresos', url:'ingresos'},
    {nombre: 'Categorias', url:'categorias'},
    {nombre: 'Cuenta', url:'cuenta'},
    {nombre: 'Cerrar Sesion', url:'cerrar_sesion'}
  ];

  constructor(
    private router: Router, 
    private appService: AppService,
    ) {}

  ngOnInit(): void {
    this.appService.updateUsuarioEnSession(); // Compruebo el usuario en sesión y en caso de estar se actualizará
    this.appService.isLogin().subscribe(isLog => this.isLogged = isLog);
  }

  navegar_menu(component: string) {
    if (component == 'cerrar_sesion') {
      this.appService.removeUsuarioEnSession();
      this.router.navigate(['/']).then(r => location.reload());
    } else {
      this.router.navigate(['/' + component]);
    }
    this.mostrarMenu = false;
  }

  alternarMenu() {
    this.mostrarMenu = !this.mostrarMenu;
  }

  @HostListener('window: mousedown', ['$event'])
  clicFueraDelMenu(evento: Event): void {
    const elementoClicado = evento.target as HTMLElement;

    if (!this.esDescendiente(elementoClicado, 'app-sidenav')) {
      this.mostrarMenu = false;
    }
  }

  private esDescendiente(elemento: HTMLElement, nombreClase: string): boolean {
    if (elemento.classList.contains(nombreClase)) {
      return true;
    }

    let padre = elemento.parentElement;

    while (padre) {
      if (padre.classList && padre.classList.contains(nombreClase)) {
        return true;
      }
      padre = padre.parentElement;
    }

    return false;
  }
}