import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal: boolean = true;
  tipo!: 'usuarios' | 'medicos' | 'hospitales';
  img!: string;
  uid!: string;

  nuevaImagen: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  get ocultarModal(){
    return this._ocultarModal;
  }

  abrirModal(tipo: 'usuarios' | 'medicos' | 'hospitales', img: string, uid: string){
    this._ocultarModal = false;
    this.tipo = tipo;
    this.uid = uid;

    console.log({img});
    if (img === '') {
      img = 'no-image';
    }

    if (img.includes('https')) {
      this.img = img;
    }else{
      this.img = `${environment.base_url}/upload/${tipo}/${img}`;
    }
  }

  cerrarModal(){
    this._ocultarModal = true;
  }
}
