import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Medico } from '../models/medico.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

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

  cargarMedicos(){
    return this._http.get<{ok: boolean, medicos: Medico[]}>(`${environment.base_url}/medicos`, this.headers)
    .pipe(
      map((resp: {ok: boolean, medicos: Medico[]}) => resp.medicos)
    );
  }

  getMedicoById(id: string){
    return this._http.get<{ok: boolean, medico: Medico}>(`${environment.base_url}/medicos/${id}`, this.headers)
    .pipe(
      map((resp: {ok: boolean, medico: Medico}) => resp.medico)
    );
  }

  crearMedico(medico: {nombre: string, hospital: string}){
    return this._http.post<{ok: boolean, medicoDb: Medico}>(`${environment.base_url}/medicos/`, medico, this.headers)
    .pipe(
      map((resp: {ok: boolean, medicoDb: Medico}) => resp.medicoDb)
    );
  }

  actualizarMedico(medico: Medico){
    return this._http.put<{ok: boolean, medico: Medico}>(`${environment.base_url}/medicos/${medico._id}`, medico, this.headers)
    .pipe(
      map((resp: {ok: boolean, medico: Medico}) => resp.medico)
    );
  }


  eliminarHospital(_id: string){
    return this._http.delete(`${environment.base_url}/medicos/${_id}`, this.headers);
  }
}
