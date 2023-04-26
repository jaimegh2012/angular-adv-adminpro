import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Hospital } from '../models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

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

  cargarHospitales(){
    return this._http.get<{ok: boolean, hospitales: Hospital[]}>(`${environment.base_url}/hospitales`, this.headers)
    .pipe(
      map((resp: {ok: boolean, hospitales: Hospital[]}) => resp.hospitales)
    );
  }

  crearHospital(nombre: string){
    return this._http.post(`${environment.base_url}/hospitales`, {nombre}, this.headers);
  }

  actualizarHospital(_id: string, nombre: string){
    return this._http.put<{ok: boolean, hospital: Hospital}>(`${environment.base_url}/hospitales/${_id}`, {nombre}, this.headers)
    .pipe(
      map((resp: {ok: boolean, hospital: Hospital}) => resp.hospital)
    );
  }

  eliminarHospital(_id: string){
    return this._http.delete(`${environment.base_url}/hospitales/${_id}`, this.headers);
  }
  
}
