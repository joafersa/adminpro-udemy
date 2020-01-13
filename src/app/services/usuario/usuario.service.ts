import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario: Usuario;
  token: string;

  constructor(public http: HttpClient, public router: Router) {
    console.log('Servicio de usuario listo');
    this.cargarStorage();
  }

  // ==============================================
  //  logout
  // ==============================================
  logout() {
    // borro las variables
    this.usuario = null;
    this.token = '';
    // borro el localStorage
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    // redirecciono a login
    this.router.navigate(['/login']);
  }

  // ==============================================
  // login Google
  // ==============================================
  loginGoogle(token: string) {
    let url = URL_SERVICIOS + '/login/google';

    // necesito enviarle el token como objeto
    return this.http.post(url, { token }).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      })
    );
  }

  // ==============================================
  // login normal
  // ==============================================
  login(usuario: Usuario, recordar: boolean = false) {
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/login';

    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        // guardo en localStorage, el usuario, su id y el token
        // localStorage.setItem('id', resp.id);
        // localStorage.setItem('token', resp.token);
        // localStorage.setItem('usuario', JSON.stringify(resp.usuario));
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      })
    );
  }

  // ==============================================
  // registro
  // ==============================================
  crearUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario';

    return this.http
      .post(url, usuario) // devuelvo un observable al que nos subscribiremos
      .pipe(
        map((resp: any) => {
          swal('Usuario creado', usuario.email, 'success');
          return resp.usuario;
        })
      );
  }

  // ==============================================
  //  funciones aux
  // ==============================================
  guardarStorage(id: string, token: string, usuario: Usuario) {
    // guardo en localStorage, el usuario, su id y el token
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  // está logueado si existe token
  estaLogueado() {
    return this.token.length > 5 ? true : false;
  }
}
