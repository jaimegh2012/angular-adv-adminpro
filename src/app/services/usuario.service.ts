import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Usuario } from '../models/usuario.model';
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

  logout(){
    localStorage.removeItem('token');
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
    return this._http.get(`${environment.base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    })
    .pipe(
      tap((resp: any) => {
        const {nombre, email, rol, img, google, uid} = resp.usuario;
        this.usuario = new Usuario(nombre, email, '', rol, img, google, uid );
        console.log({respUsuario: resp.usuario});
        localStorage.setItem('token', resp.token)
      }),
      map(resp => true),
      catchError(error => of(false))
    );
  }

  crearUsuario(data: RegisterForm){
    return this._http.post(`${environment.base_url}/usuarios`, data)
    .pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  actualizarUsuario(data: {nombre: string, email: string, rol: string}){
    data = {
      ...data,
      rol: this.usuario.rol || ''
    }

   return this._http.put(`${environment.base_url}/usuarios/${this.uid}`, data, {
    headers: {
      'x-token': this.token
    }
   })
  }

  loginUsuario(data: LoginForm){
    return this._http.post(`${environment.base_url}/login`, data)
    .pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  loginGoogle(token: string){
    return this._http.post(`${environment.base_url}/login/google`, {token})
    .pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }
}
