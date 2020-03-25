import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(public _usuarioService: UsuarioService, public router: Router) {}

  canActivate(): boolean {
    if (this._usuarioService.estaLogueado()) {
      // console.log('Pasa el guard');
      return true;
    } else {
      console.log('Bloqueado por el LoginGuard');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
