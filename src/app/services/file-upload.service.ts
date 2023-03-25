import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async actualizarFoto(archivo: File, tipo: 'usuarios' | 'medicos' | 'hospitales', id: string){

    try {
      const url = `${environment.base_url}/upload/${tipo}/${id}`;
      const formData = new FormData();
      formData.append('imagen', archivo);
      const resp = await fetch(url, {
        method: 'POST',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      console.log(resp);

      const data = await resp.json();
      console.log(data);
      
      if(data.ok){
        return data.nombreArchivo;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
