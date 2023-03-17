import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private _usuarioService: UsuarioService,
    private _router: Router
  ){
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
      console.log('paso por el canActivate');
      
    return this._usuarioService.validarToken().pipe(
      tap(esValido => {
        if (!esValido) {
          this._router.navigate(['/login']);
        }
      })
    );
  }
  
}
