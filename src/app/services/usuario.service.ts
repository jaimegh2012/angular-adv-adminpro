import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) { }

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
    const token = localStorage.getItem('token') || '';
    return this._http.get(`${environment.base_url}/login/renew`, {
      headers: {
        'x-token': token
      }
    })
    .pipe(
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
