import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  menuSidebar: any[] = [];
  usuario: Usuario;
  constructor(
    private _sidebarService: SidebarService,
    private _usuarioService: UsuarioService
  ) { 
    this.usuario = _usuarioService.usuario;
  }

  ngOnInit(): void {
    this.menuSidebar = this._sidebarService.menu;
  }

}
