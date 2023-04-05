import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent {
  imagenSubir!: File;
  imagenTemporal: any;

  constructor(
    public modalImagenService: ModalImagenService,
    private _fileUpload: FileUploadService
  ){

  }

  closeModal(){
    this.imagenTemporal = null;
    this.modalImagenService.cerrarModal();
  }

  cambiarImagen(event: any){
    const file: File = event.target.files[0];
    this.imagenSubir = file;
    if(!file) {
      this.imagenTemporal = null;
      return;
    };
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imagenTemporal = reader.result;
    }
    console.log({file});
  }

  subirImagen(){
    const tipo = this.modalImagenService.tipo;
    const uid = this.modalImagenService.uid;
    this._fileUpload.actualizarFoto(this.imagenSubir, tipo, uid)
    .then(img => {
      this.closeModal();
      this.modalImagenService.nuevaImagen.emit(img);
      console.log(img);
      Swal.fire('Guardado', 'Imagen Actualizada correctamente', 'success');
    })
    .catch(error => {
      console.log(error);
      Swal.fire('Error', 'No se ha podido actualizar la imagen', 'error');
    })
  }
}
