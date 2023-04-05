import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  usuariosTemp: Usuario[] = [];
  cantidadUsuarios: number = 0;
  desde: number = 0;
  cargando: boolean = true; 
  constructor(
    private _usuarioService: UsuarioService,
    private _busquedasService: BusquedasService,
    private _modalImagenService: ModalImagenService

  ){}

  ngOnInit(): void {
    this.cargarUsuarios();
    this._modalImagenService.nuevaImagen
    .pipe(
      delay(100)
    )
    .subscribe(img => {
      this.cargarUsuarios();
    })
  }

  cargarUsuarios(){
    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde)
    .pipe(
      delay(3000)
    )
    .subscribe(({cantidadUsuarios, usuarios}) => {
      this.usuarios = usuarios;
      this.usuariosTemp = usuarios;
      this.cantidadUsuarios = cantidadUsuarios;
      this.cargando = false;
      console.log({cantidadUsuarios, usuarios});
    })
  }


  cambiarPagina(valor: number){
    
    this.desde += valor;

    if(this.desde < 0){
      this.desde = 0;
    }else if(this.desde > this.cantidadUsuarios){
      this.desde -= valor;
    }
    this.cargarUsuarios();
  }

  buscar(termino: string){
    if (termino.length === 0) {
      this.usuarios = this.usuariosTemp;
      return;
    }
    this.cargando = true;
    this._busquedasService.buscar('usuarios', termino).subscribe(resp => {
      this.usuarios = resp;
      this.cargando = false;
    })
  }

  eliminarUsuario(usuario: Usuario){

    if(usuario.uid === this._usuarioService.uid){
      Swal.fire('Error', 'No puedes eliminarte a ti mismo', 'error');
      return;
    }

    Swal.fire({
      title: '¿Borrar este usuario?',
      text:  `Se borrara el usuario ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._usuarioService.eliminarUsuario(usuario).subscribe(resp => {
          this.cargarUsuarios();
          Swal.fire('Eliminado', `Se ha eliminado el Usuario ${usuario.nombre}`, 'success');
        });
      }
    })
  }

  cambiarRol(usuario: Usuario){
    console.log(usuario);
    this._usuarioService.guardarUsuario(usuario).subscribe(resp => {
      console.log({resp});
    });
  }

  abrirModal(usuario: Usuario){
    this._modalImagenService.abrirModal('usuarios', usuario.img || '', usuario.uid || '');
  }

}
