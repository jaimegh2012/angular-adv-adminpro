import { Usuario } from 'src/app/models/usuario.model';
export interface CargarUsuario{
    cantidadUsuarios: number;
    usuarios: Usuario[];
}