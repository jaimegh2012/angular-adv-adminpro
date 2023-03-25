import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent {

  perfilForm: FormGroup;
  usuario: Usuario;
  imagenSubir!: File;
  imagenTemporal: any;

  constructor(
    private _fb: FormBuilder,
    private _usuarioService: UsuarioService,
    private _fileUpload: FileUploadService
  ){
    this.usuario = this._usuarioService.usuario;

    this.perfilForm = this._fb.group({
      nombre: [this.usuario.nombre, [Validators.required]],
      email: [this.usuario.email, [Validators.required, Validators.email]]
    })
  }


  actualizarPerfil(){
    console.log(this.perfilForm.value);
    this._usuarioService.actualizarUsuario(this.perfilForm.value).subscribe({
      next: () => {
        const {nombre, email} = this.perfilForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;
        Swal.fire('Guardado', 'Datos actualizados correctamente', 'success');
      },
      error: (error) => {
        Swal.fire('Error', error.error.msg, 'error');
      }
    })
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
    this._fileUpload.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid!)
    .then(img => {
      console.log(img);
      this.usuario.img = img;
      Swal.fire('Guardado', 'Imagen Actualizada correctamente', 'success');
    })
    .catch(error => {
      console.log(error);
      Swal.fire('Error', 'No se ha podido actualizar la imagen', 'error');
    })
  }

}
