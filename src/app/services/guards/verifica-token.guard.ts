import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {
  constructor(public _usuarioService: UsuarioService, public router: Router) {}

  canActivate(): Promise<boolean> | boolean {
    console.log('Token guard');

    // obtengo el token
    let token = this._usuarioService.token;
    // debo extraer la fecha de expiración. atob decodifica una cadena codificada en base64
    let payload = JSON.parse(atob(token.split('.')[1]));
    console.log(payload);

    // la fecha de expiración está en payload.exp en segundos
    let expirado = this.expidado(payload.exp);

    // si el token ha expirado no pasa el guard
    if (expirado) {
      return false;
    }

    // si el token no ha expirado, miro si está próximo a expirar
    return this.verificaRenueva(payload.exp);
  }

  // comprueba si la fecha de expiración del token ha caducado
  expidado(fechaExp: number) {
    let ahora = new Date().getTime() / 1000; // getTime da la hora en milisegundos, la divido por 1000 para pasarla a segundos
    // token expirado si fechaExp < ahora
    if (fechaExp < ahora) {
      this.router.navigate(['/login']);
      return true;
    } else {
      return false;
    }
  }

  // comprueba si la fecha de expiración del token está próxima a expirar
  verificaRenueva(fechaExp: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let tokenExp = new Date(fechaExp * 1000); // fecha exp token en ms
      let fechaProxExp = new Date(); // fecha del sistema. Si no quiero que el usuario la pueda cambiar, puedo obtener la fecha de la bd

      // si faltan 1 horas para que expire el token
      fechaProxExp.setTime(fechaProxExp.getTime() + 1 * 60 * 60 * 1000);
      console.log('tokenExp', tokenExp);
      console.log('fechaProxExp (ahora + 1h)', fechaProxExp);

      // si la fecha del token es mayor a la fecha de próxima expiración
      if (tokenExp.getTime() > fechaProxExp.getTime()) {
        // no es necesario renovar token
        resolve(true);
      } else {
        // renovar token
        this._usuarioService.renuevaToken().subscribe(
          () => {
            resolve(true);
          },
          () => {
            this.router.navigate(['/login']);
            reject(false);
          }
        );
      }
    });
  }
}
