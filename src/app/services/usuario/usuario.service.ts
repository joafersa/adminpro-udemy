import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import Swal from 'sweetalert2';

import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario: Usuario;
  token: string;
  menu: any[] = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    console.log('Servicio de usuario listo');
    this.cargarStorage();
  }

  // ==============================================
  //  renuevaToken
  // ==============================================
  renuevaToken() {
    let url = URL_SERVICIOS + '/login/renuevaToken' + '?token=' + this.token;

    return this.http.get(url).pipe(
      map((resp: any) => {
        // actualizo el token
        this.token = resp.token;
        // lo guardo en el storage
        localStorage.setItem('token', this.token);

        console.log('Token renovado');

        return true;
      }),
      catchError(err => {
        this.router.navigate(['/login']);
        Swal.fire(
          'No se pudo renovar token',
          'No es posible renovar el token',
          'error'
        );
        return throwError(err);
      })
    );
  }

  // ==============================================
  //  logout
  // ==============================================
  logout() {
    // borro las variables
    this.usuario = null;
    this.token = '';
    this.menu = [];

    // borro el localStorage
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    localStorage.removeItem('menu');

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
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
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
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
        return true;
      }),
      catchError(err => {
        console.log(err.error.mensaje);
        Swal.fire('Error en el login', err.error.mensaje, 'error');
        return throwError(err);
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
          Swal.fire('Usuario creado', usuario.nombre, 'success');
          return resp.usuario;
        }),
        catchError(err => {
          console.log(err.error.mensaje);
          Swal.fire(err.error.mensaje, err.error.errors.message, 'error');
          return throwError(err);
        })
      );
  }

  // ==============================================
  //  actualizar usuario
  // ==============================================
  actualizarUsuario(usuario: Usuario) {
    let url =
      URL_SERVICIOS + '/usuario/' + usuario._id + '?token=' + this.token;

    // console.log(url);

    return this.http
      .put(url, usuario) // devuelvo un observable al que nos subscribiremos
      .pipe(
        map((resp: any) => {
          // actualizo localStorage con el usuario de la respuesta (solo cuando el usuario que actualizo soy yo, el que estoy logueado)
          if (usuario._id === this.usuario._id) {
            let usuarioBD = resp.usuario;
            this.guardarStorage(
              usuarioBD._id,
              this.token,
              usuarioBD,
              this.menu
            );
          }
          Swal.fire('Usuario actualizado', usuario.nombre, 'success');
          return true;
        }),
        catchError(err => {
          console.log(err.error.mensaje);
          Swal.fire(err.error.mensaje, err.error.errors.message, 'error');
          return throwError(err);
        })
      );
  }

  // ==============================================
  //  cambiar imagen de usuario id
  // ==============================================
  cambiarImagen(archivo: File, id: string) {
    this._subirArchivoService
      .subirArchivo(archivo, 'usuarios', id)
      .then((resp: any) => {
        console.log(resp);
        this.usuario.img = resp.usuario.img;
        // mensaje
        Swal.fire('Imagen actualizada', this.usuario.nombre, 'success');
        // actualizo storage
        this.guardarStorage(id, this.token, this.usuario, this.menu);
      })
      .catch(resp => {
        console.log(resp);
      });
  }

  // ==============================================
  //  cargar usuarios
  // ==============================================
  cargarUsuarios(desde: number = 0) {
    let url = URL_SERVICIOS + '/usuario?desde=' + desde;

    return this.http.get(url);
  }

  // ==============================================
  //  buscar usuarios
  // ==============================================
  buscarUsuarios(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;

    return this.http.get(url).pipe(map((resp: any) => resp.usuarios)); //devuelvo solo los usuarios
  }

  // ==============================================
  //  borrar usuario
  // ==============================================
  borrarUsuario(id: string) {
    let url = URL_SERVICIOS + '/usuario/' + id + '?token=' + this.token;

    return this.http.delete(url).pipe(
      map(resp => {
        Swal.fire('Usuario borrado', 'El usuario ha sido eliminado', 'success');
        return true;
      })
    );
  }

  // ==============================================
  //  funciones aux
  // ==============================================
  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    // guardo en localStorage, el usuario, su id y el token
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    // necesario para comprobar si estoy logueado
    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  // está logueado si existe token
  estaLogueado() {
    return this.token.length > 5 ? true : false;
  }
}
