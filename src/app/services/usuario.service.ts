import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Usuario } from '../models/usuario.model';
import { CargarUsuario } from '../interfaces/usuario.interface';
declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario!: Usuario;
  constructor(
    private _http: HttpClient,
    private _router: Router
  ) { }

  get token() {
    return localStorage.getItem('token') || '';
  }

  get uid() {
    return this.usuario.uid;
  }

  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  get rol(): 'ADMIN_ROLE' | 'USER_ROLE'{
    return this.usuario.rol!;
  }

  guardarLocalStorage(token: string, menu: any){
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    this.googleInit();
    google.accounts.id.revoke('jaimegutierrez572@gmail.com', () => {
    });
    this._router.navigateByUrl('/login');
  }

  googleInit(){
    google.accounts.id.initialize({
      client_id: "339760365092-eslp5gjnn6dnmnu6paqp4f7kkgotao3t.apps.googleusercontent.com"
    });
  }

  validarToken(){
    return this._http.get(`${environment.base_url}/login/renew`, this.headers)
    .pipe(
      tap((resp: any) => {
        const {nombre, email, rol, img, google, uid} = resp.usuario;
        this.usuario = new Usuario(nombre, email, '', rol, img, google, uid );
        console.log({respUsuario: resp.usuario});
        this.guardarLocalStorage(resp.token, resp.menu);
      }),
      map(resp => true),
      catchError(error => of(false))
    );
  }

  crearUsuario(data: RegisterForm){
    return this._http.post(`${environment.base_url}/usuarios`, data)
    .pipe(
      tap((resp: any) => {
        this.guardarLocalStorage(resp.token, resp.menu);
      })
    );
  }

  actualizarUsuario(data: {nombre: string, email: string, rol: string}){
    data = {
      ...data,
      rol: this.usuario.rol || ''
  }

   return this._http.put(`${environment.base_url}/usuarios/${this.uid}`, data, this.headers)
  }

  loginUsuario(data: LoginForm){
    return this._http.post(`${environment.base_url}/login`, data)
    .pipe(
      tap((resp: any) => {
        this.guardarLocalStorage(resp.token, resp.menu);
      })
    );
  }

  loginGoogle(token: string){
    return this._http.post(`${environment.base_url}/login/google`, {token})
    .pipe(
      tap((resp: any) => {
        this.guardarLocalStorage(resp.token, resp.menu);
      })
    );
  }


  cargarUsuarios(desde: number = 0){
    return this._http.get<CargarUsuario>(`${environment.base_url}/usuarios?desde=${desde}`, this.headers)
    .pipe(
      map( resp => {
        const usuarios = resp.usuarios.map(
          user => new Usuario(user.nombre, user.email, '', user.rol, user.img, user.google, user.uid)
        );

        console.log('respuesta usuarios', resp.usuarios);
        console.log('usuarios regenerados', usuarios);

        return {
          cantidadUsuarios: resp.cantidadUsuarios,
          usuarios
        }
      })
    );
  }

  eliminarUsuario(usuario: Usuario){
    return this._http.delete(`${environment.base_url}/usuarios/${usuario.uid}`, this.headers);
  }


  guardarUsuario(usuario: Usuario){
   return this._http.put(`${environment.base_url}/usuarios/${usuario.uid}`, usuario, this.headers);
  }
}
