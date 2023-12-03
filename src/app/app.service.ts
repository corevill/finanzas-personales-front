import { Injectable } from '@angular/core';
import { CategoriaGasto } from './models/categoria-gasto';
import { Gasto } from './models/gasto';
import { Ingreso } from './models/ingreso';
import { of } from 'rxjs/internal/observable/of';
import { Usuario } from './models/usuario';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AppService {
     usuarioEnSession: number | null |undefined = null;
     apiPath = '/api/';
     categorias: CategoriaGasto [] = [];
     gastos: Gasto [] = [];
     ingresos: Ingreso [] = [];
     usuarios: Usuario [] = [];

  constructor(
    private http: HttpClient
  ){
    this.updateUsuarioEnSession();
    if(this.isLogin()){
       this.getCategorias().subscribe(result => {
        this.categorias = result as CategoriaGasto[];
      });
  
      this.getGastos().subscribe(result => {
        this.gastos = result as  Gasto [];
      });
  
      this.getIngresos().subscribe(result => {
        this.ingresos = result as Ingreso [];
      });
    }
  }

  // MÉTODOS GENERALES.
  stringToDate(dateString: string | undefined) {
    if(!dateString) return null;
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
  }
  
  // MÉTODOS DE GASTOS.
  crearGasto(gasto: Gasto){
    return this.http.post(`${this.apiPath}gastos`, gasto);
  }
  
  getGasto(id: number){
    return this.http.get(`${this.apiPath}gastos/${id}`).pipe(map((result: any) => {result[0].tipo_gasto = result[0].tipo_gasto == '1'; return result}));
  }
  
  getGastos(){
    return this.http.post(`${this.apiPath}gastos/find`,{usuario_id: this.getUsuarioId()}).pipe(map((result: any) => {
      if(result && result.length > 0){
        result.map((g: any) => g.tipo_gasto = g.tipo_gasto == '1'); 
      }
      return result;
    }));
  }
  
  modificarGasto(gasto: Gasto){
    return this.http.put(`${this.apiPath}gastos/${gasto.id}`, gasto);
  }
  
  deleteGasto(id: number){
    return this.http.delete(`${this.apiPath}gastos/${id}`);
  }
  
  // MÉTODOS DE INGRESOS.
  crearIngreso(ingreso: Ingreso){
    return this.http.post(`${this.apiPath}ingresos`, ingreso);
  }

  getIngreso(id: number){
    return this.http.get(`${this.apiPath}ingresos/${id}`);
  }

  getIngresos(){
    return this.http.post(`${this.apiPath}ingresos/find`,{usuario_id: this.getUsuarioId()});
  }
  
  modificarIngreso(ingreso: Ingreso){
    return this.http.put(`${this.apiPath}ingresos/${ingreso.id}`, ingreso);
  }
  
  deleteIngreso(id: number){
    return this.http.delete(`${this.apiPath}ingresos/${id}`);
  }

  // MÉTODOS DE CATEGORÍAS.
  crearCategoria(categoria: CategoriaGasto){
    return this.http.post(`${this.apiPath}categoria-gastos`, categoria);
  }

  getCategoria(id: number){
    return this.http.get(`${this.apiPath}categoria-gastos/${id}`);
  }

  getCategorias(){
    return this.http.post(`${this.apiPath}categoria-gastos/find`,{usuario_id: this.getUsuarioId()});
  }

  modificarCategoria(categoria: CategoriaGasto){
    return this.http.put(`${this.apiPath}categoria-gastos/${categoria.id}`, categoria);
  }

  deleteCategoria(id: number){
    return this.http.delete(`${this.apiPath}categoria-gastos/${id}`);
  }

  //MÉTODOS DE USUARIO.
  registrarUsuario(usuario: Usuario) {
    return this.http.post(`${this.apiPath}usuarios`, usuario);
  }

  actualizarUsuario(usuario: Usuario) {
    return this.http.put(`${this.apiPath}usuarios/${usuario.id}`, usuario);
  }

  getUsuarioId() {
    return this.usuarioEnSession;
  }

  getUsuario(id: number) {
    return this.http.get(`${this.apiPath}usuarios/${id}`);
  }

  updateUsuarioEnSession() {
    let usuarioEnSession = localStorage.getItem("FP-usuarioEnSession");
    if (usuarioEnSession != null) {
      this.usuarioEnSession =  +usuarioEnSession;
    }
  }

  login(email: string, password: string) {
    return this.http.post(`${this.apiPath}usuarios/login`, {email, password});
  }

  setUsuarioEnSession(usuarioEnSession: Usuario | undefined) {
    this.usuarioEnSession = usuarioEnSession?.id;
    if (this.usuarioEnSession)
      localStorage.setItem("FP-usuarioEnSession", this.usuarioEnSession.toString());
  }

  removeUsuarioEnSession() {
    this.usuarioEnSession = null;
    localStorage.removeItem("FP-usuarioEnSession");
  }

  isLogin(){
    return of(this.usuarioEnSession != null);
  }

  //MÉTODOS DE RESUMEN DE LA CUENTA.
  getResumenCuenta() {
    return forkJoin([this.getIngresos(), this.getGastos()]).pipe(
      map((res: any) => {
        let necesidadBasica = 0;
        let caprichos = 0;
        let ahorros = 0;
        let ingresosTotales = 0;
        let gastosTotales = 0;
        let saldo = 0;
        const ingresos = res[0].filter((i: any) => i.usuario_id == this.getUsuarioId());
        const gastos = res[1].filter((g: any) => g.usuario_id == this.getUsuarioId());
        ingresos.forEach((i: any) => ingresosTotales += i.cantidad);
        gastos.forEach((g: any) => {
          gastosTotales += g.cantidad;
          if (g.tipo_gasto) {
            caprichos += g.cantidad;
          } else {
            necesidadBasica += g.cantidad;
          }
        });
        saldo = ingresosTotales - gastosTotales;
        ahorros = saldo;
        return {
          necesidadBasica,
          caprichos,
          ahorros,
          necesidadBasicaPorcentaje: ingresosTotales === 0 ? 0 : (necesidadBasica / ingresosTotales) * 100,
          caprichosPorcentaje: ingresosTotales === 0 ? 0 : (caprichos / ingresosTotales) * 100,
          ahorrosPorcentaje: ingresosTotales === 0 ? 0 : (ahorros / ingresosTotales) * 100,
          ingresosTotales,
          gastosTotales,
          saldo
        };
      })
    );
  }
}
