import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';

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

  transformarHospitales(hospitales: any[]): Hospital[]{
    return hospitales;
  }
  transformarMedicos(medicos: any[]): Medico[]{
    return medicos;
  }

  busquedaGlobal(termino: string){
    return this._http.get(`${environment.base_url}/todo/${termino}`, this.headers);
  }

  buscar(tipo: 'usuarios' | 'hospitales' | 'medicos', termino: string){
    return this._http.get(`${environment.base_url}/todo/coleccion/${tipo}/${termino}`, 
    this.headers)
    .pipe(
      map((resp: any) => {
        switch (tipo) {
          case 'usuarios':
            return this.transformarUsuarios(resp.data);
          case 'hospitales':
            return this.transformarHospitales(resp.data);
          case 'medicos':
            return this.transformarMedicos(resp.data);
        
          default:
            return []
        }
      })
    );
  }
}
