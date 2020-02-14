import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
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
          swal('Usuario creado', usuario.nombre, 'success');
          return resp.usuario;
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
            this.guardarStorage(usuarioBD._id, this.token, usuarioBD);
          }
          swal('Usuario actualizado', usuario.nombre, 'success');
          return true;
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
        swal('Imagen actualizada', this.usuario.nombre, 'success');
        // actualizo storage
        this.guardarStorage(id, this.token, this.usuario);
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
        swal('Usuario borrado', 'El usuario ha sido eliminado', 'success');
        return true;
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

    // necesario para comprobar si estoy logueado
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
