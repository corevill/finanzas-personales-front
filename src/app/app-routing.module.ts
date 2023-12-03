import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngresosListComponent } from './ingresos/ingresos-list/ingresos-list.component';
import { CategoriasListComponent } from './categorias/categorias-list/categorias-list.component';
import { GastosListComponent } from './gastos/gastos-list/gastos-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { CuentaUsuarioComponent } from './cuenta-usuario/cuenta-usuario.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'registro',
    component: LoginComponent,
  },
  {
    path: 'ingresos',
    component: IngresosListComponent,
  },
  {
    path: 'gastos',
    component: GastosListComponent,
  },
  {
    path: 'categorias',
    component: CategoriasListComponent,
  },
  { 
    path: 'cuenta', 
    component: CuentaUsuarioComponent 
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: '', redirectTo: '/login', pathMatch:'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
