import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(
    private _http: HttpClient
  ) { }

  get token() {
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  transformarUsuarios(usuarios: any[]): Usuario[]{

    return usuarios.map(
      user => new Usuario(user.nombre, user.email, '', user.rol, user.img, user.google, user.uid)
    );
  }

  buscar(tipo: 'usuarios' | 'hospitales' | 'medicos', termino: string){
    return this._http.get(`${environment.base_url}/todo/coleccion/${tipo}/${termino}`, 
    this.headers)
    .pipe(
      map((resp: any) => {
        return this.transformarUsuarios(resp.data);
      })
    );
  }
}
