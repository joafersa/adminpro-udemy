import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any[] = [];

  // menu: any = [
  //   {
  //     titulo: 'Principal',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       { titulo: 'Dashboard', url: '/dashboard' },
  //       { titulo: 'ProgressBar', url: '/progress' },
  //       { titulo: 'Gráficas', url: '/graficas1' },
  //       { titulo: 'Promesas', url: '/promesas' },
  //       { titulo: 'RxJs', url: '/rxjs' }
  //     ]
  //   },
  //   {
  //     titulo: 'Mantenimiento',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { titulo: 'Usuarios', url: '/usuarios' },
  //       { titulo: 'Médicos', url: '/medicos' },
  //       { titulo: 'Hospitales', url: '/hospitales' }
  //     ]
  //   }
  // ];

  constructor(public _usuarioService: UsuarioService) {
    // lo quito de aquí porque solo se ejecuta cuando se crea el servicio, y si cierro sesión e inicio de nuevo no se actualiza
    // this.menu = this._usuarioService.menu;
  }

  cargarMenu() {
    this.menu = this._usuarioService.menu;
  }
}
