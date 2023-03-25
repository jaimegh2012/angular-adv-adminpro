import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
  usuario: Usuario;
  constructor(
    private _usuarioService: UsuarioService
  ) { 
    this.usuario = _usuarioService.usuario;
  }

  ngOnInit(): void {
  }

  logout(){
    this._usuarioService.logout();
  }

}
